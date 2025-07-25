import express from 'express';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { marked } from "marked";

const app = express();
app.use(express.json());

// Setup Google AI
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash-exp",
  generationConfig: {
    temperature: 0.9,
    topP: 1,
    topK: 1,
    maxOutputTokens: 2048
  }
});

const chatSessions = new Map();

async function formatResponseToMarkdown(text) {
  const resolvedText = await Promise.resolve(text);
  let processedText = resolvedText.replace(/\r\n/g, "\n");
  processedText = processedText.replace(
    /^([A-Za-z][A-Za-z\s]+):(\s*)/gm,
    "## $1$2"
  );
  processedText = processedText.replace(
    /(?<=\n|^)([A-Za-z][A-Za-z\s]+):(?!\d)/gm,
    "### $1"
  );
  processedText = processedText.replace(/^[•●○]\s*/gm, "* ");
  const paragraphs = processedText.split("\n\n").filter(Boolean);
  const formatted = paragraphs.map((p) => {
    if (p.startsWith("#") || p.startsWith("*") || p.startsWith("-")) {
      return p;
    }
    return `${p}\n`;
  }).join("\n\n");
  marked.setOptions({
    gfm: true,
    breaks: true
  });
  return marked.parse(formatted);
}

// API Routes
app.get("/api/search", async (req, res) => {
  try {
    const query = req.query.q;
    if (!query) {
      return res.status(400).json({
        message: "Query parameter 'q' is required"
      });
    }

    const chat = model.startChat({
      tools: [
        {
          google_search: {}
        }
      ]
    });

    const result = await chat.sendMessage(query);
    const response = await result.response;

    const text = response.text();
    const formattedText = await formatResponseToMarkdown(text);

    const sourceMap = new Map();
    const metadata = response.candidates?.[0]?.groundingMetadata;
    if (metadata) {
      const chunks = metadata.groundingChunks || [];
      const supports = metadata.groundingSupports || [];
      
      chunks.forEach((chunk, index) => {
        if (chunk.web?.uri && chunk.web?.title) {
          const url = chunk.web.uri;
          if (!sourceMap.has(url)) {
            const snippets = supports
              .filter((support) => support.groundingChunkIndices.includes(index))
              .map((support) => support.segment.text)
              .join(" ");
            sourceMap.set(url, {
              title: chunk.web.title,
              url,
              snippet: snippets || ""
            });
          }
        }
      });
    }

    const sources = Array.from(sourceMap.values());
    const sessionId = Math.random().toString(36).substring(7);
    chatSessions.set(sessionId, chat);

    res.json({
      sessionId,
      summary: formattedText,
      sources
    });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({
      message: error.message || "An error occurred while processing your search"
    });
  }
});

app.post("/api/follow-up", async (req, res) => {
  try {
    const { sessionId, query } = req.body;
    if (!sessionId || !query) {
      return res.status(400).json({
        message: "Both sessionId and query are required"
      });
    }

    const chat = chatSessions.get(sessionId);
    if (!chat) {
      return res.status(404).json({
        message: "Chat session not found"
      });
    }

    const result = await chat.sendMessage(query);
    const response = await result.response;

    const text = response.text();
    const formattedText = await formatResponseToMarkdown(text);

    const sourceMap = new Map();
    const metadata = response.candidates?.[0]?.groundingMetadata;
    if (metadata) {
      const chunks = metadata.groundingChunks || [];
      const supports = metadata.groundingSupports || [];
      
      chunks.forEach((chunk, index) => {
        if (chunk.web?.uri && chunk.web?.title) {
          const url = chunk.web.uri;
          if (!sourceMap.has(url)) {
            const snippets = supports
              .filter((support) => support.groundingChunkIndices.includes(index))
              .map((support) => support.segment.text)
              .join(" ");
            sourceMap.set(url, {
              title: chunk.web.title,
              url,
              snippet: snippets || ""
            });
          }
        }
      });
    }

    const sources = Array.from(sourceMap.values());

    res.json({
      summary: formattedText,
      sources
    });
  } catch (error) {
    console.error("Follow-up error:", error);
    res.status(500).json({
      message: error.message || "An error occurred while processing your follow-up question"
    });
  }
});

export default app;
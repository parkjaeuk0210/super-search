#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Gemini Search 초기 설정 시작...\n');

// .env 파일 확인 및 생성
const envPath = path.join(__dirname, '.env');
const envExamplePath = path.join(__dirname, '.env.example');

if (!fs.existsSync(envPath)) {
  if (fs.existsSync(envExamplePath)) {
    fs.copyFileSync(envExamplePath, envPath);
    console.log('✅ .env 파일이 생성되었습니다.');
    console.log('⚠️  .env 파일을 열어 GOOGLE_API_KEY를 설정해주세요.\n');
  } else {
    console.error('❌ .env.example 파일을 찾을 수 없습니다.');
    process.exit(1);
  }
} else {
  console.log('✅ .env 파일이 이미 존재합니다.\n');
}

// API 키 확인
const envContent = fs.readFileSync(envPath, 'utf-8');
if (envContent.includes('your_google_api_key_here')) {
  console.log('📌 다음 단계:');
  console.log('1. Google Cloud Console에서 Gemini API 키를 발급받으세요.');
  console.log('   https://makersuite.google.com/app/apikey');
  console.log('2. .env 파일을 열어 GOOGLE_API_KEY를 설정하세요.');
  console.log('3. npm run dev 명령으로 개발 서버를 시작하세요.\n');
} else {
  console.log('✅ API 키가 설정되어 있습니다.');
  console.log('🎉 npm run dev 명령으로 개발 서버를 시작할 수 있습니다!\n');
}

console.log('📚 추가 정보:');
console.log('- 리디자인 계획: REDESIGN_PLAN.md');
console.log('- 개발 서버: http://localhost:3000');
console.log('- API 엔드포인트: http://localhost:3000/api\n');
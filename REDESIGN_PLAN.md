# Gemini Search 리디자인 계획

## 프로젝트 개요
Perplexity 스타일의 AI 검색 엔진을 현대적이고 확장 가능한 아키텍처로 리디자인합니다.

## 주요 개선 영역

### 1. 아키텍처 개선
- ✅ 세션 영속성 (Redis/DB)
- ✅ API 보안 강화
- ✅ 체계적인 에러 처리
- ✅ 캐싱 전략 구현

### 2. 사용자 경험
- 🔄 검색 히스토리
- 🔄 공유 기능
- 🔄 음성 검색
- 🔄 고급 검색 필터

### 3. 성능 최적화
- 📊 코드 스플리팅
- 📊 이미지 최적화
- 📊 번들 크기 감소
- 📊 PWA 기능

### 4. 개발자 경험
- 🧪 테스트 환경 구축
- 📝 타입 안정성 강화
- 📚 문서화
- 🚀 CI/CD 파이프라인

## 구현 로드맵

### Phase 1: 기초 (1-2주)
- [ ] Express 보안 설정 (rate limiting, helmet)
- [ ] 세션 저장소 구현 (Redis/SQLite)
- [ ] API 타입 정의 (Zod)
- [ ] 로깅 시스템 (Winston)

### Phase 2: UX 향상 (2-3주)
- [ ] 검색 히스토리 기능
- [ ] 검색 결과 공유
- [ ] 고급 검색 필터
- [ ] 실시간 검색 제안

### Phase 3: UI 리디자인 (3-4주)
- [ ] 디자인 시스템 구축
- [ ] 새로운 UI 컴포넌트
- [ ] 모바일 최적화
- [ ] 애니메이션 개선

### Phase 4: 성능 (2-3주)
- [ ] 캐싱 전략 구현
- [ ] 코드 최적화
- [ ] 번들 크기 감소
- [ ] Service Worker

### Phase 5: 품질 (1-2주)
- [ ] 단위 테스트
- [ ] E2E 테스트
- [ ] API 문서화
- [ ] CI/CD 설정

## 기술 스택 추가

### 보안 & 백엔드
- express-rate-limit
- helmet
- redis
- winston

### 프론트엔드
- @tanstack/react-table
- react-intersection-observer
- workbox (PWA)

### 개발 도구
- @testing-library/react
- playwright
- eslint
- prettier

## 시작하기

1. 의존성 설치:
```bash
npm install
```

2. 환경 변수 설정:
```bash
cp .env.example .env
# .env 파일에 GOOGLE_API_KEY 추가
```

3. 개발 서버 실행:
```bash
npm run dev
```

## 기여 가이드라인
- 모든 PR은 테스트를 포함해야 합니다
- 코드 스타일은 ESLint/Prettier 규칙을 따릅니다
- 커밋 메시지는 conventional commits 형식을 사용합니다

## 라이선스
MIT
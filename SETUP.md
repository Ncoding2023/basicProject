# 🚀 프로젝트 설정 및 실행 가이드

## 1️⃣ 사전 준비

### 필수 소프트웨어 설치
- **Node.js** (v16 이상): https://nodejs.org/
- **npm** (Node.js와 함께 설치됨)

### 설치 확인
```bash
node --version  # v16 이상 확인
npm --version   # 7 이상 확인
```

---

## 2️⃣ 백엔드 설정

### 의존성 설치
```bash
cd backend
npm install
```

설치되는 패키지:
- `express`: 웹 프레임워크
- `cors`: CORS 처리
- `swagger-ui-express`: API 문서 UI
- `swagger-jsdoc`: 자동 API 문서화
- `morgan`: HTTP 로깅
- `dotenv`: 환경 변수 관리
- `eslint`: 코드 검사
- `prettier`: 코드 포맷팅

### 환경 설정
`.env` 파일 생성 (선택사항):
```bash
cp .env.example .env
```

---

## 3️⃣ 프론트엔드 설정

### 의존성 설치
```bash
cd frontend
npm install
```

설치되는 패키지:
- `react`: UI 라이브러리
- `react-dom`: React DOM 렌더링
- `vite`: 빠른 개발 빌드 도구
- `eslint`: 코드 검사
- `prettier`: 코드 포맷팅

---

## 4️⃣ 프로젝트 실행

### 방법 1: 터미널 2개 열기 (권장)

**터미널 1 - 백엔드:**
```bash
cd basicProject/backend
npm start
```

출력:
```
========================================
✅ 백엔드 서버 실행 중
========================================
🌐 서버: http://localhost:8080
📚 API 문서: http://localhost:8080/api-docs
🏠 홈페이지: http://localhost:8080
⚛️ 프론트엔드: http://localhost:5173
🔧 환경: development
========================================
```

**터미널 2 - 프론트엔드:**
```bash
cd basicProject/frontend
npm run dev
```

출력:
```
VITE v5.0.0  ready in 234 ms

➜  Local:   http://localhost:5173/
```

### 방법 2: IDE에서 실행

**VS Code / Cursor:**
- 확장 프로그램: `REST Client` 또는 `Thunder Client` 설치
- API 테스트: http://localhost:8080/api-docs

---

## 5️⃣ 주요 URL 정리

| 용도 | URL |
|------|-----|
| 프론트엔드 | http://localhost:5173 |
| 백엔드 서버 | http://localhost:8080 |
| API 문서 (Swagger) | http://localhost:8080/api-docs |
| 서버 홈페이지 | http://localhost:8080 |
| 상태 확인 | http://localhost:8080/health |

---

## 6️⃣ 개발 명령어

### 백엔드

```bash
cd backend

# 서버 실행
npm start

# 개발 모드 (파일 변경 시 자동 재시작)
npm run dev

# 코드 검사
npm run lint

# 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format
```

### 프론트엔드

```bash
cd frontend

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 빌드된 결과 미리보기
npm run preview

# 코드 검사
npm run lint

# 자동 수정
npm run lint:fix

# 코드 포맷팅
npm run format
```

---

## 7️⃣ 문제 해결

### "포트가 이미 사용 중입니다" 오류

**Windows:**
```bash
# 8080 포트 사용 중인 프로세스 찾기
netstat -ano | findstr :8080

# PID로 프로세스 강제 종료
taskkill /PID [PID번호] /F
```

**Mac/Linux:**
```bash
# 8080 포트 사용 중인 프로세스 찾기
lsof -i :8080

# PID로 프로세스 강제 종료
kill -9 [PID번호]
```

### CORS 에러

`backend/config.js` 확인:
```javascript
CORS_ORIGIN: 'http://localhost:5173'
```

### npm install 실패

```bash
# 캐시 정리
npm cache clean --force

# 다시 설치
npm install
```

---

## 8️⃣ API 테스트

### Swagger UI에서 테스트

1. http://localhost:8080/api-docs 접속
2. 엔드포인트 클릭
3. "Try it out" 버튼 클릭
4. 필요한 데이터 입력
5. "Execute" 버튼 클릭
6. 응답 확인

### cURL로 테스트

```bash
# GET 요청
curl http://localhost:8080/api/hello

# POST 요청
curl -X POST http://localhost:8080/api/message \
  -H "Content-Type: application/json" \
  -d '{"message":"Hello"}'
```

---

## 9️⃣ 배포 준비

### 프론트엔드 빌드

```bash
cd frontend
npm run build
```

빌드 결과: `frontend/dist/` 폴더

### 프로덕션 환경 변수

`.env` 파일에서 설정:
```
NODE_ENV=production
PORT=8080
CORS_ORIGIN=https://yourdomain.com
```

---

## 🔟 다음 단계

1. ✅ 프로젝트 구조 이해
2. ✅ API 엔드포인트 추가
3. ✅ 데이터베이스 연결
4. ✅ 인증 시스템 구현
5. ✅ 배포 준비

---

**문제가 있으면 README.md의 "개발자 팁" 섹션을 참고하세요!** 🎯


# Node.js Express + React 풀스택 프로젝트

이 프로젝트는 **Node.js Express** (백엔드)와 **React** (프론트엔드)로 구성된 모던 풀스택 웹 애플리케이션 템플릿입니다.

## 📂 프로젝트 구조

```
basicProject/
├── backend/                 # Node.js Express 백엔드
│   ├── routes/
│   │   └── api.js          # API 엔드포인트 정의
│   ├── config.js           # 서버 설정
│   ├── server.js           # 메인 서버 파일
│   ├── package.json        # 의존성 관리
│   └── .gitignore
│
├── frontend/               # React 프론트엔드
│   ├── src/
│   │   ├── App.jsx         # 메인 컴포넌트
│   │   ├── App.css         # 스타일
│   │   ├── main.jsx        # 진입점
│   │   └── index.css       # 글로벌 스타일
│   ├── index.html
│   ├── vite.config.js      # Vite 설정
│   ├── package.json
│   └── .gitignore
│
└── README.md
```

## 🚀 빠른 시작

### 요구 사항
- **Node.js** 16 이상
- **npm** 7 이상

### 설치 및 실행

**터미널 1 - 백엔드 실행:**
```bash
cd backend
npm install
npm start
```
✅ 서버가 `http://localhost:8080`에서 실행됩니다.
- 🏠 홈페이지: http://localhost:8080
- 📚 **API 문서: http://localhost:8080/api-docs** ⭐

**터미널 2 - 프론트엔드 실행:**
```bash
cd frontend
npm install
npm run dev
```
✅ 애플리케이션이 `http://localhost:5173`에서 실행됩니다.

브라우저에서 `http://localhost:5173`으로 접속하면 완성!

## 📡 API 엔드포인트

### 기본 API

#### GET `/api/hello`
기본 테스트 엔드포인트
```json
{
  "message": "안녕하세요! Node.js Express에서 보낸 데이터입니다.",
  "timestamp": "2025-11-28T...",
  "version": "1.0.0"
}
```

#### POST `/api/message`
메시지 전송
**요청:**
```json
{
  "message": "Hello Server"
}
```
**응답:**
```json
{
  "success": true,
  "receivedMessage": "Hello Server",
  "processedAt": "2025-11-28T..."
}
```

### 게시판 API

#### GET `/api/posts`
모든 게시글 조회 (페이지네이션 지원)
```json
{
  "posts": [
    {
      "id": 1,
      "title": "첫 번째 게시글",
      "content": "안녕하세요!",
      "author": "사용자1",
      "createdAt": "2025-11-28T...",
      "views": 10
    }
  ],
  "total": 2,
  "page": 1,
  "pages": 1
}
```

#### POST `/api/posts`
새 게시글 작성
```json
{
  "title": "게시글 제목",
  "content": "게시글 내용",
  "author": "작성자"
}
```

#### GET `/api/posts/{id}`
특정 게시글 조회 (조회수 +1)

#### PUT `/api/posts/{id}`
게시글 수정

#### DELETE `/api/posts/{id}`
게시글 삭제

### 인증 API

#### POST `/api/auth/register`
회원가입
```json
{
  "username": "user1",
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/auth/login`
로그인
```json
{
  "username": "user1",
  "password": "password123"
}
```

#### GET `/api/auth/users`
모든 가입자 조회

#### GET `/api/auth/users/{id}`
특정 사용자 조회

## 🛠️ 기술 스택

| 항목 | 기술 |
|------|------|
| 프론트엔드 | React 18, Vite, CSS3 |
| 백엔드 | Node.js, Express.js |
| 통신 | REST API, CORS |

## 📚 API 문서 (Swagger)

Swagger UI를 통해 자동 생성된 API 문서를 확인할 수 있습니다!

**접속:** `http://localhost:8080/api-docs`

### 주요 기능:
- ✅ 모든 API 엔드포인트 문서화
- ✅ 요청/응답 예제 표시
- ✅ 브라우저에서 직접 API 테스트 가능
- ✅ 자동 업데이트 (코드 주석만 추가하면 됨)

### 사용 예시:
1. http://localhost:8080/api-docs 접속
2. 테스트하고 싶은 API 선택
3. "Try it out" 버튼 클릭
4. 요청 데이터 입력 후 "Execute" 클릭
5. 응답 결과 확인

---

## 🔧 개발 모드

**백엔드 개발 모드** (파일 변경 시 자동 재시작):
```bash
cd backend
npm run dev
```

**프론트엔드는 Vite의 Hot Module Replacement 지원:**
```bash
cd frontend
npm run dev
```

---

## 📊 코드 품질 관리

### 백엔드

**코드 검사 (Linting):**
```bash
cd backend
npm run lint
```

**자동 수정:**
```bash
npm run lint:fix
```

**코드 포맷팅 (Prettier):**
```bash
npm run format
```

### 프론트엔드

**코드 검사:**
```bash
cd frontend
npm run lint
```

**자동 수정:**
```bash
npm run lint:fix
```

**코드 포맷팅:**
```bash
npm run format
```

---

## 📝 로깅

백엔드는 **Morgan** 미들웨어를 사용해 모든 요청/응답을 자동으로 기록합니다.

터미널에서 다음과 같은 로그를 확인할 수 있습니다:
```
GET /api/hello 200 - - 2.345 ms
POST /api/message 200 - - 1.234 ms
```

## 📦 빌드

**프론트엔드 프로덕션 빌드:**
```bash
cd frontend
npm run build
```
빌드 결과는 `frontend/dist/` 폴더에 생성됩니다.

## 🆕 새로운 기능 (추가됨)

### ✨ 자동 API 문서화 (Swagger)
- 코드 주석(JSDoc)으로 자동 생성
- 인터랙티브 API 테스트 UI
- 요청/응답 스키마 명시

### 📊 코드 품질 도구
- **ESLint**: 코드 검사
- **Prettier**: 자동 코드 포맷팅
- **Morgan**: 요청/응답 로깅

### 🔐 환경 설정
- `.env` 파일로 환경 변수 관리
- `config.js`로 중앙화된 설정

---

## 🚀 향후 확장 계획

- ✅ Python 백엔드 마이크로서비스 추가 (Flask/Django)
- ✅ 데이터베이스 연결 (MongoDB/PostgreSQL)
- ✅ 인증 시스템 (JWT)
- ✅ WebSocket 실시간 통신
- ✅ Docker 컨테이너화
- ✅ CI/CD 파이프라인 (GitHub Actions)
- ✅ 테스트 자동화 (Jest, Vitest)

---

## 📋 체크리스트

### 첫 실행
- [ ] Node.js 설치 확인
- [ ] `npm install` 실행
- [ ] 백엔드 실행 (`npm start`)
- [ ] 프론트엔드 실행 (`npm run dev`)
- [ ] http://localhost:5173 접속 확인
- [ ] http://localhost:8080/api-docs 문서 확인

### 개발
- [ ] 코드 작성
- [ ] `npm run lint` 검사
- [ ] `npm run format` 포맷팅
- [ ] http://localhost:8080/api-docs에서 API 테스트
- [ ] 프론트엔드에서 기능 테스트

---

## 📝 라이선스

MIT License

---

## 💡 개발자 팁

### 백엔드
- CORS 에러가 나면 `backend/config.js`의 `CORS_ORIGIN` 확인
- 새로운 API 추가 시 `backend/routes/api.js`에 작성
- **JSDoc 주석을 추가하면 자동으로 Swagger 문서에 반영됨!**

### 프론트엔드
- 프론트엔드에서 API 호출 시 `http://localhost:8080/api/` 경로 사용
- 환경 변수는 `VITE_` 접두사로 시작 (Vite 문법)
- Hot Module Replacement로 개발 중 즉시 반영됨

### 도움말
- API 문서 보기: http://localhost:8080/api-docs
- 서버 상태 확인: http://localhost:8080/health
- 홈페이지: http://localhost:8080
- git clone https://github.com/Ncoding2023/basicProject.git [프로젝트명]

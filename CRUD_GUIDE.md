# 📋 CRUD + 게시판 + 회원가입 사용 가이드

이 템플릿에는 **복붙해서 어디서나 사용할 수 있는** 기본 기능들이 포함되어 있습니다.

## 🎯 포함된 기능

### 1. CRUD 기본 구조
- ✅ Create (생성) - POST
- ✅ Read (조회) - GET
- ✅ Update (수정) - PUT
- ✅ Delete (삭제) - DELETE

### 2. 게시판 시스템
- ✅ 게시글 목록 조회 (페이지네이션)
- ✅ 게시글 상세 조회 (조회수 증가)
- ✅ 게시글 작성
- ✅ 게시글 수정
- ✅ 게시글 삭제

### 3. 회원 시스템
- ✅ 회원가입 (유효성 검사)
- ✅ 로그인
- ✅ 사용자 목록 조회
- ✅ 중복 검사

---

## 🚀 빠른 시작

### 1. 프로젝트 설정

```bash
# 백엔드
cd backend
npm install

# 프론트엔드
cd frontend
npm install
```

### 2. 서버 실행

```bash
# 터미널 1 - 백엔드
cd backend
npm start

# 터미널 2 - 프론트엔드
cd frontend
npm run dev
```

### 3. 브라우저에서 확인

- 메인 페이지: http://localhost:5173
- API 문서: http://localhost:8080/api-docs

---

## 📖 각 기능 사용법

### 1️⃣ 게시판 (Posts)

#### 위치
- 프론트: `/frontend/src/pages/Board.jsx`
- 백: `/backend/routes/posts.js`
- 스타일: `/frontend/src/styles/Board.css`

#### 기능
```javascript
// 게시글 조회
GET /api/posts?page=1&limit=10

// 게시글 상세
GET /api/posts/1

// 게시글 작성
POST /api/posts
{
  "title": "제목",
  "content": "내용",
  "author": "작성자"
}

// 게시글 수정
PUT /api/posts/1
{
  "title": "수정된 제목",
  "content": "수정된 내용"
}

// 게시글 삭제
DELETE /api/posts/1
```

#### 커스터마이징 예시

**새로운 필드 추가 (카테고리):**

1. 백엔드 (`backend/routes/posts.js`)
```javascript
const newPost = {
  id: postId++,
  title,
  content,
  author,
  category, // ← 추가
  createdAt: new Date(),
  views: 0
};
```

2. 프론트엔드 (`frontend/src/pages/Board.jsx`)
```javascript
const [formData, setFormData] = useState({
  title: '',
  content: '',
  author: '',
  category: '' // ← 추가
});
```

3. Swagger 문서 자동 업데이트됨 ✅

---

### 2️⃣ 회원 시스템 (Auth)

#### 위치
- 프론트: `/frontend/src/pages/Auth.jsx`
- 백: `/backend/routes/auth.js`
- 스타일: `/frontend/src/styles/Auth.css`

#### 기능
```javascript
// 회원가입
POST /api/auth/register
{
  "username": "user1",
  "email": "user@example.com",
  "password": "password123"
}

// 로그인
POST /api/auth/login
{
  "username": "user1",
  "password": "password123"
}

// 사용자 목록
GET /api/auth/users

// 특정 사용자
GET /api/auth/users/1
```

#### 유효성 검사
- ✅ 사용자명: 3자 이상
- ✅ 비밀번호: 6자 이상
- ✅ 이메일: 이메일 형식 검사
- ✅ 중복 검사

#### 커스터마이징 예시

**프로필 정보 추가 (전화번호, 주소):**

1. 백엔드 수정
```javascript
// backend/routes/auth.js
const newUser = {
  id: userId++,
  username,
  email,
  password,
  phone: req.body.phone, // ← 추가
  address: req.body.address, // ← 추가
  createdAt: new Date()
};
```

2. 프론트엔드 수정
```javascript
// frontend/src/pages/Auth.jsx
{!isLogin && (
  <>
    <input
      type="tel"
      placeholder="전화번호"
      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
    />
    <input
      type="text"
      placeholder="주소"
      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
    />
  </>
)}
```

---

## 🔄 데이터 흐름

### 게시판 예시

```
1. 사용자가 "글쓰기" 버튼 클릭
   ↓
2. Board.jsx에서 handleSubmit() 실행
   ↓
3. POST /api/posts 요청 전송
   ↓
4. posts.js에서 받아서 데이터 배열에 추가
   ↓
5. 응답 반환
   ↓
6. fetchPosts() 다시 실행해서 최신 목록 조회
   ↓
7. UI 업데이트
```

---

## 💾 데이터 저장 방식

### 현재 (임시 - 메모리)
```javascript
let posts = [...];
let users = [...];
```

**문제:** 서버 재시작 시 데이터 삭제됨

### 실제 사용 시 (데이터베이스)

#### MongoDB 예시
```javascript
const post = new Post({ title, content, author });
await post.save();
```

#### PostgreSQL 예시
```javascript
INSERT INTO posts (title, content, author) VALUES (?, ?, ?);
```

---

## 🔐 보안 개선사항

### 현재 (개발용)
- ❌ 비밀번호 평문 저장
- ❌ JWT 토큰 없음
- ❌ 권한 검사 없음

### 실제 운영 시
- ✅ 비밀번호 해시 (bcrypt)
- ✅ JWT 토큰 인증
- ✅ 권한 검사 (admin, user)
- ✅ HTTPS

**예시:**
```javascript
// npm install bcryptjs jsonwebtoken

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 비밀번호 해시
const hashedPassword = await bcrypt.hash(password, 10);

// 토큰 발급
const token = jwt.sign({ id: user.id }, 'secret_key');
```

---

## 📚 복붕 사용 체크리스트

### 새 프로젝트 시작 시

1. ✅ 이 템플릿 복붕
2. ✅ 필요한 필드 추가
3. ✅ 백엔드 라우트 수정 (`routes/`)
4. ✅ 프론트엔드 컴포넌트 수정 (`pages/`)
5. ✅ 스타일 커스터마이징 (`styles/`)
6. ✅ Swagger 주석 업데이트 (JSDoc)
7. ✅ 데이터베이스 연결
8. ✅ 보안 설정 강화

---

## 🚀 다음 단계

### 추천 순서

1. **데이터베이스 연결**
   - MongoDB 또는 PostgreSQL
   - ORM (Mongoose, Sequelize)

2. **JWT 인증**
   - 토큰 기반 인증
   - 권한 관리

3. **이미지 업로드**
   - Multer 라이브러리
   - 프로필 사진, 게시글 이미지

4. **댓글 시스템**
   - 게시글에 댓글 추가
   - 댓글 CRUD

5. **좋아요 시스템**
   - 게시글/댓글 좋아요
   - 사용자별 좋아요 관리

6. **실시간 알림**
   - WebSocket (Socket.io)
   - 새 댓글, 좋아요 알림

7. **검색 기능**
   - 게시글 검색
   - 사용자 검색

8. **배포**
   - Heroku, AWS, Vercel
   - Docker 컨테이너화

---

## 📞 문제 해결

### API 호출이 안 될 때
1. 백엔드가 8080에서 실행 중인지 확인
2. CORS 설정 확인 (`backend/config.js`)
3. 요청 URL 확인

### 스타일이 안 적용될 때
1. 파일 경로 확인
2. `npm run dev` 재시작
3. 브라우저 캐시 삭제

### 데이터가 저장 안 될 때
1. 현재는 메모리 저장 (서버 재시작 시 삭제)
2. 실제 데이터베이스 연결 필요

---

## 💡 팁

- 🔍 Swagger UI에서 API 먼저 테스트하고 프론트엔드 개발하기
- 📝 JSDoc 주석 작성하면 Swagger 문서 자동 생성
- 🧪 각 라우트를 독립적으로 테스트 가능
- 🎨 CSS는 각 페이지별로 분리되어 있어서 쉽게 커스터마이징 가능
- 📱 반응형 디자인을 위해 미디어 쿼리 추가 권장

---

**이 템플릿으로 빠르게 풀스택 애플리케이션을 구축해보세요!** 🚀


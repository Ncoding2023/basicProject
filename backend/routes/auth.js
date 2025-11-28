const express = require('express');
const router = express.Router();

// 임시 사용자 데이터베이스 (실제로는 DB 사용)
let users = [
  { id: 1, username: 'user1', email: 'user1@example.com', password: 'password123', createdAt: new Date() },
  { id: 2, username: 'user2', email: 'user2@example.com', password: 'password456', createdAt: new Date() }
];
let userId = 3;

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: 회원가입
 *     description: 새로운 사용자 계정을 생성합니다
 *     tags:
 *       - 인증
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 minLength: 3
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 minLength: 6
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 입력값 오류 또는 중복 사용자
 */
router.post('/register', (req, res) => {
  const { username, email, password } = req.body;

  // 유효성 검사
  if (!username || !email || !password) {
    return res.status(400).json({ error: '모든 필드가 필요합니다.' });
  }

  if (username.length < 3) {
    return res.status(400).json({ error: '사용자명은 3자 이상이어야 합니다.' });
  }

  if (password.length < 6) {
    return res.status(400).json({ error: '비밀번호는 6자 이상이어야 합니다.' });
  }

  // 이메일 정규식 검사
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: '유효한 이메일을 입력하세요.' });
  }

  // 중복 확인
  if (users.find(u => u.username === username)) {
    return res.status(400).json({ error: '이미 사용 중인 사용자명입니다.' });
  }

  if (users.find(u => u.email === email)) {
    return res.status(400).json({ error: '이미 등록된 이메일입니다.' });
  }

  // 새 사용자 생성
  const newUser = {
    id: userId++,
    username,
    email,
    password, // 실제로는 해시 처리 필요!
    createdAt: new Date()
  };

  users.push(newUser);

  res.status(201).json({
    message: '회원가입 성공!',
    user: {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      createdAt: newUser.createdAt
    }
  });
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인
 *     description: 사용자 계정으로 로그인합니다
 *     tags:
 *       - 인증
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: 로그인 성공
 *       401:
 *         description: 사용자명 또는 비밀번호 오류
 */
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: '사용자명과 비밀번호가 필요합니다.' });
  }

  const user = users.find(u => u.username === username);

  if (!user || user.password !== password) {
    return res.status(401).json({ error: '사용자명 또는 비밀번호가 올바르지 않습니다.' });
  }

  // 실제로는 JWT 토큰 발급
  res.json({
    message: '로그인 성공!',
    user: {
      id: user.id,
      username: user.username,
      email: user.email
    },
    token: `fake_token_${user.id}` // 실제로는 JWT 사용
  });
});

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: 모든 사용자 조회
 *     description: 가입된 모든 사용자를 조회합니다 (개발용)
 *     tags:
 *       - 인증
 *     responses:
 *       200:
 *         description: 성공
 */
router.get('/users', (req, res) => {
  res.json({
    users: users.map(u => ({
      id: u.id,
      username: u.username,
      email: u.email,
      createdAt: u.createdAt
    }))
  });
});

/**
 * @swagger
 * /api/auth/users/{id}:
 *   get:
 *     summary: 특정 사용자 조회
 *     tags:
 *       - 인증
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: 성공
 *       404:
 *         description: 사용자를 찾을 수 없습니다
 */
router.get('/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id));

  if (!user) {
    return res.status(404).json({ error: '사용자를 찾을 수 없습니다.' });
  }

  res.json({
    id: user.id,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  });
});

module.exports = router;


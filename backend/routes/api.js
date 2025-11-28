const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/hello:
 *   get:
 *     summary: 기본 인사말 반환
 *     description: 서버 상태를 확인하는 기본 테스트 엔드포인트
 *     tags:
 *       - 테스트
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "안녕하세요! Node.js Express에서 보낸 데이터입니다."
 *                 timestamp:
 *                   type: string
 *                   example: "2025-11-28T12:00:00.000Z"
 *                 version:
 *                   type: string
 *                   example: "1.0.0"
 */
router.get('/hello', (req, res) => {
  res.json({
    message: '안녕하세요! Node.js Express에서 보낸 데이터입니다.',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: 사용자 목록 조회
 *     description: 모든 사용자 정보를 반환합니다
 *     tags:
 *       - 사용자
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
 */
router.get('/users', (req, res) => {
  res.json({
    users: [
      { id: 1, name: '사용자1', email: 'user1@example.com' },
      { id: 2, name: '사용자2', email: 'user2@example.com' }
    ]
  });
});

/**
 * @swagger
 * /api/message:
 *   post:
 *     summary: 메시지 전송
 *     description: 클라이언트에서 보낸 메시지를 처리합니다
 *     tags:
 *       - 메시지
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 receivedMessage:
 *                   type: string
 *                   example: "Hello Server"
 *                 processedAt:
 *                   type: string
 *                   example: "2025-11-28T12:00:00.000Z"
 *       400:
 *         description: 메시지가 없음
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "메시지가 필요합니다."
 */
router.post('/message', (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: '메시지가 필요합니다.' });
  }

  res.json({
    success: true,
    receivedMessage: message,
    processedAt: new Date().toISOString()
  });
});

module.exports = router;


const express = require('express');
const router = express.Router();

// 임시 데이터베이스 (실제로는 DB 사용)
let posts = [
  { id: 1, title: '첫 번째 게시글', content: '안녕하세요!', author: '사용자1', createdAt: new Date(), views: 10 },
  { id: 2, title: '두 번째 게시글', content: '반갑습니다!', author: '사용자2', createdAt: new Date(), views: 5 }
];
let postId = 3;

/**
 * @swagger
 * /api/posts:
 *   get:
 *     summary: 모든 게시글 조회
 *     description: 페이지네이션을 지원합니다
 *     tags:
 *       - 게시판
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         description: 페이지 번호 (기본값: 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         description: 한 페이지당 개수 (기본값: 10)
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 posts:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *                 total:
 *                   type: number
 *                 page:
 *                   type: number
 */
router.get('/', (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedPosts = posts.slice(start, end);

  res.json({
    posts: paginatedPosts,
    total: posts.length,
    page,
    pages: Math.ceil(posts.length / limit)
  });
});

/**
 * @swagger
 * /api/posts/{id}:
 *   get:
 *     summary: 특정 게시글 조회
 *     tags:
 *       - 게시판
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
 *         description: 게시글을 찾을 수 없습니다
 */
router.get('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  // 조회수 증가
  post.views = (post.views || 0) + 1;

  res.json(post);
});

/**
 * @swagger
 * /api/posts:
 *   post:
 *     summary: 새 게시글 작성
 *     tags:
 *       - 게시판
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - content
 *               - author
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *               author:
 *                 type: string
 *     responses:
 *       201:
 *         description: 생성됨
 *       400:
 *         description: 필수 필드가 없습니다
 */
router.post('/', (req, res) => {
  const { title, content, author } = req.body;

  if (!title || !content || !author) {
    return res.status(400).json({ error: '제목, 내용, 작성자는 필수입니다.' });
  }

  const newPost = {
    id: postId++,
    title,
    content,
    author,
    createdAt: new Date(),
    views: 0
  };

  posts.push(newPost);

  res.status(201).json(newPost);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   put:
 *     summary: 게시글 수정
 *     tags:
 *       - 게시판
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: number
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       200:
 *         description: 성공
 *       404:
 *         description: 게시글을 찾을 수 없습니다
 */
router.put('/:id', (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));

  if (!post) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  if (req.body.title) post.title = req.body.title;
  if (req.body.content) post.content = req.body.content;
  post.updatedAt = new Date();

  res.json(post);
});

/**
 * @swagger
 * /api/posts/{id}:
 *   delete:
 *     summary: 게시글 삭제
 *     tags:
 *       - 게시판
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
 *         description: 게시글을 찾을 수 없습니다
 */
router.delete('/:id', (req, res) => {
  const index = posts.findIndex(p => p.id === parseInt(req.params.id));

  if (index === -1) {
    return res.status(404).json({ error: '게시글을 찾을 수 없습니다.' });
  }

  const deletedPost = posts.splice(index, 1);

  res.json({ message: '게시글이 삭제되었습니다.', post: deletedPost[0] });
});

module.exports = router;


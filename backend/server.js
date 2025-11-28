const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const config = require('./config');

const app = express();

// CORS 설정
app.use(cors({
  origin: config.CORS_ORIGIN,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));

// 로깅 미들웨어 (요청/응답 기록)
app.use(morgan('combined'));

// JSON 파싱 미들웨어
app.use(express.json());

// Swagger 문서화
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'API 문서'
}));

// 라우트
const apiRoutes = require('./routes/api');
const postsRoutes = require('./routes/posts');
const authRoutes = require('./routes/auth');

app.use('/api', apiRoutes);
app.use('/api/posts', postsRoutes);
app.use('/api/auth', authRoutes);

// 건강 체크
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 홈 페이지 - 문서 링크
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>백엔드 API 서버</title>
        <style>
          body { font-family: Arial; margin: 40px; background: #f5f5f5; }
          .container { max-width: 600px; margin: 0 auto; background: white; padding: 30px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
          h1 { color: #333; }
          .link { display: inline-block; margin: 10px 0; padding: 10px 20px; background: #61dafb; color: #333; text-decoration: none; border-radius: 5px; font-weight: bold; }
          .link:hover { background: #4caf50; color: white; }
          .info { background: #e3f2fd; padding: 15px; margin: 20px 0; border-left: 4px solid #2196f3; border-radius: 4px; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 Node.js Express 백엔드 서버</h1>
          <div class="info">
            <p><strong>서버 실행 중:</strong> http://localhost:8080</p>
            <p><strong>프론트엔드:</strong> http://localhost:5173</p>
          </div>
          <h2>📚 문서 링크:</h2>
          <a href="/api-docs" class="link">📖 API 문서 (Swagger)</a>
          <a href="/health" class="link">✅ 상태 확인</a>
        </div>
      </body>
    </html>
  `);
});

// 에러 핸들러
app.use((err, req, res, next) => {
  console.error('❌ 에러:', err);
  res.status(500).json({ 
    error: '서버 오류가 발생했습니다.',
    message: err.message,
    timestamp: new Date().toISOString()
  });
});

// 서버 시작
app.listen(config.PORT, () => {
  console.log('\n========================================');
  console.log('✅ 백엔드 서버 실행 중');
  console.log('========================================');
  console.log(`🌐 서버: http://localhost:${config.PORT}`);
  console.log(`📚 API 문서: http://localhost:${config.PORT}/api-docs`);
  console.log(`🏠 홈페이지: http://localhost:${config.PORT}`);
  console.log(`⚛️ 프론트엔드: ${config.CORS_ORIGIN}`);
  console.log(`🔧 환경: ${config.NODE_ENV}`);
  console.log('========================================\n');
});


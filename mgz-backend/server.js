const Article = require('./models/Article');  // 아티클 모델 추가

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// 미들웨어 설정
app.use(express.json());
app.use(cors());

// ✅ 환경 변수 값 확인 (추가된 부분)
console.log("🔍 현재 MONGO_URI:", process.env.MONGO_URI);
console.log("🔍 현재 PORT:", process.env.PORT);

// 기본 라우트
app.get('/', (req, res) => {
    res.send('MGZ 백엔드 서버가 정상적으로 실행되고 있습니다! 🚀');
});

// MongoDB 연결
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('✅ MongoDB 연결 성공!'))
    .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// 📌 ✅ API 라우트 추가 (새로운 부분)
const articlesRoutes = require("./routes/articles");  // 아티클 라우트 불러오기
app.use("/api/articles", articlesRoutes);  // /api/articles로 요청이 오면 articlesRoutes 사용

// 서버 실행
app.listen(PORT, () => {
    console.log(`✅ 서버 실행 중: http://localhost:${PORT}`);
});

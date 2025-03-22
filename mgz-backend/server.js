// 📦 필수 모듈 불러오기
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // 환경 변수 불러오기
const Article = require('./models/Article'); // 아티클 모델

mongoose.set('strictQuery', true); // Mongoose 옵션

// 🛠️ 앱 생성 및 미들웨어 설정
const app = express();
app.use(express.json());
app.use(cors());

// 🔍 환경 변수 확인 로그
const PORT = process.env.PORT || 8080;
const MONGO_URI = process.env.MONGO_URI || 'your_mongodb_connection_string_here';

console.log("🔍 현재 MONGO_URI:", MONGO_URI);
console.log("🔍 현재 PORT:", PORT);

// 📡 상태 확인 라우트
app.get('/', (req, res) => {
res.send('MGZ 백엔드 서버가 정상적으로 실행되고 있습니다! 🚀');
});

// 📚 아티클 API 라우트 연결
const articlesRoutes = require("./routes/articles");
app.use("/api/articles", articlesRoutes);

// 🔌 MongoDB 연결
mongoose.connect(MONGO_URI, {
useNewUrlParser: true,
useUnifiedTopology: true,
})
.then(() => {
    console.log('✅ MongoDB 연결 성공!');

    // 🟢 서버 실행 (Render/Local 구분)
    const isRender = process.env.RENDER === "true";
    const serverURL = isRender
    ? "🌐 https://mgz-backend-ajhp.onrender.com"
    : `http://localhost:${PORT}`;

    app.listen(PORT, () => {
    console.log(`✅ 서버 실행 중: ${serverURL}`);
    });
})
.catch(err => {
    console.error('❌ MongoDB 연결 실패:', err);
});
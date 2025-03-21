const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },   // 아티클 제목
    content: { type: String, required: true }, // 아티클 내용
    author: { type: String, required: true },  // 작성자
  },
  { timestamps: true } // ✅ 자동으로 createdAt, updatedAt 필드 추가
);

module.exports = mongoose.model('Article', articleSchema);

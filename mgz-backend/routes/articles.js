const express = require("express");
const Article = require("../models/Article");  // 아까 만든 Article 모델 불러오기

const router = express.Router();

// 🔹 모든 아티클 가져오기 (GET)
router.get("/", async (req, res) => {
    try {
        const articles = await Article.find().sort({ createdAt: -1 });  // 최신 글 순 정렬
        res.json(articles);
    } catch (error) {
        res.status(500).json({ message: "서버 오류 발생", error });
    }
});

// 🔹 특정 ID의 아티클 가져오기 (GET)
router.get("/:id", async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        if (!article) {
            return res.status(404).json({ message: "아티클을 찾을 수 없음" });
        }
        res.json(article);
    } catch (error) {
        res.status(500).json({ message: "서버 오류 발생", error });
    }
});

// 🔹 새 아티클 추가하기 (POST)
router.post("/", async (req, res) => {
    console.log("📥 POST 요청 수신! 데이터:", req.body);
    try {
        const newArticle = new Article(req.body);  // 요청 데이터로 새 아티클 생성
        await newArticle.save();
        res.status(201).json(newArticle);
    } catch (error) {
        res.status(400).json({ message: "데이터 저장 실패", error });
    }
});

// 🔹 특정 아티클 수정하기 (PUT)
router.put("/:id", async (req, res) => {
    try {
        const updatedArticle = await Article.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedArticle);
    } catch (error) {
        res.status(400).json({ message: "업데이트 실패", error });
    }
});

// 🔹 특정 아티클 삭제하기 (DELETE)
router.delete("/:id", async (req, res) => {
    try {
        await Article.findByIdAndDelete(req.params.id);
        res.json({ message: "삭제 완료!" });
    } catch (error) {
        res.status(500).json({ message: "삭제 실패", error });
    }
});

module.exports = router;

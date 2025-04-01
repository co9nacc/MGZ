// routes/tamagotchis.js
const express = require('express');
const router = express.Router();
const Tamagotchi = require('../models/Tamagotchi');

// DELETE: 특정 다마고치 삭제
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tamagotchi.findByIdAndDelete(req.params.id);
    if (!result) return res.status(404).send("해당 다마고치를 찾을 수 없습니다.");
    res.send("삭제 완료!");
  } catch (err) {
    res.status(500).send("서버 오류: " + err.message);
  }
});

module.exports = router;

// GET 전체 다마고치 조회
router.get("/", async (req, res) => {
  try {
    const tamas = await Tamagotchi.find().sort({ createdAt: -1 }); // 최신순
    res.json(tamas);
  } catch (err) {
    console.error("❌ 다마고치 불러오기 실패:", err);
    res.status(500).json({ error: "서버 오류" });
  }
});

// POST 새로운 다마고치 저장
router.post("/", async (req, res) => {
  try {
    const newTama = new Tamagotchi(req.body);
    await newTama.save();
    res.status(201).json(newTama);
  } catch (err) {
    console.error("❌ 다마고치 저장 실패:", err);
    res.status(400).json({ error: "잘못된 요청" });
  }
});

module.exports = router;
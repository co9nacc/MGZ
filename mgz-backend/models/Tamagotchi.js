// models/Tamagotchi.js
const mongoose = require('mongoose');

const TamagotchiSchema = new mongoose.Schema({
  nickname: String,
  message: String,
  color: String,
  emoji: String,
  accessory: String,
  accessoryStyle: Object,
  tamagotchi: String
}, { timestamps: true }); // createdAt, updatedAt 자동 생성

module.exports = mongoose.model("Tamagotchi", TamagotchiSchema);
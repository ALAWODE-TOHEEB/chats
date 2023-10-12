const express = require("express");
const { registerChat,createPropoertyDetails } = require("./chat_contorller");


const chatGetting = express.Router();


chatGetting.get("/chatgetting", registerChat)
chatGetting.get("/createPropoertyDetails", createPropoertyDetails)

module.exports = chatGetting;
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = process.env.PORT || 5000;
const OPENROUTER_API_KEY = process.env.ROUTER_API;
const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";

app.use(cors());
app.use(express.json());

app.post("/api/chat", async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ error: "Message required" });

    const messages = [
      {
        role: "system",
        content:
          "You are StudyBuddy, a friendly AI tutor who helps with academic topics. Keep answers short unless a detailed response is specifically requested. Ignore unrelated questions. You were made by Rugved Kadu.",
      },
      { role: "user", content: message },
    ];

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: "deepseek/deepseek-r1:free",
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.json({
      reply:
        response.data.choices?.[0]?.message?.content ||
        "I'm not sure how to answer that.",
    });
  } catch (error) {
    console.error("🔥 Chatbot error:", error.response?.data || error.message);
    res.status(500).json({ error: "Failed to generate response" });
  }
});
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

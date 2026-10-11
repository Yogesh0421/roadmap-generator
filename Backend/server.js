import "dotenv/config";
import express from "express";
import cors from "cors";
const app = express();
import { generateRoadmap } from "./services/aiservice.js";
import { chatWithAI } from "./services/chatservice.js";
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/api/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/roadmap", async (req, res) => {
  try {
    const { formData } = req.body;
    console.log("BACKEND FORM DATA:", formData);

    const prompt = `
Create a learning roadmap.

Goal: ${formData.goal}
Experience level: ${formData.level}
Learning preference: ${formData.preference}

Create appropriate phases and topics based on the user's information.
`;

    const roadmap = await generateRoadmap(prompt);

    const parsedRoadmap = JSON.parse(roadmap);

    // console.log("Roadmap generated successfully:", parsedRoadmap);
    console.log("PROMPT SENT TO AI:", prompt);
    console.log(Date.now());
    console.log(req.body);

    res.json({
      roadmap: parsedRoadmap,
    });

    console.log("Roadmap generated successfully:", roadmap);
  } catch (error) {
    console.error("AI error:", error);

    res.status(500).json({
      message: "Failed to generate roadmap",
    });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Messages are required.",
      });
    }

    const validMessages = messages.every(
      (message) =>
        message &&
        ["user", "assistant"].includes(message.role) &&
        typeof message.content === "string" &&
        message.content.trim().length > 0,
    );

    if (!validMessages) {
      return res.status(400).json({
        error: "Invalid message format.",
      });
    }

    const reply = await chatWithAI(messages.slice(-12));

    res.json({ reply });
  } catch (error) {
    console.error("Chat error:", error.message);

    res.status(500).json({
      error: "Failed to generate a response.",
    });
  }
});

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

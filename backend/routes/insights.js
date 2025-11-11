// server/routes/aiInsights.js
const express = require("express");
const OpenAI = require("openai");

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
    try {
        const { logs } = req.body; // last 5 logs from frontend

        const prompt = `
I have the following personal habit logs from a user:
${JSON.stringify(logs)}

Analyze the data and provide a detailed, engaging summary of trends and insights. 
Write as if you are directly giving feedback to the person who logged this data. 
Break your response into clear, bullet-pointed sections with headings, keep it to one to two bullets for example:

- Sleep
- Workouts
- GitHub / Productivity
- Screen Time
- Weight / Health

For each section, include:
- Observations (trends, averages, extremes)
- Potential correlations (e.g., more sleep may increase productivity)
- Actionable suggestions to improve habits

Write in a friendly, encouraging tone, avoiding generic phrases like "the user" or dear your name, this is going directly to the user. Address the person directly, using "you" and "your". Make it easy to read and actionable.
`;
        const response = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{ role: "user", content: prompt }],
        });

        const aiText = response.choices[0].message.content;
        res.json({ insights: aiText });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "AI insights failed" });
    }
});

module.exports = router;

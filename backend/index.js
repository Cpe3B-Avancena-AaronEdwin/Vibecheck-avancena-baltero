/**
 * VibeCheck API (CPE 411L)
 *
 * This server:
 * - runs on your computer (localhost)
 * - listens on a port (default: 3000)
 * - responds to browser requests (endpoints) using JSON
 */

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

// CORS lets your frontend page call your backend API.
app.use(cors());

// This allows Express to read JSON bodies (used for POST requests).
app.use(express.json());

// Data pools (random picks). You can cusstomize these.
const fortunes = [
  "Aries-Magha-half day ka sa trabaho para mamakla",
  "Cancer-mahihiyang ang iyong biyenan sa bago niyong dog food",
  "Libra-iiwas ka sa torpedo habang nagscuba diving",
  "Leo-malululong sa piko ang sabungero mong asawa",
];

const jokes = [
  "Ano'ng favorite sport ni Dracula? Eh 'di... BAT-MINTON! did the developer go broke? Because they used up all their cache.",
  "Ano'ng bentilador ang hot? Eh 'di... SILING fan why-is-this-happening.",
  "Ano'ng shoe ang masakit? Eh 'di... SHOE-ntok!.",
];

const vibeMap = {
  happy: { emoji: "😄", message: "dapat masaya kasi masaya yung emoji" },
  tired: { emoji: "🥱", message: "matulog ka muna kaya inaantok yung emoji" },
  stressed: { emoji: "😵‍💫", message: "ayusin mo code mo kaya nahihilo yung emoji" },
};

// Smash counter (stored in memory for now)
let smashes = 0;

// GET /api/fortune -> returns one random fortune
app.get("/api/fortune", (req, res) => {
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune: pick });
});

// GET /api/joke -> returns one random joke
app.get("/api/joke", (req, res) => {
  const pick = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: pick });
});

// GET /api/vibe?mood=happy|tired|stressed
app.get("/api/vibe", (req, res) => {
  const mood = (req.query.mood || "").toLowerCase();
  const vibe = vibeMap[mood];

  if (!vibe) {
    return res.json({
      mood: mood || "unknown",
      emoji: "🤔",
      message: "Try mood=happy, tired, or stressed.",
    });
  }

  res.json({ mood, ...vibe });
});

// POST /api/smash -> increases counter and returns the updated value
app.post("/api/smash", (req, res) => {
  smashes += 1;

  let response = { smashes };

  // Special check for 69
  if (smashes === 69) {
    response.message = "nice";
  }

  res.json(response);
});

// GET /api/smashes -> returns current counter
app.get("/api/smashes", (req, res) => {
  res.json({ smashes });
});

// GET /api/secret?code=411L -> hidden message if code is correct
app.get("/api/secret", (req, res) => {
  const code = req.query.code;

  if (code === "411L") {
    return res.json({ message: "🎉 Secret unlocked: +10 luck on your next merge!" });
  }

  res.status(403).json({ message: "Nope 😄 Try code=411L" });
});

// Start server
app.listen(PORT, () => {
  console.log(`VibeCheck API running at http://localhost:${PORT}`);
});
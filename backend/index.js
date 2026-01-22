const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const fortunes = [
  "Aries-Magha-half day ka sa trabaho para mamakla",
  "Cancer-mahihiyang ang iyong biyenan sa bago niyong dog food",
  "Libra-iiwas ka sa torpedo habang nagscuba diving",
  "Leo-malululong sa piko ang sabungero mong asawa",
];

const jokes = [
  "Ano'ng favorite sport ni Dracula? Eh 'di BAT-MINTON!",
  "Ano'ng bentilador ang hot? Eh 'di SILING fan!",
  "Ano'ng shoe ang masakit? Eh 'di SHOE-ntok!",
];

const vibeMap = {
  happy: { emoji: "😄", message: "dapat masaya kasi masaya yung emoji" },
  tired: { emoji: "🥱", message: "matulog ka muna kaya inaantok yung emoji" },
  stressed: { emoji: "😵‍💫", message: "ayusin mo code mo kaya nahihilo yung emoji" },
};

let smashes = 0;

// Fortune
app.get("/api/fortune", (req, res) => {
  const pick = fortunes[Math.floor(Math.random() * fortunes.length)];
  res.json({ fortune: pick });
});

// Joke
app.get("/api/joke", (req, res) => {
  const pick = jokes[Math.floor(Math.random() * jokes.length)];
  res.json({ joke: pick });
});

// Mood
app.get("/api/vibe", (req, res) => {
  const mood = req.query.mood;
  if (!vibeMap[mood]) {
    return res.json({ mood: mood || "unknown", emoji: "🤔", message: "Try mood=happy, tired, or stressed." });
  }
  res.json({ mood, ...vibeMap[mood] });
});

// Smash
app.post("/api/smash", (req, res) => {
  smashes++;

  const response = { smashes }; // must be "smashes" key

  if (smashes === 69) {
    response.message = "nice";
  }

  res.json(response);
});

// Get current smash count
app.get("/api/smashes", (req, res) => {
  res.json({ smashes });
});

// Secret
app.get("/api/secret", (req, res) => {
  if (req.query.code === "411L") {
    res.json({ secret: "🎉 You found it!" });
  } else {
    res.status(403).json({ error: "Nope" });
  }
});

app.listen(PORT, () => {
  console.log(`VibeCheck API running at http://localhost:${PORT}`);
});

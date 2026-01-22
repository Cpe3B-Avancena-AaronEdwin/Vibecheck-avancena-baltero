// Frontend controller (USE ONLY THIS FILE)
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

const out = document.getElementById("out");
const API_BASE = "http://localhost:3000";

// Show formatted + styled output
function show(obj) {
  out.className = "";
  let typeClass = "";

  // 🔮 Fortune
  if (obj.fortune) {
    out.textContent = `🔮 Your Fortune\n\n${obj.fortune}`;
    typeClass = "output-fortune";
  }

  // 😂 Joke
  else if (obj.joke) {
    out.textContent = `😂 Joke Time\n\n${obj.joke}`;
    typeClass = "output-joke";
  }

  // 😄 Mood
  else if (obj.mood) {
    const mood = obj.mood.toLowerCase();
    const emoji = obj.emoji ? `<span class="emoji">${obj.emoji}</span>` : "";

    out.innerHTML =
      `Mood: ${mood.charAt(0).toUpperCase() + mood.slice(1)} ${emoji}\n\n` +
      `Message:\n${obj.message}`;

    typeClass = `output-mood ${mood}`;
  }

  // 💥 Smash
  else if (obj.smash) {
    out.textContent =
      `💥 SMASH COUNT\n\nTotal Smashes: ${obj.count ?? "N/A"}`;
    typeClass = "output-smash";
  }

  // Fallback
  else {
    out.textContent = JSON.stringify(obj, null, 2);
  }

  if (typeClass) out.classList.add(typeClass);
  out.classList.add("updated");
}

// Helper
async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// 🔮 Fortune
document.getElementById("btnFortune").addEventListener("click", async () => {
  show(await getJSON(`${API_BASE}/api/fortune`));
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

// 😂 Joke
document.getElementById("btnJoke").addEventListener("click", async () => {
  show(await getJSON(`${API_BASE}/api/joke`));
});

// 😄 Mood
document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    show(await getJSON(`${API_BASE}/api/vibe?mood=${btn.dataset.mood}`));
  });
});

// 💥 Smash
document.getElementById("btnSmash").addEventListener("click", async () => {
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();

  show({
    smash: true,
    count: data.count // backend must return this
  });
});

// 🕵️ Secret
document.getElementById("btnSecret").addEventListener("click", async () => {
  show(await getJSON(`${API_BASE}/api/secret?code=411L`));
});

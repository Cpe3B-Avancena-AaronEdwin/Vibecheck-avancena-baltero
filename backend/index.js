// Frontend controller (USE ONLY THIS FILE)

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

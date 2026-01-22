const out = document.getElementById("out");
const API_BASE = "http://localhost:3000";
let localSmashCount = 0;

// NEW Styled Show Function
function showStyled(message, type = "") {
  // Clear the previous content
  out.innerHTML = ""; 
  
  // Create a clean text element
  const span = document.createElement("span");
  span.className = `output-text ${type}`;
  span.innerHTML = message;
  
  out.appendChild(span);

  // Trigger the "updated" glow on the pre container
  out.classList.remove("updated");
  void out.offsetWidth; // Trigger reflow to restart animation
  out.classList.add("updated");
}

async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  // Assuming data is { fortune: "..." }
  showStyled(`🔮 Fortune: ${data.fortune || data}`, "output-fortune");
});

document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  // Assuming data is { joke: "..." }
  showStyled(`😂 Joke: ${data.joke || data}`, "output-joke");
});

document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    // Assuming data is { message: "..." }
    showStyled(`✨ Mood Vibe: ${data.message || data}`, `output-mood ${mood}`);
  });
});

document.getElementById("btnSmash").addEventListener("click", async () => {
  const btn = document.getElementById("btnSmash");
  btn.classList.add("glow-active");
  localSmashCount++;

  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json();
  
  // Clean output: No brackets!
  showStyled(`💥 SMASH! Total hits: ${localSmashCount}`, "output-smash");

  setTimeout(() => btn.classList.remove("glow-active"), 400);
});

document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  showStyled(`🔑 Secret Found: ${data.secret || data.message}`, "output-fortune");
});
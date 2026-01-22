const out = document.getElementById("out");
const API_BASE = "http://localhost:3000";
let localSmashCount = 0;

// NEW Styled Show Function
function showStyled(message, type = "") {
  // Clear previous content
  out.innerHTML = "";

  // Create a clean text element
  const span = document.createElement("span");
  span.className = `output-text ${type}`;
  span.innerHTML = message;

  out.appendChild(span);

  // Trigger the "updated" glow on the container
  out.classList.remove("updated");
  void out.offsetWidth; // Trigger reflow to restart animation
  out.classList.add("updated");
}

// Helper to fetch JSON
async function getJSON(url) {
  const res = await fetch(url);
  return res.json();
}

// 🔮 Fortune
document.getElementById("btnFortune").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/fortune`);
  showStyled(`🔮 Fortune: ${data.fortune || data}`, "output-fortune");
});

// 😂 Joke
document.getElementById("btnJoke").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/joke`);
  showStyled(`😂 Joke: ${data.joke || data}`, "output-joke");
});

// 😄 Mood
document.querySelectorAll(".btnMood").forEach(btn => {
  btn.addEventListener("click", async () => {
    const mood = btn.dataset.mood;
    const data = await getJSON(`${API_BASE}/api/vibe?mood=${mood}`);
    showStyled(`✨ Mood Vibe: ${data.message || data}`, `output-mood ${mood}`);
  });
});

// 💥 Smash
document.getElementById("btnSmash").addEventListener("click", async () => {
  const btn = document.getElementById("btnSmash");
  btn.classList.add("glow-active");

  // Call backend to increment smash counter
  const res = await fetch(`${API_BASE}/api/smash`, { method: "POST" });
  const data = await res.json(); // backend returns { smashes, message? }

  // Update local count
  localSmashCount = data.smashes;

  // Build output message
  let message = `💥 SMASH! Total hits: ${localSmashCount}`;
  if (data.message) message += `\n\n${data.message}`; // show "nice" if present

  showStyled(message, "output-smash");

  setTimeout(() => btn.classList.remove("glow-active"), 400);
});

// 🕵️ Secret
document.getElementById("btnSecret").addEventListener("click", async () => {
  const data = await getJSON(`${API_BASE}/api/secret?code=411L`);
  showStyled(`🔑 Secret Found: ${data.secret || data.message}`, "output-fortune");
});

// Mapping buttons to GIFs
const gifMap = {
  "🔮": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExN28xdnA3YXZpM3Iza2o1Z2p5b2M4ZmpyZzMwdGg4MmlnajYwNjU5eSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/0dS4CZfP7uTUHHSZtP/200.webp", // Fortune
  "😂": "https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExMDh6OWhhc2c2bzJhaTJsa2NxMzA0bWQ4dWcxdmQ0c2U4NXhqYnU3bCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/Hm8qQxDIgbFsjL9msa/giphy.webp", // Joke
  "😄": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExNTNqMjBpbjRiYXoyb3Z2a3BmMndsYjYwYndjYmlmZzI1bm0yM29xMiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3o7qE2VAxuXWeyvJIY/giphy.webp", // Happy
  "🥱": "https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGgwZDUxYWU2NDdscWxkd3FkeW84N3A5cjYzdTk0cWg0NHR6bWF6MiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xchUhdPj5IRyw/giphy.webp", // Tired
  "😵‍💫": "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ2VndTdhZnBkeXY3NnI0cWs0MXBzdjhkMmp3bjBpYzl2eWlibTFndCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xU1spRleFHmtjvskXw/200.webp"  // Stressed
};

function popGif(emojiKey, x, y) {
  const p = document.createElement('div');
  p.className = 'floating-gif';
  
  const img = document.createElement('img');
  img.src = gifMap[emojiKey] || "your-default-gif.gif";
  img.style.width = "300px";
  
  p.appendChild(img);
  p.style.left = (x + 60) + 'px';
  p.style.top = (y - 50) + 'px';
  
  document.body.appendChild(p);

  setTimeout(() => p.remove(), 9000);
}

// Sidebar click listener for popping GIFs
document.querySelectorAll('.sidebar a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const emojiKey = link.innerText.split(' ')[0];
    popGif(emojiKey, e.clientX, e.clientY);
  });
});

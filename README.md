🌟 VibeCheck 411LVibeCheck 411L
 is an interactive, neon-themed dashboard designed to give users instant feedback through fortunes, jokes, and mood-based vibes. Built with a "Gamer/Cyberpunk" aesthetic, the app features heavy CSS animations, GIF "bursts," and a dynamic smash counter.


🚀 Key Features

Dynamic UI: Glassmorphism-style output box that changes border color based on the data type.

Neon Glow Buttons: Each button (Fortune, Joke, Mood, Smash) has its own unique signature glow.

GIF Burst Animation: Clicking sidebar links triggers large GIFs that pop and float into the main screen.

Smash Mechanic: A "SMASH" button that triggers an intense screen/button pulse and tracks local hit counts.

Clean Text Output: Automatically parses JSON data to display only the text and emojis (no brackets or quotes).

📂 File Structure

index.html: Defines the layout, sidebar, and button grid.

index.css: Contains the neon gradients, keyframe animations, and glassmorphism styles.

app.js: Handles API fetching, DOM manipulation, and the GIF trigger logic.

logo.jpg: The square-styled avatar used in the sidebar.

⚙️ Setup & Execution Steps

Backend: Ensure your Node.js server is running on http://localhost:3000.

Dependencies: Confirm cors is enabled on your Express server to allow frontend requests.

Frontend: Open index.html via Live Server in VS Code to avoid local file restrictions.

Deployment: Host on GitHub Pages by setting the source branch to main in Repository Settings.

🔌 API Endpoint List

GET /api/fortune: Purple-themed random fortune text.

GET /api/joke: Yellow-themed joke text.

GET /api/vibe?mood=...: Green/Red/Gray themed mood messages.

POST /api/smash: Registers a hit to the server.

GET /api/secret?code=411L: Unlocks hidden content.

🎨 Customization Guide

GIFs: Edit the gifMap in app.js to change which GIF appears for each button.

Text Size: Adjust the font-size inside the pre or .output-text classes in index.css.

Glow Intensity: Modify the box-shadow values in the @keyframes smash-burst section.
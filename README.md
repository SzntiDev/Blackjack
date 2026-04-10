<h1 align="center">
  <br>
  Blackjack Premium
  <br>
</h1>

<h4 align="center">A high-fidelity casino experience built with pure web technologies.</h4>

<p align="center">
  <em>Read this in other languages: <a href="README.md">English</a>, <a href="README-es.md">Español</a></em>
</p>

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-how-it-works">How It Works</a> •
  <a href="#-installation--usage">Installation & Usage</a> •
  <a href="#-architecture">Architecture</a> •
  <a href="#-tech-stack">Tech Stack</a>
</p>

---

> [!TIP]
> **Blackjack Premium** focuses on visual excellence and mathematical accuracy, providing a realistic card-playing experience without the need for heavy frameworks.

**Blackjack Premium** is a sleek, highly interactive web implementation of the classic casino game. Developed with a focus on **User Experience (UX)** and **Animation Fidelity**, it features a professional betting system, realistic card shuffling algorithms, and an anti-spam logic that ensures game integrity.

The project showcases advanced DOM manipulation, CSS-led animations (keyframes and transitions), and a robust state machine that handles dealer logic, player decisions, and outcome calculations seamlessly.

---

## ✨ Features

- 🃏 **Pro Shuffling Algorithm**: Implements the **Fisher-Yates (Knuth) Shuffle** for a statistically fair and unpredictable 52-card deck distribution.
- 🎨 **Premium Visuals**: Custom-designed card assets, smooth hover effects, and a sophisticated modal system for game results (Win/Lose/Bust).
- 💰 **Banking System**: Integrated virtual currency management starting with $1,000. Features dynamic pot handling and balanced payout logic.
- 🛡️ **Anti-Spam Logic**: A strict state-based control (`enJuego` flag) prevents accidental double-clicks or "re-deal" spamming during active hands.
- 📱 **Responsive & Lag-Free**: Optimized layout that avoids "content shift" during card reveals, ensuring a stable and immersive UI across all viewports.
- ✨ **Micro-Animations**: Features score pulsing, hand shaking on loss, and smooth card fly-in transitions for a high-end feel.

---

## 🚀 How It Works

Blackjack Premium relies on a structured approach to manage the game flow and the probability engine:

### 1. The Deck Engine
Instead of simple random number generation, the game maintains a physical `mazo` array. The **Fisher-Yates** shuffle algorithm iterates through the array in reverse, swapping elements to ensure total randomness before every new round.

### 2. Dealer & AI Logic
The "Crupier" follows standardized casino rules: standing on 17 and hitting on anything lower. This logic is processed asynchronously to allow the user to see the sequential card reveals, simulating a real-life dealer's pace.

### 3. State Management
The game tracks several concurrent states (Score, Bet, Game Phase). It uses DOM event listeners and CSS class toggling to reflect these states visually—transitioning from "Betting" to "Playing" and "Result" modes dynamically.

---

## 💻 Installation & Usage

### Prerequisites
None. This is a 100% Vanilla frontend project.

### Steps
1. **Clone the repository**:
   ```bash
   git clone https://github.com/SzntiDev/Blackjack.git
   cd Blackjack
   ```
2. **Play**:
   Simply open the `index.html` file in any modern web browser.
   ```bash
   start index.html
   ```

---

## 🏗️ Architecture

```text
Blackjack/
├── index.html           # Semantic markup and UI containers
├── Estilos.css          # Premium Design System (Layers, Animations, Variables)
├── programa.js          # Core engine (State, Shuffling, Dealer AI)
├── img/                 # SVG and PNG card assets and UI icons
└── f/                   # Custom Typography and Font assets
```

---

## ⚙️ Tech Stack

- **[HTML5](https://developer.mozilla.org/en-US/docs/Web/HTML)** for semantic structure.
- **[CSS3](https://developer.mozilla.org/en-US/docs/Web/CSS)** using Flexbox, Grid, and heavy Keyframe animations.
- **[Vanilla JavaScript (ES6)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)** for logic, deck management, and DOM interaction.

---
> Project co-authored by Agustin Aurellana and Santiago Pérez. Focused on clean logic and premium interface design.

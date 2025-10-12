# 👻 Lamp Away

A small horror-themed browser game built with **HTML**, **CSS**, and **JavaScript**.  
Turn on your lamp at the right moment to scare away ghosts before they fully appear!  
Upgrade your skills in the shop and survive as long as you can!

---

## 🕹️ Gameplay

- The ghost slowly appears on the screen.
- Click the **lamp switch** or press the **spacebar** to turn on the light.
- If you scare the ghost before it fully appears → you earn coins 💰.
- If you turn on the light too early or too late → you lose 👻.
- Spend your coins in the **shop** to unlock upgrades.

---

## ⚙️ Features

- 🎮 **4 Game Modes:** Easy, Medium, Hard, and Infinite.
- 💡 **Lamp System:** Toggle by clicking or pressing the spacebar.
- 👻 **Ghost Mechanics:** Random appearance, fade-in/out animations.
- 🏪 **Shop System:** Buy upgrades to enhance your gameplay:
  - *Slower Ghost* – ghosts appear more slowly.
  - *Extra Ghost* – increases the number of ghosts required to win.
  - *Double Click Bonus* – earn +5 coins for quick double-clicks.
  - *Lucky Ghost* – a chance to spawn a golden ghost worth extra money.
  - *Extra Life* – survive one failed attempt and can be repurchased.
- 🧠 **Dynamic Difficulty:** Automatically scales in Infinite mode.
- 💾 **Persistent Data:** Coins and upgrades are saved in Local Storage.
- 🔦 **Visual Effects:** Smooth lamp lighting transitions and shadow overlays.

---

## 🧩 Controls

| Action | Key / Input |
|--------|--------------|
| Turn lamp ON/OFF | Click switch or press **Spacebar** |
| Start Game | Click **Start** |
| Open/Close Shop | Click **Shop 🏪** button |
| Restart Game | Click **Restart** after win or loss |

---

## 🏗️ Tech Stack

- **HTML5** – Structure and markup  
- **CSS3** – Styling, animations, and responsive design  
- **JavaScript (ES6)** – Game logic and DOM manipulation  

---

## 🗓️ Version History

### v1.2 — **Full Multilingual Support (IT / EN)**
**Release date:** 2025-10-12

#### ✨ New Features
- Added complete **bilingual support** 🇮🇹 / 🇬🇧 (Italian / English).
- Automatic translation of all game text, including:
  - **Intro**, **Win**, **Lose**, **Shop**, and **Difficulty** messages.
  - **Button labels**, **tooltips**, and **ghost counters**.
  - **“Already purchased”** and **“Buy Extra Life again”** messages in the shop.
- Language preference saved in **Local Storage** and applied automatically on next visit.
- Shop buttons and alerts now **refresh dynamically** when changing language.

#### 🛠️ Fixes & Improvements
- Fixed English text not updating on purchased items (**“✅ Already purchased”**).
- Unified translation handling via **`lang.js`**.
- Improved consistency in **`winGame()`** and **`loseGame()`** message logic.

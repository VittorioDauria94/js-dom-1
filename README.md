## 👻 Lamp Away

A spooky and fun browser game built with **HTML**, **CSS**, and **JavaScript**.  
Turn on your lamp at the right moment to scare away ghosts before they fully appear!  
Buy upgrades, unlock new abilities, and test how long you can survive the night.  

---

### 🌐 Live Demo  
👉 **Play now:** [https://lampaway.netlify.app](https://lampaway.netlify.app)

---

## 🕹️ Gameplay  

- The ghost slowly fades into the room.  
- Click the **lamp switch** or press the **spacebar** to turn on the light.  
- Scare the ghost **before it fully appears** to earn coins 💰.  
- Turn on the lamp too early or too late and you’ll lose 👻.  
- Spend coins in the **shop** to unlock upgrades and bonuses.  

---

## ⚙️ Features  

- 🎮 **4 Game Modes:** Easy, Medium, Hard, and Infinite.  
- 💡 **Lamp System:** Toggle the light by clicking or pressing the spacebar.  
- 👻 **Ghost Mechanics:** Random appearances, fade-in/out animations.  
- 🏪 **Shop System:** Unlock new powers:  
  - *Slower Ghost* — slows ghost appearance time.  
  - *Extra Ghost* — increases ghosts required to win.  
  - *Double Click Bonus* — +5 coins for quick double-clicks.  
  - *Lucky Ghost* — chance to spawn a golden ghost worth more money.  
  - *Extra Life* — survive one failed attempt and repurchase later.  
- 🧠 **Dynamic Difficulty:** Auto-scales in infinite mode.  
- 💾 **Progress Saving:** Coins and upgrades saved in Local Storage.  
- 🔦 **Visual FX:** Smooth lamp lighting transitions and dark overlay.  

---

## 📱 Mobile Optimization  

- Full responsive layout with fluid scaling (using `clamp()` and `vw/vh` units).  
- Fixed SVG rendering on mobile:  
  - Ghosts switched from `<img>` → `<object>` for crisp vector display.  
  - Added `vector-effect="non-scaling-stroke"` to preserve eyes & mouth.  
- Improved touch performance and scaling of UI elements.  

---

## 🧩 Controls  

| Action | Key / Input |
|--------|--------------|
| Toggle lamp ON/OFF | Click the switch or press **Spacebar** |
| Start game | Click **Start** |
| Open / Close Shop | Click **Shop 🏪** |
| Restart game | Click **Restart** after win or loss |

---

## 🏗️ Tech Stack  

- **HTML5** — structure & layout  
- **CSS3** — styling, animations, responsive design  
- **JavaScript (ES6)** — game logic & DOM control  
- **LocalStorage API** — save progress and upgrades  

---

## 🧙 Credits  

Developed with 💡 and ☕ by **Vittorio D’Auria**  
Special thanks to all testers and players who helped perfect *Lamp Away*.  

---

## 🏁 Version  

**Lamp Away v1.0.0**  
Stable release — includes full gameplay, responsive design, mobile SVG fix, and persistent shop system.  

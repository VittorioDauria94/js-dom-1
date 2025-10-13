const translations = {
  it: {
    intro: `"Benvenuto! <br><br>
      Regole del gioco: <br><br>
      - Il fantasma apparirà lentamente.<br><br>
      - Clicca l'interruttore prima che il fantasma sia completamente visibile per spaventarlo.<br><br>
      - Se non clicchi in tempo o accendi la luce troppo presto, hai perso.<br><br>
      - Se spaventi abbastanza fantasmi, vinci!"`,
    start: "Start",
    restart: "Restart",
    win: "🎉 Hai vinto! 🎉<br>Hai spaventato tutti i fantasmi!",
    lose: "👻 Hai perso! 👻<br>Riprova e cerca di spaventare i fantasmi in tempo!",
    openShop: "Negozio 🏪",
    shopTitle: "🏪 Negozio",
    closeShop: "Chiudi negozio",
    moneyPrefix: "💰",
    shop: {
      slowerGhost: "Fantasma più lento (50 💰)",
      extraGhost: "Fantasma extra (100 💰)",
      doubleClickBonus: "Doppio click +5 monete (75 💰)",
      luckyGhost: "Fantasma dorato casuale (150 💰)",
      extraLifeGhost: "Vita extra (120 💰)",
    },
    extraLifeRebuy: "💚 Riacquista Vita (120 💰)",
    counterLabel: "Fantasmi spaventati",
    difficultyMessage: "⚡ Difficoltà aumentata!",
    ghostsNeeded: "⚡ Fantasmi da spaventare: {count}",
    difficultyWarning: "⚠️ Seleziona una difficoltà prima di iniziare!",
    selectDifficulty: "Seleziona la difficoltà:",
    clickToStart: '"Clicca Start per iniziare."',
    difficulties: {
      easy: "Facile",
      medium: "Medio",
      hard: "Difficile",
      infinite: "Infinita",
    },
  },
  en: {
    intro: `"Welcome! <br><br>
      Game Rules: <br><br>
      - The ghost will slowly appear.<br><br>
      - Click the switch before it's fully visible to scare it away.<br><br>
      - If you click too early or too late, you lose.<br><br>
      - Scare enough ghosts to win!"`,
    start: "Start",
    restart: "Restart",
    win: "🎉 You won! 🎉<br>You scared all the ghosts!",
    lose: "👻 You lost! 👻<br>Try again and scare the ghosts in time!",
    openShop: "🏪 Shop",
    shopTitle: "🏪 Shop",
    closeShop: "Close shop",
    moneyPrefix: "💰",
    shop: {
      slowerGhost: "Slower ghost (50 💰)",
      extraGhost: "Extra ghost (100 💰)",
      doubleClickBonus: "Double click +5 coins (75 💰)",
      luckyGhost: "Random golden ghost (150 💰)",
      extraLifeGhost: "Extra life (120 💰)",
    },
    extraLifeRebuy: "💚 Buy Extra Life again (120 💰)",
    counterLabel: "Ghosts scared",
    difficultyMessage: "⚡ Difficulty increased!",
    ghostsNeeded: "⚡ Ghosts to scare: {count}",
    difficultyWarning: "⚠️ Select a difficulty before starting!",
    selectDifficulty: "Select the difficulty:",
    clickToStart: '"Click Start to begin."',
    difficulties: {
      easy: "Easy",
      medium: "Medium",
      hard: "Hard",
      infinite: "Endless",
    },
  },
};

function getCurrentCountFromNode(node) {
  if (!node) return 0;
  const text = node.textContent || "";
  const m = text.match(/\d+/);
  return m ? parseInt(m[0], 10) : 0;
}

function applyLanguage(lang) {
  const t = translations[lang] || translations.it;

  // INTRO + START
  const introParagraphs = document.querySelectorAll("#game-intro p");
  if (introParagraphs.length >= 3) {
    introParagraphs[0].innerHTML = t.intro;
    introParagraphs[1].textContent = t.selectDifficulty;
    introParagraphs[introParagraphs.length - 1].textContent = t.clickToStart;
  }

  const startBtn = document.querySelector("#start-btn");
  if (startBtn) startBtn.textContent = t.start;

  // WIN / LOSE WINDOWS
  const winP = document.querySelector("#win-alert p");
  if (winP) winP.innerHTML = t.win;
  const loseP = document.querySelector("#lose-alert p");
  if (loseP) loseP.innerHTML = t.lose;
  const winRestart = document.querySelector("#win-restart-btn");
  if (winRestart) winRestart.textContent = t.restart;
  const loseRestart = document.querySelector("#lose-restart-btn");
  if (loseRestart) loseRestart.textContent = t.restart;

  // SHOP OPEN BUTTON
  const shopToggle = document.querySelector("#open-shop-btn");
  if (shopToggle) shopToggle.textContent = t.openShop;

  // SHOP TITLE + BUTTONS + CLOSE
  const shopAlert = document.querySelector("#shop-alert");
  if (shopAlert) {
    const title = shopAlert.querySelector("h3");
    if (title) title.textContent = t.shopTitle;

    const moneyDisplay = document.querySelector("#money-display");
    if (moneyDisplay) {
      const current = moneyDisplay.textContent.replace(/\D+/g, "");
      moneyDisplay.textContent = `${t.moneyPrefix} ${current || "0"}`;
    }

    const mapButtons = {
      "#buy-slowerGhost": t.shop.slowerGhost,
      "#buy-extraGhost": t.shop.extraGhost,
      "#buy-doubleClickBonus": t.shop.doubleClickBonus,
      "#buy-luckyGhost": t.shop.luckyGhost,
      "#buy-extraLifeGhost": t.shop.extraLifeGhost,
    };
    for (const [selector, text] of Object.entries(mapButtons)) {
      const el = document.querySelector(selector);
      if (el && !el.disabled) el.textContent = text;
    }

    const closeShopBtn = document.querySelector("#close-shop-btn");
    if (closeShopBtn) closeShopBtn.textContent = t.closeShop;
  }

  // COUNTER LABEL
  const counter = document.querySelector("#counter");
  if (counter) {
    const label = counter.childNodes[0];
    if (label && label.nodeType === Node.TEXT_NODE) {
      label.textContent = `${t.counterLabel} `;
    } else {
      counter.insertBefore(
        document.createTextNode(`${t.counterLabel} `),
        counter.firstChild
      );
    }
  }

  // DIFFICULTY MESSAGES
  const diffMsg = document.querySelector("#difficulty-message");
  if (diffMsg) diffMsg.textContent = t.difficultyMessage;

  const ghostsNeeded = document.querySelector("#ghosts-needed-message");
  if (ghostsNeeded) {
    const current = getCurrentCountFromNode(ghostsNeeded);
    ghostsNeeded.textContent = t.ghostsNeeded.replace(
      "{count}",
      current.toString()
    );
  }

  const diffWarn = document.querySelector("#difficulty-warning");
  if (diffWarn) diffWarn.textContent = t.difficultyWarning;

  // DIFFICULTY BUTTONS
  const diffButtons = document.querySelectorAll(
    "#difficulty-selection button[data-difficulty]"
  );
  diffButtons.forEach((btn) => {
    const key = btn.getAttribute("data-difficulty");
    if (t.difficulties[key]) btn.textContent = t.difficulties[key];
  });

  // Update the buttons on shop
  if (typeof updateShopButtons === "function") updateShopButtons();
}

// INIT LANGUAGE
(function initLanguage() {
  const switchEl = document.getElementById("language-switch");
  if (!switchEl) return;

  const savedLang = localStorage.getItem("lampaway_lang") || "it";
  switchEl.value = savedLang;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () =>
      applyLanguage(savedLang)
    );
  } else {
    applyLanguage(savedLang);
  }

  switchEl.addEventListener("change", (e) => {
    const lang = e.target.value;
    localStorage.setItem("lampaway_lang", lang);
    applyLanguage(lang);
  });
})();

// Helper i18n reusable
window.i18n = {
  getLang() {
    return localStorage.getItem("lampaway_lang") || "it";
  },
  ghostsNeeded(count) {
    const lang = this.getLang();
    const t = translations[lang] || translations.it;
    return t.ghostsNeeded.replace("{count}", String(count));
  },
  extraLifeRebuy() {
    const lang = this.getLang();
    const t = translations[lang] || translations.it;
    return t.extraLifeRebuy;
  },
};

window.i18n.winMessage = function () {
  const lang = this.getLang();
  const t = translations[lang] || translations.it;
  return t.win;
};

// 👻 Lamp Away — developed by Vittorio D’Auria

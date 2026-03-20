export interface BookmarkletItem {
  name: string;
  description: string;
  url: string;
}

export function generateHTML(items: BookmarkletItem[], version: string): string {
  const cardsHTML = items
    .map((b, i) => {
      const url = escapeAttr(b.url);
      const name = escapeAttr(b.name);
      const desc = escapeAttr(b.description) || "No description";
      return `<div class="card" style="view-transition-name: card-${i}" data-url="${url}">
        <div class="card-indicator"></div>
        <a class="card-title" href="${url}">${name}</a>
        <p class="card-desc">${desc}</p>
        <span class="copy-btn" role="button" tabindex="0">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
          Copy
        </span>
      </div>`;
    })
    .join("\n");

  return `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A curated collection of useful bookmarklets for daily workflow." />
  <meta name="color-scheme" content="light dark" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <title>Bookmarklets · v${version}</title>
  <style>
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #f8fafc;
      --bg-card: #ffffff;
      --bg-header: rgba(255,255,255,0.72);
      --text: #0f172a;
      --text-secondary: #64748b;
      --text-tertiary: #94a3b8;
      --primary: #6366f1;
      --primary-hover: #4f46e5;
      --primary-subtle: #eef2ff;
      --border: #e2e8f0;
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
      --shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.06), 0 2px 4px -1px rgba(0,0,0,0.04);
      --shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.08), 0 4px 8px -4px rgba(0,0,0,0.04);
      --radius-sm: 8px;
      --radius: 12px;
      --radius-lg: 16px;
      --gradient: linear-gradient(135deg, #6366f1, #8b5cf6);
      --gradient-subtle: linear-gradient(135deg, #eef2ff, #f5f3ff);
      --font: 'Inter', system-ui, -apple-system, sans-serif;
      --transition: 0.2s ease;
    }

    [data-theme="dark"] {
      --bg: #0b1120;
      --bg-card: #131c31;
      --bg-header: rgba(11,17,32,0.8);
      --text: #eef2ff;
      --text-secondary: #94a3b8;
      --text-tertiary: #64748b;
      --primary: #818cf8;
      --primary-hover: #6366f1;
      --primary-subtle: rgba(99,102,241,0.12);
      --border: #1e293b;
      --shadow-sm: 0 1px 2px rgba(0,0,0,0.2);
      --shadow: 0 1px 3px rgba(0,0,0,0.25);
      --shadow-md: 0 4px 6px -1px rgba(0,0,0,0.3);
      --shadow-lg: 0 10px 25px -3px rgba(0,0,0,0.35);
      --gradient-subtle: linear-gradient(135deg, rgba(99,102,241,0.08), rgba(139,92,246,0.08));
    }

    html { color-scheme: light dark; }
    body {
      font-family: var(--font);
      background: var(--bg);
      color: var(--text);
      line-height: 1.6;
      min-height: 100vh;
      transition: background var(--transition), color var(--transition);
    }

    /* ── Header ── */
    header {
      position: sticky;
      top: 0;
      z-index: 10;
      backdrop-filter: blur(16px) saturate(1.5);
      -webkit-backdrop-filter: blur(16px) saturate(1.5);
      background: var(--bg-header);
      border-bottom: 1px solid var(--border);
      transition: background var(--transition), border-color var(--transition);
    }
    .header-inner {
      max-width: 960px;
      margin: 0 auto;
      padding: 16px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 16px;
    }
    .header-left { display: flex; align-items: center; gap: 12px; min-width: 0; }
    .logo {
      width: 36px; height: 36px;
      background: var(--gradient);
      border-radius: var(--radius-sm);
      display: flex; align-items: center; justify-content: center;
      font-size: 18px; flex-shrink: 0;
    }
    .header-left h1 {
      font-size: 1.25rem;
      font-weight: 700;
      letter-spacing: -0.02em;
      white-space: nowrap;
    }
    .header-left .version {
      font-size: 0.7rem;
      font-weight: 600;
      color: var(--primary);
      background: var(--primary-subtle);
      padding: 2px 8px;
      border-radius: 999px;
      white-space: nowrap;
      flex-shrink: 0;
    }
    .header-actions { display: flex; align-items: center; gap: 8px; flex-shrink: 0; }

    .theme-toggle {
      background: transparent;
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      width: 36px; height: 36px;
      display: flex; align-items: center; justify-content: center;
      cursor: pointer;
      color: var(--text-secondary);
      font-size: 1rem;
      transition: all var(--transition);
    }
    .theme-toggle:hover {
      border-color: var(--primary);
      color: var(--primary);
      background: var(--primary-subtle);
    }

    /* ── Hero ── */
    .hero {
      text-align: center;
      padding: 48px 24px 32px;
      max-width: 640px;
      margin: 0 auto;
    }
    .hero h2 {
      font-size: 2rem;
      font-weight: 700;
      letter-spacing: -0.03em;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    .hero h2 span {
      background: var(--gradient);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .hero p {
      color: var(--text-secondary);
      font-size: 1.05rem;
    }

    /* ── Controls ── */
    .controls {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px 24px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .search-wrap {
      flex: 1;
      position: relative;
    }
    .search-wrap svg {
      position: absolute;
      left: 14px;
      top: 50%;
      transform: translateY(-50%);
      color: var(--text-tertiary);
      pointer-events: none;
      transition: color var(--transition);
    }
    .search-wrap:focus-within svg { color: var(--primary); }
    #search {
      width: 100%;
      padding: 10px 14px 10px 40px;
      font-family: var(--font);
      font-size: 0.9rem;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      color: var(--text);
      outline: none;
      transition: all var(--transition);
    }
    #search:focus {
      border-color: var(--primary);
      box-shadow: 0 0 0 3px var(--primary-subtle);
    }
    #search::placeholder { color: var(--text-tertiary); }
    #count {
      font-size: 0.8rem;
      color: var(--text-tertiary);
      font-weight: 500;
      white-space: nowrap;
      flex-shrink: 0;
    }

    /* ── Grid ── */
    .grid {
      max-width: 960px;
      margin: 0 auto;
      padding: 0 24px 48px;
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 12px;
    }

    /* ── Card ── */
    .card {
      position: relative;
      background: var(--bg-card);
      border: 1px solid var(--border);
      border-radius: var(--radius);
      padding: 20px;
      display: flex;
      flex-direction: column;
      gap: 8px;
      cursor: pointer;
      position: relative;
      transition: all 0.25s ease;
      opacity: 0;
      transform: translateY(8px);
      animation: card-in 0.4s ease forwards;
      animation-delay: var(--delay, 0s);
      content-visibility: auto;
      contain: layout style;
    }

    @keyframes card-in {
      to { opacity: 1; transform: translateY(0); }
    }

    .card:hover {
      border-color: var(--primary);
      box-shadow: var(--shadow-md);
      transform: translateY(-2px);
    }
    .card:focus-visible {
      outline: 2px solid var(--primary);
      outline-offset: 2px;
    }

    .card.hidden {
      display: none;
    }

    .card-indicator {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 3px;
      background: var(--gradient);
      border-radius: var(--radius) var(--radius) 0 0;
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .card:hover .card-indicator { opacity: 1; }

    .card-title {
      font-size: 1rem;
      font-weight: 600;
      letter-spacing: -0.01em;
      line-height: 1.3;
      color: inherit;
      text-decoration: none;
      position: relative;
      z-index: 1;
    }
    .card-desc {
      font-size: 0.85rem;
      color: var(--text-secondary);
      line-height: 1.5;
      flex: 1;
    }
    .copy-btn {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      padding: 6px 14px;
      font-family: var(--font);
      font-size: 0.78rem;
      font-weight: 500;
      background: transparent;
      color: var(--text-tertiary);
      border: 1px solid var(--border);
      border-radius: var(--radius-sm);
      cursor: pointer;
      transition: all 0.2s ease;
      align-self: flex-start;
      margin-top: 4px;
    }
    .card:hover .copy-btn {
      color: var(--primary);
      border-color: var(--primary);
      background: var(--primary-subtle);
    }
    .copy-btn.copied {
      color: #22c55e;
      border-color: #22c55e;
      background: rgba(34,197,94,0.08);
    }

    /* ── Toast ── */
    .toast {
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translateX(-50%) translateY(80px);
      background: var(--text);
      color: var(--bg);
      padding: 10px 20px;
      border-radius: var(--radius-sm);
      font-size: 0.85rem;
      font-weight: 500;
      font-family: var(--font);
      pointer-events: none;
      opacity: 0;
      transition: all 0.35s ease;
      z-index: 100;
      white-space: nowrap;
    }
    .toast.show {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }

    /* ── Empty state ── */
    .empty-state {
      grid-column: 1 / -1;
      text-align: center;
      padding: 48px 24px;
      color: var(--text-tertiary);
    }
    .empty-state.hidden { display: none; }

    /* ── Footer ── */
    footer {
      text-align: center;
      padding: 24px;
      color: var(--text-tertiary);
      font-size: 0.8rem;
      border-top: 1px solid var(--border);
      transition: border-color var(--transition);
    }

    /* ── Responsive ── */
    @media (max-width: 640px) {
      .hero h2 { font-size: 1.5rem; }
      .grid { grid-template-columns: 1fr; padding: 0 16px 32px; gap: 10px; }
      .header-inner { padding: 12px 16px; }
      .hero { padding: 32px 16px 24px; }
      .controls { padding: 0 16px 16px; flex-wrap: wrap; }
    }
  </style>
</head>
<body>
  <header>
    <div class="header-inner">
      <div class="header-left">
        <div class="logo">🛠</div>
        <h1>Bookmarklets</h1>
        <span class="version">v${version}</span>
      </div>
      <div class="header-actions">
        <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme" type="button">
          <svg class="theme-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
    </div>
  </header>

  <section class="hero">
    <h2>Drag a <span>bookmarklet</span> into your bookmarks bar</h2>
    <p>Click any card to copy its bookmarklet URL, then paste it as a bookmark URL.</p>
  </section>

  <div class="controls">
    <div class="search-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
      <input id="search" type="search" placeholder="Filter bookmarklets..." autocomplete="off" />
    </div>
    <span id="count">${items.length} item${items.length !== 1 ? "s" : ""}</span>
  </div>

  <div class="grid" id="grid">
    ${cardsHTML}
    <div class="empty-state hidden" id="emptyState">
      <p>No bookmarklets match your filter.</p>
    </div>
  </div>

  <footer>
    Generated on ${/* @__PURE__ */new Date().toISOString().slice(0, 10)} &middot; ${items.length} bookmarklet${items.length !== 1 ? "s" : ""}
  </footer>

  <div class="toast" id="toast"></div>

  <script>
    (function() {
      "use strict";

      /* ── Theme ── */
      const html = document.documentElement;
      const toggle = document.getElementById("themeToggle");
      const themeIcon = toggle.querySelector(".theme-icon path");

      const moonPath = "M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z";
      const sunPath = "M12 1v2m0 18v2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M1 12h2m18 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 1 0 0 12 6 6 0 0 0 0-12z";

      function getPreferredTheme() {
        const stored = localStorage.getItem("theme");
        if (stored === "light" || stored === "dark") return stored;
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
      }

      function setTheme(theme) {
        html.setAttribute("data-theme", theme);
        themeIcon.setAttribute("d", theme === "dark" ? sunPath : moonPath);
        localStorage.setItem("theme", theme);
      }

      setTheme(getPreferredTheme());

      toggle.addEventListener("click", function() {
        const next = html.getAttribute("data-theme") === "dark" ? "light" : "dark";
        setTheme(next);
      });

      /* ── Search with debounce ── */
      const search = document.getElementById("search");
      const cards = document.querySelectorAll(".card");
      const count = document.getElementById("count");
      const empty = document.getElementById("emptyState");
      const total = cards.length;
      let searchTimer = null;

      /* ── Stagger animation ── */
      cards.forEach(function(card, i) {
        card.style.setProperty("--delay", (0.02 + i * 0.04).toFixed(2) + "s");
      });

      function filterCards() {
        const q = search.value.toLowerCase().trim();
        let visible = 0;
        cards.forEach(function(card) {
          const title = card.querySelector(".card-title").textContent.toLowerCase();
          const desc = card.querySelector(".card-desc").textContent.toLowerCase();
          const match = !q || title.includes(q) || desc.includes(q);
          card.classList.toggle("hidden", !match);
          if (match) visible++;
        });
        count.textContent = visible + " / " + total + " item" + (total !== 1 ? "s" : "");
        empty.classList.toggle("hidden", visible > 0);
      }

      search.addEventListener("input", function() {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(filterCards, 100);
      });

      /* ── Copy & Drag ── */
      const toast = document.getElementById("toast");
      let toastTimer = null;

      function showToast(msg) {
        toast.textContent = msg;
        toast.classList.add("show");
        clearTimeout(toastTimer);
        toastTimer = setTimeout(function() { toast.classList.remove("show"); }, 2000);
      }

      function copyAndFeedback(url) {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(url).then(function() {
            showToast("Copied to clipboard!");
          }).catch(function() {
            fallbackCopy(url);
          });
        } else {
          fallbackCopy(url);
        }
      }

      function fallbackCopy(text) {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          showToast("Copied to clipboard!");
        } catch (_) {
          showToast("Press Ctrl+C to copy");
        }
        document.body.removeChild(ta);
      }

      cards.forEach(function(card) {
        const url = card.getAttribute("data-url");
        const titleLink = card.querySelector(".card-title");
        const copyBtn = card.querySelector(".copy-btn");

        /* Title link: drag-to-bookmark uses native <a> behavior, click copies */
        titleLink.addEventListener("click", function(e) {
          e.preventDefault();
          copyAndFeedback(url);
        });

        /* Copy button */
        copyBtn.addEventListener("click", function(e) {
          e.stopPropagation();
          copyAndFeedback(url);
        });

        /* Click on card background also copies */
        card.addEventListener("click", function(e) {
          if (e.target.closest(".copy-btn") || e.target.closest(".card-title")) return;
          copyAndFeedback(url);
        });
      });
    })();
  </script>
</body>
</html>`;
}

function escapeAttr(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

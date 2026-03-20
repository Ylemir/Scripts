// ==UserScript==
// @name        ddys.la 自动识别密码
// @namespace   http://tampermonkey.net/
// @version      0.1
// @description 自动识别页面上的密码并填写确认
// @author      Ylem
// @include     https://ddys.la/*
// @include     https://*.ddys.la/*
// @icon        https://ddys.la/template/dd/statics/img/favicon.ico
// @grant       none
// ==/UserScript==

(function () {
  "use strict";

  function extractPassword() {
    // 方法1: 从 p 标签提取 "密码是：123459"
    const p = document.querySelector("p");
    if (p) {
      const m = p.textContent.match(/密码(?:是)?[：:]\s*(\S+)/);
      if (m) return m[1];
    }
    // 方法2: 从页面内联 script 提取 CORRECT_PWD
    const scripts = document.querySelectorAll("script");
    for (const s of scripts) {
      const m = s.textContent.match(/CORRECT_PWD\s*=\s*["']([^"']+)["']/);
      if (m) return m[1];
    }
    return "";
  }

  function doFill() {
    const pwd = extractPassword();
    if (!pwd) return false;

    const input = document.getElementById("password") || document.querySelector('input[type="password"]');
    if (!input) return false;

    // 避免重复填写
    if (input.dataset.filled) return true;

    input.value = pwd;
    input.dispatchEvent(new Event("input", { bubbles: true }));
    input.dataset.filled = "1";

    // 点击确认按钮
    const btn = document.getElementById("submit") || document.querySelector(".submit-btn") || document.querySelector("button");
    if (btn) {
      btn.click();
      console.log('Auto fill done')
      return true;
    }
    return false;
  }

  // 页面加载后执行
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", doFill);
  } else {
    doFill();
  }

  // 动态加载时重试
  let tries = 0;
  const timer = setInterval(() => {
    if (doFill() || ++tries > 10) clearInterval(timer);
  }, 500);
})();

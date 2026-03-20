// ==UserScript==
// @name         关闭页面初始弹窗
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  关闭页面打开的初始弹窗
// @author       Ylem
// @include      https://*ddys*/*
// @include      https://*libvio*/*
// @include      https://*lmm*.com/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  function closePopup() {
    const popup = document.querySelector("div.popup#note");
    if (popup) {
      console.log('hide popup');
      popup.style.display = "none";
      popup.style.visibility = "hidden";
      return true;
    }
    return false;
  }

  // 先尝试直接关闭已存在的弹窗
  if (closePopup()) return;

  // 弹窗可能在DOM更新后才出现，用MutationObserver监听
  const observer = new MutationObserver(() => {
    if (closePopup()) {
      observer.disconnect();
    }
  });

  observer.observe(document.body || document.documentElement, {
    childList: true,
    subtree: true,
  });
})();

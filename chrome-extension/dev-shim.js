// dev-shim.js — lets the SAME code run both as a Chrome extension AND on
// plain localhost for fast iteration. In the real extension `chrome.*` exists
// and this file is a no-op. On localhost it fakes the few chrome APIs we use.
(function () {
  var hasChrome = (typeof chrome !== "undefined") && chrome.runtime && chrome.runtime.getURL;
  if (hasChrome) return; // real extension → do nothing

  window.__SP_DEV__ = true;
  window.chrome = window.chrome || {};
  window.chrome.runtime = window.chrome.runtime || {};
  // relative URLs resolve against the served page (localhost)
  window.chrome.runtime.getURL = function (p) { return p; };
  window.chrome.tabs = window.chrome.tabs || {
    query: function () { return Promise.resolve([]); },
    create: function (o) { window.open(o.url, "_blank"); }
  };
  window.chrome.scripting = window.chrome.scripting || {
    executeScript: function () { return Promise.resolve([{ result: [] }]); }
  };
  console.log("%cSammaPix DEV preview (localhost)", "color:#818cf8;font-weight:700");
})();

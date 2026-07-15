// ═══════════════════════════════════════════════════════════════
// SammaPix v5 — "Da pagina": grab the current page's images, act in bulk.
// This is the extension's superpower + the premium funnel.
// Quota is the SAME as sammapix.com (/api/usage/images, shared per account):
//   not logged in → sign up (free) · free → 50/day · Pro → unlimited
// ═══════════════════════════════════════════════════════════════
window.PageWS = (function () {
  var API = "https://www.sammapix.com/api/usage/images";
  var UTM = "?ref=ext&utm_source=extension&utm_medium=page-bulk";
  var SIGNUP = "https://www.sammapix.com/auth/signin" + UTM;
  var PRICING = "https://www.sammapix.com/pricing" + UTM;
  var DAYPASS = "https://www.sammapix.com/pricing" + UTM + "#daypass";
  var bd = null, images = [], selected = null;

  function esc(x) { return window.SP.esc(x); }
  function openUrl(u) { if (chrome.tabs && chrome.tabs.create) chrome.tabs.create({ url: u }); else window.open(u, "_blank"); }

  // ─── DEMO (solo localhost: prova il funnel senza estensione né login) ───
  function demoOpen() {
    images = sampleImages();
    selected = new Set(images.map(function (i) { return i.src; }));
    if (!window.__demoQ) window.__demoQ = { auth: false };
    render();
  }
  function sampleImages() {
    var cols = ["#e5484d", "#3b82f6", "#16a34a", "#8b5cf6", "#d98420", "#0891b2", "#db2777", "#64748b", "#12a594"];
    return cols.map(function (c, i) {
      var cv = document.createElement("canvas"); cv.width = 300; cv.height = 220;
      var x = cv.getContext("2d");
      var g = x.createLinearGradient(0, 0, 300, 220); g.addColorStop(0, c); g.addColorStop(1, "#111");
      x.fillStyle = g; x.fillRect(0, 0, 300, 220);
      x.fillStyle = "rgba(255,255,255,.92)"; x.font = "bold 22px sans-serif"; x.fillText("foto " + (i + 1), 18, 40);
      return { src: cv.toDataURL("image/jpeg", 0.9), w: 300, h: 220 };
    });
  }
  function demoBanner() {
    var q = window.__demoQ || { auth: false };
    var lbl = !q.auth ? "Signed out" : q.plan === "pro" ? "Pro (unlimited)" : "Free " + q.used + "/" + q.limit;
    return '<div style="background:linear-gradient(135deg,#6366f1,#818cf8);color:#fff;border-radius:12px;padding:10px 12px;margin-bottom:10px;font-size:11px">' +
      '🎬 <b>DEMO</b> · account status: <b>' + lbl + '</b> · switch state to see the gates:' +
      '<div style="display:flex;gap:5px;flex-wrap:wrap;margin-top:7px">' +
      demoBtn("out", "Signed out") + demoBtn("mid", "Free 45/50") + demoBtn("full", "Free 50/50") + demoBtn("pro", "Pro") + '</div></div>';
  }
  function demoBtn(k, label) { return '<button class="chip" data-demo="' + k + '" style="background:rgba(255,255,255,.2);border-color:transparent;color:#fff;font-size:10px;padding:5px 9px">' + label + '</button>'; }
  function setDemo(k) {
    if (k === "out") window.__demoQ = { auth: false };
    else if (k === "mid") window.__demoQ = { auth: true, plan: "free", used: 45, limit: 50, remaining: 5 };
    else if (k === "full") window.__demoQ = { auth: true, plan: "free", used: 50, limit: 50, remaining: 0 };
    else window.__demoQ = { auth: true, plan: "pro", used: 0, limit: 999999, remaining: 999999 };
    render();
  }

  async function buyDayPass() {
    if (window.__SP_DEV__) { toast("Demo: this launches the Day Pass Stripe checkout (direct)"); return; }
    try {
      var r = await fetch("https://www.sammapix.com/api/checkout/day-pass", { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ source: "extension/page-bulk" }) });
      var j = await r.json();
      if (j && j.url) openUrl(j.url); else openUrl(DAYPASS);
    } catch (e) { openUrl(DAYPASS); }
  }

  async function open() {
    bd = window.SP.toolShell("Images on this page", window.SP.home);
    if (window.__SP_DEV__) { return demoOpen(); }
    bd.innerHTML = '<div class="load"><div class="spin"></div>Reading the page\'s images…</div>';
    try {
      images = await doScan();
      selected = new Set(images.map(function (i) { return i.src; })); // all selected by default
      if (!images.length) { bd.innerHTML = '<div class="err">No images found on this page.</div>'; return; }
      render();
    } catch (e) {
      bd.innerHTML = '<div class="err">' + (e.message === "no-tab" ? "Open a normal website first, then try again." : "Error: " + esc(e.message || String(e))) + '</div>';
    }
  }

  async function doScan() {
    var tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tabs || !tabs[0] || !(tabs[0].url || "").startsWith("http")) throw new Error("no-tab");
    var res = await chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: function () {
        var seen = {}, out = [];
        function add(s, w, h) {
          if (!s || s.length < 10 || s.indexOf("data:image/svg") === 0 || s.indexOf("data:image/gif") === 0 || seen[s]) return;
          seen[s] = 1; out.push({ src: s, w: w || 0, h: h || 0 });
        }
        document.querySelectorAll("img").forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.width >= 40 || r.height >= 40 || el.naturalWidth >= 60) add(el.currentSrc || el.src, el.naturalWidth, el.naturalHeight);
          var lz = el.getAttribute("data-src") || el.getAttribute("data-old-hires") || el.getAttribute("data-lazy") || el.getAttribute("data-original");
          if (lz && lz.indexOf("http") === 0) add(lz, 0, 0);
          var dyn = el.getAttribute("data-a-dynamic-image");
          if (dyn) { try { var o = JSON.parse(dyn); var best = Object.keys(o).sort(function (a, b) { return (o[b][0] || 0) - (o[a][0] || 0); })[0]; if (best) add(best, o[best][0], o[best][1]); } catch (e) {} }
        });
        document.querySelectorAll("*").forEach(function (el) {
          if (out.length > 600) return;
          var bg = getComputedStyle(el).backgroundImage; if (!bg || bg === "none") return;
          var m = bg.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/); if (!m) return;
          var r = el.getBoundingClientRect(); if (r.width < 50 && r.height < 50) return;
          add(m[1], 0, 0);
        });
        return out;
      }
    });
    return (res && res[0] && res[0].result) || [];
  }

  async function refresh() {
    var cnt = document.getElementById("pcount"); if (cnt) cnt.textContent = "Refreshing…";
    try {
      var fresh = await doScan();
      var have = {}; images.forEach(function (i) { have[i.src] = 1; });
      var added = 0;
      fresh.forEach(function (i) { if (!have[i.src]) { images.push(i); selected.add(i.src); added++; } });
      render();
      toast(added ? "+" + added + " new images" : "Nothing new (scroll the page and retry)");
    } catch (e) { toast("Refresh failed"); }
  }

  function render() {
    var html = (window.__SP_DEV__ ? demoBanner() : '');
    html += '<div id="pquota" style="font-size:11px;color:var(--dim);font-weight:600;text-align:center;margin-bottom:8px">…</div>';
    html += '<div class="topbar"><span id="pcount">' + selected.size + ' of ' + images.length + ' selected</span>' +
      '<div style="display:flex;gap:6px">' +
      (window.__SP_DEV__ ? '' : '<button class="chip" id="prefresh" title="Re-scan the page (after scrolling)">⟳ Refresh</button>') +
      '<button class="chip" id="ptoggle">' + (selected.size === images.length ? "Deselect" : "Select all") + '</button></div></div>';
    html += '<div class="pgrid">';
    images.forEach(function (im, i) {
      var on = selected.has(im.src);
      html += '<div class="pcard' + (on ? " on" : "") + '" data-i="' + i + '" style="position:relative;border-color:' + (on ? "var(--accent)" : "var(--border)") + '">' +
        '<div class="th"><img src="' + esc(im.src) + '" loading="lazy"></div>' +
        '<div class="cap">' + (im.w ? im.w + "×" + im.h : "img") + '</div>' +
        '<div style="position:absolute;top:5px;left:5px;width:18px;height:18px;border-radius:9px;background:' + (on ? "var(--accent)" : "rgba(0,0,0,.35)") + ';color:#fff;font-size:11px;display:flex;align-items:center;justify-content:center">' + (on ? "✓" : "") + '</div></div>';
    });
    html += '</div>';
    html += '<div class="savebar" style="margin-top:8px;flex-wrap:wrap">' +
      '<button class="cta sec" id="pdl" style="margin:0;flex:1">↓ Download ZIP</button>' +
      '<button class="cta" id="pcomp" style="margin:0;flex:1">🗜️ Compress ZIP</button>' +
      '<button class="cta sec" id="pren" style="margin:0;flex-basis:100%">✏️ Bulk rename</button></div>';
    bd.innerHTML = html;

    bd.querySelectorAll("[data-i]").forEach(function (c) {
      c.addEventListener("click", function () {
        var im = images[parseInt(c.getAttribute("data-i"))];
        if (selected.has(im.src)) selected.delete(im.src); else selected.add(im.src);
        render();
      });
    });
    document.getElementById("ptoggle").addEventListener("click", function () {
      if (selected.size === images.length) selected.clear(); else selected = new Set(images.map(function (i) { return i.src; }));
      render();
    });
    document.getElementById("pdl").addEventListener("click", function () { bulk("download"); });
    document.getElementById("pcomp").addEventListener("click", function () { bulk("compress"); });
    document.getElementById("pren").addEventListener("click", renamePanel);
    var rf = document.getElementById("prefresh"); if (rf) rf.addEventListener("click", refresh);
    if (window.__SP_DEV__) bd.querySelectorAll("[data-demo]").forEach(function (b) { b.addEventListener("click", function () { setDemo(b.getAttribute("data-demo")); }); });
    refreshQuota();
  }

  function renamePanel() {
    if (!selected.size) { toast("Select at least one image"); return; }
    bd.innerHTML = '<div class="opt"><h4>✏️ Rename ' + selected.size + ' images</h4>' +
      '<div class="row"><input type="text" id="rpat" value="photo-###" placeholder="e.g. holiday-###"></div>' +
      '<div class="hint">Use <b>###</b> for the sequential number (photo-001, photo-002…). You\'ll download a ZIP with the new names.</div>' +
      '<button class="cta" id="rgo" style="margin-top:12px">↓ Download renamed (ZIP)</button>' +
      '<button class="cta sec" id="rback" style="margin-top:8px">‹ Back</button></div>';
    document.getElementById("rgo").addEventListener("click", function () { bulk("rename", document.getElementById("rpat").value || "photo-###"); });
    document.getElementById("rback").addEventListener("click", render);
  }
  function applyPattern(pat, n) {
    var m = pat.match(/#+/);
    if (m) return pat.replace(/#+/, String(n).padStart(m[0].length, "0"));
    if (pat.indexOf("{n}") > -1) return pat.replace("{n}", n);
    return pat + "-" + n;
  }

  async function refreshQuota() {
    var el = document.getElementById("pquota"); if (!el) return;
    var q = await getQuota();
    if (q.error) { el.textContent = ""; return; }
    if (!q.auth) { el.innerHTML = '👤 You\'re not signed in · <span style="color:var(--accent)">sign up free</span> for bulk actions'; return; }
    if (q.plan === "pro") { el.innerHTML = '⭐ Pro · unlimited images'; return; }
    el.textContent = "Today: " + q.used + "/" + q.limit + " images (free)";
  }

  async function getQuota() {
    if (window.__SP_DEV__) return window.__demoQ || { auth: false };
    try {
      var r = await fetch(API, { credentials: "include" });
      if (r.status === 401) return { auth: false };
      var j = await r.json();
      return { auth: true, used: j.used, limit: j.limit, remaining: j.remaining, plan: j.plan };
    } catch (e) { return { error: true }; }
  }
  async function consume(n) {
    if (window.__SP_DEV__) {
      var q = window.__demoQ;
      if (q && q.auth && q.plan !== "pro") { q.used += n; q.remaining = Math.max(0, q.limit - q.used); }
      return;
    }
    try { await fetch(API, { method: "POST", credentials: "include", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ count: n }) }); } catch (e) {}
  }

  function gate(html) {
    bd.innerHTML = '<div style="text-align:center;padding:30px 18px"><div style="font-size:40px;margin-bottom:12px">🔒</div>' + html +
      '<button class="cta sec" id="pback" style="margin-top:14px">‹ Back to images</button></div>';
    document.getElementById("pback").addEventListener("click", render);
  }

  async function bulk(type, pattern) {
    var list = Array.from(selected);
    if (!list.length) { toast("Select at least one image"); return; }
    // Optional host access: request <all_urls> at runtime (only when the user runs a
    // bulk action) so the default install stays on narrow, faster-to-review permissions.
    if (!window.__SP_DEV__ && chrome.permissions && chrome.permissions.request) {
      var okHost = await chrome.permissions.request({ origins: ["<all_urls>"] });
      if (!okHost) { toast("Allow site access to run bulk actions"); return; }
    }
    // One shared rule (site + extension): every bulk action counts toward the
    // 50/day quota. Pro = unlimited.
    var needsQuota = true;
    var q = await getQuota();
    if (q.error) { toast("Couldn't reach your SammaPix account"); return; }
    if (!q.auth) {
      gate('<div style="font-size:15px;font-weight:700;margin-bottom:6px">Continue with Google</div>' +
        '<div style="font-size:12px;color:var(--dim);line-height:1.5">Bulk actions (download, compress, rename) are free with a SammaPix account: up to 50 images a day, unlimited with Pro. Same quota as the site, one account.</div>' +
        (window.__SP_DEV__ ? '<div style="font-size:10.5px;color:var(--dim);margin-top:10px">🎬 Demo: login is simulated here. The real extension reads your actual Google session.</div>' : '') +
        '<button class="cta" id="psignup" style="margin-top:14px">Continue with Google →</button>' +
        '<button class="cta sec" id="pretry" style="margin-top:8px">I already signed in → Retry</button>');
      var b = document.getElementById("psignup"); if (b) b.addEventListener("click", function () {
        if (window.__SP_DEV__) { window.__demoQ = { auth: true, plan: "free", used: 0, limit: 50, remaining: 50 }; bulk(type, pattern); }
        else openUrl(SIGNUP);
      });
      var rt = document.getElementById("pretry"); if (rt) rt.addEventListener("click", function () {
        if (window.__SP_DEV__) window.__demoQ = { auth: true, plan: "free", used: 0, limit: 50, remaining: 50 };
        bulk(type, pattern);
      });
      return;
    }
    if (needsQuota && q.plan !== "pro" && list.length > q.remaining) {
      gate('<div style="font-size:15px;font-weight:700;margin-bottom:6px">Daily limit reached</div>' +
        '<div style="font-size:12px;color:var(--dim);line-height:1.5">You\'ve used ' + q.used + '/' + q.limit + ' images today (you selected ' + list.length + '). Keep going without limits:</div>' +
        '<button class="cta" id="pupg" style="margin-top:14px">⭐ Upgrade to Pro (always unlimited)</button>' +
        '<button class="cta sec" id="pday" style="margin-top:8px">🎟️ Day Pass (unlimited today only)</button>');
      var u = document.getElementById("pupg"); if (u) u.addEventListener("click", function () { openUrl(PRICING); });
      var dp = document.getElementById("pday"); if (dp) dp.addEventListener("click", buyDayPass);
      return;
    }
    run(type, list, pattern, needsQuota);
  }

  async function run(type, list, pattern, needsQuota) {
    if (typeof JSZip === "undefined") { toast("ZIP not available"); return; }
    var verb = type === "compress" ? "Compressing" : type === "rename" ? "Renaming" : "Downloading";
    bd.innerHTML = '<div class="load"><div class="spin"></div>' + verb + ' ' + list.length + ' images…<div class="bar"><span id="pbar"></span></div></div>';
    var zip = new JSZip(), used = {}, ok = 0;
    for (var i = 0; i < list.length; i++) {
      try {
        var resp = await fetch(list[i]); var blob = await resp.blob();
        var base = nameOf(list[i]); if (used[base]) base = base + "-" + (used[base]++); else used[base] = 1;
        if (type === "compress") {
          var bmp = await createImageBitmap(blob);
          var c = document.createElement("canvas"); c.width = bmp.width; c.height = bmp.height;
          c.getContext("2d").drawImage(bmp, 0, 0); if (bmp.close) bmp.close();
          var cb = await new Promise(function (r) { c.toBlob(r, "image/webp", 0.8); });
          zip.file(base + ".webp", cb || blob);
        } else if (type === "rename") {
          zip.file(applyPattern(pattern || "photo-###", i + 1) + extOf(list[i]), blob);
        } else {
          zip.file(base + extOf(list[i]), blob);
        }
        ok++;
      } catch (e) {}
      var pb = document.getElementById("pbar"); if (pb) pb.style.width = Math.round((i + 1) / list.length * 100) + "%";
    }
    if (!ok) { toast("No downloadable images"); render(); return; }
    var out = await zip.generateAsync({ type: "blob" });
    var u = URL.createObjectURL(out); var a = document.createElement("a"); a.href = u; a.download = "sammapix-page.zip";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 8000);
    if (needsQuota) await consume(ok); // solo l'elaborazione conta sulla quota
    toast("✓ ZIP ready (" + ok + " images)");
    render();
  }

  function nameOf(src) { try { return (new URL(src).pathname.split("/").pop().split(".")[0] || "img").replace(/[^a-zA-Z0-9_-]/g, "") || "img"; } catch (e) { return "img"; } }
  function extOf(src) { try { var e = new URL(src).pathname.split(".").pop().toLowerCase(); return /^(jpe?g|png|webp|gif|bmp|svg|avif)$/.test(e) ? "." + e : ".jpg"; } catch (e) { return ".jpg"; } }

  return { open: open };
})();

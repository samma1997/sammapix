// ═══════════════════════════════════════════════════════════════
// SammaPix v5 — toolbox shell. Home = grid of distinct tools.
// Native tools run 100% in the browser; the rest open on sammapix.com.
// ═══════════════════════════════════════════════════════════════
var $view = document.getElementById("view");
var atHome = true;

function detectKind(f) {
  var n = (f.name || "").toLowerCase(), t = f.type || "";
  if (t.indexOf("image/") === 0 || /\.(jpe?g|png|webp|gif|bmp|svg|heic|avif|tiff?)$/.test(n)) return "image";
  if (/\.(rar|7z|zip|tar|gz|tgz|bz2|xz|cbr|cbz)$/.test(n)) return "archive";
  if (t === "application/pdf" || /\.pdf$/.test(n)) return "pdf";
  return "unknown";
}
function routeFile(f) {
  var k = detectKind(f);
  if (k === "image") window.ImageTool.openWith(f, f.name);
  else if (k === "archive") window.ArchiveWS.open(f);
  else if (k === "pdf") { toast("PDF: opening on the web"); openUrl(siteUrl("pdf-merge")); }
  else toast("Unsupported file (image, RAR, 7z, ZIP, PDF)");
}
document.addEventListener("dragover", function (e) { if (atHome) e.preventDefault(); });
document.addEventListener("drop", function (e) {
  if (!atHome) return;
  e.preventDefault();
  var f = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
  if (f) routeFile(f);
});

// ─── icons (clean inline SVG, colored via currentColor) ───
function ic(name) {
  var s = 'stroke="currentColor" stroke-width="1.7" fill="none" stroke-linecap="round" stroke-linejoin="round"';
  var P = {
    compress: '<path d="M8 4v4H4M16 4v4h4M8 20v-4H4M16 20v-4h4" ' + s + '/>',
    archive: '<path d="M3 7l9-4 9 4v10l-9 4-9-4V7z" ' + s + '/><path d="M12 3v18M3 7l9 4 9-4" ' + s + '/>',
    convert: '<path d="M4 9a8 8 0 0113-3l3 2M20 15a8 8 0 01-13 3l-3-2" ' + s + '/><path d="M17 4v4h-4M7 20v-4h4" ' + s + '/>',
    pdf: '<rect x="5" y="3" width="14" height="18" rx="2" ' + s + '/><path d="M9 8h6M9 12h6M9 16h4" ' + s + '/>',
    resize: '<rect x="4" y="4" width="16" height="16" rx="2" ' + s + '/><path d="M9 9l6 6M15 9v6h-6" ' + s + '/>',
    scissors: '<circle cx="6" cy="7" r="2.5" ' + s + '/><circle cx="6" cy="17" r="2.5" ' + s + '/><path d="M8 9l12 8M8 15l12-8" ' + s + '/>',
    crop: '<path d="M7 3v14h14M3 7h14v14" ' + s + '/>',
    stamp: '<circle cx="12" cy="12" r="9" ' + s + '/><path d="M14.5 9.5a2.5 2.5 0 100 5" ' + s + '/>',
    blur: '<path d="M12 3s6 6 6 10a6 6 0 01-12 0c0-4 6-10 6-10z" ' + s + '/>',
    shield: '<path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6l7-3z" ' + s + '/><path d="M9 12l2 2 4-4" ' + s + '/>',
    image: '<rect x="3" y="4" width="18" height="16" rx="2" ' + s + '/><circle cx="8.5" cy="9.5" r="1.5" ' + s + '/><path d="M4 18l5-5 4 4 3-3 4 4" ' + s + '/>',
    camera: '<path d="M4 8h3l2-2h6l2 2h3v11H4V8z" ' + s + '/><circle cx="12" cy="13" r="3.5" ' + s + '/>',
    palette: '<path d="M12 3a9 9 0 000 18c1.5 0 2-1 2-2s-.5-1.5-.5-2 .5-1 1.5-1H18a3 3 0 003-3c0-4.5-4-8-9-8z" ' + s + '/><circle cx="8" cy="10" r="1" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none"/><circle cx="16" cy="10" r="1" fill="currentColor" stroke="none"/>',
    grid: '<rect x="4" y="4" width="6" height="6" rx="1.5" ' + s + '/><rect x="14" y="4" width="6" height="6" rx="1.5" ' + s + '/><rect x="4" y="14" width="6" height="6" rx="1.5" ' + s + '/><path d="M17 14v6M14 17h6" ' + s + '/>'
  };
  return '<svg viewBox="0 0 24 24">' + (P[name] || '') + '</svg>';
}

// ─── tool registry ───
// native ids handled locally; tools with `site` open sammapix.com/tools/<site>
var TOOLS = [
  { g: "Featured", id: "compress",  lb: "Compress",  sub: "JPG · WebP",   tile: "t-indigo", col: "#5b5ef0", icon: "compress" },
  { g: "Featured", id: "convert",   lb: "Convert",   sub: "WebP/PNG/JPG", tile: "t-teal",   col: "#12a594", icon: "convert" },
  { g: "Featured", id: "unrar",     lb: "Open RAR",  sub: "extract",       tile: "t-amber",  col: "#d98420", icon: "archive" },
  { g: "Featured", id: "sevenzip",  lb: "7z · ZIP",  sub: "extract",       tile: "t-amber",  col: "#d98420", icon: "archive" },
  { g: "Featured", id: "heic",      lb: "HEIC → JPG", sub: "iPhone",      tile: "t-purple", col: "#8b5cf6", icon: "convert", site: "heic" },
  { g: "Featured", id: "pdf",       lb: "PDF",       sub: "merge/split", tile: "t-red",   col: "#e5484d", icon: "pdf", site: "pdf-merge" },

  { g: "Image", id: "crop",      lb: "Crop",       tile: "t-green", col: "#16a34a", icon: "crop" },
  { g: "Image", id: "watermark", lb: "Watermark",  tile: "t-pink",  col: "#db2777", icon: "stamp" },
  { g: "Image", id: "blur",      lb: "Blur",       tile: "t-slate", col: "#64748b", icon: "blur" },
  { g: "Image", id: "exif",      lb: "Clean EXIF", tile: "t-green", col: "#16a34a", icon: "shield" },
  { g: "Image", id: "page",      lb: "From page",  tile: "t-cyan",  col: "#0891b2", icon: "image" },

  { g: "More", id: "all", lb: "All 52 tools", sub: "on the web", tile: "t-gray", col: "#71717a", icon: "grid", site: "" }
];

// ─── global toast ───
window.toast = function (m) {
  var old = document.querySelector(".toast"); if (old) old.remove();
  var t = document.createElement("div"); t.className = "toast"; t.textContent = m;
  document.body.appendChild(t);
  setTimeout(function () { t.style.opacity = "0"; setTimeout(function () { t.remove(); }, 250); }, 2400);
};
function esc(x) { return String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
function openUrl(u) { if (chrome.tabs && chrome.tabs.create) chrome.tabs.create({ url: u }); else window.open(u, "_blank"); }
function siteUrl(slug) { return "https://www.sammapix.com/" + (slug ? "tools/" + slug : "") + "?ref=ext&utm_source=extension&utm_medium=panel"; }

// ─── shared nav + dropzone for engines ───
window.SP = {
  home: renderHome,
  toolShell: function (title, onBack) {
    atHome = false;
    $view.innerHTML = '<div class="tv"><div class="dhd"><button class="back" id="sp-back">‹ Home</button>' +
      '<div class="dtitle">' + esc(title) + '</div></div><div class="dbody" id="sp-bd"></div></div>';
    document.getElementById("sp-back").addEventListener("click", onBack || renderHome);
    return document.getElementById("sp-bd");
  },
  dropzone: function (el, opts, onFile) {
    var upSvg = '<svg viewBox="0 0 24 24" width="40" height="40" style="color:var(--accent)"><path d="M12 16V5m0 0l-4 4m4-4l4 4" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M5 15v3a2 2 0 002 2h10a2 2 0 002-2v-3" stroke="currentColor" stroke-width="1.8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    el.innerHTML = '<div class="drop2" id="sp-drop"><div class="i">' + upSvg + '</div>' +
      '<h3>' + esc(opts.title || "Drop a file") + '</h3><p>' + esc(opts.sub || "or click to choose") + '</p></div>' +
      '<input type="file" id="sp-file"' + (opts.multiple ? ' multiple' : '') + ' accept="' + (opts.accept || "*/*") + '" style="display:none">';
    var d = document.getElementById("sp-drop"), f = document.getElementById("sp-file");
    d.addEventListener("click", function () { f.click(); });
    f.addEventListener("change", function () { if (f.files[0]) onFile(f.files[0], f.files); });
    d.addEventListener("dragover", function (e) { e.preventDefault(); d.classList.add("over"); });
    d.addEventListener("dragleave", function () { d.classList.remove("over"); });
    d.addEventListener("drop", function (e) { e.preventDefault(); d.classList.remove("over"); if (e.dataTransfer.files[0]) onFile(e.dataTransfer.files[0], e.dataTransfer.files); });
    return d;
  },
  esc: esc
};

// ─── HOME ───
function renderHome() {
  atHome = true;
  var html = '<div class="search"><span class="mag">🔍</span><input id="q" placeholder="Search tools…"></div>';
  var groups = {};
  TOOLS.forEach(function (t) { (groups[t.g] = groups[t.g] || []).push(t); });
  Object.keys(groups).forEach(function (g) {
    html += '<div class="sect">' + g + '</div><div class="grid">';
    groups[g].forEach(function (t) {
      html += '<div class="tool" data-id="' + t.id + '"><div class="tile ' + t.tile + '" style="color:' + t.col + '">' + ic(t.icon) + '</div>' +
        '<div class="lb">' + t.lb + '</div>' + (t.sub ? '<div class="sub">' + t.sub + '</div>' : '') + '</div>';
    });
    html += '</div>';
  });
  html += '<div class="foot"><a id="site-link">sammapix.com — 52 free tools →</a></div>';
  $view.innerHTML = html;

  $view.querySelectorAll("[data-id]").forEach(function (el) {
    el.addEventListener("click", function () { route(el.getAttribute("data-id")); });
  });
  document.getElementById("site-link").addEventListener("click", function () { openUrl(siteUrl("")); });
  var q = document.getElementById("q");
  q.addEventListener("input", function () {
    var v = q.value.toLowerCase();
    $view.querySelectorAll(".tool").forEach(function (el) {
      var t = TOOLS.find(function (x) { return x.id === el.getAttribute("data-id"); });
      el.style.display = (!v || t.lb.toLowerCase().indexOf(v) > -1) ? "" : "none";
    });
  });
}

// ─── ROUTER ───
function route(id) {
  var t = TOOLS.find(function (x) { return x.id === id; });
  if (!t) return;
  if (t.soon) { toast("Coming soon 🙌"); return; }
  if (t.site !== undefined) { openUrl(siteUrl(t.site)); return; }
  if (id === "unrar" || id === "sevenzip") { window.ArchiveWS.openPicker(); return; }
  if (id === "page") { window.PageWS.open(); return; }
  window.ImageTool.open(id); // compress, convert, crop, watermark, blur, exif
}

// ─── THEME ───
(function () {
  var btn = document.getElementById("theme");
  var saved = null; try { saved = localStorage.getItem("sp-theme"); } catch (e) {}
  if (saved === "dark") document.body.classList.add("dark");
  function sync() { btn.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙"; }
  sync();
  btn.addEventListener("click", function () {
    document.body.classList.toggle("dark");
    try { localStorage.setItem("sp-theme", document.body.classList.contains("dark") ? "dark" : "light"); } catch (e) {}
    sync();
  });
})();

renderHome();

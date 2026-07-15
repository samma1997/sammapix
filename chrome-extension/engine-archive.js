// ═══════════════════════════════════════════════════════════════
// SammaPix v5 — Archive engine (100% client-side)
// RAR  → node-unrar-js (unrar.worker.js + unrar.wasm)
// 7z/ZIP/TAR/GZ/… → libarchive.js (libarchive-worker.js + libarchive.wasm)
// ═══════════════════════════════════════════════════════════════
window.ArchiveWS = (function () {
  var bd = null, files = [], curFile = null, worker = null, libInited = false, rarBuffer = null;

  function openPicker() {
    var el = window.SP.toolShell("Extract archive", window.SP.home);
    window.SP.dropzone(el, { icon: "🗜️", title: "Drop an archive", sub: "RAR · 7z · ZIP · TAR · GZ", accept: ".rar,.7z,.zip,.tar,.gz,.tgz,.bz2,.xz,.cbr,.cbz" }, function (f) { open(f); });
  }

  function open(file) {
    curFile = file; files = []; rarBuffer = null;
    bd = window.SP.toolShell("Extract " + shortName(file.name), window.SP.home);
    bd.innerHTML = loading("Reading " + file.name + "…", 0);
    window.SP.addRecent(file.name, "🗜️", function () { open(file); });
    var ext = (file.name.split(".").pop() || "").toLowerCase();
    if (ext === "rar" || ext === "cbr") extractRar(file);
    else extractLib(file);
  }

  function loading(label, pct) {
    return '<div class="load"><div class="spin"></div>' + esc(label) +
      '<div class="bar"><span id="ar-bar" style="width:' + (pct || 0) + '%"></span></div></div>';
  }
  function setBar(p) { var b = document.getElementById("ar-bar"); if (b) b.style.width = (p || 0) + "%"; }
  function err(m) {
    bd.innerHTML = '<div class="err">⚠️ ' + esc(m || "Extraction failed.") + '</div>' +
      '<button class="apply" id="ar-retry">← Back to home</button>';
    document.getElementById("ar-retry").addEventListener("click", window.SP.home);
  }
  function askPassword(cb) {
    bd.innerHTML = '<div class="pw"><div style="font-size:30px">🔒</div>' +
      '<div style="font-size:14px;font-weight:700;margin:8px 0 2px">Password protected</div>' +
      '<div style="font-size:12px;color:var(--dim)">Enter the archive password.</div>' +
      '<input type="password" id="ar-pw" placeholder="Password"><button id="ar-pwgo">Extract</button></div>';
    document.getElementById("ar-pwgo").addEventListener("click", function () {
      var v = document.getElementById("ar-pw").value; if (v) cb(v);
    });
  }

  // ─── RAR ───
  function extractRar(file, password) {
    if (rarBuffer && password) { runRar(rarBuffer, password); return; }
    var reader = new FileReader();
    reader.onload = function () { rarBuffer = reader.result; runRar(rarBuffer, password); };
    reader.onerror = function () { err("Couldn’t read the file."); };
    reader.readAsArrayBuffer(file);
  }
  function runRar(buffer, password) {
    files = [];
    bd.innerHTML = loading("Extracting…", 0);
    if (worker) worker.terminate();
    try { worker = new Worker(chrome.runtime.getURL("lib/unrar.worker.js")); }
    catch (e) { err("Couldn’t start the extractor."); return; }
    worker.onmessage = function (ev) {
      var m = ev.data || {};
      if (m.type === "file") { files.push({ name: m.name, size: m.size, buffer: m.buffer }); setBar(m.progress); }
      else if (m.type === "needs_password") { askPassword(function (pw) { extractRar(curFile, pw); }); }
      else if (m.type === "done") { results(); }
      else if (m.type === "error") { err(m.message); }
    };
    worker.onerror = function (e) { err((e && e.message) || "Worker error."); };
    var copy = buffer.slice(0);
    worker.postMessage({ type: "extract", buffer: copy, password: password || undefined, wasmUrl: chrome.runtime.getURL("lib/unrar.wasm") }, [copy]);
  }

  // ─── 7z / ZIP / TAR / GZ (libarchive) ───
  async function extractLib(file, password) {
    try {
      if (typeof LibArchive === "undefined") { err("Archive library not loaded."); return; }
      if (!libInited) { LibArchive.init({ workerUrl: chrome.runtime.getURL("lib/libarchive-worker.js") }); libInited = true; }
      var archive = await LibArchive.open(file);
      var enc = false;
      try { enc = await archive.hasEncryptedData(); } catch (e) {}
      if (enc && !password) { askPassword(function (pw) { extractLib(file, pw); }); return; }
      if (password) { try { await archive.usePassword(password); } catch (e) {} }
      await doLib(archive);
    } catch (e) { err("Couldn’t open this archive. " + (e.message || "")); }
  }
  async function doLib(archive) {
    bd.innerHTML = loading("Extracting…", 0);
    var arr = await archive.getFilesArray();
    var real = arr.filter(function (x) { return !(x.file.name.endsWith("/") && x.file.size === 0); });
    var total = real.length || 1, done = 0;
    files = [];
    for (var i = 0; i < real.length; i++) {
      try {
        var ef = await real[i].file.extract();
        var buf = await ef.arrayBuffer();
        var dir = real[i].path && real[i].path !== "/" ? real[i].path.replace(/\/$/, "") + "/" : "";
        files.push({ name: dir + real[i].file.name, size: buf.byteLength, buffer: buf });
      } catch (e) {}
      done++; setBar(Math.round(done / total * 100));
    }
    try { await archive.close(); } catch (e) {}
    results();
  }

  // ─── RESULTS ───
  function results() {
    if (worker) { worker.terminate(); worker = null; }
    if (!files.length) { err("No files found in this archive."); return; }
    var h = '<div class="topbar"><span>' + files.length + ' file' + (files.length > 1 ? 's' : '') + ' extracted</span>' +
      '<button class="zipall" id="ar-zip">↓ All (ZIP)</button></div>';
    for (var i = 0; i < files.length; i++) {
      h += '<div class="frow"><span class="fic">' + iconFor(files[i].name) + '</span>' +
        '<div style="flex:1;min-width:0"><div class="nm">' + esc(baseName(files[i].name)) + '</div>' +
        '<div class="sz">' + fmtSize(files[i].size) + '</div></div>' +
        '<button class="save" data-i="' + i + '">Save</button></div>';
    }
    bd.innerHTML = h;
    bd.addEventListener("click", function (e) {
      if (e.target.id === "ar-zip") { zipAll(); return; }
      var b = e.target.closest("[data-i]"); if (b) saveOne(parseInt(b.getAttribute("data-i")));
    });
  }
  function saveOne(i) {
    var f = files[i]; if (!f) return;
    var u = URL.createObjectURL(new Blob([f.buffer]));
    var a = document.createElement("a"); a.href = u; a.download = baseName(f.name);
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
  }
  async function zipAll() {
    if (typeof JSZip === "undefined") { toast("ZIP library missing"); return; }
    toast("Building ZIP…");
    var zip = new JSZip();
    for (var i = 0; i < files.length; i++) zip.file(files[i].name, files[i].buffer);
    var blob = await zip.generateAsync({ type: "blob" });
    var u = URL.createObjectURL(blob);
    var a = document.createElement("a"); a.href = u; a.download = cleanBase(curFile.name) + "-extracted.zip";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(u); }, 8000);
  }

  // ─── helpers ───
  function esc(x) { return String(x).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/"/g, "&quot;"); }
  function baseName(n) { return n.split("/").pop().split("\\").pop() || "file"; }
  function shortName(n) { return (n || "archive").length > 22 ? n.slice(0, 20) + "…" : n; }
  function cleanBase(n) { return (n || "archive").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "") || "archive"; }
  function fmtSize(b) { if (!b) return ""; if (b < 1024) return b + " B"; if (b < 1048576) return Math.round(b / 1024) + " KB"; return (b / 1048576).toFixed(1) + " MB"; }
  function iconFor(n) {
    var e = (n.split(".").pop() || "").toLowerCase();
    if (/(jpe?g|png|gif|webp|bmp|svg|heic|avif)/.test(e)) return "🖼️";
    if (/(mp4|mov|avi|mkv|webm)/.test(e)) return "🎬";
    if (/(mp3|wav|flac|aac|ogg|m4a)/.test(e)) return "🎵";
    if (/pdf/.test(e)) return "📄";
    if (/(docx?|xlsx?|pptx?|txt|csv|rtf)/.test(e)) return "📝";
    if (/(zip|rar|7z|tar|gz|bz2|xz)/.test(e)) return "🗜️";
    return "📁";
  }

  return { open: open, openPicker: openPicker };
})();

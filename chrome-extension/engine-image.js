// ═══════════════════════════════════════════════════════════════
// SammaPix v5 — ImageTool: focused image tools (100% client-side)
// modes: compress · convert · resize · crop · watermark · blur · exif
// ═══════════════════════════════════════════════════════════════
window.ImageTool = (function () {
  var work = null, bd = null, name = "image", mode = "compress";
  var pv = null, pvctx = null, saveFmt = { m: "image/jpeg", e: "jpg", q: 0.92 };
  var dragging = false, dStart = null, dRect = null, dragMode = "new", startRect = null;
  var fitMode = "cover"; // cover | contain | stretch
  var history = [], original = null, origBytes = 0, estTimer = null;

  function clone(cv) { var c = document.createElement("canvas"); c.width = cv.width; c.height = cv.height; c.getContext("2d").drawImage(cv, 0, 0); return c; }
  function pushHistory() { history.push(clone(work)); if (history.length > 15) history.shift(); refreshBar(); }
  function undo() { if (!history.length) return; work = history.pop(); dRect = null; draw(); dim(); syncInputs(); refreshBar(); toast("Undone"); }
  function resetAll() { if (!original) return; if (work.width !== original.width || work.height !== original.height || history.length) pushHistory(); work = clone(original); dRect = null; draw(); dim(); syncInputs(); refreshBar(); toast("Restored original"); }
  function refreshBar() { var u = document.getElementById("undo"), r = document.getElementById("reset"); if (u) u.disabled = history.length === 0; if (r) r.disabled = history.length === 0; }
  function syncInputs() { var rw = document.getElementById("rw"), rh = document.getElementById("rh"); if (rw) { rw.value = work.width; rh.value = work.height; } }

  var MODES = {
    compress:  { t: "Compress",       i: "🗜️", fmt: { m: "image/webp", e: "webp", q: 0.8 } },
    convert:   { t: "Convert",        i: "🔄", fmt: { m: "image/webp", e: "webp", q: 0.9 } },
    resize:    { t: "Resize",         i: "📐", fmt: { m: "image/jpeg", e: "jpg", q: 0.92 } },
    crop:      { t: "Crop",           i: "⛶", fmt: { m: "image/jpeg", e: "jpg", q: 0.92 } },
    watermark: { t: "Watermark",      i: "©️", fmt: { m: "image/jpeg", e: "jpg", q: 0.92 } },
    blur:      { t: "Blur / Censor",  i: "🌫️", fmt: { m: "image/jpeg", e: "jpg", q: 0.92 } },
    exif:      { t: "Clean EXIF/GPS", i: "🛡️", fmt: { m: "image/jpeg", e: "jpg", q: 0.95 } }
  };

  function open(m) {
    mode = m; saveFmt = Object.assign({}, MODES[m].fmt); work = null; dRect = null;
    bd = window.SP.toolShell(MODES[m].t, window.SP.home);
    var canBatch = (m === "compress" || m === "convert" || m === "resize" || m === "exif");
    window.SP.dropzone(bd, { icon: MODES[m].i, title: "Drop an image", sub: canBatch ? "one or more images · or click" : "or click to choose", accept: "image/*", multiple: canBatch }, function (f, files) {
      if (canBatch && files && files.length > 1) { batch(m, files); return; }
      name = clean(f.name); load(f);
    });
  }

  function openWith(blob, nm) {
    mode = "compress"; saveFmt = Object.assign({}, MODES.compress.fmt); name = clean(nm) || "image";
    bd = window.SP.toolShell("Compress", window.SP.home);
    load(blob);
  }

  // Public entry for "drop several images on Home" → straight to batch compress.
  function openBatch(files) {
    mode = "compress"; saveFmt = Object.assign({}, MODES.compress.fmt);
    bd = window.SP.toolShell("Compress " + files.length + " images", window.SP.home);
    batch("compress", files);
  }

  function load(blob) {
    origBytes = (blob && blob.size) || 0;
    bd.innerHTML = '<div class="load"><div class="spin"></div>Loading…</div>';
    createImageBitmap(blob).then(function (bmp) {
      work = document.createElement("canvas");
      work.width = bmp.width; work.height = bmp.height;
      work.getContext("2d").drawImage(bmp, 0, 0);
      if (bmp.close) bmp.close();
      original = clone(work); history = []; dRect = null; render();
    }).catch(function () { bd.innerHTML = '<div class="err">Couldn\'t open this image.</div>'; });
  }

  function render() {
    var h = '<div class="editbar"><button class="ebtn" id="undo" disabled>↶ Undo</button><button class="ebtn" id="reset" disabled>Reset</button><button class="ebtn" id="newimg">＋ New image</button></div>';
    h += '<div class="canvwrap"><canvas id="cv"></canvas><div class="dim" id="dim"></div></div>';
    h += options(mode);
    h += '<div class="opt"><h4>💾 Save as</h4><div class="chips" id="fmt">' +
      fchip("webp", "WebP") + fchip("jpg", "JPG") + fchip("png", "PNG") + '</div></div>';
    h += '<button class="cta" id="save">↓ Save image</button>';
    bd.innerHTML = h;
    pv = document.getElementById("cv"); pvctx = pv.getContext("2d");
    draw(); dim();
    wire();
  }

  function options(m) {
    if (m === "compress") return '<div class="opt"><h4>Quality</h4>' +
      '<div class="slabel"><span>Smaller</span><span id="qv">80%</span></div>' +
      '<input class="slider" type="range" id="q" min="10" max="100" value="80">' +
      '<div id="est" style="margin-top:10px;padding:9px 11px;background:var(--surface2);border-radius:10px;font-size:12px;font-weight:600;text-align:center">Calculating…</div></div>';
    if (m === "convert") return '<div class="opt"><h4>🔄 Convert</h4><div class="hint">Pick the output format below in “Save as”. WebP is smaller, PNG is lossless, JPG is universal.</div></div>';
    if (m === "resize") return '<div class="opt"><h4>📐 Size</h4><div class="chips" style="margin-bottom:8px">' +
      pchip("ig-post", "1080²") + pchip("ig-portrait", "1080×1350") + pchip("ig-story", "Story") + pchip("hd", "1920w") + pchip("half", "50%") + '</div>' +
      '<div class="row"><span class="lb">L</span><input type="number" id="rw" min="1"><span class="lb">A</span><input type="number" id="rh" min="1">' +
      '<label class="lb"><input type="checkbox" id="lock" checked> lock</label></div>' +
      '<div class="slabel" style="margin:2px 0 6px"><span>Fit (if the ratio changes)</span></div>' +
      '<div class="chips" style="margin-bottom:10px">' + fitchip("cover", "Fill") + fitchip("contain", "Fit") + fitchip("stretch", "Stretch") + '</div>' +
      '<button class="cta sec" id="applyresize">Apply resize</button></div>';
    if (m === "crop") return '<div class="opt"><h4>⛶ Crop</h4>' +
      '<div class="hint">Drag the area to keep on the image. Or start from a ratio and adjust it.</div>' +
      '<div class="chips" style="margin:9px 0">' + pchip("c-free", "Free") + pchip("c-1-1", "1:1") + pchip("c-4-5", "4:5") + pchip("c-16-9", "16:9") + pchip("c-9-16", "9:16") + '</div>' +
      '<button class="cta sec" id="applycrop">Apply crop</button></div>';
    if (m === "watermark") return '<div class="opt"><h4>©️ Watermark</h4>' +
      '<div class="row"><input type="text" id="wm" placeholder="Your text or @handle"></div>' +
      '<div class="row"><span class="lb">Pos</span><select id="wmpos"><option value="br">Bottom right</option><option value="bl">Bottom left</option><option value="tr">Top right</option><option value="tl">Top left</option><option value="cc">Center</option></select>' +
      '<span class="lb">Size</span><input type="number" id="wmsize" value="4" min="1" max="20" style="max-width:60px"></div>' +
      '<button class="cta sec" id="applywm">Add watermark</button></div>';
    if (m === "blur") return '<div class="opt"><h4>🌫️ Blur / Censor</h4><div class="hint">Drag a box on the image above, then apply. For faces, plates, private info.</div>' +
      '<button class="cta sec" id="applyblur">Censor selected area</button></div>';
    if (m === "exif") return '<div class="opt"><h4>🛡️ Clean EXIF / GPS</h4><div class="hint">Saving re-writes the image removing all metadata (GPS location, camera, date). Save below.</div></div>';
    return "";
  }

  function fchip(f, label) { return '<button class="chip' + (saveFmt.e === f ? ' on' : '') + '" data-fmt="' + f + '">' + label + '</button>'; }
  function pchip(id, label) { return '<button class="chip" data-preset="' + id + '">' + label + '</button>'; }
  function fitchip(id, label) { return '<button class="chip' + (fitMode === id ? ' on' : '') + '" data-fit="' + id + '">' + label + '</button>'; }

  function dim() { var e = document.getElementById("dim"); if (e) e.textContent = work.width + " × " + work.height + " px"; }

  function draw() {
    pv.width = work.width; pv.height = work.height;
    pvctx.drawImage(work, 0, 0);
    if (dRect) {
      pvctx.save(); pvctx.strokeStyle = "#6366f1"; pvctx.lineWidth = Math.max(2, work.width / 250);
      pvctx.setLineDash([pvctx.lineWidth * 2, pvctx.lineWidth * 2]); pvctx.strokeRect(dRect.x, dRect.y, dRect.w, dRect.h);
      pvctx.fillStyle = "rgba(99,102,241,.2)"; pvctx.fillRect(dRect.x, dRect.y, dRect.w, dRect.h);
      if (mode === "crop") {
        pvctx.setLineDash([]); var hs = handleSize();
        var cs = [[dRect.x, dRect.y], [dRect.x + dRect.w, dRect.y], [dRect.x, dRect.y + dRect.h], [dRect.x + dRect.w, dRect.y + dRect.h]];
        for (var i = 0; i < 4; i++) {
          pvctx.fillStyle = "#fff"; pvctx.fillRect(cs[i][0] - hs / 2, cs[i][1] - hs / 2, hs, hs);
          pvctx.strokeStyle = "#6366f1"; pvctx.lineWidth = Math.max(1.5, work.width / 400); pvctx.strokeRect(cs[i][0] - hs / 2, cs[i][1] - hs / 2, hs, hs);
        }
      }
      pvctx.restore();
    }
  }
  function handleSize() { return Math.max(14, work.width / 40); }
  function hitHandle(p) {
    if (!dRect) return null;
    var tol = handleSize() * 1.3;
    var cs = { nw: [dRect.x, dRect.y], ne: [dRect.x + dRect.w, dRect.y], sw: [dRect.x, dRect.y + dRect.h], se: [dRect.x + dRect.w, dRect.y + dRect.h] };
    for (var k in cs) { if (Math.abs(p.x - cs[k][0]) < tol && Math.abs(p.y - cs[k][1]) < tol) return k; }
    if (p.x > dRect.x && p.x < dRect.x + dRect.w && p.y > dRect.y && p.y < dRect.y + dRect.h) return "move";
    return null;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  function toWork(e) {
    var r = pv.getBoundingClientRect();
    var cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: Math.max(0, Math.min(work.width, (cx - r.left) * (pv.width / r.width))), y: Math.max(0, Math.min(work.height, (cy - r.top) * (pv.height / r.height))) };
  }

  function wire() {
    bd.addEventListener("click", function (e) {
      var fit = e.target.closest("[data-fit]");
      if (fit) { fitMode = fit.getAttribute("data-fit"); bd.querySelectorAll("[data-fit]").forEach(function (x) { x.classList.remove("on"); }); fit.classList.add("on"); return; }
      var p = e.target.closest("[data-preset]");
      if (p) {
        var v = p.getAttribute("data-preset");
        if (v === "c-free") { dRect = null; draw(); }
        else if (v.indexOf("c-") === 0) setCropBox(cropRatio(v));
        else resizePreset(v);
        return;
      }
      var fc = e.target.closest("[data-fmt]");
      if (fc) {
        bd.querySelectorAll("[data-fmt]").forEach(function (x) { x.classList.remove("on"); });
        fc.classList.add("on");
        var f = fc.getAttribute("data-fmt");
        if (f === "png") saveFmt = { m: "image/png", e: "png", q: 1 };
        else if (f === "jpg") saveFmt = { m: "image/jpeg", e: "jpg", q: (mode === "compress" ? qv() : 0.92) };
        else saveFmt = { m: "image/webp", e: "webp", q: (mode === "compress" ? qv() : 0.9) };
        scheduleEst();
      }
    });
    var q = document.getElementById("q");
    if (q) q.addEventListener("input", function () { document.getElementById("qv").textContent = q.value + "%"; if (saveFmt.e !== "png") saveFmt.q = q.value / 100; scheduleEst(); });
    var rw = document.getElementById("rw"), rh = document.getElementById("rh"), lock = document.getElementById("lock");
    if (rw) {
      rw.value = work.width; rh.value = work.height; var ratio = work.width / work.height;
      rw.addEventListener("input", function () { if (lock.checked && rw.value) rh.value = Math.round(rw.value / ratio); });
      rh.addEventListener("input", function () { if (lock.checked && rh.value) rw.value = Math.round(rh.value * ratio); });
      document.getElementById("applyresize").addEventListener("click", function () {
        var w = parseInt(rw.value), hh = parseInt(rh.value); if (!w || !hh) { toast("Invalid size"); return; }
        resizeTo(w, hh); toast("Resized " + w + "×" + hh);
      });
    }
    document.getElementById("undo").addEventListener("click", undo);
    document.getElementById("reset").addEventListener("click", resetAll);
    document.getElementById("newimg").addEventListener("click", function () { open(mode); }); // pick another file, same tool
    refreshBar();
    var acr = document.getElementById("applycrop"); if (acr) acr.addEventListener("click", cropToRect);
    var awm = document.getElementById("applywm"); if (awm) awm.addEventListener("click", watermark);
    var abl = document.getElementById("applyblur"); if (abl) abl.addEventListener("click", censor);
    document.getElementById("save").addEventListener("click", save);
    pv.addEventListener("mousedown", sD); pv.addEventListener("mousemove", mD); window.addEventListener("mouseup", eD);
    pv.addEventListener("touchstart", sD, { passive: true });
    pv.addEventListener("touchmove", function (e) { e.preventDefault(); mD(e); }, { passive: false });
    pv.addEventListener("touchend", eD);
    if (mode === "compress") scheduleEst();
  }
  function qv() { var q = document.getElementById("q"); return q ? q.value / 100 : 0.8; }
  function scheduleEst() {
    if (mode !== "compress") return;
    if (estTimer) clearTimeout(estTimer);
    var e = document.getElementById("est"); if (e) e.textContent = "…";
    estTimer = setTimeout(estimate, 220);
  }
  function estimate() {
    if (mode !== "compress" || !work) return;
    work.toBlob(function (b) {
      var e = document.getElementById("est"); if (!e) return;
      if (!b) { e.textContent = "—"; return; }
      var pct = origBytes ? Math.round((1 - b.size / origBytes) * 100) : 0;
      var head = origBytes ? fmtKB(origBytes) + " → " + fmtKB(b.size) : fmtKB(b.size);
      var tag = origBytes ? (pct >= 0 ? " −" + pct + "%" : " +" + Math.abs(pct) + "%") : "";
      e.innerHTML = head + '<span style="color:' + (pct >= 0 ? "#16a34a" : "#e5484d") + '">' + tag + '</span>';
    }, saveFmt.m, saveFmt.q);
  }

  function sD(e) {
    if (mode !== "blur" && mode !== "crop") return;
    dragging = true; dStart = toWork(e);
    if (mode === "crop" && dRect) {
      var h = hitHandle(dStart);
      if (h) { dragMode = h; startRect = { x: dRect.x, y: dRect.y, w: dRect.w, h: dRect.h }; return; }
    }
    dragMode = "new"; dRect = { x: dStart.x, y: dStart.y, w: 0, h: 0 };
  }
  function mD(e) {
    if (!dragging) return;
    var p = toWork(e);
    if (dragMode === "new") {
      dRect = { x: Math.min(dStart.x, p.x), y: Math.min(dStart.y, p.y), w: Math.abs(p.x - dStart.x), h: Math.abs(p.y - dStart.y) };
    } else if (dragMode === "move") {
      var dx = p.x - dStart.x, dy = p.y - dStart.y;
      dRect.x = clamp(startRect.x + dx, 0, work.width - startRect.w);
      dRect.y = clamp(startRect.y + dy, 0, work.height - startRect.h);
    } else {
      var R = startRect.x + startRect.w, B = startRect.y + startRect.h; // fixed opposite edges
      if (dragMode.indexOf("w") > -1) { dRect.x = clamp(p.x, 0, R - 8); dRect.w = R - dRect.x; }
      if (dragMode.indexOf("e") > -1) { dRect.w = clamp(p.x, startRect.x + 8, work.width) - startRect.x; dRect.x = startRect.x; }
      if (dragMode.indexOf("n") > -1) { dRect.y = clamp(p.y, 0, B - 8); dRect.h = B - dRect.y; }
      if (dragMode.indexOf("s") > -1) { dRect.h = clamp(p.y, startRect.y + 8, work.height) - startRect.y; dRect.y = startRect.y; }
    }
    draw();
  }
  function eD() { dragging = false; }

  function resizeTo(w, h) {
    pushHistory();
    var c = document.createElement("canvas"); c.width = w; c.height = h;
    var ctx = c.getContext("2d");
    var sw = work.width, sh = work.height;
    var srcRatio = sw / sh, dstRatio = w / h;
    var sameRatio = Math.abs(srcRatio - dstRatio) < 0.001;
    if (sameRatio || fitMode === "stretch") {
      ctx.drawImage(work, 0, 0, w, h); // no distortion when ratios match
    } else if (fitMode === "contain") {
      // whole image inside, padded (white so JPG looks clean)
      var sc = Math.min(w / sw, h / sh), dw = sw * sc, dh = sh * sc;
      ctx.fillStyle = "#ffffff"; ctx.fillRect(0, 0, w, h);
      ctx.drawImage(work, (w - dw) / 2, (h - dh) / 2, dw, dh);
    } else {
      // cover: fill target keeping proportions, crop the excess (default)
      var s = Math.max(w / sw, h / sh), cdw = sw * s, cdh = sh * s;
      ctx.drawImage(work, (w - cdw) / 2, (h - cdh) / 2, cdw, cdh);
    }
    work = c; dRect = null; draw(); dim();
    var rw = document.getElementById("rw"), rh = document.getElementById("rh"); if (rw) { rw.value = w; rh.value = h; }
  }
  function resizePreset(p) {
    var map = { "ig-post": [1080, 1080], "ig-portrait": [1080, 1350], "ig-story": [1080, 1920], "hd": [1920, Math.round(1920 * work.height / work.width)], "half": [Math.round(work.width / 2), Math.round(work.height / 2)] };
    if (map[p]) { resizeTo(map[p][0], map[p][1]); toast("Resized"); }
  }
  function cropRatio(p) { return { "c-1-1": 1, "c-4-5": 4 / 5, "c-16-9": 16 / 9, "c-9-16": 9 / 16 }[p] || 1; }
  function setCropBox(ar) {
    var w = work.width, h = work.height, cw = w, ch = h;
    if (w / h > ar) cw = h * ar; else ch = w / ar;
    dRect = { x: (w - cw) / 2, y: (h - ch) / 2, w: cw, h: ch }; draw();
    toast("Drag to adjust, then Apply");
  }
  function cropToRect() {
    if (!dRect || dRect.w < 4 || dRect.h < 4) { toast("Drag the area to keep"); return; }
    pushHistory();
    var r = { x: Math.round(dRect.x), y: Math.round(dRect.y), w: Math.round(dRect.w), h: Math.round(dRect.h) };
    var c = document.createElement("canvas"); c.width = r.w; c.height = r.h;
    c.getContext("2d").drawImage(work, r.x, r.y, r.w, r.h, 0, 0, r.w, r.h);
    work = c; dRect = null; draw(); dim(); toast("Cropped " + r.w + "×" + r.h);
  }
  function watermark() {
    var txt = (document.getElementById("wm").value || "").trim(); if (!txt) { toast("Type the text"); return; }
    pushHistory();
    var pos = document.getElementById("wmpos").value, sizePct = parseFloat(document.getElementById("wmsize").value) || 4;
    var ctx = work.getContext("2d"), fs = Math.max(12, Math.round(work.width * sizePct / 100));
    ctx.save(); ctx.font = "bold " + fs + "px -apple-system,Arial,sans-serif";
    ctx.fillStyle = "rgba(255,255,255,.88)"; ctx.strokeStyle = "rgba(0,0,0,.4)"; ctx.lineWidth = Math.max(1, fs / 12);
    var pad = Math.round(fs * 0.6), m = ctx.measureText(txt), x, y;
    if (pos.indexOf("l") > -1) x = pad; else if (pos === "cc") x = (work.width - m.width) / 2; else x = work.width - m.width - pad;
    if (pos.indexOf("t") > -1) y = pad + fs; else if (pos === "cc") y = work.height / 2 + fs / 3; else y = work.height - pad;
    ctx.strokeText(txt, x, y); ctx.fillText(txt, x, y); ctx.restore(); draw(); toast("Watermark added");
  }
  function censor() {
    if (!dRect || dRect.w < 4 || dRect.h < 4) { toast("Drag a box first"); return; }
    pushHistory();
    var r = { x: Math.round(dRect.x), y: Math.round(dRect.y), w: Math.round(dRect.w), h: Math.round(dRect.h) }, ctx = work.getContext("2d");
    var sw = Math.max(1, Math.round(r.w / 14)), sh = Math.max(1, Math.round(r.h / 14));
    var t = document.createElement("canvas"); t.width = sw; t.height = sh;
    t.getContext("2d").drawImage(work, r.x, r.y, r.w, r.h, 0, 0, sw, sh);
    ctx.imageSmoothingEnabled = false; ctx.drawImage(t, 0, 0, sw, sh, r.x, r.y, r.w, r.h); ctx.imageSmoothingEnabled = true;
    dRect = null; draw(); toast("Area censored");
  }
  function save() {
    work.toBlob(function (b) {
      if (!b) { toast("Export failed"); return; }
      var u = URL.createObjectURL(b);
      var a = document.createElement("a"); a.href = u; a.download = name + "-sammapix." + saveFmt.e;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function () { URL.revokeObjectURL(u); }, 5000);
      toast(saveFmt.e.toUpperCase() + " saved (" + fmtKB(b.size) + ")");
    }, saveFmt.m, saveFmt.q);
  }

  function clean(n) { return (n || "image").replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9_-]/g, "") || "image"; }
  function fmtKB(b) { return b < 1048576 ? Math.round(b / 1024) + " KB" : (b / 1048576).toFixed(1) + " MB"; }

  // ─── BATCH (più immagini → ZIP) ───
  function batch(m, files) {
    var arr = Array.prototype.slice.call(files);
    var cfg = { fmt: Object.assign({}, MODES[m].fmt), preset: (m === "resize" ? "ig-post" : null), fit: "cover" };
    var esc = window.SP.esc;
    var h = '<div class="opt"><h4>' + arr.length + ' images · ' + MODES[m].t + '</h4>';
    if (m === "compress") h += '<div class="slabel"><span>Quality</span><span id="bq">80%</span></div><input class="slider" type="range" id="bqs" min="10" max="100" value="80">';
    if (m === "resize") h += '<div class="hint" style="margin-bottom:8px">Output size:</div><div class="chips" style="margin-bottom:8px" id="bpreset">' +
      bchip("preset", "ig-post", "1080²", cfg) + bchip("preset", "ig-portrait", "1080×1350", cfg) + bchip("preset", "ig-story", "Story", cfg) + bchip("preset", "hd", "1920w", cfg) + bchip("preset", "half", "50%", cfg) + '</div>' +
      '<div class="hint" style="margin-bottom:6px">Fit:</div><div class="chips" id="bfit">' + bchip("fit", "cover", "Fill", cfg) + bchip("fit", "contain", "Fit", cfg) + bchip("fit", "stretch", "Stretch", cfg) + '</div>';
    h += '</div>';
    h += '<div class="opt"><h4>Save as</h4><div class="chips" id="bfmt">' + bfmt("webp", "WebP", cfg) + bfmt("jpg", "JPG", cfg) + bfmt("png", "PNG", cfg) + '</div></div>';
    h += '<div class="opt"><h4>Files</h4>';
    arr.forEach(function (f) { h += '<div class="frow"><span class="fic">🖼️</span><div style="flex:1;min-width:0"><div class="nm">' + esc(f.name) + '</div><div class="sz">' + fmtKB(f.size) + '</div></div></div>'; });
    h += '</div>';
    h += '<button class="cta" id="brun">↓ Process all & download ZIP</button><div id="bprog" style="margin-top:10px;font-size:12px;font-weight:600;text-align:center;color:var(--dim)"></div>';
    bd.innerHTML = h;

    var bqs = document.getElementById("bqs");
    if (bqs) bqs.addEventListener("input", function () { document.getElementById("bq").textContent = bqs.value + "%"; if (cfg.fmt.e !== "png") cfg.fmt.q = bqs.value / 100; });
    bd.addEventListener("click", function (e) {
      var c = e.target.closest("[data-bk]"); if (!c) return;
      var kind = c.getAttribute("data-bk"), val = c.getAttribute("data-bv");
      if (kind === "fmt") { cfg.fmt = val === "png" ? { m: "image/png", e: "png", q: 1 } : val === "jpg" ? { m: "image/jpeg", e: "jpg", q: (bqs ? bqs.value / 100 : 0.9) } : { m: "image/webp", e: "webp", q: (bqs ? bqs.value / 100 : 0.9) }; }
      else if (kind === "preset") cfg.preset = val;
      else if (kind === "fit") cfg.fit = val;
      c.parentNode.querySelectorAll("[data-bk='" + kind + "']").forEach(function (x) { x.classList.remove("on"); });
      c.classList.add("on");
    });
    document.getElementById("brun").addEventListener("click", function () { runBatch(m, arr, cfg); });
  }
  function bchip(kind, val, label, cfg) { var on = (kind === "preset" && cfg.preset === val) || (kind === "fit" && cfg.fit === val); return '<button class="chip' + (on ? " on" : "") + '" data-bk="' + kind + '" data-bv="' + val + '">' + label + '</button>'; }
  function bfmt(val, label, cfg) { return '<button class="chip' + (cfg.fmt.e === val ? " on" : "") + '" data-bk="fmt" data-bv="' + val + '">' + label + '</button>'; }

  function presetDims(p, w, h) { var map = { "ig-post": [1080, 1080], "ig-portrait": [1080, 1350], "ig-story": [1080, 1920], "hd": [1920, Math.round(1920 * h / w)], "half": [Math.round(w / 2), Math.round(h / 2)] }; return map[p] || [w, h]; }
  function drawFit(c, bmp, fit) {
    var ctx = c.getContext("2d"), w = c.width, hh = c.height, sw = bmp.width, sh = bmp.height;
    if (Math.abs(sw / sh - w / hh) < 0.001 || fit === "stretch") { ctx.drawImage(bmp, 0, 0, w, hh); return; }
    if (fit === "contain") { var sc = Math.min(w / sw, hh / sh), dw = sw * sc, dh = sh * sc; ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, w, hh); ctx.drawImage(bmp, (w - dw) / 2, (hh - dh) / 2, dw, dh); }
    else { var s = Math.max(w / sw, hh / sh), cdw = sw * s, cdh = sh * s; ctx.drawImage(bmp, (w - cdw) / 2, (hh - cdh) / 2, cdw, cdh); }
  }
  async function runBatch(m, arr, cfg) {
    if (typeof JSZip === "undefined") { toast("ZIP not available"); return; }
    var prog = document.getElementById("bprog"), zip = new JSZip(), used = {}, ok = 0;
    for (var i = 0; i < arr.length; i++) {
      prog.textContent = "Processing " + (i + 1) + "/" + arr.length + "…";
      try {
        var bmp = await createImageBitmap(arr[i]);
        var c = document.createElement("canvas");
        if (m === "resize" && cfg.preset) { var d = presetDims(cfg.preset, bmp.width, bmp.height); c.width = d[0]; c.height = d[1]; drawFit(c, bmp, cfg.fit); }
        else { c.width = bmp.width; c.height = bmp.height; c.getContext("2d").drawImage(bmp, 0, 0); }
        if (bmp.close) bmp.close();
        var blob = await new Promise(function (r) { c.toBlob(r, cfg.fmt.m, cfg.fmt.q); });
        if (!blob) continue;
        var base = clean(arr[i].name); if (used[base]) base = base + "-" + (used[base]++); else used[base] = 1;
        zip.file(base + "-sammapix." + cfg.fmt.e, blob); ok++;
      } catch (e) {}
    }
    if (!ok) { prog.textContent = "No images processed."; return; }
    prog.textContent = "Building ZIP…";
    var out = await zip.generateAsync({ type: "blob" });
    var u = URL.createObjectURL(out); var a = document.createElement("a"); a.href = u; a.download = "sammapix-batch.zip";
    document.body.appendChild(a); a.click(); a.remove(); setTimeout(function () { URL.revokeObjectURL(u); }, 8000);
    prog.textContent = "✓ ZIP ready (" + ok + " images)";
    toast("ZIP ready (" + ok + ")");
  }

  return { open: open, openWith: openWith, openBatch: openBatch };
})();

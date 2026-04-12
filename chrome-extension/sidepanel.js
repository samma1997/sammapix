// ═══ STATE ═══
var images = [];
var selected = new Set();
var filter = "all";
var currentTab = "dl";

// ═══ DOM REFS ═══
var $gw = document.getElementById("gw");
var $hcount = document.getElementById("hcount");
var $fbar = document.getElementById("fbar");
var $bat = document.getElementById("bat");
var $batc = document.getElementById("batc");
var $vdl = document.getElementById("v-dl");
var $vexif = document.getElementById("v-exif");
var $vcomp = document.getElementById("v-comp");

// ═══ TAB SWITCHING — segmented control ═══
document.getElementById("tab-dl").addEventListener("click", function() { switchTab("dl"); });
document.getElementById("tab-exif").addEventListener("click", function() { switchTab("exif"); });
document.getElementById("tab-comp").addEventListener("click", function() { switchTab("comp"); });

function switchTab(t) {
  currentTab = t;
  document.getElementById("tab-dl").className = t === "dl" ? "seg-btn on" : "seg-btn";
  document.getElementById("tab-exif").className = t === "exif" ? "seg-btn on" : "seg-btn";
  document.getElementById("tab-comp").className = t === "comp" ? "seg-btn on" : "seg-btn";
  $vdl.style.display = t === "dl" ? "" : "none";
  $vexif.style.display = t === "exif" ? "" : "none";
  $vcomp.style.display = t === "comp" ? "" : "none";
  if (t === "exif") renderExif();
  if (t === "comp") renderComp();
}

// ═══ BUTTONS ═══
document.getElementById("scan-main").addEventListener("click", function() { doScan(); });
document.getElementById("b-jpg").addEventListener("click", function() { batchDl("image/jpeg","jpg",0.95); });
document.getElementById("b-png").addEventListener("click", function() { batchDl("image/png","png",1); });
document.getElementById("b-webp").addEventListener("click", function() { batchDl("image/webp","webp",0.9); });
document.getElementById("b-clr").addEventListener("click", function() { selected.clear(); renderGrid(); });

// ═══ DEDUPLICATION ═══
function getBaseUrl(url) {
  try {
    var u = new URL(url);
    var path = u.pathname;
    path = path.replace(/-\d+x\d+(?=\.\w+$)/, "");
    path = path.replace(/_thumb(?=\.\w+$)/, "");
    path = path.replace(/-scaled(?=\.\w+$)/, "");
    u.search = "";
    return u.origin + path;
  } catch(e) {
    return url.split("?")[0]
      .replace(/-\d+x\d+(?=\.\w+$)/, "")
      .replace(/_thumb(?=\.\w+$)/, "")
      .replace(/-scaled(?=\.\w+$)/, "");
  }
}

function extractWidth(url) {
  var wMatch;
  wMatch = url.match(/[?&](?:w|width|resize)=(\d+)/i);
  if (wMatch) return parseInt(wMatch[1]);
  wMatch = url.match(/-(\d+)x\d+(?=\.\w+)/);
  if (wMatch) return parseInt(wMatch[1]);
  return 0;
}

function deduplicateImages(raw) {
  var groups = {};
  for (var i = 0; i < raw.length; i++) {
    var img = raw[i];
    var base = getBaseUrl(img.src);
    if (!groups[base]) {
      groups[base] = img;
    } else {
      var existingW = groups[base].w || extractWidth(groups[base].src);
      var newW = img.w || extractWidth(img.src);
      if (newW > existingW) {
        groups[base] = img;
      }
    }
  }
  var result = [];
  var keys = Object.keys(groups);
  for (var k = 0; k < keys.length; k++) {
    result.push(groups[keys[k]]);
  }
  return result;
}

// ═══ SCAN ═══
async function doScan() {
  $hcount.innerHTML = "<b>Scanning...</b>";
  $gw.innerHTML = '<div class="scanning"><div class="scan-anim"></div><div style="font-size:13px;font-weight:500">Finding images...</div></div>';

  try {
    var tabs = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
    if (!tabs || !tabs[0]) { showError("No active tab found."); return; }

    var tabId = tabs[0].id;
    var tabUrl = tabs[0].url || "";

    if (!tabUrl.startsWith("http")) {
      showError("Open a website first. Can\u2019t scan " + tabUrl.split(":")[0] + ":// pages.");
      return;
    }

    var results = await chrome.scripting.executeScript({
      target: { tabId: tabId },
      func: function() {
        var m = {};
        var list = [];

        var imgs = document.querySelectorAll("img");
        for (var i = 0; i < imgs.length; i++) {
          var el = imgs[i];
          var s = el.currentSrc || el.src;
          if (!s || s.length < 10 || s.startsWith("data:image/svg") || m[s]) continue;
          var r = el.getBoundingClientRect();
          if (r.width < 10 && r.height < 10) continue;
          m[s] = true;
          list.push({ src: s, w: el.naturalWidth || Math.round(r.width), h: el.naturalHeight || Math.round(r.height), alt: el.alt || "" });
        }

        var els = document.querySelectorAll("div,section,header,footer,a,figure,article,main,aside,li,span");
        for (var j = 0; j < els.length; j++) {
          try {
            var bg = getComputedStyle(els[j]).backgroundImage;
            if (!bg || bg === "none") continue;
            var match = bg.match(/url\(["']?(https?:\/\/[^"')]+)["']?\)/);
            if (!match || m[match[1]]) continue;
            var r2 = els[j].getBoundingClientRect();
            if (r2.width < 10 && r2.height < 10) continue;
            m[match[1]] = true;
            list.push({ src: match[1], w: Math.round(r2.width), h: Math.round(r2.height), alt: "" });
          } catch(e) {}
        }

        var sources = document.querySelectorAll("picture source, img[srcset]");
        for (var k = 0; k < sources.length; k++) {
          var srcset = sources[k].srcset;
          if (!srcset) continue;
          var parts = srcset.split(",");
          for (var p = 0; p < parts.length; p++) {
            var src = parts[p].trim().split(" ")[0];
            if (!src || src.length < 10 || m[src]) continue;
            m[src] = true;
            list.push({ src: src, w: 0, h: 0, alt: "" });
          }
        }

        var videos = document.querySelectorAll("video[poster]");
        for (var v = 0; v < videos.length; v++) {
          var ps = videos[v].poster;
          if (!ps || m[ps]) continue;
          m[ps] = true;
          list.push({ src: ps, w: 0, h: 0, alt: "" });
        }

        return list;
      }
    });

    var raw = (results && results[0] && results[0].result) ? results[0].result : [];
    images = [];
    selected.clear();
    filter = "all";

    raw = deduplicateImages(raw);

    if (raw.length === 0) {
      $gw.innerHTML = '<div class="empty"><div class="empty-i">&#x1F4ED;</div><h3>No images found</h3><p>Try a page with photos or graphics.</p><button class="scan-btn" id="scan-retry">Scan Again</button></div>';
      document.getElementById("scan-retry").addEventListener("click", function() { doScan(); });
      $hcount.innerHTML = '<span>No images</span> <button class="rescan-btn" id="rescan-h">Rescan</button>';
      document.getElementById("rescan-h").addEventListener("click", function() { doScan(); });
      return;
    }

    for (var i = 0; i < raw.length; i++) {
      raw[i].fmt = guessFormat(raw[i].src);
      images.push(raw[i]);
    }

    $hcount.innerHTML = '<b>' + images.length + '</b> images found <button class="rescan-btn" id="rescan-h2">Rescan</button>';
    document.getElementById("rescan-h2").addEventListener("click", function() { doScan(); });

    renderGrid();
    buildFilters();

    readExifBatch();

  } catch (err) {
    showError("Scan error: " + (err.message || err));
  }
}

// ═══ EXIF READER ═══
var exifCache = {};

function readExifBatch() {
  var toRead = images.slice(0, 20);
  toRead.forEach(function(img) {
    if (exifCache[img.src]) return;
    readExifFromUrl(img.src);
  });
}

function readExifFromUrl(url) {
  fetch(url, { mode: "cors" }).then(function(r) {
    if (!r.ok) throw new Error("not ok");
    return r.arrayBuffer();
  }).then(function(buf) {
    var exif = parseExifBasic(new Uint8Array(buf));
    exifCache[url] = exif;
  }).catch(function() {
    exifCache[url] = { unknown: true };
  });
}

function parseExifBasic(data) {
  var result = { hasExif: false, fields: [] };

  if (data[0] === 0xFF && data[1] === 0xD8) {
    var offset = 2;
    while (offset < data.length - 4) {
      if (data[offset] !== 0xFF) break;
      var marker = data[offset + 1];
      var len = (data[offset + 2] << 8) | data[offset + 3];

      if (marker === 0xE1) {
        if (data[offset + 4] === 0x45 && data[offset + 5] === 0x78 &&
            data[offset + 6] === 0x69 && data[offset + 7] === 0x66) {
          result.hasExif = true;

          var tiffStart = offset + 10;
          var bigEndian = data[tiffStart] === 0x4D;

          function read16(pos) {
            if (bigEndian) return (data[pos] << 8) | data[pos + 1];
            return data[pos] | (data[pos + 1] << 8);
          }
          function read32(pos) {
            if (bigEndian) return (data[pos] << 24) | (data[pos + 1] << 16) | (data[pos + 2] << 8) | data[pos + 3];
            return data[pos] | (data[pos + 1] << 8) | (data[pos + 2] << 16) | (data[pos + 3] << 24);
          }
          function readStr(pos, length) {
            var s = "";
            for (var i = 0; i < length && pos + i < data.length; i++) {
              var c = data[pos + i];
              if (c === 0) break;
              s += String.fromCharCode(c);
            }
            return s.trim();
          }

          var ifdOffset = read32(tiffStart + 4);
          var ifdPos = tiffStart + ifdOffset;

          if (ifdPos + 2 < data.length) {
            var entries = read16(ifdPos);
            var gpsIfdPointer = 0;

            for (var e = 0; e < entries && e < 100; e++) {
              var entryPos = ifdPos + 2 + (e * 12);
              if (entryPos + 12 > data.length) break;
              var tag = read16(entryPos);
              var type = read16(entryPos + 2);
              var count = read32(entryPos + 4);
              var valueOffset = read32(entryPos + 8);

              if (tag === 0x010F) {
                var strPos = count > 4 ? tiffStart + valueOffset : entryPos + 8;
                var make = readStr(strPos, Math.min(count, 32));
                if (make) result.fields.push({ icon: "\ud83d\udcf7", label: "Camera", value: make });
              }
              if (tag === 0x0110) {
                var strPos2 = count > 4 ? tiffStart + valueOffset : entryPos + 8;
                var model = readStr(strPos2, Math.min(count, 32));
                if (model) result.fields.push({ icon: "\ud83d\udcf1", label: "Model", value: model });
              }
              if (tag === 0x0132) {
                var strPos3 = count > 4 ? tiffStart + valueOffset : entryPos + 8;
                var dt = readStr(strPos3, 19);
                if (dt) result.fields.push({ icon: "\ud83d\udcc5", label: "Date", value: dt });
              }
              if (tag === 0x0131) {
                var strPos4 = count > 4 ? tiffStart + valueOffset : entryPos + 8;
                var sw = readStr(strPos4, Math.min(count, 32));
                if (sw) result.fields.push({ icon: "\ud83d\udcbb", label: "Software", value: sw });
              }
              if (tag === 0x010E) {
                var strPos5 = count > 4 ? tiffStart + valueOffset : entryPos + 8;
                var desc = readStr(strPos5, Math.min(count, 50));
                if (desc) result.fields.push({ icon: "\ud83d\udcdd", label: "Description", value: desc });
              }
              if (tag === 0x8825) {
                gpsIfdPointer = valueOffset;
              }
              if (tag === 0x011A && type === 5) {
                var rPos = tiffStart + valueOffset;
                if (rPos + 8 <= data.length) {
                  var num = read32(rPos);
                  var den = read32(rPos + 4);
                  if (den > 0) result.fields.push({ icon: "\ud83d\udd0d", label: "DPI", value: Math.round(num/den) + "" });
                }
              }
            }

            if (gpsIfdPointer > 0) {
              result.fields.push({ icon: "\ud83d\udccd", label: "GPS", value: "Location data found" });
              result.hasGps = true;
            }
          }
        }
        break;
      }

      offset += 2 + len;
    }
  }

  if (data[0] === 0x89 && data[1] === 0x50) {
    var pOffset = 8;
    while (pOffset + 8 < data.length) {
      var chunkLen = (data[pOffset] << 24) | (data[pOffset+1] << 16) | (data[pOffset+2] << 8) | data[pOffset+3];
      var chunkType = String.fromCharCode(data[pOffset+4], data[pOffset+5], data[pOffset+6], data[pOffset+7]);
      if (chunkType === "tEXt" || chunkType === "iTXt" || chunkType === "zTXt") {
        result.hasExif = true;
        result.fields.push({ icon: "\ud83d\udcc4", label: "Metadata", value: chunkType + " chunk found" });
      }
      if (chunkType === "eXIf") {
        result.hasExif = true;
        result.fields.push({ icon: "\ud83d\udcf7", label: "EXIF", value: "Embedded in PNG" });
      }
      if (chunkType === "IEND") break;
      pOffset += 12 + chunkLen;
    }
  }

  return result;
}

function showError(msg) {
  $gw.innerHTML = '<div class="err-box">' + msg + '<br><br><button class="scan-btn" id="scan-err">Try Again</button></div>';
  document.getElementById("scan-err").addEventListener("click", function() { doScan(); });
  $hcount.innerHTML = '<span style="color:#ff6b6b">Error</span>';
}

function guessFormat(u) {
  var l = u.split("?")[0].toLowerCase();
  if (l.endsWith(".webp") || u.indexOf("fm=webp") > -1 || u.indexOf("format=webp") > -1) return "WebP";
  if (l.endsWith(".png")) return "PNG";
  if (l.endsWith(".jpg") || l.endsWith(".jpeg")) return "JPG";
  if (l.endsWith(".gif")) return "GIF";
  if (l.endsWith(".svg")) return "SVG";
  if (l.endsWith(".avif") || u.indexOf("format=avif") > -1) return "AVIF";
  return "IMG";
}

function esc(x) { return x.replace(/&/g,"&amp;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/</g,"&lt;"); }

// ═══ RENDER GRID ═══
function renderGrid() {
  var list = filter === "all" ? images : images.filter(function(i) { return i.fmt === filter; });

  if (list.length === 0) {
    $gw.innerHTML = '<div class="empty"><div class="empty-i">&#x1F4ED;</div><h3>No images match</h3></div>';
    return;
  }

  var html = '<div class="grid">';
  for (var i = 0; i < list.length; i++) {
    var img = list[i];
    var isSel = selected.has(img.src);
    var dim = (img.w && img.h) ? img.w + "\u00d7" + img.h : "";
    html += '<div class="card' + (isSel ? " sel" : "") + '" style="animation-delay:' + (i * 25) + 'ms">';
    html += '<div class="ck" data-sel="' + esc(img.src) + '">' + (isSel ? "\u2713" : "") + '</div>';
    html += '<div class="cimg"><img src="' + esc(img.src) + '" loading="lazy"/></div>';
    html += '<div class="ci"><div class="cm"><span class="bg bg-f">' + img.fmt + '</span>' + (dim ? '<span class="bg bg-d">' + dim + '</span>' : '') + '</div>';
    html += '<div class="cbs">';
    html += '<button class="cbb p" data-dl="' + esc(img.src) + '" data-m="image/jpeg" data-e="jpg" data-q="0.95">JPG</button>';
    html += '<button class="cbb" data-dl="' + esc(img.src) + '" data-m="image/png" data-e="png" data-q="1">PNG</button>';
    html += '<button class="cbb" data-dl="' + esc(img.src) + '" data-m="image/webp" data-e="webp" data-q="0.9">WebP</button>';
    html += '</div></div></div>';
  }
  html += '</div>';
  var newGw = $gw.cloneNode(false);
  newGw.innerHTML = html;
  $gw.parentNode.replaceChild(newGw, $gw);
  $gw = newGw;
  $gw.addEventListener("click", handleGridClick);
  $bat.className = selected.size > 0 ? "batch on" : "batch";
  $batc.textContent = selected.size + " selected";
  var oldSpacer = document.querySelector(".batch-spacer");
  if (oldSpacer) oldSpacer.remove();
  if (selected.size > 0) {
    var spacer = document.createElement("div");
    spacer.className = "batch-spacer";
    $gw.parentNode.insertBefore(spacer, $gw);
  }
}

function handleGridClick(e) {
  var selBtn = e.target.closest("[data-sel]");
  if (selBtn) {
    e.stopPropagation();
    var src = selBtn.getAttribute("data-sel");
    if (selected.has(src)) selected.delete(src); else selected.add(src);
    renderGrid(); buildFilters(); return;
  }
  var dlBtn = e.target.closest("[data-dl]");
  if (dlBtn) {
    e.stopPropagation();
    downloadImage(dlBtn.getAttribute("data-dl"), dlBtn.getAttribute("data-m"), dlBtn.getAttribute("data-e"), parseFloat(dlBtn.getAttribute("data-q")));
  }
}

function buildFilters() {
  var counts = { all: images.length };
  for (var i = 0; i < images.length; i++) { var f = images[i].fmt; counts[f] = (counts[f] || 0) + 1; }
  if (images.length === 0) { $fbar.style.display = "none"; return; }
  $fbar.style.display = "flex";
  var html = "";
  var keys = Object.keys(counts);
  for (var k = 0; k < keys.length; k++) {
    var key = keys[k];
    html += '<button class="fb' + (filter === key ? " on" : "") + '" data-filt="' + key + '">' + (key === "all" ? "All" : key) + ' (' + counts[key] + ')</button>';
  }
  var visibleList = filter === "all" ? images : images.filter(function(i) { return i.fmt === filter; });
  var allSelected = visibleList.length > 0 && visibleList.every(function(i) { return selected.has(i.src); });
  html += '<button class="fb-selall" id="sel-all">' + (allSelected ? "Deselect All" : "Select All") + '</button>';

  var newFbar = $fbar.cloneNode(false);
  newFbar.innerHTML = html;
  $fbar.parentNode.replaceChild(newFbar, $fbar);
  $fbar = newFbar;

  $fbar.addEventListener("click", function(e) {
    var btn = e.target.closest("[data-filt]");
    if (btn) { filter = btn.getAttribute("data-filt"); renderGrid(); buildFilters(); return; }
    if (e.target.id === "sel-all" || e.target.closest("#sel-all")) {
      var visible = filter === "all" ? images : images.filter(function(i) { return i.fmt === filter; });
      var allSel = visible.length > 0 && visible.every(function(i) { return selected.has(i.src); });
      if (allSel) {
        visible.forEach(function(i) { selected.delete(i.src); });
      } else {
        visible.forEach(function(i) { selected.add(i.src); });
      }
      renderGrid(); buildFilters();
    }
  });
}

// ═══ EXIF TAB ═══
function renderExif() {
  if (images.length === 0) {
    $vexif.innerHTML = '<div class="empty"><div class="empty-i">\ud83d\udee1\ufe0f</div><h3>No images yet</h3><p>Scan a page first from the Download tab.</p><button class="scan-btn" id="scan-exif">Scan Now</button></div>';
    document.getElementById("scan-exif").addEventListener("click", function() { switchTab("dl"); doScan(); });
    return;
  }

  var withExif = 0, withGps = 0, clean = 0;
  for (var c = 0; c < images.length; c++) {
    var ex = exifCache[images[c].src];
    if (ex && !ex.unknown && ex.hasExif) { withExif++; if (ex.hasGps) withGps++; }
    else if (ex && !ex.unknown && !ex.hasExif) { clean++; }
  }

  var html = '<div style="padding:10px 10px 0;display:flex;gap:6px;flex-wrap:wrap;align-items:center">';
  if (withExif > 0) html += '<span style="font-size:11px;color:#991b1b;font-weight:600;background:#fef2f2;padding:4px 10px;border-radius:10px">' + withExif + ' with metadata</span>';
  if (withGps > 0) html += '<span style="font-size:11px;color:#92400e;font-weight:600;background:#fff3cd;padding:4px 10px;border-radius:10px">' + withGps + ' with GPS</span>';
  if (clean > 0) html += '<span style="font-size:11px;color:#065f46;font-weight:600;background:#d1fae5;padding:4px 10px;border-radius:10px">' + clean + ' clean</span>';
  html += '<button id="clean-all-btn" style="margin-left:auto;padding:6px 14px;background:#1c1c1e;color:#fff;border:none;border-radius:10px;font-size:11px;font-weight:600;cursor:pointer">Clean All</button>';
  html += '</div>';

  html += '<div class="elist">';
  var max = Math.min(images.length, 30);
  for (var i = 0; i < max; i++) {
    var img = images[i];
    var nm = img.src.split("/").pop().split("?")[0].substring(0, 30) || "image";
    var dim = (img.w && img.h) ? img.w + "\u00d7" + img.h : "";
    var exif = exifCache[img.src];

    html += '<div class="ecard" style="animation-delay:' + (i * 30) + 'ms" id="ecard-' + i + '">';
    html += '<div class="etop"><img class="eth" src="' + esc(img.src) + '"/>';
    html += '<div class="einfo"><div class="ename">' + esc(nm) + '</div>';
    html += '<div class="edet">' + img.fmt + (dim ? ' \u00b7 ' + dim : '') + '</div></div></div>';

    if (exif && !exif.unknown && exif.hasExif && exif.fields.length > 0) {
      html += '<div class="exif-data" id="exif-fields-' + i + '">';
      for (var f = 0; f < exif.fields.length; f++) {
        var field = exif.fields[f];
        html += '<div class="exif-item"><span class="exif-icon">' + field.icon + '</span>';
        html += '<span><span class="exif-label">' + field.label + '</span><br><span class="exif-val">' + esc(field.value) + '</span></span></div>';
      }
      html += '</div>';
      if (exif.hasGps) {
        html += '<div class="exif-warn" id="ew-' + i + '">\u26a0\ufe0f GPS location embedded \u2014 privacy risk!</div>';
      } else {
        html += '<div class="exif-warn" id="ew-' + i + '">\u26a0\ufe0f Contains metadata \u2014 camera info, dates, software</div>';
      }
    } else if (exif && !exif.unknown && !exif.hasExif) {
      html += '<div class="exif-none" id="ew-' + i + '">\u2705 No EXIF metadata detected \u2014 this image is clean</div>';
    } else {
      html += '<div class="exif-warn" id="ew-' + i + '">\u2753 May contain GPS, camera, timestamps \u2014 download clean to be safe</div>';
    }

    html += '<button class="ebtn" data-clean="' + esc(img.src) + '" data-idx="' + i + '">\u2193 Download Clean Copy (EXIF Removed)</button>';
    html += '</div>';
  }
  html += '</div>';
  var newExif = $vexif.cloneNode(false);
  newExif.innerHTML = html;
  newExif.style.display = $vexif.style.display;
  $vexif.parentNode.replaceChild(newExif, $vexif);
  $vexif = newExif;

  $vexif.addEventListener("click", function(e) {
    if (e.target.id === "clean-all-btn" || e.target.closest("#clean-all-btn")) {
      var allBtns = $vexif.querySelectorAll("[data-clean]");
      var count = 0;
      allBtns.forEach(function(btn) {
        if (btn.disabled) return;
        var src = btn.getAttribute("data-clean");
        var idx = btn.getAttribute("data-idx");
        setTimeout(function() { downloadImage(src, "image/jpeg", "jpg", 0.95); }, count * 400);
        var w = document.getElementById("ew-" + idx);
        if (w) { w.className = "exif-safe"; w.innerHTML = "\u2705 All metadata removed"; }
        var fields = document.getElementById("exif-fields-" + idx);
        if (fields) { fields.querySelectorAll(".exif-val").forEach(function(v) { v.className = "exif-val exif-removed"; }); }
        btn.textContent = "\u2713 Cleaned";
        btn.className = "ebtn done";
        btn.disabled = true;
        count++;
      });
      toast("Cleaning " + count + " images...");
      return;
    }

    var btn = e.target.closest("[data-clean]");
    if (!btn || btn.disabled) return;
    var src = btn.getAttribute("data-clean");
    var idx = btn.getAttribute("data-idx");
    downloadImage(src, "image/jpeg", "jpg", 0.95);

    var w = document.getElementById("ew-" + idx);
    if (w) { w.className = "exif-safe"; w.innerHTML = "\u2705 All metadata removed \u2014 clean copy downloaded"; }

    var fields = document.getElementById("exif-fields-" + idx);
    if (fields) {
      var items = fields.querySelectorAll(".exif-val");
      for (var v = 0; v < items.length; v++) { items[v].className = "exif-val exif-removed"; }
    }

    btn.textContent = "\u2713 Cleaned & Downloaded";
    btn.className = "ebtn done";
    btn.disabled = true;
  });
}

// ═══ COMPRESS TAB ═══
function renderComp() {
  if (images.length === 0) {
    $vcomp.innerHTML = '<div class="empty"><div class="empty-i">\ud83d\udce6</div><h3>No images yet</h3><p>Scan a page first from the Download tab.</p><button class="scan-btn" id="scan-comp">Scan Now</button></div>';
    document.getElementById("scan-comp").addEventListener("click", function() { switchTab("dl"); doScan(); });
    return;
  }
  var compressable = images.filter(function(i) { return i.fmt !== "SVG"; });
  var html = '<div style="padding:10px 10px 0;display:flex;align-items:center;justify-content:space-between">';
  html += '<span style="font-size:12px;color:#8e8e93;font-weight:500">' + compressable.length + ' compressable images</span>';
  html += '<button id="comp-all-btn" style="padding:6px 14px;background:#1c1c1e;color:#fff;border:none;border-radius:10px;font-size:11px;font-weight:600;cursor:pointer">Compress All</button>';
  html += '</div>';
  html += '<div class="clist">';
  var max = Math.min(compressable.length, 30);
  for (var i = 0; i < max; i++) {
    var img = compressable[i];
    var nm = img.src.split("/").pop().split("?")[0].substring(0, 26) || "image";
    var dim = (img.w && img.h) ? " \u00b7 " + img.w + "\u00d7" + img.h : "";
    html += '<div class="ccard" style="animation-delay:' + (i * 30) + 'ms">';
    html += '<div class="crow"><img class="cthu" src="' + esc(img.src) + '"/>';
    html += '<div class="cinf"><div class="cnm">' + esc(nm) + '</div><div class="csz">' + img.fmt + dim + '</div></div>';
    html += '<button class="cbtn" data-comp="' + esc(img.src) + '" data-idx="' + i + '">Compress</button>';
    html += '</div><div class="cres" id="cr-' + i + '"></div></div>';
  }
  html += '</div>';
  var newComp = $vcomp.cloneNode(false);
  newComp.innerHTML = html;
  newComp.style.display = $vcomp.style.display;
  $vcomp.parentNode.replaceChild(newComp, $vcomp);
  $vcomp = newComp;

  $vcomp.addEventListener("click", function(e) {
    if (e.target.id === "comp-all-btn" || e.target.closest("#comp-all-btn")) {
      var allBtns = $vcomp.querySelectorAll("[data-comp]");
      var count = 0;
      allBtns.forEach(function(btn) {
        if (btn.disabled) return;
        setTimeout(function() {
          compressImage(btn.getAttribute("data-comp"), parseInt(btn.getAttribute("data-idx")), btn);
        }, count * 600);
        count++;
      });
      toast("Compressing " + count + " images...");
      return;
    }

    var btn = e.target.closest("[data-comp]");
    if (!btn || btn.disabled) return;
    compressImage(btn.getAttribute("data-comp"), parseInt(btn.getAttribute("data-idx")), btn);
  });
}

function compressImage(src, idx, btn) {
  btn.textContent = "...";
  btn.disabled = true;
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    var c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    fetch(src).then(function(r) { return r.blob(); }).then(function(orig) {
      c.toBlob(function(blob) {
        if (!blob) { toast("CORS blocked"); btn.textContent = "CORS"; btn.disabled = false; return; }
        var pct = Math.round((1 - blob.size / orig.size) * 100);
        var u = URL.createObjectURL(blob);
        var fn = "image";
        try { fn = new URL(src).pathname.split("/").pop().split(".")[0] || "image"; } catch(e) {}
        var a = document.createElement("a"); a.href = u; a.download = fn + "-compressed.jpg";
        document.body.appendChild(a); a.click(); a.remove();
        var r = document.getElementById("cr-" + idx);
        if (r) { r.style.display = "block"; r.innerHTML = "\u2705 " + fmtBytes(orig.size) + " \u2192 " + fmtBytes(blob.size) + " <b>(" + (pct > 0 ? "-" + pct : "+" + Math.abs(pct)) + "%)</b>"; }
        btn.textContent = "\u2713 Done";
        btn.className = "cbtn done";
        toast("Compressed \u2212" + pct + "%");
      }, "image/jpeg", 0.8);
    }).catch(function() {
      c.toBlob(function(b) {
        if (!b) return;
        var u = URL.createObjectURL(b);
        var a = document.createElement("a"); a.href = u; a.download = "compressed.jpg";
        document.body.appendChild(a); a.click(); a.remove();
        btn.textContent = "\u2713"; btn.className = "cbtn done";
        toast("Compressed");
      }, "image/jpeg", 0.8);
    });
  };
  img.onerror = function() { toast("CORS blocked"); btn.textContent = "Error"; btn.disabled = false; };
  img.src = src;
}

// ═══ DOWNLOAD ═══
function downloadImage(src, mime, ext, q) {
  var img = new Image();
  img.crossOrigin = "anonymous";
  img.onload = function() {
    var c = document.createElement("canvas");
    c.width = img.naturalWidth; c.height = img.naturalHeight;
    c.getContext("2d").drawImage(img, 0, 0);
    c.toBlob(function(b) {
      if (!b) { toast("CORS blocked"); return; }
      var u = URL.createObjectURL(b);
      var fn = "image";
      try { fn = new URL(src).pathname.split("/").pop().split(".")[0].replace(/[^a-zA-Z0-9_-]/g, "") || "image"; } catch(e) {}
      var a = document.createElement("a"); a.href = u; a.download = fn + "." + ext;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(function() { URL.revokeObjectURL(u); }, 5000);
      toast(ext.toUpperCase() + " saved");
    }, mime, q);
  };
  img.onerror = function() { toast("Can\u2019t download (CORS)"); };
  img.src = src;
}

async function batchDl(m, e, q) {
  var list = Array.from(selected);
  toast("Downloading " + list.length + "...");
  for (var i = 0; i < list.length; i++) {
    downloadImage(list[i], m, e, q);
    await new Promise(function(r) { setTimeout(r, 500); });
  }
}

function fmtBytes(b) {
  if (b < 1024) return b + " B";
  if (b < 1048576) return Math.round(b / 1024) + " KB";
  return (b / 1048576).toFixed(1) + " MB";
}

function toast(m) {
  var old = document.querySelector(".toast");
  if (old) old.remove();
  var t = document.createElement("div");
  t.className = "toast";
  t.textContent = m;
  document.body.appendChild(t);
  setTimeout(function() { t.style.opacity = "0"; setTimeout(function() { t.remove(); }, 300); }, 2500);
}

// ═══ INIT ═══
doScan();

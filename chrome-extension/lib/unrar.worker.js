"use strict";
(() => {
  // ../node_modules/node-unrar-js/esm/js/ExtractorData.helper.js
  var DataFile = class {
    constructor(data) {
      this.buffers = [];
      this.pos = 0;
      this.size = 0;
      if (data) {
        this.buffers.push(data);
        this.size = data.byteLength;
        this.pos = 0;
      }
    }
    read(size) {
      this.flatten();
      if (size + this.pos > this.size) {
        return null;
      }
      const oldPos = this.pos;
      this.pos += size;
      return this.buffers[0].slice(oldPos, this.pos);
    }
    readAll() {
      this.flatten();
      return this.buffers[0] || new Uint8Array();
    }
    write(data) {
      this.buffers.push(data);
      this.size += data.byteLength;
      this.pos += data.byteLength;
      return true;
    }
    tell() {
      return this.pos;
    }
    seek(pos, method) {
      let newPos = this.pos;
      if (method === "SET") {
        newPos = pos;
      } else if (method === "CUR") {
        newPos += pos;
      } else {
        newPos = this.size - pos;
      }
      if (newPos < 0 || newPos > this.size) {
        return false;
      }
      this.pos = newPos;
      return true;
    }
    flatten() {
      if (this.buffers.length <= 1) {
        return;
      }
      const newBuffer = new Uint8Array(this.size);
      let offset = 0;
      for (const buffer of this.buffers) {
        newBuffer.set(buffer, offset);
        offset += buffer.byteLength;
      }
      this.buffers = [newBuffer];
    }
  };

  // ../node_modules/node-unrar-js/esm/js/Extractor.js
  var ERROR_CODE = {
    0: "ERAR_SUCCESS",
    10: "ERAR_END_ARCHIVE",
    11: "ERAR_NO_MEMORY",
    12: "ERAR_BAD_DATA",
    13: "ERAR_BAD_ARCHIVE",
    14: "ERAR_UNKNOWN_FORMAT",
    15: "ERAR_EOPEN",
    16: "ERAR_ECREATE",
    17: "ERAR_ECLOSE",
    18: "ERAR_EREAD",
    19: "ERAR_EWRITE",
    20: "ERAR_SMALL_BUF",
    21: "ERAR_UNKNOWN",
    22: "ERAR_MISSING_PASSWORD",
    23: "ERAR_EREFERENCE",
    24: "ERAR_BAD_PASSWORD"
  };
  var ERROR_MSG = {
    ERAR_NO_MEMORY: "Not enough memory",
    ERAR_BAD_DATA: "Archive header or data are damaged",
    ERAR_BAD_ARCHIVE: "File is not RAR archive",
    ERAR_UNKNOWN_FORMAT: "Unknown archive format",
    ERAR_EOPEN: "File open error",
    ERAR_ECREATE: "File create error",
    ERAR_ECLOSE: "File close error",
    ERAR_EREAD: "File read error",
    ERAR_EWRITE: "File write error",
    ERAR_SMALL_BUF: "Buffer for archive comment is too small, comment truncated",
    ERAR_UNKNOWN: "Unknown error",
    ERAR_MISSING_PASSWORD: "Password for encrypted file or header is not specified",
    ERAR_EREFERENCE: "Cannot open file source for reference record",
    ERAR_BAD_PASSWORD: "Wrong password is specified"
  };
  var UnrarError = class extends Error {
    constructor(reason, message, file) {
      super(message);
      this.reason = reason;
      this.file = file;
    }
  };
  var Extractor = class {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    constructor(unrar2, password = "") {
      this.unrar = unrar2;
      this._password = password;
      this._archive = null;
    }
    getFileList() {
      const arcHeader = this.openArc(true);
      function* getFileHeaders() {
        while (true) {
          const arcFile = this.processNextFile(() => true);
          if (arcFile === "ERAR_END_ARCHIVE") {
            break;
          }
          yield arcFile.fileHeader;
        }
        this.closeArc();
      }
      return { arcHeader, fileHeaders: getFileHeaders.call(this) };
    }
    extract({ files, password } = {}) {
      const arcHeader = this.openArc(false, password);
      function* getFiles() {
        let count = 0;
        while (true) {
          let shouldSkip = () => false;
          if (Array.isArray(files)) {
            if (count === files.length) {
              break;
            }
            shouldSkip = ({ name }) => !files.includes(name);
          } else if (files) {
            shouldSkip = (fileHeader) => !files(fileHeader);
          }
          const arcFile = this.processNextFile(shouldSkip);
          if (arcFile === "ERAR_END_ARCHIVE") {
            break;
          }
          if (arcFile.extraction === "skipped") {
            continue;
          }
          count++;
          yield {
            fileHeader: arcFile.fileHeader
          };
        }
        this.closeArc();
      }
      return { arcHeader, files: getFiles.call(this) };
    }
    fileCreated(filename) {
      return;
    }
    close(fd) {
      this.closeFile(fd);
    }
    openArc(listOnly, password) {
      this._archive = new this.unrar.RarArchive();
      const header = this._archive.open(this._filePath, password ? password : this._password, listOnly);
      if (header.state.errCode !== 0) {
        throw this.getFailException(header.state.errCode, header.state.errType);
      }
      return {
        comment: header.comment,
        flags: {
          volume: (header.flags & 1) !== 0,
          lock: (header.flags & 4) !== 0,
          solid: (header.flags & 8) !== 0,
          authInfo: (header.flags & 32) !== 0,
          recoveryRecord: (header.flags & 64) !== 0,
          headerEncrypted: (header.flags & 128) !== 0
        }
      };
    }
    processNextFile(shouldSkip) {
      function getDateString(dosTime) {
        const bitLen = [5, 6, 5, 5, 4, 7];
        let parts = [];
        for (const len of bitLen) {
          parts.push(dosTime & (1 << len) - 1);
          dosTime >>= len;
        }
        parts = parts.reverse();
        const pad = (num) => num < 10 ? "0" + num : "" + num;
        return `${1980 + parts[0]}-${pad(parts[1])}-${pad(parts[2])}T${pad(parts[3])}:${pad(parts[4])}:${pad(parts[5] * 2)}.000`;
      }
      function getMethod(method) {
        const methodMap = {
          48: "Storing",
          49: "Fastest",
          50: "Fast",
          51: "Normal",
          52: "Good",
          53: "Best"
        };
        return methodMap[method] || "Unknown";
      }
      const arcFileHeader = this._archive.getFileHeader();
      if (arcFileHeader.state.errCode === 10) {
        return "ERAR_END_ARCHIVE";
      }
      if (arcFileHeader.state.errCode !== 0) {
        throw this.getFailException(arcFileHeader.state.errCode, arcFileHeader.state.errType);
      }
      const fileHeader = {
        name: arcFileHeader.name,
        flags: {
          encrypted: (arcFileHeader.flags & 4) !== 0,
          solid: (arcFileHeader.flags & 16) !== 0,
          directory: (arcFileHeader.flags & 32) !== 0
        },
        packSize: arcFileHeader.packSize,
        unpSize: arcFileHeader.unpSize,
        // hostOS: arcFileHeader.hostOS
        crc: arcFileHeader.crc,
        time: getDateString(arcFileHeader.time),
        unpVer: `${Math.floor(arcFileHeader.unpVer / 10)}.${arcFileHeader.unpVer % 10}`,
        method: getMethod(arcFileHeader.method),
        comment: arcFileHeader.comment
        // // fileAttr: arcFileHeader.fileAttr,
      };
      const skip = shouldSkip(fileHeader);
      const fileState = this._archive.readFile(skip);
      if (fileState.errCode !== 0) {
        throw this.getFailException(fileState.errCode, fileState.errType, fileHeader.name);
      }
      return {
        fileHeader,
        extraction: skip ? "skipped" : "extracted"
      };
    }
    closeArc() {
      this._archive.delete();
      this._archive = null;
    }
    getFailException(errCode, _errType, file) {
      const reason = ERROR_CODE[errCode];
      this.closeArc();
      return new UnrarError(reason, ERROR_MSG[reason], file);
    }
  };

  // ../node_modules/node-unrar-js/esm/js/ExtractorData.js
  var ExtractorData = class extends Extractor {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-explicit-any
    constructor(unrar2, data, password) {
      super(unrar2, password);
      this.dataFiles = {};
      this.dataFileMap = {};
      this.currentFd = 1;
      const rarFile = {
        file: new DataFile(new Uint8Array(data)),
        fd: this.currentFd++
      };
      this._filePath = "_defaultUnrarJS_.rar";
      this.dataFiles[this._filePath] = rarFile;
      this.dataFileMap[rarFile.fd] = this._filePath;
    }
    extract(options = {}) {
      const { arcHeader, files } = super.extract(options);
      function* getFiles() {
        for (const file of files) {
          if (!file.fileHeader.flags.directory) {
            file.extraction = this.dataFiles[this.getExtractedFileName(file.fileHeader.name)].file.readAll();
          }
          yield file;
        }
      }
      return { arcHeader, files: getFiles.call(this) };
    }
    getExtractedFileName(filename) {
      return `*Extracted*/${filename}`;
    }
    open(filename) {
      const dataFile = this.dataFiles[filename];
      if (!dataFile) {
        return 0;
      }
      return dataFile.fd;
    }
    create(filename) {
      const fd = this.currentFd++;
      this.dataFiles[this.getExtractedFileName(filename)] = {
        file: new DataFile(),
        fd: this.currentFd++
      };
      this.dataFileMap[fd] = this.getExtractedFileName(filename);
      return fd;
    }
    closeFile(fd) {
      const fileData = this.dataFiles[this.dataFileMap[fd]];
      if (!fileData) {
        return;
      }
      fileData.file.seek(0, "SET");
    }
    read(fd, buf, size) {
      const fileData = this.dataFiles[this.dataFileMap[fd]];
      if (!fileData) {
        return -1;
      }
      const data = fileData.file.read(size);
      if (data === null) {
        return -1;
      }
      this.unrar.HEAPU8.set(data, buf);
      return data.byteLength;
    }
    write(fd, buf, size) {
      const fileData = this.dataFiles[this.dataFileMap[fd]];
      if (!fileData) {
        return false;
      }
      fileData.file.write(this.unrar.HEAPU8.slice(buf, buf + size));
      return true;
    }
    tell(fd) {
      const fileData = this.dataFiles[this.dataFileMap[fd]];
      if (!fileData) {
        return -1;
      }
      return fileData.file.tell();
    }
    seek(fd, pos, method) {
      const fileData = this.dataFiles[this.dataFileMap[fd]];
      if (!fileData) {
        return false;
      }
      return fileData.file.seek(pos, method);
    }
  };

  // ../node_modules/node-unrar-js/esm/js/unrar.js
  var Module = (() => {
    var _scriptDir = typeof document !== "undefined" && document.currentScript ? document.currentScript.src : void 0;
    return function(Module2) {
      Module2 = Module2 || {};
      var Module2 = typeof Module2 != "undefined" ? Module2 : {};
      var readyPromiseResolve, readyPromiseReject;
      Module2["ready"] = new Promise(function(resolve, reject) {
        readyPromiseResolve = resolve;
        readyPromiseReject = reject;
      });
      var moduleOverrides = Object.assign({}, Module2);
      var arguments_ = [];
      var thisProgram = "./this.program";
      var quit_ = (status, toThrow) => {
        throw toThrow;
      };
      var ENVIRONMENT_IS_WEB = typeof window == "object";
      var ENVIRONMENT_IS_WORKER = typeof importScripts == "function";
      var ENVIRONMENT_IS_NODE = typeof process == "object" && typeof process.versions == "object" && typeof process.versions.node == "string";
      var scriptDirectory = "";
      function locateFile(path) {
        if (Module2["locateFile"]) {
          return Module2["locateFile"](path, scriptDirectory);
        }
        return scriptDirectory + path;
      }
      var read_, readAsync, readBinary, setWindowTitle;
      if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
        if (ENVIRONMENT_IS_WORKER) {
          scriptDirectory = self.location.href;
        } else if (typeof document != "undefined" && document.currentScript) {
          scriptDirectory = document.currentScript.src;
        }
        if (_scriptDir) {
          scriptDirectory = _scriptDir;
        }
        if (scriptDirectory.indexOf("blob:") !== 0) {
          scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf("/") + 1);
        } else {
          scriptDirectory = "";
        }
        {
          read_ = (url) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, false);
            xhr.send(null);
            return xhr.responseText;
          };
          if (ENVIRONMENT_IS_WORKER) {
            readBinary = (url) => {
              var xhr = new XMLHttpRequest();
              xhr.open("GET", url, false);
              xhr.responseType = "arraybuffer";
              xhr.send(null);
              return new Uint8Array(xhr.response);
            };
          }
          readAsync = (url, onload, onerror) => {
            var xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.responseType = "arraybuffer";
            xhr.onload = () => {
              if (xhr.status == 200 || xhr.status == 0 && xhr.response) {
                onload(xhr.response);
                return;
              }
              onerror();
            };
            xhr.onerror = onerror;
            xhr.send(null);
          };
        }
        setWindowTitle = (title) => document.title = title;
      } else {
      }
      var out = Module2["print"] || console.log.bind(console);
      var err = Module2["printErr"] || console.warn.bind(console);
      Object.assign(Module2, moduleOverrides);
      moduleOverrides = null;
      if (Module2["arguments"])
        arguments_ = Module2["arguments"];
      if (Module2["thisProgram"])
        thisProgram = Module2["thisProgram"];
      if (Module2["quit"])
        quit_ = Module2["quit"];
      var tempRet0 = 0;
      var setTempRet0 = (value) => {
        tempRet0 = value;
      };
      var getTempRet0 = () => tempRet0;
      var wasmBinary;
      if (Module2["wasmBinary"])
        wasmBinary = Module2["wasmBinary"];
      var noExitRuntime = Module2["noExitRuntime"] || true;
      if (typeof WebAssembly != "object") {
        abort("no native wasm support detected");
      }
      var wasmMemory;
      var ABORT = false;
      var EXITSTATUS;
      function assert(condition, text) {
        if (!condition) {
          abort(text);
        }
      }
      var UTF8Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf8") : void 0;
      function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
        var endIdx = idx + maxBytesToRead;
        var endPtr = idx;
        while (heapOrArray[endPtr] && !(endPtr >= endIdx))
          ++endPtr;
        if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
          return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
        } else {
          var str = "";
          while (idx < endPtr) {
            var u0 = heapOrArray[idx++];
            if (!(u0 & 128)) {
              str += String.fromCharCode(u0);
              continue;
            }
            var u1 = heapOrArray[idx++] & 63;
            if ((u0 & 224) == 192) {
              str += String.fromCharCode((u0 & 31) << 6 | u1);
              continue;
            }
            var u2 = heapOrArray[idx++] & 63;
            if ((u0 & 240) == 224) {
              u0 = (u0 & 15) << 12 | u1 << 6 | u2;
            } else {
              u0 = (u0 & 7) << 18 | u1 << 12 | u2 << 6 | heapOrArray[idx++] & 63;
            }
            if (u0 < 65536) {
              str += String.fromCharCode(u0);
            } else {
              var ch = u0 - 65536;
              str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
            }
          }
        }
        return str;
      }
      function UTF8ToString(ptr, maxBytesToRead) {
        return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : "";
      }
      function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
        if (!(maxBytesToWrite > 0))
          return 0;
        var startIdx = outIdx;
        var endIdx = outIdx + maxBytesToWrite - 1;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343) {
            var u1 = str.charCodeAt(++i);
            u = 65536 + ((u & 1023) << 10) | u1 & 1023;
          }
          if (u <= 127) {
            if (outIdx >= endIdx)
              break;
            heap[outIdx++] = u;
          } else if (u <= 2047) {
            if (outIdx + 1 >= endIdx)
              break;
            heap[outIdx++] = 192 | u >> 6;
            heap[outIdx++] = 128 | u & 63;
          } else if (u <= 65535) {
            if (outIdx + 2 >= endIdx)
              break;
            heap[outIdx++] = 224 | u >> 12;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          } else {
            if (outIdx + 3 >= endIdx)
              break;
            heap[outIdx++] = 240 | u >> 18;
            heap[outIdx++] = 128 | u >> 12 & 63;
            heap[outIdx++] = 128 | u >> 6 & 63;
            heap[outIdx++] = 128 | u & 63;
          }
        }
        heap[outIdx] = 0;
        return outIdx - startIdx;
      }
      function stringToUTF8(str, outPtr, maxBytesToWrite) {
        return stringToUTF8Array(str, HEAPU8, outPtr, maxBytesToWrite);
      }
      function lengthBytesUTF8(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var u = str.charCodeAt(i);
          if (u >= 55296 && u <= 57343)
            u = 65536 + ((u & 1023) << 10) | str.charCodeAt(++i) & 1023;
          if (u <= 127)
            ++len;
          else if (u <= 2047)
            len += 2;
          else if (u <= 65535)
            len += 3;
          else
            len += 4;
        }
        return len;
      }
      var UTF16Decoder = typeof TextDecoder != "undefined" ? new TextDecoder("utf-16le") : void 0;
      function UTF16ToString(ptr, maxBytesToRead) {
        var endPtr = ptr;
        var idx = endPtr >> 1;
        var maxIdx = idx + maxBytesToRead / 2;
        while (!(idx >= maxIdx) && HEAPU16[idx])
          ++idx;
        endPtr = idx << 1;
        if (endPtr - ptr > 32 && UTF16Decoder) {
          return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
        } else {
          var str = "";
          for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
            var codeUnit = HEAP16[ptr + i * 2 >> 1];
            if (codeUnit == 0)
              break;
            str += String.fromCharCode(codeUnit);
          }
          return str;
        }
      }
      function stringToUTF16(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 2)
          return 0;
        maxBytesToWrite -= 2;
        var startPtr = outPtr;
        var numCharsToWrite = maxBytesToWrite < str.length * 2 ? maxBytesToWrite / 2 : str.length;
        for (var i = 0; i < numCharsToWrite; ++i) {
          var codeUnit = str.charCodeAt(i);
          HEAP16[outPtr >> 1] = codeUnit;
          outPtr += 2;
        }
        HEAP16[outPtr >> 1] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF16(str) {
        return str.length * 2;
      }
      function UTF32ToString(ptr, maxBytesToRead) {
        var i = 0;
        var str = "";
        while (!(i >= maxBytesToRead / 4)) {
          var utf32 = HEAP32[ptr + i * 4 >> 2];
          if (utf32 == 0)
            break;
          ++i;
          if (utf32 >= 65536) {
            var ch = utf32 - 65536;
            str += String.fromCharCode(55296 | ch >> 10, 56320 | ch & 1023);
          } else {
            str += String.fromCharCode(utf32);
          }
        }
        return str;
      }
      function stringToUTF32(str, outPtr, maxBytesToWrite) {
        if (maxBytesToWrite === void 0) {
          maxBytesToWrite = 2147483647;
        }
        if (maxBytesToWrite < 4)
          return 0;
        var startPtr = outPtr;
        var endPtr = startPtr + maxBytesToWrite - 4;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343) {
            var trailSurrogate = str.charCodeAt(++i);
            codeUnit = 65536 + ((codeUnit & 1023) << 10) | trailSurrogate & 1023;
          }
          HEAP32[outPtr >> 2] = codeUnit;
          outPtr += 4;
          if (outPtr + 4 > endPtr)
            break;
        }
        HEAP32[outPtr >> 2] = 0;
        return outPtr - startPtr;
      }
      function lengthBytesUTF32(str) {
        var len = 0;
        for (var i = 0; i < str.length; ++i) {
          var codeUnit = str.charCodeAt(i);
          if (codeUnit >= 55296 && codeUnit <= 57343)
            ++i;
          len += 4;
        }
        return len;
      }
      function allocateUTF8(str) {
        var size = lengthBytesUTF8(str) + 1;
        var ret = _malloc(size);
        if (ret)
          stringToUTF8Array(str, HEAP8, ret, size);
        return ret;
      }
      function writeAsciiToMemory(str, buffer2, dontAddNull) {
        for (var i = 0; i < str.length; ++i) {
          HEAP8[buffer2++ >> 0] = str.charCodeAt(i);
        }
        if (!dontAddNull)
          HEAP8[buffer2 >> 0] = 0;
      }
      var buffer, HEAP8, HEAPU8, HEAP16, HEAPU16, HEAP32, HEAPU32, HEAPF32, HEAPF64;
      function updateGlobalBufferAndViews(buf) {
        buffer = buf;
        Module2["HEAP8"] = HEAP8 = new Int8Array(buf);
        Module2["HEAP16"] = HEAP16 = new Int16Array(buf);
        Module2["HEAP32"] = HEAP32 = new Int32Array(buf);
        Module2["HEAPU8"] = HEAPU8 = new Uint8Array(buf);
        Module2["HEAPU16"] = HEAPU16 = new Uint16Array(buf);
        Module2["HEAPU32"] = HEAPU32 = new Uint32Array(buf);
        Module2["HEAPF32"] = HEAPF32 = new Float32Array(buf);
        Module2["HEAPF64"] = HEAPF64 = new Float64Array(buf);
      }
      var INITIAL_MEMORY = Module2["INITIAL_MEMORY"] || 16777216;
      var wasmTable;
      var __ATPRERUN__ = [];
      var __ATINIT__ = [];
      var __ATPOSTRUN__ = [];
      var runtimeInitialized = false;
      function preRun() {
        if (Module2["preRun"]) {
          if (typeof Module2["preRun"] == "function")
            Module2["preRun"] = [Module2["preRun"]];
          while (Module2["preRun"].length) {
            addOnPreRun(Module2["preRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPRERUN__);
      }
      function initRuntime() {
        runtimeInitialized = true;
        callRuntimeCallbacks(__ATINIT__);
      }
      function postRun() {
        if (Module2["postRun"]) {
          if (typeof Module2["postRun"] == "function")
            Module2["postRun"] = [Module2["postRun"]];
          while (Module2["postRun"].length) {
            addOnPostRun(Module2["postRun"].shift());
          }
        }
        callRuntimeCallbacks(__ATPOSTRUN__);
      }
      function addOnPreRun(cb) {
        __ATPRERUN__.unshift(cb);
      }
      function addOnInit(cb) {
        __ATINIT__.unshift(cb);
      }
      function addOnPostRun(cb) {
        __ATPOSTRUN__.unshift(cb);
      }
      var runDependencies = 0;
      var runDependencyWatcher = null;
      var dependenciesFulfilled = null;
      function addRunDependency(id) {
        runDependencies++;
        if (Module2["monitorRunDependencies"]) {
          Module2["monitorRunDependencies"](runDependencies);
        }
      }
      function removeRunDependency(id) {
        runDependencies--;
        if (Module2["monitorRunDependencies"]) {
          Module2["monitorRunDependencies"](runDependencies);
        }
        if (runDependencies == 0) {
          if (runDependencyWatcher !== null) {
            clearInterval(runDependencyWatcher);
            runDependencyWatcher = null;
          }
          if (dependenciesFulfilled) {
            var callback = dependenciesFulfilled;
            dependenciesFulfilled = null;
            callback();
          }
        }
      }
      function abort(what) {
        {
          if (Module2["onAbort"]) {
            Module2["onAbort"](what);
          }
        }
        what = "Aborted(" + what + ")";
        err(what);
        ABORT = true;
        EXITSTATUS = 1;
        what += ". Build with -sASSERTIONS for more info.";
        var e = new WebAssembly.RuntimeError(what);
        readyPromiseReject(e);
        throw e;
      }
      var dataURIPrefix = "data:application/octet-stream;base64,";
      function isDataURI(filename) {
        return filename.startsWith(dataURIPrefix);
      }
      function isFileURI(filename) {
        return filename.startsWith("file://");
      }
      var wasmBinaryFile;
      wasmBinaryFile = "unrar.wasm";
      if (!isDataURI(wasmBinaryFile)) {
        wasmBinaryFile = locateFile(wasmBinaryFile);
      }
      function getBinary(file) {
        try {
          if (file == wasmBinaryFile && wasmBinary) {
            return new Uint8Array(wasmBinary);
          }
          if (readBinary) {
            return readBinary(file);
          } else {
            throw "both async and sync fetching of the wasm failed";
          }
        } catch (err2) {
          abort(err2);
        }
      }
      function getBinaryPromise() {
        if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER)) {
          if (typeof fetch == "function" && !isFileURI(wasmBinaryFile)) {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
              if (!response["ok"]) {
                throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
              }
              return response["arrayBuffer"]();
            }).catch(function() {
              return getBinary(wasmBinaryFile);
            });
          } else {
            if (readAsync) {
              return new Promise(function(resolve, reject) {
                readAsync(wasmBinaryFile, function(response) {
                  resolve(new Uint8Array(response));
                }, reject);
              });
            }
          }
        }
        return Promise.resolve().then(function() {
          return getBinary(wasmBinaryFile);
        });
      }
      function createWasm() {
        var info = { "a": asmLibraryArg };
        function receiveInstance(instance, module) {
          var exports2 = instance.exports;
          Module2["asm"] = exports2;
          wasmMemory = Module2["asm"]["ka"];
          updateGlobalBufferAndViews(wasmMemory.buffer);
          wasmTable = Module2["asm"]["oa"];
          addOnInit(Module2["asm"]["la"]);
          removeRunDependency("wasm-instantiate");
        }
        addRunDependency("wasm-instantiate");
        function receiveInstantiationResult(result) {
          receiveInstance(result["instance"]);
        }
        function instantiateArrayBuffer(receiver) {
          return getBinaryPromise().then(function(binary) {
            return WebAssembly.instantiate(binary, info);
          }).then(function(instance) {
            return instance;
          }).then(receiver, function(reason) {
            err("failed to asynchronously prepare wasm: " + reason);
            abort(reason);
          });
        }
        function instantiateAsync() {
          if (!wasmBinary && typeof WebAssembly.instantiateStreaming == "function" && !isDataURI(wasmBinaryFile) && !isFileURI(wasmBinaryFile) && typeof fetch == "function") {
            return fetch(wasmBinaryFile, { credentials: "same-origin" }).then(function(response) {
              var result = WebAssembly.instantiateStreaming(response, info);
              return result.then(receiveInstantiationResult, function(reason) {
                err("wasm streaming compile failed: " + reason);
                err("falling back to ArrayBuffer instantiation");
                return instantiateArrayBuffer(receiveInstantiationResult);
              });
            });
          } else {
            return instantiateArrayBuffer(receiveInstantiationResult);
          }
        }
        if (Module2["instantiateWasm"]) {
          try {
            var exports = Module2["instantiateWasm"](info, receiveInstance);
            return exports;
          } catch (e) {
            err("Module.instantiateWasm callback failed with error: " + e);
            return false;
          }
        }
        instantiateAsync().catch(readyPromiseReject);
        return {};
      }
      function callRuntimeCallbacks(callbacks) {
        while (callbacks.length > 0) {
          var callback = callbacks.shift();
          if (typeof callback == "function") {
            callback(Module2);
            continue;
          }
          var func = callback.func;
          if (typeof func == "number") {
            if (callback.arg === void 0) {
              getWasmTableEntry(func)();
            } else {
              getWasmTableEntry(func)(callback.arg);
            }
          } else {
            func(callback.arg === void 0 ? null : callback.arg);
          }
        }
      }
      var wasmTableMirror = [];
      function getWasmTableEntry(funcPtr) {
        var func = wasmTableMirror[funcPtr];
        if (!func) {
          if (funcPtr >= wasmTableMirror.length)
            wasmTableMirror.length = funcPtr + 1;
          wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
        }
        return func;
      }
      function ___cxa_allocate_exception(size) {
        return _malloc(size + 24) + 24;
      }
      var exceptionCaught = [];
      function exception_addRef(info) {
        info.add_ref();
      }
      var uncaughtExceptionCount = 0;
      function ___cxa_begin_catch(ptr) {
        var info = new ExceptionInfo(ptr);
        if (!info.get_caught()) {
          info.set_caught(true);
          uncaughtExceptionCount--;
        }
        info.set_rethrown(false);
        exceptionCaught.push(info);
        exception_addRef(info);
        return info.get_exception_ptr();
      }
      var exceptionLast = 0;
      function ExceptionInfo(excPtr) {
        this.excPtr = excPtr;
        this.ptr = excPtr - 24;
        this.set_type = function(type) {
          HEAPU32[this.ptr + 4 >> 2] = type;
        };
        this.get_type = function() {
          return HEAPU32[this.ptr + 4 >> 2];
        };
        this.set_destructor = function(destructor) {
          HEAPU32[this.ptr + 8 >> 2] = destructor;
        };
        this.get_destructor = function() {
          return HEAPU32[this.ptr + 8 >> 2];
        };
        this.set_refcount = function(refcount) {
          HEAP32[this.ptr >> 2] = refcount;
        };
        this.set_caught = function(caught) {
          caught = caught ? 1 : 0;
          HEAP8[this.ptr + 12 >> 0] = caught;
        };
        this.get_caught = function() {
          return HEAP8[this.ptr + 12 >> 0] != 0;
        };
        this.set_rethrown = function(rethrown) {
          rethrown = rethrown ? 1 : 0;
          HEAP8[this.ptr + 13 >> 0] = rethrown;
        };
        this.get_rethrown = function() {
          return HEAP8[this.ptr + 13 >> 0] != 0;
        };
        this.init = function(type, destructor) {
          this.set_adjusted_ptr(0);
          this.set_type(type);
          this.set_destructor(destructor);
          this.set_refcount(0);
          this.set_caught(false);
          this.set_rethrown(false);
        };
        this.add_ref = function() {
          var value = HEAP32[this.ptr >> 2];
          HEAP32[this.ptr >> 2] = value + 1;
        };
        this.release_ref = function() {
          var prev = HEAP32[this.ptr >> 2];
          HEAP32[this.ptr >> 2] = prev - 1;
          return prev === 1;
        };
        this.set_adjusted_ptr = function(adjustedPtr) {
          HEAPU32[this.ptr + 16 >> 2] = adjustedPtr;
        };
        this.get_adjusted_ptr = function() {
          return HEAPU32[this.ptr + 16 >> 2];
        };
        this.get_exception_ptr = function() {
          var isPointer = ___cxa_is_pointer_type(this.get_type());
          if (isPointer) {
            return HEAPU32[this.excPtr >> 2];
          }
          var adjusted = this.get_adjusted_ptr();
          if (adjusted !== 0)
            return adjusted;
          return this.excPtr;
        };
      }
      function ___cxa_free_exception(ptr) {
        return _free(new ExceptionInfo(ptr).ptr);
      }
      function exception_decRef(info) {
        if (info.release_ref() && !info.get_rethrown()) {
          var destructor = info.get_destructor();
          if (destructor) {
            getWasmTableEntry(destructor)(info.excPtr);
          }
          ___cxa_free_exception(info.excPtr);
        }
      }
      function ___cxa_end_catch() {
        _setThrew(0);
        var info = exceptionCaught.pop();
        exception_decRef(info);
        exceptionLast = 0;
      }
      function ___resumeException(ptr) {
        if (!exceptionLast) {
          exceptionLast = ptr;
        }
        throw ptr;
      }
      function ___cxa_find_matching_catch_2() {
        var thrown = exceptionLast;
        if (!thrown) {
          setTempRet0(0);
          return 0;
        }
        var info = new ExceptionInfo(thrown);
        info.set_adjusted_ptr(thrown);
        var thrownType = info.get_type();
        if (!thrownType) {
          setTempRet0(0);
          return thrown;
        }
        var typeArray = Array.prototype.slice.call(arguments);
        for (var i = 0; i < typeArray.length; i++) {
          var caughtType = typeArray[i];
          if (caughtType === 0 || caughtType === thrownType) {
            break;
          }
          var adjusted_ptr_addr = info.ptr + 16;
          if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown;
          }
        }
        setTempRet0(thrownType);
        return thrown;
      }
      function ___cxa_find_matching_catch_3() {
        var thrown = exceptionLast;
        if (!thrown) {
          setTempRet0(0);
          return 0;
        }
        var info = new ExceptionInfo(thrown);
        info.set_adjusted_ptr(thrown);
        var thrownType = info.get_type();
        if (!thrownType) {
          setTempRet0(0);
          return thrown;
        }
        var typeArray = Array.prototype.slice.call(arguments);
        for (var i = 0; i < typeArray.length; i++) {
          var caughtType = typeArray[i];
          if (caughtType === 0 || caughtType === thrownType) {
            break;
          }
          var adjusted_ptr_addr = info.ptr + 16;
          if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown;
          }
        }
        setTempRet0(thrownType);
        return thrown;
      }
      function ___cxa_find_matching_catch_4() {
        var thrown = exceptionLast;
        if (!thrown) {
          setTempRet0(0);
          return 0;
        }
        var info = new ExceptionInfo(thrown);
        info.set_adjusted_ptr(thrown);
        var thrownType = info.get_type();
        if (!thrownType) {
          setTempRet0(0);
          return thrown;
        }
        var typeArray = Array.prototype.slice.call(arguments);
        for (var i = 0; i < typeArray.length; i++) {
          var caughtType = typeArray[i];
          if (caughtType === 0 || caughtType === thrownType) {
            break;
          }
          var adjusted_ptr_addr = info.ptr + 16;
          if (___cxa_can_catch(caughtType, thrownType, adjusted_ptr_addr)) {
            setTempRet0(caughtType);
            return thrown;
          }
        }
        setTempRet0(thrownType);
        return thrown;
      }
      function ___cxa_throw(ptr, type, destructor) {
        var info = new ExceptionInfo(ptr);
        info.init(type, destructor);
        exceptionLast = ptr;
        uncaughtExceptionCount++;
        throw ptr;
      }
      var SYSCALLS = { varargs: void 0, get: function() {
        SYSCALLS.varargs += 4;
        var ret = HEAP32[SYSCALLS.varargs - 4 >> 2];
        return ret;
      }, getStr: function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      } };
      function ___syscall_fchownat(dirfd, path, owner, group, flags) {
      }
      function ___syscall_symlink(target, linkpath) {
      }
      var structRegistrations = {};
      function runDestructors(destructors) {
        while (destructors.length) {
          var ptr = destructors.pop();
          var del = destructors.pop();
          del(ptr);
        }
      }
      function simpleReadValueFromPointer(pointer) {
        return this["fromWireType"](HEAPU32[pointer >> 2]);
      }
      var awaitingDependencies = {};
      var registeredTypes = {};
      var typeDependencies = {};
      var char_0 = 48;
      var char_9 = 57;
      function makeLegalFunctionName(name) {
        if (void 0 === name) {
          return "_unknown";
        }
        name = name.replace(/[^a-zA-Z0-9_]/g, "$");
        var f = name.charCodeAt(0);
        if (f >= char_0 && f <= char_9) {
          return "_" + name;
        }
        return name;
      }
      function createNamedFunction(name, body) {
        name = makeLegalFunctionName(name);
        return new Function("body", "return function " + name + '() {\n    "use strict";    return body.apply(this, arguments);\n};\n')(body);
      }
      function extendError(baseErrorType, errorName) {
        var errorClass = createNamedFunction(errorName, function(message) {
          this.name = errorName;
          this.message = message;
          var stack = new Error(message).stack;
          if (stack !== void 0) {
            this.stack = this.toString() + "\n" + stack.replace(/^Error(:[^\n]*)?\n/, "");
          }
        });
        errorClass.prototype = Object.create(baseErrorType.prototype);
        errorClass.prototype.constructor = errorClass;
        errorClass.prototype.toString = function() {
          if (this.message === void 0) {
            return this.name;
          } else {
            return this.name + ": " + this.message;
          }
        };
        return errorClass;
      }
      var InternalError = void 0;
      function throwInternalError(message) {
        throw new InternalError(message);
      }
      function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
        myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
        });
        function onComplete(typeConverters2) {
          var myTypeConverters = getTypeConverters(typeConverters2);
          if (myTypeConverters.length !== myTypes.length) {
            throwInternalError("Mismatched type converter count");
          }
          for (var i = 0; i < myTypes.length; ++i) {
            registerType(myTypes[i], myTypeConverters[i]);
          }
        }
        var typeConverters = new Array(dependentTypes.length);
        var unregisteredTypes = [];
        var registered = 0;
        dependentTypes.forEach((dt, i) => {
          if (registeredTypes.hasOwnProperty(dt)) {
            typeConverters[i] = registeredTypes[dt];
          } else {
            unregisteredTypes.push(dt);
            if (!awaitingDependencies.hasOwnProperty(dt)) {
              awaitingDependencies[dt] = [];
            }
            awaitingDependencies[dt].push(() => {
              typeConverters[i] = registeredTypes[dt];
              ++registered;
              if (registered === unregisteredTypes.length) {
                onComplete(typeConverters);
              }
            });
          }
        });
        if (0 === unregisteredTypes.length) {
          onComplete(typeConverters);
        }
      }
      function __embind_finalize_value_object(structType) {
        var reg = structRegistrations[structType];
        delete structRegistrations[structType];
        var rawConstructor = reg.rawConstructor;
        var rawDestructor = reg.rawDestructor;
        var fieldRecords = reg.fields;
        var fieldTypes = fieldRecords.map((field) => field.getterReturnType).concat(fieldRecords.map((field) => field.setterArgumentType));
        whenDependentTypesAreResolved([structType], fieldTypes, (fieldTypes2) => {
          var fields = {};
          fieldRecords.forEach((field, i) => {
            var fieldName = field.fieldName;
            var getterReturnType = fieldTypes2[i];
            var getter = field.getter;
            var getterContext = field.getterContext;
            var setterArgumentType = fieldTypes2[i + fieldRecords.length];
            var setter = field.setter;
            var setterContext = field.setterContext;
            fields[fieldName] = { read: (ptr) => {
              return getterReturnType["fromWireType"](getter(getterContext, ptr));
            }, write: (ptr, o) => {
              var destructors = [];
              setter(setterContext, ptr, setterArgumentType["toWireType"](destructors, o));
              runDestructors(destructors);
            } };
          });
          return [{ name: reg.name, "fromWireType": function(ptr) {
            var rv = {};
            for (var i in fields) {
              rv[i] = fields[i].read(ptr);
            }
            rawDestructor(ptr);
            return rv;
          }, "toWireType": function(destructors, o) {
            for (var fieldName in fields) {
              if (!(fieldName in o)) {
                throw new TypeError('Missing field:  "' + fieldName + '"');
              }
            }
            var ptr = rawConstructor();
            for (fieldName in fields) {
              fields[fieldName].write(ptr, o[fieldName]);
            }
            if (destructors !== null) {
              destructors.push(rawDestructor, ptr);
            }
            return ptr;
          }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: rawDestructor }];
        });
      }
      function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {
      }
      function getShiftFromSize(size) {
        switch (size) {
          case 1:
            return 0;
          case 2:
            return 1;
          case 4:
            return 2;
          case 8:
            return 3;
          default:
            throw new TypeError("Unknown type size: " + size);
        }
      }
      function embind_init_charCodes() {
        var codes = new Array(256);
        for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
        }
        embind_charCodes = codes;
      }
      var embind_charCodes = void 0;
      function readLatin1String(ptr) {
        var ret = "";
        var c = ptr;
        while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
        }
        return ret;
      }
      var BindingError = void 0;
      function throwBindingError(message) {
        throw new BindingError(message);
      }
      function registerType(rawType, registeredInstance, options = {}) {
        if (!("argPackAdvance" in registeredInstance)) {
          throw new TypeError("registerType registeredInstance requires argPackAdvance");
        }
        var name = registeredInstance.name;
        if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
        }
        if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
            return;
          } else {
            throwBindingError("Cannot register type '" + name + "' twice");
          }
        }
        registeredTypes[rawType] = registeredInstance;
        delete typeDependencies[rawType];
        if (awaitingDependencies.hasOwnProperty(rawType)) {
          var callbacks = awaitingDependencies[rawType];
          delete awaitingDependencies[rawType];
          callbacks.forEach((cb) => cb());
        }
      }
      function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(wt) {
          return !!wt;
        }, "toWireType": function(destructors, o) {
          return o ? trueValue : falseValue;
        }, "argPackAdvance": 8, "readValueFromPointer": function(pointer) {
          var heap;
          if (size === 1) {
            heap = HEAP8;
          } else if (size === 2) {
            heap = HEAP16;
          } else if (size === 4) {
            heap = HEAP32;
          } else {
            throw new TypeError("Unknown boolean type size: " + name);
          }
          return this["fromWireType"](heap[pointer >> shift]);
        }, destructorFunction: null });
      }
      function ClassHandle_isAliasOf(other) {
        if (!(this instanceof ClassHandle)) {
          return false;
        }
        if (!(other instanceof ClassHandle)) {
          return false;
        }
        var leftClass = this.$$.ptrType.registeredClass;
        var left = this.$$.ptr;
        var rightClass = other.$$.ptrType.registeredClass;
        var right = other.$$.ptr;
        while (leftClass.baseClass) {
          left = leftClass.upcast(left);
          leftClass = leftClass.baseClass;
        }
        while (rightClass.baseClass) {
          right = rightClass.upcast(right);
          rightClass = rightClass.baseClass;
        }
        return leftClass === rightClass && left === right;
      }
      function shallowCopyInternalPointer(o) {
        return { count: o.count, deleteScheduled: o.deleteScheduled, preservePointerOnDelete: o.preservePointerOnDelete, ptr: o.ptr, ptrType: o.ptrType, smartPtr: o.smartPtr, smartPtrType: o.smartPtrType };
      }
      function throwInstanceAlreadyDeleted(obj) {
        function getInstanceTypeName(handle) {
          return handle.$$.ptrType.registeredClass.name;
        }
        throwBindingError(getInstanceTypeName(obj) + " instance already deleted");
      }
      var finalizationRegistry = false;
      function detachFinalizer(handle) {
      }
      function runDestructor($$) {
        if ($$.smartPtr) {
          $$.smartPtrType.rawDestructor($$.smartPtr);
        } else {
          $$.ptrType.registeredClass.rawDestructor($$.ptr);
        }
      }
      function releaseClassHandle($$) {
        $$.count.value -= 1;
        var toDelete = 0 === $$.count.value;
        if (toDelete) {
          runDestructor($$);
        }
      }
      function downcastPointer(ptr, ptrClass, desiredClass) {
        if (ptrClass === desiredClass) {
          return ptr;
        }
        if (void 0 === desiredClass.baseClass) {
          return null;
        }
        var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
        if (rv === null) {
          return null;
        }
        return desiredClass.downcast(rv);
      }
      var registeredPointers = {};
      function getInheritedInstanceCount() {
        return Object.keys(registeredInstances).length;
      }
      function getLiveInheritedInstances() {
        var rv = [];
        for (var k in registeredInstances) {
          if (registeredInstances.hasOwnProperty(k)) {
            rv.push(registeredInstances[k]);
          }
        }
        return rv;
      }
      var deletionQueue = [];
      function flushPendingDeletes() {
        while (deletionQueue.length) {
          var obj = deletionQueue.pop();
          obj.$$.deleteScheduled = false;
          obj["delete"]();
        }
      }
      var delayFunction = void 0;
      function setDelayFunction(fn) {
        delayFunction = fn;
        if (deletionQueue.length && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
      }
      function init_embind() {
        Module2["getInheritedInstanceCount"] = getInheritedInstanceCount;
        Module2["getLiveInheritedInstances"] = getLiveInheritedInstances;
        Module2["flushPendingDeletes"] = flushPendingDeletes;
        Module2["setDelayFunction"] = setDelayFunction;
      }
      var registeredInstances = {};
      function getBasestPointer(class_, ptr) {
        if (ptr === void 0) {
          throwBindingError("ptr should not be undefined");
        }
        while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
        }
        return ptr;
      }
      function getInheritedInstance(class_, ptr) {
        ptr = getBasestPointer(class_, ptr);
        return registeredInstances[ptr];
      }
      function makeClassHandle(prototype, record) {
        if (!record.ptrType || !record.ptr) {
          throwInternalError("makeClassHandle requires ptr and ptrType");
        }
        var hasSmartPtrType = !!record.smartPtrType;
        var hasSmartPtr = !!record.smartPtr;
        if (hasSmartPtrType !== hasSmartPtr) {
          throwInternalError("Both smartPtrType and smartPtr must be specified");
        }
        record.count = { value: 1 };
        return attachFinalizer(Object.create(prototype, { $$: { value: record } }));
      }
      function RegisteredPointer_fromWireType(ptr) {
        var rawPointer = this.getPointee(ptr);
        if (!rawPointer) {
          this.destructor(ptr);
          return null;
        }
        var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
        if (void 0 !== registeredInstance) {
          if (0 === registeredInstance.$$.count.value) {
            registeredInstance.$$.ptr = rawPointer;
            registeredInstance.$$.smartPtr = ptr;
            return registeredInstance["clone"]();
          } else {
            var rv = registeredInstance["clone"]();
            this.destructor(ptr);
            return rv;
          }
        }
        function makeDefaultHandle() {
          if (this.isSmartPointer) {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this.pointeeType, ptr: rawPointer, smartPtrType: this, smartPtr: ptr });
          } else {
            return makeClassHandle(this.registeredClass.instancePrototype, { ptrType: this, ptr });
          }
        }
        var actualType = this.registeredClass.getActualType(rawPointer);
        var registeredPointerRecord = registeredPointers[actualType];
        if (!registeredPointerRecord) {
          return makeDefaultHandle.call(this);
        }
        var toType;
        if (this.isConst) {
          toType = registeredPointerRecord.constPointerType;
        } else {
          toType = registeredPointerRecord.pointerType;
        }
        var dp = downcastPointer(rawPointer, this.registeredClass, toType.registeredClass);
        if (dp === null) {
          return makeDefaultHandle.call(this);
        }
        if (this.isSmartPointer) {
          return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp, smartPtrType: this, smartPtr: ptr });
        } else {
          return makeClassHandle(toType.registeredClass.instancePrototype, { ptrType: toType, ptr: dp });
        }
      }
      function attachFinalizer(handle) {
        if ("undefined" === typeof FinalizationRegistry) {
          attachFinalizer = (handle2) => handle2;
          return handle;
        }
        finalizationRegistry = new FinalizationRegistry((info) => {
          releaseClassHandle(info.$$);
        });
        attachFinalizer = (handle2) => {
          var $$ = handle2.$$;
          var hasSmartPtr = !!$$.smartPtr;
          if (hasSmartPtr) {
            var info = { $$ };
            finalizationRegistry.register(handle2, info, handle2);
          }
          return handle2;
        };
        detachFinalizer = (handle2) => finalizationRegistry.unregister(handle2);
        return attachFinalizer(handle);
      }
      function ClassHandle_clone() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.preservePointerOnDelete) {
          this.$$.count.value += 1;
          return this;
        } else {
          var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), { $$: { value: shallowCopyInternalPointer(this.$$) } }));
          clone.$$.count.value += 1;
          clone.$$.deleteScheduled = false;
          return clone;
        }
      }
      function ClassHandle_delete() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        detachFinalizer(this);
        releaseClassHandle(this.$$);
        if (!this.$$.preservePointerOnDelete) {
          this.$$.smartPtr = void 0;
          this.$$.ptr = void 0;
        }
      }
      function ClassHandle_isDeleted() {
        return !this.$$.ptr;
      }
      function ClassHandle_deleteLater() {
        if (!this.$$.ptr) {
          throwInstanceAlreadyDeleted(this);
        }
        if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
          throwBindingError("Object already scheduled for deletion");
        }
        deletionQueue.push(this);
        if (deletionQueue.length === 1 && delayFunction) {
          delayFunction(flushPendingDeletes);
        }
        this.$$.deleteScheduled = true;
        return this;
      }
      function init_ClassHandle() {
        ClassHandle.prototype["isAliasOf"] = ClassHandle_isAliasOf;
        ClassHandle.prototype["clone"] = ClassHandle_clone;
        ClassHandle.prototype["delete"] = ClassHandle_delete;
        ClassHandle.prototype["isDeleted"] = ClassHandle_isDeleted;
        ClassHandle.prototype["deleteLater"] = ClassHandle_deleteLater;
      }
      function ClassHandle() {
      }
      function ensureOverloadTable(proto, methodName, humanName) {
        if (void 0 === proto[methodName].overloadTable) {
          var prevFunc = proto[methodName];
          proto[methodName] = function() {
            if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
            }
            return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
          };
          proto[methodName].overloadTable = [];
          proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
        }
      }
      function exposePublicSymbol(name, value, numArguments) {
        if (Module2.hasOwnProperty(name)) {
          if (void 0 === numArguments || void 0 !== Module2[name].overloadTable && void 0 !== Module2[name].overloadTable[numArguments]) {
            throwBindingError("Cannot register public name '" + name + "' twice");
          }
          ensureOverloadTable(Module2, name, name);
          if (Module2.hasOwnProperty(numArguments)) {
            throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
          }
          Module2[name].overloadTable[numArguments] = value;
        } else {
          Module2[name] = value;
          if (void 0 !== numArguments) {
            Module2[name].numArguments = numArguments;
          }
        }
      }
      function RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast) {
        this.name = name;
        this.constructor = constructor;
        this.instancePrototype = instancePrototype;
        this.rawDestructor = rawDestructor;
        this.baseClass = baseClass;
        this.getActualType = getActualType;
        this.upcast = upcast;
        this.downcast = downcast;
        this.pureVirtualFunctions = [];
      }
      function upcastPointer(ptr, ptrClass, desiredClass) {
        while (ptrClass !== desiredClass) {
          if (!ptrClass.upcast) {
            throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
          }
          ptr = ptrClass.upcast(ptr);
          ptrClass = ptrClass.baseClass;
        }
        return ptr;
      }
      function constNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function genericPointerToWireType(destructors, handle) {
        var ptr;
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          if (this.isSmartPointer) {
            ptr = this.rawConstructor();
            if (destructors !== null) {
              destructors.push(this.rawDestructor, ptr);
            }
            return ptr;
          } else {
            return 0;
          }
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (!this.isConst && handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        if (this.isSmartPointer) {
          if (void 0 === handle.$$.smartPtr) {
            throwBindingError("Passing raw pointer to smart pointer is illegal");
          }
          switch (this.sharingPolicy) {
            case 0:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                throwBindingError("Cannot convert argument of type " + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + " to parameter type " + this.name);
              }
              break;
            case 1:
              ptr = handle.$$.smartPtr;
              break;
            case 2:
              if (handle.$$.smartPtrType === this) {
                ptr = handle.$$.smartPtr;
              } else {
                var clonedHandle = handle["clone"]();
                ptr = this.rawShare(ptr, Emval.toHandle(function() {
                  clonedHandle["delete"]();
                }));
                if (destructors !== null) {
                  destructors.push(this.rawDestructor, ptr);
                }
              }
              break;
            default:
              throwBindingError("Unsupporting sharing policy");
          }
        }
        return ptr;
      }
      function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
        if (handle === null) {
          if (this.isReference) {
            throwBindingError("null is not a valid " + this.name);
          }
          return 0;
        }
        if (!handle.$$) {
          throwBindingError('Cannot pass "' + _embind_repr(handle) + '" as a ' + this.name);
        }
        if (!handle.$$.ptr) {
          throwBindingError("Cannot pass deleted object as a pointer of type " + this.name);
        }
        if (handle.$$.ptrType.isConst) {
          throwBindingError("Cannot convert argument of type " + handle.$$.ptrType.name + " to parameter type " + this.name);
        }
        var handleClass = handle.$$.ptrType.registeredClass;
        var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
        return ptr;
      }
      function RegisteredPointer_getPointee(ptr) {
        if (this.rawGetPointee) {
          ptr = this.rawGetPointee(ptr);
        }
        return ptr;
      }
      function RegisteredPointer_destructor(ptr) {
        if (this.rawDestructor) {
          this.rawDestructor(ptr);
        }
      }
      function RegisteredPointer_deleteObject(handle) {
        if (handle !== null) {
          handle["delete"]();
        }
      }
      function init_RegisteredPointer() {
        RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
        RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
        RegisteredPointer.prototype["argPackAdvance"] = 8;
        RegisteredPointer.prototype["readValueFromPointer"] = simpleReadValueFromPointer;
        RegisteredPointer.prototype["deleteObject"] = RegisteredPointer_deleteObject;
        RegisteredPointer.prototype["fromWireType"] = RegisteredPointer_fromWireType;
      }
      function RegisteredPointer(name, registeredClass, isReference, isConst, isSmartPointer, pointeeType, sharingPolicy, rawGetPointee, rawConstructor, rawShare, rawDestructor) {
        this.name = name;
        this.registeredClass = registeredClass;
        this.isReference = isReference;
        this.isConst = isConst;
        this.isSmartPointer = isSmartPointer;
        this.pointeeType = pointeeType;
        this.sharingPolicy = sharingPolicy;
        this.rawGetPointee = rawGetPointee;
        this.rawConstructor = rawConstructor;
        this.rawShare = rawShare;
        this.rawDestructor = rawDestructor;
        if (!isSmartPointer && registeredClass.baseClass === void 0) {
          if (isConst) {
            this["toWireType"] = constNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          } else {
            this["toWireType"] = nonConstNoSmartPtrRawPointerToWireType;
            this.destructorFunction = null;
          }
        } else {
          this["toWireType"] = genericPointerToWireType;
        }
      }
      function replacePublicSymbol(name, value, numArguments) {
        if (!Module2.hasOwnProperty(name)) {
          throwInternalError("Replacing nonexistant public symbol");
        }
        if (void 0 !== Module2[name].overloadTable && void 0 !== numArguments) {
          Module2[name].overloadTable[numArguments] = value;
        } else {
          Module2[name] = value;
          Module2[name].argCount = numArguments;
        }
      }
      function dynCallLegacy(sig, ptr, args) {
        var f = Module2["dynCall_" + sig];
        return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
      }
      function dynCall(sig, ptr, args) {
        if (sig.includes("j")) {
          return dynCallLegacy(sig, ptr, args);
        }
        return getWasmTableEntry(ptr).apply(null, args);
      }
      function getDynCaller(sig, ptr) {
        var argCache = [];
        return function() {
          argCache.length = 0;
          Object.assign(argCache, arguments);
          return dynCall(sig, ptr, argCache);
        };
      }
      function embind__requireFunction(signature, rawFunction) {
        signature = readLatin1String(signature);
        function makeDynCaller() {
          if (signature.includes("j")) {
            return getDynCaller(signature, rawFunction);
          }
          return getWasmTableEntry(rawFunction);
        }
        var fp = makeDynCaller();
        if (typeof fp != "function") {
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
        }
        return fp;
      }
      var UnboundTypeError = void 0;
      function getTypeName(type) {
        var ptr = ___getTypeName(type);
        var rv = readLatin1String(ptr);
        _free(ptr);
        return rv;
      }
      function throwUnboundTypeError(message, types) {
        var unboundTypes = [];
        var seen = {};
        function visit(type) {
          if (seen[type]) {
            return;
          }
          if (registeredTypes[type]) {
            return;
          }
          if (typeDependencies[type]) {
            typeDependencies[type].forEach(visit);
            return;
          }
          unboundTypes.push(type);
          seen[type] = true;
        }
        types.forEach(visit);
        throw new UnboundTypeError(message + ": " + unboundTypes.map(getTypeName).join([", "]));
      }
      function __embind_register_class(rawType, rawPointerType, rawConstPointerType, baseClassRawType, getActualTypeSignature, getActualType, upcastSignature, upcast, downcastSignature, downcast, name, destructorSignature, rawDestructor) {
        name = readLatin1String(name);
        getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
        if (upcast) {
          upcast = embind__requireFunction(upcastSignature, upcast);
        }
        if (downcast) {
          downcast = embind__requireFunction(downcastSignature, downcast);
        }
        rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
        var legalFunctionName = makeLegalFunctionName(name);
        exposePublicSymbol(legalFunctionName, function() {
          throwUnboundTypeError("Cannot construct " + name + " due to unbound types", [baseClassRawType]);
        });
        whenDependentTypesAreResolved([rawType, rawPointerType, rawConstPointerType], baseClassRawType ? [baseClassRawType] : [], function(base) {
          base = base[0];
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
          var constructor = createNamedFunction(legalFunctionName, function() {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name);
            }
            if (void 0 === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor");
            }
            var body = registeredClass.constructor_body[arguments.length];
            if (void 0 === body) {
              throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
            }
            return body.apply(this, arguments);
          });
          var instancePrototype = Object.create(basePrototype, { constructor: { value: constructor } });
          constructor.prototype = instancePrototype;
          var registeredClass = new RegisteredClass(name, constructor, instancePrototype, rawDestructor, baseClass, getActualType, upcast, downcast);
          var referenceConverter = new RegisteredPointer(name, registeredClass, true, false, false);
          var pointerConverter = new RegisteredPointer(name + "*", registeredClass, false, false, false);
          var constPointerConverter = new RegisteredPointer(name + " const*", registeredClass, false, true, false);
          registeredPointers[rawType] = { pointerType: pointerConverter, constPointerType: constPointerConverter };
          replacePublicSymbol(legalFunctionName, constructor);
          return [referenceConverter, pointerConverter, constPointerConverter];
        });
      }
      function heap32VectorToArray(count, firstElement) {
        var array = [];
        for (var i = 0; i < count; i++) {
          array.push(HEAP32[(firstElement >> 2) + i]);
        }
        return array;
      }
      function __embind_register_class_constructor(rawClassType, argCount, rawArgTypesAddr, invokerSignature, invoker, rawConstructor) {
        assert(argCount > 0);
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        invoker = embind__requireFunction(invokerSignature, invoker);
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = "constructor " + classType.name;
          if (void 0 === classType.registeredClass.constructor_body) {
            classType.registeredClass.constructor_body = [];
          }
          if (void 0 !== classType.registeredClass.constructor_body[argCount - 1]) {
            throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount - 1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
          }
          classType.registeredClass.constructor_body[argCount - 1] = () => {
            throwUnboundTypeError("Cannot construct " + classType.name + " due to unbound types", rawArgTypes);
          };
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            argTypes.splice(1, 0, null);
            classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
            return [];
          });
          return [];
        });
      }
      function new_(constructor, argumentList) {
        if (!(constructor instanceof Function)) {
          throw new TypeError("new_ called with constructor type " + typeof constructor + " which is not a function");
        }
        var dummy = createNamedFunction(constructor.name || "unknownFunctionName", function() {
        });
        dummy.prototype = constructor.prototype;
        var obj = new dummy();
        var r = constructor.apply(obj, argumentList);
        return r instanceof Object ? r : obj;
      }
      function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc) {
        var argCount = argTypes.length;
        if (argCount < 2) {
          throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
        }
        var isClassMethodFunc = argTypes[1] !== null && classType !== null;
        var needsDestructorStack = false;
        for (var i = 1; i < argTypes.length; ++i) {
          if (argTypes[i] !== null && argTypes[i].destructorFunction === void 0) {
            needsDestructorStack = true;
            break;
          }
        }
        var returns = argTypes[0].name !== "void";
        var argsList = "";
        var argsListWired = "";
        for (var i = 0; i < argCount - 2; ++i) {
          argsList += (i !== 0 ? ", " : "") + "arg" + i;
          argsListWired += (i !== 0 ? ", " : "") + "arg" + i + "Wired";
        }
        var invokerFnBody = "return function " + makeLegalFunctionName(humanName) + "(" + argsList + ") {\nif (arguments.length !== " + (argCount - 2) + ") {\nthrowBindingError('function " + humanName + " called with ' + arguments.length + ' arguments, expected " + (argCount - 2) + " args!');\n}\n";
        if (needsDestructorStack) {
          invokerFnBody += "var destructors = [];\n";
        }
        var dtorStack = needsDestructorStack ? "destructors" : "null";
        var args1 = ["throwBindingError", "invoker", "fn", "runDestructors", "retType", "classParam"];
        var args2 = [throwBindingError, cppInvokerFunc, cppTargetFunc, runDestructors, argTypes[0], argTypes[1]];
        if (isClassMethodFunc) {
          invokerFnBody += "var thisWired = classParam.toWireType(" + dtorStack + ", this);\n";
        }
        for (var i = 0; i < argCount - 2; ++i) {
          invokerFnBody += "var arg" + i + "Wired = argType" + i + ".toWireType(" + dtorStack + ", arg" + i + "); // " + argTypes[i + 2].name + "\n";
          args1.push("argType" + i);
          args2.push(argTypes[i + 2]);
        }
        if (isClassMethodFunc) {
          argsListWired = "thisWired" + (argsListWired.length > 0 ? ", " : "") + argsListWired;
        }
        invokerFnBody += (returns ? "var rv = " : "") + "invoker(fn" + (argsListWired.length > 0 ? ", " : "") + argsListWired + ");\n";
        if (needsDestructorStack) {
          invokerFnBody += "runDestructors(destructors);\n";
        } else {
          for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; ++i) {
            var paramName = i === 1 ? "thisWired" : "arg" + (i - 2) + "Wired";
            if (argTypes[i].destructorFunction !== null) {
              invokerFnBody += paramName + "_dtor(" + paramName + "); // " + argTypes[i].name + "\n";
              args1.push(paramName + "_dtor");
              args2.push(argTypes[i].destructorFunction);
            }
          }
        }
        if (returns) {
          invokerFnBody += "var ret = retType.fromWireType(rv);\nreturn ret;\n";
        } else {
        }
        invokerFnBody += "}\n";
        args1.push(invokerFnBody);
        var invokerFunction = new_(Function, args1).apply(null, args2);
        return invokerFunction;
      }
      function __embind_register_class_function(rawClassType, methodName, argCount, rawArgTypesAddr, invokerSignature, rawInvoker, context, isPureVirtual) {
        var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
        methodName = readLatin1String(methodName);
        rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
        whenDependentTypesAreResolved([], [rawClassType], function(classType) {
          classType = classType[0];
          var humanName = classType.name + "." + methodName;
          if (methodName.startsWith("@@")) {
            methodName = Symbol[methodName.substring(2)];
          }
          if (isPureVirtual) {
            classType.registeredClass.pureVirtualFunctions.push(methodName);
          }
          function unboundTypesHandler() {
            throwUnboundTypeError("Cannot call " + humanName + " due to unbound types", rawArgTypes);
          }
          var proto = classType.registeredClass.instancePrototype;
          var method = proto[methodName];
          if (void 0 === method || void 0 === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2) {
            unboundTypesHandler.argCount = argCount - 2;
            unboundTypesHandler.className = classType.name;
            proto[methodName] = unboundTypesHandler;
          } else {
            ensureOverloadTable(proto, methodName, humanName);
            proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
          }
          whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
            var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context);
            if (void 0 === proto[methodName].overloadTable) {
              memberFunction.argCount = argCount - 2;
              proto[methodName] = memberFunction;
            } else {
              proto[methodName].overloadTable[argCount - 2] = memberFunction;
            }
            return [];
          });
          return [];
        });
      }
      var emval_free_list = [];
      var emval_handle_array = [{}, { value: void 0 }, { value: null }, { value: true }, { value: false }];
      function __emval_decref(handle) {
        if (handle > 4 && 0 === --emval_handle_array[handle].refcount) {
          emval_handle_array[handle] = void 0;
          emval_free_list.push(handle);
        }
      }
      function count_emval_handles() {
        var count = 0;
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            ++count;
          }
        }
        return count;
      }
      function get_first_emval() {
        for (var i = 5; i < emval_handle_array.length; ++i) {
          if (emval_handle_array[i] !== void 0) {
            return emval_handle_array[i];
          }
        }
        return null;
      }
      function init_emval() {
        Module2["count_emval_handles"] = count_emval_handles;
        Module2["get_first_emval"] = get_first_emval;
      }
      var Emval = { toValue: (handle) => {
        if (!handle) {
          throwBindingError("Cannot use deleted val. handle = " + handle);
        }
        return emval_handle_array[handle].value;
      }, toHandle: (value) => {
        switch (value) {
          case void 0:
            return 1;
          case null:
            return 2;
          case true:
            return 3;
          case false:
            return 4;
          default: {
            var handle = emval_free_list.length ? emval_free_list.pop() : emval_handle_array.length;
            emval_handle_array[handle] = { refcount: 1, value };
            return handle;
          }
        }
      } };
      function __embind_register_emval(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(handle) {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        }, "toWireType": function(destructors, value) {
          return Emval.toHandle(value);
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: null });
      }
      function _embind_repr(v) {
        if (v === null) {
          return "null";
        }
        var t = typeof v;
        if (t === "object" || t === "array" || t === "function") {
          return v.toString();
        } else {
          return "" + v;
        }
      }
      function floatReadValueFromPointer(name, shift) {
        switch (shift) {
          case 2:
            return function(pointer) {
              return this["fromWireType"](HEAPF32[pointer >> 2]);
            };
          case 3:
            return function(pointer) {
              return this["fromWireType"](HEAPF64[pointer >> 3]);
            };
          default:
            throw new TypeError("Unknown float type: " + name);
        }
      }
      function __embind_register_float(rawType, name, size) {
        var shift = getShiftFromSize(size);
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": function(value) {
          return value;
        }, "toWireType": function(destructors, value) {
          return value;
        }, "argPackAdvance": 8, "readValueFromPointer": floatReadValueFromPointer(name, shift), destructorFunction: null });
      }
      function integerReadValueFromPointer(name, shift, signed) {
        switch (shift) {
          case 0:
            return signed ? function readS8FromPointer(pointer) {
              return HEAP8[pointer];
            } : function readU8FromPointer(pointer) {
              return HEAPU8[pointer];
            };
          case 1:
            return signed ? function readS16FromPointer(pointer) {
              return HEAP16[pointer >> 1];
            } : function readU16FromPointer(pointer) {
              return HEAPU16[pointer >> 1];
            };
          case 2:
            return signed ? function readS32FromPointer(pointer) {
              return HEAP32[pointer >> 2];
            } : function readU32FromPointer(pointer) {
              return HEAPU32[pointer >> 2];
            };
          default:
            throw new TypeError("Unknown integer type: " + name);
        }
      }
      function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
        name = readLatin1String(name);
        if (maxRange === -1) {
          maxRange = 4294967295;
        }
        var shift = getShiftFromSize(size);
        var fromWireType = (value) => value;
        if (minRange === 0) {
          var bitshift = 32 - 8 * size;
          fromWireType = (value) => value << bitshift >>> bitshift;
        }
        var isUnsignedType = name.includes("unsigned");
        var checkAssertions = (value, toTypeName) => {
        };
        var toWireType;
        if (isUnsignedType) {
          toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value >>> 0;
          };
        } else {
          toWireType = function(destructors, value) {
            checkAssertions(value, this.name);
            return value;
          };
        }
        registerType(primitiveType, { name, "fromWireType": fromWireType, "toWireType": toWireType, "argPackAdvance": 8, "readValueFromPointer": integerReadValueFromPointer(name, shift, minRange !== 0), destructorFunction: null });
      }
      function __embind_register_memory_view(rawType, dataTypeIndex, name) {
        var typeMapping = [Int8Array, Uint8Array, Int16Array, Uint16Array, Int32Array, Uint32Array, Float32Array, Float64Array];
        var TA = typeMapping[dataTypeIndex];
        function decodeMemoryView(handle) {
          handle = handle >> 2;
          var heap = HEAPU32;
          var size = heap[handle];
          var data = heap[handle + 1];
          return new TA(buffer, data, size);
        }
        name = readLatin1String(name);
        registerType(rawType, { name, "fromWireType": decodeMemoryView, "argPackAdvance": 8, "readValueFromPointer": decodeMemoryView }, { ignoreDuplicateRegistrations: true });
      }
      function __embind_register_std_string(rawType, name) {
        name = readLatin1String(name);
        var stdStringIsUTF8 = name === "std::string";
        registerType(rawType, { name, "fromWireType": function(value) {
          var length = HEAPU32[value >> 2];
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = value + 4;
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = value + 4 + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === void 0) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[value + 4 + i]);
            }
            str = a.join("");
          }
          _free(value);
          return str;
        }, "toWireType": function(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
          var getLength;
          var valueIsOfTypeString = typeof value == "string";
          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError("Cannot pass non-string to std::string");
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            getLength = () => lengthBytesUTF8(value);
          } else {
            getLength = () => value.length;
          }
          var length = getLength();
          var ptr = _malloc(4 + length + 1);
          HEAPU32[ptr >> 2] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr + 4, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError("String has UTF-16 code units that do not fit in 8 bits");
                }
                HEAPU8[ptr + 4 + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + 4 + i] = value[i];
              }
            }
          }
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
          _free(ptr);
        } });
      }
      function __embind_register_std_wstring(rawType, charSize, name) {
        name = readLatin1String(name);
        var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
        if (charSize === 2) {
          decodeString = UTF16ToString;
          encodeString = stringToUTF16;
          lengthBytesUTF = lengthBytesUTF16;
          getHeap = () => HEAPU16;
          shift = 1;
        } else if (charSize === 4) {
          decodeString = UTF32ToString;
          encodeString = stringToUTF32;
          lengthBytesUTF = lengthBytesUTF32;
          getHeap = () => HEAPU32;
          shift = 2;
        }
        registerType(rawType, { name, "fromWireType": function(value) {
          var length = HEAPU32[value >> 2];
          var HEAP = getHeap();
          var str;
          var decodeStartPtr = value + 4;
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === void 0) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
          _free(value);
          return str;
        }, "toWireType": function(destructors, value) {
          if (!(typeof value == "string")) {
            throwBindingError("Cannot pass non-string to C++ string type " + name);
          }
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length >> shift;
          encodeString(value, ptr + 4, length + charSize);
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        }, "argPackAdvance": 8, "readValueFromPointer": simpleReadValueFromPointer, destructorFunction: function(ptr) {
          _free(ptr);
        } });
      }
      function __embind_register_value_object(rawType, name, constructorSignature, rawConstructor, destructorSignature, rawDestructor) {
        structRegistrations[rawType] = { name: readLatin1String(name), rawConstructor: embind__requireFunction(constructorSignature, rawConstructor), rawDestructor: embind__requireFunction(destructorSignature, rawDestructor), fields: [] };
      }
      function __embind_register_value_object_field(structType, fieldName, getterReturnType, getterSignature, getter, getterContext, setterArgumentType, setterSignature, setter, setterContext) {
        structRegistrations[structType].fields.push({ fieldName: readLatin1String(fieldName), getterReturnType, getter: embind__requireFunction(getterSignature, getter), getterContext, setterArgumentType, setter: embind__requireFunction(setterSignature, setter), setterContext });
      }
      function __embind_register_void(rawType, name) {
        name = readLatin1String(name);
        registerType(rawType, { isVoid: true, name, "argPackAdvance": 0, "fromWireType": function() {
          return void 0;
        }, "toWireType": function(destructors, o) {
          return void 0;
        } });
      }
      function __emscripten_date_now() {
        return Date.now();
      }
      function __localtime_js(time, tmPtr) {
        var date = new Date(HEAP32[time >> 2] * 1e3);
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        HEAP32[tmPtr + 20 >> 2] = date.getFullYear() - 1900;
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var start = new Date(date.getFullYear(), 0, 1);
        var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr + 36 >> 2] = -(date.getTimezoneOffset() * 60);
        var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset)) | 0;
        HEAP32[tmPtr + 32 >> 2] = dst;
      }
      function __mktime_js(tmPtr) {
        var date = new Date(HEAP32[tmPtr + 20 >> 2] + 1900, HEAP32[tmPtr + 16 >> 2], HEAP32[tmPtr + 12 >> 2], HEAP32[tmPtr + 8 >> 2], HEAP32[tmPtr + 4 >> 2], HEAP32[tmPtr >> 2], 0);
        var dst = HEAP32[tmPtr + 32 >> 2];
        var guessedOffset = date.getTimezoneOffset();
        var start = new Date(date.getFullYear(), 0, 1);
        var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
        var winterOffset = start.getTimezoneOffset();
        var dstOffset = Math.min(winterOffset, summerOffset);
        if (dst < 0) {
          HEAP32[tmPtr + 32 >> 2] = Number(summerOffset != winterOffset && dstOffset == guessedOffset);
        } else if (dst > 0 != (dstOffset == guessedOffset)) {
          var nonDstOffset = Math.max(winterOffset, summerOffset);
          var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
          date.setTime(date.getTime() + (trueOffset - guessedOffset) * 6e4);
        }
        HEAP32[tmPtr + 24 >> 2] = date.getDay();
        var yday = (date.getTime() - start.getTime()) / (1e3 * 60 * 60 * 24) | 0;
        HEAP32[tmPtr + 28 >> 2] = yday;
        HEAP32[tmPtr >> 2] = date.getSeconds();
        HEAP32[tmPtr + 4 >> 2] = date.getMinutes();
        HEAP32[tmPtr + 8 >> 2] = date.getHours();
        HEAP32[tmPtr + 12 >> 2] = date.getDate();
        HEAP32[tmPtr + 16 >> 2] = date.getMonth();
        return date.getTime() / 1e3 | 0;
      }
      function _tzset_impl(timezone, daylight, tzname) {
        var currentYear = (/* @__PURE__ */ new Date()).getFullYear();
        var winter = new Date(currentYear, 0, 1);
        var summer = new Date(currentYear, 6, 1);
        var winterOffset = winter.getTimezoneOffset();
        var summerOffset = summer.getTimezoneOffset();
        var stdTimezoneOffset = Math.max(winterOffset, summerOffset);
        HEAP32[timezone >> 2] = stdTimezoneOffset * 60;
        HEAP32[daylight >> 2] = Number(winterOffset != summerOffset);
        function extractZone(date) {
          var match = date.toTimeString().match(/\(([A-Za-z ]+)\)$/);
          return match ? match[1] : "GMT";
        }
        var winterName = extractZone(winter);
        var summerName = extractZone(summer);
        var winterNamePtr = allocateUTF8(winterName);
        var summerNamePtr = allocateUTF8(summerName);
        if (summerOffset < winterOffset) {
          HEAPU32[tzname >> 2] = winterNamePtr;
          HEAPU32[tzname + 4 >> 2] = summerNamePtr;
        } else {
          HEAPU32[tzname >> 2] = summerNamePtr;
          HEAPU32[tzname + 4 >> 2] = winterNamePtr;
        }
      }
      function __tzset_js(timezone, daylight, tzname) {
        if (__tzset_js.called)
          return;
        __tzset_js.called = true;
        _tzset_impl(timezone, daylight, tzname);
      }
      function _abort() {
        abort("");
      }
      function _emscripten_memcpy_big(dest, src, num) {
        HEAPU8.copyWithin(dest, src, src + num);
      }
      function getHeapMax() {
        return 2147483648;
      }
      function emscripten_realloc_buffer(size) {
        try {
          wasmMemory.grow(size - buffer.byteLength + 65535 >>> 16);
          updateGlobalBufferAndViews(wasmMemory.buffer);
          return 1;
        } catch (e) {
        }
      }
      function _emscripten_resize_heap(requestedSize) {
        var oldSize = HEAPU8.length;
        requestedSize = requestedSize >>> 0;
        var maxHeapSize = getHeapMax();
        if (requestedSize > maxHeapSize) {
          return false;
        }
        let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
        for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
          var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown);
          overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296);
          var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
          var replacement = emscripten_realloc_buffer(newSize);
          if (replacement) {
            return true;
          }
        }
        return false;
      }
      var ENV = {};
      function getExecutableName() {
        return thisProgram || "./this.program";
      }
      function getEnvStrings() {
        if (!getEnvStrings.strings) {
          var lang = (typeof navigator == "object" && navigator.languages && navigator.languages[0] || "C").replace("-", "_") + ".UTF-8";
          var env = { "USER": "web_user", "LOGNAME": "web_user", "PATH": "/", "PWD": "/", "HOME": "/home/web_user", "LANG": lang, "_": getExecutableName() };
          for (var x in ENV) {
            if (ENV[x] === void 0)
              delete env[x];
            else
              env[x] = ENV[x];
          }
          var strings = [];
          for (var x in env) {
            strings.push(x + "=" + env[x]);
          }
          getEnvStrings.strings = strings;
        }
        return getEnvStrings.strings;
      }
      function _environ_get(__environ, environ_buf) {
        var bufSize = 0;
        getEnvStrings().forEach(function(string, i) {
          var ptr = environ_buf + bufSize;
          HEAPU32[__environ + i * 4 >> 2] = ptr;
          writeAsciiToMemory(string, ptr);
          bufSize += string.length + 1;
        });
        return 0;
      }
      function _environ_sizes_get(penviron_count, penviron_buf_size) {
        var strings = getEnvStrings();
        HEAPU32[penviron_count >> 2] = strings.length;
        var bufSize = 0;
        strings.forEach(function(string) {
          bufSize += string.length + 1;
        });
        HEAPU32[penviron_buf_size >> 2] = bufSize;
        return 0;
      }
      function _getTempRet0() {
        return getTempRet0();
      }
      function _jsClose(handleLo, handleHi) {
        return Module2.extractor.close((handleLo >>> 0) + handleHi * 4294967296);
      }
      function _jsCreate(filename) {
        const handle = Module2.extractor.create(UTF32ToString(filename));
        Module2.setTempRet0(handle / 4294967296 | 0);
        return handle % 4294967296;
      }
      function _jsOpen(filename) {
        const handle = Module2.extractor.open(UTF32ToString(filename));
        Module2.setTempRet0(handle / 4294967296 | 0);
        return handle % 4294967296;
      }
      function _jsRead(handleLo, handleHi, buf, size) {
        return Module2.extractor.read((handleLo >>> 0) + handleHi * 4294967296, buf, size);
      }
      function _jsSeek(handleLo, handleHi, offsetLo, offsetHi, method) {
        return Module2.extractor.seek((handleLo >>> 0) + handleHi * 4294967296, (offsetLo >>> 0) + offsetHi * 4294967296, UTF8ToString(method));
      }
      function _jsTell(handleLo, handleHi) {
        const pos = Module2.extractor.tell((handleLo >>> 0) + handleHi * 4294967296);
        Module2.setTempRet0(pos / 4294967296 | 0);
        return pos % 4294967296;
      }
      function _jsWrite(handleLo, handleHi, buf, size) {
        return Module2.extractor.write((handleLo >>> 0) + handleHi * 4294967296, buf, size);
      }
      function _llvm_eh_typeid_for(type) {
        return type;
      }
      function _setTempRet0(val) {
        setTempRet0(val);
      }
      InternalError = Module2["InternalError"] = extendError(Error, "InternalError");
      embind_init_charCodes();
      BindingError = Module2["BindingError"] = extendError(Error, "BindingError");
      init_ClassHandle();
      init_embind();
      init_RegisteredPointer();
      UnboundTypeError = Module2["UnboundTypeError"] = extendError(Error, "UnboundTypeError");
      init_emval();
      var asmLibraryArg = { "p": ___cxa_allocate_exception, "r": ___cxa_begin_catch, "t": ___cxa_end_catch, "c": ___cxa_find_matching_catch_2, "d": ___cxa_find_matching_catch_3, "l": ___cxa_find_matching_catch_4, "ea": ___cxa_free_exception, "o": ___cxa_throw, "e": ___resumeException, "V": ___syscall_fchownat, "U": ___syscall_symlink, "fa": __embind_finalize_value_object, "F": __embind_register_bigint, "ca": __embind_register_bool, "ia": __embind_register_class, "ha": __embind_register_class_constructor, "w": __embind_register_class_function, "ba": __embind_register_emval, "z": __embind_register_float, "q": __embind_register_integer, "j": __embind_register_memory_view, "y": __embind_register_std_string, "u": __embind_register_std_wstring, "v": __embind_register_value_object, "ga": __embind_register_value_object_field, "da": __embind_register_void, "Y": __emscripten_date_now, "Z": __localtime_js, "_": __mktime_js, "$": __tzset_js, "x": _abort, "aa": _emscripten_memcpy_big, "T": _emscripten_resize_heap, "W": _environ_get, "X": _environ_sizes_get, "a": _getTempRet0, "b": invoke_ii, "h": invoke_iii, "g": invoke_iiii, "n": invoke_iiiii, "E": invoke_iiiiiii, "D": invoke_iiiiiiiiii, "O": invoke_iiiiiijii, "Q": invoke_ji, "A": invoke_v, "m": invoke_vi, "f": invoke_vii, "i": invoke_viii, "C": invoke_viiii, "ja": invoke_viiiii, "B": invoke_viiiiiiiii, "k": invoke_viiiiiiiiii, "P": invoke_vij, "R": invoke_viji, "M": invoke_vj, "N": _jsClose, "K": _jsCreate, "L": _jsOpen, "I": _jsRead, "H": _jsSeek, "G": _jsTell, "J": _jsWrite, "s": _llvm_eh_typeid_for, "S": _setTempRet0 };
      var asm = createWasm();
      var ___wasm_call_ctors = Module2["___wasm_call_ctors"] = function() {
        return (___wasm_call_ctors = Module2["___wasm_call_ctors"] = Module2["asm"]["la"]).apply(null, arguments);
      };
      var _free = Module2["_free"] = function() {
        return (_free = Module2["_free"] = Module2["asm"]["ma"]).apply(null, arguments);
      };
      var _malloc = Module2["_malloc"] = function() {
        return (_malloc = Module2["_malloc"] = Module2["asm"]["na"]).apply(null, arguments);
      };
      var ___getTypeName = Module2["___getTypeName"] = function() {
        return (___getTypeName = Module2["___getTypeName"] = Module2["asm"]["pa"]).apply(null, arguments);
      };
      var ___embind_register_native_and_builtin_types = Module2["___embind_register_native_and_builtin_types"] = function() {
        return (___embind_register_native_and_builtin_types = Module2["___embind_register_native_and_builtin_types"] = Module2["asm"]["qa"]).apply(null, arguments);
      };
      var _setThrew = Module2["_setThrew"] = function() {
        return (_setThrew = Module2["_setThrew"] = Module2["asm"]["ra"]).apply(null, arguments);
      };
      var stackSave = Module2["stackSave"] = function() {
        return (stackSave = Module2["stackSave"] = Module2["asm"]["sa"]).apply(null, arguments);
      };
      var stackRestore = Module2["stackRestore"] = function() {
        return (stackRestore = Module2["stackRestore"] = Module2["asm"]["ta"]).apply(null, arguments);
      };
      var ___cxa_can_catch = Module2["___cxa_can_catch"] = function() {
        return (___cxa_can_catch = Module2["___cxa_can_catch"] = Module2["asm"]["ua"]).apply(null, arguments);
      };
      var ___cxa_is_pointer_type = Module2["___cxa_is_pointer_type"] = function() {
        return (___cxa_is_pointer_type = Module2["___cxa_is_pointer_type"] = Module2["asm"]["va"]).apply(null, arguments);
      };
      var dynCall_viji = Module2["dynCall_viji"] = function() {
        return (dynCall_viji = Module2["dynCall_viji"] = Module2["asm"]["wa"]).apply(null, arguments);
      };
      var dynCall_ji = Module2["dynCall_ji"] = function() {
        return (dynCall_ji = Module2["dynCall_ji"] = Module2["asm"]["xa"]).apply(null, arguments);
      };
      var dynCall_vij = Module2["dynCall_vij"] = function() {
        return (dynCall_vij = Module2["dynCall_vij"] = Module2["asm"]["ya"]).apply(null, arguments);
      };
      var dynCall_iiiiiijii = Module2["dynCall_iiiiiijii"] = function() {
        return (dynCall_iiiiiijii = Module2["dynCall_iiiiiijii"] = Module2["asm"]["za"]).apply(null, arguments);
      };
      var dynCall_vj = Module2["dynCall_vj"] = function() {
        return (dynCall_vj = Module2["dynCall_vj"] = Module2["asm"]["Aa"]).apply(null, arguments);
      };
      function invoke_vi(index, a1) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_ii(index, a1) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iii(index, a1, a2) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vii(index, a1, a2) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiii(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiii(index, a1, a2, a3, a4, a5, a6) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          return getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiii(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_v(index) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)();
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiii(index, a1, a2, a3, a4, a5) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viiiiiiiiii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
        var sp = stackSave();
        try {
          getWasmTableEntry(index)(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_viji(index, a1, a2, a3, a4) {
        var sp = stackSave();
        try {
          dynCall_viji(index, a1, a2, a3, a4);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_ji(index, a1) {
        var sp = stackSave();
        try {
          return dynCall_ji(index, a1);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vij(index, a1, a2, a3) {
        var sp = stackSave();
        try {
          dynCall_vij(index, a1, a2, a3);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_iiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
        var sp = stackSave();
        try {
          return dynCall_iiiiiijii(index, a1, a2, a3, a4, a5, a6, a7, a8, a9);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      function invoke_vj(index, a1, a2) {
        var sp = stackSave();
        try {
          dynCall_vj(index, a1, a2);
        } catch (e) {
          stackRestore(sp);
          if (e !== e + 0)
            throw e;
          _setThrew(1, 0);
        }
      }
      Module2["setTempRet0"] = setTempRet0;
      var calledRun;
      dependenciesFulfilled = function runCaller() {
        if (!calledRun)
          run();
        if (!calledRun)
          dependenciesFulfilled = runCaller;
      };
      function run(args) {
        args = args || arguments_;
        if (runDependencies > 0) {
          return;
        }
        preRun();
        if (runDependencies > 0) {
          return;
        }
        function doRun() {
          if (calledRun)
            return;
          calledRun = true;
          Module2["calledRun"] = true;
          if (ABORT)
            return;
          initRuntime();
          readyPromiseResolve(Module2);
          if (Module2["onRuntimeInitialized"])
            Module2["onRuntimeInitialized"]();
          postRun();
        }
        if (Module2["setStatus"]) {
          Module2["setStatus"]("Running...");
          setTimeout(function() {
            setTimeout(function() {
              Module2["setStatus"]("");
            }, 1);
            doRun();
          }, 1);
        } else {
          doRun();
        }
      }
      Module2["run"] = run;
      if (Module2["preInit"]) {
        if (typeof Module2["preInit"] == "function")
          Module2["preInit"] = [Module2["preInit"]];
        while (Module2["preInit"].length > 0) {
          Module2["preInit"].pop()();
        }
      }
      run();
      return Module2.ready;
    };
  })();
  var unrar_default = Module;

  // ../node_modules/node-unrar-js/esm/js/unrar.singleton.js
  var unrar;
  async function getUnrar(options) {
    if (!unrar) {
      unrar = await unrar_default(options);
    }
    return unrar;
  }

  // ../node_modules/node-unrar-js/esm/index.esm.js
  async function createExtractorFromData({ wasmBinary, data, password = "" }) {
    const unrar2 = await getUnrar(wasmBinary && { wasmBinary });
    const extractor = new ExtractorData(unrar2, data, password);
    unrar2.extractor = extractor;
    return extractor;
  }

  // src/unrar-worker.src.mjs
  self.onmessage = async (event) => {
    const data = event.data || {};
    if (data.type !== "extract")
      return;
    const { buffer, password, wasmUrl } = data;
    try {
      const wasmResp = await fetch(wasmUrl);
      if (!wasmResp.ok)
        throw new Error("wasm HTTP " + wasmResp.status);
      const wasmBinary = await wasmResp.arrayBuffer();
      const extractor = await createExtractorFromData({
        wasmBinary,
        data: buffer,
        password: password || void 0
      });
      let fileList;
      try {
        fileList = [...extractor.getFileList().fileHeaders];
      } catch (listErr) {
        const msg = String(listErr && listErr.message || listErr);
        if (/password|ERAR_MISSING_PASSWORD|BAD_DATA/i.test(msg)) {
          self.postMessage({ type: "needs_password" });
          return;
        }
        throw listErr;
      }
      const entries = fileList.filter((h) => !h.name.endsWith("/") && !h.name.endsWith("\\")).map((h) => ({ name: h.name, size: h.unpSize }));
      self.postMessage({ type: "filelist", entries });
      const total = entries.length || 1;
      let done = 0;
      try {
        const extracted = extractor.extract({ password: password || void 0 });
        const list = [...extracted.files];
        for (const entry of list) {
          const { fileHeader, extraction } = entry;
          if (fileHeader.name.endsWith("/") || fileHeader.name.endsWith("\\"))
            continue;
          const bytes = extraction || new Uint8Array(0);
          const transferable = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
          done++;
          self.postMessage(
            { type: "file", name: fileHeader.name, size: fileHeader.unpSize, buffer: transferable, progress: Math.round(done / total * 100) },
            [transferable]
          );
        }
      } catch (extractErr) {
        const msg = String(extractErr && extractErr.message || extractErr);
        if (/password|ERAR_MISSING_PASSWORD|BAD_DATA/i.test(msg)) {
          self.postMessage({ type: "needs_password" });
          return;
        }
        throw extractErr;
      }
      self.postMessage({ type: "done" });
    } catch (err) {
      self.postMessage({ type: "error", message: String(err && err.message || "Extraction failed") });
    }
  };
})();

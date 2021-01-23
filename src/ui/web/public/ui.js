

// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof Module !== 'undefined' ? Module : {};



// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)
// {{PRE_JSES}}

// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = {};
var key;
for (key in Module) {
  if (Module.hasOwnProperty(key)) {
    moduleOverrides[key] = Module[key];
  }
}

var arguments_ = [];
var thisProgram = './this.program';
var quit_ = function(status, toThrow) {
  throw toThrow;
};

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = false;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;
ENVIRONMENT_IS_WEB = typeof window === 'object';
ENVIRONMENT_IS_WORKER = typeof importScripts === 'function';
// N.b. Electron.js environment is simultaneously a NODE-environment, but
// also a web environment.
ENVIRONMENT_IS_NODE = typeof process === 'object' && typeof process.versions === 'object' && typeof process.versions.node === 'string';
ENVIRONMENT_IS_SHELL = !ENVIRONMENT_IS_WEB && !ENVIRONMENT_IS_NODE && !ENVIRONMENT_IS_WORKER;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -s ENVIRONMENT=web or -s ENVIRONMENT=node)');
}



// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary,
    setWindowTitle;

var nodeFS;
var nodePath;

if (ENVIRONMENT_IS_NODE) {
  if (ENVIRONMENT_IS_WORKER) {
    scriptDirectory = require('path').dirname(scriptDirectory) + '/';
  } else {
    scriptDirectory = __dirname + '/';
  }




  read_ = function shell_read(filename, binary) {
    if (!nodeFS) nodeFS = require('fs');
    if (!nodePath) nodePath = require('path');
    filename = nodePath['normalize'](filename);
    return nodeFS['readFileSync'](filename, binary ? null : 'utf8');
  };

  readBinary = function readBinary(filename) {
    var ret = read_(filename, true);
    if (!ret.buffer) {
      ret = new Uint8Array(ret);
    }
    assert(ret.buffer);
    return ret;
  };




  if (process['argv'].length > 1) {
    thisProgram = process['argv'][1].replace(/\\/g, '/');
  }

  arguments_ = process['argv'].slice(2);

  if (typeof module !== 'undefined') {
    module['exports'] = Module;
  }

  process['on']('uncaughtException', function(ex) {
    // suppress ExitStatus exceptions from showing an error
    if (!(ex instanceof ExitStatus)) {
      throw ex;
    }
  });

  process['on']('unhandledRejection', abort);

  quit_ = function(status) {
    process['exit'](status);
  };

  Module['inspect'] = function () { return '[Emscripten Module object]'; };



} else
if (ENVIRONMENT_IS_SHELL) {


  if (typeof read != 'undefined') {
    read_ = function shell_read(f) {
      return read(f);
    };
  }

  readBinary = function readBinary(f) {
    var data;
    if (typeof readbuffer === 'function') {
      return new Uint8Array(readbuffer(f));
    }
    data = read(f, 'binary');
    assert(typeof data === 'object');
    return data;
  };

  if (typeof scriptArgs != 'undefined') {
    arguments_ = scriptArgs;
  } else if (typeof arguments != 'undefined') {
    arguments_ = arguments;
  }

  if (typeof quit === 'function') {
    quit_ = function(status) {
      quit(status);
    };
  }

  if (typeof print !== 'undefined') {
    // Prefer to use print/printErr where they exist, as they usually work better.
    if (typeof console === 'undefined') console = /** @type{!Console} */({});
    console.log = /** @type{!function(this:Console, ...*): undefined} */ (print);
    console.warn = console.error = /** @type{!function(this:Console, ...*): undefined} */ (typeof printErr !== 'undefined' ? printErr : print);
  }


} else

// Note that this includes Node.js workers when relevant (pthreads is enabled).
// Node.js workers are detected as a combination of ENVIRONMENT_IS_WORKER and
// ENVIRONMENT_IS_NODE.
if (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) {
  if (ENVIRONMENT_IS_WORKER) { // Check worker, not web, since window could be polyfilled
    scriptDirectory = self.location.href;
  } else if (document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }


  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {




  read_ = function shell_read(url) {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
  };

  if (ENVIRONMENT_IS_WORKER) {
    readBinary = function readBinary(url) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', url, false);
        xhr.responseType = 'arraybuffer';
        xhr.send(null);
        return new Uint8Array(/** @type{!ArrayBuffer} */(xhr.response));
    };
  }

  readAsync = function readAsync(url, onload, onerror) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = function xhr_onload() {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };




  }

  setWindowTitle = function(title) { document.title = title };
} else
{
  throw new Error('environment detection error');
}


// Set up the out() and err() hooks, which are how we can print to stdout or
// stderr, respectively.
var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
for (key in moduleOverrides) {
  if (moduleOverrides.hasOwnProperty(key)) {
    Module[key] = moduleOverrides[key];
  }
}
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.
if (Module['arguments']) arguments_ = Module['arguments'];if (!Object.getOwnPropertyDescriptor(Module, 'arguments')) Object.defineProperty(Module, 'arguments', { configurable: true, get: function() { abort('Module.arguments has been replaced with plain arguments_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (Module['thisProgram']) thisProgram = Module['thisProgram'];if (!Object.getOwnPropertyDescriptor(Module, 'thisProgram')) Object.defineProperty(Module, 'thisProgram', { configurable: true, get: function() { abort('Module.thisProgram has been replaced with plain thisProgram (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (Module['quit']) quit_ = Module['quit'];if (!Object.getOwnPropertyDescriptor(Module, 'quit')) Object.defineProperty(Module, 'quit', { configurable: true, get: function() { abort('Module.quit has been replaced with plain quit_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] === 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] === 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] === 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] === 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] === 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] === 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] === 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] === 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] === 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
if (!Object.getOwnPropertyDescriptor(Module, 'read')) Object.defineProperty(Module, 'read', { configurable: true, get: function() { abort('Module.read has been replaced with plain read_ (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readAsync')) Object.defineProperty(Module, 'readAsync', { configurable: true, get: function() { abort('Module.readAsync has been replaced with plain readAsync (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'readBinary')) Object.defineProperty(Module, 'readBinary', { configurable: true, get: function() { abort('Module.readBinary has been replaced with plain readBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
if (!Object.getOwnPropertyDescriptor(Module, 'setWindowTitle')) Object.defineProperty(Module, 'setWindowTitle', { configurable: true, get: function() { abort('Module.setWindowTitle has been replaced with plain setWindowTitle (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
var IDBFS = 'IDBFS is no longer included by default; build with -lidbfs.js';
var PROXYFS = 'PROXYFS is no longer included by default; build with -lproxyfs.js';
var WORKERFS = 'WORKERFS is no longer included by default; build with -lworkerfs.js';
var NODEFS = 'NODEFS is no longer included by default; build with -lnodefs.js';






// {{PREAMBLE_ADDITIONS}}

var STACK_ALIGN = 16;

function dynamicAlloc(size) {
  assert(DYNAMICTOP_PTR);
  var ret = HEAP32[DYNAMICTOP_PTR>>2];
  var end = (ret + size + 15) & -16;
  assert(end <= HEAP8.length, 'failure to dynamicAlloc - memory growth etc. is not supported there, call malloc/sbrk directly');
  HEAP32[DYNAMICTOP_PTR>>2] = end;
  return ret;
}

function alignMemory(size, factor) {
  if (!factor) factor = STACK_ALIGN; // stack alignment (16-byte) by default
  return Math.ceil(size / factor) * factor;
}

function getNativeTypeSize(type) {
  switch (type) {
    case 'i1': case 'i8': return 1;
    case 'i16': return 2;
    case 'i32': return 4;
    case 'i64': return 8;
    case 'float': return 4;
    case 'double': return 8;
    default: {
      if (type[type.length-1] === '*') {
        return 4; // A pointer
      } else if (type[0] === 'i') {
        var bits = Number(type.substr(1));
        assert(bits % 8 === 0, 'getNativeTypeSize invalid bits ' + bits + ', type ' + type);
        return bits / 8;
      } else {
        return 0;
      }
    }
  }
}

function warnOnce(text) {
  if (!warnOnce.shown) warnOnce.shown = {};
  if (!warnOnce.shown[text]) {
    warnOnce.shown[text] = 1;
    err(text);
  }
}

// dynamic linker/loader (a-la ld.so on ELF systems)
var LDSO = {
  // next free handle to use for a loaded dso.
  // (handle=0 is avoided as it means "error" in dlopen)
  nextHandle: 1,

  loadedLibs: {         // handle -> dso [refcount, name, module, global]
    // program itself
    // XXX uglifyjs fails on "[-1]: {"
    '-1': {
      refcount: Infinity,   // = nodelete
      name:     '__self__',
      module:   Module,
      global:   true
    }
  },

  loadedLibNames: {     // name   -> handle
    // program itself
    '__self__': -1
  },
}

// fetchBinary fetches binaray data @ url. (async)
function fetchBinary(url) {
  return fetch(url, { credentials: 'same-origin' }).then(function(response) {
    if (!response['ok']) {
      throw "failed to load binary file at '" + url + "'";
    }
    return response['arrayBuffer']();
  }).then(function(buffer) {
    return new Uint8Array(buffer);
  });
}

function asmjsMangle(x) {
  var unmangledSymbols = ['setTempRet0','getTempRet0','stackAlloc','stackSave','stackRestore','__growWasmMemory','__heap_base','__data_end'];
  return x.indexOf('dynCall_') == 0 || unmangledSymbols.indexOf(x) != -1 ? x : '_' + x;
}

// loadDynamicLibrary loads dynamic library @ lib URL / path and returns handle for loaded DSO.
//
// Several flags affect the loading:
//
// - if flags.global=true, symbols from the loaded library are merged into global
//   process namespace. Flags.global is thus similar to RTLD_GLOBAL in ELF.
//
// - if flags.nodelete=true, the library will be never unloaded. Flags.nodelete
//   is thus similar to RTLD_NODELETE in ELF.
//
// - if flags.loadAsync=true, the loading is performed asynchronously and
//   loadDynamicLibrary returns corresponding promise.
//
// - if flags.fs is provided, it is used as FS-like interface to load library data.
//   By default, when flags.fs=undefined, native loading capabilities of the
//   environment are used.
//
// If a library was already loaded, it is not loaded a second time. However
// flags.global and flags.nodelete are handled every time a load request is made.
// Once a library becomes "global" or "nodelete", it cannot be removed or unloaded.
function loadDynamicLibrary(lib, flags) {
  // when loadDynamicLibrary did not have flags, libraries were loaded globally & permanently
  flags = flags || {global: true, nodelete: true}

  var handle = LDSO.loadedLibNames[lib];
  var dso;
  if (handle) {
    // the library is being loaded or has been loaded already.
    //
    // however it could be previously loaded only locally and if we get
    // load request with global=true we have to make it globally visible now.
    dso = LDSO.loadedLibs[handle];
    if (flags.global && !dso.global) {
      dso.global = true;
      if (dso.module !== 'loading') {
        // ^^^ if module is 'loading' - symbols merging will be eventually done by the loader.
        mergeLibSymbols(dso.module)
      }
    }
    // same for "nodelete"
    if (flags.nodelete && dso.refcount !== Infinity) {
      dso.refcount = Infinity;
    }
    dso.refcount++
    return flags.loadAsync ? Promise.resolve(handle) : handle;
  }

  // allocate new DSO & handle
  handle = LDSO.nextHandle++;
  dso = {
    refcount: flags.nodelete ? Infinity : 1,
    name:     lib,
    module:   'loading',
    global:   flags.global,
  };
  LDSO.loadedLibNames[lib] = handle;
  LDSO.loadedLibs[handle] = dso;

  // libData <- libFile
  function loadLibData(libFile) {
    // for wasm, we can use fetch for async, but for fs mode we can only imitate it
    if (flags.fs) {
      var libData = flags.fs.readFile(libFile, {encoding: 'binary'});
      if (!(libData instanceof Uint8Array)) {
        libData = new Uint8Array(lib_data);
      }
      return flags.loadAsync ? Promise.resolve(libData) : libData;
    }

    if (flags.loadAsync) {
      return fetchBinary(libFile);
    }
    // load the binary synchronously
    return readBinary(libFile);
  }

  // libModule <- libData
  function createLibModule(libData) {
    return loadWebAssemblyModule(libData, flags)
  }

  // libModule <- lib
  function getLibModule() {
    // lookup preloaded cache first
    if (Module['preloadedWasm'] !== undefined &&
        Module['preloadedWasm'][lib] !== undefined) {
      var libModule = Module['preloadedWasm'][lib];
      return flags.loadAsync ? Promise.resolve(libModule) : libModule;
    }

    // module not preloaded - load lib data and create new module from it
    if (flags.loadAsync) {
      return loadLibData(lib).then(function(libData) {
        return createLibModule(libData);
      });
    }

    return createLibModule(loadLibData(lib));
  }

  // Module.symbols <- libModule.symbols (flags.global handler)
  function mergeLibSymbols(libModule) {
    // add symbols into global namespace TODO: weak linking etc.
    for (var sym in libModule) {
      if (!libModule.hasOwnProperty(sym)) {
        continue;
      }

      // When RTLD_GLOBAL is enable, the symbols defined by this shared object will be made
      // available for symbol resolution of subsequently loaded shared objects.
      //
      // We should copy the symbols (which include methods and variables) from SIDE_MODULE to MAIN_MODULE.

      var module_sym = asmjsMangle(sym);

      if (!Module.hasOwnProperty(module_sym)) {
        Module[module_sym] = libModule[sym];
      }
    }
  }

  // module for lib is loaded - update the dso & global namespace
  function moduleLoaded(libModule) {
    if (dso.global) {
      mergeLibSymbols(libModule);
    }
    dso.module = libModule;
  }

  if (flags.loadAsync) {
    return getLibModule().then(function(libModule) {
      moduleLoaded(libModule);
      return handle;
    })
  }

  moduleLoaded(getLibModule());
  return handle;
}

// Applies relocations to exported things.
function relocateExports(exports, memoryBase, tableBase, moduleLocal) {
  var relocated = {};

  for (var e in exports) {
    var value = exports[e];
    if (typeof value === 'object') {
      // a breaking change in the wasm spec, globals are now objects
      // https://github.com/WebAssembly/mutable-global/issues/1
      value = value.value;
    }
    if (typeof value === 'number') {
      // relocate it - modules export the absolute value, they can't relocate before they export
        value += memoryBase;
    }
    relocated[e] = value;
    if (moduleLocal) {
      moduleLocal['_' + e] = value;
    }
  }
  return relocated;
}

// Dynmamic version of shared.py:make_invoke.  This is needed for invokes
// that originate from side modules since these are not known at JS
// generation time.
function createInvokeFunction(sig) {
  return function() {
    var sp = stackSave();
    try {
      return dynCall(sig, arguments[0], Array.prototype.slice.call(arguments, 1));
    } catch(e) {
      stackRestore(sp);
      if (e !== e+0 && e !== 'longjmp') throw e;
      _setThrew(1, 0);
    }
  }
}

// Loads a side module from binary data
function loadWebAssemblyModule(binary, flags) {
  var int32View = new Uint32Array(new Uint8Array(binary.subarray(0, 24)).buffer);
  assert(int32View[0] == 0x6d736100, 'need to see wasm magic number'); // \0asm
  // we should see the dylink section right after the magic number and wasm version
  assert(binary[8] === 0, 'need the dylink section to be first')
  var next = 9;
  function getLEB() {
    var ret = 0;
    var mul = 1;
    while (1) {
      var byte = binary[next++];
      ret += ((byte & 0x7f) * mul);
      mul *= 0x80;
      if (!(byte & 0x80)) break;
    }
    return ret;
  }
  var sectionSize = getLEB();
  assert(binary[next] === 6);                 next++; // size of "dylink" string
  assert(binary[next] === 'd'.charCodeAt(0)); next++;
  assert(binary[next] === 'y'.charCodeAt(0)); next++;
  assert(binary[next] === 'l'.charCodeAt(0)); next++;
  assert(binary[next] === 'i'.charCodeAt(0)); next++;
  assert(binary[next] === 'n'.charCodeAt(0)); next++;
  assert(binary[next] === 'k'.charCodeAt(0)); next++;
  var memorySize = getLEB();
  var memoryAlign = getLEB();
  var tableSize = getLEB();
  var tableAlign = getLEB();

  // shared libraries this module needs. We need to load them first, so that
  // current module could resolve its imports. (see tools/shared.py
  // WebAssembly.make_shared_library() for "dylink" section extension format)
  var neededDynlibsCount = getLEB();
  var neededDynlibs = [];
  for (var i = 0; i < neededDynlibsCount; ++i) {
    var nameLen = getLEB();
    var nameUTF8 = binary.subarray(next, next + nameLen);
    next += nameLen;
    var name = UTF8ArrayToString(nameUTF8, 0);
    neededDynlibs.push(name);
  }

  // loadModule loads the wasm module after all its dependencies have been loaded.
  // can be called both sync/async.
  function loadModule() {
    // alignments are powers of 2
    memoryAlign = Math.pow(2, memoryAlign);
    tableAlign = Math.pow(2, tableAlign);
    // finalize alignments and verify them
    memoryAlign = Math.max(memoryAlign, STACK_ALIGN); // we at least need stack alignment
    assert(tableAlign === 1, 'invalid tableAlign ' + tableAlign);
    // prepare memory
    var memoryBase = alignMemory(getMemory(memorySize + memoryAlign), memoryAlign); // TODO: add to cleanups
    // prepare env imports
    var env = asmLibraryArg;
    // TODO: use only __memory_base and __table_base, need to update asm.js backend
    var table = wasmTable;
    var tableBase = table.length;
    var originalTable = table;
    table.grow(tableSize);
    assert(table === originalTable);
    // zero-initialize memory and table
    // The static area consists of explicitly initialized data, followed by zero-initialized data.
    // The latter may need zeroing out if the MAIN_MODULE has already used this memory area before
    // dlopen'ing the SIDE_MODULE.  Since we don't know the size of the explicitly initialized data
    // here, we just zero the whole thing, which is suboptimal, but should at least resolve bugs
    // from uninitialized memory.
    for (var i = memoryBase; i < memoryBase + memorySize; i++) {
      HEAP8[i] = 0;
    }
    for (var i = tableBase; i < tableBase + tableSize; i++) {
      table.set(i, null);
    }

    // We resolve symbols against the global Module but failing that also
    // against the local symbols exported a side module.  This is because
    // a) Module sometime need to import their own symbols
    // b) Symbols from loaded modules are not always added to the global Module.
    var moduleLocal = {};

    var resolveSymbol = function(sym, type, legalized) {
      if (legalized) {
        sym = 'orig$' + sym;
      }

      var resolved = Module["asm"][sym];
      if (!resolved) {
        var mangled = asmjsMangle(sym);
        resolved = Module[mangled];
        if (!resolved) {
          resolved = moduleLocal[mangled];
        }
        if (!resolved && sym.startsWith('invoke_')) {
          resolved = createInvokeFunction(sym.split('_')[1]);
        }
        assert(resolved, 'missing linked ' + type + ' `' + sym + '`. perhaps a side module was not linked in? if this global was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment');
      }
      return resolved;
    }

    // copy currently exported symbols so the new module can import them
    for (var x in Module) {
      if (!(x in env)) {
        env[x] = Module[x];
      }
    }

    // TODO kill ↓↓↓ (except "symbols local to this module", it will likely be
    // not needed if we require that if A wants symbols from B it has to link
    // to B explicitly: similarly to -Wl,--no-undefined)
    //
    // wasm dynamic libraries are pure wasm, so they cannot assist in
    // their own loading. When side module A wants to import something
    // provided by a side module B that is loaded later, we need to
    // add a layer of indirection, but worse, we can't even tell what
    // to add the indirection for, without inspecting what A's imports
    // are. To do that here, we use a JS proxy (another option would
    // be to inspect the binary directly).
    var proxyHandler = {
      'get': function(obj, prop) {
        // symbols that should be local to this module
        switch (prop) {
          case '__memory_base':
          case 'gb':
            return memoryBase;
          case '__table_base':
          case 'fb':
            return tableBase;
        }

        if (prop in obj) {
          return obj[prop]; // already present
        }
        if (prop.startsWith('g$')) {
          // a global. the g$ function returns the global address.
          var name = prop.substr(2); // without g$ prefix
          return obj[prop] = function() {
            return resolveSymbol(name, 'global');
          };
        }
        if (prop.startsWith('fp$')) {
          // the fp$ function returns the address (table index) of the function
          var parts = prop.split('$');
          assert(parts.length == 3)
          var name = parts[1];
          var sig = parts[2];
          var legalized = sig.indexOf('j') >= 0; // check for i64s
          var fp = 0;
          return obj[prop] = function() {
            if (!fp) {
              var f = resolveSymbol(name, 'function', legalized);
              fp = addFunction(f, sig);
            }
            return fp;
          };
        }
        // otherwise this is regular function import - call it indirectly
        return obj[prop] = function() {
          return resolveSymbol(prop, 'function').apply(null, arguments);
        };
      }
    };
    var proxy = new Proxy(env, proxyHandler);
    var info = {
      global: {
        'NaN': NaN,
        'Infinity': Infinity,
      },
      'global.Math': Math,
      env: proxy,
      wasi_snapshot_preview1: proxy,
    };
    var oldTable = [];
    for (var i = 0; i < tableBase; i++) {
      oldTable.push(table.get(i));
    }

    function postInstantiation(instance, moduleLocal) {
      // the table should be unchanged
      assert(table === originalTable);
      assert(table === wasmTable);
      // the old part of the table should be unchanged
      for (var i = 0; i < tableBase; i++) {
        assert(table.get(i) === oldTable[i], 'old table entries must remain the same');
      }
      // verify that the new table region was filled in
      for (var i = 0; i < tableSize; i++) {
        assert(table.get(tableBase + i) !== undefined, 'table entry was not filled in');
      }
      var exports = relocateExports(instance.exports, memoryBase, tableBase, moduleLocal);
      // initialize the module
      var init = exports['__post_instantiate'];
      if (init) {
        if (runtimeInitialized) {
          init();
        } else {
          // we aren't ready to run compiled code yet
          __ATINIT__.push(init);
        }
      }
      return exports;
    }

    if (flags.loadAsync) {
      return WebAssembly.instantiate(binary, info).then(function(result) {
        return postInstantiation(result.instance, moduleLocal);
      });
    } else {
      var instance = new WebAssembly.Instance(new WebAssembly.Module(binary), info);
      return postInstantiation(instance, moduleLocal);
    }
  }

  // now load needed libraries and the module itself.
  if (flags.loadAsync) {
    return Promise.all(neededDynlibs.map(function(dynNeeded) {
      return loadDynamicLibrary(dynNeeded, flags);
    })).then(function() {
      return loadModule();
    });
  }

  neededDynlibs.forEach(function(dynNeeded) {
    loadDynamicLibrary(dynNeeded, flags);
  });
  return loadModule();
}
Module['loadWebAssemblyModule'] = loadWebAssemblyModule;





// Wraps a JS function as a wasm function with a given signature.
function convertJsFunctionToWasm(func, sig) {

  // If the type reflection proposal is available, use the new
  // "WebAssembly.Function" constructor.
  // Otherwise, construct a minimal wasm module importing the JS function and
  // re-exporting it.
  if (typeof WebAssembly.Function === "function") {
    var typeNames = {
      'i': 'i32',
      'j': 'i64',
      'f': 'f32',
      'd': 'f64'
    };
    var type = {
      parameters: [],
      results: sig[0] == 'v' ? [] : [typeNames[sig[0]]]
    };
    for (var i = 1; i < sig.length; ++i) {
      type.parameters.push(typeNames[sig[i]]);
    }
    return new WebAssembly.Function(type, func);
  }

  // The module is static, with the exception of the type section, which is
  // generated based on the signature passed in.
  var typeSection = [
    0x01, // id: section,
    0x00, // length: 0 (placeholder)
    0x01, // count: 1
    0x60, // form: func
  ];
  var sigRet = sig.slice(0, 1);
  var sigParam = sig.slice(1);
  var typeCodes = {
    'i': 0x7f, // i32
    'j': 0x7e, // i64
    'f': 0x7d, // f32
    'd': 0x7c, // f64
  };

  // Parameters, length + signatures
  typeSection.push(sigParam.length);
  for (var i = 0; i < sigParam.length; ++i) {
    typeSection.push(typeCodes[sigParam[i]]);
  }

  // Return values, length + signatures
  // With no multi-return in MVP, either 0 (void) or 1 (anything else)
  if (sigRet == 'v') {
    typeSection.push(0x00);
  } else {
    typeSection = typeSection.concat([0x01, typeCodes[sigRet]]);
  }

  // Write the overall length of the type section back into the section header
  // (excepting the 2 bytes for the section id and length)
  typeSection[1] = typeSection.length - 2;

  // Rest of the module is static
  var bytes = new Uint8Array([
    0x00, 0x61, 0x73, 0x6d, // magic ("\0asm")
    0x01, 0x00, 0x00, 0x00, // version: 1
  ].concat(typeSection, [
    0x02, 0x07, // import section
      // (import "e" "f" (func 0 (type 0)))
      0x01, 0x01, 0x65, 0x01, 0x66, 0x00, 0x00,
    0x07, 0x05, // export section
      // (export "f" (func 0 (type 0)))
      0x01, 0x01, 0x66, 0x00, 0x00,
  ]));

   // We can compile this wasm module synchronously because it is very small.
  // This accepts an import (at "e.f"), that it reroutes to an export (at "f")
  var module = new WebAssembly.Module(bytes);
  var instance = new WebAssembly.Instance(module, {
    'e': {
      'f': func
    }
  });
  var wrappedFunc = instance.exports['f'];
  return wrappedFunc;
}

var freeTableIndexes = [];

// Weak map of functions in the table to their indexes, created on first use.
var functionsInTableMap;

// Add a wasm function to the table.
function addFunctionWasm(func, sig) {
  var table = wasmTable;

  // Check if the function is already in the table, to ensure each function
  // gets a unique index. First, create the map if this is the first use.
  if (!functionsInTableMap) {
    functionsInTableMap = new WeakMap();
    for (var i = 0; i < table.length; i++) {
      var item = table.get(i);
      // Ignore null values.
      if (item) {
        functionsInTableMap.set(item, i);
      }
    }
  }
  if (functionsInTableMap.has(func)) {
    return functionsInTableMap.get(func);
  }

  // It's not in the table, add it now.


  var ret;
  // Reuse a free index if there is one, otherwise grow.
  if (freeTableIndexes.length) {
    ret = freeTableIndexes.pop();
  } else {
    ret = table.length;
    // Grow the table
    try {
      table.grow(1);
    } catch (err) {
      if (!(err instanceof RangeError)) {
        throw err;
      }
      throw 'Unable to grow wasm table. Set ALLOW_TABLE_GROWTH.';
    }
  }

  // Set the new value.
  try {
    // Attempting to call this with JS function will cause of table.set() to fail
    table.set(ret, func);
  } catch (err) {
    if (!(err instanceof TypeError)) {
      throw err;
    }
    assert(typeof sig !== 'undefined', 'Missing signature argument to addFunction');
    var wrapped = convertJsFunctionToWasm(func, sig);
    table.set(ret, wrapped);
  }

  functionsInTableMap.set(func, ret);

  return ret;
}

function removeFunctionWasm(index) {
  functionsInTableMap.delete(wasmTable.get(index));
  freeTableIndexes.push(index);
}

// 'sig' parameter is required for the llvm backend but only when func is not
// already a WebAssembly function.
function addFunction(func, sig) {
  assert(typeof func !== 'undefined');

  return addFunctionWasm(func, sig);
}

function removeFunction(index) {
  removeFunctionWasm(index);
}









function makeBigInt(low, high, unsigned) {
  return unsigned ? ((+((low>>>0)))+((+((high>>>0)))*4294967296.0)) : ((+((low>>>0)))+((+((high|0)))*4294967296.0));
}

var tempRet0 = 0;

var setTempRet0 = function(value) {
  tempRet0 = value;
};

var getTempRet0 = function() {
  return tempRet0;
};

function getCompilerSetting(name) {
  throw 'You must build with -s RETAIN_COMPILER_SETTINGS=1 for getCompilerSetting or emscripten_get_compiler_setting to work';
}

// The address globals begin at. Very low in memory, for code size and optimization opportunities.
// Above 0 is static memory, starting with globals.
// Then the stack.
// Then 'dynamic' memory for sbrk.
var GLOBAL_BASE = 1024;

GLOBAL_BASE = alignMemory(GLOBAL_BASE, 1);




// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html


var wasmBinary;if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];if (!Object.getOwnPropertyDescriptor(Module, 'wasmBinary')) Object.defineProperty(Module, 'wasmBinary', { configurable: true, get: function() { abort('Module.wasmBinary has been replaced with plain wasmBinary (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });
var noExitRuntime;if (Module['noExitRuntime']) noExitRuntime = Module['noExitRuntime'];if (!Object.getOwnPropertyDescriptor(Module, 'noExitRuntime')) Object.defineProperty(Module, 'noExitRuntime', { configurable: true, get: function() { abort('Module.noExitRuntime has been replaced with plain noExitRuntime (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });


if (typeof WebAssembly !== 'object') {
  abort('no native wasm support detected');
}




// In MINIMAL_RUNTIME, setValue() and getValue() are only available when building with safe heap enabled, for heap safety checking.
// In traditional runtime, setValue() and getValue() are always available (although their use is highly discouraged due to perf penalties)

/** @param {number} ptr
    @param {number} value
    @param {string} type
    @param {number|boolean=} noSafe */
function setValue(ptr, value, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
  if (noSafe) {
    switch(type) {
      case 'i1': HEAP8[((ptr)>>0)]=value; break;
      case 'i8': HEAP8[((ptr)>>0)]=value; break;
      case 'i16': HEAP16[((ptr)>>1)]=value; break;
      case 'i32': HEAP32[((ptr)>>2)]=value; break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((ptr)>>2)]=tempI64[0],HEAP32[(((ptr)+(4))>>2)]=tempI64[1]); break;
      case 'float': HEAPF32[((ptr)>>2)]=value; break;
      case 'double': HEAPF64[((ptr)>>3)]=value; break;
      default: abort('invalid type for setValue: ' + type);
    }
  } else {
    switch(type) {
      case 'i1': SAFE_HEAP_STORE(((ptr)|0), ((value)|0), 1); break;
      case 'i8': SAFE_HEAP_STORE(((ptr)|0), ((value)|0), 1); break;
      case 'i16': SAFE_HEAP_STORE(((ptr)|0), ((value)|0), 2); break;
      case 'i32': SAFE_HEAP_STORE(((ptr)|0), ((value)|0), 4); break;
      case 'i64': (tempI64 = [value>>>0,(tempDouble=value,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE(((ptr)|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((ptr)+(4))|0), ((tempI64[1])|0), 4)); break;
      case 'float': SAFE_HEAP_STORE_D(((ptr)|0), Math_fround(value), 4); break;
      case 'double': SAFE_HEAP_STORE_D(((ptr)|0), (+(value)), 8); break;
      default: abort('invalid type for setValue: ' + type);
    }
  }
}

/** @param {number} ptr
    @param {string} type
    @param {number|boolean=} noSafe */
function getValue(ptr, type, noSafe) {
  type = type || 'i8';
  if (type.charAt(type.length-1) === '*') type = 'i32'; // pointers are 32-bit
  if (noSafe) {
    switch(type) {
      case 'i1': return HEAP8[((ptr)>>0)];
      case 'i8': return HEAP8[((ptr)>>0)];
      case 'i16': return HEAP16[((ptr)>>1)];
      case 'i32': return HEAP32[((ptr)>>2)];
      case 'i64': return HEAP32[((ptr)>>2)];
      case 'float': return HEAPF32[((ptr)>>2)];
      case 'double': return HEAPF64[((ptr)>>3)];
      default: abort('invalid type for getValue: ' + type);
    }
  } else {
    switch(type) {
      case 'i1': return ((SAFE_HEAP_LOAD(((ptr)|0), 1, 0))|0);
      case 'i8': return ((SAFE_HEAP_LOAD(((ptr)|0), 1, 0))|0);
      case 'i16': return ((SAFE_HEAP_LOAD(((ptr)|0), 2, 0))|0);
      case 'i32': return ((SAFE_HEAP_LOAD(((ptr)|0), 4, 0))|0);
      case 'i64': return ((SAFE_HEAP_LOAD(((ptr)|0), 8, 0))|0);
      case 'float': return Math_fround(SAFE_HEAP_LOAD_D(((ptr)|0), 4, 0));
      case 'double': return (+(SAFE_HEAP_LOAD_D(((ptr)|0), 8, 0)));
      default: abort('invalid type for getValue: ' + type);
    }
  }
  return null;
}


/** @param {number|boolean=} isFloat */
function getSafeHeapType(bytes, isFloat) {
  switch (bytes) {
    case 1: return 'i8';
    case 2: return 'i16';
    case 4: return isFloat ? 'float' : 'i32';
    case 8: return 'double';
    default: assert(0);
  }
}


/** @param {number|boolean=} isFloat */
function SAFE_HEAP_STORE(dest, value, bytes, isFloat) {
  if (dest <= 0) abort('segmentation fault storing ' + bytes + ' bytes to address ' + dest);
  if (dest % bytes !== 0) abort('alignment error storing to address ' + dest + ', which was expected to be aligned to a multiple of ' + bytes);
  if (dest + bytes > HEAPU32[DYNAMICTOP_PTR>>2]) abort('segmentation fault, exceeded the top of the available dynamic heap when storing ' + bytes + ' bytes to address ' + dest + '. DYNAMICTOP=' + HEAP32[DYNAMICTOP_PTR>>2]);
  assert(DYNAMICTOP_PTR);
  assert(HEAP32[DYNAMICTOP_PTR>>2] <= HEAP8.length);
  setValue(dest, value, getSafeHeapType(bytes, isFloat), 1);
}
function SAFE_HEAP_STORE_D(dest, value, bytes) {
  SAFE_HEAP_STORE(dest, value, bytes, true);
}

/** @param {number|boolean=} isFloat */
function SAFE_HEAP_LOAD(dest, bytes, unsigned, isFloat) {
  if (dest <= 0) abort('segmentation fault loading ' + bytes + ' bytes from address ' + dest);
  if (dest % bytes !== 0) abort('alignment error loading from address ' + dest + ', which was expected to be aligned to a multiple of ' + bytes);
  if (dest + bytes > HEAPU32[DYNAMICTOP_PTR>>2]) abort('segmentation fault, exceeded the top of the available dynamic heap when loading ' + bytes + ' bytes from address ' + dest + '. DYNAMICTOP=' + HEAP32[DYNAMICTOP_PTR>>2]);
  assert(DYNAMICTOP_PTR);
  assert(HEAP32[DYNAMICTOP_PTR>>2] <= HEAP8.length);
  var type = getSafeHeapType(bytes, isFloat);
  var ret = getValue(dest, type, 1);
  if (unsigned) ret = unSign(ret, parseInt(type.substr(1), 10));
  return ret;
}
function SAFE_HEAP_LOAD_D(dest, bytes, unsigned) {
  return SAFE_HEAP_LOAD(dest, bytes, unsigned, true);
}

function SAFE_FT_MASK(value, mask) {
  var ret = value & mask;
  if (ret !== value) {
    abort('Function table mask error: function pointer is ' + value + ' which is masked by ' + mask + ', the likely cause of this is that the function pointer is being called by the wrong type.');
  }
  return ret;
}

function segfault() {
  abort('segmentation fault');
}
function alignfault() {
  abort('alignment fault');
}
function ftfault() {
  abort('Function table mask error');
}




// Wasm globals

var wasmMemory;

// In fastcomp asm.js, we don't need a wasm Table at all.
// In the wasm backend, we polyfill the WebAssembly object,
// so this creates a (non-native-wasm) table for us.

var wasmTable = new WebAssembly.Table({
  'initial': 1718,
  'element': 'anyfunc'
});




//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

// set by exit() and abort().  Passed to 'onExit' handler.
// NOTE: This is also used as the process return code code in shell environments
// but only when noExitRuntime is false.
var EXITSTATUS = 0;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed: ' + text);
  }
}

// Returns the C function with a specified identifier (for C++, you need to do manual name mangling)
function getCFunc(ident) {
  var func = Module['_' + ident]; // closure exported function
  assert(func, 'Cannot call unknown function ' + ident + ', make sure it is exported');
  return func;
}

// C calling interface.
/** @param {string|null=} returnType
    @param {Array=} argTypes
    @param {Arguments|Array=} args
    @param {Object=} opts */
function ccall(ident, returnType, argTypes, args, opts) {
  // For fast lookup of conversion functions
  var toC = {
    'string': function(str) {
      var ret = 0;
      if (str !== null && str !== undefined && str !== 0) { // null string
        // at most 4 bytes per UTF-8 code point, +1 for the trailing '\0'
        var len = (str.length << 2) + 1;
        ret = stackAlloc(len);
        stringToUTF8(str, ret, len);
      }
      return ret;
    },
    'array': function(arr) {
      var ret = stackAlloc(arr.length);
      writeArrayToMemory(arr, ret);
      return ret;
    }
  };

  function convertReturnValue(ret) {
    if (returnType === 'string') return UTF8ToString(ret);
    if (returnType === 'boolean') return Boolean(ret);
    return ret;
  }

  var func = getCFunc(ident);
  var cArgs = [];
  var stack = 0;
  assert(returnType !== 'array', 'Return type should not be "array".');
  if (args) {
    for (var i = 0; i < args.length; i++) {
      var converter = toC[argTypes[i]];
      if (converter) {
        if (stack === 0) stack = stackSave();
        cArgs[i] = converter(args[i]);
      } else {
        cArgs[i] = args[i];
      }
    }
  }
  var ret = func.apply(null, cArgs);

  ret = convertReturnValue(ret);
  if (stack !== 0) stackRestore(stack);
  return ret;
}

/** @param {string=} returnType
    @param {Array=} argTypes
    @param {Object=} opts */
function cwrap(ident, returnType, argTypes, opts) {
  return function() {
    return ccall(ident, returnType, argTypes, arguments, opts);
  }
}

var ALLOC_NORMAL = 0; // Tries to use _malloc()
var ALLOC_STACK = 1; // Lives for the duration of the current function call
var ALLOC_DYNAMIC = 2; // Cannot be freed except through sbrk
var ALLOC_NONE = 3; // Do not allocate

// allocate(): This is for internal use. You can use it yourself as well, but the interface
//             is a little tricky (see docs right below). The reason is that it is optimized
//             for multiple syntaxes to save space in generated code. So you should
//             normally not use allocate(), and instead allocate memory using _malloc(),
//             initialize it with setValue(), and so forth.
// @slab: An array of data, or a number. If a number, then the size of the block to allocate,
//        in *bytes* (note that this is sometimes confusing: the next parameter does not
//        affect this!)
// @types: Either an array of types, one for each byte (or 0 if no type at that position),
//         or a single type which is used for the entire block. This only matters if there
//         is initial data - if @slab is a number, then this does not matter at all and is
//         ignored.
// @allocator: How to allocate memory, see ALLOC_*
/** @type {function((TypedArray|Array<number>|number), string, number, number=)} */
function allocate(slab, types, allocator, ptr) {
  var zeroinit, size;
  if (typeof slab === 'number') {
    zeroinit = true;
    size = slab;
  } else {
    zeroinit = false;
    size = slab.length;
  }

  var singleType = typeof types === 'string' ? types : null;

  var ret;
  if (allocator == ALLOC_NONE) {
    ret = ptr;
  } else {
    ret = [_malloc,
    stackAlloc,
    dynamicAlloc][allocator](Math.max(size, singleType ? 1 : types.length));
  }

  if (zeroinit) {
    var stop;
    ptr = ret;
    assert((ret & 3) == 0);
    stop = ret + (size & ~3);
    for (; ptr < stop; ptr += 4) {
      HEAP32[((ptr)>>2)]=0;
    }
    stop = ret + size;
    while (ptr < stop) {
      HEAP8[((ptr++)>>0)]=0;
    }
    return ret;
  }

  if (singleType === 'i8') {
    if (slab.subarray || slab.slice) {
      HEAPU8.set(/** @type {!Uint8Array} */ (slab), ret);
    } else {
      HEAPU8.set(new Uint8Array(slab), ret);
    }
    return ret;
  }

  var i = 0, type, typeSize, previousType;
  while (i < size) {
    var curr = slab[i];

    type = singleType || types[i];
    if (type === 0) {
      i++;
      continue;
    }
    assert(type, 'Must know what type to store in allocate!');

    if (type == 'i64') type = 'i32'; // special case: we have one i32 here, and one i32 later

    setValue(ret+i, curr, type);

    // no need to look up size unless type changes, so cache it
    if (previousType !== type) {
      typeSize = getNativeTypeSize(type);
      previousType = type;
    }
    i += typeSize;
  }

  return ret;
}

// Allocate memory during any stage of startup - static memory early on, dynamic memory later, malloc when ready
function getMemory(size) {
  if (!runtimeInitialized) return dynamicAlloc(size);
  return _malloc(size);
}




// runtime_strings.js: Strings related runtime functions that are part of both MINIMAL_RUNTIME and regular runtime.

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the given array that contains uint8 values, returns
// a copy of that string as a Javascript String object.

var UTF8Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf8') : undefined;

/**
 * @param {number} idx
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ArrayToString(heap, idx, maxBytesToRead) {
  var endIdx = idx + maxBytesToRead;
  var endPtr = idx;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  // (As a tiny code save trick, compare endPtr against endIdx using a negation, so that undefined means Infinity)
  while (heap[endPtr] && !(endPtr >= endIdx)) ++endPtr;

  if (endPtr - idx > 16 && heap.subarray && UTF8Decoder) {
    return UTF8Decoder.decode(heap.subarray(idx, endPtr));
  } else {
    var str = '';
    // If building with TextDecoder, we have already computed the string length above, so test loop end condition against that
    while (idx < endPtr) {
      // For UTF8 byte structure, see:
      // http://en.wikipedia.org/wiki/UTF-8#Description
      // https://www.ietf.org/rfc/rfc2279.txt
      // https://tools.ietf.org/html/rfc3629
      var u0 = heap[idx++];
      if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
      var u1 = heap[idx++] & 63;
      if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
      var u2 = heap[idx++] & 63;
      if ((u0 & 0xF0) == 0xE0) {
        u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
      } else {
        if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte 0x' + u0.toString(16) + ' encountered when deserializing a UTF-8 string on the asm.js/wasm heap to a JS string!');
        u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heap[idx++] & 63);
      }

      if (u0 < 0x10000) {
        str += String.fromCharCode(u0);
      } else {
        var ch = u0 - 0x10000;
        str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
      }
    }
  }
  return str;
}

// Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the emscripten HEAP, returns a
// copy of that string as a Javascript String object.
// maxBytesToRead: an optional length that specifies the maximum number of bytes to read. You can omit
//                 this parameter to scan the string until the first \0 byte. If maxBytesToRead is
//                 passed, and the string at [ptr, ptr+maxBytesToReadr[ contains a null byte in the
//                 middle, then the string will cut short at that byte index (i.e. maxBytesToRead will
//                 not produce a string of exact length [ptr, ptr+maxBytesToRead[)
//                 N.B. mixing frequent uses of UTF8ToString() with and without maxBytesToRead may
//                 throw JS JIT optimizations off, so it is worth to consider consistently using one
//                 style or the other.
/**
 * @param {number} ptr
 * @param {number=} maxBytesToRead
 * @return {string}
 */
function UTF8ToString(ptr, maxBytesToRead) {
  return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
}

// Copies the given Javascript String object 'str' to the given byte array at address 'outIdx',
// encoded in UTF8 form and null-terminated. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   heap: the array to copy to. Each index in this array is assumed to be one 8-byte element.
//   outIdx: The starting offset in the array to begin the copying.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array.
//                    This count should include the null terminator,
//                    i.e. if maxBytesToWrite=1, only the null terminator will be written and nothing else.
//                    maxBytesToWrite=0 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
  if (!(maxBytesToWrite > 0)) // Parameter maxBytesToWrite is not optional. Negative values, 0, null, undefined and false each don't write out any bytes.
    return 0;

  var startIdx = outIdx;
  var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description and https://www.ietf.org/rfc/rfc2279.txt and https://tools.ietf.org/html/rfc3629
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) {
      var u1 = str.charCodeAt(++i);
      u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
    }
    if (u <= 0x7F) {
      if (outIdx >= endIdx) break;
      heap[outIdx++] = u;
    } else if (u <= 0x7FF) {
      if (outIdx + 1 >= endIdx) break;
      heap[outIdx++] = 0xC0 | (u >> 6);
      heap[outIdx++] = 0x80 | (u & 63);
    } else if (u <= 0xFFFF) {
      if (outIdx + 2 >= endIdx) break;
      heap[outIdx++] = 0xE0 | (u >> 12);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    } else {
      if (outIdx + 3 >= endIdx) break;
      if (u >= 0x200000) warnOnce('Invalid Unicode code point 0x' + u.toString(16) + ' encountered when serializing a JS string to an UTF-8 string on the asm.js/wasm heap! (Valid unicode code points should be in range 0-0x1FFFFF).');
      heap[outIdx++] = 0xF0 | (u >> 18);
      heap[outIdx++] = 0x80 | ((u >> 12) & 63);
      heap[outIdx++] = 0x80 | ((u >> 6) & 63);
      heap[outIdx++] = 0x80 | (u & 63);
    }
  }
  // Null-terminate the pointer to the buffer.
  heap[outIdx] = 0;
  return outIdx - startIdx;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF8 form. The copy will require at most str.length*4+1 bytes of space in the HEAP.
// Use the function lengthBytesUTF8 to compute the exact number of bytes (excluding null terminator) that this function will write.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF8(str, outPtr, maxBytesToWrite) {
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF8 byte array, EXCLUDING the null terminator byte.
function lengthBytesUTF8(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! So decode UTF16->UTF32->UTF8.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var u = str.charCodeAt(i); // possibly a lead surrogate
    if (u >= 0xD800 && u <= 0xDFFF) u = 0x10000 + ((u & 0x3FF) << 10) | (str.charCodeAt(++i) & 0x3FF);
    if (u <= 0x7F) ++len;
    else if (u <= 0x7FF) len += 2;
    else if (u <= 0xFFFF) len += 3;
    else len += 4;
  }
  return len;
}





// runtime_strings_extra.js: Strings related runtime functions that are available only in regular runtime.

// Given a pointer 'ptr' to a null-terminated ASCII-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

function AsciiToString(ptr) {
  var str = '';
  while (1) {
    var ch = ((SAFE_HEAP_LOAD(((ptr++)|0), 1, 1))>>>0);
    if (!ch) return str;
    str += String.fromCharCode(ch);
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in ASCII form. The copy will require at most str.length+1 bytes of space in the HEAP.

function stringToAscii(str, outPtr) {
  return writeAsciiToMemory(str, outPtr, false);
}

// Given a pointer 'ptr' to a null-terminated UTF16LE-encoded string in the emscripten HEAP, returns
// a copy of that string as a Javascript String object.

var UTF16Decoder = typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-16le') : undefined;

function UTF16ToString(ptr, maxBytesToRead) {
  assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
  var endPtr = ptr;
  // TextDecoder needs to know the byte length in advance, it doesn't stop on null terminator by itself.
  // Also, use the length info to avoid running tiny strings through TextDecoder, since .subarray() allocates garbage.
  var idx = endPtr >> 1;
  var maxIdx = idx + maxBytesToRead / 2;
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
  endPtr = idx << 1;

  if (endPtr - ptr > 32 && UTF16Decoder) {
    return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  } else {
    var i = 0;

    var str = '';
    while (1) {
      var codeUnit = ((SAFE_HEAP_LOAD((((ptr)+(i*2))|0), 2, 0))|0);
      if (codeUnit == 0 || i == maxBytesToRead / 2) return str;
      ++i;
      // fromCharCode constructs a character from a UTF-16 code unit, so we can pass the UTF16 string right through.
      str += String.fromCharCode(codeUnit);
    }
  }
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF16 form. The copy will require at most str.length*4+2 bytes of space in the HEAP.
// Use the function lengthBytesUTF16() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=2, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<2 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF16(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 2) return 0;
  maxBytesToWrite -= 2; // Null terminator.
  var startPtr = outPtr;
  var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
  for (var i = 0; i < numCharsToWrite; ++i) {
    // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    SAFE_HEAP_STORE(((outPtr)|0), ((codeUnit)|0), 2);
    outPtr += 2;
  }
  // Null-terminate the pointer to the HEAP.
  SAFE_HEAP_STORE(((outPtr)|0), ((0)|0), 2);
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF16(str) {
  return str.length*2;
}

function UTF32ToString(ptr, maxBytesToRead) {
  assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
  var i = 0;

  var str = '';
  // If maxBytesToRead is not passed explicitly, it will be undefined, and this
  // will always evaluate to true. This saves on code size.
  while (!(i >= maxBytesToRead / 4)) {
    var utf32 = ((SAFE_HEAP_LOAD((((ptr)+(i*4))|0), 4, 0))|0);
    if (utf32 == 0) break;
    ++i;
    // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    if (utf32 >= 0x10000) {
      var ch = utf32 - 0x10000;
      str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
    } else {
      str += String.fromCharCode(utf32);
    }
  }
  return str;
}

// Copies the given Javascript String object 'str' to the emscripten HEAP at address 'outPtr',
// null-terminated and encoded in UTF32 form. The copy will require at most str.length*4+4 bytes of space in the HEAP.
// Use the function lengthBytesUTF32() to compute the exact number of bytes (excluding null terminator) that this function will write.
// Parameters:
//   str: the Javascript string to copy.
//   outPtr: Byte address in Emscripten HEAP where to write the string to.
//   maxBytesToWrite: The maximum number of bytes this function can write to the array. This count should include the null
//                    terminator, i.e. if maxBytesToWrite=4, only the null terminator will be written and nothing else.
//                    maxBytesToWrite<4 does not write any bytes to the output, not even the null terminator.
// Returns the number of bytes written, EXCLUDING the null terminator.

function stringToUTF32(str, outPtr, maxBytesToWrite) {
  assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
  assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
  // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
  if (maxBytesToWrite === undefined) {
    maxBytesToWrite = 0x7FFFFFFF;
  }
  if (maxBytesToWrite < 4) return 0;
  var startPtr = outPtr;
  var endPtr = startPtr + maxBytesToWrite - 4;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
      var trailSurrogate = str.charCodeAt(++i);
      codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
    }
    SAFE_HEAP_STORE(((outPtr)|0), ((codeUnit)|0), 4);
    outPtr += 4;
    if (outPtr + 4 > endPtr) break;
  }
  // Null-terminate the pointer to the HEAP.
  SAFE_HEAP_STORE(((outPtr)|0), ((0)|0), 4);
  return outPtr - startPtr;
}

// Returns the number of bytes the given Javascript string takes if encoded as a UTF16 byte array, EXCLUDING the null terminator byte.

function lengthBytesUTF32(str) {
  var len = 0;
  for (var i = 0; i < str.length; ++i) {
    // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
    // See http://unicode.org/faq/utf_bom.html#utf16-3
    var codeUnit = str.charCodeAt(i);
    if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
    len += 4;
  }

  return len;
}

// Allocate heap space for a JS string, and write it there.
// It is the responsibility of the caller to free() that memory.
function allocateUTF8(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = _malloc(size);
  if (ret) stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Allocate stack space for a JS string, and write it there.
function allocateUTF8OnStack(str) {
  var size = lengthBytesUTF8(str) + 1;
  var ret = stackAlloc(size);
  stringToUTF8Array(str, HEAP8, ret, size);
  return ret;
}

// Deprecated: This function should not be called because it is unsafe and does not provide
// a maximum length limit of how many bytes it is allowed to write. Prefer calling the
// function stringToUTF8Array() instead, which takes in a maximum length that can be used
// to be secure from out of bounds writes.
/** @deprecated
    @param {boolean=} dontAddNull */
function writeStringToMemory(string, buffer, dontAddNull) {
  warnOnce('writeStringToMemory is deprecated and should not be called! Use stringToUTF8() instead!');

  var /** @type {number} */ lastChar, /** @type {number} */ end;
  if (dontAddNull) {
    // stringToUTF8Array always appends null. If we don't want to do that, remember the
    // character that existed at the location where the null will be placed, and restore
    // that after the write (below).
    end = buffer + lengthBytesUTF8(string);
    lastChar = HEAP8[end];
  }
  stringToUTF8(string, buffer, Infinity);
  if (dontAddNull) HEAP8[end] = lastChar; // Restore the value under the null character.
}

function writeArrayToMemory(array, buffer) {
  assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)')
  HEAP8.set(array, buffer);
}

/** @param {boolean=} dontAddNull */
function writeAsciiToMemory(str, buffer, dontAddNull) {
  for (var i = 0; i < str.length; ++i) {
    assert(str.charCodeAt(i) === str.charCodeAt(i)&0xff);
    SAFE_HEAP_STORE(((buffer++)|0), ((str.charCodeAt(i))|0), 1);
  }
  // Null-terminate the pointer to the HEAP.
  if (!dontAddNull) SAFE_HEAP_STORE(((buffer)|0), ((0)|0), 1);
}



// Memory management

var PAGE_SIZE = 16384;
var WASM_PAGE_SIZE = 65536;

function alignUp(x, multiple) {
  if (x % multiple > 0) {
    x += multiple - (x % multiple);
  }
  return x;
}

var HEAP,
/** @type {ArrayBuffer} */
  buffer,
/** @type {Int8Array} */
  HEAP8,
/** @type {Uint8Array} */
  HEAPU8,
/** @type {Int16Array} */
  HEAP16,
/** @type {Uint16Array} */
  HEAPU16,
/** @type {Int32Array} */
  HEAP32,
/** @type {Uint32Array} */
  HEAPU32,
/** @type {Float32Array} */
  HEAPF32,
/** @type {Float64Array} */
  HEAPF64;

function updateGlobalBufferAndViews(buf) {
  buffer = buf;
  Module['HEAP8'] = HEAP8 = new Int8Array(buf);
  Module['HEAP16'] = HEAP16 = new Int16Array(buf);
  Module['HEAP32'] = HEAP32 = new Int32Array(buf);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(buf);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(buf);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(buf);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(buf);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(buf);
}

var STATIC_BASE = 1024,
    STACK_BASE = 6962720,
    STACKTOP = STACK_BASE,
    STACK_MAX = 1719840,
    DYNAMIC_BASE = 6962720,
    DYNAMICTOP_PTR = 1719824;

assert(STACK_BASE % 16 === 0, 'stack must start aligned');
assert(DYNAMIC_BASE % 16 === 0, 'heap must start aligned');


var TOTAL_STACK = 5242880;
if (Module['TOTAL_STACK']) assert(TOTAL_STACK === Module['TOTAL_STACK'], 'the stack size can no longer be determined at runtime')

var INITIAL_INITIAL_MEMORY = Module['INITIAL_MEMORY'] || 16777216;if (!Object.getOwnPropertyDescriptor(Module, 'INITIAL_MEMORY')) Object.defineProperty(Module, 'INITIAL_MEMORY', { configurable: true, get: function() { abort('Module.INITIAL_MEMORY has been replaced with plain INITIAL_INITIAL_MEMORY (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)') } });

assert(INITIAL_INITIAL_MEMORY >= TOTAL_STACK, 'INITIAL_MEMORY should be larger than TOTAL_STACK, was ' + INITIAL_INITIAL_MEMORY + '! (TOTAL_STACK=' + TOTAL_STACK + ')');

// check for full engine support (use string 'subarray' to avoid closure compiler confusion)
assert(typeof Int32Array !== 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray !== undefined && Int32Array.prototype.set !== undefined,
       'JS engine does not provide full typed array support');








// In non-standalone/normal mode, we create the memory here.



// Create the main memory. (Note: this isn't used in STANDALONE_WASM mode since the wasm
// memory is created in the wasm, not in JS.)

  if (Module['wasmMemory']) {
    wasmMemory = Module['wasmMemory'];
  } else
  {
    wasmMemory = new WebAssembly.Memory({
      'initial': INITIAL_INITIAL_MEMORY / WASM_PAGE_SIZE
      ,
      'maximum': 2147483648 / WASM_PAGE_SIZE
    });
  }


if (wasmMemory) {
  buffer = wasmMemory.buffer;
}

// If the user provides an incorrect length, just use that length instead rather than providing the user to
// specifically provide the memory length with Module['INITIAL_MEMORY'].
INITIAL_INITIAL_MEMORY = buffer.byteLength;
assert(INITIAL_INITIAL_MEMORY % WASM_PAGE_SIZE === 0);
assert(65536 % WASM_PAGE_SIZE === 0);
updateGlobalBufferAndViews(buffer);

HEAP32[DYNAMICTOP_PTR>>2] = DYNAMIC_BASE;






// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  assert((STACK_MAX & 3) == 0);
  // The stack grows downwards
  HEAPU32[(STACK_MAX >> 2)+1] = 0x2135467;
  HEAPU32[(STACK_MAX >> 2)+2] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  HEAP32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  var cookie1 = HEAPU32[(STACK_MAX >> 2)+1];
  var cookie2 = HEAPU32[(STACK_MAX >> 2)+2];
  if (cookie1 != 0x2135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten, expected hex dwords 0x89BACDFE and 0x2135467, but received 0x' + cookie2.toString(16) + ' ' + cookie1.toString(16));
  }
  // Also test the global address 0 for integrity.
  // We don't do this with ASan because ASan does its own checks for this.
  if (HEAP32[0] !== 0x63736d65 /* 'emsc' */) abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
}





// Endianness check (note: assumes compiler arch was little-endian)
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian!';
})();

function abortFnPtrError(ptr, sig) {
	abort("Invalid function pointer " + ptr + " called with signature '" + sig + "'. Perhaps this is an invalid value (e.g. caused by calling a virtual method on a NULL pointer)? Or calling a function with an incorrect type, which will fail? (it is worth building your source files with -Werror (warnings are errors), as warnings can indicate undefined behavior which can cause this). Build with ASSERTIONS=2 for more info.");
}



var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATMAIN__    = []; // functions called when main() is to be run
var __ATEXIT__    = []; // functions called during shutdown
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;
var runtimeExited = false;


function preRun() {

  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  checkStackCookie();
  assert(!runtimeInitialized);
  runtimeInitialized = true;
  if (!Module["noFSInit"] && !FS.init.initialized) FS.init();
TTY.init();
PIPEFS.root = FS.mount(PIPEFS, {}, null);
  callRuntimeCallbacks(__ATINIT__);
}

function preMain() {
  checkStackCookie();
  FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATMAIN__);
}

function exitRuntime() {
  checkStackCookie();
  runtimeExited = true;
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
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

function addOnPreMain(cb) {
  __ATMAIN__.unshift(cb);
}

function addOnExit(cb) {
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}




// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

var Math_abs = Math.abs;
var Math_cos = Math.cos;
var Math_sin = Math.sin;
var Math_tan = Math.tan;
var Math_acos = Math.acos;
var Math_asin = Math.asin;
var Math_atan = Math.atan;
var Math_atan2 = Math.atan2;
var Math_exp = Math.exp;
var Math_log = Math.log;
var Math_sqrt = Math.sqrt;
var Math_ceil = Math.ceil;
var Math_floor = Math.floor;
var Math_pow = Math.pow;
var Math_imul = Math.imul;
var Math_fround = Math.fround;
var Math_round = Math.round;
var Math_min = Math.min;
var Math_max = Math.max;
var Math_clz32 = Math.clz32;
var Math_trunc = Math.trunc;



// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval !== 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

Module["preloadedImages"] = {}; // maps url to image data
Module["preloadedAudios"] = {}; // maps url to audio data

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what += '';
  err(what);

  ABORT = true;
  EXITSTATUS = 1;

  var output = 'abort(' + what + ') at ' + stackTrace();
  what = output;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  var e = new WebAssembly.RuntimeError(what);

  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}



addOnPreRun(function() {
  function loadDynamicLibraries(libs) {
    if (libs) {
      libs.forEach(function(lib) {
        // libraries linked to main never go away
        loadDynamicLibrary(lib, {global: true, nodelete: true});
      });
    }
  }
  // if we can load dynamic libraries synchronously, do so, otherwise, preload
  if (Module['dynamicLibraries'] && Module['dynamicLibraries'].length > 0 && !readBinary) {
    // we can't read binary data synchronously, so preload
    addRunDependency('preload_dynamicLibraries');
    Promise.all(Module['dynamicLibraries'].map(function(lib) {
      return loadDynamicLibrary(lib, {loadAsync: true, global: true, nodelete: true});
    })).then(function() {
      // we got them all, wonderful
      removeRunDependency('preload_dynamicLibraries');
    });
    return;
  }
  loadDynamicLibraries(Module['dynamicLibraries']);
});

function lookupSymbol(ptr) { // for a pointer, print out all symbols that resolve to it
  var ret = [];
  for (var i in Module) {
    if (Module[i] === ptr) ret.push(i);
  }
  print(ptr + ' is ' + ret);
}

var memoryInitializer = null;











function hasPrefix(str, prefix) {
  return String.prototype.startsWith ?
      str.startsWith(prefix) :
      str.indexOf(prefix) === 0;
}

// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  return hasPrefix(filename, dataURIPrefix);
}

var fileURIPrefix = "file://";

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return hasPrefix(filename, fileURIPrefix);
}



function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    assert(!runtimeExited, 'native function `' + displayName + '` called after runtime exit (use NO_EXIT_RUNTIME to keep it alive after main() exits)');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

var wasmBinaryFile = 'ui.wasm';
if (!isDataURI(wasmBinaryFile)) {
  wasmBinaryFile = locateFile(wasmBinaryFile);
}

function getBinary() {
  try {
    if (wasmBinary) {
      return new Uint8Array(wasmBinary);
    }

    if (readBinary) {
      return readBinary(wasmBinaryFile);
    } else {
      throw "both async and sync fetching of the wasm failed";
    }
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise() {
  // If we don't have the binary yet, and have the Fetch api, use that;
  // in some environments, like Electron's render process, Fetch api may be present, but have a different context than expected, let's only use it on the Web
  if (!wasmBinary && (ENVIRONMENT_IS_WEB || ENVIRONMENT_IS_WORKER) && typeof fetch === 'function'
      // Let's not use fetch to get objects over file:// as it's most likely Cordova which doesn't support fetch for file://
      && !isFileURI(wasmBinaryFile)
      ) {
    return fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function(response) {
      if (!response['ok']) {
        throw "failed to load wasm binary file at '" + wasmBinaryFile + "'";
      }
      return response['arrayBuffer']();
    }).catch(function () {
      return getBinary();
    });
  }
  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(getBinary);
}



// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': asmLibraryArg,
    'wasi_snapshot_preview1': asmLibraryArg
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;
    exports = relocateExports(exports, GLOBAL_BASE, 0);
    Module['asm'] = exports;
    removeRunDependency('wasm-instantiate');
  }
  // we can't run yet (except in a pthread, where we have a custom sync instantiator)
  addRunDependency('wasm-instantiate');


  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiatedSource(output) {
    // 'output' is a WebAssemblyInstantiatedSource object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above USE_PTHREADS-enabled path.
    receiveInstance(output['instance']);
  }


  function instantiateArrayBuffer(receiver) {
    return getBinaryPromise().then(function(binary) {
      return WebAssembly.instantiate(binary, info);
    }).then(receiver, function(reason) {
      err('failed to asynchronously prepare wasm: ' + reason);


      abort(reason);
    });
  }

  // Prefer streaming instantiation if available.
  function instantiateAsync() {
    if (!wasmBinary &&
        typeof WebAssembly.instantiateStreaming === 'function' &&
        !isDataURI(wasmBinaryFile) &&
        // Don't use streaming for file:// delivered objects in a webview, fetch them synchronously.
        !isFileURI(wasmBinaryFile) &&
        typeof fetch === 'function') {
      fetch(wasmBinaryFile, { credentials: 'same-origin' }).then(function (response) {
        var result = WebAssembly.instantiateStreaming(response, info);
        return result.then(receiveInstantiatedSource, function(reason) {
            // We expect the most common failure cause to be a bad MIME type for the binary,
            // in which case falling back to ArrayBuffer instantiation should work.
            err('wasm streaming compile failed: ' + reason);
            err('falling back to ArrayBuffer instantiation');
            return instantiateArrayBuffer(receiveInstantiatedSource);
          });
      });
    } else {
      return instantiateArrayBuffer(receiveInstantiatedSource);
    }
  }
  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to run the instantiation parallel
  // to any other async startup actions they are performing.
  if (Module['instantiateWasm']) {
    try {
      var exports = Module['instantiateWasm'](info, receiveInstance);
      return exports;
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
      return false;
    }
  }

  instantiateAsync();
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions
var tempDouble;
var tempI64;

// === Body ===

var ASM_CONSTS = {
  272: function($0, $1) {window.setVarName($0, $1)},  
 298: function($0, $1, $2) {window.setGridBuffer($0, $1, $2)},  
 331: function() {console.log("addcb")},  
 352: function() {console.log("delcb")},  
 373: function() {console.log("mutcb")},  
 394: function() {console.log("weight_changed_callback")},  
 433: function() {console.log("filter_changed_callback")},  
 472: function() {console.log("split_changed_callback")},  
 428473: function($0, $1) {window.setVarName($0, $1)},  
 431413: function($0, $1, $2) {window.setGridBuffer($0, $1, $2)},  
 565294: function($0, $1, $2) {window.collect_gsl_histogram($0, $1, $2);},  
 565838: function() {window.draw_gsl_histogram()},  
 566298: function($0, $1) {window.collect_scatterplot($0, $1);},  
 566740: function() {window.draw_scatterplot()},  
 567675: function($0, $1) {window.collect_barchart($0, $1)},  
 568072: function() {window.draw_barchart()},  
 568432: function($0, $1, $2) {window.collect_piechart($0, $1, $2)},  
 568765: function() {window.draw_piechart()}
};




// STATICTOP = STATIC_BASE + 1718816;
/* global initializers */  __ATINIT__.push({ func: function() { ___assign_got_enties() } }, { func: function() { ___wasm_call_ctors() } });




/* no memory initializer */
// {{PRE_LIBRARY}}


  function abortStackOverflow(allocSize) {
      abort('Stack overflow! Attempted to allocate ' + allocSize + ' bytes on the stack, but stack has only ' + (STACK_MAX - stackSave() + allocSize) + ' bytes available!');
    }
  Module["abortStackOverflow"] = abortStackOverflow;

  function callRuntimeCallbacks(callbacks) {
      while(callbacks.length > 0) {
        var callback = callbacks.shift();
        if (typeof callback == 'function') {
          callback(Module); // Pass the module as the first argument.
          continue;
        }
        var func = callback.func;
        if (typeof func === 'number') {
          if (callback.arg === undefined) {
            wasmTable.get(func)();
          } else {
            wasmTable.get(func)(callback.arg);
          }
        } else {
          func(callback.arg === undefined ? null : callback.arg);
        }
      }
    }
  Module["callRuntimeCallbacks"] = callRuntimeCallbacks;

  function demangle(func) {
      warnOnce('warning: build with  -s DEMANGLE_SUPPORT=1  to link in libcxxabi demangling');
      return func;
    }
  Module["demangle"] = demangle;

  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }
  Module["demangleAll"] = demangleAll;

  
  function dynCallLegacy(sig, ptr, args) {
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - no table for sig \'' + sig + '\'');
      if (args && args.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      if (args && args.length) {
        return Module['dynCall_' + sig].apply(null, [ptr].concat(args));
      }
      return Module['dynCall_' + sig].call(null, ptr);
    }
  Module["dynCallLegacy"] = dynCallLegacy;function dynCall(sig, ptr, args) {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of thier signature, so we rely the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.indexOf('j') != -1) {
        return dynCallLegacy(sig, ptr, args);
      }
  
      return wasmTable.get(ptr).apply(null, args)
    }
  Module["dynCall"] = dynCall;

  function jsStackTrace() {
      var error = new Error();
      if (!error.stack) {
        // IE10+ special cases: It does have callstack info, but it is only populated if an Error object is thrown,
        // so try that as a special-case.
        try {
          throw new Error();
        } catch(e) {
          error = e;
        }
        if (!error.stack) {
          return '(no stack trace available)';
        }
      }
      return error.stack.toString();
    }
  Module["jsStackTrace"] = jsStackTrace;

  function stackTrace() {
      var js = jsStackTrace();
      if (Module['extraStackTrace']) js += '\n' + Module['extraStackTrace']();
      return demangleAll(js);
    }
  Module["stackTrace"] = stackTrace;

  function unSign(value, bits) {
      if (value >= 0) {
        return value;
      }
      // Need some trickery, since if bits == 32, we are right at the limit of the
      // bits JS uses in bitshifts
      return bits <= 32 ? 2*Math.abs(1 << (bits-1)) + value
                        : Math.pow(2, bits)         + value;
    }
  Module["unSign"] = unSign;

  
  
  function _mktime(tmPtr) {
      _tzset();
      var date = new Date(((SAFE_HEAP_LOAD((((tmPtr)+(20))|0), 4, 0))|0) + 1900,
                          ((SAFE_HEAP_LOAD((((tmPtr)+(16))|0), 4, 0))|0),
                          ((SAFE_HEAP_LOAD((((tmPtr)+(12))|0), 4, 0))|0),
                          ((SAFE_HEAP_LOAD((((tmPtr)+(8))|0), 4, 0))|0),
                          ((SAFE_HEAP_LOAD((((tmPtr)+(4))|0), 4, 0))|0),
                          ((SAFE_HEAP_LOAD(((tmPtr)|0), 4, 0))|0),
                          0);
  
      // There's an ambiguous hour when the time goes back; the tm_isdst field is
      // used to disambiguate it.  Date() basically guesses, so we fix it up if it
      // guessed wrong, or fill in tm_isdst with the guess if it's -1.
      var dst = ((SAFE_HEAP_LOAD((((tmPtr)+(32))|0), 4, 0))|0);
      var guessedOffset = date.getTimezoneOffset();
      var start = new Date(date.getFullYear(), 0, 1);
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dstOffset = Math.min(winterOffset, summerOffset); // DST is in December in South
      if (dst < 0) {
        // Attention: some regions don't have DST at all.
        SAFE_HEAP_STORE((((tmPtr)+(32))|0), ((Number(summerOffset != winterOffset && dstOffset == guessedOffset))|0), 4);
      } else if ((dst > 0) != (dstOffset == guessedOffset)) {
        var nonDstOffset = Math.max(winterOffset, summerOffset);
        var trueOffset = dst > 0 ? dstOffset : nonDstOffset;
        // Don't try setMinutes(date.getMinutes() + ...) -- it's messed up.
        date.setTime(date.getTime() + (trueOffset - guessedOffset)*60000);
      }
  
      SAFE_HEAP_STORE((((tmPtr)+(24))|0), ((date.getDay())|0), 4);
      var yday = ((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))|0;
      SAFE_HEAP_STORE((((tmPtr)+(28))|0), ((yday)|0), 4);
  
      return (date.getTime() / 1000)|0;
    }
  Module["_mktime"] = _mktime;function _asctime_r(tmPtr, buf) {
      var date = {
        tm_sec: ((SAFE_HEAP_LOAD(((tmPtr)|0), 4, 0))|0),
        tm_min: ((SAFE_HEAP_LOAD((((tmPtr)+(4))|0), 4, 0))|0),
        tm_hour: ((SAFE_HEAP_LOAD((((tmPtr)+(8))|0), 4, 0))|0),
        tm_mday: ((SAFE_HEAP_LOAD((((tmPtr)+(12))|0), 4, 0))|0),
        tm_mon: ((SAFE_HEAP_LOAD((((tmPtr)+(16))|0), 4, 0))|0),
        tm_year: ((SAFE_HEAP_LOAD((((tmPtr)+(20))|0), 4, 0))|0),
        tm_wday: ((SAFE_HEAP_LOAD((((tmPtr)+(24))|0), 4, 0))|0)
      };
      var days = [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat" ];
      var months = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
                     "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];
      var s = days[date.tm_wday] + ' ' + months[date.tm_mon] +
          (date.tm_mday < 10 ? '  ' : ' ') + date.tm_mday +
          (date.tm_hour < 10 ? ' 0' : ' ') + date.tm_hour +
          (date.tm_min < 10 ? ':0' : ':') + date.tm_min +
          (date.tm_sec < 10 ? ':0' : ':') + date.tm_sec +
          ' ' + (1900 + date.tm_year) + "\n";
  
      // asctime_r is specced to behave in an undefined manner if the algorithm would attempt
      // to write out more than 26 bytes (including the null terminator).
      // See http://pubs.opengroup.org/onlinepubs/9699919799/functions/asctime.html
      // Our undefined behavior is to truncate the write to at most 26 bytes, including null terminator.
      stringToUTF8(s, buf, 26);
      return buf;
    }
  Module["_asctime_r"] = _asctime_r;function ___asctime_r(a0,a1
  ) {
  return _asctime_r(a0,a1);
  }
  Module["___asctime_r"] = ___asctime_r;

  function ___assert_fail(condition, filename, line, func) {
      abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }
  Module["___assert_fail"] = ___assert_fail;

  
  function _gmtime_r(time, tmPtr) {
      var date = new Date(((SAFE_HEAP_LOAD(((time)|0), 4, 0))|0)*1000);
      SAFE_HEAP_STORE(((tmPtr)|0), ((date.getUTCSeconds())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(4))|0), ((date.getUTCMinutes())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(8))|0), ((date.getUTCHours())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(12))|0), ((date.getUTCDate())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(16))|0), ((date.getUTCMonth())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(20))|0), ((date.getUTCFullYear()-1900)|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(24))|0), ((date.getUTCDay())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(36))|0), ((0)|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(32))|0), ((0)|0), 4);
      var start = Date.UTC(date.getUTCFullYear(), 0, 1, 0, 0, 0, 0);
      var yday = ((date.getTime() - start) / (1000 * 60 * 60 * 24))|0;
      SAFE_HEAP_STORE((((tmPtr)+(28))|0), ((yday)|0), 4);
      // Allocate a string "GMT" for us to point to.
      if (!_gmtime_r.GMTString) _gmtime_r.GMTString = allocateUTF8("GMT");
      SAFE_HEAP_STORE((((tmPtr)+(40))|0), ((_gmtime_r.GMTString)|0), 4);
      return tmPtr;
    }
  Module["_gmtime_r"] = _gmtime_r;function ___gmtime_r(a0,a1
  ) {
  return _gmtime_r(a0,a1);
  }
  Module["___gmtime_r"] = ___gmtime_r;

  
  function _localtime_r(time, tmPtr) {
      _tzset();
      var date = new Date(((SAFE_HEAP_LOAD(((time)|0), 4, 0))|0)*1000);
      SAFE_HEAP_STORE(((tmPtr)|0), ((date.getSeconds())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(4))|0), ((date.getMinutes())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(8))|0), ((date.getHours())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(12))|0), ((date.getDate())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(16))|0), ((date.getMonth())|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(20))|0), ((date.getFullYear()-1900)|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(24))|0), ((date.getDay())|0), 4);
  
      var start = new Date(date.getFullYear(), 0, 1);
      var yday = ((date.getTime() - start.getTime()) / (1000 * 60 * 60 * 24))|0;
      SAFE_HEAP_STORE((((tmPtr)+(28))|0), ((yday)|0), 4);
      SAFE_HEAP_STORE((((tmPtr)+(36))|0), ((-(date.getTimezoneOffset() * 60))|0), 4);
  
      // Attention: DST is in December in South, and some regions don't have DST at all.
      var summerOffset = new Date(date.getFullYear(), 6, 1).getTimezoneOffset();
      var winterOffset = start.getTimezoneOffset();
      var dst = (summerOffset != winterOffset && date.getTimezoneOffset() == Math.min(winterOffset, summerOffset))|0;
      SAFE_HEAP_STORE((((tmPtr)+(32))|0), ((dst)|0), 4);
  
      var zonePtr = ((SAFE_HEAP_LOAD((((__get_tzname())+(dst ? 4 : 0))|0), 4, 0))|0);
      SAFE_HEAP_STORE((((tmPtr)+(40))|0), ((zonePtr)|0), 4);
  
      return tmPtr;
    }
  Module["_localtime_r"] = _localtime_r;function ___localtime_r(a0,a1
  ) {
  return _localtime_r(a0,a1);
  }
  Module["___localtime_r"] = ___localtime_r;

  
  function setErrNo(value) {
      SAFE_HEAP_STORE(((___errno_location())|0), ((value)|0), 4);
      return value;
    }
  Module["setErrNo"] = setErrNo;function ___map_file(pathname, size) {
      setErrNo(63);
      return -1;
    }
  Module["___map_file"] = ___map_file;

  
  
  var PATH={splitPath:function(filename) {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:function(parts, allowAboveRoot) {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:function(path) {
        var isAbsolute = path.charAt(0) === '/',
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:function(path) {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:function(path) {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },extname:function(path) {
        return PATH.splitPath(path)[3];
      },join:function() {
        var paths = Array.prototype.slice.call(arguments, 0);
        return PATH.normalize(paths.join('/'));
      },join2:function(l, r) {
        return PATH.normalize(l + '/' + r);
      }};
  Module["PATH"] = PATH;
  
  
  var PATH_FS={resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path !== 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = path.charAt(0) === '/';
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter(function(p) {
          return !!p;
        }), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:function(from, to) {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  Module["PATH_FS"] = PATH_FS;
  
  var TTY={ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process['stdin']['setEncoding']('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process['stdin']['pause']();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.flush(stream.tty);
        },flush:function(stream) {
          stream.tty.ops.flush(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (ENVIRONMENT_IS_NODE) {
              // we will read data by chunks of BUFSIZE
              var BUFSIZE = 256;
              var buf = Buffer.alloc ? Buffer.alloc(BUFSIZE) : new Buffer(BUFSIZE);
              var bytesRead = 0;
  
              try {
                bytesRead = nodeFS.readSync(process.stdin.fd, buf, 0, BUFSIZE, null);
              } catch(e) {
                // Cross-platform differences: on Windows, reading EOF throws an exception, but on other OSes,
                // reading EOF returns 0. Uniformize behavior by treating the EOF exception to return 0.
                if (e.toString().indexOf('EOF') != -1) bytesRead = 0;
                else throw e;
              }
  
              if (bytesRead > 0) {
                result = buf.slice(0, bytesRead).toString('utf-8');
              } else {
                result = null;
              }
            } else
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },flush:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  Module["TTY"] = TTY;
  
  var MEMFS={ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
        }
        return node;
      },getFileDataAsRegularArray:function(node) {
        if (node.contents && node.contents.subarray) {
          var arr = [];
          for (var i = 0; i < node.usedBytes; ++i) arr.push(node.contents[i]);
          return arr; // Returns a copy of the original data.
        }
        return node.contents; // No-op, the file contents are already in a JS array. Return as-is.
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
        return;
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
          return;
        }
        if (!node.contents || node.contents.subarray) { // Resize a typed array if that is being used as the backing store.
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
          return;
        }
        // Backing with a JS array.
        if (!node.contents) node.contents = [];
        if (node.contents.length > newSize) node.contents.length = newSize;
        else while (node.contents.length < newSize) node.contents.push(0);
        node.usedBytes = newSize;
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, address, length, position, prot, flags) {
          // We don't currently support location hints for the address of the mapping
          assert(address === 0);
  
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the buffer
            // we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = FS.mmapAlloc(length);
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          if (mmapFlags & 2) {
            // MAP_PRIVATE calls need not to be synced back to underlying fs
            return 0;
          }
  
          var bytesWritten = MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  Module["MEMFS"] = MEMFS;
  
  var ERRNO_MESSAGES={0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  Module["ERRNO_MESSAGES"] = ERRNO_MESSAGES;
  
  var ERRNO_CODES={EPERM:63,ENOENT:44,ESRCH:71,EINTR:27,EIO:29,ENXIO:60,E2BIG:1,ENOEXEC:45,EBADF:8,ECHILD:12,EAGAIN:6,EWOULDBLOCK:6,ENOMEM:48,EACCES:2,EFAULT:21,ENOTBLK:105,EBUSY:10,EEXIST:20,EXDEV:75,ENODEV:43,ENOTDIR:54,EISDIR:31,EINVAL:28,ENFILE:41,EMFILE:33,ENOTTY:59,ETXTBSY:74,EFBIG:22,ENOSPC:51,ESPIPE:70,EROFS:69,EMLINK:34,EPIPE:64,EDOM:18,ERANGE:68,ENOMSG:49,EIDRM:24,ECHRNG:106,EL2NSYNC:156,EL3HLT:107,EL3RST:108,ELNRNG:109,EUNATCH:110,ENOCSI:111,EL2HLT:112,EDEADLK:16,ENOLCK:46,EBADE:113,EBADR:114,EXFULL:115,ENOANO:104,EBADRQC:103,EBADSLT:102,EDEADLOCK:16,EBFONT:101,ENOSTR:100,ENODATA:116,ETIME:117,ENOSR:118,ENONET:119,ENOPKG:120,EREMOTE:121,ENOLINK:47,EADV:122,ESRMNT:123,ECOMM:124,EPROTO:65,EMULTIHOP:36,EDOTDOT:125,EBADMSG:9,ENOTUNIQ:126,EBADFD:127,EREMCHG:128,ELIBACC:129,ELIBBAD:130,ELIBSCN:131,ELIBMAX:132,ELIBEXEC:133,ENOSYS:52,ENOTEMPTY:55,ENAMETOOLONG:37,ELOOP:32,EOPNOTSUPP:138,EPFNOSUPPORT:139,ECONNRESET:15,ENOBUFS:42,EAFNOSUPPORT:5,EPROTOTYPE:67,ENOTSOCK:57,ENOPROTOOPT:50,ESHUTDOWN:140,ECONNREFUSED:14,EADDRINUSE:3,ECONNABORTED:13,ENETUNREACH:40,ENETDOWN:38,ETIMEDOUT:73,EHOSTDOWN:142,EHOSTUNREACH:23,EINPROGRESS:26,EALREADY:7,EDESTADDRREQ:17,EMSGSIZE:35,EPROTONOSUPPORT:66,ESOCKTNOSUPPORT:137,EADDRNOTAVAIL:4,ENETRESET:39,EISCONN:30,ENOTCONN:53,ETOOMANYREFS:141,EUSERS:136,EDQUOT:19,ESTALE:72,ENOTSUP:138,ENOMEDIUM:148,EILSEQ:25,EOVERFLOW:61,ECANCELED:11,ENOTRECOVERABLE:56,EOWNERDEAD:62,ESTRPIPE:135};
  Module["ERRNO_CODES"] = ERRNO_CODES;var FS={root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,trackingDelegate:{},tracking:{openFlags:{READ:1,WRITE:2}},ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,handleFSError:function(e) {
        if (!(e instanceof FS.ErrnoError)) throw e + ' : ' + stackTrace();
        return setErrNo(e.errno);
      },lookupPath:function(path, opts) {
        path = PATH_FS.resolve(FS.cwd(), path);
        opts = opts || {};
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        for (var key in defaults) {
          if (opts[key] === undefined) {
            opts[key] = defaults[key];
          }
        }
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the path
        var parts = PATH.normalizeArray(path.split('/').filter(function(p) {
          return !!p;
        }), false);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:function(node) {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:function(parentid, name) {
        var hash = 0;
  
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:function(node) {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:function(parent, name) {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:function(parent, name, mode, rdev) {
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:function(node) {
        FS.hashRemoveNode(node);
      },isRoot:function(node) {
        return node === node.parent;
      },isMountpoint:function(node) {
        return !!node.mounted;
      },isFile:function(mode) {
        return (mode & 61440) === 32768;
      },isDir:function(mode) {
        return (mode & 61440) === 16384;
      },isLink:function(mode) {
        return (mode & 61440) === 40960;
      },isChrdev:function(mode) {
        return (mode & 61440) === 8192;
      },isBlkdev:function(mode) {
        return (mode & 61440) === 24576;
      },isFIFO:function(mode) {
        return (mode & 61440) === 4096;
      },isSocket:function(mode) {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"rs":1052672,"r+":2,"w":577,"wx":705,"xw":705,"w+":578,"wx+":706,"xw+":706,"a":1089,"ax":1217,"xa":1217,"a+":1090,"ax+":1218,"xa+":1218},modeStringToFlags:function(str) {
        var flags = FS.flagModes[str];
        if (typeof flags === 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:function(flag) {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:function(node, perms) {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.indexOf('r') !== -1 && !(node.mode & 292)) {
          return 2;
        } else if (perms.indexOf('w') !== -1 && !(node.mode & 146)) {
          return 2;
        } else if (perms.indexOf('x') !== -1 && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:function(dir) {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:function(dir, name) {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:function(dir, name, isdir) {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:function(node, flags) {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:function(fd_start, fd_end) {
        fd_start = fd_start || 0;
        fd_end = fd_end || FS.MAX_OPEN_FDS;
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:function(fd) {
        return FS.streams[fd];
      },createStream:function(stream, fd_start, fd_end) {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function(){};
          FS.FSStream.prototype = {
            object: {
              get: function() { return this.node; },
              set: function(val) { this.node = val; }
            },
            isRead: {
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              get: function() { return (this.flags & 1024); }
            }
          };
        }
        // clone it, so we can return an instance of FSStream
        var newStream = new FS.FSStream();
        for (var p in stream) {
          newStream[p] = stream[p];
        }
        stream = newStream;
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:function(fd) {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:function(stream) {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:function() {
          throw new FS.ErrnoError(70);
        }},major:function(dev) {
        return ((dev) >> 8);
      },minor:function(dev) {
        return ((dev) & 0xff);
      },makedev:function(ma, mi) {
        return ((ma) << 8 | (mi));
      },registerDevice:function(dev, ops) {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:function(dev) {
        return FS.devices[dev];
      },getMounts:function(mount) {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:function(populate, callback) {
        if (typeof(populate) === 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        };
  
        // sync all mounts
        mounts.forEach(function (mount) {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:function(type, opts, mountpoint) {
        if (typeof type === 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:function (mountpoint) {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach(function (hash) {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.indexOf(current.mount) !== -1) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:function(parent, name) {
        return parent.node_ops.lookup(parent, name);
      },mknod:function(path, mode, dev) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:function(path, mode) {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:function(path, mode) {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:function(path, mode) {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:function(path, mode, dev) {
        if (typeof(dev) === 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:function(oldpath, newpath) {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:function(old_path, new_path) {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        try {
          if (FS.trackingDelegate['willMovePath']) {
            FS.trackingDelegate['willMovePath'](old_path, new_path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
        try {
          if (FS.trackingDelegate['onMovePath']) FS.trackingDelegate['onMovePath'](old_path, new_path);
        } catch(e) {
          err("FS.trackingDelegate['onMovePath']('"+old_path+"', '"+new_path+"') threw an exception: " + e.message);
        }
      },rmdir:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:function(path) {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        try {
          if (FS.trackingDelegate['willDeletePath']) {
            FS.trackingDelegate['willDeletePath'](path);
          }
        } catch(e) {
          err("FS.trackingDelegate['willDeletePath']('"+path+"') threw an exception: " + e.message);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
        try {
          if (FS.trackingDelegate['onDeletePath']) FS.trackingDelegate['onDeletePath'](path);
        } catch(e) {
          err("FS.trackingDelegate['onDeletePath']('"+path+"') threw an exception: " + e.message);
        }
      },readlink:function(path) {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:function(path, dontFollow) {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:function(path) {
        return FS.stat(path, true);
      },chmod:function(path, mode, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:function(path, mode) {
        FS.chmod(path, mode, true);
      },fchmod:function(fd, mode) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:function(path, uid, gid, dontFollow) {
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:function(path, uid, gid) {
        FS.chown(path, uid, gid, true);
      },fchown:function(fd, uid, gid) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:function(path, len) {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path === 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:function(fd, len) {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:function(path, atime, mtime) {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:function(path, flags, mode, fd_start, fd_end) {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags === 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode === 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path === 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512)) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        }, fd_start, fd_end);
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
            err("FS.trackingDelegate error on read file: " + path);
          }
        }
        try {
          if (FS.trackingDelegate['onOpenFile']) {
            var trackingFlags = 0;
            if ((flags & 2097155) !== 1) {
              trackingFlags |= FS.tracking.openFlags.READ;
            }
            if ((flags & 2097155) !== 0) {
              trackingFlags |= FS.tracking.openFlags.WRITE;
            }
            FS.trackingDelegate['onOpenFile'](path, trackingFlags);
          }
        } catch(e) {
          err("FS.trackingDelegate['onOpenFile']('"+path+"', flags) threw an exception: " + e.message);
        }
        return stream;
      },close:function(stream) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:function(stream) {
        return stream.fd === null;
      },llseek:function(stream, offset, whence) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:function(stream, buffer, offset, length, position) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:function(stream, buffer, offset, length, position, canOwn) {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position !== 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        try {
          if (stream.path && FS.trackingDelegate['onWriteToFile']) FS.trackingDelegate['onWriteToFile'](stream.path);
        } catch(e) {
          err("FS.trackingDelegate['onWriteToFile']('"+stream.path+"') threw an exception: " + e.message);
        }
        return bytesWritten;
      },allocate:function(stream, offset, length) {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:function(stream, address, length, position, prot, flags) {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, address, length, position, prot, flags);
      },msync:function(stream, buffer, offset, length, mmapFlags) {
        if (!stream || !stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:function(stream) {
        return 0;
      },ioctl:function(stream, cmd, arg) {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:function(path, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'r';
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:function(path, data, opts) {
        opts = opts || {};
        opts.flags = opts.flags || 'w';
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data === 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:function() {
        return FS.currentPath;
      },chdir:function(path) {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:function() {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:function() {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: function() { return 0; },
          write: function(stream, buffer, offset, length, pos) { return length; }
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using Module['printErr']
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        var random_device;
        if (typeof crypto === 'object' && typeof crypto['getRandomValues'] === 'function') {
          // for modern web browsers
          var randomBuffer = new Uint8Array(1);
          random_device = function() { crypto.getRandomValues(randomBuffer); return randomBuffer[0]; };
        } else
        if (ENVIRONMENT_IS_NODE) {
          // for nodejs with or without crypto support included
          try {
            var crypto_module = require('crypto');
            // nodejs has crypto support
            random_device = function() { return crypto_module['randomBytes'](1)[0]; };
          } catch (e) {
            // nodejs doesn't have crypto support
          }
        } else
        {}
        if (!random_device) {
          // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
          random_device = function() { abort("no cryptographic support found for random_device. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };"); };
        }
        FS.createDevice('/dev', 'random', random_device);
        FS.createDevice('/dev', 'urandom', random_device);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:function() {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: function() {
            var node = FS.createNode('/proc/self', 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: function(parent, name) {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: function() { return stream.path } }
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:function() {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 'r');
        var stdout = FS.open('/dev/stdout', 'w');
        var stderr = FS.open('/dev/stderr', 'w');
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:function() {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach(function(code) {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:function() {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
        };
      },init:function(input, output, error) {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:function() {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        var fflush = Module['_fflush'];
        if (fflush) fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:function(canRead, canWrite) {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },joinPath:function(parts, forceRelative) {
        var path = PATH.join.apply(null, parts);
        if (forceRelative && path[0] == '/') path = path.substr(1);
        return path;
      },absolutePath:function(relative, base) {
        return PATH_FS.resolve(base, relative);
      },standardizePath:function(path) {
        return PATH.normalize(path);
      },findObject:function(path, dontResolveLastLink) {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (ret.exists) {
          return ret.object;
        } else {
          setErrNo(ret.error);
          return null;
        }
      },analyzePath:function(path, dontResolveLastLink) {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        };
        return ret;
      },createFolder:function(parent, name, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.mkdir(path, mode);
      },createPath:function(parent, path, canRead, canWrite) {
        parent = typeof parent === 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:function(parent, name, properties, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:function(parent, name, data, canRead, canWrite, canOwn) {
        var path = name ? PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name) : parent;
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data === 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 'w');
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:function(parent, name, input, output) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: function(stream) {
            stream.seekable = false;
          },
          close: function(stream) {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: function(stream, buffer, offset, length, pos /* ignored */) {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: function(stream, buffer, offset, length, pos) {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },createLink:function(parent, name, target, canRead, canWrite) {
        var path = PATH.join2(typeof parent === 'string' ? parent : FS.getPath(parent), name);
        return FS.symlink(target, path);
      },forceLoadFile:function(obj) {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        var success = true;
        if (typeof XMLHttpRequest !== 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            success = false;
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
        if (!success) setErrNo(29);
        return success;
      },createLazyFile:function(parent, name, url, canRead, canWrite) {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (function(from, to) {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            if (typeof Uint8Array != 'undefined') xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            } else {
              return intArrayFromString(xhr.responseText || '', true);
            }
          });
          var lazyArray = this;
          lazyArray.setDataGetter(function(chunkNum) {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof(lazyArray.chunks[chunkNum]) === "undefined") throw new Error("doXHR failed!");
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest !== 'undefined') {
          if (!ENVIRONMENT_IS_WORKER) throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
          Object.defineProperties(lazyArray, {
            length: {
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._length;
              }
            },
            chunkSize: {
              get: /** @this{Object} */ function() {
                if(!this.lengthKnown) {
                  this.cacheLength();
                }
                return this._chunkSize;
              }
            }
          });
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach(function(key) {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            if (!FS.forceLoadFile(node)) {
              throw new FS.ErrnoError(29);
            }
            return fn.apply(null, arguments);
          };
        });
        // use a custom read function
        stream_ops.read = function stream_ops_read(stream, buffer, offset, length, position) {
          if (!FS.forceLoadFile(node)) {
            throw new FS.ErrnoError(29);
          }
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:function(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) {
        Browser.init(); // XXX perhaps this method should move onto Browser?
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          var handled = false;
          Module['preloadPlugins'].forEach(function(plugin) {
            if (handled) return;
            if (plugin['canHandle'](fullname)) {
              plugin['handle'](byteArray, fullname, finish, function() {
                if (onerror) onerror();
                removeRunDependency(dep);
              });
              handled = true;
            }
          });
          if (!handled) finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          Browser.asyncLoad(url, function(byteArray) {
            processData(byteArray);
          }, onerror);
        } else {
          processData(url);
        }
      },indexedDB:function() {
        return window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
      },DB_NAME:function() {
        return 'EM_FS_' + window.location.pathname;
      },DB_VERSION:20,DB_STORE_NAME:"FILE_DATA",saveFilesToDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = function openRequest_onupgradeneeded() {
          out('creating db');
          var db = openRequest.result;
          db.createObjectStore(FS.DB_STORE_NAME);
        };
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          var transaction = db.transaction([FS.DB_STORE_NAME], 'readwrite');
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var putRequest = files.put(FS.analyzePath(path).object.contents, path);
            putRequest.onsuccess = function putRequest_onsuccess() { ok++; if (ok + fail == total) finish() };
            putRequest.onerror = function putRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },loadFilesFromDB:function(paths, onload, onerror) {
        onload = onload || function(){};
        onerror = onerror || function(){};
        var indexedDB = FS.indexedDB();
        try {
          var openRequest = indexedDB.open(FS.DB_NAME(), FS.DB_VERSION);
        } catch (e) {
          return onerror(e);
        }
        openRequest.onupgradeneeded = onerror; // no database to load from
        openRequest.onsuccess = function openRequest_onsuccess() {
          var db = openRequest.result;
          try {
            var transaction = db.transaction([FS.DB_STORE_NAME], 'readonly');
          } catch(e) {
            onerror(e);
            return;
          }
          var files = transaction.objectStore(FS.DB_STORE_NAME);
          var ok = 0, fail = 0, total = paths.length;
          function finish() {
            if (fail == 0) onload(); else onerror();
          }
          paths.forEach(function(path) {
            var getRequest = files.get(path);
            getRequest.onsuccess = function getRequest_onsuccess() {
              if (FS.analyzePath(path).exists) {
                FS.unlink(path);
              }
              FS.createDataFile(PATH.dirname(path), PATH.basename(path), getRequest.result, true, true, true);
              ok++;
              if (ok + fail == total) finish();
            };
            getRequest.onerror = function getRequest_onerror() { fail++; if (ok + fail == total) finish() };
          });
          transaction.onerror = onerror;
        };
        openRequest.onerror = onerror;
      },mmapAlloc:function(size) {
        var alignedSize = alignMemory(size, 16384);
        var ptr = _malloc(alignedSize);
        while (size < alignedSize) HEAP8[ptr + size++] = 0;
        return ptr;
      }};
  Module["FS"] = FS;var SYSCALLS={mappings:{},DEFAULT_POLLMASK:5,umask:511,calculateAt:function(dirfd, path) {
        if (path[0] !== '/') {
          // relative path
          var dir;
          if (dirfd === -100) {
            dir = FS.cwd();
          } else {
            var dirstream = FS.getStream(dirfd);
            if (!dirstream) throw new FS.ErrnoError(8);
            dir = dirstream.path;
          }
          path = PATH.join2(dir, path);
        }
        return path;
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        SAFE_HEAP_STORE(((buf)|0), ((stat.dev)|0), 4);
        SAFE_HEAP_STORE((((buf)+(4))|0), ((0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(8))|0), ((stat.ino)|0), 4);
        SAFE_HEAP_STORE((((buf)+(12))|0), ((stat.mode)|0), 4);
        SAFE_HEAP_STORE((((buf)+(16))|0), ((stat.nlink)|0), 4);
        SAFE_HEAP_STORE((((buf)+(20))|0), ((stat.uid)|0), 4);
        SAFE_HEAP_STORE((((buf)+(24))|0), ((stat.gid)|0), 4);
        SAFE_HEAP_STORE((((buf)+(28))|0), ((stat.rdev)|0), 4);
        SAFE_HEAP_STORE((((buf)+(32))|0), ((0)|0), 4);
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE((((buf)+(40))|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((buf)+(44))|0), ((tempI64[1])|0), 4));
        SAFE_HEAP_STORE((((buf)+(48))|0), ((4096)|0), 4);
        SAFE_HEAP_STORE((((buf)+(52))|0), ((stat.blocks)|0), 4);
        SAFE_HEAP_STORE((((buf)+(56))|0), (((stat.atime.getTime() / 1000)|0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(60))|0), ((0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(64))|0), (((stat.mtime.getTime() / 1000)|0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(68))|0), ((0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(72))|0), (((stat.ctime.getTime() / 1000)|0)|0), 4);
        SAFE_HEAP_STORE((((buf)+(76))|0), ((0)|0), 4);
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE((((buf)+(80))|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((buf)+(84))|0), ((tempI64[1])|0), 4));
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },doMkdir:function(path, mode) {
        // remove a trailing slash, if one - /a/b/ has basename of '', but
        // we want to create b in the context of this function
        path = PATH.normalize(path);
        if (path[path.length-1] === '/') path = path.substr(0, path.length-1);
        FS.mkdir(path, mode, 0);
        return 0;
      },doMknod:function(path, mode, dev) {
        // we don't want this in the JS API as it uses mknod to create all nodes.
        switch (mode & 61440) {
          case 32768:
          case 8192:
          case 24576:
          case 4096:
          case 49152:
            break;
          default: return -28;
        }
        FS.mknod(path, mode, dev);
        return 0;
      },doReadlink:function(path, buf, bufsize) {
        if (bufsize <= 0) return -28;
        var ret = FS.readlink(path);
  
        var len = Math.min(bufsize, lengthBytesUTF8(ret));
        var endChar = HEAP8[buf+len];
        stringToUTF8(ret, buf, bufsize+1);
        // readlink is one of the rare functions that write out a C string, but does never append a null to the output buffer(!)
        // stringToUTF8() always appends a null byte, so restore the character under the null byte after the write.
        HEAP8[buf+len] = endChar;
  
        return len;
      },doAccess:function(path, amode) {
        if (amode & ~7) {
          // need a valid mode
          return -28;
        }
        var node;
        var lookup = FS.lookupPath(path, { follow: true });
        node = lookup.node;
        if (!node) {
          return -44;
        }
        var perms = '';
        if (amode & 4) perms += 'r';
        if (amode & 2) perms += 'w';
        if (amode & 1) perms += 'x';
        if (perms /* otherwise, they've just passed F_OK */ && FS.nodePermissions(node, perms)) {
          return -2;
        }
        return 0;
      },doDup:function(path, flags, suggestFD) {
        var suggest = FS.getStream(suggestFD);
        if (suggest) FS.close(suggest);
        return FS.open(path, flags, 0, suggestFD, suggestFD).fd;
      },doReadv:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = ((SAFE_HEAP_LOAD((((iov)+(i*8))|0), 4, 0))|0);
          var len = ((SAFE_HEAP_LOAD((((iov)+(i*8 + 4))|0), 4, 0))|0);
          var curr = FS.read(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
          if (curr < len) break; // nothing more to read
        }
        return ret;
      },doWritev:function(stream, iov, iovcnt, offset) {
        var ret = 0;
        for (var i = 0; i < iovcnt; i++) {
          var ptr = ((SAFE_HEAP_LOAD((((iov)+(i*8))|0), 4, 0))|0);
          var len = ((SAFE_HEAP_LOAD((((iov)+(i*8 + 4))|0), 4, 0))|0);
          var curr = FS.write(stream, HEAP8,ptr, len, offset);
          if (curr < 0) return -1;
          ret += curr;
        }
        return ret;
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = ((SAFE_HEAP_LOAD((((SYSCALLS.varargs)-(4))|0), 4, 0))|0);
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      },get64:function(low, high) {
        if (low >= 0) assert(high === 0);
        else assert(high === -1);
        return low;
      }};
  Module["SYSCALLS"] = SYSCALLS;function ___sys__newselect(nfds, readfds, writefds, exceptfds, timeout) {try {
  
      // readfds are supported,
      // writefds checks socket open status
      // exceptfds not supported
      // timeout is always 0 - fully async
      assert(nfds <= 64, 'nfds must be less than or equal to 64');  // fd sets have 64 bits // TODO: this could be 1024 based on current musl headers
      assert(!exceptfds, 'exceptfds not supported');
  
      var total = 0;
      
      var srcReadLow = (readfds ? ((SAFE_HEAP_LOAD(((readfds)|0), 4, 0))|0) : 0),
          srcReadHigh = (readfds ? ((SAFE_HEAP_LOAD((((readfds)+(4))|0), 4, 0))|0) : 0);
      var srcWriteLow = (writefds ? ((SAFE_HEAP_LOAD(((writefds)|0), 4, 0))|0) : 0),
          srcWriteHigh = (writefds ? ((SAFE_HEAP_LOAD((((writefds)+(4))|0), 4, 0))|0) : 0);
      var srcExceptLow = (exceptfds ? ((SAFE_HEAP_LOAD(((exceptfds)|0), 4, 0))|0) : 0),
          srcExceptHigh = (exceptfds ? ((SAFE_HEAP_LOAD((((exceptfds)+(4))|0), 4, 0))|0) : 0);
  
      var dstReadLow = 0,
          dstReadHigh = 0;
      var dstWriteLow = 0,
          dstWriteHigh = 0;
      var dstExceptLow = 0,
          dstExceptHigh = 0;
  
      var allLow = (readfds ? ((SAFE_HEAP_LOAD(((readfds)|0), 4, 0))|0) : 0) |
                   (writefds ? ((SAFE_HEAP_LOAD(((writefds)|0), 4, 0))|0) : 0) |
                   (exceptfds ? ((SAFE_HEAP_LOAD(((exceptfds)|0), 4, 0))|0) : 0);
      var allHigh = (readfds ? ((SAFE_HEAP_LOAD((((readfds)+(4))|0), 4, 0))|0) : 0) |
                    (writefds ? ((SAFE_HEAP_LOAD((((writefds)+(4))|0), 4, 0))|0) : 0) |
                    (exceptfds ? ((SAFE_HEAP_LOAD((((exceptfds)+(4))|0), 4, 0))|0) : 0);
  
      var check = function(fd, low, high, val) {
        return (fd < 32 ? (low & val) : (high & val));
      };
  
      for (var fd = 0; fd < nfds; fd++) {
        var mask = 1 << (fd % 32);
        if (!(check(fd, allLow, allHigh, mask))) {
          continue;  // index isn't in the set
        }
  
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
  
        var flags = SYSCALLS.DEFAULT_POLLMASK;
  
        if (stream.stream_ops.poll) {
          flags = stream.stream_ops.poll(stream);
        }
  
        if ((flags & 1) && check(fd, srcReadLow, srcReadHigh, mask)) {
          fd < 32 ? (dstReadLow = dstReadLow | mask) : (dstReadHigh = dstReadHigh | mask);
          total++;
        }
        if ((flags & 4) && check(fd, srcWriteLow, srcWriteHigh, mask)) {
          fd < 32 ? (dstWriteLow = dstWriteLow | mask) : (dstWriteHigh = dstWriteHigh | mask);
          total++;
        }
        if ((flags & 2) && check(fd, srcExceptLow, srcExceptHigh, mask)) {
          fd < 32 ? (dstExceptLow = dstExceptLow | mask) : (dstExceptHigh = dstExceptHigh | mask);
          total++;
        }
      }
  
      if (readfds) {
        SAFE_HEAP_STORE(((readfds)|0), ((dstReadLow)|0), 4);
        SAFE_HEAP_STORE((((readfds)+(4))|0), ((dstReadHigh)|0), 4);
      }
      if (writefds) {
        SAFE_HEAP_STORE(((writefds)|0), ((dstWriteLow)|0), 4);
        SAFE_HEAP_STORE((((writefds)+(4))|0), ((dstWriteHigh)|0), 4);
      }
      if (exceptfds) {
        SAFE_HEAP_STORE(((exceptfds)|0), ((dstExceptLow)|0), 4);
        SAFE_HEAP_STORE((((exceptfds)+(4))|0), ((dstExceptHigh)|0), 4);
      }
      
      return total;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys__newselect"] = ___sys__newselect;

  function ___sys_access(path, amode) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doAccess(path, amode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_access"] = ___sys_access;

  function ___sys_chdir(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.chdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_chdir"] = ___sys_chdir;

  function ___sys_chmod(path, mode) {try {
  
      path = SYSCALLS.getStr(path);
      FS.chmod(path, mode);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_chmod"] = ___sys_chmod;

  function ___sys_dup(fd) {try {
  
      var old = SYSCALLS.getStreamFromFD(fd);
      return FS.open(old.path, old.flags, 0).fd;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_dup"] = ___sys_dup;

  function ___sys_dup2(oldfd, suggestFD) {try {
  
      var old = SYSCALLS.getStreamFromFD(oldfd);
      if (old.fd === suggestFD) return suggestFD;
      return SYSCALLS.doDup(old.path, old.flags, suggestFD);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_dup2"] = ___sys_dup2;

  function ___sys_fcntl64(fd, cmd, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.open(stream.path, stream.flags, 0, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 12:
        /* case 12: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          SAFE_HEAP_STORE((((arg)+(offset))|0), ((2)|0), 2);
          return 0;
        }
        case 13:
        case 14:
        /* case 13: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 14: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fnctl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_fcntl64"] = ___sys_fcntl64;

  function ___sys_fstat64(fd, buf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return SYSCALLS.doStat(FS.stat, stream.path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_fstat64"] = ___sys_fstat64;

  function ___sys_getcwd(buf, size) {try {
  
      if (size === 0) return -28;
      var cwd = FS.cwd();
      var cwdLengthInBytes = lengthBytesUTF8(cwd);
      if (size < cwdLengthInBytes + 1) return -68;
      stringToUTF8(cwd, buf, size);
      return buf;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_getcwd"] = ___sys_getcwd;

  
  function ___sys_getegid32() {
      return 0;
    }
  Module["___sys_getegid32"] = ___sys_getegid32;function ___sys_getuid32(
  ) {
  return ___sys_getegid32();
  }
  Module["___sys_getuid32"] = ___sys_getuid32;

  function ___sys_ioctl(fd, op, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          SAFE_HEAP_STORE(((argp)|0), ((0)|0), 4);
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: abort('bad ioctl syscall ' + op);
      }
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_ioctl"] = ___sys_ioctl;

  function ___sys_lstat64(path, buf) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.lstat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_lstat64"] = ___sys_lstat64;

  function ___sys_mkdir(path, mode) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doMkdir(path, mode);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_mkdir"] = ___sys_mkdir;

  
  function syscallMunmap(addr, len) {
      if ((addr | 0) === -1 || len === 0) {
        return -28;
      }
      // TODO: support unmmap'ing parts of allocations
      var info = SYSCALLS.mappings[addr];
      if (!info) return 0;
      if (len === info.len) {
        var stream = FS.getStream(info.fd);
        if (info.prot & 2) {
          SYSCALLS.doMsync(addr, stream, len, info.flags, info.offset);
        }
        FS.munmap(stream);
        SYSCALLS.mappings[addr] = null;
        if (info.allocated) {
          _free(info.malloc);
        }
      }
      return 0;
    }
  Module["syscallMunmap"] = syscallMunmap;function ___sys_munmap(addr, len) {try {
  
      return syscallMunmap(addr, len);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_munmap"] = ___sys_munmap;

  function ___sys_open(path, flags, varargs) {SYSCALLS.varargs = varargs;
  try {
  
      var pathname = SYSCALLS.getStr(path);
      var mode = SYSCALLS.get();
      var stream = FS.open(pathname, flags, mode);
      return stream.fd;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_open"] = ___sys_open;

  
  var PIPEFS={BUCKET_BUFFER_SIZE:8192,mount:function (mount) {
        // Do not pollute the real root directory or its child nodes with pipes
        // Looks like it is OK to create another pseudo-root node not linked to the FS.root hierarchy this way
        return FS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createPipe:function () {
        var pipe = {
          buckets: []
        };
  
        pipe.buckets.push({
          buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
          offset: 0,
          roffset: 0
        });
  
        var rName = PIPEFS.nextname();
        var wName = PIPEFS.nextname();
        var rNode = FS.createNode(PIPEFS.root, rName, 4096, 0);
        var wNode = FS.createNode(PIPEFS.root, wName, 4096, 0);
  
        rNode.pipe = pipe;
        wNode.pipe = pipe;
  
        var readableStream = FS.createStream({
          path: rName,
          node: rNode,
          flags: FS.modeStringToFlags('r'),
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        });
        rNode.stream = readableStream;
  
        var writableStream = FS.createStream({
          path: wName,
          node: wNode,
          flags: FS.modeStringToFlags('w'),
          seekable: false,
          stream_ops: PIPEFS.stream_ops
        });
        wNode.stream = writableStream;
  
        return {
          readable_fd: readableStream.fd,
          writable_fd: writableStream.fd
        };
      },stream_ops:{poll:function (stream) {
          var pipe = stream.node.pipe;
  
          if ((stream.flags & 2097155) === 1) {
            return (256 | 4);
          } else {
            if (pipe.buckets.length > 0) {
              for (var i = 0; i < pipe.buckets.length; i++) {
                var bucket = pipe.buckets[i];
                if (bucket.offset - bucket.roffset > 0) {
                  return (64 | 1);
                }
              }
            }
          }
  
          return 0;
        },ioctl:function (stream, request, varargs) {
          return ERRNO_CODES.EINVAL;
        },fsync:function (stream) {
          return ERRNO_CODES.EINVAL;
        },read:function (stream, buffer, offset, length, position /* ignored */) {
          var pipe = stream.node.pipe;
          var currentLength = 0;
  
          for (var i = 0; i < pipe.buckets.length; i++) {
            var bucket = pipe.buckets[i];
            currentLength += bucket.offset - bucket.roffset;
          }
  
          assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
          var data = buffer.subarray(offset, offset + length);
  
          if (length <= 0) {
            return 0;
          }
          if (currentLength == 0) {
            // Behave as if the read end is always non-blocking
            throw new FS.ErrnoError(ERRNO_CODES.EAGAIN);
          }
          var toRead = Math.min(currentLength, length);
  
          var totalRead = toRead;
          var toRemove = 0;
  
          for (var i = 0; i < pipe.buckets.length; i++) {
            var currBucket = pipe.buckets[i];
            var bucketSize = currBucket.offset - currBucket.roffset;
  
            if (toRead <= bucketSize) {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
              if (toRead < bucketSize) {
                tmpSlice = tmpSlice.subarray(0, toRead);
                currBucket.roffset += toRead;
              } else {
                toRemove++;
              }
              data.set(tmpSlice);
              break;
            } else {
              var tmpSlice = currBucket.buffer.subarray(currBucket.roffset, currBucket.offset);
              data.set(tmpSlice);
              data = data.subarray(tmpSlice.byteLength);
              toRead -= tmpSlice.byteLength;
              toRemove++;
            }
          }
  
          if (toRemove && toRemove == pipe.buckets.length) {
            // Do not generate excessive garbage in use cases such as
            // write several bytes, read everything, write several bytes, read everything...
            toRemove--;
            pipe.buckets[toRemove].offset = 0;
            pipe.buckets[toRemove].roffset = 0;
          }
  
          pipe.buckets.splice(0, toRemove);
  
          return totalRead;
        },write:function (stream, buffer, offset, length, position /* ignored */) {
          var pipe = stream.node.pipe;
  
          assert(buffer instanceof ArrayBuffer || ArrayBuffer.isView(buffer));
          var data = buffer.subarray(offset, offset + length);
  
          var dataLen = data.byteLength;
          if (dataLen <= 0) {
            return 0;
          }
  
          var currBucket = null;
  
          if (pipe.buckets.length == 0) {
            currBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: 0,
              roffset: 0
            };
            pipe.buckets.push(currBucket);
          } else {
            currBucket = pipe.buckets[pipe.buckets.length - 1];
          }
  
          assert(currBucket.offset <= PIPEFS.BUCKET_BUFFER_SIZE);
  
          var freeBytesInCurrBuffer = PIPEFS.BUCKET_BUFFER_SIZE - currBucket.offset;
          if (freeBytesInCurrBuffer >= dataLen) {
            currBucket.buffer.set(data, currBucket.offset);
            currBucket.offset += dataLen;
            return dataLen;
          } else if (freeBytesInCurrBuffer > 0) {
            currBucket.buffer.set(data.subarray(0, freeBytesInCurrBuffer), currBucket.offset);
            currBucket.offset += freeBytesInCurrBuffer;
            data = data.subarray(freeBytesInCurrBuffer, data.byteLength);
          }
  
          var numBuckets = (data.byteLength / PIPEFS.BUCKET_BUFFER_SIZE) | 0;
          var remElements = data.byteLength % PIPEFS.BUCKET_BUFFER_SIZE;
  
          for (var i = 0; i < numBuckets; i++) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: PIPEFS.BUCKET_BUFFER_SIZE,
              roffset: 0
            };
            pipe.buckets.push(newBucket);
            newBucket.buffer.set(data.subarray(0, PIPEFS.BUCKET_BUFFER_SIZE));
            data = data.subarray(PIPEFS.BUCKET_BUFFER_SIZE, data.byteLength);
          }
  
          if (remElements > 0) {
            var newBucket = {
              buffer: new Uint8Array(PIPEFS.BUCKET_BUFFER_SIZE),
              offset: data.byteLength,
              roffset: 0
            };
            pipe.buckets.push(newBucket);
            newBucket.buffer.set(data);
          }
  
          return dataLen;
        },close:function (stream) {
          var pipe = stream.node.pipe;
          pipe.buckets = null;
        }},nextname:function () {
        if (!PIPEFS.nextname.current) {
          PIPEFS.nextname.current = 0;
        }
        return 'pipe[' + (PIPEFS.nextname.current++) + ']';
      }};
  Module["PIPEFS"] = PIPEFS;function ___sys_pipe(fdPtr) {try {
  
      if (fdPtr == 0) {
        throw new FS.ErrnoError(21);
      }
  
      var res = PIPEFS.createPipe();
  
      SAFE_HEAP_STORE(((fdPtr)|0), ((res.readable_fd)|0), 4);
      SAFE_HEAP_STORE((((fdPtr)+(4))|0), ((res.writable_fd)|0), 4);
  
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_pipe"] = ___sys_pipe;

  function ___sys_prlimit64(pid, resource, new_limit, old_limit) {try {
  
      if (old_limit) { // just report no limits
        SAFE_HEAP_STORE(((old_limit)|0), ((-1)|0), 4);  // RLIM_INFINITY
        SAFE_HEAP_STORE((((old_limit)+(4))|0), ((-1)|0), 4);  // RLIM_INFINITY
        SAFE_HEAP_STORE((((old_limit)+(8))|0), ((-1)|0), 4);  // RLIM_INFINITY
        SAFE_HEAP_STORE((((old_limit)+(12))|0), ((-1)|0), 4);  // RLIM_INFINITY
      }
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_prlimit64"] = ___sys_prlimit64;

  function ___sys_read(fd, buf, count) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      return FS.read(stream, HEAP8,buf, count);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_read"] = ___sys_read;

  function ___sys_readlink(path, buf, bufsize) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doReadlink(path, buf, bufsize);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_readlink"] = ___sys_readlink;

  function ___sys_rename(old_path, new_path) {try {
  
      old_path = SYSCALLS.getStr(old_path);
      new_path = SYSCALLS.getStr(new_path);
      FS.rename(old_path, new_path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_rename"] = ___sys_rename;

  function ___sys_rmdir(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.rmdir(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_rmdir"] = ___sys_rmdir;

  function ___sys_stat64(path, buf) {try {
  
      path = SYSCALLS.getStr(path);
      return SYSCALLS.doStat(FS.stat, path, buf);
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_stat64"] = ___sys_stat64;

  function ___sys_ugetrlimit(resource, rlim) {try {
  
      SAFE_HEAP_STORE(((rlim)|0), ((-1)|0), 4);  // RLIM_INFINITY
      SAFE_HEAP_STORE((((rlim)+(4))|0), ((-1)|0), 4);  // RLIM_INFINITY
      SAFE_HEAP_STORE((((rlim)+(8))|0), ((-1)|0), 4);  // RLIM_INFINITY
      SAFE_HEAP_STORE((((rlim)+(12))|0), ((-1)|0), 4);  // RLIM_INFINITY
      return 0; // just report no limits
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_ugetrlimit"] = ___sys_ugetrlimit;

  function ___sys_unlink(path) {try {
  
      path = SYSCALLS.getStr(path);
      FS.unlink(path);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_unlink"] = ___sys_unlink;

  function ___sys_wait4(pid, wstart, options, rusage) {try {
  
      abort('cannot wait on child processes');
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return -e.errno;
  }
  }
  Module["___sys_wait4"] = ___sys_wait4;

  function ___wait() {}
  Module["___wait"] = ___wait;

  
  function _exit(status) {
      // void _exit(int status);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/exit.html
      exit(status);
    }
  Module["_exit"] = _exit;function __exit(a0
  ) {
  return _exit(a0);
  }
  Module["__exit"] = __exit;

  function _abort() {
      abort();
    }
  Module["_abort"] = _abort;

  function _atexit(func, arg) {
    }
  Module["_atexit"] = _atexit;

  function _c_xvasprintf(
  ) {
  if (!Module['_c_xvasprintf']) abort("external function 'c_xvasprintf' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_c_xvasprintf'].apply(null, arguments);
  }

  
  var _emscripten_get_now;if (ENVIRONMENT_IS_NODE) {
    _emscripten_get_now = function() {
      var t = process['hrtime']();
      return t[0] * 1e3 + t[1] / 1e6;
    };
  } else if (typeof dateNow !== 'undefined') {
    _emscripten_get_now = dateNow;
  } else _emscripten_get_now = function() { return performance.now(); }
  ;
  Module["_emscripten_get_now"] = _emscripten_get_now;
  
  var _emscripten_get_now_is_monotonic=true;;
  Module["_emscripten_get_now_is_monotonic"] = _emscripten_get_now_is_monotonic;function _clock_gettime(clk_id, tp) {
      // int clock_gettime(clockid_t clk_id, struct timespec *tp);
      var now;
      if (clk_id === 0) {
        now = Date.now();
      } else if ((clk_id === 1 || clk_id === 4) && _emscripten_get_now_is_monotonic) {
        now = _emscripten_get_now();
      } else {
        setErrNo(28);
        return -1;
      }
      SAFE_HEAP_STORE(((tp)|0), (((now/1000)|0)|0), 4); // seconds
      SAFE_HEAP_STORE((((tp)+(4))|0), ((((now % 1000)*1000*1000)|0)|0), 4); // nanoseconds
      return 0;
    }
  Module["_clock_gettime"] = _clock_gettime;

  function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      code -= 1024;
      var args = readAsmConstArgs(sigPtr, argbuf);
      return ASM_CONSTS[code].apply(null, args);
    }
  Module["_emscripten_asm_const_int"] = _emscripten_asm_const_int;

  function _emscripten_get_sbrk_ptr() {
      return 1719824;
    }
  Module["_emscripten_get_sbrk_ptr"] = _emscripten_get_sbrk_ptr;

  
  function _longjmp(env, value) {
      _setThrew(env, value || 1);
      throw 'longjmp';
    }
  Module["_longjmp"] = _longjmp;function _emscripten_longjmp(env, value) {
      _longjmp(env, value);
    }
  Module["_emscripten_longjmp"] = _emscripten_longjmp;

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }
  Module["_emscripten_memcpy_big"] = _emscripten_memcpy_big;

  
  function _emscripten_get_heap_size() {
      return HEAPU8.length;
    }
  Module["_emscripten_get_heap_size"] = _emscripten_get_heap_size;
  
  function emscripten_realloc_buffer(size) {
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - buffer.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
        updateGlobalBufferAndViews(wasmMemory.buffer);
        return 1 /*success*/;
      } catch(e) {
        console.error('emscripten_realloc_buffer: Attempted to grow heap from ' + buffer.byteLength  + ' bytes to ' + size + ' bytes, but got error: ' + e);
      }
    }
  Module["emscripten_realloc_buffer"] = emscripten_realloc_buffer;function _emscripten_resize_heap(requestedSize) {
      requestedSize = requestedSize >>> 0;
      var oldSize = _emscripten_get_heap_size();
      // With pthreads, races can happen (another thread might increase the size in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
  
      // Memory resize rules:
      // 1. When resizing, always produce a resized heap that is at least 16MB (to avoid tiny heap sizes receiving lots of repeated resizes at startup)
      // 2. Always increase heap size to at least the requested size, rounded up to next page multiple.
      // 3a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap geometrically: increase the heap size according to 
      //                                         MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%),
      //                                         At most overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 3b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap linearly: increase the heap size by at least MEMORY_GROWTH_LINEAR_STEP bytes.
      // 4. Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 5. If we were unable to allocate as much memory, it may be due to over-eager decision to excessively reserve due to (3) above.
      //    Hence if an allocation fails, cut down on the amount of excess growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit was set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = 2147483648;
      if (requestedSize > maxHeapSize) {
        err('Cannot enlarge memory, asked to go up to ' + requestedSize + ' bytes, but the limit is ' + maxHeapSize + ' bytes!');
        return false;
      }
  
      var minHeapSize = 16777216;
  
      // Loop through potential heap size increases. If we attempt a too eager reservation that fails, cut down on the
      // attempted size and reserve a smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for(var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(minHeapSize, requestedSize, overGrownHeapSize), 65536));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err('Failed to grow the heap from ' + oldSize + ' bytes to ' + newSize + ' bytes, not enough memory!');
      return false;
    }
  Module["_emscripten_resize_heap"] = _emscripten_resize_heap;

  function _emscripten_stack_get_end() {
      // TODO(sbc): rename STACK_MAX -> STACK_END?
      return STACK_MAX;
    }
  Module["_emscripten_stack_get_end"] = _emscripten_stack_get_end;

  
  
  var ENV={};
  Module["ENV"] = ENV;
  
  function getExecutableName() {
      return thisProgram || './this.program';
    }
  Module["getExecutableName"] = getExecutableName;function getEnvStrings() {
      if (!getEnvStrings.strings) {
        // Default values.
        // Deterministic language detection, ignore the browser's language.
        var lang = 'C.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + '=' + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }
  Module["getEnvStrings"] = getEnvStrings;function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      getEnvStrings().forEach(function(string, i) {
        var ptr = environ_buf + bufSize;
        SAFE_HEAP_STORE((((__environ)+(i * 4))|0), ((ptr)|0), 4);
        writeAsciiToMemory(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    }
  Module["_environ_get"] = _environ_get;

  function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings();
      SAFE_HEAP_STORE(((penviron_count)|0), ((strings.length)|0), 4);
      var bufSize = 0;
      strings.forEach(function(string) {
        bufSize += string.length + 1;
      });
      SAFE_HEAP_STORE(((penviron_buf_size)|0), ((bufSize)|0), 4);
      return 0;
    }
  Module["_environ_sizes_get"] = _environ_sizes_get;

  function _execve(path, argv, envp) {
      // int execve(const char *pathname, char *const argv[],
      //            char *const envp[]);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/exec.html
      // We don't support executing external code.
      setErrNo(45);
      return -1;
    }
  Module["_execve"] = _execve;


  function _fd_close(fd) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }
  Module["_fd_close"] = _fd_close;

  function _fd_fdstat_get(fd, pbuf) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      // All character devices are terminals (other things a Linux system would
      // assume is a character device, like the mouse, we have special APIs for).
      var type = stream.tty ? 2 :
                 FS.isDir(stream.mode) ? 3 :
                 FS.isLink(stream.mode) ? 7 :
                 4;
      SAFE_HEAP_STORE(((pbuf)|0), ((type)|0), 1);
      // TODO SAFE_HEAP_STORE((((pbuf)+(2))|0), ((?)|0), 2);
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE((((pbuf)+(8))|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((pbuf)+(12))|0), ((tempI64[1])|0), 4));
      // TODO (tempI64 = [?>>>0,(tempDouble=?,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE((((pbuf)+(16))|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((pbuf)+(20))|0), ((tempI64[1])|0), 4));
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }
  Module["_fd_fdstat_get"] = _fd_fdstat_get;

  function _fd_read(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doReadv(stream, iov, iovcnt);
      SAFE_HEAP_STORE(((pnum)|0), ((num)|0), 4)
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }
  Module["_fd_read"] = _fd_read;

  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {try {
  
      
      var stream = SYSCALLS.getStreamFromFD(fd);
      var HIGH_OFFSET = 0x100000000; // 2^32
      // use an unsigned operator on low and shift high by 32-bits
      var offset = offset_high * HIGH_OFFSET + (offset_low >>> 0);
  
      var DOUBLE_LIMIT = 0x20000000000000; // 2^53
      // we also check for equality since DOUBLE_LIMIT + 1 == DOUBLE_LIMIT
      if (offset <= -DOUBLE_LIMIT || offset >= DOUBLE_LIMIT) {
        return -61;
      }
  
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math_abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math_min((+(Math_floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math_ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],SAFE_HEAP_STORE(((newOffset)|0), ((tempI64[0])|0), 4),SAFE_HEAP_STORE((((newOffset)+(4))|0), ((tempI64[1])|0), 4));
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }
  Module["_fd_seek"] = _fd_seek;

  function _fd_write(fd, iov, iovcnt, pnum) {try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = SYSCALLS.doWritev(stream, iov, iovcnt);
      SAFE_HEAP_STORE(((pnum)|0), ((num)|0), 4)
      return 0;
    } catch (e) {
    if (typeof FS === 'undefined' || !(e instanceof FS.ErrnoError)) abort(e);
    return e.errno;
  }
  }
  Module["_fd_write"] = _fd_write;

  function _fork() {
      // pid_t fork(void);
      // http://pubs.opengroup.org/onlinepubs/000095399/functions/fork.html
      // We don't support multiple processes.
      setErrNo(6);
      return -1;
    }
  Module["_fork"] = _fork;

  function _fp$__assert_fail$viiii(
  ) {
  if (!Module['_fp$__assert_fail$viiii']) abort("external function 'fp$__assert_fail$viiii' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_fp$__assert_fail$viiii'].apply(null, arguments);
  }

  function _fp$emscripten_longjmp$vii(
  ) {
  if (!Module['_fp$emscripten_longjmp$vii']) abort("external function 'fp$emscripten_longjmp$vii' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_fp$emscripten_longjmp$vii'].apply(null, arguments);
  }

  function _fp$gmtime_r$iii(
  ) {
  if (!Module['_fp$gmtime_r$iii']) abort("external function 'fp$gmtime_r$iii' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_fp$gmtime_r$iii'].apply(null, arguments);
  }

  function _fp$localtime_r$iii(
  ) {
  if (!Module['_fp$localtime_r$iii']) abort("external function 'fp$localtime_r$iii' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_fp$localtime_r$iii'].apply(null, arguments);
  }

  function _getTempRet0() {
      return (getTempRet0() | 0);
    }
  Module["_getTempRet0"] = _getTempRet0;

  function _getpwuid() { throw 'getpwuid: TODO' }
  Module["_getpwuid"] = _getpwuid;



  function _mktime_z(
  ) {
  if (!Module['_mktime_z']) abort("external function 'mktime_z' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_mktime_z'].apply(null, arguments);
  }

  function _popen(
  ) {
  if (!Module['_popen']) abort("external function 'popen' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['_popen'].apply(null, arguments);
  }

  function _pthread_mutexattr_destroy() {}
  Module["_pthread_mutexattr_destroy"] = _pthread_mutexattr_destroy;

  function _pthread_mutexattr_init() {}
  Module["_pthread_mutexattr_init"] = _pthread_mutexattr_init;

  function _pthread_mutexattr_settype() {}
  Module["_pthread_mutexattr_settype"] = _pthread_mutexattr_settype;

  function _setTempRet0($i) {
      setTempRet0(($i) | 0);
    }
  Module["_setTempRet0"] = _setTempRet0;

  function _setitimer() {
      throw 'setitimer() is not implemented yet';
    }
  Module["_setitimer"] = _setitimer;

  function _sigaction(signum, act, oldact) {
      //int sigaction(int signum, const struct sigaction *act, struct sigaction *oldact);
      err('Calling stub instead of sigaction()');
      return 0;
    }
  Module["_sigaction"] = _sigaction;

  function _sigaddset(set, signum) {
      SAFE_HEAP_STORE(((set)|0), ((((SAFE_HEAP_LOAD(((set)|0), 4, 0))|0)| (1 << (signum-1)))|0), 4);
      return 0;
    }
  Module["_sigaddset"] = _sigaddset;

  function _sigemptyset(set) {
      SAFE_HEAP_STORE(((set)|0), ((0)|0), 4);
      return 0;
    }
  Module["_sigemptyset"] = _sigemptyset;

  
  var __sigalrm_handler=0;
  Module["__sigalrm_handler"] = __sigalrm_handler;function _signal(sig, func) {
      if (sig == 14 /*SIGALRM*/) {
        __sigalrm_handler = func;
      } else {
        err('Calling stub instead of signal()');
      }
      return 0;
    }
  Module["_signal"] = _signal;

  function _sigprocmask() {
      err('Calling stub instead of sigprocmask()');
      return 0;
    }
  Module["_sigprocmask"] = _sigprocmask;

  
  function __isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  Module["__isLeapYear"] = __isLeapYear;
  
  function __arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {
        // no-op
      }
      return sum;
    }
  Module["__arraySum"] = __arraySum;
  
  
  var __MONTH_DAYS_LEAP=[31,29,31,30,31,30,31,31,30,31,30,31];
  Module["__MONTH_DAYS_LEAP"] = __MONTH_DAYS_LEAP;
  
  var __MONTH_DAYS_REGULAR=[31,28,31,30,31,30,31,31,30,31,30,31];
  Module["__MONTH_DAYS_REGULAR"] = __MONTH_DAYS_REGULAR;function __addDays(date, days) {
      var newDate = new Date(date.getTime());
      while(days > 0) {
        var leap = __isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1)
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }
  Module["__addDays"] = __addDays;function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
  
      var tm_zone = ((SAFE_HEAP_LOAD((((tm)+(40))|0), 4, 0))|0);
  
      var date = {
        tm_sec: ((SAFE_HEAP_LOAD(((tm)|0), 4, 0))|0),
        tm_min: ((SAFE_HEAP_LOAD((((tm)+(4))|0), 4, 0))|0),
        tm_hour: ((SAFE_HEAP_LOAD((((tm)+(8))|0), 4, 0))|0),
        tm_mday: ((SAFE_HEAP_LOAD((((tm)+(12))|0), 4, 0))|0),
        tm_mon: ((SAFE_HEAP_LOAD((((tm)+(16))|0), 4, 0))|0),
        tm_year: ((SAFE_HEAP_LOAD((((tm)+(20))|0), 4, 0))|0),
        tm_wday: ((SAFE_HEAP_LOAD((((tm)+(24))|0), 4, 0))|0),
        tm_yday: ((SAFE_HEAP_LOAD((((tm)+(28))|0), 4, 0))|0),
        tm_isdst: ((SAFE_HEAP_LOAD((((tm)+(32))|0), 4, 0))|0),
        tm_gmtoff: ((SAFE_HEAP_LOAD((((tm)+(36))|0), 4, 0))|0),
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
  
      var pattern = UTF8ToString(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',                      // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',                      // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',                // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',                // Replaced by the locale's alternative time representation.
        '%Ey': '%y',                      // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',                      // Replaced by the full alternative year representation.
        '%Od': '%d',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',                      // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',                      // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',                      // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',                      // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',                      // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',                      // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',                      // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',                      // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',                      // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',                      // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y',                      // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value === 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      }
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        }
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      }
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      }
  
      function getWeekBasedYear(date) {
          var thisDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            } else {
              return thisDate.getFullYear();
            }
          } else {
            return thisDate.getFullYear()-1;
          }
      }
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls((year/100)|0,2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
  
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday+__arraySum(__isLeapYear(date.tm_year+1900) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          } else {
            return 'PM';
          }
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          return date.tm_wday || 7;
        },
        '%U': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Sunday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year+1900, 0, 1);
          var firstSunday = janFirst.getDay() === 0 ? janFirst : __addDays(janFirst, 7-janFirst.getDay());
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Sunday?
          if (compareByDay(firstSunday, endDate) < 0) {
            // calculate difference in days between first Sunday and endDate
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstSundayUntilEndJanuary = 31-firstSunday.getDate();
            var days = firstSundayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
  
          return compareByDay(firstSunday, janFirst) === 0 ? '01': '00';
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var janFourthThisYear = new Date(date.tm_year+1900, 0, 4);
          var janFourthNextYear = new Date(date.tm_year+1901, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          var endDate = __addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          if (compareByDay(endDate, firstWeekStartThisYear) < 0) {
            // if given date is before this years first week, then it belongs to the 53rd week of last year
            return '53';
          }
  
          if (compareByDay(firstWeekStartNextYear, endDate) <= 0) {
            // if given date is after next years first week, then it belongs to the 01th week of next year
            return '01';
          }
  
          // given date is in between CW 01..53 of this calendar year
          var daysDifference;
          if (firstWeekStartThisYear.getFullYear() < date.tm_year+1900) {
            // first CW of this year starts last year
            daysDifference = date.tm_yday+32-firstWeekStartThisYear.getDate()
          } else {
            // first CW of this year starts this year
            daysDifference = date.tm_yday+1-firstWeekStartThisYear.getDate();
          }
          return leadingNulls(Math.ceil(daysDifference/7), 2);
        },
        '%w': function(date) {
          return date.tm_wday;
        },
        '%W': function(date) {
          // Replaced by the week number of the year as a decimal number [00,53].
          // The first Monday of January is the first day of week 1;
          // days in the new year before this are in week 0. [ tm_year, tm_wday, tm_yday]
          var janFirst = new Date(date.tm_year, 0, 1);
          var firstMonday = janFirst.getDay() === 1 ? janFirst : __addDays(janFirst, janFirst.getDay() === 0 ? 1 : 7-janFirst.getDay()+1);
          var endDate = new Date(date.tm_year+1900, date.tm_mon, date.tm_mday);
  
          // is target date after the first Monday?
          if (compareByDay(firstMonday, endDate) < 0) {
            var februaryFirstUntilEndMonth = __arraySum(__isLeapYear(endDate.getFullYear()) ? __MONTH_DAYS_LEAP : __MONTH_DAYS_REGULAR, endDate.getMonth()-1)-31;
            var firstMondayUntilEndJanuary = 31-firstMonday.getDate();
            var days = firstMondayUntilEndJanuary+februaryFirstUntilEndMonth+endDate.getDate();
            return leadingNulls(Math.ceil(days/7), 2);
          }
          return compareByDay(firstMonday, janFirst) === 0 ? '01': '00';
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          // convert from minutes into hhmm format (which means 60 minutes = 100 units)
          off = (off / 60)*100 + (off % 60);
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function(date) {
          return date.tm_zone;
        },
        '%%': function() {
          return '%';
        }
      };
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.indexOf(rule) >= 0) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }
  Module["_strftime"] = _strftime;

  function _time(ptr) {
      var ret = (Date.now()/1000)|0;
      if (ptr) {
        SAFE_HEAP_STORE(((ptr)|0), ((ret)|0), 4);
      }
      return ret;
    }
  Module["_time"] = _time;

  function ___stack_pointer(
  ) {
  if (!Module['___stack_pointer']) abort("external function '__stack_pointer' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['___stack_pointer'].apply(null, arguments);
  }

  function ___memory_base(
  ) {
  if (!Module['___memory_base']) abort("external function '__memory_base' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['___memory_base'].apply(null, arguments);
  }

  function ___table_base(
  ) {
  if (!Module['___table_base']) abort("external function '__table_base' is missing. perhaps a side module was not linked in? if this function was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=1 in the environment");
  return Module['___table_base'].apply(null, arguments);
  }

  
  var readAsmConstArgsArray=[];
  Module["readAsmConstArgsArray"] = readAsmConstArgsArray;function readAsmConstArgs(sigPtr, buf) {
      // Nobody should have mutated _readAsmConstArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readAsmConstArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readAsmConstArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        assert(ch === 100/*'d'*/ || ch === 102/*'f'*/ || ch === 105 /*'i'*/);
        // A double takes two 32-bit slots, and must also be aligned - the backend
        // will emit padding to avoid that.
        var double = ch < 105;
        if (double && (buf & 1)) buf++;
        readAsmConstArgsArray.push(double ? HEAPF64[buf++ >> 1] : HEAP32[buf]);
        ++buf;
      }
      return readAsmConstArgsArray;
    }
  Module["readAsmConstArgs"] = readAsmConstArgs;
var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();;
var ASSERTIONS = true;



/** @type {function(string, boolean=, number=)} */
function intArrayFromString(stringy, dontAddNull, length) {
  var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
  var u8array = new Array(len);
  var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
  if (dontAddNull) u8array.length = numBytesWritten;
  return u8array;
}

function intArrayToString(array) {
  var ret = [];
  for (var i = 0; i < array.length; i++) {
    var chr = array[i];
    if (chr > 0xFF) {
      if (ASSERTIONS) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
      }
      chr &= 0xFF;
    }
    ret.push(String.fromCharCode(chr));
  }
  return ret.join('');
}


var gb = GLOBAL_BASE, fb = 0;
var asmLibraryArg = { "__asctime_r": ___asctime_r, "__assert_fail": ___assert_fail, "__gmtime_r": ___gmtime_r, "__localtime_r": ___localtime_r, "__map_file": ___map_file, "__memory_base": 1024, "__stack_pointer": STACK_BASE, "__sys__newselect": ___sys__newselect, "__sys_access": ___sys_access, "__sys_chdir": ___sys_chdir, "__sys_chmod": ___sys_chmod, "__sys_dup": ___sys_dup, "__sys_dup2": ___sys_dup2, "__sys_fcntl64": ___sys_fcntl64, "__sys_fstat64": ___sys_fstat64, "__sys_getcwd": ___sys_getcwd, "__sys_getuid32": ___sys_getuid32, "__sys_ioctl": ___sys_ioctl, "__sys_lstat64": ___sys_lstat64, "__sys_mkdir": ___sys_mkdir, "__sys_munmap": ___sys_munmap, "__sys_open": ___sys_open, "__sys_pipe": ___sys_pipe, "__sys_prlimit64": ___sys_prlimit64, "__sys_read": ___sys_read, "__sys_readlink": ___sys_readlink, "__sys_rename": ___sys_rename, "__sys_rmdir": ___sys_rmdir, "__sys_stat64": ___sys_stat64, "__sys_ugetrlimit": ___sys_ugetrlimit, "__sys_unlink": ___sys_unlink, "__sys_wait4": ___sys_wait4, "__table_base": 1, "__wait": ___wait, "_exit": __exit, "abort": _abort, "alignfault": alignfault, "atexit": _atexit, "c_xvasprintf": _c_xvasprintf, "clock_gettime": _clock_gettime, "emscripten_asm_const_int": _emscripten_asm_const_int, "emscripten_get_sbrk_ptr": _emscripten_get_sbrk_ptr, "emscripten_longjmp": _emscripten_longjmp, "emscripten_memcpy_big": _emscripten_memcpy_big, "emscripten_resize_heap": _emscripten_resize_heap, "emscripten_stack_get_end": _emscripten_stack_get_end, "environ_get": _environ_get, "environ_sizes_get": _environ_sizes_get, "execve": _execve, "exit": _exit, "fd_close": _fd_close, "fd_fdstat_get": _fd_fdstat_get, "fd_read": _fd_read, "fd_seek": _fd_seek, "fd_write": _fd_write, "fork": _fork, "fp$__assert_fail$viiii": _fp$__assert_fail$viiii, "fp$emscripten_longjmp$vii": _fp$emscripten_longjmp$vii, "fp$gmtime_r$iii": _fp$gmtime_r$iii, "fp$localtime_r$iii": _fp$localtime_r$iii, "getTempRet0": _getTempRet0, "getpwuid": _getpwuid, "gmtime_r": _gmtime_r, "invoke_d": invoke_d, "invoke_di": invoke_di, "invoke_i": invoke_i, "invoke_ii": invoke_ii, "invoke_iidd": invoke_iidd, "invoke_iii": invoke_iii, "invoke_iiii": invoke_iiii, "invoke_iiiiii": invoke_iiiiii, "invoke_vi": invoke_vi, "invoke_vii": invoke_vii, "invoke_viii": invoke_viii, "invoke_viiii": invoke_viiii, "invoke_viiiii": invoke_viiiii, "localtime_r": _localtime_r, "memory": wasmMemory, "mktime_z": _mktime_z, "popen": _popen, "pthread_mutexattr_destroy": _pthread_mutexattr_destroy, "pthread_mutexattr_init": _pthread_mutexattr_init, "pthread_mutexattr_settype": _pthread_mutexattr_settype, "segfault": segfault, "setTempRet0": _setTempRet0, "setitimer": _setitimer, "sigaction": _sigaction, "sigaddset": _sigaddset, "sigemptyset": _sigemptyset, "signal": _signal, "sigprocmask": _sigprocmask, "strftime": _strftime, "table": wasmTable, "time": _time };
var asm = createWasm();
/** @type {function(...*):?} */
var ___wasm_call_ctors = Module["___wasm_call_ctors"] = createExportWrapper("__wasm_call_ctors");

/** @type {function(...*):?} */
var _main = Module["_main"] = createExportWrapper("main");

/** @type {function(...*):?} */
var _i18n_init = Module["_i18n_init"] = createExportWrapper("i18n_init");

/** @type {function(...*):?} */
var _feholdexcept = Module["_feholdexcept"] = createExportWrapper("feholdexcept");

/** @type {function(...*):?} */
var _output_engine_push = Module["_output_engine_push"] = createExportWrapper("output_engine_push");

/** @type {function(...*):?} */
var _fh_init = Module["_fh_init"] = createExportWrapper("fh_init");

/** @type {function(...*):?} */
var _settings_init = Module["_settings_init"] = createExportWrapper("settings_init");

/** @type {function(...*):?} */
var _random_init = Module["_random_init"] = createExportWrapper("random_init");

/** @type {function(...*):?} */
var _lex_create = Module["_lex_create"] = createExportWrapper("lex_create");

/** @type {function(...*):?} */
var _session_create = Module["_session_create"] = createExportWrapper("session_create");

/** @type {function(...*):?} */
var _dataset_create = Module["_dataset_create"] = createExportWrapper("dataset_create");

/** @type {function(...*):?} */
var _argv_parser_create = Module["_argv_parser_create"] = createExportWrapper("argv_parser_create");

/** @type {function(...*):?} */
var _terminal_opts_init = Module["_terminal_opts_init"] = createExportWrapper("terminal_opts_init");

/** @type {function(...*):?} */
var _source_init_register_argv_parser = Module["_source_init_register_argv_parser"] = createExportWrapper("source_init_register_argv_parser");

/** @type {function(...*):?} */
var _argv_parser_run = Module["_argv_parser_run"] = createExportWrapper("argv_parser_run");

/** @type {function(...*):?} */
var _terminal_opts_done = Module["_terminal_opts_done"] = createExportWrapper("terminal_opts_done");

/** @type {function(...*):?} */
var _argv_parser_destroy = Module["_argv_parser_destroy"] = createExportWrapper("argv_parser_destroy");

/** @type {function(...*):?} */
var _session_active_dataset = Module["_session_active_dataset"] = createExportWrapper("session_active_dataset");

/** @type {function(...*):?} */
var _dataset_dict = Module["_dataset_dict"] = createExportWrapper("dataset_dict");

/** @type {function(...*):?} */
var _dict_set_callbacks = Module["_dict_set_callbacks"] = createExportWrapper("dict_set_callbacks");

/** @type {function(...*):?} */
var _session_set_default_syntax_encoding = Module["_session_set_default_syntax_encoding"] = createExportWrapper("session_set_default_syntax_encoding");

/** @type {function(...*):?} */
var _lex_reader_for_string = Module["_lex_reader_for_string"] = createExportWrapper("lex_reader_for_string");

/** @type {function(...*):?} */
var _lex_append = Module["_lex_append"] = createExportWrapper("lex_append");

/** @type {function(...*):?} */
var _lex_get = Module["_lex_get"] = createExportWrapper("lex_get");

/** @type {function(...*):?} */
var _cmd_parse = Module["_cmd_parse"] = createExportWrapper("cmd_parse");

/** @type {function(...*):?} */
var _cmd_result_is_failure = Module["_cmd_result_is_failure"] = createExportWrapper("cmd_result_is_failure");

/** @type {function(...*):?} */
var _lex_token = Module["_lex_token"] = createExportWrapper("lex_token");

/** @type {function(...*):?} */
var _lex_get_error_mode = Module["_lex_get_error_mode"] = createExportWrapper("lex_get_error_mode");

/** @type {function(...*):?} */
var _gettext = Module["_gettext"] = createExportWrapper("gettext");

/** @type {function(...*):?} */
var _msg = Module["_msg"] = createExportWrapper("msg");

/** @type {function(...*):?} */
var _lex_discard_noninteractive = Module["_lex_discard_noninteractive"] = createExportWrapper("lex_discard_noninteractive");

/** @type {function(...*):?} */
var _msg_ui_too_many_errors = Module["_msg_ui_too_many_errors"] = createExportWrapper("msg_ui_too_many_errors");

/** @type {function(...*):?} */
var _puts = Module["_puts"] = createExportWrapper("puts");

/** @type {function(...*):?} */
var _output_engine_pop = Module["_output_engine_pop"] = createExportWrapper("output_engine_pop");

/** @type {function(...*):?} */
var _session_destroy = Module["_session_destroy"] = createExportWrapper("session_destroy");

/** @type {function(...*):?} */
var _random_done = Module["_random_done"] = createExportWrapper("random_done");

/** @type {function(...*):?} */
var _settings_done = Module["_settings_done"] = createExportWrapper("settings_done");

/** @type {function(...*):?} */
var _fh_done = Module["_fh_done"] = createExportWrapper("fh_done");

/** @type {function(...*):?} */
var _lex_destroy = Module["_lex_destroy"] = createExportWrapper("lex_destroy");

/** @type {function(...*):?} */
var _i18n_done = Module["_i18n_done"] = createExportWrapper("i18n_done");

/** @type {function(...*):?} */
var _msg_ui_any_errors = Module["_msg_ui_any_errors"] = createExportWrapper("msg_ui_any_errors");

/** @type {function(...*):?} */
var _request_bug_report = Module["_request_bug_report"] = createExportWrapper("request_bug_report");

/** @type {function(...*):?} */
var _raise = Module["_raise"] = createExportWrapper("raise");

/** @type {function(...*):?} */
var _read_data_text_file = Module["_read_data_text_file"] = createExportWrapper("read_data_text_file");

/** @type {function(...*):?} */
var _msg_set_handler = Module["_msg_set_handler"] = createExportWrapper("msg_set_handler");

/** @type {function(...*):?} */
var _fopen = Module["_fopen"] = createExportWrapper("fopen");

/** @type {function(...*):?} */
var _lex_get_file_name = Module["_lex_get_file_name"] = createExportWrapper("lex_get_file_name");

/** @type {function(...*):?} */
var _lex_get_first_line_number = Module["_lex_get_first_line_number"] = createExportWrapper("lex_get_first_line_number");

/** @type {function(...*):?} */
var _lex_get_last_line_number = Module["_lex_get_last_line_number"] = createExportWrapper("lex_get_last_line_number");

/** @type {function(...*):?} */
var _output_get_command_name = Module["_output_get_command_name"] = createExportWrapper("output_get_command_name");

/** @type {function(...*):?} */
var _message_item_create = Module["_message_item_create"] = createExportWrapper("message_item_create");

/** @type {function(...*):?} */
var _message_item_submit = Module["_message_item_submit"] = createExportWrapper("message_item_submit");

/** @type {function(...*):?} */
var _free = Module["_free"] = createExportWrapper("free");

/** @type {function(...*):?} */
var _execute_ui_generated_syntax = Module["_execute_ui_generated_syntax"] = createExportWrapper("execute_ui_generated_syntax");

/** @type {function(...*):?} */
var _refresh_grid = Module["_refresh_grid"] = createExportWrapper("refresh_grid");

/** @type {function(...*):?} */
var _dataset_source = Module["_dataset_source"] = createExportWrapper("dataset_source");

/** @type {function(...*):?} */
var _datasheet_create = Module["_datasheet_create"] = createExportWrapper("datasheet_create");

/** @type {function(...*):?} */
var _datasheet_get_n_rows = Module["_datasheet_get_n_rows"] = createExportWrapper("datasheet_get_n_rows");

/** @type {function(...*):?} */
var _datasheet_get_n_columns = Module["_datasheet_get_n_columns"] = createExportWrapper("datasheet_get_n_columns");

/** @type {function(...*):?} */
var _dict_get_var_cnt = Module["_dict_get_var_cnt"] = createExportWrapper("dict_get_var_cnt");

/** @type {function(...*):?} */
var _dict_get_var = Module["_dict_get_var"] = createExportWrapper("dict_get_var");

/** @type {function(...*):?} */
var _var_get_name = Module["_var_get_name"] = createExportWrapper("var_get_name");

/** @type {function(...*):?} */
var _xmalloc = Module["_xmalloc"] = createExportWrapper("xmalloc");

/** @type {function(...*):?} */
var _datasheet_get_value = Module["_datasheet_get_value"] = createExportWrapper("datasheet_get_value");

/** @type {function(...*):?} */
var _xzalloc = Module["_xzalloc"] = createExportWrapper("xzalloc");

/** @type {function(...*):?} */
var _string_map_init = Module["_string_map_init"] = createExportWrapper("string_map_init");

/** @type {function(...*):?} */
var _argv_parser_add_options = Module["_argv_parser_add_options"] = createExportWrapper("argv_parser_add_options");

/** @type {function(...*):?} */
var _strcmp = Module["_strcmp"] = createExportWrapper("strcmp");

/** @type {function(...*):?} */
var _msglog_create = Module["_msglog_create"] = createExportWrapper("msglog_create");

/** @type {function(...*):?} */
var _output_driver_create = Module["_output_driver_create"] = createExportWrapper("output_driver_create");

/** @type {function(...*):?} */
var _output_driver_register = Module["_output_driver_register"] = createExportWrapper("output_driver_register");

/** @type {function(...*):?} */
var _string_map_clear = Module["_string_map_clear"] = createExportWrapper("string_map_clear");

/** @type {function(...*):?} */
var _string_map_insert = Module["_string_map_insert"] = createExportWrapper("string_map_insert");

/** @type {function(...*):?} */
var _output_driver_parse_option = Module["_output_driver_parse_option"] = createExportWrapper("output_driver_parse_option");

/** @type {function(...*):?} */
var _version_etc = Module["_version_etc"] = createExportWrapper("version_etc");

/** @type {function(...*):?} */
var _settings_set_testing_mode = Module["_settings_set_testing_mode"] = createExportWrapper("settings_set_testing_mode");

/** @type {function(...*):?} */
var _string_map_destroy = Module["_string_map_destroy"] = createExportWrapper("string_map_destroy");

/** @type {function(...*):?} */
var _include_path_default = Module["_include_path_default"] = createExportWrapper("include_path_default");

/** @type {function(...*):?} */
var _string_array_join = Module["_string_array_join"] = createExportWrapper("string_array_join");

/** @type {function(...*):?} */
var _iprintf = Module["_iprintf"] = createExportWrapper("iprintf");

/** @type {function(...*):?} */
var _emit_bug_reporting_address = Module["_emit_bug_reporting_address"] = createExportWrapper("emit_bug_reporting_address");

/** @type {function(...*):?} */
var _string_set_init = Module["_string_set_init"] = createExportWrapper("string_set_init");

/** @type {function(...*):?} */
var _output_get_supported_formats = Module["_output_get_supported_formats"] = createExportWrapper("output_get_supported_formats");

/** @type {function(...*):?} */
var _string_array_init = Module["_string_array_init"] = createExportWrapper("string_array_init");

/** @type {function(...*):?} */
var _string_array_append = Module["_string_array_append"] = createExportWrapper("string_array_append");

/** @type {function(...*):?} */
var _string_array_sort = Module["_string_array_sort"] = createExportWrapper("string_array_sort");

/** @type {function(...*):?} */
var _string_set_destroy = Module["_string_set_destroy"] = createExportWrapper("string_set_destroy");

/** @type {function(...*):?} */
var _string_array_destroy = Module["_string_array_destroy"] = createExportWrapper("string_array_destroy");

/** @type {function(...*):?} */
var _terminal_reader_create = Module["_terminal_reader_create"] = createExportWrapper("terminal_reader_create");

/** @type {function(...*):?} */
var _perror = Module["_perror"] = createExportWrapper("perror");

/** @type {function(...*):?} */
var _fwrite = Module["_fwrite"] = createExportWrapper("fwrite");

/** @type {function(...*):?} */
var _journal_init = Module["_journal_init"] = createExportWrapper("journal_init");

/** @type {function(...*):?} */
var _msg_ui_reset_counts = Module["_msg_ui_reset_counts"] = createExportWrapper("msg_ui_reset_counts");

/** @type {function(...*):?} */
var _output_flush = Module["_output_flush"] = createExportWrapper("output_flush");

/** @type {function(...*):?} */
var _ss_dealloc = Module["_ss_dealloc"] = createExportWrapper("ss_dealloc");

/** @type {function(...*):?} */
var _fputs = Module["_fputs"] = createExportWrapper("fputs");

/** @type {function(...*):?} */
var _fflush = Module["_fflush"] = createExportWrapper("fflush");

/** @type {function(...*):?} */
var _ds_init_empty = Module["_ds_init_empty"] = createExportWrapper("ds_init_empty");

/** @type {function(...*):?} */
var _ds_read_line = Module["_ds_read_line"] = createExportWrapper("ds_read_line");

/** @type {function(...*):?} */
var _ss_is_empty = Module["_ss_is_empty"] = createExportWrapper("ss_is_empty");

/** @type {function(...*):?} */
var _memcpy = Module["_memcpy"] = createExportWrapper("memcpy");

/** @type {function(...*):?} */
var _settings_set_algorithm = Module["_settings_set_algorithm"] = createExportWrapper("settings_set_algorithm");

/** @type {function(...*):?} */
var _include_path_clear = Module["_include_path_clear"] = createExportWrapper("include_path_clear");

/** @type {function(...*):?} */
var _include_path_add = Module["_include_path_add"] = createExportWrapper("include_path_add");

/** @type {function(...*):?} */
var _settings_set_safer_mode = Module["_settings_set_safer_mode"] = createExportWrapper("settings_set_safer_mode");

/** @type {function(...*):?} */
var _settings_set_syntax = Module["_settings_set_syntax"] = createExportWrapper("settings_set_syntax");

/** @type {function(...*):?} */
var _error = Module["_error"] = createExportWrapper("error");

/** @type {function(...*):?} */
var _syntax_gen_string = Module["_syntax_gen_string"] = createExportWrapper("syntax_gen_string");

/** @type {function(...*):?} */
var _iscntrl = Module["_iscntrl"] = createExportWrapper("iscntrl");

/** @type {function(...*):?} */
var _ds_put_cstr = Module["_ds_put_cstr"] = createExportWrapper("ds_put_cstr");

/** @type {function(...*):?} */
var _ds_put_byte = Module["_ds_put_byte"] = createExportWrapper("ds_put_byte");

/** @type {function(...*):?} */
var _ss_find_byte = Module["_ss_find_byte"] = createExportWrapper("ss_find_byte");

/** @type {function(...*):?} */
var _syntax_gen_number = Module["_syntax_gen_number"] = createExportWrapper("syntax_gen_number");

/** @type {function(...*):?} */
var _fmt_is_numeric = Module["_fmt_is_numeric"] = createExportWrapper("fmt_is_numeric");

/** @type {function(...*):?} */
var _data_out = Module["_data_out"] = createExportWrapper("data_out");

/** @type {function(...*):?} */
var _strlen = Module["_strlen"] = createExportWrapper("strlen");

/** @type {function(...*):?} */
var _data_in = Module["_data_in"] = createExportWrapper("data_in");

/** @type {function(...*):?} */
var _c_dtoastr = Module["_c_dtoastr"] = createExportWrapper("c_dtoastr");

/** @type {function(...*):?} */
var _syntax_gen_value = Module["_syntax_gen_value"] = createExportWrapper("syntax_gen_value");

/** @type {function(...*):?} */
var _fmt_var_width = Module["_fmt_var_width"] = createExportWrapper("fmt_var_width");

/** @type {function(...*):?} */
var _syntax_gen_num_range = Module["_syntax_gen_num_range"] = createExportWrapper("syntax_gen_num_range");

/** @type {function(...*):?} */
var _float_get_lowest = Module["_float_get_lowest"] = createExportWrapper("float_get_lowest");

/** @type {function(...*):?} */
var _syntax_gen_pspp_valist = Module["_syntax_gen_pspp_valist"] = createExportWrapper("syntax_gen_pspp_valist");

/** @type {function(...*):?} */
var _strcspn = Module["_strcspn"] = createExportWrapper("strcspn");

/** @type {function(...*):?} */
var _ds_put_substring = Module["_ds_put_substring"] = createExportWrapper("ds_put_substring");

/** @type {function(...*):?} */
var _atoi = Module["_atoi"] = createExportWrapper("atoi");

/** @type {function(...*):?} */
var _ds_put_format = Module["_ds_put_format"] = createExportWrapper("ds_put_format");

/** @type {function(...*):?} */
var _strcat = Module["_strcat"] = createExportWrapper("strcat");

/** @type {function(...*):?} */
var _ds_put_c_format = Module["_ds_put_c_format"] = createExportWrapper("ds_put_c_format");

/** @type {function(...*):?} */
var _syntax_gen_pspp = Module["_syntax_gen_pspp"] = createExportWrapper("syntax_gen_pspp");

/** @type {function(...*):?} */
var _glthread_recursive_lock_init_multithreaded = Module["_glthread_recursive_lock_init_multithreaded"] = createExportWrapper("glthread_recursive_lock_init_multithreaded");

/** @type {function(...*):?} */
var _pthread_mutex_init = Module["_pthread_mutex_init"] = createExportWrapper("pthread_mutex_init");

/** @type {function(...*):?} */
var _glthread_recursive_lock_lock_multithreaded = Module["_glthread_recursive_lock_lock_multithreaded"] = createExportWrapper("glthread_recursive_lock_lock_multithreaded");

/** @type {function(...*):?} */
var _pthread_mutex_lock = Module["_pthread_mutex_lock"] = createExportWrapper("pthread_mutex_lock");

/** @type {function(...*):?} */
var _pthread_mutex_unlock = Module["_pthread_mutex_unlock"] = createExportWrapper("pthread_mutex_unlock");

/** @type {function(...*):?} */
var _glthread_recursive_lock_unlock_multithreaded = Module["_glthread_recursive_lock_unlock_multithreaded"] = createExportWrapper("glthread_recursive_lock_unlock_multithreaded");

/** @type {function(...*):?} */
var _glthread_recursive_lock_destroy_multithreaded = Module["_glthread_recursive_lock_destroy_multithreaded"] = createExportWrapper("glthread_recursive_lock_destroy_multithreaded");

/** @type {function(...*):?} */
var _pthread_mutex_destroy = Module["_pthread_mutex_destroy"] = createExportWrapper("pthread_mutex_destroy");

/** @type {function(...*):?} */
var _glthread_once_singlethreaded = Module["_glthread_once_singlethreaded"] = createExportWrapper("glthread_once_singlethreaded");

/** @type {function(...*):?} */
var _glthread_once_multithreaded = Module["_glthread_once_multithreaded"] = createExportWrapper("glthread_once_multithreaded");

/** @type {function(...*):?} */
var _pthread_once = Module["_pthread_once"] = createExportWrapper("pthread_once");

/** @type {function(...*):?} */
var _uc_is_cased = Module["_uc_is_cased"] = createExportWrapper("uc_is_cased");

/** @type {function(...*):?} */
var _uc_is_case_ignorable = Module["_uc_is_case_ignorable"] = createExportWrapper("uc_is_case_ignorable");

/** @type {function(...*):?} */
var _gl_unicase_special_lookup = Module["_gl_unicase_special_lookup"] = createExportWrapper("gl_unicase_special_lookup");

/** @type {function(...*):?} */
var _uc_tocasefold = Module["_uc_tocasefold"] = createExportWrapper("uc_tocasefold");

/** @type {function(...*):?} */
var _uc_tolower = Module["_uc_tolower"] = createExportWrapper("uc_tolower");

/** @type {function(...*):?} */
var _uc_totitle = Module["_uc_totitle"] = createExportWrapper("uc_totitle");

/** @type {function(...*):?} */
var _uc_toupper = Module["_uc_toupper"] = createExportWrapper("uc_toupper");

/** @type {function(...*):?} */
var _u8_casecmp = Module["_u8_casecmp"] = createExportWrapper("u8_casecmp");

/** @type {function(...*):?} */
var _uninorm_decomposing_form = Module["_uninorm_decomposing_form"] = createExportWrapper("uninorm_decomposing_form");

/** @type {function(...*):?} */
var _u8_casefold = Module["_u8_casefold"] = createExportWrapper("u8_casefold");

/** @type {function(...*):?} */
var ___errno_location = Module["___errno_location"] = createExportWrapper("__errno_location");

/** @type {function(...*):?} */
var _u8_cmp2 = Module["_u8_cmp2"] = createExportWrapper("u8_cmp2");

/** @type {function(...*):?} */
var _u8_ct_casefold = Module["_u8_ct_casefold"] = createExportWrapper("u8_ct_casefold");

/** @type {function(...*):?} */
var _u8_casemap = Module["_u8_casemap"] = createExportWrapper("u8_casemap");

/** @type {function(...*):?} */
var _u8_mbtouc_unsafe_aux = Module["_u8_mbtouc_unsafe_aux"] = createExportWrapper("u8_mbtouc_unsafe_aux");

/** @type {function(...*):?} */
var _uc_combining_class = Module["_uc_combining_class"] = createExportWrapper("uc_combining_class");

/** @type {function(...*):?} */
var _uc_is_property_soft_dotted = Module["_uc_is_property_soft_dotted"] = createExportWrapper("uc_is_property_soft_dotted");

/** @type {function(...*):?} */
var _u8_uctomb_aux = Module["_u8_uctomb_aux"] = createExportWrapper("u8_uctomb_aux");

/** @type {function(...*):?} */
var _malloc = Module["_malloc"] = createExportWrapper("malloc");

/** @type {function(...*):?} */
var _realloc = Module["_realloc"] = createExportWrapper("realloc");

/** @type {function(...*):?} */
var _u8_cpy = Module["_u8_cpy"] = createExportWrapper("u8_cpy");

/** @type {function(...*):?} */
var _u8_normalize = Module["_u8_normalize"] = createExportWrapper("u8_normalize");

/** @type {function(...*):?} */
var _u8_ct_totitle = Module["_u8_ct_totitle"] = createExportWrapper("u8_ct_totitle");

/** @type {function(...*):?} */
var _u8_wordbreaks = Module["_u8_wordbreaks"] = createExportWrapper("u8_wordbreaks");

/** @type {function(...*):?} */
var _u8_tolower = Module["_u8_tolower"] = createExportWrapper("u8_tolower");

/** @type {function(...*):?} */
var _u8_totitle = Module["_u8_totitle"] = createExportWrapper("u8_totitle");

/** @type {function(...*):?} */
var _u8_toupper = Module["_u8_toupper"] = createExportWrapper("u8_toupper");

/** @type {function(...*):?} */
var _uc_is_general_category_withtable = Module["_uc_is_general_category_withtable"] = createExportWrapper("uc_is_general_category_withtable");

/** @type {function(...*):?} */
var _uc_general_category = Module["_uc_general_category"] = createExportWrapper("uc_general_category");

/** @type {function(...*):?} */
var _uc_is_print = Module["_uc_is_print"] = createExportWrapper("uc_is_print");

/** @type {function(...*):?} */
var _uc_graphemeclusterbreak_property = Module["_uc_graphemeclusterbreak_property"] = createExportWrapper("uc_graphemeclusterbreak_property");

/** @type {function(...*):?} */
var _uc_is_grapheme_break = Module["_uc_is_grapheme_break"] = createExportWrapper("uc_is_grapheme_break");

/** @type {function(...*):?} */
var _u8_possible_linebreaks = Module["_u8_possible_linebreaks"] = createExportWrapper("u8_possible_linebreaks");

/** @type {function(...*):?} */
var _memset = Module["_memset"] = createExportWrapper("memset");

/** @type {function(...*):?} */
var _uc_canonical_decomposition = Module["_uc_canonical_decomposition"] = createExportWrapper("uc_canonical_decomposition");

/** @type {function(...*):?} */
var _uc_compat_decomposition = Module["_uc_compat_decomposition"] = createExportWrapper("uc_compat_decomposition");

/** @type {function(...*):?} */
var _uc_decomposition = Module["_uc_decomposition"] = createExportWrapper("uc_decomposition");

/** @type {function(...*):?} */
var _gl_uninorm_decompose_merge_sort_inplace = Module["_gl_uninorm_decompose_merge_sort_inplace"] = createExportWrapper("gl_uninorm_decompose_merge_sort_inplace");

/** @type {function(...*):?} */
var _u8_check = Module["_u8_check"] = createExportWrapper("u8_check");

/** @type {function(...*):?} */
var _u8_cmp = Module["_u8_cmp"] = createExportWrapper("u8_cmp");

/** @type {function(...*):?} */
var _memcmp = Module["_memcmp"] = createExportWrapper("memcmp");

/** @type {function(...*):?} */
var _u8_mblen = Module["_u8_mblen"] = createExportWrapper("u8_mblen");

/** @type {function(...*):?} */
var _u8_mbtouc_aux = Module["_u8_mbtouc_aux"] = createExportWrapper("u8_mbtouc_aux");

/** @type {function(...*):?} */
var _u8_mbtoucr = Module["_u8_mbtoucr"] = createExportWrapper("u8_mbtoucr");

/** @type {function(...*):?} */
var _u8_strlen = Module["_u8_strlen"] = createExportWrapper("u8_strlen");

/** @type {function(...*):?} */
var _u8_strmbtouc = Module["_u8_strmbtouc"] = createExportWrapper("u8_strmbtouc");

/** @type {function(...*):?} */
var _u8_strncat = Module["_u8_strncat"] = createExportWrapper("u8_strncat");

/** @type {function(...*):?} */
var _strncat = Module["_strncat"] = createExportWrapper("strncat");

/** @type {function(...*):?} */
var _uc_wordbreak_property = Module["_uc_wordbreak_property"] = createExportWrapper("uc_wordbreak_property");

/** @type {function(...*):?} */
var _u8_strwidth = Module["_u8_strwidth"] = createExportWrapper("u8_strwidth");

/** @type {function(...*):?} */
var _u8_width = Module["_u8_width"] = createExportWrapper("u8_width");

/** @type {function(...*):?} */
var _uc_width = Module["_uc_width"] = createExportWrapper("uc_width");

/** @type {function(...*):?} */
var _areadlink = Module["_areadlink"] = createExportWrapper("areadlink");

/** @type {function(...*):?} */
var _careadlinkat = Module["_careadlinkat"] = createExportWrapper("careadlinkat");

/** @type {function(...*):?} */
var _rpl_readlink = Module["_rpl_readlink"] = createExportWrapper("rpl_readlink");

/** @type {function(...*):?} */
var _asnprintf = Module["_asnprintf"] = createExportWrapper("asnprintf");

/** @type {function(...*):?} */
var _vasnprintf = Module["_vasnprintf"] = createExportWrapper("vasnprintf");

/** @type {function(...*):?} */
var _rpl_asprintf = Module["_rpl_asprintf"] = createExportWrapper("rpl_asprintf");

/** @type {function(...*):?} */
var _rpl_vasprintf = Module["_rpl_vasprintf"] = createExportWrapper("rpl_vasprintf");

/** @type {function(...*):?} */
var _asyncsafe_spin_init = Module["_asyncsafe_spin_init"] = createExportWrapper("asyncsafe_spin_init");

/** @type {function(...*):?} */
var _asyncsafe_spin_destroy = Module["_asyncsafe_spin_destroy"] = createExportWrapper("asyncsafe_spin_destroy");

/** @type {function(...*):?} */
var _asyncsafe_spin_lock = Module["_asyncsafe_spin_lock"] = createExportWrapper("asyncsafe_spin_lock");

/** @type {function(...*):?} */
var _asyncsafe_spin_unlock = Module["_asyncsafe_spin_unlock"] = createExportWrapper("asyncsafe_spin_unlock");

/** @type {function(...*):?} */
var _last_component = Module["_last_component"] = createExportWrapper("last_component");

/** @type {function(...*):?} */
var _base_len = Module["_base_len"] = createExportWrapper("base_len");

/** @type {function(...*):?} */
var _base_name = Module["_base_name"] = createExportWrapper("base_name");

/** @type {function(...*):?} */
var _xstrndup = Module["_xstrndup"] = createExportWrapper("xstrndup");

/** @type {function(...*):?} */
var ___gl_setmode = Module["___gl_setmode"] = createExportWrapper("__gl_setmode");

/** @type {function(...*):?} */
var _set_binary_mode = Module["_set_binary_mode"] = createExportWrapper("set_binary_mode");

/** @type {function(...*):?} */
var _btowc = Module["_btowc"] = createExportWrapper("btowc");

/** @type {function(...*):?} */
var _mbtowc = Module["_mbtowc"] = createExportWrapper("mbtowc");

/** @type {function(...*):?} */
var _c_asprintf = Module["_c_asprintf"] = createExportWrapper("c_asprintf");

/** @type {function(...*):?} */
var _c_vasprintf = Module["_c_vasprintf"] = createExportWrapper("c_vasprintf");

/** @type {function(...*):?} */
var _c_isalnum = Module["_c_isalnum"] = createExportWrapper("c_isalnum");

/** @type {function(...*):?} */
var _c_isalpha = Module["_c_isalpha"] = createExportWrapper("c_isalpha");

/** @type {function(...*):?} */
var _c_isascii = Module["_c_isascii"] = createExportWrapper("c_isascii");

/** @type {function(...*):?} */
var _c_isblank = Module["_c_isblank"] = createExportWrapper("c_isblank");

/** @type {function(...*):?} */
var _c_iscntrl = Module["_c_iscntrl"] = createExportWrapper("c_iscntrl");

/** @type {function(...*):?} */
var _c_isdigit = Module["_c_isdigit"] = createExportWrapper("c_isdigit");

/** @type {function(...*):?} */
var _c_isgraph = Module["_c_isgraph"] = createExportWrapper("c_isgraph");

/** @type {function(...*):?} */
var _c_islower = Module["_c_islower"] = createExportWrapper("c_islower");

/** @type {function(...*):?} */
var _c_isprint = Module["_c_isprint"] = createExportWrapper("c_isprint");

/** @type {function(...*):?} */
var _c_ispunct = Module["_c_ispunct"] = createExportWrapper("c_ispunct");

/** @type {function(...*):?} */
var _c_isspace = Module["_c_isspace"] = createExportWrapper("c_isspace");

/** @type {function(...*):?} */
var _c_isupper = Module["_c_isupper"] = createExportWrapper("c_isupper");

/** @type {function(...*):?} */
var _c_isxdigit = Module["_c_isxdigit"] = createExportWrapper("c_isxdigit");

/** @type {function(...*):?} */
var _c_tolower = Module["_c_tolower"] = createExportWrapper("c_tolower");

/** @type {function(...*):?} */
var _c_toupper = Module["_c_toupper"] = createExportWrapper("c_toupper");

/** @type {function(...*):?} */
var _c_snprintf = Module["_c_snprintf"] = createExportWrapper("c_snprintf");

/** @type {function(...*):?} */
var _c_vasnprintf = Module["_c_vasnprintf"] = createExportWrapper("c_vasnprintf");

/** @type {function(...*):?} */
var _c_strcasecmp = Module["_c_strcasecmp"] = createExportWrapper("c_strcasecmp");

/** @type {function(...*):?} */
var _c_strcasestr = Module["_c_strcasestr"] = createExportWrapper("c_strcasestr");

/** @type {function(...*):?} */
var _c_strncasecmp = Module["_c_strncasecmp"] = createExportWrapper("c_strncasecmp");

/** @type {function(...*):?} */
var _memchr = Module["_memchr"] = createExportWrapper("memchr");

/** @type {function(...*):?} */
var _c_strtod = Module["_c_strtod"] = createExportWrapper("c_strtod");

/** @type {function(...*):?} */
var _newlocale = Module["_newlocale"] = createExportWrapper("newlocale");

/** @type {function(...*):?} */
var _strtod_l = Module["_strtod_l"] = createExportWrapper("strtod_l");

/** @type {function(...*):?} */
var _printf_parse = Module["_printf_parse"] = createExportWrapper("printf_parse");

/** @type {function(...*):?} */
var _printf_fetchargs = Module["_printf_fetchargs"] = createExportWrapper("printf_fetchargs");

/** @type {function(...*):?} */
var ___unordtf2 = Module["___unordtf2"] = createExportWrapper("__unordtf2");

/** @type {function(...*):?} */
var ___addtf3 = Module["___addtf3"] = createExportWrapper("__addtf3");

/** @type {function(...*):?} */
var ___gttf2 = Module["___gttf2"] = createExportWrapper("__gttf2");

/** @type {function(...*):?} */
var ___netf2 = Module["___netf2"] = createExportWrapper("__netf2");

/** @type {function(...*):?} */
var _printf_frexpl = Module["_printf_frexpl"] = createExportWrapper("printf_frexpl");

/** @type {function(...*):?} */
var ___fixtfsi = Module["___fixtfsi"] = createExportWrapper("__fixtfsi");

/** @type {function(...*):?} */
var ___floatsitf = Module["___floatsitf"] = createExportWrapper("__floatsitf");

/** @type {function(...*):?} */
var ___subtf3 = Module["___subtf3"] = createExportWrapper("__subtf3");

/** @type {function(...*):?} */
var _printf_frexp = Module["_printf_frexp"] = createExportWrapper("printf_frexp");

/** @type {function(...*):?} */
var ___eqtf2 = Module["___eqtf2"] = createExportWrapper("__eqtf2");

/** @type {function(...*):?} */
var ___lttf2 = Module["___lttf2"] = createExportWrapper("__lttf2");

/** @type {function(...*):?} */
var _siprintf = Module["_siprintf"] = createExportWrapper("siprintf");

/** @type {function(...*):?} */
var _snprintf = Module["_snprintf"] = createExportWrapper("snprintf");

/** @type {function(...*):?} */
var ___multf3 = Module["___multf3"] = createExportWrapper("__multf3");

/** @type {function(...*):?} */
var ___getf2 = Module["___getf2"] = createExportWrapper("__getf2");

/** @type {function(...*):?} */
var _frexpl = Module["_frexpl"] = createExportWrapper("frexpl");

/** @type {function(...*):?} */
var ___trunctfdf2 = Module["___trunctfdf2"] = createExportWrapper("__trunctfdf2");

/** @type {function(...*):?} */
var _frexp = Module["_frexp"] = createExportWrapper("frexp");

/** @type {function(...*):?} */
var ___floatunsitf = Module["___floatunsitf"] = createExportWrapper("__floatunsitf");

/** @type {function(...*):?} */
var _c_xasprintf = Module["_c_xasprintf"] = createExportWrapper("c_xasprintf");

/** @type {function(...*):?} */
var _rpl_realpath = Module["_rpl_realpath"] = createExportWrapper("rpl_realpath");

/** @type {function(...*):?} */
var _getcwd = Module["_getcwd"] = createExportWrapper("getcwd");

/** @type {function(...*):?} */
var _lstat = Module["_lstat"] = createExportWrapper("lstat");

/** @type {function(...*):?} */
var _mmalloca = Module["_mmalloca"] = createExportWrapper("mmalloca");

/** @type {function(...*):?} */
var _freea = Module["_freea"] = createExportWrapper("freea");

/** @type {function(...*):?} */
var _memmove = Module["_memmove"] = createExportWrapper("memmove");

/** @type {function(...*):?} */
var _canonicalize_file_name = Module["_canonicalize_file_name"] = createExportWrapper("canonicalize_file_name");

/** @type {function(...*):?} */
var _register_temporary_file = Module["_register_temporary_file"] = createExportWrapper("register_temporary_file");

/** @type {function(...*):?} */
var _xstrdup = Module["_xstrdup"] = createExportWrapper("xstrdup");

/** @type {function(...*):?} */
var _xalloc_die = Module["_xalloc_die"] = createExportWrapper("xalloc_die");

/** @type {function(...*):?} */
var _unregister_temporary_file = Module["_unregister_temporary_file"] = createExportWrapper("unregister_temporary_file");

/** @type {function(...*):?} */
var _cleanup_temporary_file = Module["_cleanup_temporary_file"] = createExportWrapper("cleanup_temporary_file");

/** @type {function(...*):?} */
var _unlink = Module["_unlink"] = createExportWrapper("unlink");

/** @type {function(...*):?} */
var _create_temp_dir = Module["_create_temp_dir"] = createExportWrapper("create_temp_dir");

/** @type {function(...*):?} */
var _xmmalloca = Module["_xmmalloca"] = createExportWrapper("xmmalloca");

/** @type {function(...*):?} */
var _path_search = Module["_path_search"] = createExportWrapper("path_search");

/** @type {function(...*):?} */
var _block_fatal_signals = Module["_block_fatal_signals"] = createExportWrapper("block_fatal_signals");

/** @type {function(...*):?} */
var _mkdtemp = Module["_mkdtemp"] = createExportWrapper("mkdtemp");

/** @type {function(...*):?} */
var _unblock_fatal_signals = Module["_unblock_fatal_signals"] = createExportWrapper("unblock_fatal_signals");

/** @type {function(...*):?} */
var _register_temp_file = Module["_register_temp_file"] = createExportWrapper("register_temp_file");

/** @type {function(...*):?} */
var _unregister_temp_file = Module["_unregister_temp_file"] = createExportWrapper("unregister_temp_file");

/** @type {function(...*):?} */
var _register_temp_subdir = Module["_register_temp_subdir"] = createExportWrapper("register_temp_subdir");

/** @type {function(...*):?} */
var _unregister_temp_subdir = Module["_unregister_temp_subdir"] = createExportWrapper("unregister_temp_subdir");

/** @type {function(...*):?} */
var _cleanup_temp_file = Module["_cleanup_temp_file"] = createExportWrapper("cleanup_temp_file");

/** @type {function(...*):?} */
var _cleanup_temp_subdir = Module["_cleanup_temp_subdir"] = createExportWrapper("cleanup_temp_subdir");

/** @type {function(...*):?} */
var _rmdir = Module["_rmdir"] = createExportWrapper("rmdir");

/** @type {function(...*):?} */
var _cleanup_temp_dir_contents = Module["_cleanup_temp_dir_contents"] = createExportWrapper("cleanup_temp_dir_contents");

/** @type {function(...*):?} */
var _cleanup_temp_dir = Module["_cleanup_temp_dir"] = createExportWrapper("cleanup_temp_dir");

/** @type {function(...*):?} */
var _open_temp = Module["_open_temp"] = createExportWrapper("open_temp");

/** @type {function(...*):?} */
var _rpl_open = Module["_rpl_open"] = createExportWrapper("rpl_open");

/** @type {function(...*):?} */
var _fopen_temp = Module["_fopen_temp"] = createExportWrapper("fopen_temp");

/** @type {function(...*):?} */
var _fileno = Module["_fileno"] = createExportWrapper("fileno");

/** @type {function(...*):?} */
var _gen_register_open_temp = Module["_gen_register_open_temp"] = createExportWrapper("gen_register_open_temp");

/** @type {function(...*):?} */
var _try_tempname = Module["_try_tempname"] = createExportWrapper("try_tempname");

/** @type {function(...*):?} */
var _close_temp = Module["_close_temp"] = createExportWrapper("close_temp");

/** @type {function(...*):?} */
var _close = Module["_close"] = createExportWrapper("close");

/** @type {function(...*):?} */
var _get_fatal_signal_set = Module["_get_fatal_signal_set"] = createExportWrapper("get_fatal_signal_set");

/** @type {function(...*):?} */
var _fclose_temp = Module["_fclose_temp"] = createExportWrapper("fclose_temp");

/** @type {function(...*):?} */
var _fclose = Module["_fclose"] = createExportWrapper("fclose");

/** @type {function(...*):?} */
var _fwriteerror_temp = Module["_fwriteerror_temp"] = createExportWrapper("fwriteerror_temp");

/** @type {function(...*):?} */
var _fwriteerror = Module["_fwriteerror"] = createExportWrapper("fwriteerror");

/** @type {function(...*):?} */
var _at_fatal_signal = Module["_at_fatal_signal"] = createExportWrapper("at_fatal_signal");

/** @type {function(...*):?} */
var _set_cloexec_flag = Module["_set_cloexec_flag"] = createExportWrapper("set_cloexec_flag");

/** @type {function(...*):?} */
var _fcntl = Module["_fcntl"] = createExportWrapper("fcntl");

/** @type {function(...*):?} */
var _dup_cloexec = Module["_dup_cloexec"] = createExportWrapper("dup_cloexec");

/** @type {function(...*):?} */
var _rpl_close = Module["_rpl_close"] = createExportWrapper("rpl_close");

/** @type {function(...*):?} */
var _count_leading_zeros = Module["_count_leading_zeros"] = createExportWrapper("count_leading_zeros");

/** @type {function(...*):?} */
var _count_leading_zeros_l = Module["_count_leading_zeros_l"] = createExportWrapper("count_leading_zeros_l");

/** @type {function(...*):?} */
var _count_leading_zeros_ll = Module["_count_leading_zeros_ll"] = createExportWrapper("count_leading_zeros_ll");

/** @type {function(...*):?} */
var _count_one_bits = Module["_count_one_bits"] = createExportWrapper("count_one_bits");

/** @type {function(...*):?} */
var _count_one_bits_l = Module["_count_one_bits_l"] = createExportWrapper("count_one_bits_l");

/** @type {function(...*):?} */
var _count_one_bits_ll = Module["_count_one_bits_ll"] = createExportWrapper("count_one_bits_ll");

/** @type {function(...*):?} */
var _crc32_update_no_xor = Module["_crc32_update_no_xor"] = createExportWrapper("crc32_update_no_xor");

/** @type {function(...*):?} */
var _crc32_no_xor = Module["_crc32_no_xor"] = createExportWrapper("crc32_no_xor");

/** @type {function(...*):?} */
var _crc32_update = Module["_crc32_update"] = createExportWrapper("crc32_update");

/** @type {function(...*):?} */
var _gl_crc32 = Module["_gl_crc32"] = createExportWrapper("gl_crc32");

/** @type {function(...*):?} */
var _dir_len = Module["_dir_len"] = createExportWrapper("dir_len");

/** @type {function(...*):?} */
var _mdir_name = Module["_mdir_name"] = createExportWrapper("mdir_name");

/** @type {function(...*):?} */
var _dir_name = Module["_dir_name"] = createExportWrapper("dir_name");

/** @type {function(...*):?} */
var _dtoastr = Module["_dtoastr"] = createExportWrapper("dtoastr");

/** @type {function(...*):?} */
var _rpl_snprintf = Module["_rpl_snprintf"] = createExportWrapper("rpl_snprintf");

/** @type {function(...*):?} */
var _strtod = Module["_strtod"] = createExportWrapper("strtod");

/** @type {function(...*):?} */
var _dtotimespec = Module["_dtotimespec"] = createExportWrapper("dtotimespec");

/** @type {function(...*):?} */
var _rpl_dup2 = Module["_rpl_dup2"] = createExportWrapper("rpl_dup2");

/** @type {function(...*):?} */
var _dup2 = Module["_dup2"] = createExportWrapper("dup2");

/** @type {function(...*):?} */
var _fiprintf = Module["_fiprintf"] = createExportWrapper("fiprintf");

/** @type {function(...*):?} */
var _vfprintf = Module["_vfprintf"] = createExportWrapper("vfprintf");

/** @type {function(...*):?} */
var _strerror_r = Module["_strerror_r"] = createExportWrapper("strerror_r");

/** @type {function(...*):?} */
var _putc_unlocked = Module["_putc_unlocked"] = createExportWrapper("putc_unlocked");

/** @type {function(...*):?} */
var _error_at_line = Module["_error_at_line"] = createExportWrapper("error_at_line");

/** @type {function(...*):?} */
var _explicit_bzero = Module["_explicit_bzero"] = createExportWrapper("explicit_bzero");

/** @type {function(...*):?} */
var _get_fatal_signals = Module["_get_fatal_signals"] = createExportWrapper("get_fatal_signals");

/** @type {function(...*):?} */
var _floor = Module["_floor"] = createExportWrapper("floor");

/** @type {function(...*):?} */
var _rpl_fopen = Module["_rpl_fopen"] = createExportWrapper("rpl_fopen");

/** @type {function(...*):?} */
var _fdopen = Module["_fdopen"] = createExportWrapper("fdopen");

/** @type {function(...*):?} */
var _rpl_fstat = Module["_rpl_fstat"] = createExportWrapper("rpl_fstat");

/** @type {function(...*):?} */
var _fstat = Module["_fstat"] = createExportWrapper("fstat");

/** @type {function(...*):?} */
var _ftell = Module["_ftell"] = createExportWrapper("ftell");

/** @type {function(...*):?} */
var _ftello = Module["_ftello"] = createExportWrapper("ftello");

/** @type {function(...*):?} */
var _ftoastr = Module["_ftoastr"] = createExportWrapper("ftoastr");

/** @type {function(...*):?} */
var _full_read = Module["_full_read"] = createExportWrapper("full_read");

/** @type {function(...*):?} */
var _safe_read = Module["_safe_read"] = createExportWrapper("safe_read");

/** @type {function(...*):?} */
var _full_write = Module["_full_write"] = createExportWrapper("full_write");

/** @type {function(...*):?} */
var _safe_write = Module["_safe_write"] = createExportWrapper("safe_write");

/** @type {function(...*):?} */
var _ferror = Module["_ferror"] = createExportWrapper("ferror");

/** @type {function(...*):?} */
var _fputc = Module["_fputc"] = createExportWrapper("fputc");

/** @type {function(...*):?} */
var _fwriteerror_no_ebadf = Module["_fwriteerror_no_ebadf"] = createExportWrapper("fwriteerror_no_ebadf");

/** @type {function(...*):?} */
var _getdelim = Module["_getdelim"] = createExportWrapper("getdelim");

/** @type {function(...*):?} */
var _getc_unlocked = Module["_getc_unlocked"] = createExportWrapper("getc_unlocked");

/** @type {function(...*):?} */
var _getdtablesize = Module["_getdtablesize"] = createExportWrapper("getdtablesize");

/** @type {function(...*):?} */
var _getrlimit = Module["_getrlimit"] = createExportWrapper("getrlimit");

/** @type {function(...*):?} */
var _getline = Module["_getline"] = createExportWrapper("getline");

/** @type {function(...*):?} */
var _getpass = Module["_getpass"] = createExportWrapper("getpass");

/** @type {function(...*):?} */
var _fseeko = Module["_fseeko"] = createExportWrapper("fseeko");

/** @type {function(...*):?} */
var _getrandom = Module["_getrandom"] = createExportWrapper("getrandom");

/** @type {function(...*):?} */
var _read = Module["_read"] = createExportWrapper("read");

/** @type {function(...*):?} */
var _gettime = Module["_gettime"] = createExportWrapper("gettime");

/** @type {function(...*):?} */
var _current_timespec = Module["_current_timespec"] = createExportWrapper("current_timespec");

/** @type {function(...*):?} */
var _gettimeofday = Module["_gettimeofday"] = createExportWrapper("gettimeofday");

/** @type {function(...*):?} */
var _calloc = Module["_calloc"] = createExportWrapper("calloc");

/** @type {function(...*):?} */
var _gl_list_nx_create_empty = Module["_gl_list_nx_create_empty"] = createExportWrapper("gl_list_nx_create_empty");

/** @type {function(...*):?} */
var _gl_list_nx_create = Module["_gl_list_nx_create"] = createExportWrapper("gl_list_nx_create");

/** @type {function(...*):?} */
var _gl_list_size = Module["_gl_list_size"] = createExportWrapper("gl_list_size");

/** @type {function(...*):?} */
var _gl_list_node_value = Module["_gl_list_node_value"] = createExportWrapper("gl_list_node_value");

/** @type {function(...*):?} */
var _gl_list_node_nx_set_value = Module["_gl_list_node_nx_set_value"] = createExportWrapper("gl_list_node_nx_set_value");

/** @type {function(...*):?} */
var _gl_list_next_node = Module["_gl_list_next_node"] = createExportWrapper("gl_list_next_node");

/** @type {function(...*):?} */
var _gl_list_previous_node = Module["_gl_list_previous_node"] = createExportWrapper("gl_list_previous_node");

/** @type {function(...*):?} */
var _gl_list_get_at = Module["_gl_list_get_at"] = createExportWrapper("gl_list_get_at");

/** @type {function(...*):?} */
var _gl_list_get_first = Module["_gl_list_get_first"] = createExportWrapper("gl_list_get_first");

/** @type {function(...*):?} */
var _gl_list_get_last = Module["_gl_list_get_last"] = createExportWrapper("gl_list_get_last");

/** @type {function(...*):?} */
var _gl_list_nx_set_at = Module["_gl_list_nx_set_at"] = createExportWrapper("gl_list_nx_set_at");

/** @type {function(...*):?} */
var _gl_list_nx_set_first = Module["_gl_list_nx_set_first"] = createExportWrapper("gl_list_nx_set_first");

/** @type {function(...*):?} */
var _gl_list_nx_set_last = Module["_gl_list_nx_set_last"] = createExportWrapper("gl_list_nx_set_last");

/** @type {function(...*):?} */
var _gl_list_search = Module["_gl_list_search"] = createExportWrapper("gl_list_search");

/** @type {function(...*):?} */
var _gl_list_search_from = Module["_gl_list_search_from"] = createExportWrapper("gl_list_search_from");

/** @type {function(...*):?} */
var _gl_list_search_from_to = Module["_gl_list_search_from_to"] = createExportWrapper("gl_list_search_from_to");

/** @type {function(...*):?} */
var _gl_list_indexof = Module["_gl_list_indexof"] = createExportWrapper("gl_list_indexof");

/** @type {function(...*):?} */
var _gl_list_indexof_from = Module["_gl_list_indexof_from"] = createExportWrapper("gl_list_indexof_from");

/** @type {function(...*):?} */
var _gl_list_indexof_from_to = Module["_gl_list_indexof_from_to"] = createExportWrapper("gl_list_indexof_from_to");

/** @type {function(...*):?} */
var _gl_list_nx_add_first = Module["_gl_list_nx_add_first"] = createExportWrapper("gl_list_nx_add_first");

/** @type {function(...*):?} */
var _gl_list_nx_add_last = Module["_gl_list_nx_add_last"] = createExportWrapper("gl_list_nx_add_last");

/** @type {function(...*):?} */
var _gl_list_nx_add_before = Module["_gl_list_nx_add_before"] = createExportWrapper("gl_list_nx_add_before");

/** @type {function(...*):?} */
var _gl_list_nx_add_after = Module["_gl_list_nx_add_after"] = createExportWrapper("gl_list_nx_add_after");

/** @type {function(...*):?} */
var _gl_list_nx_add_at = Module["_gl_list_nx_add_at"] = createExportWrapper("gl_list_nx_add_at");

/** @type {function(...*):?} */
var _gl_list_remove_node = Module["_gl_list_remove_node"] = createExportWrapper("gl_list_remove_node");

/** @type {function(...*):?} */
var _gl_list_remove_at = Module["_gl_list_remove_at"] = createExportWrapper("gl_list_remove_at");

/** @type {function(...*):?} */
var _gl_list_remove_first = Module["_gl_list_remove_first"] = createExportWrapper("gl_list_remove_first");

/** @type {function(...*):?} */
var _gl_list_remove_last = Module["_gl_list_remove_last"] = createExportWrapper("gl_list_remove_last");

/** @type {function(...*):?} */
var _gl_list_remove = Module["_gl_list_remove"] = createExportWrapper("gl_list_remove");

/** @type {function(...*):?} */
var _gl_list_free = Module["_gl_list_free"] = createExportWrapper("gl_list_free");

/** @type {function(...*):?} */
var _gl_list_iterator = Module["_gl_list_iterator"] = createExportWrapper("gl_list_iterator");

/** @type {function(...*):?} */
var _gl_list_iterator_from_to = Module["_gl_list_iterator_from_to"] = createExportWrapper("gl_list_iterator_from_to");

/** @type {function(...*):?} */
var _gl_list_iterator_next = Module["_gl_list_iterator_next"] = createExportWrapper("gl_list_iterator_next");

/** @type {function(...*):?} */
var _gl_list_iterator_free = Module["_gl_list_iterator_free"] = createExportWrapper("gl_list_iterator_free");

/** @type {function(...*):?} */
var _gl_sortedlist_search = Module["_gl_sortedlist_search"] = createExportWrapper("gl_sortedlist_search");

/** @type {function(...*):?} */
var _gl_sortedlist_search_from_to = Module["_gl_sortedlist_search_from_to"] = createExportWrapper("gl_sortedlist_search_from_to");

/** @type {function(...*):?} */
var _gl_sortedlist_indexof = Module["_gl_sortedlist_indexof"] = createExportWrapper("gl_sortedlist_indexof");

/** @type {function(...*):?} */
var _gl_sortedlist_indexof_from_to = Module["_gl_sortedlist_indexof_from_to"] = createExportWrapper("gl_sortedlist_indexof_from_to");

/** @type {function(...*):?} */
var _gl_sortedlist_nx_add = Module["_gl_sortedlist_nx_add"] = createExportWrapper("gl_sortedlist_nx_add");

/** @type {function(...*):?} */
var _gl_sortedlist_remove = Module["_gl_sortedlist_remove"] = createExportWrapper("gl_sortedlist_remove");

/** @type {function(...*):?} */
var _gl_list_create_empty = Module["_gl_list_create_empty"] = createExportWrapper("gl_list_create_empty");

/** @type {function(...*):?} */
var _gl_list_create = Module["_gl_list_create"] = createExportWrapper("gl_list_create");

/** @type {function(...*):?} */
var _gl_list_node_set_value = Module["_gl_list_node_set_value"] = createExportWrapper("gl_list_node_set_value");

/** @type {function(...*):?} */
var _gl_list_set_at = Module["_gl_list_set_at"] = createExportWrapper("gl_list_set_at");

/** @type {function(...*):?} */
var _gl_list_set_first = Module["_gl_list_set_first"] = createExportWrapper("gl_list_set_first");

/** @type {function(...*):?} */
var _gl_list_set_last = Module["_gl_list_set_last"] = createExportWrapper("gl_list_set_last");

/** @type {function(...*):?} */
var _gl_list_add_first = Module["_gl_list_add_first"] = createExportWrapper("gl_list_add_first");

/** @type {function(...*):?} */
var _gl_list_add_last = Module["_gl_list_add_last"] = createExportWrapper("gl_list_add_last");

/** @type {function(...*):?} */
var _gl_list_add_before = Module["_gl_list_add_before"] = createExportWrapper("gl_list_add_before");

/** @type {function(...*):?} */
var _gl_list_add_after = Module["_gl_list_add_after"] = createExportWrapper("gl_list_add_after");

/** @type {function(...*):?} */
var _gl_list_add_at = Module["_gl_list_add_at"] = createExportWrapper("gl_list_add_at");

/** @type {function(...*):?} */
var _gl_sortedlist_add = Module["_gl_sortedlist_add"] = createExportWrapper("gl_sortedlist_add");

/** @type {function(...*):?} */
var _hard_locale = Module["_hard_locale"] = createExportWrapper("hard_locale");

/** @type {function(...*):?} */
var _setlocale_null_r = Module["_setlocale_null_r"] = createExportWrapper("setlocale_null_r");

/** @type {function(...*):?} */
var _imaxtostr = Module["_imaxtostr"] = createExportWrapper("imaxtostr");

/** @type {function(...*):?} */
var _inttostr = Module["_inttostr"] = createExportWrapper("inttostr");

/** @type {function(...*):?} */
var _gl_isfinitef = Module["_gl_isfinitef"] = createExportWrapper("gl_isfinitef");

/** @type {function(...*):?} */
var _gl_isfinited = Module["_gl_isfinited"] = createExportWrapper("gl_isfinited");

/** @type {function(...*):?} */
var _gl_isfinitel = Module["_gl_isfinitel"] = createExportWrapper("gl_isfinitel");

/** @type {function(...*):?} */
var _gl_isinff = Module["_gl_isinff"] = createExportWrapper("gl_isinff");

/** @type {function(...*):?} */
var _gl_isinfd = Module["_gl_isinfd"] = createExportWrapper("gl_isinfd");

/** @type {function(...*):?} */
var _gl_isinfl = Module["_gl_isinfl"] = createExportWrapper("gl_isinfl");

/** @type {function(...*):?} */
var _iswblank = Module["_iswblank"] = createExportWrapper("iswblank");

/** @type {function(...*):?} */
var _iswdigit = Module["_iswdigit"] = createExportWrapper("iswdigit");

/** @type {function(...*):?} */
var _iswxdigit = Module["_iswxdigit"] = createExportWrapper("iswxdigit");

/** @type {function(...*):?} */
var __Qp_itoq = Module["__Qp_itoq"] = createExportWrapper("_Qp_itoq");

/** @type {function(...*):?} */
var _locale_charset = Module["_locale_charset"] = createExportWrapper("locale_charset");

/** @type {function(...*):?} */
var _rpl_nl_langinfo = Module["_rpl_nl_langinfo"] = createExportWrapper("rpl_nl_langinfo");

/** @type {function(...*):?} */
var _localeconv = Module["_localeconv"] = createExportWrapper("localeconv");

/** @type {function(...*):?} */
var _gl_locale_name_thread = Module["_gl_locale_name_thread"] = createExportWrapper("gl_locale_name_thread");

/** @type {function(...*):?} */
var _uselocale = Module["_uselocale"] = createExportWrapper("uselocale");

/** @type {function(...*):?} */
var _gl_locale_name_posix = Module["_gl_locale_name_posix"] = createExportWrapper("gl_locale_name_posix");

/** @type {function(...*):?} */
var _getenv = Module["_getenv"] = createExportWrapper("getenv");

/** @type {function(...*):?} */
var _gl_locale_name_environ = Module["_gl_locale_name_environ"] = createExportWrapper("gl_locale_name_environ");

/** @type {function(...*):?} */
var _gl_locale_name_default = Module["_gl_locale_name_default"] = createExportWrapper("gl_locale_name_default");

/** @type {function(...*):?} */
var _gl_locale_name = Module["_gl_locale_name"] = createExportWrapper("gl_locale_name");

/** @type {function(...*):?} */
var _rpl_lseek = Module["_rpl_lseek"] = createExportWrapper("rpl_lseek");

/** @type {function(...*):?} */
var _lseek = Module["_lseek"] = createExportWrapper("lseek");

/** @type {function(...*):?} */
var _rpl_lstat = Module["_rpl_lstat"] = createExportWrapper("rpl_lstat");

/** @type {function(...*):?} */
var _stat = Module["_stat"] = createExportWrapper("stat");

/** @type {function(...*):?} */
var _rpl_malloc = Module["_rpl_malloc"] = createExportWrapper("rpl_malloc");

/** @type {function(...*):?} */
var _mb_width_aux = Module["_mb_width_aux"] = createExportWrapper("mb_width_aux");

/** @type {function(...*):?} */
var _rpl_wcwidth = Module["_rpl_wcwidth"] = createExportWrapper("rpl_wcwidth");

/** @type {function(...*):?} */
var _iswcntrl = Module["_iswcntrl"] = createExportWrapper("iswcntrl");

/** @type {function(...*):?} */
var _mb_copy = Module["_mb_copy"] = createExportWrapper("mb_copy");

/** @type {function(...*):?} */
var _is_basic = Module["_is_basic"] = createExportWrapper("is_basic");

/** @type {function(...*):?} */
var _mbiter_multi_next = Module["_mbiter_multi_next"] = createExportWrapper("mbiter_multi_next");

/** @type {function(...*):?} */
var _mbsinit = Module["_mbsinit"] = createExportWrapper("mbsinit");

/** @type {function(...*):?} */
var _mbrtowc = Module["_mbrtowc"] = createExportWrapper("mbrtowc");

/** @type {function(...*):?} */
var _mbiter_multi_reloc = Module["_mbiter_multi_reloc"] = createExportWrapper("mbiter_multi_reloc");

/** @type {function(...*):?} */
var _mbiter_multi_copy = Module["_mbiter_multi_copy"] = createExportWrapper("mbiter_multi_copy");

/** @type {function(...*):?} */
var _rpl_mbrtowc = Module["_rpl_mbrtowc"] = createExportWrapper("rpl_mbrtowc");

/** @type {function(...*):?} */
var _gl_get_mbtowc_lock = Module["_gl_get_mbtowc_lock"] = createExportWrapper("gl_get_mbtowc_lock");

/** @type {function(...*):?} */
var _md4_init_ctx = Module["_md4_init_ctx"] = createExportWrapper("md4_init_ctx");

/** @type {function(...*):?} */
var _md4_read_ctx = Module["_md4_read_ctx"] = createExportWrapper("md4_read_ctx");

/** @type {function(...*):?} */
var _md4_finish_ctx = Module["_md4_finish_ctx"] = createExportWrapper("md4_finish_ctx");

/** @type {function(...*):?} */
var _md4_process_block = Module["_md4_process_block"] = createExportWrapper("md4_process_block");

/** @type {function(...*):?} */
var _md4_stream = Module["_md4_stream"] = createExportWrapper("md4_stream");

/** @type {function(...*):?} */
var _fread = Module["_fread"] = createExportWrapper("fread");

/** @type {function(...*):?} */
var _ferror_unlocked = Module["_ferror_unlocked"] = createExportWrapper("ferror_unlocked");

/** @type {function(...*):?} */
var _feof_unlocked = Module["_feof_unlocked"] = createExportWrapper("feof_unlocked");

/** @type {function(...*):?} */
var _md4_process_bytes = Module["_md4_process_bytes"] = createExportWrapper("md4_process_bytes");

/** @type {function(...*):?} */
var _md4_buffer = Module["_md4_buffer"] = createExportWrapper("md4_buffer");

/** @type {function(...*):?} */
var _memcasecmp = Module["_memcasecmp"] = createExportWrapper("memcasecmp");

/** @type {function(...*):?} */
var _toupper = Module["_toupper"] = createExportWrapper("toupper");

/** @type {function(...*):?} */
var ___memchr = Module["___memchr"] = createExportWrapper("__memchr");

/** @type {function(...*):?} */
var _memchr2 = Module["_memchr2"] = createExportWrapper("memchr2");

/** @type {function(...*):?} */
var _rpl_memmem = Module["_rpl_memmem"] = createExportWrapper("rpl_memmem");

/** @type {function(...*):?} */
var _mempcpy = Module["_mempcpy"] = createExportWrapper("mempcpy");

/** @type {function(...*):?} */
var ___memrchr = Module["___memrchr"] = createExportWrapper("__memrchr");

/** @type {function(...*):?} */
var _memrchr = Module["_memrchr"] = createExportWrapper("memrchr");

/** @type {function(...*):?} */
var _rpl_mkdir = Module["_rpl_mkdir"] = createExportWrapper("rpl_mkdir");

/** @type {function(...*):?} */
var _strdup = Module["_strdup"] = createExportWrapper("strdup");

/** @type {function(...*):?} */
var _mkdir = Module["_mkdir"] = createExportWrapper("mkdir");

/** @type {function(...*):?} */
var _strip_trailing_slashes = Module["_strip_trailing_slashes"] = createExportWrapper("strip_trailing_slashes");

/** @type {function(...*):?} */
var _gen_tempname = Module["_gen_tempname"] = createExportWrapper("gen_tempname");

/** @type {function(...*):?} */
var _mkstemp = Module["_mkstemp"] = createExportWrapper("mkstemp");

/** @type {function(...*):?} */
var _mktime_internal = Module["_mktime_internal"] = createExportWrapper("mktime_internal");

/** @type {function(...*):?} */
var _rpl_mktime = Module["_rpl_mktime"] = createExportWrapper("rpl_mktime");

/** @type {function(...*):?} */
var _tzset = Module["_tzset"] = createExportWrapper("tzset");

/** @type {function(...*):?} */
var _nl_langinfo = Module["_nl_langinfo"] = createExportWrapper("nl_langinfo");

/** @type {function(...*):?} */
var _nstrftime = Module["_nstrftime"] = createExportWrapper("nstrftime");

/** @type {function(...*):?} */
var _tolower = Module["_tolower"] = createExportWrapper("tolower");

/** @type {function(...*):?} */
var _offtostr = Module["_offtostr"] = createExportWrapper("offtostr");

/** @type {function(...*):?} */
var _open = Module["_open"] = createExportWrapper("open");

/** @type {function(...*):?} */
var _pipe2 = Module["_pipe2"] = createExportWrapper("pipe2");

/** @type {function(...*):?} */
var _pipe = Module["_pipe"] = createExportWrapper("pipe");

/** @type {function(...*):?} */
var _ldexp = Module["_ldexp"] = createExportWrapper("ldexp");

/** @type {function(...*):?} */
var _ldexpl = Module["_ldexpl"] = createExportWrapper("ldexpl");

/** @type {function(...*):?} */
var _set_program_name = Module["_set_program_name"] = createExportWrapper("set_program_name");

/** @type {function(...*):?} */
var _strrchr = Module["_strrchr"] = createExportWrapper("strrchr");

/** @type {function(...*):?} */
var _strncmp = Module["_strncmp"] = createExportWrapper("strncmp");

/** @type {function(...*):?} */
var _rawmemchr = Module["_rawmemchr"] = createExportWrapper("rawmemchr");

/** @type {function(...*):?} */
var _fread_file = Module["_fread_file"] = createExportWrapper("fread_file");

/** @type {function(...*):?} */
var _read_file = Module["_read_file"] = createExportWrapper("read_file");

/** @type {function(...*):?} */
var _setvbuf = Module["_setvbuf"] = createExportWrapper("setvbuf");

/** @type {function(...*):?} */
var _readlink = Module["_readlink"] = createExportWrapper("readlink");

/** @type {function(...*):?} */
var _rpl_realloc = Module["_rpl_realloc"] = createExportWrapper("rpl_realloc");

/** @type {function(...*):?} */
var _rpl_rename = Module["_rpl_rename"] = createExportWrapper("rpl_rename");

/** @type {function(...*):?} */
var _rename = Module["_rename"] = createExportWrapper("rename");

/** @type {function(...*):?} */
var _rijndaelKeySetupEnc = Module["_rijndaelKeySetupEnc"] = createExportWrapper("rijndaelKeySetupEnc");

/** @type {function(...*):?} */
var _rijndaelKeySetupDec = Module["_rijndaelKeySetupDec"] = createExportWrapper("rijndaelKeySetupDec");

/** @type {function(...*):?} */
var _rijndaelEncrypt = Module["_rijndaelEncrypt"] = createExportWrapper("rijndaelEncrypt");

/** @type {function(...*):?} */
var _rijndaelDecrypt = Module["_rijndaelDecrypt"] = createExportWrapper("rijndaelDecrypt");

/** @type {function(...*):?} */
var _rijndaelMakeKey = Module["_rijndaelMakeKey"] = createExportWrapper("rijndaelMakeKey");

/** @type {function(...*):?} */
var _strncpy = Module["_strncpy"] = createExportWrapper("strncpy");

/** @type {function(...*):?} */
var _rijndaelCipherInit = Module["_rijndaelCipherInit"] = createExportWrapper("rijndaelCipherInit");

/** @type {function(...*):?} */
var _rijndaelBlockEncrypt = Module["_rijndaelBlockEncrypt"] = createExportWrapper("rijndaelBlockEncrypt");

/** @type {function(...*):?} */
var _rijndaelPadEncrypt = Module["_rijndaelPadEncrypt"] = createExportWrapper("rijndaelPadEncrypt");

/** @type {function(...*):?} */
var _rijndaelBlockDecrypt = Module["_rijndaelBlockDecrypt"] = createExportWrapper("rijndaelBlockDecrypt");

/** @type {function(...*):?} */
var _rijndaelPadDecrypt = Module["_rijndaelPadDecrypt"] = createExportWrapper("rijndaelPadDecrypt");

/** @type {function(...*):?} */
var _rpl_rmdir = Module["_rpl_rmdir"] = createExportWrapper("rpl_rmdir");

/** @type {function(...*):?} */
var _round = Module["_round"] = createExportWrapper("round");

/** @type {function(...*):?} */
var _write = Module["_write"] = createExportWrapper("write");

/** @type {function(...*):?} */
var _secure_getenv = Module["_secure_getenv"] = createExportWrapper("secure_getenv");

/** @type {function(...*):?} */
var _issetugid = Module["_issetugid"] = createExportWrapper("issetugid");

/** @type {function(...*):?} */
var _rpl_select = Module["_rpl_select"] = createExportWrapper("rpl_select");

/** @type {function(...*):?} */
var _select = Module["_select"] = createExportWrapper("select");

/** @type {function(...*):?} */
var _rpl_setenv = Module["_rpl_setenv"] = createExportWrapper("rpl_setenv");

/** @type {function(...*):?} */
var _strchr = Module["_strchr"] = createExportWrapper("strchr");

/** @type {function(...*):?} */
var _setenv = Module["_setenv"] = createExportWrapper("setenv");

/** @type {function(...*):?} */
var _gl_get_setlocale_null_lock = Module["_gl_get_setlocale_null_lock"] = createExportWrapper("gl_get_setlocale_null_lock");

/** @type {function(...*):?} */
var _setlocale = Module["_setlocale"] = createExportWrapper("setlocale");

/** @type {function(...*):?} */
var _setlocale_null = Module["_setlocale_null"] = createExportWrapper("setlocale_null");

/** @type {function(...*):?} */
var _strcpy = Module["_strcpy"] = createExportWrapper("strcpy");

/** @type {function(...*):?} */
var _get_handler = Module["_get_handler"] = createExportWrapper("get_handler");

/** @type {function(...*):?} */
var _gl_signbitd = Module["_gl_signbitd"] = createExportWrapper("gl_signbitd");

/** @type {function(...*):?} */
var _gl_signbitf = Module["_gl_signbitf"] = createExportWrapper("gl_signbitf");

/** @type {function(...*):?} */
var _gl_signbitl = Module["_gl_signbitl"] = createExportWrapper("gl_signbitl");

/** @type {function(...*):?} */
var _gl_sockets_startup = Module["_gl_sockets_startup"] = createExportWrapper("gl_sockets_startup");

/** @type {function(...*):?} */
var _gl_sockets_cleanup = Module["_gl_sockets_cleanup"] = createExportWrapper("gl_sockets_cleanup");

/** @type {function(...*):?} */
var _get_stat_atime_ns = Module["_get_stat_atime_ns"] = createExportWrapper("get_stat_atime_ns");

/** @type {function(...*):?} */
var _get_stat_ctime_ns = Module["_get_stat_ctime_ns"] = createExportWrapper("get_stat_ctime_ns");

/** @type {function(...*):?} */
var _get_stat_mtime_ns = Module["_get_stat_mtime_ns"] = createExportWrapper("get_stat_mtime_ns");

/** @type {function(...*):?} */
var _get_stat_birthtime_ns = Module["_get_stat_birthtime_ns"] = createExportWrapper("get_stat_birthtime_ns");

/** @type {function(...*):?} */
var _get_stat_atime = Module["_get_stat_atime"] = createExportWrapper("get_stat_atime");

/** @type {function(...*):?} */
var _get_stat_ctime = Module["_get_stat_ctime"] = createExportWrapper("get_stat_ctime");

/** @type {function(...*):?} */
var _get_stat_mtime = Module["_get_stat_mtime"] = createExportWrapper("get_stat_mtime");

/** @type {function(...*):?} */
var _get_stat_birthtime = Module["_get_stat_birthtime"] = createExportWrapper("get_stat_birthtime");

/** @type {function(...*):?} */
var _stat_time_normalize = Module["_stat_time_normalize"] = createExportWrapper("stat_time_normalize");

/** @type {function(...*):?} */
var _rpl_stat = Module["_rpl_stat"] = createExportWrapper("rpl_stat");

/** @type {function(...*):?} */
var ___stpcpy = Module["___stpcpy"] = createExportWrapper("__stpcpy");

/** @type {function(...*):?} */
var _stpcpy = Module["_stpcpy"] = createExportWrapper("stpcpy");

/** @type {function(...*):?} */
var _strcasecmp = Module["_strcasecmp"] = createExportWrapper("strcasecmp");

/** @type {function(...*):?} */
var _isupper = Module["_isupper"] = createExportWrapper("isupper");

/** @type {function(...*):?} */
var _rpl_strcasestr = Module["_rpl_strcasestr"] = createExportWrapper("rpl_strcasestr");

/** @type {function(...*):?} */
var _strncasecmp = Module["_strncasecmp"] = createExportWrapper("strncasecmp");

/** @type {function(...*):?} */
var ___strdup = Module["___strdup"] = createExportWrapper("__strdup");

/** @type {function(...*):?} */
var _strerror_override = Module["_strerror_override"] = createExportWrapper("strerror_override");

/** @type {function(...*):?} */
var _strerror = Module["_strerror"] = createExportWrapper("strerror");

/** @type {function(...*):?} */
var _strndup = Module["_strndup"] = createExportWrapper("strndup");

/** @type {function(...*):?} */
var _strnlen = Module["_strnlen"] = createExportWrapper("strnlen");

/** @type {function(...*):?} */
var _strsep = Module["_strsep"] = createExportWrapper("strsep");

/** @type {function(...*):?} */
var _strpbrk = Module["_strpbrk"] = createExportWrapper("strpbrk");

/** @type {function(...*):?} */
var _gen_tempname_len = Module["_gen_tempname_len"] = createExportWrapper("gen_tempname_len");

/** @type {function(...*):?} */
var _try_tempname_len = Module["_try_tempname_len"] = createExportWrapper("try_tempname_len");

/** @type {function(...*):?} */
var _strspn = Module["_strspn"] = createExportWrapper("strspn");

/** @type {function(...*):?} */
var _rpl_timegm = Module["_rpl_timegm"] = createExportWrapper("rpl_timegm");

/** @type {function(...*):?} */
var _timespec_add = Module["_timespec_add"] = createExportWrapper("timespec_add");

/** @type {function(...*):?} */
var _timespec_sub = Module["_timespec_sub"] = createExportWrapper("timespec_sub");

/** @type {function(...*):?} */
var _make_timespec = Module["_make_timespec"] = createExportWrapper("make_timespec");

/** @type {function(...*):?} */
var _timespec_cmp = Module["_timespec_cmp"] = createExportWrapper("timespec_cmp");

/** @type {function(...*):?} */
var _timespec_sign = Module["_timespec_sign"] = createExportWrapper("timespec_sign");

/** @type {function(...*):?} */
var _timespectod = Module["_timespectod"] = createExportWrapper("timespectod");

/** @type {function(...*):?} */
var _trunc = Module["_trunc"] = createExportWrapper("trunc");

/** @type {function(...*):?} */
var _uinttostr = Module["_uinttostr"] = createExportWrapper("uinttostr");

/** @type {function(...*):?} */
var _umaxtostr = Module["_umaxtostr"] = createExportWrapper("umaxtostr");

/** @type {function(...*):?} */
var _rpl_unsetenv = Module["_rpl_unsetenv"] = createExportWrapper("rpl_unsetenv");

/** @type {function(...*):?} */
var _unsetenv = Module["_unsetenv"] = createExportWrapper("unsetenv");

/** @type {function(...*):?} */
var ___small_sprintf = Module["___small_sprintf"] = createExportWrapper("__small_sprintf");

/** @type {function(...*):?} */
var _version_etc_arn = Module["_version_etc_arn"] = createExportWrapper("version_etc_arn");

/** @type {function(...*):?} */
var _version_etc_ar = Module["_version_etc_ar"] = createExportWrapper("version_etc_ar");

/** @type {function(...*):?} */
var _version_etc_va = Module["_version_etc_va"] = createExportWrapper("version_etc_va");

/** @type {function(...*):?} */
var _rpl_vprintf = Module["_rpl_vprintf"] = createExportWrapper("rpl_vprintf");

/** @type {function(...*):?} */
var _rpl_vsnprintf = Module["_rpl_vsnprintf"] = createExportWrapper("rpl_vsnprintf");

/** @type {function(...*):?} */
var _rpl_vsprintf = Module["_rpl_vsprintf"] = createExportWrapper("rpl_vsprintf");

/** @type {function(...*):?} */
var _wcrtomb = Module["_wcrtomb"] = createExportWrapper("wcrtomb");

/** @type {function(...*):?} */
var _wcwidth = Module["_wcwidth"] = createExportWrapper("wcwidth");

/** @type {function(...*):?} */
var _xasprintf = Module["_xasprintf"] = createExportWrapper("xasprintf");

/** @type {function(...*):?} */
var _xvasprintf = Module["_xvasprintf"] = createExportWrapper("xvasprintf");

/** @type {function(...*):?} */
var _xset_binary_mode_error = Module["_xset_binary_mode_error"] = createExportWrapper("xset_binary_mode_error");

/** @type {function(...*):?} */
var _xset_binary_mode = Module["_xset_binary_mode"] = createExportWrapper("xset_binary_mode");

/** @type {function(...*):?} */
var _xnmalloc = Module["_xnmalloc"] = createExportWrapper("xnmalloc");

/** @type {function(...*):?} */
var _xnrealloc = Module["_xnrealloc"] = createExportWrapper("xnrealloc");

/** @type {function(...*):?} */
var _xrealloc = Module["_xrealloc"] = createExportWrapper("xrealloc");

/** @type {function(...*):?} */
var _x2nrealloc = Module["_x2nrealloc"] = createExportWrapper("x2nrealloc");

/** @type {function(...*):?} */
var _xcharalloc = Module["_xcharalloc"] = createExportWrapper("xcharalloc");

/** @type {function(...*):?} */
var _x2realloc = Module["_x2realloc"] = createExportWrapper("x2realloc");

/** @type {function(...*):?} */
var _xcalloc = Module["_xcalloc"] = createExportWrapper("xcalloc");

/** @type {function(...*):?} */
var _xmemdup = Module["_xmemdup"] = createExportWrapper("xmemdup");

/** @type {function(...*):?} */
var _xmemdup0 = Module["_xmemdup0"] = createExportWrapper("xmemdup0");

/** @type {function(...*):?} */
var _xreadlink = Module["_xreadlink"] = createExportWrapper("xreadlink");

/** @type {function(...*):?} */
var _xsum = Module["_xsum"] = createExportWrapper("xsum");

/** @type {function(...*):?} */
var _xsum3 = Module["_xsum3"] = createExportWrapper("xsum3");

/** @type {function(...*):?} */
var _xsum4 = Module["_xsum4"] = createExportWrapper("xsum4");

/** @type {function(...*):?} */
var _xmax = Module["_xmax"] = createExportWrapper("xmax");

/** @type {function(...*):?} */
var _rpl_iconv = Module["_rpl_iconv"] = createExportWrapper("rpl_iconv");

/** @type {function(...*):?} */
var _iconv = Module["_iconv"] = createExportWrapper("iconv");

/** @type {function(...*):?} */
var _rpl_iconv_open = Module["_rpl_iconv_open"] = createExportWrapper("rpl_iconv_open");

/** @type {function(...*):?} */
var _iconv_open = Module["_iconv_open"] = createExportWrapper("iconv_open");

/** @type {function(...*):?} */
var _reg_sweep = Module["_reg_sweep"] = createExportWrapper("reg_sweep");

/** @type {function(...*):?} */
var _ptukey = Module["_ptukey"] = createExportWrapper("ptukey");

/** @type {function(...*):?} */
var _log = Module["_log"] = createExportWrapper("log");

/** @type {function(...*):?} */
var _log1p = Module["_log1p"] = createExportWrapper("log1p");

/** @type {function(...*):?} */
var _sin = Module["_sin"] = createExportWrapper("sin");

/** @type {function(...*):?} */
var _cos = Module["_cos"] = createExportWrapper("cos");

/** @type {function(...*):?} */
var _pow = Module["_pow"] = createExportWrapper("pow");

/** @type {function(...*):?} */
var _exp2 = Module["_exp2"] = createExportWrapper("exp2");

/** @type {function(...*):?} */
var _fmod = Module["_fmod"] = createExportWrapper("fmod");

/** @type {function(...*):?} */
var _exp = Module["_exp"] = createExportWrapper("exp");

/** @type {function(...*):?} */
var _atan2 = Module["_atan2"] = createExportWrapper("atan2");

/** @type {function(...*):?} */
var _hypot = Module["_hypot"] = createExportWrapper("hypot");

/** @type {function(...*):?} */
var _cosh = Module["_cosh"] = createExportWrapper("cosh");

/** @type {function(...*):?} */
var _sinh = Module["_sinh"] = createExportWrapper("sinh");

/** @type {function(...*):?} */
var _tanh = Module["_tanh"] = createExportWrapper("tanh");

/** @type {function(...*):?} */
var _asin = Module["_asin"] = createExportWrapper("asin");

/** @type {function(...*):?} */
var _acosh = Module["_acosh"] = createExportWrapper("acosh");

/** @type {function(...*):?} */
var _atan = Module["_atan"] = createExportWrapper("atan");

/** @type {function(...*):?} */
var _acos = Module["_acos"] = createExportWrapper("acos");

/** @type {function(...*):?} */
var _atanh = Module["_atanh"] = createExportWrapper("atanh");

/** @type {function(...*):?} */
var ___extenddftf2 = Module["___extenddftf2"] = createExportWrapper("__extenddftf2");

/** @type {function(...*):?} */
var _qtukey = Module["_qtukey"] = createExportWrapper("qtukey");

/** @type {function(...*):?} */
var _expm1 = Module["_expm1"] = createExportWrapper("expm1");

/** @type {function(...*):?} */
var _case_create = Module["_case_create"] = createExportWrapper("case_create");

/** @type {function(...*):?} */
var _caseproto_try_init_values = Module["_caseproto_try_init_values"] = createExportWrapper("caseproto_try_init_values");

/** @type {function(...*):?} */
var _case_try_create = Module["_case_try_create"] = createExportWrapper("case_try_create");

/** @type {function(...*):?} */
var _case_clone = Module["_case_clone"] = createExportWrapper("case_clone");

/** @type {function(...*):?} */
var _case_copy = Module["_case_copy"] = createExportWrapper("case_copy");

/** @type {function(...*):?} */
var _case_ref = Module["_case_ref"] = createExportWrapper("case_ref");

/** @type {function(...*):?} */
var _case_get_cost = Module["_case_get_cost"] = createExportWrapper("case_get_cost");

/** @type {function(...*):?} */
var _case_resize = Module["_case_resize"] = createExportWrapper("case_resize");

/** @type {function(...*):?} */
var _caseproto_reinit_values = Module["_caseproto_reinit_values"] = createExportWrapper("caseproto_reinit_values");

/** @type {function(...*):?} */
var _caseproto_free__ = Module["_caseproto_free__"] = createExportWrapper("caseproto_free__");

/** @type {function(...*):?} */
var _case_unshare_and_resize = Module["_case_unshare_and_resize"] = createExportWrapper("case_unshare_and_resize");

/** @type {function(...*):?} */
var _caseproto_range_is_valid = Module["_caseproto_range_is_valid"] = createExportWrapper("caseproto_range_is_valid");

/** @type {function(...*):?} */
var _caseproto_equal = Module["_caseproto_equal"] = createExportWrapper("caseproto_equal");

/** @type {function(...*):?} */
var _case_set_missing = Module["_case_set_missing"] = createExportWrapper("case_set_missing");

/** @type {function(...*):?} */
var _value_set_missing = Module["_value_set_missing"] = createExportWrapper("value_set_missing");

/** @type {function(...*):?} */
var _case_copy_out = Module["_case_copy_out"] = createExportWrapper("case_copy_out");

/** @type {function(...*):?} */
var _case_copy_in = Module["_case_copy_in"] = createExportWrapper("case_copy_in");

/** @type {function(...*):?} */
var _case_data = Module["_case_data"] = createExportWrapper("case_data");

/** @type {function(...*):?} */
var _var_get_case_index = Module["_var_get_case_index"] = createExportWrapper("var_get_case_index");

/** @type {function(...*):?} */
var _var_get_width = Module["_var_get_width"] = createExportWrapper("var_get_width");

/** @type {function(...*):?} */
var _case_data_idx = Module["_case_data_idx"] = createExportWrapper("case_data_idx");

/** @type {function(...*):?} */
var _case_data_rw = Module["_case_data_rw"] = createExportWrapper("case_data_rw");

/** @type {function(...*):?} */
var _case_data_rw_idx = Module["_case_data_rw_idx"] = createExportWrapper("case_data_rw_idx");

/** @type {function(...*):?} */
var _case_num = Module["_case_num"] = createExportWrapper("case_num");

/** @type {function(...*):?} */
var _case_num_idx = Module["_case_num_idx"] = createExportWrapper("case_num_idx");

/** @type {function(...*):?} */
var _case_str = Module["_case_str"] = createExportWrapper("case_str");

/** @type {function(...*):?} */
var _case_str_idx = Module["_case_str_idx"] = createExportWrapper("case_str_idx");

/** @type {function(...*):?} */
var _case_str_rw = Module["_case_str_rw"] = createExportWrapper("case_str_rw");

/** @type {function(...*):?} */
var _case_str_rw_idx = Module["_case_str_rw_idx"] = createExportWrapper("case_str_rw_idx");

/** @type {function(...*):?} */
var _case_compare = Module["_case_compare"] = createExportWrapper("case_compare");

/** @type {function(...*):?} */
var _case_compare_2dict = Module["_case_compare_2dict"] = createExportWrapper("case_compare_2dict");

/** @type {function(...*):?} */
var _value_compare_3way = Module["_value_compare_3way"] = createExportWrapper("value_compare_3way");

/** @type {function(...*):?} */
var _case_data_all = Module["_case_data_all"] = createExportWrapper("case_data_all");

/** @type {function(...*):?} */
var _case_data_all_rw = Module["_case_data_all_rw"] = createExportWrapper("case_data_all_rw");

/** @type {function(...*):?} */
var _case_unshare__ = Module["_case_unshare__"] = createExportWrapper("case_unshare__");

/** @type {function(...*):?} */
var _case_unref__ = Module["_case_unref__"] = createExportWrapper("case_unref__");

/** @type {function(...*):?} */
var _caseproto_destroy_values = Module["_caseproto_destroy_values"] = createExportWrapper("caseproto_destroy_values");

/** @type {function(...*):?} */
var _caseproto_create = Module["_caseproto_create"] = createExportWrapper("caseproto_create");

/** @type {function(...*):?} */
var _caseproto_ref_pool = Module["_caseproto_ref_pool"] = createExportWrapper("caseproto_ref_pool");

/** @type {function(...*):?} */
var _pool_register = Module["_pool_register"] = createExportWrapper("pool_register");

/** @type {function(...*):?} */
var _caseproto_reserve = Module["_caseproto_reserve"] = createExportWrapper("caseproto_reserve");

/** @type {function(...*):?} */
var _caseproto_add_width = Module["_caseproto_add_width"] = createExportWrapper("caseproto_add_width");

/** @type {function(...*):?} */
var _caseproto_set_width = Module["_caseproto_set_width"] = createExportWrapper("caseproto_set_width");

/** @type {function(...*):?} */
var _caseproto_insert_width = Module["_caseproto_insert_width"] = createExportWrapper("caseproto_insert_width");

/** @type {function(...*):?} */
var _insert_element = Module["_insert_element"] = createExportWrapper("insert_element");

/** @type {function(...*):?} */
var _caseproto_remove_widths = Module["_caseproto_remove_widths"] = createExportWrapper("caseproto_remove_widths");

/** @type {function(...*):?} */
var _remove_range = Module["_remove_range"] = createExportWrapper("remove_range");

/** @type {function(...*):?} */
var _caseproto_move_widths = Module["_caseproto_move_widths"] = createExportWrapper("caseproto_move_widths");

/** @type {function(...*):?} */
var _move_range = Module["_move_range"] = createExportWrapper("move_range");

/** @type {function(...*):?} */
var _caseproto_is_conformable = Module["_caseproto_is_conformable"] = createExportWrapper("caseproto_is_conformable");

/** @type {function(...*):?} */
var _caseproto_needs_init_values = Module["_caseproto_needs_init_values"] = createExportWrapper("caseproto_needs_init_values");

/** @type {function(...*):?} */
var _caseproto_init_values = Module["_caseproto_init_values"] = createExportWrapper("caseproto_init_values");

/** @type {function(...*):?} */
var _caseproto_refresh_string_cache__ = Module["_caseproto_refresh_string_cache__"] = createExportWrapper("caseproto_refresh_string_cache__");

/** @type {function(...*):?} */
var _caseproto_copy = Module["_caseproto_copy"] = createExportWrapper("caseproto_copy");

/** @type {function(...*):?} */
var _value_copy_rpad = Module["_value_copy_rpad"] = createExportWrapper("value_copy_rpad");

/** @type {function(...*):?} */
var _u8_buf_copy_rpad = Module["_u8_buf_copy_rpad"] = createExportWrapper("u8_buf_copy_rpad");

/** @type {function(...*):?} */
var _value_copy_str_rpad = Module["_value_copy_str_rpad"] = createExportWrapper("value_copy_str_rpad");

/** @type {function(...*):?} */
var _value_copy_buf_rpad = Module["_value_copy_buf_rpad"] = createExportWrapper("value_copy_buf_rpad");

/** @type {function(...*):?} */
var _value_equal = Module["_value_equal"] = createExportWrapper("value_equal");

/** @type {function(...*):?} */
var _value_hash = Module["_value_hash"] = createExportWrapper("value_hash");

/** @type {function(...*):?} */
var _hash_double = Module["_hash_double"] = createExportWrapper("hash_double");

/** @type {function(...*):?} */
var _hash_bytes = Module["_hash_bytes"] = createExportWrapper("hash_bytes");

/** @type {function(...*):?} */
var _value_is_resizable = Module["_value_is_resizable"] = createExportWrapper("value_is_resizable");

/** @type {function(...*):?} */
var _value_resize = Module["_value_resize"] = createExportWrapper("value_resize");

/** @type {function(...*):?} */
var _value_is_spaces = Module["_value_is_spaces"] = createExportWrapper("value_is_spaces");

/** @type {function(...*):?} */
var _value_needs_resize = Module["_value_needs_resize"] = createExportWrapper("value_needs_resize");

/** @type {function(...*):?} */
var _value_init_pool = Module["_value_init_pool"] = createExportWrapper("value_init_pool");

/** @type {function(...*):?} */
var _pool_alloc_unaligned = Module["_pool_alloc_unaligned"] = createExportWrapper("pool_alloc_unaligned");

/** @type {function(...*):?} */
var _value_clone_pool = Module["_value_clone_pool"] = createExportWrapper("value_clone_pool");

/** @type {function(...*):?} */
var _pool_clone_unaligned = Module["_pool_clone_unaligned"] = createExportWrapper("pool_clone_unaligned");

/** @type {function(...*):?} */
var _value_resize_pool = Module["_value_resize_pool"] = createExportWrapper("value_resize_pool");

/** @type {function(...*):?} */
var _var_create = Module["_var_create"] = createExportWrapper("var_create");

/** @type {function(...*):?} */
var _ds_destroy = Module["_ds_destroy"] = createExportWrapper("ds_destroy");

/** @type {function(...*):?} */
var _mv_init = Module["_mv_init"] = createExportWrapper("mv_init");

/** @type {function(...*):?} */
var _dict_class_from_id = Module["_dict_class_from_id"] = createExportWrapper("dict_class_from_id");

/** @type {function(...*):?} */
var _fmt_for_output = Module["_fmt_for_output"] = createExportWrapper("fmt_for_output");

/** @type {function(...*):?} */
var _attrset_init = Module["_attrset_init"] = createExportWrapper("attrset_init");

/** @type {function(...*):?} */
var _var_must_leave = Module["_var_must_leave"] = createExportWrapper("var_must_leave");

/** @type {function(...*):?} */
var _var_default_alignment = Module["_var_default_alignment"] = createExportWrapper("var_default_alignment");

/** @type {function(...*):?} */
var _var_default_measure = Module["_var_default_measure"] = createExportWrapper("var_default_measure");

/** @type {function(...*):?} */
var _var_default_display_width = Module["_var_default_display_width"] = createExportWrapper("var_default_display_width");

/** @type {function(...*):?} */
var _var_default_formats = Module["_var_default_formats"] = createExportWrapper("var_default_formats");

/** @type {function(...*):?} */
var _var_ref = Module["_var_ref"] = createExportWrapper("var_ref");

/** @type {function(...*):?} */
var _var_unref = Module["_var_unref"] = createExportWrapper("var_unref");

/** @type {function(...*):?} */
var _mv_destroy = Module["_mv_destroy"] = createExportWrapper("mv_destroy");

/** @type {function(...*):?} */
var _val_labs_destroy = Module["_val_labs_destroy"] = createExportWrapper("val_labs_destroy");

/** @type {function(...*):?} */
var _attrset_destroy = Module["_attrset_destroy"] = createExportWrapper("attrset_destroy");

/** @type {function(...*):?} */
var _var_set_name = Module["_var_set_name"] = createExportWrapper("var_set_name");

/** @type {function(...*):?} */
var _var_clone = Module["_var_clone"] = createExportWrapper("var_clone");

/** @type {function(...*):?} */
var _dict_var_changed = Module["_dict_var_changed"] = createExportWrapper("dict_var_changed");

/** @type {function(...*):?} */
var _mv_is_resizable = Module["_mv_is_resizable"] = createExportWrapper("mv_is_resizable");

/** @type {function(...*):?} */
var _mv_copy = Module["_mv_copy"] = createExportWrapper("mv_copy");

/** @type {function(...*):?} */
var _mv_resize = Module["_mv_resize"] = createExportWrapper("mv_resize");

/** @type {function(...*):?} */
var _fmt_equal = Module["_fmt_equal"] = createExportWrapper("fmt_equal");

/** @type {function(...*):?} */
var _fmt_check_width_compat = Module["_fmt_check_width_compat"] = createExportWrapper("fmt_check_width_compat");

/** @type {function(...*):?} */
var _val_labs_can_set_width = Module["_val_labs_can_set_width"] = createExportWrapper("val_labs_can_set_width");

/** @type {function(...*):?} */
var _val_labs_clone = Module["_val_labs_clone"] = createExportWrapper("val_labs_clone");

/** @type {function(...*):?} */
var _val_labs_set_width = Module["_val_labs_set_width"] = createExportWrapper("val_labs_set_width");

/** @type {function(...*):?} */
var _attrset_clone = Module["_attrset_clone"] = createExportWrapper("attrset_clone");

/** @type {function(...*):?} */
var _var_get_dict_class = Module["_var_get_dict_class"] = createExportWrapper("var_get_dict_class");

/** @type {function(...*):?} */
var _compare_vars_by_name = Module["_compare_vars_by_name"] = createExportWrapper("compare_vars_by_name");

/** @type {function(...*):?} */
var _utf8_strcasecmp = Module["_utf8_strcasecmp"] = createExportWrapper("utf8_strcasecmp");

/** @type {function(...*):?} */
var _hash_var_by_name = Module["_hash_var_by_name"] = createExportWrapper("hash_var_by_name");

/** @type {function(...*):?} */
var _utf8_hash_case_string = Module["_utf8_hash_case_string"] = createExportWrapper("utf8_hash_case_string");

/** @type {function(...*):?} */
var _compare_var_ptrs_by_name = Module["_compare_var_ptrs_by_name"] = createExportWrapper("compare_var_ptrs_by_name");

/** @type {function(...*):?} */
var _compare_var_ptrs_by_dict_index = Module["_compare_var_ptrs_by_dict_index"] = createExportWrapper("compare_var_ptrs_by_dict_index");

/** @type {function(...*):?} */
var _vardict_get_dict_index = Module["_vardict_get_dict_index"] = createExportWrapper("vardict_get_dict_index");

/** @type {function(...*):?} */
var _var_get_dict_index = Module["_var_get_dict_index"] = createExportWrapper("var_get_dict_index");

/** @type {function(...*):?} */
var _hash_var_ptr_by_name = Module["_hash_var_ptr_by_name"] = createExportWrapper("hash_var_ptr_by_name");

/** @type {function(...*):?} */
var _var_get_type = Module["_var_get_type"] = createExportWrapper("var_get_type");

/** @type {function(...*):?} */
var _var_set_width_and_formats = Module["_var_set_width_and_formats"] = createExportWrapper("var_set_width_and_formats");

/** @type {function(...*):?} */
var _fmt_resize = Module["_fmt_resize"] = createExportWrapper("fmt_resize");

/** @type {function(...*):?} */
var _var_set_width = Module["_var_set_width"] = createExportWrapper("var_set_width");

/** @type {function(...*):?} */
var _var_is_numeric = Module["_var_is_numeric"] = createExportWrapper("var_is_numeric");

/** @type {function(...*):?} */
var _var_is_alpha = Module["_var_is_alpha"] = createExportWrapper("var_is_alpha");

/** @type {function(...*):?} */
var _var_get_missing_values = Module["_var_get_missing_values"] = createExportWrapper("var_get_missing_values");

/** @type {function(...*):?} */
var _var_set_missing_values = Module["_var_set_missing_values"] = createExportWrapper("var_set_missing_values");

/** @type {function(...*):?} */
var _mv_clear = Module["_mv_clear"] = createExportWrapper("mv_clear");

/** @type {function(...*):?} */
var _var_clear_missing_values = Module["_var_clear_missing_values"] = createExportWrapper("var_clear_missing_values");

/** @type {function(...*):?} */
var _var_has_missing_values = Module["_var_has_missing_values"] = createExportWrapper("var_has_missing_values");

/** @type {function(...*):?} */
var _mv_is_empty = Module["_mv_is_empty"] = createExportWrapper("mv_is_empty");

/** @type {function(...*):?} */
var _var_is_value_missing = Module["_var_is_value_missing"] = createExportWrapper("var_is_value_missing");

/** @type {function(...*):?} */
var _mv_is_value_missing = Module["_mv_is_value_missing"] = createExportWrapper("mv_is_value_missing");

/** @type {function(...*):?} */
var _var_is_num_missing = Module["_var_is_num_missing"] = createExportWrapper("var_is_num_missing");

/** @type {function(...*):?} */
var _mv_is_num_missing = Module["_mv_is_num_missing"] = createExportWrapper("mv_is_num_missing");

/** @type {function(...*):?} */
var _var_is_str_missing = Module["_var_is_str_missing"] = createExportWrapper("var_is_str_missing");

/** @type {function(...*):?} */
var _mv_is_str_missing = Module["_mv_is_str_missing"] = createExportWrapper("mv_is_str_missing");

/** @type {function(...*):?} */
var _var_get_value_labels = Module["_var_get_value_labels"] = createExportWrapper("var_get_value_labels");

/** @type {function(...*):?} */
var _var_has_value_labels = Module["_var_has_value_labels"] = createExportWrapper("var_has_value_labels");

/** @type {function(...*):?} */
var _val_labs_count = Module["_val_labs_count"] = createExportWrapper("val_labs_count");

/** @type {function(...*):?} */
var _var_set_value_labels = Module["_var_set_value_labels"] = createExportWrapper("var_set_value_labels");

/** @type {function(...*):?} */
var _var_add_value_label = Module["_var_add_value_label"] = createExportWrapper("var_add_value_label");

/** @type {function(...*):?} */
var _val_labs_create = Module["_val_labs_create"] = createExportWrapper("val_labs_create");

/** @type {function(...*):?} */
var _val_labs_add = Module["_val_labs_add"] = createExportWrapper("val_labs_add");

/** @type {function(...*):?} */
var _var_replace_value_label = Module["_var_replace_value_label"] = createExportWrapper("var_replace_value_label");

/** @type {function(...*):?} */
var _val_labs_replace = Module["_val_labs_replace"] = createExportWrapper("val_labs_replace");

/** @type {function(...*):?} */
var _var_clear_value_labels = Module["_var_clear_value_labels"] = createExportWrapper("var_clear_value_labels");

/** @type {function(...*):?} */
var _var_lookup_value_label = Module["_var_lookup_value_label"] = createExportWrapper("var_lookup_value_label");

/** @type {function(...*):?} */
var _val_labs_find = Module["_val_labs_find"] = createExportWrapper("val_labs_find");

/** @type {function(...*):?} */
var _var_append_value_name__ = Module["_var_append_value_name__"] = createExportWrapper("var_append_value_name__");

/** @type {function(...*):?} */
var _dict_get_encoding = Module["_dict_get_encoding"] = createExportWrapper("dict_get_encoding");

/** @type {function(...*):?} */
var _ss_rtrim = Module["_ss_rtrim"] = createExportWrapper("ss_rtrim");

/** @type {function(...*):?} */
var _var_append_value_name = Module["_var_append_value_name"] = createExportWrapper("var_append_value_name");

/** @type {function(...*):?} */
var _settings_get_show_values = Module["_settings_get_show_values"] = createExportWrapper("settings_get_show_values");

/** @type {function(...*):?} */
var _var_get_print_format = Module["_var_get_print_format"] = createExportWrapper("var_get_print_format");

/** @type {function(...*):?} */
var _var_set_print_format = Module["_var_set_print_format"] = createExportWrapper("var_set_print_format");

/** @type {function(...*):?} */
var _var_get_write_format = Module["_var_get_write_format"] = createExportWrapper("var_get_write_format");

/** @type {function(...*):?} */
var _var_set_write_format = Module["_var_set_write_format"] = createExportWrapper("var_set_write_format");

/** @type {function(...*):?} */
var _var_set_both_formats = Module["_var_set_both_formats"] = createExportWrapper("var_set_both_formats");

/** @type {function(...*):?} */
var _var_to_string = Module["_var_to_string"] = createExportWrapper("var_to_string");

/** @type {function(...*):?} */
var _settings_get_show_variables = Module["_settings_get_show_variables"] = createExportWrapper("settings_get_show_variables");

/** @type {function(...*):?} */
var _ds_is_empty = Module["_ds_is_empty"] = createExportWrapper("ds_is_empty");

/** @type {function(...*):?} */
var _ds_cstr = Module["_ds_cstr"] = createExportWrapper("ds_cstr");

/** @type {function(...*):?} */
var _var_get_label = Module["_var_get_label"] = createExportWrapper("var_get_label");

/** @type {function(...*):?} */
var _var_set_label = Module["_var_set_label"] = createExportWrapper("var_set_label");

/** @type {function(...*):?} */
var _var_clear_label = Module["_var_clear_label"] = createExportWrapper("var_clear_label");

/** @type {function(...*):?} */
var _var_has_label = Module["_var_has_label"] = createExportWrapper("var_has_label");

/** @type {function(...*):?} */
var _measure_is_valid = Module["_measure_is_valid"] = createExportWrapper("measure_is_valid");

/** @type {function(...*):?} */
var _measure_to_string = Module["_measure_to_string"] = createExportWrapper("measure_to_string");

/** @type {function(...*):?} */
var _measure_to_syntax = Module["_measure_to_syntax"] = createExportWrapper("measure_to_syntax");

/** @type {function(...*):?} */
var _var_get_measure = Module["_var_get_measure"] = createExportWrapper("var_get_measure");

/** @type {function(...*):?} */
var _var_set_measure = Module["_var_set_measure"] = createExportWrapper("var_set_measure");

/** @type {function(...*):?} */
var _var_role_is_valid = Module["_var_role_is_valid"] = createExportWrapper("var_role_is_valid");

/** @type {function(...*):?} */
var _var_role_to_string = Module["_var_role_to_string"] = createExportWrapper("var_role_to_string");

/** @type {function(...*):?} */
var _var_role_to_syntax = Module["_var_role_to_syntax"] = createExportWrapper("var_role_to_syntax");

/** @type {function(...*):?} */
var _var_get_role = Module["_var_get_role"] = createExportWrapper("var_get_role");

/** @type {function(...*):?} */
var _var_set_role = Module["_var_set_role"] = createExportWrapper("var_set_role");

/** @type {function(...*):?} */
var _var_get_display_width = Module["_var_get_display_width"] = createExportWrapper("var_get_display_width");

/** @type {function(...*):?} */
var _var_set_display_width = Module["_var_set_display_width"] = createExportWrapper("var_set_display_width");

/** @type {function(...*):?} */
var _alignment_is_valid = Module["_alignment_is_valid"] = createExportWrapper("alignment_is_valid");

/** @type {function(...*):?} */
var _alignment_to_string = Module["_alignment_to_string"] = createExportWrapper("alignment_to_string");

/** @type {function(...*):?} */
var _alignment_to_syntax = Module["_alignment_to_syntax"] = createExportWrapper("alignment_to_syntax");

/** @type {function(...*):?} */
var _var_get_alignment = Module["_var_get_alignment"] = createExportWrapper("var_get_alignment");

/** @type {function(...*):?} */
var _var_set_alignment = Module["_var_set_alignment"] = createExportWrapper("var_set_alignment");

/** @type {function(...*):?} */
var _var_get_leave = Module["_var_get_leave"] = createExportWrapper("var_get_leave");

/** @type {function(...*):?} */
var _var_set_leave = Module["_var_set_leave"] = createExportWrapper("var_set_leave");

/** @type {function(...*):?} */
var _var_get_short_name_cnt = Module["_var_get_short_name_cnt"] = createExportWrapper("var_get_short_name_cnt");

/** @type {function(...*):?} */
var _var_get_short_name = Module["_var_get_short_name"] = createExportWrapper("var_get_short_name");

/** @type {function(...*):?} */
var _var_set_short_name = Module["_var_set_short_name"] = createExportWrapper("var_set_short_name");

/** @type {function(...*):?} */
var _utf8_to_upper = Module["_utf8_to_upper"] = createExportWrapper("utf8_to_upper");

/** @type {function(...*):?} */
var _var_clear_short_names = Module["_var_clear_short_names"] = createExportWrapper("var_clear_short_names");

/** @type {function(...*):?} */
var _var_has_vardict = Module["_var_has_vardict"] = createExportWrapper("var_has_vardict");

/** @type {function(...*):?} */
var _var_get_attributes = Module["_var_get_attributes"] = createExportWrapper("var_get_attributes");

/** @type {function(...*):?} */
var _var_set_attributes = Module["_var_set_attributes"] = createExportWrapper("var_set_attributes");

/** @type {function(...*):?} */
var _var_has_attributes = Module["_var_has_attributes"] = createExportWrapper("var_has_attributes");

/** @type {function(...*):?} */
var _attrset_count = Module["_attrset_count"] = createExportWrapper("attrset_count");

/** @type {function(...*):?} */
var _var_get_encoding = Module["_var_get_encoding"] = createExportWrapper("var_get_encoding");

/** @type {function(...*):?} */
var _var_get_vardict = Module["_var_get_vardict"] = createExportWrapper("var_get_vardict");

/** @type {function(...*):?} */
var _var_set_vardict = Module["_var_set_vardict"] = createExportWrapper("var_set_vardict");

/** @type {function(...*):?} */
var _var_clear_vardict = Module["_var_clear_vardict"] = createExportWrapper("var_clear_vardict");

/** @type {function(...*):?} */
var _var_force_valid_weight = Module["_var_force_valid_weight"] = createExportWrapper("var_force_valid_weight");

/** @type {function(...*):?} */
var _mrset_clone = Module["_mrset_clone"] = createExportWrapper("mrset_clone");

/** @type {function(...*):?} */
var _mrset_destroy = Module["_mrset_destroy"] = createExportWrapper("mrset_destroy");

/** @type {function(...*):?} */
var _mrset_is_valid_name = Module["_mrset_is_valid_name"] = createExportWrapper("mrset_is_valid_name");

/** @type {function(...*):?} */
var _id_is_valid = Module["_id_is_valid"] = createExportWrapper("id_is_valid");

/** @type {function(...*):?} */
var _mrset_ok = Module["_mrset_ok"] = createExportWrapper("mrset_ok");

/** @type {function(...*):?} */
var _dict_contains_var = Module["_dict_contains_var"] = createExportWrapper("dict_contains_var");

/** @type {function(...*):?} */
var _vector_create = Module["_vector_create"] = createExportWrapper("vector_create");

/** @type {function(...*):?} */
var _id_is_plausible = Module["_id_is_plausible"] = createExportWrapper("id_is_plausible");

/** @type {function(...*):?} */
var _vector_clone = Module["_vector_clone"] = createExportWrapper("vector_clone");

/** @type {function(...*):?} */
var _vector_destroy = Module["_vector_destroy"] = createExportWrapper("vector_destroy");

/** @type {function(...*):?} */
var _vector_get_name = Module["_vector_get_name"] = createExportWrapper("vector_get_name");

/** @type {function(...*):?} */
var _vector_get_type = Module["_vector_get_type"] = createExportWrapper("vector_get_type");

/** @type {function(...*):?} */
var _vector_get_var = Module["_vector_get_var"] = createExportWrapper("vector_get_var");

/** @type {function(...*):?} */
var _vector_get_var_cnt = Module["_vector_get_var_cnt"] = createExportWrapper("vector_get_var_cnt");

/** @type {function(...*):?} */
var _compare_vector_ptrs_by_name = Module["_compare_vector_ptrs_by_name"] = createExportWrapper("compare_vector_ptrs_by_name");

/** @type {function(...*):?} */
var _attribute_create = Module["_attribute_create"] = createExportWrapper("attribute_create");

/** @type {function(...*):?} */
var _attribute_clone = Module["_attribute_clone"] = createExportWrapper("attribute_clone");

/** @type {function(...*):?} */
var _attribute_add_value = Module["_attribute_add_value"] = createExportWrapper("attribute_add_value");

/** @type {function(...*):?} */
var _attribute_destroy = Module["_attribute_destroy"] = createExportWrapper("attribute_destroy");

/** @type {function(...*):?} */
var _attribute_get_name = Module["_attribute_get_name"] = createExportWrapper("attribute_get_name");

/** @type {function(...*):?} */
var _attribute_get_value = Module["_attribute_get_value"] = createExportWrapper("attribute_get_value");

/** @type {function(...*):?} */
var _attribute_get_n_values = Module["_attribute_get_n_values"] = createExportWrapper("attribute_get_n_values");

/** @type {function(...*):?} */
var _attribute_set_value = Module["_attribute_set_value"] = createExportWrapper("attribute_set_value");

/** @type {function(...*):?} */
var _attribute_del_value = Module["_attribute_del_value"] = createExportWrapper("attribute_del_value");

/** @type {function(...*):?} */
var _remove_element = Module["_remove_element"] = createExportWrapper("remove_element");

/** @type {function(...*):?} */
var _hmap_init = Module["_hmap_init"] = createExportWrapper("hmap_init");

/** @type {function(...*):?} */
var _hmap_reserve = Module["_hmap_reserve"] = createExportWrapper("hmap_reserve");

/** @type {function(...*):?} */
var _hmap_destroy = Module["_hmap_destroy"] = createExportWrapper("hmap_destroy");

/** @type {function(...*):?} */
var _attrset_lookup = Module["_attrset_lookup"] = createExportWrapper("attrset_lookup");

/** @type {function(...*):?} */
var _attrset_try_add = Module["_attrset_try_add"] = createExportWrapper("attrset_try_add");

/** @type {function(...*):?} */
var _attrset_add = Module["_attrset_add"] = createExportWrapper("attrset_add");

/** @type {function(...*):?} */
var _attrset_delete = Module["_attrset_delete"] = createExportWrapper("attrset_delete");

/** @type {function(...*):?} */
var _attrset_clear = Module["_attrset_clear"] = createExportWrapper("attrset_clear");

/** @type {function(...*):?} */
var _attrset_first = Module["_attrset_first"] = createExportWrapper("attrset_first");

/** @type {function(...*):?} */
var _attrset_next = Module["_attrset_next"] = createExportWrapper("attrset_next");

/** @type {function(...*):?} */
var _attrset_sorted = Module["_attrset_sorted"] = createExportWrapper("attrset_sorted");

/** @type {function(...*):?} */
var _qsort = Module["_qsort"] = createExportWrapper("qsort");

/** @type {function(...*):?} */
var _data_out_recode = Module["_data_out_recode"] = createExportWrapper("data_out_recode");

/** @type {function(...*):?} */
var _fmt_check_output = Module["_fmt_check_output"] = createExportWrapper("fmt_check_output");

/** @type {function(...*):?} */
var _recode_string = Module["_recode_string"] = createExportWrapper("recode_string");

/** @type {function(...*):?} */
var _fmt_get_category = Module["_fmt_get_category"] = createExportWrapper("fmt_get_category");

/** @type {function(...*):?} */
var _ds_put_uninit = Module["_ds_put_uninit"] = createExportWrapper("ds_put_uninit");

/** @type {function(...*):?} */
var _data_out_pool = Module["_data_out_pool"] = createExportWrapper("data_out_pool");

/** @type {function(...*):?} */
var _recode_string_pool = Module["_recode_string_pool"] = createExportWrapper("recode_string_pool");

/** @type {function(...*):?} */
var _settings_get_style = Module["_settings_get_style"] = createExportWrapper("settings_get_style");

/** @type {function(...*):?} */
var _data_out_stretchy = Module["_data_out_stretchy"] = createExportWrapper("data_out_stretchy");

/** @type {function(...*):?} */
var _pool_strdup = Module["_pool_strdup"] = createExportWrapper("pool_strdup");

/** @type {function(...*):?} */
var _buf_copy_str_lpad = Module["_buf_copy_str_lpad"] = createExportWrapper("buf_copy_str_lpad");

/** @type {function(...*):?} */
var _settings_get_output_integer_format = Module["_settings_get_output_integer_format"] = createExportWrapper("settings_get_output_integer_format");

/** @type {function(...*):?} */
var _integer_put = Module["_integer_put"] = createExportWrapper("integer_put");

/** @type {function(...*):?} */
var _fmt_date_template = Module["_fmt_date_template"] = createExportWrapper("fmt_date_template");

/** @type {function(...*):?} */
var _calendar_offset_to_gregorian = Module["_calendar_offset_to_gregorian"] = createExportWrapper("calendar_offset_to_gregorian");

/** @type {function(...*):?} */
var _settings_get_epoch = Module["_settings_get_epoch"] = createExportWrapper("settings_get_epoch");

/** @type {function(...*):?} */
var _settings_get_decimal_char = Module["_settings_get_decimal_char"] = createExportWrapper("settings_get_decimal_char");

/** @type {function(...*):?} */
var _buf_copy_lpad = Module["_buf_copy_lpad"] = createExportWrapper("buf_copy_lpad");

/** @type {function(...*):?} */
var _buf_copy_str_rpad = Module["_buf_copy_str_rpad"] = createExportWrapper("buf_copy_str_rpad");

/** @type {function(...*):?} */
var _fmt_affix_width = Module["_fmt_affix_width"] = createExportWrapper("fmt_affix_width");

/** @type {function(...*):?} */
var _mempset = Module["_mempset"] = createExportWrapper("mempset");

/** @type {function(...*):?} */
var _strtol = Module["_strtol"] = createExportWrapper("strtol");

/** @type {function(...*):?} */
var _dict_id_is_valid = Module["_dict_id_is_valid"] = createExportWrapper("dict_id_is_valid");

/** @type {function(...*):?} */
var _dict_set_change_callback = Module["_dict_set_change_callback"] = createExportWrapper("dict_set_change_callback");

/** @type {function(...*):?} */
var _dict_dump = Module["_dict_dump"] = createExportWrapper("dict_dump");

/** @type {function(...*):?} */
var _dict_copy_callbacks = Module["_dict_copy_callbacks"] = createExportWrapper("dict_copy_callbacks");

/** @type {function(...*):?} */
var _dict_create = Module["_dict_create"] = createExportWrapper("dict_create");

/** @type {function(...*):?} */
var _dict_clone = Module["_dict_clone"] = createExportWrapper("dict_clone");

/** @type {function(...*):?} */
var _dict_clone_var_as_assert = Module["_dict_clone_var_as_assert"] = createExportWrapper("dict_clone_var_as_assert");

/** @type {function(...*):?} */
var _dict_lookup_var_assert = Module["_dict_lookup_var_assert"] = createExportWrapper("dict_lookup_var_assert");

/** @type {function(...*):?} */
var _dict_set_weight = Module["_dict_set_weight"] = createExportWrapper("dict_set_weight");

/** @type {function(...*):?} */
var _dict_set_filter = Module["_dict_set_filter"] = createExportWrapper("dict_set_filter");

/** @type {function(...*):?} */
var _utf8_encoding_trunc = Module["_utf8_encoding_trunc"] = createExportWrapper("utf8_encoding_trunc");

/** @type {function(...*):?} */
var _string_array_clear = Module["_string_array_clear"] = createExportWrapper("string_array_clear");

/** @type {function(...*):?} */
var _utf8_encoding_trunc_len = Module["_utf8_encoding_trunc_len"] = createExportWrapper("utf8_encoding_trunc_len");

/** @type {function(...*):?} */
var _string_array_append_nocopy = Module["_string_array_append_nocopy"] = createExportWrapper("string_array_append_nocopy");

/** @type {function(...*):?} */
var _dict_add_mrset = Module["_dict_add_mrset"] = createExportWrapper("dict_add_mrset");

/** @type {function(...*):?} */
var _dict_set_names_must_be_ids = Module["_dict_set_names_must_be_ids"] = createExportWrapper("dict_set_names_must_be_ids");

/** @type {function(...*):?} */
var _dict_get_names_must_be_ids = Module["_dict_get_names_must_be_ids"] = createExportWrapper("dict_get_names_must_be_ids");

/** @type {function(...*):?} */
var _dict_clone_var_assert = Module["_dict_clone_var_assert"] = createExportWrapper("dict_clone_var_assert");

/** @type {function(...*):?} */
var _dict_set_label = Module["_dict_set_label"] = createExportWrapper("dict_set_label");

/** @type {function(...*):?} */
var _dict_get_label = Module["_dict_get_label"] = createExportWrapper("dict_get_label");

/** @type {function(...*):?} */
var _dict_set_documents = Module["_dict_set_documents"] = createExportWrapper("dict_set_documents");

/** @type {function(...*):?} */
var _dict_get_documents = Module["_dict_get_documents"] = createExportWrapper("dict_get_documents");

/** @type {function(...*):?} */
var _dict_set_attributes = Module["_dict_set_attributes"] = createExportWrapper("dict_set_attributes");

/** @type {function(...*):?} */
var _dict_get_attributes = Module["_dict_get_attributes"] = createExportWrapper("dict_get_attributes");

/** @type {function(...*):?} */
var _dict_get_split_vars = Module["_dict_get_split_vars"] = createExportWrapper("dict_get_split_vars");

/** @type {function(...*):?} */
var _dict_get_split_cnt = Module["_dict_get_split_cnt"] = createExportWrapper("dict_get_split_cnt");

/** @type {function(...*):?} */
var _dict_set_split_vars = Module["_dict_set_split_vars"] = createExportWrapper("dict_set_split_vars");

/** @type {function(...*):?} */
var _dict_delete_var = Module["_dict_delete_var"] = createExportWrapper("dict_delete_var");

/** @type {function(...*):?} */
var _remove_equal = Module["_remove_equal"] = createExportWrapper("remove_equal");

/** @type {function(...*):?} */
var _dict_delete_vars = Module["_dict_delete_vars"] = createExportWrapper("dict_delete_vars");

/** @type {function(...*):?} */
var _dict_delete_consecutive_vars = Module["_dict_delete_consecutive_vars"] = createExportWrapper("dict_delete_consecutive_vars");

/** @type {function(...*):?} */
var _dict_clear_vectors = Module["_dict_clear_vectors"] = createExportWrapper("dict_clear_vectors");

/** @type {function(...*):?} */
var _dict_delete_scratch_vars = Module["_dict_delete_scratch_vars"] = createExportWrapper("dict_delete_scratch_vars");

/** @type {function(...*):?} */
var _dict_clear = Module["_dict_clear"] = createExportWrapper("dict_clear");

/** @type {function(...*):?} */
var _hmap_clear = Module["_hmap_clear"] = createExportWrapper("hmap_clear");

/** @type {function(...*):?} */
var _dict_ref = Module["_dict_ref"] = createExportWrapper("dict_ref");

/** @type {function(...*):?} */
var _dict_unref = Module["_dict_unref"] = createExportWrapper("dict_unref");

/** @type {function(...*):?} */
var _dict_get_vars = Module["_dict_get_vars"] = createExportWrapper("dict_get_vars");

/** @type {function(...*):?} */
var _dict_get_vars_mutable = Module["_dict_get_vars_mutable"] = createExportWrapper("dict_get_vars_mutable");

/** @type {function(...*):?} */
var _dict_create_var = Module["_dict_create_var"] = createExportWrapper("dict_create_var");

/** @type {function(...*):?} */
var _dict_create_var_assert = Module["_dict_create_var_assert"] = createExportWrapper("dict_create_var_assert");

/** @type {function(...*):?} */
var _dict_lookup_var = Module["_dict_lookup_var"] = createExportWrapper("dict_lookup_var");

/** @type {function(...*):?} */
var _dict_clone_var = Module["_dict_clone_var"] = createExportWrapper("dict_clone_var");

/** @type {function(...*):?} */
var _dict_clone_var_as = Module["_dict_clone_var_as"] = createExportWrapper("dict_clone_var_as");

/** @type {function(...*):?} */
var _dict_clone_var_in_place_assert = Module["_dict_clone_var_in_place_assert"] = createExportWrapper("dict_clone_var_in_place_assert");

/** @type {function(...*):?} */
var _dict_reorder_var = Module["_dict_reorder_var"] = createExportWrapper("dict_reorder_var");

/** @type {function(...*):?} */
var _move_element = Module["_move_element"] = createExportWrapper("move_element");

/** @type {function(...*):?} */
var _dict_reorder_vars = Module["_dict_reorder_vars"] = createExportWrapper("dict_reorder_vars");

/** @type {function(...*):?} */
var _dict_try_rename_var = Module["_dict_try_rename_var"] = createExportWrapper("dict_try_rename_var");

/** @type {function(...*):?} */
var _settings_get_algorithm = Module["_settings_get_algorithm"] = createExportWrapper("settings_get_algorithm");

/** @type {function(...*):?} */
var _dict_rename_var = Module["_dict_rename_var"] = createExportWrapper("dict_rename_var");

/** @type {function(...*):?} */
var _dict_rename_vars = Module["_dict_rename_vars"] = createExportWrapper("dict_rename_vars");

/** @type {function(...*):?} */
var _pool_create = Module["_pool_create"] = createExportWrapper("pool_create");

/** @type {function(...*):?} */
var _pool_nalloc = Module["_pool_nalloc"] = createExportWrapper("pool_nalloc");

/** @type {function(...*):?} */
var _pool_destroy = Module["_pool_destroy"] = createExportWrapper("pool_destroy");

/** @type {function(...*):?} */
var _dict_make_unique_var_name = Module["_dict_make_unique_var_name"] = createExportWrapper("dict_make_unique_var_name");

/** @type {function(...*):?} */
var _lex_uc_is_id1 = Module["_lex_uc_is_id1"] = createExportWrapper("lex_uc_is_id1");

/** @type {function(...*):?} */
var _lex_uc_is_idn = Module["_lex_uc_is_idn"] = createExportWrapper("lex_uc_is_idn");

/** @type {function(...*):?} */
var _lex_id_to_token = Module["_lex_id_to_token"] = createExportWrapper("lex_id_to_token");

/** @type {function(...*):?} */
var _str_format_26adic = Module["_str_format_26adic"] = createExportWrapper("str_format_26adic");

/** @type {function(...*):?} */
var _utf8_encoding_concat = Module["_utf8_encoding_concat"] = createExportWrapper("utf8_encoding_concat");

/** @type {function(...*):?} */
var _dict_get_weight = Module["_dict_get_weight"] = createExportWrapper("dict_get_weight");

/** @type {function(...*):?} */
var _dict_get_case_weight = Module["_dict_get_case_weight"] = createExportWrapper("dict_get_case_weight");

/** @type {function(...*):?} */
var _dict_get_weight_format = Module["_dict_get_weight_format"] = createExportWrapper("dict_get_weight_format");

/** @type {function(...*):?} */
var _dict_get_filter = Module["_dict_get_filter"] = createExportWrapper("dict_get_filter");

/** @type {function(...*):?} */
var _dict_get_case_limit = Module["_dict_get_case_limit"] = createExportWrapper("dict_get_case_limit");

/** @type {function(...*):?} */
var _dict_set_case_limit = Module["_dict_set_case_limit"] = createExportWrapper("dict_set_case_limit");

/** @type {function(...*):?} */
var _dict_get_proto = Module["_dict_get_proto"] = createExportWrapper("dict_get_proto");

/** @type {function(...*):?} */
var _dict_get_next_value_idx = Module["_dict_get_next_value_idx"] = createExportWrapper("dict_get_next_value_idx");

/** @type {function(...*):?} */
var _dict_get_case_size = Module["_dict_get_case_size"] = createExportWrapper("dict_get_case_size");

/** @type {function(...*):?} */
var _dict_compact_values = Module["_dict_compact_values"] = createExportWrapper("dict_compact_values");

/** @type {function(...*):?} */
var _dict_count_values = Module["_dict_count_values"] = createExportWrapper("dict_count_values");

/** @type {function(...*):?} */
var _dict_get_compacted_proto = Module["_dict_get_compacted_proto"] = createExportWrapper("dict_get_compacted_proto");

/** @type {function(...*):?} */
var _dict_clear_documents = Module["_dict_clear_documents"] = createExportWrapper("dict_clear_documents");

/** @type {function(...*):?} */
var _dict_add_document_line = Module["_dict_add_document_line"] = createExportWrapper("dict_add_document_line");

/** @type {function(...*):?} */
var _dict_set_documents_string = Module["_dict_set_documents_string"] = createExportWrapper("dict_set_documents_string");

/** @type {function(...*):?} */
var _dict_get_document_line_cnt = Module["_dict_get_document_line_cnt"] = createExportWrapper("dict_get_document_line_cnt");

/** @type {function(...*):?} */
var _dict_get_document_line = Module["_dict_get_document_line"] = createExportWrapper("dict_get_document_line");

/** @type {function(...*):?} */
var _dict_create_vector = Module["_dict_create_vector"] = createExportWrapper("dict_create_vector");

/** @type {function(...*):?} */
var _dict_lookup_vector = Module["_dict_lookup_vector"] = createExportWrapper("dict_lookup_vector");

/** @type {function(...*):?} */
var _dict_create_vector_assert = Module["_dict_create_vector_assert"] = createExportWrapper("dict_create_vector_assert");

/** @type {function(...*):?} */
var _dict_get_vector = Module["_dict_get_vector"] = createExportWrapper("dict_get_vector");

/** @type {function(...*):?} */
var _dict_get_vector_cnt = Module["_dict_get_vector_cnt"] = createExportWrapper("dict_get_vector_cnt");

/** @type {function(...*):?} */
var _dict_get_mrset = Module["_dict_get_mrset"] = createExportWrapper("dict_get_mrset");

/** @type {function(...*):?} */
var _dict_get_n_mrsets = Module["_dict_get_n_mrsets"] = createExportWrapper("dict_get_n_mrsets");

/** @type {function(...*):?} */
var _dict_lookup_mrset = Module["_dict_lookup_mrset"] = createExportWrapper("dict_lookup_mrset");

/** @type {function(...*):?} */
var _dict_delete_mrset = Module["_dict_delete_mrset"] = createExportWrapper("dict_delete_mrset");

/** @type {function(...*):?} */
var _dict_clear_mrsets = Module["_dict_clear_mrsets"] = createExportWrapper("dict_clear_mrsets");

/** @type {function(...*):?} */
var _dict_has_attributes = Module["_dict_has_attributes"] = createExportWrapper("dict_has_attributes");

/** @type {function(...*):?} */
var _dict_create_internal_var = Module["_dict_create_internal_var"] = createExportWrapper("dict_create_internal_var");

/** @type {function(...*):?} */
var _dict_destroy_internal_var = Module["_dict_destroy_internal_var"] = createExportWrapper("dict_destroy_internal_var");

/** @type {function(...*):?} */
var _dict_class_to_name = Module["_dict_class_to_name"] = createExportWrapper("dict_class_to_name");

/** @type {function(...*):?} */
var _fmt_settings_create = Module["_fmt_settings_create"] = createExportWrapper("fmt_settings_create");

/** @type {function(...*):?} */
var _fmt_settings_set_decimal = Module["_fmt_settings_set_decimal"] = createExportWrapper("fmt_settings_set_decimal");

/** @type {function(...*):?} */
var _fmt_settings_set_style = Module["_fmt_settings_set_style"] = createExportWrapper("fmt_settings_set_style");

/** @type {function(...*):?} */
var _fmt_settings_destroy = Module["_fmt_settings_destroy"] = createExportWrapper("fmt_settings_destroy");

/** @type {function(...*):?} */
var _fmt_settings_clone = Module["_fmt_settings_clone"] = createExportWrapper("fmt_settings_clone");

/** @type {function(...*):?} */
var _fmt_settings_get_style = Module["_fmt_settings_get_style"] = createExportWrapper("fmt_settings_get_style");

/** @type {function(...*):?} */
var _is_fmt_type = Module["_is_fmt_type"] = createExportWrapper("is_fmt_type");

/** @type {function(...*):?} */
var _fmt_for_input = Module["_fmt_for_input"] = createExportWrapper("fmt_for_input");

/** @type {function(...*):?} */
var _fmt_check = Module["_fmt_check"] = createExportWrapper("fmt_check");

/** @type {function(...*):?} */
var _fmt_check_input = Module["_fmt_check_input"] = createExportWrapper("fmt_check_input");

/** @type {function(...*):?} */
var _fmt_for_output_from_input = Module["_fmt_for_output_from_input"] = createExportWrapper("fmt_for_output_from_input");

/** @type {function(...*):?} */
var _fmt_input_to_output = Module["_fmt_input_to_output"] = createExportWrapper("fmt_input_to_output");

/** @type {function(...*):?} */
var _fmt_max_output_width = Module["_fmt_max_output_width"] = createExportWrapper("fmt_max_output_width");

/** @type {function(...*):?} */
var _fmt_min_output_width = Module["_fmt_min_output_width"] = createExportWrapper("fmt_min_output_width");

/** @type {function(...*):?} */
var _fmt_default_for_width = Module["_fmt_default_for_width"] = createExportWrapper("fmt_default_for_width");

/** @type {function(...*):?} */
var _fmt_to_string = Module["_fmt_to_string"] = createExportWrapper("fmt_to_string");

/** @type {function(...*):?} */
var _fmt_max_decimals = Module["_fmt_max_decimals"] = createExportWrapper("fmt_max_decimals");

/** @type {function(...*):?} */
var _fmt_max_output_decimals = Module["_fmt_max_output_decimals"] = createExportWrapper("fmt_max_output_decimals");

/** @type {function(...*):?} */
var _ngettext = Module["_ngettext"] = createExportWrapper("ngettext");

/** @type {function(...*):?} */
var _fmt_usable_for_input = Module["_fmt_usable_for_input"] = createExportWrapper("fmt_usable_for_input");

/** @type {function(...*):?} */
var _fmt_step_width = Module["_fmt_step_width"] = createExportWrapper("fmt_step_width");

/** @type {function(...*):?} */
var _fmt_name = Module["_fmt_name"] = createExportWrapper("fmt_name");

/** @type {function(...*):?} */
var _fmt_min_width = Module["_fmt_min_width"] = createExportWrapper("fmt_min_width");

/** @type {function(...*):?} */
var _fmt_max_width = Module["_fmt_max_width"] = createExportWrapper("fmt_max_width");

/** @type {function(...*):?} */
var _fmt_takes_decimals = Module["_fmt_takes_decimals"] = createExportWrapper("fmt_takes_decimals");

/** @type {function(...*):?} */
var _fmt_check_type_compat = Module["_fmt_check_type_compat"] = createExportWrapper("fmt_check_type_compat");

/** @type {function(...*):?} */
var _fmt_is_string = Module["_fmt_is_string"] = createExportWrapper("fmt_is_string");

/** @type {function(...*):?} */
var _fmt_fix = Module["_fmt_fix"] = createExportWrapper("fmt_fix");

/** @type {function(...*):?} */
var _fmt_fix_input = Module["_fmt_fix_input"] = createExportWrapper("fmt_fix_input");

/** @type {function(...*):?} */
var _fmt_fix_output = Module["_fmt_fix_output"] = createExportWrapper("fmt_fix_output");

/** @type {function(...*):?} */
var _fmt_change_width = Module["_fmt_change_width"] = createExportWrapper("fmt_change_width");

/** @type {function(...*):?} */
var _fmt_change_decimals = Module["_fmt_change_decimals"] = createExportWrapper("fmt_change_decimals");

/** @type {function(...*):?} */
var _fmt_from_name = Module["_fmt_from_name"] = createExportWrapper("fmt_from_name");

/** @type {function(...*):?} */
var _fmt_min_input_width = Module["_fmt_min_input_width"] = createExportWrapper("fmt_min_input_width");

/** @type {function(...*):?} */
var _fmt_max_input_width = Module["_fmt_max_input_width"] = createExportWrapper("fmt_max_input_width");

/** @type {function(...*):?} */
var _fmt_max_input_decimals = Module["_fmt_max_input_decimals"] = createExportWrapper("fmt_max_input_decimals");

/** @type {function(...*):?} */
var _fmt_to_io = Module["_fmt_to_io"] = createExportWrapper("fmt_to_io");

/** @type {function(...*):?} */
var _fmt_from_io = Module["_fmt_from_io"] = createExportWrapper("fmt_from_io");

/** @type {function(...*):?} */
var _fmt_from_u32 = Module["_fmt_from_u32"] = createExportWrapper("fmt_from_u32");

/** @type {function(...*):?} */
var _msg_disable = Module["_msg_disable"] = createExportWrapper("msg_disable");

/** @type {function(...*):?} */
var _msg_enable = Module["_msg_enable"] = createExportWrapper("msg_enable");

/** @type {function(...*):?} */
var _fmt_gui_name = Module["_fmt_gui_name"] = createExportWrapper("fmt_gui_name");

/** @type {function(...*):?} */
var _fmt_neg_affix_width = Module["_fmt_neg_affix_width"] = createExportWrapper("fmt_neg_affix_width");

/** @type {function(...*):?} */
var _token_type_to_name = Module["_token_type_to_name"] = createExportWrapper("token_type_to_name");

/** @type {function(...*):?} */
var _token_type_to_string = Module["_token_type_to_string"] = createExportWrapper("token_type_to_string");

/** @type {function(...*):?} */
var _lex_is_id1 = Module["_lex_is_id1"] = createExportWrapper("lex_is_id1");

/** @type {function(...*):?} */
var _lex_is_idn = Module["_lex_is_idn"] = createExportWrapper("lex_is_idn");

/** @type {function(...*):?} */
var _lex_uc_is_space = Module["_lex_uc_is_space"] = createExportWrapper("lex_uc_is_space");

/** @type {function(...*):?} */
var _lex_id_get_length = Module["_lex_id_get_length"] = createExportWrapper("lex_id_get_length");

/** @type {function(...*):?} */
var _lex_id_match = Module["_lex_id_match"] = createExportWrapper("lex_id_match");

/** @type {function(...*):?} */
var _ss_length = Module["_ss_length"] = createExportWrapper("ss_length");

/** @type {function(...*):?} */
var _ss_head = Module["_ss_head"] = createExportWrapper("ss_head");

/** @type {function(...*):?} */
var _ss_equals_case = Module["_ss_equals_case"] = createExportWrapper("ss_equals_case");

/** @type {function(...*):?} */
var _lex_id_match_n = Module["_lex_id_match_n"] = createExportWrapper("lex_id_match_n");

/** @type {function(...*):?} */
var _lex_is_keyword = Module["_lex_is_keyword"] = createExportWrapper("lex_is_keyword");

/** @type {function(...*):?} */
var _recode_string_len = Module["_recode_string_len"] = createExportWrapper("recode_string_len");

/** @type {function(...*):?} */
var _uc_name = Module["_uc_name"] = createExportWrapper("uc_name");

/** @type {function(...*):?} */
var _mv_init_pool = Module["_mv_init_pool"] = createExportWrapper("mv_init_pool");

/** @type {function(...*):?} */
var _mv_is_acceptable = Module["_mv_is_acceptable"] = createExportWrapper("mv_is_acceptable");

/** @type {function(...*):?} */
var _mv_get_width = Module["_mv_get_width"] = createExportWrapper("mv_get_width");

/** @type {function(...*):?} */
var _mv_add_value = Module["_mv_add_value"] = createExportWrapper("mv_add_value");

/** @type {function(...*):?} */
var _mv_add_str = Module["_mv_add_str"] = createExportWrapper("mv_add_str");

/** @type {function(...*):?} */
var _buf_copy_rpad = Module["_buf_copy_rpad"] = createExportWrapper("buf_copy_rpad");

/** @type {function(...*):?} */
var _mv_add_num = Module["_mv_add_num"] = createExportWrapper("mv_add_num");

/** @type {function(...*):?} */
var _mv_add_range = Module["_mv_add_range"] = createExportWrapper("mv_add_range");

/** @type {function(...*):?} */
var _mv_has_value = Module["_mv_has_value"] = createExportWrapper("mv_has_value");

/** @type {function(...*):?} */
var _mv_n_values = Module["_mv_n_values"] = createExportWrapper("mv_n_values");

/** @type {function(...*):?} */
var _mv_pop_value = Module["_mv_pop_value"] = createExportWrapper("mv_pop_value");

/** @type {function(...*):?} */
var _mv_get_value = Module["_mv_get_value"] = createExportWrapper("mv_get_value");

/** @type {function(...*):?} */
var _mv_replace_value = Module["_mv_replace_value"] = createExportWrapper("mv_replace_value");

/** @type {function(...*):?} */
var _mv_has_range = Module["_mv_has_range"] = createExportWrapper("mv_has_range");

/** @type {function(...*):?} */
var _mv_pop_range = Module["_mv_pop_range"] = createExportWrapper("mv_pop_range");

/** @type {function(...*):?} */
var _mv_get_range = Module["_mv_get_range"] = createExportWrapper("mv_get_range");

/** @type {function(...*):?} */
var _mv_is_value_missing_varwidth = Module["_mv_is_value_missing_varwidth"] = createExportWrapper("mv_is_value_missing_varwidth");

/** @type {function(...*):?} */
var _buf_compare_rpad = Module["_buf_compare_rpad"] = createExportWrapper("buf_compare_rpad");

/** @type {function(...*):?} */
var _mv_to_string = Module["_mv_to_string"] = createExportWrapper("mv_to_string");

/** @type {function(...*):?} */
var _ds_steal_cstr = Module["_ds_steal_cstr"] = createExportWrapper("ds_steal_cstr");

/** @type {function(...*):?} */
var _localtime = Module["_localtime"] = createExportWrapper("localtime");

/** @type {function(...*):?} */
var _get_system_decimal = Module["_get_system_decimal"] = createExportWrapper("get_system_decimal");

/** @type {function(...*):?} */
var _settings_set_epoch = Module["_settings_set_epoch"] = createExportWrapper("settings_set_epoch");

/** @type {function(...*):?} */
var _settings_set_decimal_char = Module["_settings_set_decimal_char"] = createExportWrapper("settings_set_decimal_char");

/** @type {function(...*):?} */
var _settings_destroy = Module["_settings_destroy"] = createExportWrapper("settings_destroy");

/** @type {function(...*):?} */
var _settings_get = Module["_settings_get"] = createExportWrapper("settings_get");

/** @type {function(...*):?} */
var _settings_set = Module["_settings_set"] = createExportWrapper("settings_set");

/** @type {function(...*):?} */
var _settings_get_input_float_format = Module["_settings_get_input_float_format"] = createExportWrapper("settings_get_input_float_format");

/** @type {function(...*):?} */
var _settings_set_input_float_format = Module["_settings_set_input_float_format"] = createExportWrapper("settings_set_input_float_format");

/** @type {function(...*):?} */
var _settings_get_input_integer_format = Module["_settings_get_input_integer_format"] = createExportWrapper("settings_get_input_integer_format");

/** @type {function(...*):?} */
var _settings_set_input_integer_format = Module["_settings_set_input_integer_format"] = createExportWrapper("settings_set_input_integer_format");

/** @type {function(...*):?} */
var _settings_set_output_integer_format = Module["_settings_set_output_integer_format"] = createExportWrapper("settings_set_output_integer_format");

/** @type {function(...*):?} */
var _settings_get_output_float_format = Module["_settings_get_output_float_format"] = createExportWrapper("settings_get_output_float_format");

/** @type {function(...*):?} */
var _settings_set_output_float_format = Module["_settings_set_output_float_format"] = createExportWrapper("settings_set_output_float_format");

/** @type {function(...*):?} */
var _settings_get_viewlength = Module["_settings_get_viewlength"] = createExportWrapper("settings_get_viewlength");

/** @type {function(...*):?} */
var _settings_set_viewlength = Module["_settings_set_viewlength"] = createExportWrapper("settings_set_viewlength");

/** @type {function(...*):?} */
var _settings_get_viewwidth = Module["_settings_get_viewwidth"] = createExportWrapper("settings_get_viewwidth");

/** @type {function(...*):?} */
var _settings_set_viewwidth = Module["_settings_set_viewwidth"] = createExportWrapper("settings_set_viewwidth");

/** @type {function(...*):?} */
var _settings_get_safer_mode = Module["_settings_get_safer_mode"] = createExportWrapper("settings_get_safer_mode");

/** @type {function(...*):?} */
var _settings_get_include = Module["_settings_get_include"] = createExportWrapper("settings_get_include");

/** @type {function(...*):?} */
var _settings_set_include = Module["_settings_set_include"] = createExportWrapper("settings_set_include");

/** @type {function(...*):?} */
var _settings_get_scompression = Module["_settings_get_scompression"] = createExportWrapper("settings_get_scompression");

/** @type {function(...*):?} */
var _settings_set_scompression = Module["_settings_set_scompression"] = createExportWrapper("settings_set_scompression");

/** @type {function(...*):?} */
var _settings_get_undefined = Module["_settings_get_undefined"] = createExportWrapper("settings_get_undefined");

/** @type {function(...*):?} */
var _settings_set_undefined = Module["_settings_set_undefined"] = createExportWrapper("settings_set_undefined");

/** @type {function(...*):?} */
var _settings_get_blanks = Module["_settings_get_blanks"] = createExportWrapper("settings_get_blanks");

/** @type {function(...*):?} */
var _settings_set_blanks = Module["_settings_set_blanks"] = createExportWrapper("settings_set_blanks");

/** @type {function(...*):?} */
var _settings_get_max_messages = Module["_settings_get_max_messages"] = createExportWrapper("settings_get_max_messages");

/** @type {function(...*):?} */
var _settings_set_max_messages = Module["_settings_set_max_messages"] = createExportWrapper("settings_set_max_messages");

/** @type {function(...*):?} */
var _msg_ui_disable_warnings = Module["_msg_ui_disable_warnings"] = createExportWrapper("msg_ui_disable_warnings");

/** @type {function(...*):?} */
var _settings_get_mprint = Module["_settings_get_mprint"] = createExportWrapper("settings_get_mprint");

/** @type {function(...*):?} */
var _settings_set_mprint = Module["_settings_set_mprint"] = createExportWrapper("settings_set_mprint");

/** @type {function(...*):?} */
var _settings_get_mxloops = Module["_settings_get_mxloops"] = createExportWrapper("settings_get_mxloops");

/** @type {function(...*):?} */
var _settings_set_mxloops = Module["_settings_set_mxloops"] = createExportWrapper("settings_set_mxloops");

/** @type {function(...*):?} */
var _settings_get_workspace = Module["_settings_get_workspace"] = createExportWrapper("settings_get_workspace");

/** @type {function(...*):?} */
var _settings_get_workspace_cases = Module["_settings_get_workspace_cases"] = createExportWrapper("settings_get_workspace_cases");

/** @type {function(...*):?} */
var _settings_set_workspace = Module["_settings_set_workspace"] = createExportWrapper("settings_set_workspace");

/** @type {function(...*):?} */
var _settings_get_format = Module["_settings_get_format"] = createExportWrapper("settings_get_format");

/** @type {function(...*):?} */
var _settings_set_format = Module["_settings_set_format"] = createExportWrapper("settings_set_format");

/** @type {function(...*):?} */
var _settings_get_testing_mode = Module["_settings_get_testing_mode"] = createExportWrapper("settings_get_testing_mode");

/** @type {function(...*):?} */
var _settings_get_fuzzbits = Module["_settings_get_fuzzbits"] = createExportWrapper("settings_get_fuzzbits");

/** @type {function(...*):?} */
var _settings_set_fuzzbits = Module["_settings_set_fuzzbits"] = createExportWrapper("settings_set_fuzzbits");

/** @type {function(...*):?} */
var _settings_set_cmd_algorithm = Module["_settings_set_cmd_algorithm"] = createExportWrapper("settings_set_cmd_algorithm");

/** @type {function(...*):?} */
var _unset_cmd_algorithm = Module["_unset_cmd_algorithm"] = createExportWrapper("unset_cmd_algorithm");

/** @type {function(...*):?} */
var _settings_get_syntax = Module["_settings_get_syntax"] = createExportWrapper("settings_get_syntax");

/** @type {function(...*):?} */
var _settings_set_cc = Module["_settings_set_cc"] = createExportWrapper("settings_set_cc");

/** @type {function(...*):?} */
var _settings_dollar_template = Module["_settings_dollar_template"] = createExportWrapper("settings_dollar_template");

/** @type {function(...*):?} */
var _ds_put_byte_multiple = Module["_ds_put_byte_multiple"] = createExportWrapper("ds_put_byte_multiple");

/** @type {function(...*):?} */
var _settings_set_output_routing = Module["_settings_set_output_routing"] = createExportWrapper("settings_set_output_routing");

/** @type {function(...*):?} */
var _settings_get_output_routing = Module["_settings_get_output_routing"] = createExportWrapper("settings_get_output_routing");

/** @type {function(...*):?} */
var _settings_set_show_values = Module["_settings_set_show_values"] = createExportWrapper("settings_set_show_values");

/** @type {function(...*):?} */
var _settings_set_show_variables = Module["_settings_set_show_variables"] = createExportWrapper("settings_set_show_variables");

/** @type {function(...*):?} */
var _val_labs_clear = Module["_val_labs_clear"] = createExportWrapper("val_labs_clear");

/** @type {function(...*):?} */
var _intern_unref = Module["_intern_unref"] = createExportWrapper("intern_unref");

/** @type {function(...*):?} */
var _val_labs_get_width = Module["_val_labs_get_width"] = createExportWrapper("val_labs_get_width");

/** @type {function(...*):?} */
var _val_labs_lookup = Module["_val_labs_lookup"] = createExportWrapper("val_labs_lookup");

/** @type {function(...*):?} */
var _intern_new = Module["_intern_new"] = createExportWrapper("intern_new");

/** @type {function(...*):?} */
var _strstr = Module["_strstr"] = createExportWrapper("strstr");

/** @type {function(...*):?} */
var _intern_ref = Module["_intern_ref"] = createExportWrapper("intern_ref");

/** @type {function(...*):?} */
var _intern_strlen = Module["_intern_strlen"] = createExportWrapper("intern_strlen");

/** @type {function(...*):?} */
var _ds_extend = Module["_ds_extend"] = createExportWrapper("ds_extend");

/** @type {function(...*):?} */
var _val_labs_remove = Module["_val_labs_remove"] = createExportWrapper("val_labs_remove");

/** @type {function(...*):?} */
var _val_labs_find_value = Module["_val_labs_find_value"] = createExportWrapper("val_labs_find_value");

/** @type {function(...*):?} */
var _val_labs_first = Module["_val_labs_first"] = createExportWrapper("val_labs_first");

/** @type {function(...*):?} */
var _val_labs_next = Module["_val_labs_next"] = createExportWrapper("val_labs_next");

/** @type {function(...*):?} */
var _val_labs_sorted = Module["_val_labs_sorted"] = createExportWrapper("val_labs_sorted");

/** @type {function(...*):?} */
var _sort = Module["_sort"] = createExportWrapper("sort");

/** @type {function(...*):?} */
var _val_labs_hash = Module["_val_labs_hash"] = createExportWrapper("val_labs_hash");

/** @type {function(...*):?} */
var _hash_int = Module["_hash_int"] = createExportWrapper("hash_int");

/** @type {function(...*):?} */
var _hash_string = Module["_hash_string"] = createExportWrapper("hash_string");

/** @type {function(...*):?} */
var _val_labs_equal = Module["_val_labs_equal"] = createExportWrapper("val_labs_equal");

/** @type {function(...*):?} */
var _calendar_gregorian_to_offset = Module["_calendar_gregorian_to_offset"] = createExportWrapper("calendar_gregorian_to_offset");

/** @type {function(...*):?} */
var _calendar_offset_to_year = Module["_calendar_offset_to_year"] = createExportWrapper("calendar_offset_to_year");

/** @type {function(...*):?} */
var _calendar_offset_to_yday = Module["_calendar_offset_to_yday"] = createExportWrapper("calendar_offset_to_yday");

/** @type {function(...*):?} */
var _calendar_offset_to_wday = Module["_calendar_offset_to_wday"] = createExportWrapper("calendar_offset_to_wday");

/** @type {function(...*):?} */
var _calendar_offset_to_month = Module["_calendar_offset_to_month"] = createExportWrapper("calendar_offset_to_month");

/** @type {function(...*):?} */
var _calendar_offset_to_mday = Module["_calendar_offset_to_mday"] = createExportWrapper("calendar_offset_to_mday");

/** @type {function(...*):?} */
var _calendar_days_in_month = Module["_calendar_days_in_month"] = createExportWrapper("calendar_days_in_month");

/** @type {function(...*):?} */
var _any_reader_detect = Module["_any_reader_detect"] = createExportWrapper("any_reader_detect");

/** @type {function(...*):?} */
var _fn_open = Module["_fn_open"] = createExportWrapper("fn_open");

/** @type {function(...*):?} */
var _fh_get_file_name = Module["_fh_get_file_name"] = createExportWrapper("fh_get_file_name");

/** @type {function(...*):?} */
var _fn_close = Module["_fn_close"] = createExportWrapper("fn_close");

/** @type {function(...*):?} */
var _any_reader_open = Module["_any_reader_open"] = createExportWrapper("any_reader_open");

/** @type {function(...*):?} */
var _fh_get_referent = Module["_fh_get_referent"] = createExportWrapper("fh_get_referent");

/** @type {function(...*):?} */
var _any_reader_close = Module["_any_reader_close"] = createExportWrapper("any_reader_close");

/** @type {function(...*):?} */
var _any_reader_decode = Module["_any_reader_decode"] = createExportWrapper("any_reader_decode");

/** @type {function(...*):?} */
var _any_reader_get_strings = Module["_any_reader_get_strings"] = createExportWrapper("any_reader_get_strings");

/** @type {function(...*):?} */
var _any_reader_open_and_decode = Module["_any_reader_open_and_decode"] = createExportWrapper("any_reader_open_and_decode");

/** @type {function(...*):?} */
var _fh_get_dataset = Module["_fh_get_dataset"] = createExportWrapper("fh_get_dataset");

/** @type {function(...*):?} */
var _dataset_has_source = Module["_dataset_has_source"] = createExportWrapper("dataset_has_source");

/** @type {function(...*):?} */
var _fh_get_name = Module["_fh_get_name"] = createExportWrapper("fh_get_name");

/** @type {function(...*):?} */
var _casereader_clone = Module["_casereader_clone"] = createExportWrapper("casereader_clone");

/** @type {function(...*):?} */
var _casereader_destroy = Module["_casereader_destroy"] = createExportWrapper("casereader_destroy");

/** @type {function(...*):?} */
var _casereader_get_case_cnt = Module["_casereader_get_case_cnt"] = createExportWrapper("casereader_get_case_cnt");

/** @type {function(...*):?} */
var _any_writer_open = Module["_any_writer_open"] = createExportWrapper("any_writer_open");

/** @type {function(...*):?} */
var _fn_extension = Module["_fn_extension"] = createExportWrapper("fn_extension");

/** @type {function(...*):?} */
var _str_lowercase = Module["_str_lowercase"] = createExportWrapper("str_lowercase");

/** @type {function(...*):?} */
var _pfm_writer_default_options = Module["_pfm_writer_default_options"] = createExportWrapper("pfm_writer_default_options");

/** @type {function(...*):?} */
var _pfm_open_writer = Module["_pfm_open_writer"] = createExportWrapper("pfm_open_writer");

/** @type {function(...*):?} */
var _sfm_writer_default_options = Module["_sfm_writer_default_options"] = createExportWrapper("sfm_writer_default_options");

/** @type {function(...*):?} */
var _sfm_open_writer = Module["_sfm_open_writer"] = createExportWrapper("sfm_open_writer");

/** @type {function(...*):?} */
var _dataset_writer_open = Module["_dataset_writer_open"] = createExportWrapper("dataset_writer_open");

/** @type {function(...*):?} */
var _case_map_destroy = Module["_case_map_destroy"] = createExportWrapper("case_map_destroy");

/** @type {function(...*):?} */
var _case_map_execute = Module["_case_map_execute"] = createExportWrapper("case_map_execute");

/** @type {function(...*):?} */
var _case_map_get_proto = Module["_case_map_get_proto"] = createExportWrapper("case_map_get_proto");

/** @type {function(...*):?} */
var _case_map_create_input_translator = Module["_case_map_create_input_translator"] = createExportWrapper("case_map_create_input_translator");

/** @type {function(...*):?} */
var _casereader_create_translator = Module["_casereader_create_translator"] = createExportWrapper("casereader_create_translator");

/** @type {function(...*):?} */
var _case_map_create_output_translator = Module["_case_map_create_output_translator"] = createExportWrapper("case_map_create_output_translator");

/** @type {function(...*):?} */
var _casewriter_create_translator = Module["_casewriter_create_translator"] = createExportWrapper("casewriter_create_translator");

/** @type {function(...*):?} */
var _case_map_to_compact_dict = Module["_case_map_to_compact_dict"] = createExportWrapper("case_map_to_compact_dict");

/** @type {function(...*):?} */
var _case_map_stage_create = Module["_case_map_stage_create"] = createExportWrapper("case_map_stage_create");

/** @type {function(...*):?} */
var _hash_pointer = Module["_hash_pointer"] = createExportWrapper("hash_pointer");

/** @type {function(...*):?} */
var _case_map_stage_destroy = Module["_case_map_stage_destroy"] = createExportWrapper("case_map_stage_destroy");

/** @type {function(...*):?} */
var _case_map_stage_get_case_map = Module["_case_map_stage_get_case_map"] = createExportWrapper("case_map_stage_get_case_map");

/** @type {function(...*):?} */
var _case_map_by_name = Module["_case_map_by_name"] = createExportWrapper("case_map_by_name");

/** @type {function(...*):?} */
var _case_map_dump = Module["_case_map_dump"] = createExportWrapper("case_map_dump");

/** @type {function(...*):?} */
var _case_matcher_create = Module["_case_matcher_create"] = createExportWrapper("case_matcher_create");

/** @type {function(...*):?} */
var _case_matcher_add_input = Module["_case_matcher_add_input"] = createExportWrapper("case_matcher_add_input");

/** @type {function(...*):?} */
var _subcase_get_proto = Module["_subcase_get_proto"] = createExportWrapper("subcase_get_proto");

/** @type {function(...*):?} */
var _subcase_conformable = Module["_subcase_conformable"] = createExportWrapper("subcase_conformable");

/** @type {function(...*):?} */
var _subcase_clone = Module["_subcase_clone"] = createExportWrapper("subcase_clone");

/** @type {function(...*):?} */
var _case_matcher_destroy = Module["_case_matcher_destroy"] = createExportWrapper("case_matcher_destroy");

/** @type {function(...*):?} */
var _subcase_destroy = Module["_subcase_destroy"] = createExportWrapper("subcase_destroy");

/** @type {function(...*):?} */
var _case_matcher_match = Module["_case_matcher_match"] = createExportWrapper("case_matcher_match");

/** @type {function(...*):?} */
var _subcase_compare_3way = Module["_subcase_compare_3way"] = createExportWrapper("subcase_compare_3way");

/** @type {function(...*):?} */
var _subcase_extract = Module["_subcase_extract"] = createExportWrapper("subcase_extract");

/** @type {function(...*):?} */
var _case_tmpfile_create = Module["_case_tmpfile_create"] = createExportWrapper("case_tmpfile_create");

/** @type {function(...*):?} */
var _taint_create = Module["_taint_create"] = createExportWrapper("taint_create");

/** @type {function(...*):?} */
var _ext_array_create = Module["_ext_array_create"] = createExportWrapper("ext_array_create");

/** @type {function(...*):?} */
var _case_tmpfile_destroy = Module["_case_tmpfile_destroy"] = createExportWrapper("case_tmpfile_destroy");

/** @type {function(...*):?} */
var _ext_array_destroy = Module["_ext_array_destroy"] = createExportWrapper("ext_array_destroy");

/** @type {function(...*):?} */
var _taint_destroy = Module["_taint_destroy"] = createExportWrapper("taint_destroy");

/** @type {function(...*):?} */
var _case_tmpfile_error = Module["_case_tmpfile_error"] = createExportWrapper("case_tmpfile_error");

/** @type {function(...*):?} */
var _taint_is_tainted = Module["_taint_is_tainted"] = createExportWrapper("taint_is_tainted");

/** @type {function(...*):?} */
var _case_tmpfile_force_error = Module["_case_tmpfile_force_error"] = createExportWrapper("case_tmpfile_force_error");

/** @type {function(...*):?} */
var _taint_set_taint = Module["_taint_set_taint"] = createExportWrapper("taint_set_taint");

/** @type {function(...*):?} */
var _case_tmpfile_get_taint = Module["_case_tmpfile_get_taint"] = createExportWrapper("case_tmpfile_get_taint");

/** @type {function(...*):?} */
var _case_tmpfile_get_values = Module["_case_tmpfile_get_values"] = createExportWrapper("case_tmpfile_get_values");

/** @type {function(...*):?} */
var _ext_array_read = Module["_ext_array_read"] = createExportWrapper("ext_array_read");

/** @type {function(...*):?} */
var _case_tmpfile_get_case = Module["_case_tmpfile_get_case"] = createExportWrapper("case_tmpfile_get_case");

/** @type {function(...*):?} */
var _case_tmpfile_put_values = Module["_case_tmpfile_put_values"] = createExportWrapper("case_tmpfile_put_values");

/** @type {function(...*):?} */
var _ext_array_write = Module["_ext_array_write"] = createExportWrapper("ext_array_write");

/** @type {function(...*):?} */
var _case_tmpfile_put_case = Module["_case_tmpfile_put_case"] = createExportWrapper("case_tmpfile_put_case");

/** @type {function(...*):?} */
var _casegrouper_create_func = Module["_casegrouper_create_func"] = createExportWrapper("casegrouper_create_func");

/** @type {function(...*):?} */
var _casereader_rename = Module["_casereader_rename"] = createExportWrapper("casereader_rename");

/** @type {function(...*):?} */
var _casereader_get_taint = Module["_casereader_get_taint"] = createExportWrapper("casereader_get_taint");

/** @type {function(...*):?} */
var _taint_clone = Module["_taint_clone"] = createExportWrapper("taint_clone");

/** @type {function(...*):?} */
var _casegrouper_get_next_group = Module["_casegrouper_get_next_group"] = createExportWrapper("casegrouper_get_next_group");

/** @type {function(...*):?} */
var _casereader_read = Module["_casereader_read"] = createExportWrapper("casereader_read");

/** @type {function(...*):?} */
var _casereader_get_proto = Module["_casereader_get_proto"] = createExportWrapper("casereader_get_proto");

/** @type {function(...*):?} */
var _autopaging_writer_create = Module["_autopaging_writer_create"] = createExportWrapper("autopaging_writer_create");

/** @type {function(...*):?} */
var _casewriter_write = Module["_casewriter_write"] = createExportWrapper("casewriter_write");

/** @type {function(...*):?} */
var _casereader_peek = Module["_casereader_peek"] = createExportWrapper("casereader_peek");

/** @type {function(...*):?} */
var _casewriter_make_reader = Module["_casewriter_make_reader"] = createExportWrapper("casewriter_make_reader");

/** @type {function(...*):?} */
var _casereader_is_empty = Module["_casereader_is_empty"] = createExportWrapper("casereader_is_empty");

/** @type {function(...*):?} */
var _casegrouper_destroy = Module["_casegrouper_destroy"] = createExportWrapper("casegrouper_destroy");

/** @type {function(...*):?} */
var _taint_has_tainted_successor = Module["_taint_has_tainted_successor"] = createExportWrapper("taint_has_tainted_successor");

/** @type {function(...*):?} */
var _casegrouper_create_vars = Module["_casegrouper_create_vars"] = createExportWrapper("casegrouper_create_vars");

/** @type {function(...*):?} */
var _subcase_init_vars = Module["_subcase_init_vars"] = createExportWrapper("subcase_init_vars");

/** @type {function(...*):?} */
var _subcase_equal = Module["_subcase_equal"] = createExportWrapper("subcase_equal");

/** @type {function(...*):?} */
var _casegrouper_create_splits = Module["_casegrouper_create_splits"] = createExportWrapper("casegrouper_create_splits");

/** @type {function(...*):?} */
var _casegrouper_create_subcase = Module["_casegrouper_create_subcase"] = createExportWrapper("casegrouper_create_subcase");

/** @type {function(...*):?} */
var _caseinit_create = Module["_caseinit_create"] = createExportWrapper("caseinit_create");

/** @type {function(...*):?} */
var _caseinit_clone = Module["_caseinit_clone"] = createExportWrapper("caseinit_clone");

/** @type {function(...*):?} */
var _caseinit_clear = Module["_caseinit_clear"] = createExportWrapper("caseinit_clear");

/** @type {function(...*):?} */
var _caseinit_destroy = Module["_caseinit_destroy"] = createExportWrapper("caseinit_destroy");

/** @type {function(...*):?} */
var _caseinit_mark_as_preinited = Module["_caseinit_mark_as_preinited"] = createExportWrapper("caseinit_mark_as_preinited");

/** @type {function(...*):?} */
var _binary_search = Module["_binary_search"] = createExportWrapper("binary_search");

/** @type {function(...*):?} */
var _sort_unique = Module["_sort_unique"] = createExportWrapper("sort_unique");

/** @type {function(...*):?} */
var _caseinit_mark_for_init = Module["_caseinit_mark_for_init"] = createExportWrapper("caseinit_mark_for_init");

/** @type {function(...*):?} */
var _caseinit_init_vars = Module["_caseinit_init_vars"] = createExportWrapper("caseinit_init_vars");

/** @type {function(...*):?} */
var _caseinit_update_left_vars = Module["_caseinit_update_left_vars"] = createExportWrapper("caseinit_update_left_vars");

/** @type {function(...*):?} */
var _casereader_create_filter_func = Module["_casereader_create_filter_func"] = createExportWrapper("casereader_create_filter_func");

/** @type {function(...*):?} */
var _casereader_create_sequential = Module["_casereader_create_sequential"] = createExportWrapper("casereader_create_sequential");

/** @type {function(...*):?} */
var _taint_propagate = Module["_taint_propagate"] = createExportWrapper("taint_propagate");

/** @type {function(...*):?} */
var _casereader_create_filter_weight = Module["_casereader_create_filter_weight"] = createExportWrapper("casereader_create_filter_weight");

/** @type {function(...*):?} */
var _casereader_create_filter_missing = Module["_casereader_create_filter_missing"] = createExportWrapper("casereader_create_filter_missing");

/** @type {function(...*):?} */
var _casereader_create_counter = Module["_casereader_create_counter"] = createExportWrapper("casereader_create_counter");

/** @type {function(...*):?} */
var _casereader_force_error = Module["_casereader_force_error"] = createExportWrapper("casereader_force_error");

/** @type {function(...*):?} */
var _casereader_project = Module["_casereader_project"] = createExportWrapper("casereader_project");

/** @type {function(...*):?} */
var _subcase_init_empty = Module["_subcase_init_empty"] = createExportWrapper("subcase_init_empty");

/** @type {function(...*):?} */
var _subcase_add_proto_always = Module["_subcase_add_proto_always"] = createExportWrapper("subcase_add_proto_always");

/** @type {function(...*):?} */
var _casereader_translate_stateless = Module["_casereader_translate_stateless"] = createExportWrapper("casereader_translate_stateless");

/** @type {function(...*):?} */
var _subcase_copy = Module["_subcase_copy"] = createExportWrapper("subcase_copy");

/** @type {function(...*):?} */
var _casereader_project_1 = Module["_casereader_project_1"] = createExportWrapper("casereader_project_1");

/** @type {function(...*):?} */
var _subcase_init = Module["_subcase_init"] = createExportWrapper("subcase_init");

/** @type {function(...*):?} */
var _casereader_select = Module["_casereader_select"] = createExportWrapper("casereader_select");

/** @type {function(...*):?} */
var _casereader_advance = Module["_casereader_advance"] = createExportWrapper("casereader_advance");

/** @type {function(...*):?} */
var _casereader_truncate = Module["_casereader_truncate"] = createExportWrapper("casereader_truncate");

/** @type {function(...*):?} */
var _casereader_shim_insert = Module["_casereader_shim_insert"] = createExportWrapper("casereader_shim_insert");

/** @type {function(...*):?} */
var _casewindow_create = Module["_casewindow_create"] = createExportWrapper("casewindow_create");

/** @type {function(...*):?} */
var _casereader_create_random = Module["_casereader_create_random"] = createExportWrapper("casereader_create_random");

/** @type {function(...*):?} */
var _casereader_swap = Module["_casereader_swap"] = createExportWrapper("casereader_swap");

/** @type {function(...*):?} */
var _casewindow_get_taint = Module["_casewindow_get_taint"] = createExportWrapper("casewindow_get_taint");

/** @type {function(...*):?} */
var _casereader_shim_slurp = Module["_casereader_shim_slurp"] = createExportWrapper("casereader_shim_slurp");

/** @type {function(...*):?} */
var _casewindow_push_head = Module["_casewindow_push_head"] = createExportWrapper("casewindow_push_head");

/** @type {function(...*):?} */
var _casewindow_get_case_cnt = Module["_casewindow_get_case_cnt"] = createExportWrapper("casewindow_get_case_cnt");

/** @type {function(...*):?} */
var _casewindow_get_case = Module["_casewindow_get_case"] = createExportWrapper("casewindow_get_case");

/** @type {function(...*):?} */
var _casewindow_destroy = Module["_casewindow_destroy"] = createExportWrapper("casewindow_destroy");

/** @type {function(...*):?} */
var _casewindow_pop_tail = Module["_casewindow_pop_tail"] = createExportWrapper("casewindow_pop_tail");

/** @type {function(...*):?} */
var _casereader_create_append_numeric = Module["_casereader_create_append_numeric"] = createExportWrapper("casereader_create_append_numeric");

/** @type {function(...*):?} */
var _casereader_create_arithmetic_sequence = Module["_casereader_create_arithmetic_sequence"] = createExportWrapper("casereader_create_arithmetic_sequence");

/** @type {function(...*):?} */
var _casereader_create_append_rank = Module["_casereader_create_append_rank"] = createExportWrapper("casereader_create_append_rank");

/** @type {function(...*):?} */
var _casereader_create_distinct = Module["_casereader_create_distinct"] = createExportWrapper("casereader_create_distinct");

/** @type {function(...*):?} */
var _casereader_error = Module["_casereader_error"] = createExportWrapper("casereader_error");

/** @type {function(...*):?} */
var _casereader_count_cases = Module["_casereader_count_cases"] = createExportWrapper("casereader_count_cases");

/** @type {function(...*):?} */
var _casereader_transfer = Module["_casereader_transfer"] = createExportWrapper("casereader_transfer");

/** @type {function(...*):?} */
var _casewriter_get_taint = Module["_casewriter_get_taint"] = createExportWrapper("casewriter_get_taint");

/** @type {function(...*):?} */
var _casereader_dynamic_cast = Module["_casereader_dynamic_cast"] = createExportWrapper("casereader_dynamic_cast");

/** @type {function(...*):?} */
var _heap_create = Module["_heap_create"] = createExportWrapper("heap_create");

/** @type {function(...*):?} */
var _heap_insert = Module["_heap_insert"] = createExportWrapper("heap_insert");

/** @type {function(...*):?} */
var _casereader_create_empty = Module["_casereader_create_empty"] = createExportWrapper("casereader_create_empty");

/** @type {function(...*):?} */
var _heap_changed = Module["_heap_changed"] = createExportWrapper("heap_changed");

/** @type {function(...*):?} */
var _heap_minimum = Module["_heap_minimum"] = createExportWrapper("heap_minimum");

/** @type {function(...*):?} */
var _heap_delete = Module["_heap_delete"] = createExportWrapper("heap_delete");

/** @type {function(...*):?} */
var _heap_is_empty = Module["_heap_is_empty"] = createExportWrapper("heap_is_empty");

/** @type {function(...*):?} */
var _heap_destroy = Module["_heap_destroy"] = createExportWrapper("heap_destroy");

/** @type {function(...*):?} */
var _casewindow_error = Module["_casewindow_error"] = createExportWrapper("casewindow_error");

/** @type {function(...*):?} */
var _casewindow_get_proto = Module["_casewindow_get_proto"] = createExportWrapper("casewindow_get_proto");

/** @type {function(...*):?} */
var _casewindow_force_error = Module["_casewindow_force_error"] = createExportWrapper("casewindow_force_error");

/** @type {function(...*):?} */
var _deque_init = Module["_deque_init"] = createExportWrapper("deque_init");

/** @type {function(...*):?} */
var _deque_expand = Module["_deque_expand"] = createExportWrapper("deque_expand");

/** @type {function(...*):?} */
var _casewriter_rename = Module["_casewriter_rename"] = createExportWrapper("casewriter_rename");

/** @type {function(...*):?} */
var _casewriter_create = Module["_casewriter_create"] = createExportWrapper("casewriter_create");

/** @type {function(...*):?} */
var _casewriter_destroy = Module["_casewriter_destroy"] = createExportWrapper("casewriter_destroy");

/** @type {function(...*):?} */
var _casewriter_get_proto = Module["_casewriter_get_proto"] = createExportWrapper("casewriter_get_proto");

/** @type {function(...*):?} */
var _casewriter_error = Module["_casewriter_error"] = createExportWrapper("casewriter_error");

/** @type {function(...*):?} */
var _casewriter_force_error = Module["_casewriter_force_error"] = createExportWrapper("casewriter_force_error");

/** @type {function(...*):?} */
var _mem_writer_create = Module["_mem_writer_create"] = createExportWrapper("mem_writer_create");

/** @type {function(...*):?} */
var _tmpfile_writer_create = Module["_tmpfile_writer_create"] = createExportWrapper("tmpfile_writer_create");

/** @type {function(...*):?} */
var _csv_writer_open = Module["_csv_writer_open"] = createExportWrapper("csv_writer_open");

/** @type {function(...*):?} */
var _fh_ref = Module["_fh_ref"] = createExportWrapper("fh_ref");

/** @type {function(...*):?} */
var _fh_lock = Module["_fh_lock"] = createExportWrapper("fh_lock");

/** @type {function(...*):?} */
var _replace_file_start = Module["_replace_file_start"] = createExportWrapper("replace_file_start");

/** @type {function(...*):?} */
var _replace_file_commit = Module["_replace_file_commit"] = createExportWrapper("replace_file_commit");

/** @type {function(...*):?} */
var _replace_file_abort = Module["_replace_file_abort"] = createExportWrapper("replace_file_abort");

/** @type {function(...*):?} */
var _fh_unlock = Module["_fh_unlock"] = createExportWrapper("fh_unlock");

/** @type {function(...*):?} */
var _fh_unref = Module["_fh_unref"] = createExportWrapper("fh_unref");

/** @type {function(...*):?} */
var _ss_trim = Module["_ss_trim"] = createExportWrapper("ss_trim");

/** @type {function(...*):?} */
var _recode_substring_pool = Module["_recode_substring_pool"] = createExportWrapper("recode_substring_pool");

/** @type {function(...*):?} */
var _ss_equals = Module["_ss_equals"] = createExportWrapper("ss_equals");

/** @type {function(...*):?} */
var _ss_match_byte = Module["_ss_match_byte"] = createExportWrapper("ss_match_byte");

/** @type {function(...*):?} */
var _ss_ltrim = Module["_ss_ltrim"] = createExportWrapper("ss_ltrim");

/** @type {function(...*):?} */
var _ss_first = Module["_ss_first"] = createExportWrapper("ss_first");

/** @type {function(...*):?} */
var _ss_get_byte = Module["_ss_get_byte"] = createExportWrapper("ss_get_byte");

/** @type {function(...*):?} */
var _ss_advance = Module["_ss_advance"] = createExportWrapper("ss_advance");

/** @type {function(...*):?} */
var _ds_data = Module["_ds_data"] = createExportWrapper("ds_data");

/** @type {function(...*):?} */
var _ds_length = Module["_ds_length"] = createExportWrapper("ds_length");

/** @type {function(...*):?} */
var _ss_data = Module["_ss_data"] = createExportWrapper("ss_data");

/** @type {function(...*):?} */
var _integer_get = Module["_integer_get"] = createExportWrapper("integer_get");

/** @type {function(...*):?} */
var _float_get_size = Module["_float_get_size"] = createExportWrapper("float_get_size");

/** @type {function(...*):?} */
var _float_convert = Module["_float_convert"] = createExportWrapper("float_convert");

/** @type {function(...*):?} */
var _ss_get_long = Module["_ss_get_long"] = createExportWrapper("ss_get_long");

/** @type {function(...*):?} */
var _ss_get_bytes = Module["_ss_get_bytes"] = createExportWrapper("ss_get_bytes");

/** @type {function(...*):?} */
var _ss_span = Module["_ss_span"] = createExportWrapper("ss_span");

/** @type {function(...*):?} */
var _data_in_msg = Module["_data_in_msg"] = createExportWrapper("data_in_msg");

/** @type {function(...*):?} */
var _data_in_imply_decimals = Module["_data_in_imply_decimals"] = createExportWrapper("data_in_imply_decimals");

/** @type {function(...*):?} */
var _get_default_encoding = Module["_get_default_encoding"] = createExportWrapper("get_default_encoding");

/** @type {function(...*):?} */
var _trns_chain_destroy = Module["_trns_chain_destroy"] = createExportWrapper("trns_chain_destroy");

/** @type {function(...*):?} */
var _trns_chain_create = Module["_trns_chain_create"] = createExportWrapper("trns_chain_create");

/** @type {function(...*):?} */
var _session_remove_dataset = Module["_session_remove_dataset"] = createExportWrapper("session_remove_dataset");

/** @type {function(...*):?} */
var _session_add_dataset = Module["_session_add_dataset"] = createExportWrapper("session_add_dataset");

/** @type {function(...*):?} */
var _dataset_clone = Module["_dataset_clone"] = createExportWrapper("dataset_clone");

/** @type {function(...*):?} */
var _trns_chain_is_empty = Module["_trns_chain_is_empty"] = createExportWrapper("trns_chain_is_empty");

/** @type {function(...*):?} */
var _dataset_destroy = Module["_dataset_destroy"] = createExportWrapper("dataset_destroy");

/** @type {function(...*):?} */
var _dataset_clear = Module["_dataset_clear"] = createExportWrapper("dataset_clear");

/** @type {function(...*):?} */
var _dataset_set_session = Module["_dataset_set_session"] = createExportWrapper("dataset_set_session");

/** @type {function(...*):?} */
var _fh_set_default_handle = Module["_fh_set_default_handle"] = createExportWrapper("fh_set_default_handle");

/** @type {function(...*):?} */
var _proc_cancel_all_transformations = Module["_proc_cancel_all_transformations"] = createExportWrapper("proc_cancel_all_transformations");

/** @type {function(...*):?} */
var _dataset_name = Module["_dataset_name"] = createExportWrapper("dataset_name");

/** @type {function(...*):?} */
var _dataset_set_name = Module["_dataset_set_name"] = createExportWrapper("dataset_set_name");

/** @type {function(...*):?} */
var _session_set_active_dataset = Module["_session_set_active_dataset"] = createExportWrapper("session_set_active_dataset");

/** @type {function(...*):?} */
var _dataset_session = Module["_dataset_session"] = createExportWrapper("dataset_session");

/** @type {function(...*):?} */
var _dataset_set_dict = Module["_dataset_set_dict"] = createExportWrapper("dataset_set_dict");

/** @type {function(...*):?} */
var _dataset_set_source = Module["_dataset_set_source"] = createExportWrapper("dataset_set_source");

/** @type {function(...*):?} */
var _dataset_steal_source = Module["_dataset_steal_source"] = createExportWrapper("dataset_steal_source");

/** @type {function(...*):?} */
var _dataset_seqno = Module["_dataset_seqno"] = createExportWrapper("dataset_seqno");

/** @type {function(...*):?} */
var _dataset_set_callbacks = Module["_dataset_set_callbacks"] = createExportWrapper("dataset_set_callbacks");

/** @type {function(...*):?} */
var _dataset_get_display = Module["_dataset_get_display"] = createExportWrapper("dataset_get_display");

/** @type {function(...*):?} */
var _dataset_set_display = Module["_dataset_set_display"] = createExportWrapper("dataset_set_display");

/** @type {function(...*):?} */
var _time_of_last_procedure = Module["_time_of_last_procedure"] = createExportWrapper("time_of_last_procedure");

/** @type {function(...*):?} */
var _proc_execute = Module["_proc_execute"] = createExportWrapper("proc_execute");

/** @type {function(...*):?} */
var _proc_open_filtering = Module["_proc_open_filtering"] = createExportWrapper("proc_open_filtering");

/** @type {function(...*):?} */
var _proc_commit = Module["_proc_commit"] = createExportWrapper("proc_commit");

/** @type {function(...*):?} */
var _proc_open = Module["_proc_open"] = createExportWrapper("proc_open");

/** @type {function(...*):?} */
var _trns_chain_append = Module["_trns_chain_append"] = createExportWrapper("trns_chain_append");

/** @type {function(...*):?} */
var _proc_start_temporary_transformations = Module["_proc_start_temporary_transformations"] = createExportWrapper("proc_start_temporary_transformations");

/** @type {function(...*):?} */
var _trns_chain_finalize = Module["_trns_chain_finalize"] = createExportWrapper("trns_chain_finalize");

/** @type {function(...*):?} */
var _proc_is_open = Module["_proc_is_open"] = createExportWrapper("proc_is_open");

/** @type {function(...*):?} */
var _proc_cancel_temporary_transformations = Module["_proc_cancel_temporary_transformations"] = createExportWrapper("proc_cancel_temporary_transformations");

/** @type {function(...*):?} */
var _lagged_case = Module["_lagged_case"] = createExportWrapper("lagged_case");

/** @type {function(...*):?} */
var _proc_capture_transformations = Module["_proc_capture_transformations"] = createExportWrapper("proc_capture_transformations");

/** @type {function(...*):?} */
var _add_transformation = Module["_add_transformation"] = createExportWrapper("add_transformation");

/** @type {function(...*):?} */
var _add_transformation_with_finalizer = Module["_add_transformation_with_finalizer"] = createExportWrapper("add_transformation_with_finalizer");

/** @type {function(...*):?} */
var _next_transformation = Module["_next_transformation"] = createExportWrapper("next_transformation");

/** @type {function(...*):?} */
var _trns_chain_next = Module["_trns_chain_next"] = createExportWrapper("trns_chain_next");

/** @type {function(...*):?} */
var _proc_in_temporary_transformations = Module["_proc_in_temporary_transformations"] = createExportWrapper("proc_in_temporary_transformations");

/** @type {function(...*):?} */
var _proc_make_temporary_transformations_permanent = Module["_proc_make_temporary_transformations_permanent"] = createExportWrapper("proc_make_temporary_transformations_permanent");

/** @type {function(...*):?} */
var _trns_chain_splice = Module["_trns_chain_splice"] = createExportWrapper("trns_chain_splice");

/** @type {function(...*):?} */
var _add_permanent_ordering_transformation = Module["_add_permanent_ordering_transformation"] = createExportWrapper("add_permanent_ordering_transformation");

/** @type {function(...*):?} */
var _proc_discard_output = Module["_proc_discard_output"] = createExportWrapper("proc_discard_output");

/** @type {function(...*):?} */
var _dataset_end_of_command = Module["_dataset_end_of_command"] = createExportWrapper("dataset_end_of_command");

/** @type {function(...*):?} */
var _taint_reset_successor_taint = Module["_taint_reset_successor_taint"] = createExportWrapper("taint_reset_successor_taint");

/** @type {function(...*):?} */
var _dataset_need_lag = Module["_dataset_need_lag"] = createExportWrapper("dataset_need_lag");

/** @type {function(...*):?} */
var _dataset_set_session__ = Module["_dataset_set_session__"] = createExportWrapper("dataset_set_session__");

/** @type {function(...*):?} */
var _trns_chain_execute = Module["_trns_chain_execute"] = createExportWrapper("trns_chain_execute");

/** @type {function(...*):?} */
var _tower_init = Module["_tower_init"] = createExportWrapper("tower_init");

/** @type {function(...*):?} */
var _range_set_create = Module["_range_set_create"] = createExportWrapper("range_set_create");

/** @type {function(...*):?} */
var _range_set_set1 = Module["_range_set_set1"] = createExportWrapper("range_set_set1");

/** @type {function(...*):?} */
var _sparse_xarray_create = Module["_sparse_xarray_create"] = createExportWrapper("sparse_xarray_create");

/** @type {function(...*):?} */
var _range_set_set0 = Module["_range_set_set0"] = createExportWrapper("range_set_set0");

/** @type {function(...*):?} */
var _tower_insert = Module["_tower_insert"] = createExportWrapper("tower_insert");

/** @type {function(...*):?} */
var _datasheet_destroy = Module["_datasheet_destroy"] = createExportWrapper("datasheet_destroy");

/** @type {function(...*):?} */
var _range_set_destroy = Module["_range_set_destroy"] = createExportWrapper("range_set_destroy");

/** @type {function(...*):?} */
var _sparse_xarray_destroy = Module["_sparse_xarray_destroy"] = createExportWrapper("sparse_xarray_destroy");

/** @type {function(...*):?} */
var _tower_is_empty = Module["_tower_is_empty"] = createExportWrapper("tower_is_empty");

/** @type {function(...*):?} */
var _tower_first = Module["_tower_first"] = createExportWrapper("tower_first");

/** @type {function(...*):?} */
var _tower_delete = Module["_tower_delete"] = createExportWrapper("tower_delete");

/** @type {function(...*):?} */
var _datasheet_get_proto = Module["_datasheet_get_proto"] = createExportWrapper("datasheet_get_proto");

/** @type {function(...*):?} */
var _datasheet_get_column_width = Module["_datasheet_get_column_width"] = createExportWrapper("datasheet_get_column_width");

/** @type {function(...*):?} */
var _datasheet_rename = Module["_datasheet_rename"] = createExportWrapper("datasheet_rename");

/** @type {function(...*):?} */
var _datasheet_error = Module["_datasheet_error"] = createExportWrapper("datasheet_error");

/** @type {function(...*):?} */
var _datasheet_force_error = Module["_datasheet_force_error"] = createExportWrapper("datasheet_force_error");

/** @type {function(...*):?} */
var _datasheet_get_taint = Module["_datasheet_get_taint"] = createExportWrapper("datasheet_get_taint");

/** @type {function(...*):?} */
var _tower_height = Module["_tower_height"] = createExportWrapper("tower_height");

/** @type {function(...*):?} */
var _datasheet_insert_column = Module["_datasheet_insert_column"] = createExportWrapper("datasheet_insert_column");

/** @type {function(...*):?} */
var _sparse_xarray_write_columns = Module["_sparse_xarray_write_columns"] = createExportWrapper("sparse_xarray_write_columns");

/** @type {function(...*):?} */
var _datasheet_delete_columns = Module["_datasheet_delete_columns"] = createExportWrapper("datasheet_delete_columns");

/** @type {function(...*):?} */
var _range_set_allocate_fully = Module["_range_set_allocate_fully"] = createExportWrapper("range_set_allocate_fully");

/** @type {function(...*):?} */
var _datasheet_move_columns = Module["_datasheet_move_columns"] = createExportWrapper("datasheet_move_columns");

/** @type {function(...*):?} */
var _datasheet_resize_column = Module["_datasheet_resize_column"] = createExportWrapper("datasheet_resize_column");

/** @type {function(...*):?} */
var _tower_lookup = Module["_tower_lookup"] = createExportWrapper("tower_lookup");

/** @type {function(...*):?} */
var _sparse_xarray_copy = Module["_sparse_xarray_copy"] = createExportWrapper("sparse_xarray_copy");

/** @type {function(...*):?} */
var _sparse_xarray_contains_row = Module["_sparse_xarray_contains_row"] = createExportWrapper("sparse_xarray_contains_row");

/** @type {function(...*):?} */
var _sparse_xarray_read = Module["_sparse_xarray_read"] = createExportWrapper("sparse_xarray_read");

/** @type {function(...*):?} */
var _sparse_xarray_write = Module["_sparse_xarray_write"] = createExportWrapper("sparse_xarray_write");

/** @type {function(...*):?} */
var _datasheet_get_row = Module["_datasheet_get_row"] = createExportWrapper("datasheet_get_row");

/** @type {function(...*):?} */
var _datasheet_put_row = Module["_datasheet_put_row"] = createExportWrapper("datasheet_put_row");

/** @type {function(...*):?} */
var _datasheet_put_value = Module["_datasheet_put_value"] = createExportWrapper("datasheet_put_value");

/** @type {function(...*):?} */
var _datasheet_insert_rows = Module["_datasheet_insert_rows"] = createExportWrapper("datasheet_insert_rows");

/** @type {function(...*):?} */
var _range_set_allocate = Module["_range_set_allocate"] = createExportWrapper("range_set_allocate");

/** @type {function(...*):?} */
var _datasheet_delete_rows = Module["_datasheet_delete_rows"] = createExportWrapper("datasheet_delete_rows");

/** @type {function(...*):?} */
var _datasheet_move_rows = Module["_datasheet_move_rows"] = createExportWrapper("datasheet_move_rows");

/** @type {function(...*):?} */
var _tower_splice = Module["_tower_splice"] = createExportWrapper("tower_splice");

/** @type {function(...*):?} */
var _tower_last = Module["_tower_last"] = createExportWrapper("tower_last");

/** @type {function(...*):?} */
var _datasheet_make_reader = Module["_datasheet_make_reader"] = createExportWrapper("datasheet_make_reader");

/** @type {function(...*):?} */
var _clone_datasheet = Module["_clone_datasheet"] = createExportWrapper("clone_datasheet");

/** @type {function(...*):?} */
var _range_set_clone = Module["_range_set_clone"] = createExportWrapper("range_set_clone");

/** @type {function(...*):?} */
var _sparse_xarray_clone = Module["_sparse_xarray_clone"] = createExportWrapper("sparse_xarray_clone");

/** @type {function(...*):?} */
var _tower_next = Module["_tower_next"] = createExportWrapper("tower_next");

/** @type {function(...*):?} */
var _hash_datasheet = Module["_hash_datasheet"] = createExportWrapper("hash_datasheet");

/** @type {function(...*):?} */
var _sparse_xarray_get_n_columns = Module["_sparse_xarray_get_n_columns"] = createExportWrapper("sparse_xarray_get_n_columns");

/** @type {function(...*):?} */
var _bt_first = Module["_bt_first"] = createExportWrapper("bt_first");

/** @type {function(...*):?} */
var _bt_next = Module["_bt_next"] = createExportWrapper("bt_next");

/** @type {function(...*):?} */
var _tower_resize = Module["_tower_resize"] = createExportWrapper("tower_resize");

/** @type {function(...*):?} */
var _tower_prev = Module["_tower_prev"] = createExportWrapper("tower_prev");

/** @type {function(...*):?} */
var _encrypted_file_open = Module["_encrypted_file_open"] = createExportWrapper("encrypted_file_open");

/** @type {function(...*):?} */
var _feof = Module["_feof"] = createExportWrapper("feof");

/** @type {function(...*):?} */
var _encrypted_file_unlock = Module["_encrypted_file_unlock"] = createExportWrapper("encrypted_file_unlock");

/** @type {function(...*):?} */
var _encrypted_file_unlock__ = Module["_encrypted_file_unlock__"] = createExportWrapper("encrypted_file_unlock__");

/** @type {function(...*):?} */
var _cmac_aes256 = Module["_cmac_aes256"] = createExportWrapper("cmac_aes256");

/** @type {function(...*):?} */
var _encrypted_file_read = Module["_encrypted_file_read"] = createExportWrapper("encrypted_file_read");

/** @type {function(...*):?} */
var _encrypted_file_close = Module["_encrypted_file_close"] = createExportWrapper("encrypted_file_close");

/** @type {function(...*):?} */
var _fh_inline_file = Module["_fh_inline_file"] = createExportWrapper("fh_inline_file");

/** @type {function(...*):?} */
var _fh_unname = Module["_fh_unname"] = createExportWrapper("fh_unname");

/** @type {function(...*):?} */
var _fh_from_id = Module["_fh_from_id"] = createExportWrapper("fh_from_id");

/** @type {function(...*):?} */
var _fh_create_file = Module["_fh_create_file"] = createExportWrapper("fh_create_file");

/** @type {function(...*):?} */
var _fh_create_dataset = Module["_fh_create_dataset"] = createExportWrapper("fh_create_dataset");

/** @type {function(...*):?} */
var _fh_default_properties = Module["_fh_default_properties"] = createExportWrapper("fh_default_properties");

/** @type {function(...*):?} */
var _fh_get_id = Module["_fh_get_id"] = createExportWrapper("fh_get_id");

/** @type {function(...*):?} */
var _fh_get_file_name_encoding = Module["_fh_get_file_name_encoding"] = createExportWrapper("fh_get_file_name_encoding");

/** @type {function(...*):?} */
var _fh_get_mode = Module["_fh_get_mode"] = createExportWrapper("fh_get_mode");

/** @type {function(...*):?} */
var _fh_get_line_ends = Module["_fh_get_line_ends"] = createExportWrapper("fh_get_line_ends");

/** @type {function(...*):?} */
var _fh_get_record_width = Module["_fh_get_record_width"] = createExportWrapper("fh_get_record_width");

/** @type {function(...*):?} */
var _fh_get_tab_width = Module["_fh_get_tab_width"] = createExportWrapper("fh_get_tab_width");

/** @type {function(...*):?} */
var _fh_get_encoding = Module["_fh_get_encoding"] = createExportWrapper("fh_get_encoding");

/** @type {function(...*):?} */
var _fh_get_default_handle = Module["_fh_get_default_handle"] = createExportWrapper("fh_get_default_handle");

/** @type {function(...*):?} */
var _fh_lock_get_aux = Module["_fh_lock_get_aux"] = createExportWrapper("fh_lock_get_aux");

/** @type {function(...*):?} */
var _fh_lock_set_aux = Module["_fh_lock_set_aux"] = createExportWrapper("fh_lock_set_aux");

/** @type {function(...*):?} */
var _fh_is_locked = Module["_fh_is_locked"] = createExportWrapper("fh_is_locked");

/** @type {function(...*):?} */
var _fn_search_path = Module["_fn_search_path"] = createExportWrapper("fn_search_path");

/** @type {function(...*):?} */
var _fn_exists = Module["_fn_exists"] = createExportWrapper("fn_exists");

/** @type {function(...*):?} */
var _pclose = Module["_pclose"] = createExportWrapper("pclose");

/** @type {function(...*):?} */
var _default_output_path = Module["_default_output_path"] = createExportWrapper("default_output_path");

/** @type {function(...*):?} */
var _fmt_guesser_create = Module["_fmt_guesser_create"] = createExportWrapper("fmt_guesser_create");

/** @type {function(...*):?} */
var _fmt_guesser_clear = Module["_fmt_guesser_clear"] = createExportWrapper("fmt_guesser_clear");

/** @type {function(...*):?} */
var _fmt_guesser_destroy = Module["_fmt_guesser_destroy"] = createExportWrapper("fmt_guesser_destroy");

/** @type {function(...*):?} */
var _fmt_guesser_add = Module["_fmt_guesser_add"] = createExportWrapper("fmt_guesser_add");

/** @type {function(...*):?} */
var _ss_match_byte_in = Module["_ss_match_byte_in"] = createExportWrapper("ss_match_byte_in");

/** @type {function(...*):?} */
var _ss_at = Module["_ss_at"] = createExportWrapper("ss_at");

/** @type {function(...*):?} */
var _fmt_guesser_guess = Module["_fmt_guesser_guess"] = createExportWrapper("fmt_guesser_guess");

/** @type {function(...*):?} */
var _lazy_casereader_create = Module["_lazy_casereader_create"] = createExportWrapper("lazy_casereader_create");

/** @type {function(...*):?} */
var _lazy_casereader_destroy = Module["_lazy_casereader_destroy"] = createExportWrapper("lazy_casereader_destroy");

/** @type {function(...*):?} */
var _short_names_assign = Module["_short_names_assign"] = createExportWrapper("short_names_assign");

/** @type {function(...*):?} */
var ___divtf3 = Module["___divtf3"] = createExportWrapper("__divtf3");

/** @type {function(...*):?} */
var ___letf2 = Module["___letf2"] = createExportWrapper("__letf2");

/** @type {function(...*):?} */
var _is_encoding_ebcdic_compatible = Module["_is_encoding_ebcdic_compatible"] = createExportWrapper("is_encoding_ebcdic_compatible");

/** @type {function(...*):?} */
var _sfm_dictionary_to_sfm_vars = Module["_sfm_dictionary_to_sfm_vars"] = createExportWrapper("sfm_dictionary_to_sfm_vars");

/** @type {function(...*):?} */
var _get_encoding_info = Module["_get_encoding_info"] = createExportWrapper("get_encoding_info");

/** @type {function(...*):?} */
var _sfm_width_to_octs = Module["_sfm_width_to_octs"] = createExportWrapper("sfm_width_to_octs");

/** @type {function(...*):?} */
var _sfm_width_to_segments = Module["_sfm_width_to_segments"] = createExportWrapper("sfm_width_to_segments");

/** @type {function(...*):?} */
var _sfm_segment_alloc_width = Module["_sfm_segment_alloc_width"] = createExportWrapper("sfm_segment_alloc_width");

/** @type {function(...*):?} */
var _sscanf = Module["_sscanf"] = createExportWrapper("sscanf");

/** @type {function(...*):?} */
var _sys_get_codepage_from_encoding = Module["_sys_get_codepage_from_encoding"] = createExportWrapper("sys_get_codepage_from_encoding");

/** @type {function(...*):?} */
var _is_encoding_ascii_compatible = Module["_is_encoding_ascii_compatible"] = createExportWrapper("is_encoding_ascii_compatible");

/** @type {function(...*):?} */
var _sfm_segment_effective_offset = Module["_sfm_segment_effective_offset"] = createExportWrapper("sfm_segment_effective_offset");

/** @type {function(...*):?} */
var _ds_ss = Module["_ds_ss"] = createExportWrapper("ds_ss");

/** @type {function(...*):?} */
var _str_uppercase = Module["_str_uppercase"] = createExportWrapper("str_uppercase");

/** @type {function(...*):?} */
var _deflateInit_ = Module["_deflateInit_"] = createExportWrapper("deflateInit_");

/** @type {function(...*):?} */
var _utf8_to_lower = Module["_utf8_to_lower"] = createExportWrapper("utf8_to_lower");

/** @type {function(...*):?} */
var _clearerr_unlocked = Module["_clearerr_unlocked"] = createExportWrapper("clearerr_unlocked");

/** @type {function(...*):?} */
var _deflate = Module["_deflate"] = createExportWrapper("deflate");

/** @type {function(...*):?} */
var _deflateEnd = Module["_deflateEnd"] = createExportWrapper("deflateEnd");

/** @type {function(...*):?} */
var _subcase_add_vars_always = Module["_subcase_add_vars_always"] = createExportWrapper("subcase_add_vars_always");

/** @type {function(...*):?} */
var _subcase_init_var = Module["_subcase_init_var"] = createExportWrapper("subcase_init_var");

/** @type {function(...*):?} */
var _subcase_add_var_always = Module["_subcase_add_var_always"] = createExportWrapper("subcase_add_var_always");

/** @type {function(...*):?} */
var _subcase_add_var = Module["_subcase_add_var"] = createExportWrapper("subcase_add_var");

/** @type {function(...*):?} */
var _subcase_add = Module["_subcase_add"] = createExportWrapper("subcase_add");

/** @type {function(...*):?} */
var _subcase_clear = Module["_subcase_clear"] = createExportWrapper("subcase_clear");

/** @type {function(...*):?} */
var _subcase_contains_var = Module["_subcase_contains_var"] = createExportWrapper("subcase_contains_var");

/** @type {function(...*):?} */
var _subcase_contains = Module["_subcase_contains"] = createExportWrapper("subcase_contains");

/** @type {function(...*):?} */
var _subcase_add_always = Module["_subcase_add_always"] = createExportWrapper("subcase_add_always");

/** @type {function(...*):?} */
var _subcase_inject = Module["_subcase_inject"] = createExportWrapper("subcase_inject");

/** @type {function(...*):?} */
var _subcase_compare_3way_xc = Module["_subcase_compare_3way_xc"] = createExportWrapper("subcase_compare_3way_xc");

/** @type {function(...*):?} */
var _subcase_compare_3way_cx = Module["_subcase_compare_3way_cx"] = createExportWrapper("subcase_compare_3way_cx");

/** @type {function(...*):?} */
var _subcase_compare_3way_xx = Module["_subcase_compare_3way_xx"] = createExportWrapper("subcase_compare_3way_xx");

/** @type {function(...*):?} */
var _subcase_equal_xc = Module["_subcase_equal_xc"] = createExportWrapper("subcase_equal_xc");

/** @type {function(...*):?} */
var _subcase_equal_cx = Module["_subcase_equal_cx"] = createExportWrapper("subcase_equal_cx");

/** @type {function(...*):?} */
var _subcase_equal_xx = Module["_subcase_equal_xx"] = createExportWrapper("subcase_equal_xx");

/** @type {function(...*):?} */
var _convert_to_filename_encoding = Module["_convert_to_filename_encoding"] = createExportWrapper("convert_to_filename_encoding");

/** @type {function(...*):?} */
var _hmapx_destroy = Module["_hmapx_destroy"] = createExportWrapper("hmapx_destroy");

/** @type {function(...*):?} */
var _session_lookup_dataset = Module["_session_lookup_dataset"] = createExportWrapper("session_lookup_dataset");

/** @type {function(...*):?} */
var _hmapx_insert = Module["_hmapx_insert"] = createExportWrapper("hmapx_insert");

/** @type {function(...*):?} */
var _session_lookup_dataset_assert = Module["_session_lookup_dataset_assert"] = createExportWrapper("session_lookup_dataset_assert");

/** @type {function(...*):?} */
var _session_get_default_syntax_encoding = Module["_session_get_default_syntax_encoding"] = createExportWrapper("session_get_default_syntax_encoding");

/** @type {function(...*):?} */
var _session_n_datasets = Module["_session_n_datasets"] = createExportWrapper("session_n_datasets");

/** @type {function(...*):?} */
var _session_for_each_dataset = Module["_session_for_each_dataset"] = createExportWrapper("session_for_each_dataset");

/** @type {function(...*):?} */
var _session_get_dataset_by_seqno = Module["_session_get_dataset_by_seqno"] = createExportWrapper("session_get_dataset_by_seqno");

/** @type {function(...*):?} */
var _session_generate_dataset_name = Module["_session_generate_dataset_name"] = createExportWrapper("session_generate_dataset_name");

/** @type {function(...*):?} */
var _stringi_set_init = Module["_stringi_set_init"] = createExportWrapper("stringi_set_init");

/** @type {function(...*):?} */
var _stringi_set_insert = Module["_stringi_set_insert"] = createExportWrapper("stringi_set_insert");

/** @type {function(...*):?} */
var _stringi_set_destroy = Module["_stringi_set_destroy"] = createExportWrapper("stringi_set_destroy");

/** @type {function(...*):?} */
var _spreadsheet_ref = Module["_spreadsheet_ref"] = createExportWrapper("spreadsheet_ref");

/** @type {function(...*):?} */
var _spreadsheet_unref = Module["_spreadsheet_unref"] = createExportWrapper("spreadsheet_unref");

/** @type {function(...*):?} */
var _gnumeric_unref = Module["_gnumeric_unref"] = createExportWrapper("gnumeric_unref");

/** @type {function(...*):?} */
var _ods_unref = Module["_ods_unref"] = createExportWrapper("ods_unref");

/** @type {function(...*):?} */
var _spreadsheet_make_reader = Module["_spreadsheet_make_reader"] = createExportWrapper("spreadsheet_make_reader");

/** @type {function(...*):?} */
var _ods_make_reader = Module["_ods_make_reader"] = createExportWrapper("ods_make_reader");

/** @type {function(...*):?} */
var _gnumeric_make_reader = Module["_gnumeric_make_reader"] = createExportWrapper("gnumeric_make_reader");

/** @type {function(...*):?} */
var _spreadsheet_get_sheet_name = Module["_spreadsheet_get_sheet_name"] = createExportWrapper("spreadsheet_get_sheet_name");

/** @type {function(...*):?} */
var _ods_get_sheet_name = Module["_ods_get_sheet_name"] = createExportWrapper("ods_get_sheet_name");

/** @type {function(...*):?} */
var _gnumeric_get_sheet_name = Module["_gnumeric_get_sheet_name"] = createExportWrapper("gnumeric_get_sheet_name");

/** @type {function(...*):?} */
var _spreadsheet_get_sheet_range = Module["_spreadsheet_get_sheet_range"] = createExportWrapper("spreadsheet_get_sheet_range");

/** @type {function(...*):?} */
var _ods_get_sheet_range = Module["_ods_get_sheet_range"] = createExportWrapper("ods_get_sheet_range");

/** @type {function(...*):?} */
var _gnumeric_get_sheet_range = Module["_gnumeric_get_sheet_range"] = createExportWrapper("gnumeric_get_sheet_range");

/** @type {function(...*):?} */
var _ps26_to_int = Module["_ps26_to_int"] = createExportWrapper("ps26_to_int");

/** @type {function(...*):?} */
var _int_to_ps26 = Module["_int_to_ps26"] = createExportWrapper("int_to_ps26");

/** @type {function(...*):?} */
var _create_cell_ref = Module["_create_cell_ref"] = createExportWrapper("create_cell_ref");

/** @type {function(...*):?} */
var _create_cell_range = Module["_create_cell_range"] = createExportWrapper("create_cell_range");

/** @type {function(...*):?} */
var _convert_cell_ref = Module["_convert_cell_ref"] = createExportWrapper("convert_cell_ref");

/** @type {function(...*):?} */
var _sys_get_encoding_from_codepage = Module["_sys_get_encoding_from_codepage"] = createExportWrapper("sys_get_encoding_from_codepage");

/** @type {function(...*):?} */
var _any_read_info_destroy = Module["_any_read_info_destroy"] = createExportWrapper("any_read_info_destroy");

/** @type {function(...*):?} */
var _fseek = Module["_fseek"] = createExportWrapper("fseek");

/** @type {function(...*):?} */
var _integer_identify = Module["_integer_identify"] = createExportWrapper("integer_identify");

/** @type {function(...*):?} */
var _float_identify = Module["_float_identify"] = createExportWrapper("float_identify");

/** @type {function(...*):?} */
var _pool_2nrealloc = Module["_pool_2nrealloc"] = createExportWrapper("pool_2nrealloc");

/** @type {function(...*):?} */
var _pool_malloc = Module["_pool_malloc"] = createExportWrapper("pool_malloc");

/** @type {function(...*):?} */
var _pool_nmalloc = Module["_pool_nmalloc"] = createExportWrapper("pool_nmalloc");

/** @type {function(...*):?} */
var _inflateInit_ = Module["_inflateInit_"] = createExportWrapper("inflateInit_");

/** @type {function(...*):?} */
var _float_get_double = Module["_float_get_double"] = createExportWrapper("float_get_double");

/** @type {function(...*):?} */
var _pool_alloc = Module["_pool_alloc"] = createExportWrapper("pool_alloc");

/** @type {function(...*):?} */
var _pool_free = Module["_pool_free"] = createExportWrapper("pool_free");

/** @type {function(...*):?} */
var _ss_match_string = Module["_ss_match_string"] = createExportWrapper("ss_match_string");

/** @type {function(...*):?} */
var _ss_xstrdup = Module["_ss_xstrdup"] = createExportWrapper("ss_xstrdup");

/** @type {function(...*):?} */
var _ss_tokenize = Module["_ss_tokenize"] = createExportWrapper("ss_tokenize");

/** @type {function(...*):?} */
var _ds_put_vformat = Module["_ds_put_vformat"] = createExportWrapper("ds_put_vformat");

/** @type {function(...*):?} */
var _msg_emit = Module["_msg_emit"] = createExportWrapper("msg_emit");

/** @type {function(...*):?} */
var _ss_substr = Module["_ss_substr"] = createExportWrapper("ss_substr");

/** @type {function(...*):?} */
var _inflate = Module["_inflate"] = createExportWrapper("inflate");

/** @type {function(...*):?} */
var _inflateEnd = Module["_inflateEnd"] = createExportWrapper("inflateEnd");

/** @type {function(...*):?} */
var _pool_vasprintf = Module["_pool_vasprintf"] = createExportWrapper("pool_vasprintf");

/** @type {function(...*):?} */
var _pool_realloc = Module["_pool_realloc"] = createExportWrapper("pool_realloc");

/** @type {function(...*):?} */
var _xmlStrdup = Module["_xmlStrdup"] = createExportWrapper("xmlStrdup");

/** @type {function(...*):?} */
var _gnumeric_probe = Module["_gnumeric_probe"] = createExportWrapper("gnumeric_probe");

/** @type {function(...*):?} */
var _gzopen = Module["_gzopen"] = createExportWrapper("gzopen");

/** @type {function(...*):?} */
var _gzclose = Module["_gzclose"] = createExportWrapper("gzclose");

/** @type {function(...*):?} */
var _gzread = Module["_gzread"] = createExportWrapper("gzread");

/** @type {function(...*):?} */
var _all_variables = Module["_all_variables"] = createExportWrapper("all_variables");

/** @type {function(...*):?} */
var _string_set_insert = Module["_string_set_insert"] = createExportWrapper("string_set_insert");

/** @type {function(...*):?} */
var _string_set_delete = Module["_string_set_delete"] = createExportWrapper("string_set_delete");

/** @type {function(...*):?} */
var _string_set_contains = Module["_string_set_contains"] = createExportWrapper("string_set_contains");

/** @type {function(...*):?} */
var _mdd_write = Module["_mdd_write"] = createExportWrapper("mdd_write");

/** @type {function(...*):?} */
var _string_set_insert_nocopy = Module["_string_set_insert_nocopy"] = createExportWrapper("string_set_insert_nocopy");

/** @type {function(...*):?} */
var _zip_member_finish = Module["_zip_member_finish"] = createExportWrapper("zip_member_finish");

/** @type {function(...*):?} */
var _zip_reader_destroy = Module["_zip_reader_destroy"] = createExportWrapper("zip_reader_destroy");

/** @type {function(...*):?} */
var _ods_probe = Module["_ods_probe"] = createExportWrapper("ods_probe");

/** @type {function(...*):?} */
var _zip_reader_create = Module["_zip_reader_create"] = createExportWrapper("zip_reader_create");

/** @type {function(...*):?} */
var _zip_member_open = Module["_zip_member_open"] = createExportWrapper("zip_member_open");

/** @type {function(...*):?} */
var _zip_member_read = Module["_zip_member_read"] = createExportWrapper("zip_member_read");

/** @type {function(...*):?} */
var _pool_calloc = Module["_pool_calloc"] = createExportWrapper("pool_calloc");

/** @type {function(...*):?} */
var _pool_asprintf = Module["_pool_asprintf"] = createExportWrapper("pool_asprintf");

/** @type {function(...*):?} */
var _psql_open_reader = Module["_psql_open_reader"] = createExportWrapper("psql_open_reader");

/** @type {function(...*):?} */
var _getc = Module["_getc"] = createExportWrapper("getc");

/** @type {function(...*):?} */
var _testSetjmp = Module["_testSetjmp"] = createExportWrapper("testSetjmp");

/** @type {function(...*):?} */
var _saveSetjmp = Module["_saveSetjmp"] = createExportWrapper("saveSetjmp");

/** @type {function(...*):?} */
var _ungetc = Module["_ungetc"] = createExportWrapper("ungetc");

/** @type {function(...*):?} */
var _cmd_result_is_success = Module["_cmd_result_is_success"] = createExportWrapper("cmd_result_is_success");

/** @type {function(...*):?} */
var _cmd_parse_in_state = Module["_cmd_parse_in_state"] = createExportWrapper("cmd_parse_in_state");

/** @type {function(...*):?} */
var _lex_discard_rest_of_command = Module["_lex_discard_rest_of_command"] = createExportWrapper("lex_discard_rest_of_command");

/** @type {function(...*):?} */
var _ds_last = Module["_ds_last"] = createExportWrapper("ds_last");

/** @type {function(...*):?} */
var _lex_next_token = Module["_lex_next_token"] = createExportWrapper("lex_next_token");

/** @type {function(...*):?} */
var _lex_next_tokcstr = Module["_lex_next_tokcstr"] = createExportWrapper("lex_next_tokcstr");

/** @type {function(...*):?} */
var _lex_next_is_integer = Module["_lex_next_is_integer"] = createExportWrapper("lex_next_is_integer");

/** @type {function(...*):?} */
var _lex_next_integer = Module["_lex_next_integer"] = createExportWrapper("lex_next_integer");

/** @type {function(...*):?} */
var _command_matcher_init = Module["_command_matcher_init"] = createExportWrapper("command_matcher_init");

/** @type {function(...*):?} */
var _command_matcher_add = Module["_command_matcher_add"] = createExportWrapper("command_matcher_add");

/** @type {function(...*):?} */
var _command_matcher_get_match = Module["_command_matcher_get_match"] = createExportWrapper("command_matcher_get_match");

/** @type {function(...*):?} */
var _command_matcher_get_missing_words = Module["_command_matcher_get_missing_words"] = createExportWrapper("command_matcher_get_missing_words");

/** @type {function(...*):?} */
var _command_matcher_destroy = Module["_command_matcher_destroy"] = createExportWrapper("command_matcher_destroy");

/** @type {function(...*):?} */
var _ds_truncate = Module["_ds_truncate"] = createExportWrapper("ds_truncate");

/** @type {function(...*):?} */
var _lex_error = Module["_lex_error"] = createExportWrapper("lex_error");

/** @type {function(...*):?} */
var _lex_interactive_reset = Module["_lex_interactive_reset"] = createExportWrapper("lex_interactive_reset");

/** @type {function(...*):?} */
var _utf8_to_title = Module["_utf8_to_title"] = createExportWrapper("utf8_to_title");

/** @type {function(...*):?} */
var _group_open_item_create_nocopy = Module["_group_open_item_create_nocopy"] = createExportWrapper("group_open_item_create_nocopy");

/** @type {function(...*):?} */
var _group_open_item_submit = Module["_group_open_item_submit"] = createExportWrapper("group_open_item_submit");

/** @type {function(...*):?} */
var _lex_end_of_command = Module["_lex_end_of_command"] = createExportWrapper("lex_end_of_command");

/** @type {function(...*):?} */
var _group_close_item_create = Module["_group_close_item_create"] = createExportWrapper("group_close_item_create");

/** @type {function(...*):?} */
var _group_close_item_submit = Module["_group_close_item_submit"] = createExportWrapper("group_close_item_submit");

/** @type {function(...*):?} */
var _cmd_complete = Module["_cmd_complete"] = createExportWrapper("cmd_complete");

/** @type {function(...*):?} */
var _cmd_finish = Module["_cmd_finish"] = createExportWrapper("cmd_finish");

/** @type {function(...*):?} */
var _cmd_n_of_cases = Module["_cmd_n_of_cases"] = createExportWrapper("cmd_n_of_cases");

/** @type {function(...*):?} */
var _lex_force_int = Module["_lex_force_int"] = createExportWrapper("lex_force_int");

/** @type {function(...*):?} */
var _lex_integer = Module["_lex_integer"] = createExportWrapper("lex_integer");

/** @type {function(...*):?} */
var _lex_match_id = Module["_lex_match_id"] = createExportWrapper("lex_match_id");

/** @type {function(...*):?} */
var _cmd_execute = Module["_cmd_execute"] = createExportWrapper("cmd_execute");

/** @type {function(...*):?} */
var _cmd_erase = Module["_cmd_erase"] = createExportWrapper("cmd_erase");

/** @type {function(...*):?} */
var _lex_force_match_id = Module["_lex_force_match_id"] = createExportWrapper("lex_force_match_id");

/** @type {function(...*):?} */
var _lex_match = Module["_lex_match"] = createExportWrapper("lex_match");

/** @type {function(...*):?} */
var _lex_force_string = Module["_lex_force_string"] = createExportWrapper("lex_force_string");

/** @type {function(...*):?} */
var _lex_tokcstr = Module["_lex_tokcstr"] = createExportWrapper("lex_tokcstr");

/** @type {function(...*):?} */
var _utf8_to_filename = Module["_utf8_to_filename"] = createExportWrapper("utf8_to_filename");

/** @type {function(...*):?} */
var _remove = Module["_remove"] = createExportWrapper("remove");

/** @type {function(...*):?} */
var _cmd_new_file = Module["_cmd_new_file"] = createExportWrapper("cmd_new_file");

/** @type {function(...*):?} */
var _cmd_close_file_handle = Module["_cmd_close_file_handle"] = createExportWrapper("cmd_close_file_handle");

/** @type {function(...*):?} */
var _cmd_cache = Module["_cmd_cache"] = createExportWrapper("cmd_cache");

/** @type {function(...*):?} */
var _cmd_cd = Module["_cmd_cd"] = createExportWrapper("cmd_cd");

/** @type {function(...*):?} */
var _cmd_do_repeat = Module["_cmd_do_repeat"] = createExportWrapper("cmd_do_repeat");

/** @type {function(...*):?} */
var _cmd_end_repeat = Module["_cmd_end_repeat"] = createExportWrapper("cmd_end_repeat");

/** @type {function(...*):?} */
var _cmd_echo = Module["_cmd_echo"] = createExportWrapper("cmd_echo");

/** @type {function(...*):?} */
var _cmd_file_handle = Module["_cmd_file_handle"] = createExportWrapper("cmd_file_handle");

/** @type {function(...*):?} */
var _cmd_file_label = Module["_cmd_file_label"] = createExportWrapper("cmd_file_label");

/** @type {function(...*):?} */
var _cmd_host = Module["_cmd_host"] = createExportWrapper("cmd_host");

/** @type {function(...*):?} */
var _cmd_include = Module["_cmd_include"] = createExportWrapper("cmd_include");

/** @type {function(...*):?} */
var _cmd_insert = Module["_cmd_insert"] = createExportWrapper("cmd_insert");

/** @type {function(...*):?} */
var _cmd_output = Module["_cmd_output"] = createExportWrapper("cmd_output");

/** @type {function(...*):?} */
var _cmd_permissions = Module["_cmd_permissions"] = createExportWrapper("cmd_permissions");

/** @type {function(...*):?} */
var _cmd_preserve = Module["_cmd_preserve"] = createExportWrapper("cmd_preserve");

/** @type {function(...*):?} */
var _cmd_restore = Module["_cmd_restore"] = createExportWrapper("cmd_restore");

/** @type {function(...*):?} */
var _cmd_set = Module["_cmd_set"] = createExportWrapper("cmd_set");

/** @type {function(...*):?} */
var _cmd_show = Module["_cmd_show"] = createExportWrapper("cmd_show");

/** @type {function(...*):?} */
var _cmd_subtitle = Module["_cmd_subtitle"] = createExportWrapper("cmd_subtitle");

/** @type {function(...*):?} */
var _cmd_sysfile_info = Module["_cmd_sysfile_info"] = createExportWrapper("cmd_sysfile_info");

/** @type {function(...*):?} */
var _cmd_title = Module["_cmd_title"] = createExportWrapper("cmd_title");

/** @type {function(...*):?} */
var _cmd_add_files = Module["_cmd_add_files"] = createExportWrapper("cmd_add_files");

/** @type {function(...*):?} */
var _cmd_data_list = Module["_cmd_data_list"] = createExportWrapper("cmd_data_list");

/** @type {function(...*):?} */
var _cmd_get = Module["_cmd_get"] = createExportWrapper("cmd_get");

/** @type {function(...*):?} */
var _cmd_get_data = Module["_cmd_get_data"] = createExportWrapper("cmd_get_data");

/** @type {function(...*):?} */
var _cmd_import = Module["_cmd_import"] = createExportWrapper("cmd_import");

/** @type {function(...*):?} */
var _cmd_input_program = Module["_cmd_input_program"] = createExportWrapper("cmd_input_program");

/** @type {function(...*):?} */
var _cmd_match_files = Module["_cmd_match_files"] = createExportWrapper("cmd_match_files");

/** @type {function(...*):?} */
var _cmd_matrix = Module["_cmd_matrix"] = createExportWrapper("cmd_matrix");

/** @type {function(...*):?} */
var _cmd_update = Module["_cmd_update"] = createExportWrapper("cmd_update");

/** @type {function(...*):?} */
var _cmd_dataset_activate = Module["_cmd_dataset_activate"] = createExportWrapper("cmd_dataset_activate");

/** @type {function(...*):?} */
var _cmd_dataset_declare = Module["_cmd_dataset_declare"] = createExportWrapper("cmd_dataset_declare");

/** @type {function(...*):?} */
var _cmd_dataset_close = Module["_cmd_dataset_close"] = createExportWrapper("cmd_dataset_close");

/** @type {function(...*):?} */
var _cmd_dataset_copy = Module["_cmd_dataset_copy"] = createExportWrapper("cmd_dataset_copy");

/** @type {function(...*):?} */
var _cmd_dataset_name = Module["_cmd_dataset_name"] = createExportWrapper("cmd_dataset_name");

/** @type {function(...*):?} */
var _cmd_dataset_display = Module["_cmd_dataset_display"] = createExportWrapper("cmd_dataset_display");

/** @type {function(...*):?} */
var _cmd_add_value_labels = Module["_cmd_add_value_labels"] = createExportWrapper("cmd_add_value_labels");

/** @type {function(...*):?} */
var _cmd_add_documents = Module["_cmd_add_documents"] = createExportWrapper("cmd_add_documents");

/** @type {function(...*):?} */
var _cmd_apply_dictionary = Module["_cmd_apply_dictionary"] = createExportWrapper("cmd_apply_dictionary");

/** @type {function(...*):?} */
var _cmd_break = Module["_cmd_break"] = createExportWrapper("cmd_break");

/** @type {function(...*):?} */
var _cmd_compute = Module["_cmd_compute"] = createExportWrapper("cmd_compute");

/** @type {function(...*):?} */
var _cmd_datafile_attribute = Module["_cmd_datafile_attribute"] = createExportWrapper("cmd_datafile_attribute");

/** @type {function(...*):?} */
var _cmd_display = Module["_cmd_display"] = createExportWrapper("cmd_display");

/** @type {function(...*):?} */
var _cmd_document = Module["_cmd_document"] = createExportWrapper("cmd_document");

/** @type {function(...*):?} */
var _cmd_do_if = Module["_cmd_do_if"] = createExportWrapper("cmd_do_if");

/** @type {function(...*):?} */
var _cmd_drop_documents = Module["_cmd_drop_documents"] = createExportWrapper("cmd_drop_documents");

/** @type {function(...*):?} */
var _cmd_else_if = Module["_cmd_else_if"] = createExportWrapper("cmd_else_if");

/** @type {function(...*):?} */
var _cmd_else = Module["_cmd_else"] = createExportWrapper("cmd_else");

/** @type {function(...*):?} */
var _cmd_end_if = Module["_cmd_end_if"] = createExportWrapper("cmd_end_if");

/** @type {function(...*):?} */
var _cmd_end_loop = Module["_cmd_end_loop"] = createExportWrapper("cmd_end_loop");

/** @type {function(...*):?} */
var _cmd_formats = Module["_cmd_formats"] = createExportWrapper("cmd_formats");

/** @type {function(...*):?} */
var _cmd_if = Module["_cmd_if"] = createExportWrapper("cmd_if");

/** @type {function(...*):?} */
var _cmd_leave = Module["_cmd_leave"] = createExportWrapper("cmd_leave");

/** @type {function(...*):?} */
var _cmd_loop = Module["_cmd_loop"] = createExportWrapper("cmd_loop");

/** @type {function(...*):?} */
var _cmd_missing_values = Module["_cmd_missing_values"] = createExportWrapper("cmd_missing_values");

/** @type {function(...*):?} */
var _cmd_mrsets = Module["_cmd_mrsets"] = createExportWrapper("cmd_mrsets");

/** @type {function(...*):?} */
var _cmd_numeric = Module["_cmd_numeric"] = createExportWrapper("cmd_numeric");

/** @type {function(...*):?} */
var _cmd_print_eject = Module["_cmd_print_eject"] = createExportWrapper("cmd_print_eject");

/** @type {function(...*):?} */
var _cmd_print_formats = Module["_cmd_print_formats"] = createExportWrapper("cmd_print_formats");

/** @type {function(...*):?} */
var _cmd_print_space = Module["_cmd_print_space"] = createExportWrapper("cmd_print_space");

/** @type {function(...*):?} */
var _cmd_print = Module["_cmd_print"] = createExportWrapper("cmd_print");

/** @type {function(...*):?} */
var _cmd_recode = Module["_cmd_recode"] = createExportWrapper("cmd_recode");

/** @type {function(...*):?} */
var _cmd_select_if = Module["_cmd_select_if"] = createExportWrapper("cmd_select_if");

/** @type {function(...*):?} */
var _cmd_split_file = Module["_cmd_split_file"] = createExportWrapper("cmd_split_file");

/** @type {function(...*):?} */
var _cmd_string = Module["_cmd_string"] = createExportWrapper("cmd_string");

/** @type {function(...*):?} */
var _cmd_value_labels = Module["_cmd_value_labels"] = createExportWrapper("cmd_value_labels");

/** @type {function(...*):?} */
var _cmd_variable_alignment = Module["_cmd_variable_alignment"] = createExportWrapper("cmd_variable_alignment");

/** @type {function(...*):?} */
var _cmd_variable_attribute = Module["_cmd_variable_attribute"] = createExportWrapper("cmd_variable_attribute");

/** @type {function(...*):?} */
var _cmd_variable_labels = Module["_cmd_variable_labels"] = createExportWrapper("cmd_variable_labels");

/** @type {function(...*):?} */
var _cmd_variable_level = Module["_cmd_variable_level"] = createExportWrapper("cmd_variable_level");

/** @type {function(...*):?} */
var _cmd_variable_role = Module["_cmd_variable_role"] = createExportWrapper("cmd_variable_role");

/** @type {function(...*):?} */
var _cmd_variable_width = Module["_cmd_variable_width"] = createExportWrapper("cmd_variable_width");

/** @type {function(...*):?} */
var _cmd_vector = Module["_cmd_vector"] = createExportWrapper("cmd_vector");

/** @type {function(...*):?} */
var _cmd_weight = Module["_cmd_weight"] = createExportWrapper("cmd_weight");

/** @type {function(...*):?} */
var _cmd_write_formats = Module["_cmd_write_formats"] = createExportWrapper("cmd_write_formats");

/** @type {function(...*):?} */
var _cmd_write = Module["_cmd_write"] = createExportWrapper("cmd_write");

/** @type {function(...*):?} */
var _cmd_xexport = Module["_cmd_xexport"] = createExportWrapper("cmd_xexport");

/** @type {function(...*):?} */
var _cmd_xsave = Module["_cmd_xsave"] = createExportWrapper("cmd_xsave");

/** @type {function(...*):?} */
var _cmd_aggregate = Module["_cmd_aggregate"] = createExportWrapper("cmd_aggregate");

/** @type {function(...*):?} */
var _cmd_autorecode = Module["_cmd_autorecode"] = createExportWrapper("cmd_autorecode");

/** @type {function(...*):?} */
var _cmd_begin_data = Module["_cmd_begin_data"] = createExportWrapper("cmd_begin_data");

/** @type {function(...*):?} */
var _cmd_count = Module["_cmd_count"] = createExportWrapper("cmd_count");

/** @type {function(...*):?} */
var _cmd_crosstabs = Module["_cmd_crosstabs"] = createExportWrapper("cmd_crosstabs");

/** @type {function(...*):?} */
var _cmd_correlation = Module["_cmd_correlation"] = createExportWrapper("cmd_correlation");

/** @type {function(...*):?} */
var _cmd_delete_variables = Module["_cmd_delete_variables"] = createExportWrapper("cmd_delete_variables");

/** @type {function(...*):?} */
var _cmd_descriptives = Module["_cmd_descriptives"] = createExportWrapper("cmd_descriptives");

/** @type {function(...*):?} */
var _cmd_examine = Module["_cmd_examine"] = createExportWrapper("cmd_examine");

/** @type {function(...*):?} */
var _cmd_export = Module["_cmd_export"] = createExportWrapper("cmd_export");

/** @type {function(...*):?} */
var _cmd_factor = Module["_cmd_factor"] = createExportWrapper("cmd_factor");

/** @type {function(...*):?} */
var _cmd_filter = Module["_cmd_filter"] = createExportWrapper("cmd_filter");

/** @type {function(...*):?} */
var _cmd_flip = Module["_cmd_flip"] = createExportWrapper("cmd_flip");

/** @type {function(...*):?} */
var _cmd_frequencies = Module["_cmd_frequencies"] = createExportWrapper("cmd_frequencies");

/** @type {function(...*):?} */
var _cmd_glm = Module["_cmd_glm"] = createExportWrapper("cmd_glm");

/** @type {function(...*):?} */
var _cmd_graph = Module["_cmd_graph"] = createExportWrapper("cmd_graph");

/** @type {function(...*):?} */
var _cmd_list = Module["_cmd_list"] = createExportWrapper("cmd_list");

/** @type {function(...*):?} */
var _cmd_logistic = Module["_cmd_logistic"] = createExportWrapper("cmd_logistic");

/** @type {function(...*):?} */
var _cmd_means = Module["_cmd_means"] = createExportWrapper("cmd_means");

/** @type {function(...*):?} */
var _cmd_modify_vars = Module["_cmd_modify_vars"] = createExportWrapper("cmd_modify_vars");

/** @type {function(...*):?} */
var _cmd_npar_tests = Module["_cmd_npar_tests"] = createExportWrapper("cmd_npar_tests");

/** @type {function(...*):?} */
var _cmd_oneway = Module["_cmd_oneway"] = createExportWrapper("cmd_oneway");

/** @type {function(...*):?} */
var _cmd_quick_cluster = Module["_cmd_quick_cluster"] = createExportWrapper("cmd_quick_cluster");

/** @type {function(...*):?} */
var _cmd_rank = Module["_cmd_rank"] = createExportWrapper("cmd_rank");

/** @type {function(...*):?} */
var _cmd_regression = Module["_cmd_regression"] = createExportWrapper("cmd_regression");

/** @type {function(...*):?} */
var _cmd_reliability = Module["_cmd_reliability"] = createExportWrapper("cmd_reliability");

/** @type {function(...*):?} */
var _cmd_rename_variables = Module["_cmd_rename_variables"] = createExportWrapper("cmd_rename_variables");

/** @type {function(...*):?} */
var _cmd_roc = Module["_cmd_roc"] = createExportWrapper("cmd_roc");

/** @type {function(...*):?} */
var _cmd_sample = Module["_cmd_sample"] = createExportWrapper("cmd_sample");

/** @type {function(...*):?} */
var _cmd_save = Module["_cmd_save"] = createExportWrapper("cmd_save");

/** @type {function(...*):?} */
var _cmd_save_data_collection = Module["_cmd_save_data_collection"] = createExportWrapper("cmd_save_data_collection");

/** @type {function(...*):?} */
var _cmd_save_translate = Module["_cmd_save_translate"] = createExportWrapper("cmd_save_translate");

/** @type {function(...*):?} */
var _cmd_sort_cases = Module["_cmd_sort_cases"] = createExportWrapper("cmd_sort_cases");

/** @type {function(...*):?} */
var _cmd_sort_variables = Module["_cmd_sort_variables"] = createExportWrapper("cmd_sort_variables");

/** @type {function(...*):?} */
var _cmd_t_test = Module["_cmd_t_test"] = createExportWrapper("cmd_t_test");

/** @type {function(...*):?} */
var _cmd_temporary = Module["_cmd_temporary"] = createExportWrapper("cmd_temporary");

/** @type {function(...*):?} */
var _cmd_use = Module["_cmd_use"] = createExportWrapper("cmd_use");

/** @type {function(...*):?} */
var _cmd_end_case = Module["_cmd_end_case"] = createExportWrapper("cmd_end_case");

/** @type {function(...*):?} */
var _cmd_end_file = Module["_cmd_end_file"] = createExportWrapper("cmd_end_file");

/** @type {function(...*):?} */
var _cmd_end_input_program = Module["_cmd_end_input_program"] = createExportWrapper("cmd_end_input_program");

/** @type {function(...*):?} */
var _cmd_reread = Module["_cmd_reread"] = createExportWrapper("cmd_reread");

/** @type {function(...*):?} */
var _cmd_debug_evaluate = Module["_cmd_debug_evaluate"] = createExportWrapper("cmd_debug_evaluate");

/** @type {function(...*):?} */
var _cmd_debug_format_guesser = Module["_cmd_debug_format_guesser"] = createExportWrapper("cmd_debug_format_guesser");

/** @type {function(...*):?} */
var _cmd_debug_moments = Module["_cmd_debug_moments"] = createExportWrapper("cmd_debug_moments");

/** @type {function(...*):?} */
var _cmd_debug_paper_size = Module["_cmd_debug_paper_size"] = createExportWrapper("cmd_debug_paper_size");

/** @type {function(...*):?} */
var _cmd_debug_pool = Module["_cmd_debug_pool"] = createExportWrapper("cmd_debug_pool");

/** @type {function(...*):?} */
var _cmd_debug_float_format = Module["_cmd_debug_float_format"] = createExportWrapper("cmd_debug_float_format");

/** @type {function(...*):?} */
var _cmd_debug_xform_fail = Module["_cmd_debug_xform_fail"] = createExportWrapper("cmd_debug_xform_fail");

/** @type {function(...*):?} */
var _expr_evaluate_num = Module["_expr_evaluate_num"] = createExportWrapper("expr_evaluate_num");

/** @type {function(...*):?} */
var _pool_clear = Module["_pool_clear"] = createExportWrapper("pool_clear");

/** @type {function(...*):?} */
var _copy_string = Module["_copy_string"] = createExportWrapper("copy_string");

/** @type {function(...*):?} */
var _compare_string_3way = Module["_compare_string_3way"] = createExportWrapper("compare_string_3way");

/** @type {function(...*):?} */
var _cdf_bvnor = Module["_cdf_bvnor"] = createExportWrapper("cdf_bvnor");

/** @type {function(...*):?} */
var _count_valid = Module["_count_valid"] = createExportWrapper("count_valid");

/** @type {function(...*):?} */
var _moments_of_doubles = Module["_moments_of_doubles"] = createExportWrapper("moments_of_doubles");

/** @type {function(...*):?} */
var _alloc_string = Module["_alloc_string"] = createExportWrapper("alloc_string");

/** @type {function(...*):?} */
var _expr_ymd_to_date = Module["_expr_ymd_to_date"] = createExportWrapper("expr_ymd_to_date");

/** @type {function(...*):?} */
var _expr_wkyr_to_date = Module["_expr_wkyr_to_date"] = createExportWrapper("expr_wkyr_to_date");

/** @type {function(...*):?} */
var _expr_yrday_to_date = Module["_expr_yrday_to_date"] = createExportWrapper("expr_yrday_to_date");

/** @type {function(...*):?} */
var _expr_date_difference = Module["_expr_date_difference"] = createExportWrapper("expr_date_difference");

/** @type {function(...*):?} */
var _expr_date_sum = Module["_expr_date_sum"] = createExportWrapper("expr_date_sum");

/** @type {function(...*):?} */
var _tan = Module["_tan"] = createExportWrapper("tan");

/** @type {function(...*):?} */
var _idf_fdist = Module["_idf_fdist"] = createExportWrapper("idf_fdist");

/** @type {function(...*):?} */
var _log10 = Module["_log10"] = createExportWrapper("log10");

/** @type {function(...*):?} */
var _median = Module["_median"] = createExportWrapper("median");

/** @type {function(...*):?} */
var _ncdf_beta = Module["_ncdf_beta"] = createExportWrapper("ncdf_beta");

/** @type {function(...*):?} */
var _get_rng = Module["_get_rng"] = createExportWrapper("get_rng");

/** @type {function(...*):?} */
var _npdf_beta = Module["_npdf_beta"] = createExportWrapper("npdf_beta");

/** @type {function(...*):?} */
var _replace_string = Module["_replace_string"] = createExportWrapper("replace_string");

/** @type {function(...*):?} */
var _round_nearest = Module["_round_nearest"] = createExportWrapper("round_nearest");

/** @type {function(...*):?} */
var _round_zero = Module["_round_zero"] = createExportWrapper("round_zero");

/** @type {function(...*):?} */
var _expr_yrmoda = Module["_expr_yrmoda"] = createExportWrapper("expr_yrmoda");

/** @type {function(...*):?} */
var _expr_evaluate_str = Module["_expr_evaluate_str"] = createExportWrapper("expr_evaluate_str");

/** @type {function(...*):?} */
var _lex_force_id = Module["_lex_force_id"] = createExportWrapper("lex_force_id");

/** @type {function(...*):?} */
var _lex_force_match = Module["_lex_force_match"] = createExportWrapper("lex_force_match");

/** @type {function(...*):?} */
var _lex_is_number = Module["_lex_is_number"] = createExportWrapper("lex_is_number");

/** @type {function(...*):?} */
var _lex_is_string = Module["_lex_is_string"] = createExportWrapper("lex_is_string");

/** @type {function(...*):?} */
var _lex_tokss = Module["_lex_tokss"] = createExportWrapper("lex_tokss");

/** @type {function(...*):?} */
var _parse_value = Module["_parse_value"] = createExportWrapper("parse_value");

/** @type {function(...*):?} */
var _expr_parse_any = Module["_expr_parse_any"] = createExportWrapper("expr_parse_any");

/** @type {function(...*):?} */
var _expr_free = Module["_expr_free"] = createExportWrapper("expr_free");

/** @type {function(...*):?} */
var _expr_debug_print_postfix = Module["_expr_debug_print_postfix"] = createExportWrapper("expr_debug_print_postfix");

/** @type {function(...*):?} */
var _putchar = Module["_putchar"] = createExportWrapper("putchar");

/** @type {function(...*):?} */
var ___small_printf = Module["___small_printf"] = createExportWrapper("__small_printf");

/** @type {function(...*):?} */
var _putc = Module["_putc"] = createExportWrapper("putc");

/** @type {function(...*):?} */
var _expr_ymd_to_ofs = Module["_expr_ymd_to_ofs"] = createExportWrapper("expr_ymd_to_ofs");

/** @type {function(...*):?} */
var _expr_optimize = Module["_expr_optimize"] = createExportWrapper("expr_optimize");

/** @type {function(...*):?} */
var _expr_allocate_number = Module["_expr_allocate_number"] = createExportWrapper("expr_allocate_number");

/** @type {function(...*):?} */
var _expr_allocate_boolean = Module["_expr_allocate_boolean"] = createExportWrapper("expr_allocate_boolean");

/** @type {function(...*):?} */
var _expr_allocate_unary = Module["_expr_allocate_unary"] = createExportWrapper("expr_allocate_unary");

/** @type {function(...*):?} */
var _expr_allocate_string = Module["_expr_allocate_string"] = createExportWrapper("expr_allocate_string");

/** @type {function(...*):?} */
var _expr_flatten = Module["_expr_flatten"] = createExportWrapper("expr_flatten");

/** @type {function(...*):?} */
var _expr_node_returns = Module["_expr_node_returns"] = createExportWrapper("expr_node_returns");

/** @type {function(...*):?} */
var _pool_clone = Module["_pool_clone"] = createExportWrapper("pool_clone");

/** @type {function(...*):?} */
var _expr_parse = Module["_expr_parse"] = createExportWrapper("expr_parse");

/** @type {function(...*):?} */
var _pool_create_subpool = Module["_pool_create_subpool"] = createExportWrapper("pool_create_subpool");

/** @type {function(...*):?} */
var _expr_allocate_composite = Module["_expr_allocate_composite"] = createExportWrapper("expr_allocate_composite");

/** @type {function(...*):?} */
var _expr_parse_pool = Module["_expr_parse_pool"] = createExportWrapper("expr_parse_pool");

/** @type {function(...*):?} */
var _pool_add_subpool = Module["_pool_add_subpool"] = createExportWrapper("pool_add_subpool");

/** @type {function(...*):?} */
var _expr_allocate_nullary = Module["_expr_allocate_nullary"] = createExportWrapper("expr_allocate_nullary");

/** @type {function(...*):?} */
var _expr_allocate_binary = Module["_expr_allocate_binary"] = createExportWrapper("expr_allocate_binary");

/** @type {function(...*):?} */
var _expr_allocate_integer = Module["_expr_allocate_integer"] = createExportWrapper("expr_allocate_integer");

/** @type {function(...*):?} */
var _expr_allocate_pos_int = Module["_expr_allocate_pos_int"] = createExportWrapper("expr_allocate_pos_int");

/** @type {function(...*):?} */
var _expr_allocate_vector = Module["_expr_allocate_vector"] = createExportWrapper("expr_allocate_vector");

/** @type {function(...*):?} */
var _expr_allocate_variable = Module["_expr_allocate_variable"] = createExportWrapper("expr_allocate_variable");

/** @type {function(...*):?} */
var _expr_allocate_format = Module["_expr_allocate_format"] = createExportWrapper("expr_allocate_format");

/** @type {function(...*):?} */
var _expr_get_function = Module["_expr_get_function"] = createExportWrapper("expr_get_function");

/** @type {function(...*):?} */
var _expr_get_function_cnt = Module["_expr_get_function_cnt"] = createExportWrapper("expr_get_function_cnt");

/** @type {function(...*):?} */
var _expr_operation_get_name = Module["_expr_operation_get_name"] = createExportWrapper("expr_operation_get_name");

/** @type {function(...*):?} */
var _expr_operation_get_prototype = Module["_expr_operation_get_prototype"] = createExportWrapper("expr_operation_get_prototype");

/** @type {function(...*):?} */
var _expr_operation_get_arg_cnt = Module["_expr_operation_get_arg_cnt"] = createExportWrapper("expr_operation_get_arg_cnt");

/** @type {function(...*):?} */
var _lex_tokval = Module["_lex_tokval"] = createExportWrapper("lex_tokval");

/** @type {function(...*):?} */
var _ds_init_substring = Module["_ds_init_substring"] = createExportWrapper("ds_init_substring");

/** @type {function(...*):?} */
var _buf_compare_case = Module["_buf_compare_case"] = createExportWrapper("buf_compare_case");

/** @type {function(...*):?} */
var _ss_alloc_substring = Module["_ss_alloc_substring"] = createExportWrapper("ss_alloc_substring");

/** @type {function(...*):?} */
var _parse_variable = Module["_parse_variable"] = createExportWrapper("parse_variable");

/** @type {function(...*):?} */
var _parse_format_specifier = Module["_parse_format_specifier"] = createExportWrapper("parse_format_specifier");

/** @type {function(...*):?} */
var _parse_variables = Module["_parse_variables"] = createExportWrapper("parse_variables");

/** @type {function(...*):?} */
var _lex_error_expecting = Module["_lex_error_expecting"] = createExportWrapper("lex_error_expecting");

/** @type {function(...*):?} */
var _fh_parse = Module["_fh_parse"] = createExportWrapper("fh_parse");

/** @type {function(...*):?} */
var _lex_match_phrase = Module["_lex_match_phrase"] = createExportWrapper("lex_match_phrase");

/** @type {function(...*):?} */
var _parse_num_range = Module["_parse_num_range"] = createExportWrapper("parse_num_range");

/** @type {function(...*):?} */
var _lex_sbc_only_once = Module["_lex_sbc_only_once"] = createExportWrapper("lex_sbc_only_once");

/** @type {function(...*):?} */
var _reverse_array = Module["_reverse_array"] = createExportWrapper("reverse_array");

/** @type {function(...*):?} */
var _parse_DATA_LIST_vars = Module["_parse_DATA_LIST_vars"] = createExportWrapper("parse_DATA_LIST_vars");

/** @type {function(...*):?} */
var _set_difference = Module["_set_difference"] = createExportWrapper("set_difference");

/** @type {function(...*):?} */
var _adjacent_find_equal = Module["_adjacent_find_equal"] = createExportWrapper("adjacent_find_equal");

/** @type {function(...*):?} */
var _pivot_table_create = Module["_pivot_table_create"] = createExportWrapper("pivot_table_create");

/** @type {function(...*):?} */
var _pivot_dimension_create = Module["_pivot_dimension_create"] = createExportWrapper("pivot_dimension_create");

/** @type {function(...*):?} */
var _stringi_set_get_sorted_array = Module["_stringi_set_get_sorted_array"] = createExportWrapper("stringi_set_get_sorted_array");

/** @type {function(...*):?} */
var _pivot_value_new_user_text = Module["_pivot_value_new_user_text"] = createExportWrapper("pivot_value_new_user_text");

/** @type {function(...*):?} */
var _pivot_category_create_leaf = Module["_pivot_category_create_leaf"] = createExportWrapper("pivot_category_create_leaf");

/** @type {function(...*):?} */
var _pivot_table_put2 = Module["_pivot_table_put2"] = createExportWrapper("pivot_table_put2");

/** @type {function(...*):?} */
var _pivot_value_new_text = Module["_pivot_value_new_text"] = createExportWrapper("pivot_value_new_text");

/** @type {function(...*):?} */
var _pivot_value_new_value = Module["_pivot_value_new_value"] = createExportWrapper("pivot_value_new_value");

/** @type {function(...*):?} */
var _ds_chomp_byte = Module["_ds_chomp_byte"] = createExportWrapper("ds_chomp_byte");

/** @type {function(...*):?} */
var _pivot_value_new_user_text_nocopy = Module["_pivot_value_new_user_text_nocopy"] = createExportWrapper("pivot_value_new_user_text_nocopy");

/** @type {function(...*):?} */
var _pivot_table_submit = Module["_pivot_table_submit"] = createExportWrapper("pivot_table_submit");

/** @type {function(...*):?} */
var _lex_is_integer = Module["_lex_is_integer"] = createExportWrapper("lex_is_integer");

/** @type {function(...*):?} */
var _lex_spec_missing = Module["_lex_spec_missing"] = createExportWrapper("lex_spec_missing");

/** @type {function(...*):?} */
var _stringi_map_init = Module["_stringi_map_init"] = createExportWrapper("stringi_map_init");

/** @type {function(...*):?} */
var _stringi_map_find = Module["_stringi_map_find"] = createExportWrapper("stringi_map_find");

/** @type {function(...*):?} */
var _stringi_map_insert = Module["_stringi_map_insert"] = createExportWrapper("stringi_map_insert");

/** @type {function(...*):?} */
var _stringi_map_destroy = Module["_stringi_map_destroy"] = createExportWrapper("stringi_map_destroy");

/** @type {function(...*):?} */
var _utf8_strverscasecmp = Module["_utf8_strverscasecmp"] = createExportWrapper("utf8_strverscasecmp");

/** @type {function(...*):?} */
var _output_split_file_values = Module["_output_split_file_values"] = createExportWrapper("output_split_file_values");

/** @type {function(...*):?} */
var _pivot_value_new_variable = Module["_pivot_value_new_variable"] = createExportWrapper("pivot_value_new_variable");

/** @type {function(...*):?} */
var _pivot_value_new_var_value = Module["_pivot_value_new_var_value"] = createExportWrapper("pivot_value_new_var_value");

/** @type {function(...*):?} */
var _lex_sbc_missing = Module["_lex_sbc_missing"] = createExportWrapper("lex_sbc_missing");

/** @type {function(...*):?} */
var _recode_pedantically = Module["_recode_pedantically"] = createExportWrapper("recode_pedantically");

/** @type {function(...*):?} */
var _pivot_value_new_text_format = Module["_pivot_value_new_text_format"] = createExportWrapper("pivot_value_new_text_format");

/** @type {function(...*):?} */
var _pivot_table_create__ = Module["_pivot_table_create__"] = createExportWrapper("pivot_table_create__");

/** @type {function(...*):?} */
var _pivot_dimension_create__ = Module["_pivot_dimension_create__"] = createExportWrapper("pivot_dimension_create__");

/** @type {function(...*):?} */
var _ds_chomp = Module["_ds_chomp"] = createExportWrapper("ds_chomp");

/** @type {function(...*):?} */
var _pivot_value_new_integer = Module["_pivot_value_new_integer"] = createExportWrapper("pivot_value_new_integer");

/** @type {function(...*):?} */
var _pivot_table_put1 = Module["_pivot_table_put1"] = createExportWrapper("pivot_table_put1");

/** @type {function(...*):?} */
var _pivot_table_put3 = Module["_pivot_table_put3"] = createExportWrapper("pivot_table_put3");

/** @type {function(...*):?} */
var _pivot_table_create_footnote = Module["_pivot_table_create_footnote"] = createExportWrapper("pivot_table_create_footnote");

/** @type {function(...*):?} */
var _pivot_category_create_group__ = Module["_pivot_category_create_group__"] = createExportWrapper("pivot_category_create_group__");

/** @type {function(...*):?} */
var _pivot_value_add_footnote = Module["_pivot_value_add_footnote"] = createExportWrapper("pivot_value_add_footnote");

/** @type {function(...*):?} */
var _pivot_table_is_empty = Module["_pivot_table_is_empty"] = createExportWrapper("pivot_table_is_empty");

/** @type {function(...*):?} */
var _pivot_table_unref = Module["_pivot_table_unref"] = createExportWrapper("pivot_table_unref");

/** @type {function(...*):?} */
var _pivot_value_destroy = Module["_pivot_value_destroy"] = createExportWrapper("pivot_value_destroy");

/** @type {function(...*):?} */
var _parse_variables_pool = Module["_parse_variables_pool"] = createExportWrapper("parse_variables_pool");

/** @type {function(...*):?} */
var _parse_dict_rename = Module["_parse_dict_rename"] = createExportWrapper("parse_dict_rename");

/** @type {function(...*):?} */
var _parse_sort_criteria = Module["_parse_sort_criteria"] = createExportWrapper("parse_sort_criteria");

/** @type {function(...*):?} */
var _parse_dict_drop = Module["_parse_dict_drop"] = createExportWrapper("parse_dict_drop");

/** @type {function(...*):?} */
var _parse_dict_keep = Module["_parse_dict_keep"] = createExportWrapper("parse_dict_keep");

/** @type {function(...*):?} */
var _sort_execute = Module["_sort_execute"] = createExportWrapper("sort_execute");

/** @type {function(...*):?} */
var _in_input_program = Module["_in_input_program"] = createExportWrapper("in_input_program");

/** @type {function(...*):?} */
var _data_parser_create = Module["_data_parser_create"] = createExportWrapper("data_parser_create");

/** @type {function(...*):?} */
var _data_parser_set_records = Module["_data_parser_set_records"] = createExportWrapper("data_parser_set_records");

/** @type {function(...*):?} */
var _data_parser_set_skip = Module["_data_parser_set_skip"] = createExportWrapper("data_parser_set_skip");

/** @type {function(...*):?} */
var _data_parser_set_type = Module["_data_parser_set_type"] = createExportWrapper("data_parser_set_type");

/** @type {function(...*):?} */
var _data_parser_set_span = Module["_data_parser_set_span"] = createExportWrapper("data_parser_set_span");

/** @type {function(...*):?} */
var _data_parser_get_type = Module["_data_parser_get_type"] = createExportWrapper("data_parser_get_type");

/** @type {function(...*):?} */
var _data_parser_set_empty_line_has_field = Module["_data_parser_set_empty_line_has_field"] = createExportWrapper("data_parser_set_empty_line_has_field");

/** @type {function(...*):?} */
var _data_parser_set_quotes = Module["_data_parser_set_quotes"] = createExportWrapper("data_parser_set_quotes");

/** @type {function(...*):?} */
var _data_parser_set_soft_delimiters = Module["_data_parser_set_soft_delimiters"] = createExportWrapper("data_parser_set_soft_delimiters");

/** @type {function(...*):?} */
var _data_parser_set_hard_delimiters = Module["_data_parser_set_hard_delimiters"] = createExportWrapper("data_parser_set_hard_delimiters");

/** @type {function(...*):?} */
var _data_parser_get_records = Module["_data_parser_get_records"] = createExportWrapper("data_parser_get_records");

/** @type {function(...*):?} */
var _parse_record_placement = Module["_parse_record_placement"] = createExportWrapper("parse_record_placement");

/** @type {function(...*):?} */
var _parse_DATA_LIST_vars_pool = Module["_parse_DATA_LIST_vars_pool"] = createExportWrapper("parse_DATA_LIST_vars_pool");

/** @type {function(...*):?} */
var _parse_var_placements = Module["_parse_var_placements"] = createExportWrapper("parse_var_placements");

/** @type {function(...*):?} */
var _execute_placement_format = Module["_execute_placement_format"] = createExportWrapper("execute_placement_format");

/** @type {function(...*):?} */
var _data_parser_add_fixed_field = Module["_data_parser_add_fixed_field"] = createExportWrapper("data_parser_add_fixed_field");

/** @type {function(...*):?} */
var _parse_abstract_format_specifier = Module["_parse_abstract_format_specifier"] = createExportWrapper("parse_abstract_format_specifier");

/** @type {function(...*):?} */
var _data_parser_add_delimited_field = Module["_data_parser_add_delimited_field"] = createExportWrapper("data_parser_add_delimited_field");

/** @type {function(...*):?} */
var _data_parser_any_fields = Module["_data_parser_any_fields"] = createExportWrapper("data_parser_any_fields");

/** @type {function(...*):?} */
var _data_parser_get_span = Module["_data_parser_get_span"] = createExportWrapper("data_parser_get_span");

/** @type {function(...*):?} */
var _data_parser_output_description = Module["_data_parser_output_description"] = createExportWrapper("data_parser_output_description");

/** @type {function(...*):?} */
var _dfm_open_reader = Module["_dfm_open_reader"] = createExportWrapper("dfm_open_reader");

/** @type {function(...*):?} */
var _data_parser_make_active_file = Module["_data_parser_make_active_file"] = createExportWrapper("data_parser_make_active_file");

/** @type {function(...*):?} */
var _data_parser_destroy = Module["_data_parser_destroy"] = createExportWrapper("data_parser_destroy");

/** @type {function(...*):?} */
var _data_parser_parse = Module["_data_parser_parse"] = createExportWrapper("data_parser_parse");

/** @type {function(...*):?} */
var _dfm_reader_error = Module["_dfm_reader_error"] = createExportWrapper("dfm_reader_error");

/** @type {function(...*):?} */
var _dfm_eof = Module["_dfm_eof"] = createExportWrapper("dfm_eof");

/** @type {function(...*):?} */
var _dfm_close_reader = Module["_dfm_close_reader"] = createExportWrapper("dfm_close_reader");

/** @type {function(...*):?} */
var _ds_assign_substring = Module["_ds_assign_substring"] = createExportWrapper("ds_assign_substring");

/** @type {function(...*):?} */
var _data_parser_set_warn_missing_fields = Module["_data_parser_set_warn_missing_fields"] = createExportWrapper("data_parser_set_warn_missing_fields");

/** @type {function(...*):?} */
var _data_parser_set_quote_escape = Module["_data_parser_set_quote_escape"] = createExportWrapper("data_parser_set_quote_escape");

/** @type {function(...*):?} */
var _dfm_forward_record = Module["_dfm_forward_record"] = createExportWrapper("dfm_forward_record");

/** @type {function(...*):?} */
var _dfm_reader_get_encoding = Module["_dfm_reader_get_encoding"] = createExportWrapper("dfm_reader_get_encoding");

/** @type {function(...*):?} */
var _dfm_get_file_name = Module["_dfm_get_file_name"] = createExportWrapper("dfm_get_file_name");

/** @type {function(...*):?} */
var _dfm_get_line_number = Module["_dfm_get_line_number"] = createExportWrapper("dfm_get_line_number");

/** @type {function(...*):?} */
var _dfm_get_record = Module["_dfm_get_record"] = createExportWrapper("dfm_get_record");

/** @type {function(...*):?} */
var _dfm_expand_tabs = Module["_dfm_expand_tabs"] = createExportWrapper("dfm_expand_tabs");

/** @type {function(...*):?} */
var _dfm_columns_past_end = Module["_dfm_columns_past_end"] = createExportWrapper("dfm_columns_past_end");

/** @type {function(...*):?} */
var _dfm_column_start = Module["_dfm_column_start"] = createExportWrapper("dfm_column_start");

/** @type {function(...*):?} */
var _dfm_forward_columns = Module["_dfm_forward_columns"] = createExportWrapper("dfm_forward_columns");

/** @type {function(...*):?} */
var _ss_get_until = Module["_ss_get_until"] = createExportWrapper("ss_get_until");

/** @type {function(...*):?} */
var _ss_cspan = Module["_ss_cspan"] = createExportWrapper("ss_cspan");

/** @type {function(...*):?} */
var _line_reader_free = Module["_line_reader_free"] = createExportWrapper("line_reader_free");

/** @type {function(...*):?} */
var _dfm_reread_record = Module["_dfm_reread_record"] = createExportWrapper("dfm_reread_record");

/** @type {function(...*):?} */
var _ds_clear = Module["_ds_clear"] = createExportWrapper("ds_clear");

/** @type {function(...*):?} */
var _line_reader_is_auto = Module["_line_reader_is_auto"] = createExportWrapper("line_reader_is_auto");

/** @type {function(...*):?} */
var _line_reader_read = Module["_line_reader_read"] = createExportWrapper("line_reader_read");

/** @type {function(...*):?} */
var _line_reader_get_encoding = Module["_line_reader_get_encoding"] = createExportWrapper("line_reader_get_encoding");

/** @type {function(...*):?} */
var _line_reader_error = Module["_line_reader_error"] = createExportWrapper("line_reader_error");

/** @type {function(...*):?} */
var _ds_read_stream = Module["_ds_read_stream"] = createExportWrapper("ds_read_stream");

/** @type {function(...*):?} */
var _integer_convert = Module["_integer_convert"] = createExportWrapper("integer_convert");

/** @type {function(...*):?} */
var _line_reader_for_fd = Module["_line_reader_for_fd"] = createExportWrapper("line_reader_for_fd");

/** @type {function(...*):?} */
var _encoding_guess_parse_encoding = Module["_encoding_guess_parse_encoding"] = createExportWrapper("encoding_guess_parse_encoding");

/** @type {function(...*):?} */
var _ds_substr = Module["_ds_substr"] = createExportWrapper("ds_substr");

/** @type {function(...*):?} */
var _ds_find_byte = Module["_ds_find_byte"] = createExportWrapper("ds_find_byte");

/** @type {function(...*):?} */
var _ds_swap = Module["_ds_swap"] = createExportWrapper("ds_swap");

/** @type {function(...*):?} */
var _dfm_get_column = Module["_dfm_get_column"] = createExportWrapper("dfm_get_column");

/** @type {function(...*):?} */
var _ds_pointer_to_position = Module["_ds_pointer_to_position"] = createExportWrapper("ds_pointer_to_position");

/** @type {function(...*):?} */
var _dfm_open_writer = Module["_dfm_open_writer"] = createExportWrapper("dfm_open_writer");

/** @type {function(...*):?} */
var _dfm_close_writer = Module["_dfm_close_writer"] = createExportWrapper("dfm_close_writer");

/** @type {function(...*):?} */
var _dfm_write_error = Module["_dfm_write_error"] = createExportWrapper("dfm_write_error");

/** @type {function(...*):?} */
var _dfm_put_record = Module["_dfm_put_record"] = createExportWrapper("dfm_put_record");

/** @type {function(...*):?} */
var _dfm_writer_get_encoding = Module["_dfm_writer_get_encoding"] = createExportWrapper("dfm_writer_get_encoding");

/** @type {function(...*):?} */
var _lex_match_int = Module["_lex_match_int"] = createExportWrapper("lex_match_int");

/** @type {function(...*):?} */
var _lex_get_encoding = Module["_lex_get_encoding"] = createExportWrapper("lex_get_encoding");

/** @type {function(...*):?} */
var _lex_match_id_n = Module["_lex_match_id_n"] = createExportWrapper("lex_match_id_n");

/** @type {function(...*):?} */
var _parse_column_range = Module["_parse_column_range"] = createExportWrapper("parse_column_range");

/** @type {function(...*):?} */
var _parse_dict_trim = Module["_parse_dict_trim"] = createExportWrapper("parse_dict_trim");

/** @type {function(...*):?} */
var _parse_mixed_vars = Module["_parse_mixed_vars"] = createExportWrapper("parse_mixed_vars");

/** @type {function(...*):?} */
var _create_matrix_reader_from_case_reader = Module["_create_matrix_reader_from_case_reader"] = createExportWrapper("create_matrix_reader_from_case_reader");

/** @type {function(...*):?} */
var _destroy_matrix_reader = Module["_destroy_matrix_reader"] = createExportWrapper("destroy_matrix_reader");

/** @type {function(...*):?} */
var _next_matrix_from_reader = Module["_next_matrix_from_reader"] = createExportWrapper("next_matrix_from_reader");

/** @type {function(...*):?} */
var _parse_format_specifier_name = Module["_parse_format_specifier_name"] = createExportWrapper("parse_format_specifier_name");

/** @type {function(...*):?} */
var _parse_column = Module["_parse_column"] = createExportWrapper("parse_column");

/** @type {function(...*):?} */
var _lex_number = Module["_lex_number"] = createExportWrapper("lex_number");

/** @type {function(...*):?} */
var _text_item_create = Module["_text_item_create"] = createExportWrapper("text_item_create");

/** @type {function(...*):?} */
var _text_item_submit = Module["_text_item_submit"] = createExportWrapper("text_item_submit");

/** @type {function(...*):?} */
var _pool_create_at_offset = Module["_pool_create_at_offset"] = createExportWrapper("pool_create_at_offset");

/** @type {function(...*):?} */
var _ds_register_pool = Module["_ds_register_pool"] = createExportWrapper("ds_register_pool");

/** @type {function(...*):?} */
var _ds_set_length = Module["_ds_set_length"] = createExportWrapper("ds_set_length");

/** @type {function(...*):?} */
var _recode_byte = Module["_recode_byte"] = createExportWrapper("recode_byte");

/** @type {function(...*):?} */
var _ds_tail = Module["_ds_tail"] = createExportWrapper("ds_tail");

/** @type {function(...*):?} */
var _u8_line_init = Module["_u8_line_init"] = createExportWrapper("u8_line_init");

/** @type {function(...*):?} */
var _u8_line_set_length = Module["_u8_line_set_length"] = createExportWrapper("u8_line_set_length");

/** @type {function(...*):?} */
var _u8_line_put = Module["_u8_line_put"] = createExportWrapper("u8_line_put");

/** @type {function(...*):?} */
var _u8_line_reserve = Module["_u8_line_reserve"] = createExportWrapper("u8_line_reserve");

/** @type {function(...*):?} */
var _u8_line_destroy = Module["_u8_line_destroy"] = createExportWrapper("u8_line_destroy");

/** @type {function(...*):?} */
var _table_output_text = Module["_table_output_text"] = createExportWrapper("table_output_text");

/** @type {function(...*):?} */
var _is_encoding_utf8 = Module["_is_encoding_utf8"] = createExportWrapper("is_encoding_utf8");

/** @type {function(...*):?} */
var _intlog10 = Module["_intlog10"] = createExportWrapper("intlog10");

/** @type {function(...*):?} */
var _ctl_stack_clear = Module["_ctl_stack_clear"] = createExportWrapper("ctl_stack_clear");

/** @type {function(...*):?} */
var _ctl_stack_pop = Module["_ctl_stack_pop"] = createExportWrapper("ctl_stack_pop");

/** @type {function(...*):?} */
var _ctl_stack_push = Module["_ctl_stack_push"] = createExportWrapper("ctl_stack_push");

/** @type {function(...*):?} */
var _ctl_stack_top = Module["_ctl_stack_top"] = createExportWrapper("ctl_stack_top");

/** @type {function(...*):?} */
var _ctl_stack_search = Module["_ctl_stack_search"] = createExportWrapper("ctl_stack_search");

/** @type {function(...*):?} */
var _ctl_stack_is_empty = Module["_ctl_stack_is_empty"] = createExportWrapper("ctl_stack_is_empty");

/** @type {function(...*):?} */
var _utf8_hash_case_bytes = Module["_utf8_hash_case_bytes"] = createExportWrapper("utf8_hash_case_bytes");

/** @type {function(...*):?} */
var _utf8_strncasecmp = Module["_utf8_strncasecmp"] = createExportWrapper("utf8_strncasecmp");

/** @type {function(...*):?} */
var _lex_force_num = Module["_lex_force_num"] = createExportWrapper("lex_force_num");

/** @type {function(...*):?} */
var _lex_next = Module["_lex_next"] = createExportWrapper("lex_next");

/** @type {function(...*):?} */
var _token_to_string = Module["_token_to_string"] = createExportWrapper("token_to_string");

/** @type {function(...*):?} */
var _lex_get_syntax_mode = Module["_lex_get_syntax_mode"] = createExportWrapper("lex_get_syntax_mode");

/** @type {function(...*):?} */
var _lex_reader_for_substring_nocopy = Module["_lex_reader_for_substring_nocopy"] = createExportWrapper("lex_reader_for_substring_nocopy");

/** @type {function(...*):?} */
var _lex_reader_set_file_name = Module["_lex_reader_set_file_name"] = createExportWrapper("lex_reader_set_file_name");

/** @type {function(...*):?} */
var _lex_include = Module["_lex_include"] = createExportWrapper("lex_include");

/** @type {function(...*):?} */
var _segmenter_init = Module["_segmenter_init"] = createExportWrapper("segmenter_init");

/** @type {function(...*):?} */
var _segmenter_push = Module["_segmenter_push"] = createExportWrapper("segmenter_push");

/** @type {function(...*):?} */
var _str_compare_rpad = Module["_str_compare_rpad"] = createExportWrapper("str_compare_rpad");

/** @type {function(...*):?} */
var _sort_create_writer = Module["_sort_create_writer"] = createExportWrapper("sort_create_writer");

/** @type {function(...*):?} */
var _moments1_create = Module["_moments1_create"] = createExportWrapper("moments1_create");

/** @type {function(...*):?} */
var _moments1_clear = Module["_moments1_clear"] = createExportWrapper("moments1_clear");

/** @type {function(...*):?} */
var _moments1_add = Module["_moments1_add"] = createExportWrapper("moments1_add");

/** @type {function(...*):?} */
var _percentile_create = Module["_percentile_create"] = createExportWrapper("percentile_create");

/** @type {function(...*):?} */
var _order_stats_accumulate = Module["_order_stats_accumulate"] = createExportWrapper("order_stats_accumulate");

/** @type {function(...*):?} */
var _percentile_calculate = Module["_percentile_calculate"] = createExportWrapper("percentile_calculate");

/** @type {function(...*):?} */
var _moments1_calculate = Module["_moments1_calculate"] = createExportWrapper("moments1_calculate");

/** @type {function(...*):?} */
var _moments1_destroy = Module["_moments1_destroy"] = createExportWrapper("moments1_destroy");

/** @type {function(...*):?} */
var _binomial_execute = Module["_binomial_execute"] = createExportWrapper("binomial_execute");

/** @type {function(...*):?} */
var _pivot_table_set_weight_var = Module["_pivot_table_set_weight_var"] = createExportWrapper("pivot_table_set_weight_var");

/** @type {function(...*):?} */
var _pivot_value_new_number = Module["_pivot_value_new_number"] = createExportWrapper("pivot_value_new_number");

/** @type {function(...*):?} */
var _chisquare_execute = Module["_chisquare_execute"] = createExportWrapper("chisquare_execute");

/** @type {function(...*):?} */
var _freq_hmap_search = Module["_freq_hmap_search"] = createExportWrapper("freq_hmap_search");

/** @type {function(...*):?} */
var _freq_hmap_insert = Module["_freq_hmap_insert"] = createExportWrapper("freq_hmap_insert");

/** @type {function(...*):?} */
var _freq_hmap_destroy = Module["_freq_hmap_destroy"] = createExportWrapper("freq_hmap_destroy");

/** @type {function(...*):?} */
var _freq_hmap_sort = Module["_freq_hmap_sort"] = createExportWrapper("freq_hmap_sort");

/** @type {function(...*):?} */
var _pivot_category_create_leaves = Module["_pivot_category_create_leaves"] = createExportWrapper("pivot_category_create_leaves");

/** @type {function(...*):?} */
var _cochran_execute = Module["_cochran_execute"] = createExportWrapper("cochran_execute");

/** @type {function(...*):?} */
var _pivot_table_set_weight_format = Module["_pivot_table_set_weight_format"] = createExportWrapper("pivot_table_set_weight_format");

/** @type {function(...*):?} */
var _covariance_2pass_create = Module["_covariance_2pass_create"] = createExportWrapper("covariance_2pass_create");

/** @type {function(...*):?} */
var _covariance_accumulate_pass2 = Module["_covariance_accumulate_pass2"] = createExportWrapper("covariance_accumulate_pass2");

/** @type {function(...*):?} */
var _covariance_accumulate_pass1 = Module["_covariance_accumulate_pass1"] = createExportWrapper("covariance_accumulate_pass1");

/** @type {function(...*):?} */
var _covariance_calculate = Module["_covariance_calculate"] = createExportWrapper("covariance_calculate");

/** @type {function(...*):?} */
var _covariance_moments = Module["_covariance_moments"] = createExportWrapper("covariance_moments");

/** @type {function(...*):?} */
var _correlation_from_covariance = Module["_correlation_from_covariance"] = createExportWrapper("correlation_from_covariance");

/** @type {function(...*):?} */
var _significance_of_correlation = Module["_significance_of_correlation"] = createExportWrapper("significance_of_correlation");

/** @type {function(...*):?} */
var _covariance_destroy = Module["_covariance_destroy"] = createExportWrapper("covariance_destroy");

/** @type {function(...*):?} */
var _barchart_create = Module["_barchart_create"] = createExportWrapper("barchart_create");

/** @type {function(...*):?} */
var _chart_item_submit = Module["_chart_item_submit"] = createExportWrapper("chart_item_submit");

/** @type {function(...*):?} */
var _get_var_range = Module["_get_var_range"] = createExportWrapper("get_var_range");

/** @type {function(...*):?} */
var _var_set_create_from_array = Module["_var_set_create_from_array"] = createExportWrapper("var_set_create_from_array");

/** @type {function(...*):?} */
var _var_set_create_from_dict = Module["_var_set_create_from_dict"] = createExportWrapper("var_set_create_from_dict");

/** @type {function(...*):?} */
var _parse_var_set_vars = Module["_parse_var_set_vars"] = createExportWrapper("parse_var_set_vars");

/** @type {function(...*):?} */
var _var_set_destroy = Module["_var_set_destroy"] = createExportWrapper("var_set_destroy");

/** @type {function(...*):?} */
var _ds_init_cstr = Module["_ds_init_cstr"] = createExportWrapper("ds_init_cstr");

/** @type {function(...*):?} */
var _pivot_category_create_leaf_rc = Module["_pivot_category_create_leaf_rc"] = createExportWrapper("pivot_category_create_leaf_rc");

/** @type {function(...*):?} */
var _pivot_category_create_group = Module["_pivot_category_create_group"] = createExportWrapper("pivot_category_create_group");

/** @type {function(...*):?} */
var _pivot_table_put = Module["_pivot_table_put"] = createExportWrapper("pivot_table_put");

/** @type {function(...*):?} */
var _pivot_value_set_rc = Module["_pivot_value_set_rc"] = createExportWrapper("pivot_value_set_rc");

/** @type {function(...*):?} */
var _moments_destroy = Module["_moments_destroy"] = createExportWrapper("moments_destroy");

/** @type {function(...*):?} */
var _moments_create = Module["_moments_create"] = createExportWrapper("moments_create");

/** @type {function(...*):?} */
var _moments_clear = Module["_moments_clear"] = createExportWrapper("moments_clear");

/** @type {function(...*):?} */
var _moments_pass_one = Module["_moments_pass_one"] = createExportWrapper("moments_pass_one");

/** @type {function(...*):?} */
var _moments_pass_two = Module["_moments_pass_two"] = createExportWrapper("moments_pass_two");

/** @type {function(...*):?} */
var _moments_calculate = Module["_moments_calculate"] = createExportWrapper("moments_calculate");

/** @type {function(...*):?} */
var _calc_sekurt = Module["_calc_sekurt"] = createExportWrapper("calc_sekurt");

/** @type {function(...*):?} */
var _calc_seskew = Module["_calc_seskew"] = createExportWrapper("calc_seskew");

/** @type {function(...*):?} */
var _pool_zalloc = Module["_pool_zalloc"] = createExportWrapper("pool_zalloc");

/** @type {function(...*):?} */
var _interaction_create = Module["_interaction_create"] = createExportWrapper("interaction_create");

/** @type {function(...*):?} */
var _lex_match_variable = Module["_lex_match_variable"] = createExportWrapper("lex_match_variable");

/** @type {function(...*):?} */
var _interaction_destroy = Module["_interaction_destroy"] = createExportWrapper("interaction_destroy");

/** @type {function(...*):?} */
var _interaction_add_variable = Module["_interaction_add_variable"] = createExportWrapper("interaction_add_variable");

/** @type {function(...*):?} */
var _pool_nrealloc = Module["_pool_nrealloc"] = createExportWrapper("pool_nrealloc");

/** @type {function(...*):?} */
var _categoricals_create = Module["_categoricals_create"] = createExportWrapper("categoricals_create");

/** @type {function(...*):?} */
var _categoricals_set_payload = Module["_categoricals_set_payload"] = createExportWrapper("categoricals_set_payload");

/** @type {function(...*):?} */
var _categoricals_update = Module["_categoricals_update"] = createExportWrapper("categoricals_update");

/** @type {function(...*):?} */
var _categoricals_done = Module["_categoricals_done"] = createExportWrapper("categoricals_done");

/** @type {function(...*):?} */
var _categoricals_n_count = Module["_categoricals_n_count"] = createExportWrapper("categoricals_n_count");

/** @type {function(...*):?} */
var _categoricals_get_value_index_by_category_real = Module["_categoricals_get_value_index_by_category_real"] = createExportWrapper("categoricals_get_value_index_by_category_real");

/** @type {function(...*):?} */
var _categoricals_get_user_data_by_category_real = Module["_categoricals_get_user_data_by_category_real"] = createExportWrapper("categoricals_get_user_data_by_category_real");

/** @type {function(...*):?} */
var _tukey_hinges_calculate = Module["_tukey_hinges_calculate"] = createExportWrapper("tukey_hinges_calculate");

/** @type {function(...*):?} */
var _interaction_to_string = Module["_interaction_to_string"] = createExportWrapper("interaction_to_string");

/** @type {function(...*):?} */
var _boxplot_create = Module["_boxplot_create"] = createExportWrapper("boxplot_create");

/** @type {function(...*):?} */
var _categoricals_get_case_by_category_real = Module["_categoricals_get_case_by_category_real"] = createExportWrapper("categoricals_get_case_by_category_real");

/** @type {function(...*):?} */
var _ds_ltrim = Module["_ds_ltrim"] = createExportWrapper("ds_ltrim");

/** @type {function(...*):?} */
var _boxplot_add_box = Module["_boxplot_add_box"] = createExportWrapper("boxplot_add_box");

/** @type {function(...*):?} */
var _histogram_chart_create = Module["_histogram_chart_create"] = createExportWrapper("histogram_chart_create");

/** @type {function(...*):?} */
var _np_plot_create = Module["_np_plot_create"] = createExportWrapper("np_plot_create");

/** @type {function(...*):?} */
var _dnp_plot_create = Module["_dnp_plot_create"] = createExportWrapper("dnp_plot_create");

/** @type {function(...*):?} */
var _output_item_unref = Module["_output_item_unref"] = createExportWrapper("output_item_unref");

/** @type {function(...*):?} */
var _spreadlevel_plot_create = Module["_spreadlevel_plot_create"] = createExportWrapper("spreadlevel_plot_create");

/** @type {function(...*):?} */
var _spreadlevel_plot_add = Module["_spreadlevel_plot_add"] = createExportWrapper("spreadlevel_plot_add");

/** @type {function(...*):?} */
var _calc_semean = Module["_calc_semean"] = createExportWrapper("calc_semean");

/** @type {function(...*):?} */
var _trimmed_mean_calculate = Module["_trimmed_mean_calculate"] = createExportWrapper("trimmed_mean_calculate");

/** @type {function(...*):?} */
var _shapiro_wilk_calculate = Module["_shapiro_wilk_calculate"] = createExportWrapper("shapiro_wilk_calculate");

/** @type {function(...*):?} */
var _shapiro_wilk_significance = Module["_shapiro_wilk_significance"] = createExportWrapper("shapiro_wilk_significance");

/** @type {function(...*):?} */
var _categoricals_destroy = Module["_categoricals_destroy"] = createExportWrapper("categoricals_destroy");

/** @type {function(...*):?} */
var _log2 = Module["_log2"] = createExportWrapper("log2");

/** @type {function(...*):?} */
var _histogram_create = Module["_histogram_create"] = createExportWrapper("histogram_create");

/** @type {function(...*):?} */
var _histogram_add = Module["_histogram_add"] = createExportWrapper("histogram_add");

/** @type {function(...*):?} */
var _trimmed_mean_create = Module["_trimmed_mean_create"] = createExportWrapper("trimmed_mean_create");

/** @type {function(...*):?} */
var _tukey_hinges_create = Module["_tukey_hinges_create"] = createExportWrapper("tukey_hinges_create");

/** @type {function(...*):?} */
var _order_stats_accumulate_idx = Module["_order_stats_accumulate_idx"] = createExportWrapper("order_stats_accumulate_idx");

/** @type {function(...*):?} */
var _box_whisker_create = Module["_box_whisker_create"] = createExportWrapper("box_whisker_create");

/** @type {function(...*):?} */
var _shapiro_wilk_create = Module["_shapiro_wilk_create"] = createExportWrapper("shapiro_wilk_create");

/** @type {function(...*):?} */
var _np_create = Module["_np_create"] = createExportWrapper("np_create");

/** @type {function(...*):?} */
var _categoricals_get_var_values = Module["_categoricals_get_var_values"] = createExportWrapper("categoricals_get_var_values");

/** @type {function(...*):?} */
var _covariance_1pass_create = Module["_covariance_1pass_create"] = createExportWrapper("covariance_1pass_create");

/** @type {function(...*):?} */
var _covariance_accumulate = Module["_covariance_accumulate"] = createExportWrapper("covariance_accumulate");

/** @type {function(...*):?} */
var _covariance_from_correlation = Module["_covariance_from_correlation"] = createExportWrapper("covariance_from_correlation");

/** @type {function(...*):?} */
var ___fpclassifyl = Module["___fpclassifyl"] = createExportWrapper("__fpclassifyl");

/** @type {function(...*):?} */
var _scree_create = Module["_scree_create"] = createExportWrapper("scree_create");

/** @type {function(...*):?} */
var _pool_create_temp_file = Module["_pool_create_temp_file"] = createExportWrapper("pool_create_temp_file");

/** @type {function(...*):?} */
var _pool_fclose_temp_file = Module["_pool_fclose_temp_file"] = createExportWrapper("pool_fclose_temp_file");

/** @type {function(...*):?} */
var _pool_unregister = Module["_pool_unregister"] = createExportWrapper("pool_unregister");

/** @type {function(...*):?} */
var _isspace = Module["_isspace"] = createExportWrapper("isspace");

/** @type {function(...*):?} */
var _freq_clone = Module["_freq_clone"] = createExportWrapper("freq_clone");

/** @type {function(...*):?} */
var _freq_destroy = Module["_freq_destroy"] = createExportWrapper("freq_destroy");

/** @type {function(...*):?} */
var _compare_freq_ptr_3way = Module["_compare_freq_ptr_3way"] = createExportWrapper("compare_freq_ptr_3way");

/** @type {function(...*):?} */
var _freq_hmap_extract = Module["_freq_hmap_extract"] = createExportWrapper("freq_hmap_extract");

/** @type {function(...*):?} */
var _partition = Module["_partition"] = createExportWrapper("partition");

/** @type {function(...*):?} */
var _modf = Module["_modf"] = createExportWrapper("modf");

/** @type {function(...*):?} */
var _piechart_create = Module["_piechart_create"] = createExportWrapper("piechart_create");

/** @type {function(...*):?} */
var _friedman_execute = Module["_friedman_execute"] = createExportWrapper("friedman_execute");

/** @type {function(...*):?} */
var _covariance_dump_enc_header = Module["_covariance_dump_enc_header"] = createExportWrapper("covariance_dump_enc_header");

/** @type {function(...*):?} */
var _covariance_dump_enc = Module["_covariance_dump_enc"] = createExportWrapper("covariance_dump_enc");

/** @type {function(...*):?} */
var _covariance_calculate_unnormalized = Module["_covariance_calculate_unnormalized"] = createExportWrapper("covariance_calculate_unnormalized");

/** @type {function(...*):?} */
var _covariance_dim = Module["_covariance_dim"] = createExportWrapper("covariance_dim");

/** @type {function(...*):?} */
var _covariance_get_categoricals = Module["_covariance_get_categoricals"] = createExportWrapper("covariance_get_categoricals");

/** @type {function(...*):?} */
var _categoricals_get_interaction_by_subscript = Module["_categoricals_get_interaction_by_subscript"] = createExportWrapper("categoricals_get_interaction_by_subscript");

/** @type {function(...*):?} */
var _interaction_is_subset = Module["_interaction_is_subset"] = createExportWrapper("interaction_is_subset");

/** @type {function(...*):?} */
var _categoricals_df_total = Module["_categoricals_df_total"] = createExportWrapper("categoricals_df_total");

/** @type {function(...*):?} */
var _categoricals_isbalanced = Module["_categoricals_isbalanced"] = createExportWrapper("categoricals_isbalanced");

/** @type {function(...*):?} */
var _categoricals_df = Module["_categoricals_df"] = createExportWrapper("categoricals_df");

/** @type {function(...*):?} */
var _parse_design_interaction = Module["_parse_design_interaction"] = createExportWrapper("parse_design_interaction");

/** @type {function(...*):?} */
var _scatterplot_create = Module["_scatterplot_create"] = createExportWrapper("scatterplot_create");

/** @type {function(...*):?} */
var _jonckheere_terpstra_execute = Module["_jonckheere_terpstra_execute"] = createExportWrapper("jonckheere_terpstra_execute");

/** @type {function(...*):?} */
var _sort_execute_1var = Module["_sort_execute_1var"] = createExportWrapper("sort_execute_1var");

/** @type {function(...*):?} */
var _kruskal_wallis_execute = Module["_kruskal_wallis_execute"] = createExportWrapper("kruskal_wallis_execute");

/** @type {function(...*):?} */
var _bt_insert = Module["_bt_insert"] = createExportWrapper("bt_insert");

/** @type {function(...*):?} */
var _ks_one_sample_execute = Module["_ks_one_sample_execute"] = createExportWrapper("ks_one_sample_execute");

/** @type {function(...*):?} */
var _categoricals_get_dummy_code_for_case = Module["_categoricals_get_dummy_code_for_case"] = createExportWrapper("categoricals_get_dummy_code_for_case");

/** @type {function(...*):?} */
var _mann_whitney_execute = Module["_mann_whitney_execute"] = createExportWrapper("mann_whitney_execute");

/** @type {function(...*):?} */
var _mcnemar_execute = Module["_mcnemar_execute"] = createExportWrapper("mcnemar_execute");

/** @type {function(...*):?} */
var _means_parse = Module["_means_parse"] = createExportWrapper("means_parse");

/** @type {function(...*):?} */
var _run_means = Module["_run_means"] = createExportWrapper("run_means");

/** @type {function(...*):?} */
var _bt_init = Module["_bt_init"] = createExportWrapper("bt_init");

/** @type {function(...*):?} */
var _median_execute = Module["_median_execute"] = createExportWrapper("median_execute");

/** @type {function(...*):?} */
var _npar_summary_calc_descriptives = Module["_npar_summary_calc_descriptives"] = createExportWrapper("npar_summary_calc_descriptives");

/** @type {function(...*):?} */
var _do_summary_box = Module["_do_summary_box"] = createExportWrapper("do_summary_box");

/** @type {function(...*):?} */
var _runs_execute = Module["_runs_execute"] = createExportWrapper("runs_execute");

/** @type {function(...*):?} */
var _wilcoxon_execute = Module["_wilcoxon_execute"] = createExportWrapper("wilcoxon_execute");

/** @type {function(...*):?} */
var _sign_execute = Module["_sign_execute"] = createExportWrapper("sign_execute");

/** @type {function(...*):?} */
var _ll_count = Module["_ll_count"] = createExportWrapper("ll_count");

/** @type {function(...*):?} */
var _levene_create = Module["_levene_create"] = createExportWrapper("levene_create");

/** @type {function(...*):?} */
var _levene_pass_one = Module["_levene_pass_one"] = createExportWrapper("levene_pass_one");

/** @type {function(...*):?} */
var _levene_pass_two = Module["_levene_pass_two"] = createExportWrapper("levene_pass_two");

/** @type {function(...*):?} */
var _levene_pass_three = Module["_levene_pass_three"] = createExportWrapper("levene_pass_three");

/** @type {function(...*):?} */
var _categoricals_sane = Module["_categoricals_sane"] = createExportWrapper("categoricals_sane");

/** @type {function(...*):?} */
var _categoricals_n_total = Module["_categoricals_n_total"] = createExportWrapper("categoricals_n_total");

/** @type {function(...*):?} */
var _categoricals_is_complete = Module["_categoricals_is_complete"] = createExportWrapper("categoricals_is_complete");

/** @type {function(...*):?} */
var _categoricals_get_user_data_by_category = Module["_categoricals_get_user_data_by_category"] = createExportWrapper("categoricals_get_user_data_by_category");

/** @type {function(...*):?} */
var _levene_calculate = Module["_levene_calculate"] = createExportWrapper("levene_calculate");

/** @type {function(...*):?} */
var _categoricals_get_case_by_category = Module["_categoricals_get_case_by_category"] = createExportWrapper("categoricals_get_case_by_category");

/** @type {function(...*):?} */
var _pivot_table_put4 = Module["_pivot_table_put4"] = createExportWrapper("pivot_table_put4");

/** @type {function(...*):?} */
var _levene_destroy = Module["_levene_destroy"] = createExportWrapper("levene_destroy");

/** @type {function(...*):?} */
var _string_set_find_node = Module["_string_set_find_node"] = createExportWrapper("string_set_find_node");

/** @type {function(...*):?} */
var _linreg_predict = Module["_linreg_predict"] = createExportWrapper("linreg_predict");

/** @type {function(...*):?} */
var _linreg_dep_var = Module["_linreg_dep_var"] = createExportWrapper("linreg_dep_var");

/** @type {function(...*):?} */
var _linreg_residual = Module["_linreg_residual"] = createExportWrapper("linreg_residual");

/** @type {function(...*):?} */
var _linreg_unref = Module["_linreg_unref"] = createExportWrapper("linreg_unref");

/** @type {function(...*):?} */
var _linreg_alloc = Module["_linreg_alloc"] = createExportWrapper("linreg_alloc");

/** @type {function(...*):?} */
var _linreg_set_indep_variable_mean = Module["_linreg_set_indep_variable_mean"] = createExportWrapper("linreg_set_indep_variable_mean");

/** @type {function(...*):?} */
var _linreg_set_depvar_mean = Module["_linreg_set_depvar_mean"] = createExportWrapper("linreg_set_depvar_mean");

/** @type {function(...*):?} */
var _linreg_fit = Module["_linreg_fit"] = createExportWrapper("linreg_fit");

/** @type {function(...*):?} */
var _linreg_ssreg = Module["_linreg_ssreg"] = createExportWrapper("linreg_ssreg");

/** @type {function(...*):?} */
var _linreg_sst = Module["_linreg_sst"] = createExportWrapper("linreg_sst");

/** @type {function(...*):?} */
var _linreg_n_coeffs = Module["_linreg_n_coeffs"] = createExportWrapper("linreg_n_coeffs");

/** @type {function(...*):?} */
var _linreg_n_obs = Module["_linreg_n_obs"] = createExportWrapper("linreg_n_obs");

/** @type {function(...*):?} */
var _linreg_mse = Module["_linreg_mse"] = createExportWrapper("linreg_mse");

/** @type {function(...*):?} */
var _linreg_dfmodel = Module["_linreg_dfmodel"] = createExportWrapper("linreg_dfmodel");

/** @type {function(...*):?} */
var _linreg_sse = Module["_linreg_sse"] = createExportWrapper("linreg_sse");

/** @type {function(...*):?} */
var _linreg_dferror = Module["_linreg_dferror"] = createExportWrapper("linreg_dferror");

/** @type {function(...*):?} */
var _linreg_dftotal = Module["_linreg_dftotal"] = createExportWrapper("linreg_dftotal");

/** @type {function(...*):?} */
var _linreg_cov = Module["_linreg_cov"] = createExportWrapper("linreg_cov");

/** @type {function(...*):?} */
var _linreg_intercept = Module["_linreg_intercept"] = createExportWrapper("linreg_intercept");

/** @type {function(...*):?} */
var _linreg_indep_var = Module["_linreg_indep_var"] = createExportWrapper("linreg_indep_var");

/** @type {function(...*):?} */
var _linreg_coeff = Module["_linreg_coeff"] = createExportWrapper("linreg_coeff");

/** @type {function(...*):?} */
var _ds_assign_cstr = Module["_ds_assign_cstr"] = createExportWrapper("ds_assign_cstr");

/** @type {function(...*):?} */
var _text_item_create_format = Module["_text_item_create_format"] = createExportWrapper("text_item_create_format");

/** @type {function(...*):?} */
var _roc_chart_create = Module["_roc_chart_create"] = createExportWrapper("roc_chart_create");

/** @type {function(...*):?} */
var _roc_chart_add_var = Module["_roc_chart_add_var"] = createExportWrapper("roc_chart_add_var");

/** @type {function(...*):?} */
var _indep_run = Module["_indep_run"] = createExportWrapper("indep_run");

/** @type {function(...*):?} */
var _one_sample_run = Module["_one_sample_run"] = createExportWrapper("one_sample_run");

/** @type {function(...*):?} */
var _paired_run = Module["_paired_run"] = createExportWrapper("paired_run");

/** @type {function(...*):?} */
var _LevelOfSignificanceWXMPSR = Module["_LevelOfSignificanceWXMPSR"] = createExportWrapper("LevelOfSignificanceWXMPSR");

/** @type {function(...*):?} */
var ___small_fprintf = Module["___small_fprintf"] = createExportWrapper("__small_fprintf");

/** @type {function(...*):?} */
var _measure_paper = Module["_measure_paper"] = createExportWrapper("measure_paper");

/** @type {function(...*):?} */
var _srand = Module["_srand"] = createExportWrapper("srand");

/** @type {function(...*):?} */
var _pool_mark = Module["_pool_mark"] = createExportWrapper("pool_mark");

/** @type {function(...*):?} */
var _rand = Module["_rand"] = createExportWrapper("rand");

/** @type {function(...*):?} */
var _pool_release = Module["_pool_release"] = createExportWrapper("pool_release");

/** @type {function(...*):?} */
var _pool_fclose = Module["_pool_fclose"] = createExportWrapper("pool_fclose");

/** @type {function(...*):?} */
var _pool_fopen = Module["_pool_fopen"] = createExportWrapper("pool_fopen");

/** @type {function(...*):?} */
var _chdir = Module["_chdir"] = createExportWrapper("chdir");

/** @type {function(...*):?} */
var _create_temp_file = Module["_create_temp_file"] = createExportWrapper("create_temp_file");

/** @type {function(...*):?} */
var _execl = Module["_execl"] = createExportWrapper("execl");

/** @type {function(...*):?} */
var _waitpid = Module["_waitpid"] = createExportWrapper("waitpid");

/** @type {function(...*):?} */
var _rewind = Module["_rewind"] = createExportWrapper("rewind");

/** @type {function(...*):?} */
var _text_item_create_nocopy = Module["_text_item_create_nocopy"] = createExportWrapper("text_item_create_nocopy");

/** @type {function(...*):?} */
var _lex_force_string_or_id = Module["_lex_force_string_or_id"] = createExportWrapper("lex_force_string_or_id");

/** @type {function(...*):?} */
var _include_path_search = Module["_include_path_search"] = createExportWrapper("include_path_search");

/** @type {function(...*):?} */
var _lex_reader_for_file = Module["_lex_reader_for_file"] = createExportWrapper("lex_reader_for_file");

/** @type {function(...*):?} */
var _string_set_clear = Module["_string_set_clear"] = createExportWrapper("string_set_clear");

/** @type {function(...*):?} */
var _pivot_result_class_change = Module["_pivot_result_class_change"] = createExportWrapper("pivot_result_class_change");

/** @type {function(...*):?} */
var _change_permissions = Module["_change_permissions"] = createExportWrapper("change_permissions");

/** @type {function(...*):?} */
var _chmod = Module["_chmod"] = createExportWrapper("chmod");

/** @type {function(...*):?} */
var _valid_encoding = Module["_valid_encoding"] = createExportWrapper("valid_encoding");

/** @type {function(...*):?} */
var _set_default_encoding = Module["_set_default_encoding"] = createExportWrapper("set_default_encoding");

/** @type {function(...*):?} */
var _set_encoding_from_locale = Module["_set_encoding_from_locale"] = createExportWrapper("set_encoding_from_locale");

/** @type {function(...*):?} */
var _set_rng = Module["_set_rng"] = createExportWrapper("set_rng");

/** @type {function(...*):?} */
var _journal_is_enabled = Module["_journal_is_enabled"] = createExportWrapper("journal_is_enabled");

/** @type {function(...*):?} */
var _journal_get_file_name = Module["_journal_get_file_name"] = createExportWrapper("journal_get_file_name");

/** @type {function(...*):?} */
var _temp_dir_name = Module["_temp_dir_name"] = createExportWrapper("temp_dir_name");

/** @type {function(...*):?} */
var _journal_enable = Module["_journal_enable"] = createExportWrapper("journal_enable");

/** @type {function(...*):?} */
var _journal_disable = Module["_journal_disable"] = createExportWrapper("journal_disable");

/** @type {function(...*):?} */
var _journal_set_file_name = Module["_journal_set_file_name"] = createExportWrapper("journal_set_file_name");

/** @type {function(...*):?} */
var _output_set_title = Module["_output_set_title"] = createExportWrapper("output_set_title");

/** @type {function(...*):?} */
var _output_set_subtitle = Module["_output_set_subtitle"] = createExportWrapper("output_set_subtitle");

/** @type {function(...*):?} */
var _get_start_date = Module["_get_start_date"] = createExportWrapper("get_start_date");

/** @type {function(...*):?} */
var _str_copy_rpad = Module["_str_copy_rpad"] = createExportWrapper("str_copy_rpad");

/** @type {function(...*):?} */
var _parse_mixed_vars_pool = Module["_parse_mixed_vars_pool"] = createExportWrapper("parse_mixed_vars_pool");

/** @type {function(...*):?} */
var _command_match = Module["_command_match"] = createExportWrapper("command_match");

/** @type {function(...*):?} */
var _ss_first_mb = Module["_ss_first_mb"] = createExportWrapper("ss_first_mb");

/** @type {function(...*):?} */
var _ss_get_mb = Module["_ss_get_mb"] = createExportWrapper("ss_get_mb");

/** @type {function(...*):?} */
var _ss_first_mblen = Module["_ss_first_mblen"] = createExportWrapper("ss_first_mblen");

/** @type {function(...*):?} */
var _ss_at_mb = Module["_ss_at_mb"] = createExportWrapper("ss_at_mb");

/** @type {function(...*):?} */
var _ss_at_mblen = Module["_ss_at_mblen"] = createExportWrapper("ss_at_mblen");

/** @type {function(...*):?} */
var _str_copy_buf_trunc = Module["_str_copy_buf_trunc"] = createExportWrapper("str_copy_buf_trunc");

/** @type {function(...*):?} */
var _string_array_clone = Module["_string_array_clone"] = createExportWrapper("string_array_clone");

/** @type {function(...*):?} */
var _string_array_terminate_null = Module["_string_array_terminate_null"] = createExportWrapper("string_array_terminate_null");

/** @type {function(...*):?} */
var _include_path = Module["_include_path"] = createExportWrapper("include_path");

/** @type {function(...*):?} */
var _lex_reader_init = Module["_lex_reader_init"] = createExportWrapper("lex_reader_init");

/** @type {function(...*):?} */
var _token_destroy = Module["_token_destroy"] = createExportWrapper("token_destroy");

/** @type {function(...*):?} */
var _token_init = Module["_token_init"] = createExportWrapper("token_init");

/** @type {function(...*):?} */
var _scanner_init = Module["_scanner_init"] = createExportWrapper("scanner_init");

/** @type {function(...*):?} */
var _segmenter_get_prompt = Module["_segmenter_get_prompt"] = createExportWrapper("segmenter_get_prompt");

/** @type {function(...*):?} */
var _scanner_push = Module["_scanner_push"] = createExportWrapper("scanner_push");

/** @type {function(...*):?} */
var _lex_next_error_valist = Module["_lex_next_error_valist"] = createExportWrapper("lex_next_error_valist");

/** @type {function(...*):?} */
var _lex_error_valist = Module["_lex_error_valist"] = createExportWrapper("lex_error_valist");

/** @type {function(...*):?} */
var _lex_next_error = Module["_lex_next_error"] = createExportWrapper("lex_next_error");

/** @type {function(...*):?} */
var _lex_spec_only_once = Module["_lex_spec_only_once"] = createExportWrapper("lex_spec_only_once");

/** @type {function(...*):?} */
var _lex_next_is_number = Module["_lex_next_is_number"] = createExportWrapper("lex_next_is_number");

/** @type {function(...*):?} */
var _lex_next_is_string = Module["_lex_next_is_string"] = createExportWrapper("lex_next_is_string");

/** @type {function(...*):?} */
var _lex_next_number = Module["_lex_next_number"] = createExportWrapper("lex_next_number");

/** @type {function(...*):?} */
var _lex_next_tokval = Module["_lex_next_tokval"] = createExportWrapper("lex_next_tokval");

/** @type {function(...*):?} */
var _lex_next_tokss = Module["_lex_next_tokss"] = createExportWrapper("lex_next_tokss");

/** @type {function(...*):?} */
var _string_lexer_init = Module["_string_lexer_init"] = createExportWrapper("string_lexer_init");

/** @type {function(...*):?} */
var _string_lexer_next = Module["_string_lexer_next"] = createExportWrapper("string_lexer_next");

/** @type {function(...*):?} */
var _lex_get_first_column = Module["_lex_get_first_column"] = createExportWrapper("lex_get_first_column");

/** @type {function(...*):?} */
var _lex_get_last_column = Module["_lex_get_last_column"] = createExportWrapper("lex_get_last_column");

/** @type {function(...*):?} */
var _segmenter_get_mode = Module["_segmenter_get_mode"] = createExportWrapper("segmenter_get_mode");

/** @type {function(...*):?} */
var _u8_istream_for_fd = Module["_u8_istream_for_fd"] = createExportWrapper("u8_istream_for_fd");

/** @type {function(...*):?} */
var _u8_istream_for_file = Module["_u8_istream_for_file"] = createExportWrapper("u8_istream_for_file");

/** @type {function(...*):?} */
var _lex_reader_for_format = Module["_lex_reader_for_format"] = createExportWrapper("lex_reader_for_format");

/** @type {function(...*):?} */
var _u8_istream_read = Module["_u8_istream_read"] = createExportWrapper("u8_istream_read");

/** @type {function(...*):?} */
var _u8_istream_fileno = Module["_u8_istream_fileno"] = createExportWrapper("u8_istream_fileno");

/** @type {function(...*):?} */
var _u8_istream_close = Module["_u8_istream_close"] = createExportWrapper("u8_istream_close");

/** @type {function(...*):?} */
var _u8_istream_free = Module["_u8_istream_free"] = createExportWrapper("u8_istream_free");

/** @type {function(...*):?} */
var _scan_type_to_string = Module["_scan_type_to_string"] = createExportWrapper("scan_type_to_string");

/** @type {function(...*):?} */
var _is_scan_type = Module["_is_scan_type"] = createExportWrapper("is_scan_type");

/** @type {function(...*):?} */
var _ss_realloc = Module["_ss_realloc"] = createExportWrapper("ss_realloc");

/** @type {function(...*):?} */
var _ss_end = Module["_ss_end"] = createExportWrapper("ss_end");

/** @type {function(...*):?} */
var _segment_type_to_string = Module["_segment_type_to_string"] = createExportWrapper("segment_type_to_string");

/** @type {function(...*):?} */
var _subc_list_double_create = Module["_subc_list_double_create"] = createExportWrapper("subc_list_double_create");

/** @type {function(...*):?} */
var _subc_list_int_create = Module["_subc_list_int_create"] = createExportWrapper("subc_list_int_create");

/** @type {function(...*):?} */
var _subc_list_double_push = Module["_subc_list_double_push"] = createExportWrapper("subc_list_double_push");

/** @type {function(...*):?} */
var _subc_list_int_push = Module["_subc_list_int_push"] = createExportWrapper("subc_list_int_push");

/** @type {function(...*):?} */
var _subc_list_double_count = Module["_subc_list_double_count"] = createExportWrapper("subc_list_double_count");

/** @type {function(...*):?} */
var _subc_list_int_count = Module["_subc_list_int_count"] = createExportWrapper("subc_list_int_count");

/** @type {function(...*):?} */
var _subc_list_double_at = Module["_subc_list_double_at"] = createExportWrapper("subc_list_double_at");

/** @type {function(...*):?} */
var _subc_list_int_at = Module["_subc_list_int_at"] = createExportWrapper("subc_list_int_at");

/** @type {function(...*):?} */
var _subc_list_double_destroy = Module["_subc_list_double_destroy"] = createExportWrapper("subc_list_double_destroy");

/** @type {function(...*):?} */
var _subc_list_int_destroy = Module["_subc_list_int_destroy"] = createExportWrapper("subc_list_int_destroy");

/** @type {function(...*):?} */
var _subc_list_error = Module["_subc_list_error"] = createExportWrapper("subc_list_error");

/** @type {function(...*):?} */
var _token_print = Module["_token_print"] = createExportWrapper("token_print");

/** @type {function(...*):?} */
var _var_set_get_cnt = Module["_var_set_get_cnt"] = createExportWrapper("var_set_get_cnt");

/** @type {function(...*):?} */
var _parse_DATA_LIST_var = Module["_parse_DATA_LIST_var"] = createExportWrapper("parse_DATA_LIST_var");

/** @type {function(...*):?} */
var _strtoull = Module["_strtoull"] = createExportWrapper("strtoull");

/** @type {function(...*):?} */
var _abt_init = Module["_abt_init"] = createExportWrapper("abt_init");

/** @type {function(...*):?} */
var _abt_insert = Module["_abt_insert"] = createExportWrapper("abt_insert");

/** @type {function(...*):?} */
var _abt_reaugmented = Module["_abt_reaugmented"] = createExportWrapper("abt_reaugmented");

/** @type {function(...*):?} */
var _abt_insert_after = Module["_abt_insert_after"] = createExportWrapper("abt_insert_after");

/** @type {function(...*):?} */
var _abt_insert_before = Module["_abt_insert_before"] = createExportWrapper("abt_insert_before");

/** @type {function(...*):?} */
var _abt_delete = Module["_abt_delete"] = createExportWrapper("abt_delete");

/** @type {function(...*):?} */
var _abt_first = Module["_abt_first"] = createExportWrapper("abt_first");

/** @type {function(...*):?} */
var _abt_last = Module["_abt_last"] = createExportWrapper("abt_last");

/** @type {function(...*):?} */
var _abt_find = Module["_abt_find"] = createExportWrapper("abt_find");

/** @type {function(...*):?} */
var _abt_next = Module["_abt_next"] = createExportWrapper("abt_next");

/** @type {function(...*):?} */
var _abt_prev = Module["_abt_prev"] = createExportWrapper("abt_prev");

/** @type {function(...*):?} */
var _abt_changed = Module["_abt_changed"] = createExportWrapper("abt_changed");

/** @type {function(...*):?} */
var _abt_moved = Module["_abt_moved"] = createExportWrapper("abt_moved");

/** @type {function(...*):?} */
var _getopt_long = Module["_getopt_long"] = createExportWrapper("getopt_long");

/** @type {function(...*):?} */
var _find = Module["_find"] = createExportWrapper("find");

/** @type {function(...*):?} */
var _count_equal = Module["_count_equal"] = createExportWrapper("count_equal");

/** @type {function(...*):?} */
var _count_if = Module["_count_if"] = createExportWrapper("count_if");

/** @type {function(...*):?} */
var _unique = Module["_unique"] = createExportWrapper("unique");

/** @type {function(...*):?} */
var _is_partitioned = Module["_is_partitioned"] = createExportWrapper("is_partitioned");

/** @type {function(...*):?} */
var _copy_if = Module["_copy_if"] = createExportWrapper("copy_if");

/** @type {function(...*):?} */
var _insert_range = Module["_insert_range"] = createExportWrapper("insert_range");

/** @type {function(...*):?} */
var _remove_copy_if = Module["_remove_copy_if"] = createExportWrapper("remove_copy_if");

/** @type {function(...*):?} */
var _lexicographical_compare_3way = Module["_lexicographical_compare_3way"] = createExportWrapper("lexicographical_compare_3way");

/** @type {function(...*):?} */
var _is_sorted = Module["_is_sorted"] = createExportWrapper("is_sorted");

/** @type {function(...*):?} */
var _push_heap = Module["_push_heap"] = createExportWrapper("push_heap");

/** @type {function(...*):?} */
var _pop_heap = Module["_pop_heap"] = createExportWrapper("pop_heap");

/** @type {function(...*):?} */
var _make_heap = Module["_make_heap"] = createExportWrapper("make_heap");

/** @type {function(...*):?} */
var _sort_heap = Module["_sort_heap"] = createExportWrapper("sort_heap");

/** @type {function(...*):?} */
var _is_heap = Module["_is_heap"] = createExportWrapper("is_heap");

/** @type {function(...*):?} */
var _isxdigit = Module["_isxdigit"] = createExportWrapper("isxdigit");

/** @type {function(...*):?} */
var _heap_create_pool = Module["_heap_create_pool"] = createExportWrapper("heap_create_pool");

/** @type {function(...*):?} */
var _heap_count = Module["_heap_count"] = createExportWrapper("heap_count");

/** @type {function(...*):?} */
var _heap_moved = Module["_heap_moved"] = createExportWrapper("heap_moved");

/** @type {function(...*):?} */
var _hmap_swap = Module["_hmap_swap"] = createExportWrapper("hmap_swap");

/** @type {function(...*):?} */
var _hmap_shrink = Module["_hmap_shrink"] = createExportWrapper("hmap_shrink");

/** @type {function(...*):?} */
var _hmap_changed = Module["_hmap_changed"] = createExportWrapper("hmap_changed");

/** @type {function(...*):?} */
var _hmap_moved = Module["_hmap_moved"] = createExportWrapper("hmap_moved");

/** @type {function(...*):?} */
var _hmapx_clear = Module["_hmapx_clear"] = createExportWrapper("hmapx_clear");

/** @type {function(...*):?} */
var _hmapx_insert_fast = Module["_hmapx_insert_fast"] = createExportWrapper("hmapx_insert_fast");

/** @type {function(...*):?} */
var _vmsg = Module["_vmsg"] = createExportWrapper("vmsg");

/** @type {function(...*):?} */
var _msg_error = Module["_msg_error"] = createExportWrapper("msg_error");

/** @type {function(...*):?} */
var _msg_severity_to_string = Module["_msg_severity_to_string"] = createExportWrapper("msg_severity_to_string");

/** @type {function(...*):?} */
var _msg_dup = Module["_msg_dup"] = createExportWrapper("msg_dup");

/** @type {function(...*):?} */
var _msg_destroy = Module["_msg_destroy"] = createExportWrapper("msg_destroy");

/** @type {function(...*):?} */
var _msg_to_string = Module["_msg_to_string"] = createExportWrapper("msg_to_string");

/** @type {function(...*):?} */
var _pool_strdup0 = Module["_pool_strdup0"] = createExportWrapper("pool_strdup0");

/** @type {function(...*):?} */
var _pool_attach_file = Module["_pool_attach_file"] = createExportWrapper("pool_attach_file");

/** @type {function(...*):?} */
var _pool_detach_file = Module["_pool_detach_file"] = createExportWrapper("pool_detach_file");

/** @type {function(...*):?} */
var _pool_attach_temp_file = Module["_pool_attach_temp_file"] = createExportWrapper("pool_attach_temp_file");

/** @type {function(...*):?} */
var _pool_detach_temp_file = Module["_pool_detach_temp_file"] = createExportWrapper("pool_detach_temp_file");

/** @type {function(...*):?} */
var _close_temp_file = Module["_close_temp_file"] = createExportWrapper("close_temp_file");

/** @type {function(...*):?} */
var _buf_reverse = Module["_buf_reverse"] = createExportWrapper("buf_reverse");

/** @type {function(...*):?} */
var _str_copy_trunc = Module["_str_copy_trunc"] = createExportWrapper("str_copy_trunc");

/** @type {function(...*):?} */
var _ss_tail = Module["_ss_tail"] = createExportWrapper("ss_tail");

/** @type {function(...*):?} */
var _ss_alloc_uninit = Module["_ss_alloc_uninit"] = createExportWrapper("ss_alloc_uninit");

/** @type {function(...*):?} */
var _ss_alloc_substring_pool = Module["_ss_alloc_substring_pool"] = createExportWrapper("ss_alloc_substring_pool");

/** @type {function(...*):?} */
var _ss_alloc_uninit_pool = Module["_ss_alloc_uninit_pool"] = createExportWrapper("ss_alloc_uninit_pool");

/** @type {function(...*):?} */
var _ss_truncate = Module["_ss_truncate"] = createExportWrapper("ss_truncate");

/** @type {function(...*):?} */
var _ss_chomp_byte = Module["_ss_chomp_byte"] = createExportWrapper("ss_chomp_byte");

/** @type {function(...*):?} */
var _ss_last = Module["_ss_last"] = createExportWrapper("ss_last");

/** @type {function(...*):?} */
var _ss_chomp = Module["_ss_chomp"] = createExportWrapper("ss_chomp");

/** @type {function(...*):?} */
var _ss_ends_with = Module["_ss_ends_with"] = createExportWrapper("ss_ends_with");

/** @type {function(...*):?} */
var _ss_separate = Module["_ss_separate"] = createExportWrapper("ss_separate");

/** @type {function(...*):?} */
var _ss_starts_with = Module["_ss_starts_with"] = createExportWrapper("ss_starts_with");

/** @type {function(...*):?} */
var _ss_find_substring = Module["_ss_find_substring"] = createExportWrapper("ss_find_substring");

/** @type {function(...*):?} */
var _ss_compare = Module["_ss_compare"] = createExportWrapper("ss_compare");

/** @type {function(...*):?} */
var _ss_compare_case = Module["_ss_compare_case"] = createExportWrapper("ss_compare_case");

/** @type {function(...*):?} */
var _ss_pointer_to_position = Module["_ss_pointer_to_position"] = createExportWrapper("ss_pointer_to_position");

/** @type {function(...*):?} */
var _ds_init_string = Module["_ds_init_string"] = createExportWrapper("ds_init_string");

/** @type {function(...*):?} */
var _ds_unregister_pool = Module["_ds_unregister_pool"] = createExportWrapper("ds_unregister_pool");

/** @type {function(...*):?} */
var _ds_assign_string = Module["_ds_assign_string"] = createExportWrapper("ds_assign_string");

/** @type {function(...*):?} */
var _ds_head = Module["_ds_head"] = createExportWrapper("ds_head");

/** @type {function(...*):?} */
var _ds_shrink = Module["_ds_shrink"] = createExportWrapper("ds_shrink");

/** @type {function(...*):?} */
var _ds_rtrim = Module["_ds_rtrim"] = createExportWrapper("ds_rtrim");

/** @type {function(...*):?} */
var _ds_span = Module["_ds_span"] = createExportWrapper("ds_span");

/** @type {function(...*):?} */
var _ds_trim = Module["_ds_trim"] = createExportWrapper("ds_trim");

/** @type {function(...*):?} */
var _ds_separate = Module["_ds_separate"] = createExportWrapper("ds_separate");

/** @type {function(...*):?} */
var _ds_tokenize = Module["_ds_tokenize"] = createExportWrapper("ds_tokenize");

/** @type {function(...*):?} */
var _ds_rpad = Module["_ds_rpad"] = createExportWrapper("ds_rpad");

/** @type {function(...*):?} */
var _ds_remove = Module["_ds_remove"] = createExportWrapper("ds_remove");

/** @type {function(...*):?} */
var _ds_end = Module["_ds_end"] = createExportWrapper("ds_end");

/** @type {function(...*):?} */
var _ds_at = Module["_ds_at"] = createExportWrapper("ds_at");

/** @type {function(...*):?} */
var _ds_first = Module["_ds_first"] = createExportWrapper("ds_first");

/** @type {function(...*):?} */
var _ds_ends_with = Module["_ds_ends_with"] = createExportWrapper("ds_ends_with");

/** @type {function(...*):?} */
var _ds_cspan = Module["_ds_cspan"] = createExportWrapper("ds_cspan");

/** @type {function(...*):?} */
var _ds_compare = Module["_ds_compare"] = createExportWrapper("ds_compare");

/** @type {function(...*):?} */
var _ds_xstrdup = Module["_ds_xstrdup"] = createExportWrapper("ds_xstrdup");

/** @type {function(...*):?} */
var _ds_capacity = Module["_ds_capacity"] = createExportWrapper("ds_capacity");

/** @type {function(...*):?} */
var _ds_read_config_line = Module["_ds_read_config_line"] = createExportWrapper("ds_read_config_line");

/** @type {function(...*):?} */
var _ds_splice_uninit = Module["_ds_splice_uninit"] = createExportWrapper("ds_splice_uninit");

/** @type {function(...*):?} */
var _ds_put_c_vformat = Module["_ds_put_c_vformat"] = createExportWrapper("ds_put_c_vformat");

/** @type {function(...*):?} */
var _ds_put_unichar = Module["_ds_put_unichar"] = createExportWrapper("ds_put_unichar");

/** @type {function(...*):?} */
var _ds_relocate = Module["_ds_relocate"] = createExportWrapper("ds_relocate");

/** @type {function(...*):?} */
var _bitvector_allocate = Module["_bitvector_allocate"] = createExportWrapper("bitvector_allocate");

/** @type {function(...*):?} */
var _bitvector_count = Module["_bitvector_count"] = createExportWrapper("bitvector_count");

/** @type {function(...*):?} */
var _bt_delete = Module["_bt_delete"] = createExportWrapper("bt_delete");

/** @type {function(...*):?} */
var _bt_last = Module["_bt_last"] = createExportWrapper("bt_last");

/** @type {function(...*):?} */
var _bt_find = Module["_bt_find"] = createExportWrapper("bt_find");

/** @type {function(...*):?} */
var _bt_find_ge = Module["_bt_find_ge"] = createExportWrapper("bt_find_ge");

/** @type {function(...*):?} */
var _bt_find_le = Module["_bt_find_le"] = createExportWrapper("bt_find_le");

/** @type {function(...*):?} */
var _bt_prev = Module["_bt_prev"] = createExportWrapper("bt_prev");

/** @type {function(...*):?} */
var _bt_changed = Module["_bt_changed"] = createExportWrapper("bt_changed");

/** @type {function(...*):?} */
var _bt_moved = Module["_bt_moved"] = createExportWrapper("bt_moved");

/** @type {function(...*):?} */
var _deque_init_null = Module["_deque_init_null"] = createExportWrapper("deque_init_null");

/** @type {function(...*):?} */
var _encoding_guess_encoding_is_auto = Module["_encoding_guess_encoding_is_auto"] = createExportWrapper("encoding_guess_encoding_is_auto");

/** @type {function(...*):?} */
var _encoding_guess_count_ascii = Module["_encoding_guess_count_ascii"] = createExportWrapper("encoding_guess_count_ascii");

/** @type {function(...*):?} */
var _encoding_guess_head_encoding = Module["_encoding_guess_head_encoding"] = createExportWrapper("encoding_guess_head_encoding");

/** @type {function(...*):?} */
var _encoding_guess_tail_is_utf8 = Module["_encoding_guess_tail_is_utf8"] = createExportWrapper("encoding_guess_tail_is_utf8");

/** @type {function(...*):?} */
var _encoding_guess_bom_length = Module["_encoding_guess_bom_length"] = createExportWrapper("encoding_guess_bom_length");

/** @type {function(...*):?} */
var _encoding_guess_tail_encoding = Module["_encoding_guess_tail_encoding"] = createExportWrapper("encoding_guess_tail_encoding");

/** @type {function(...*):?} */
var _encoding_guess_whole_file = Module["_encoding_guess_whole_file"] = createExportWrapper("encoding_guess_whole_file");

/** @type {function(...*):?} */
var _ext_array_error = Module["_ext_array_error"] = createExportWrapper("ext_array_error");

/** @type {function(...*):?} */
var _utf8_encoding_concat_len = Module["_utf8_encoding_concat_len"] = createExportWrapper("utf8_encoding_concat_len");

/** @type {function(...*):?} */
var _filename_to_utf8 = Module["_filename_to_utf8"] = createExportWrapper("filename_to_utf8");

/** @type {function(...*):?} */
var _libiconv = Module["_libiconv"] = createExportWrapper("libiconv");

/** @type {function(...*):?} */
var _bindtextdomain = Module["_bindtextdomain"] = createExportWrapper("bindtextdomain");

/** @type {function(...*):?} */
var _textdomain = Module["_textdomain"] = createExportWrapper("textdomain");

/** @type {function(...*):?} */
var _get_language = Module["_get_language"] = createExportWrapper("get_language");

/** @type {function(...*):?} */
var _libiconv_close = Module["_libiconv_close"] = createExportWrapper("libiconv_close");

/** @type {function(...*):?} */
var _libiconv_open = Module["_libiconv_open"] = createExportWrapper("libiconv_open");

/** @type {function(...*):?} */
var _is_encoding_supported = Module["_is_encoding_supported"] = createExportWrapper("is_encoding_supported");

/** @type {function(...*):?} */
var _get_encoding_categories = Module["_get_encoding_categories"] = createExportWrapper("get_encoding_categories");

/** @type {function(...*):?} */
var _get_n_encoding_categories = Module["_get_n_encoding_categories"] = createExportWrapper("get_n_encoding_categories");

/** @type {function(...*):?} */
var _is_interned_string = Module["_is_interned_string"] = createExportWrapper("is_interned_string");

/** @type {function(...*):?} */
var _line_reader_for_file = Module["_line_reader_for_file"] = createExportWrapper("line_reader_for_file");

/** @type {function(...*):?} */
var _line_reader_close = Module["_line_reader_close"] = createExportWrapper("line_reader_close");

/** @type {function(...*):?} */
var _line_reader_fileno = Module["_line_reader_fileno"] = createExportWrapper("line_reader_fileno");

/** @type {function(...*):?} */
var _line_reader_tell = Module["_line_reader_tell"] = createExportWrapper("line_reader_tell");

/** @type {function(...*):?} */
var _line_reader_eof = Module["_line_reader_eof"] = createExportWrapper("line_reader_eof");

/** @type {function(...*):?} */
var _ll_count_range = Module["_ll_count_range"] = createExportWrapper("ll_count_range");

/** @type {function(...*):?} */
var _ll_splice = Module["_ll_splice"] = createExportWrapper("ll_splice");

/** @type {function(...*):?} */
var _ll_swap = Module["_ll_swap"] = createExportWrapper("ll_swap");

/** @type {function(...*):?} */
var _ll_swap_range = Module["_ll_swap_range"] = createExportWrapper("ll_swap_range");

/** @type {function(...*):?} */
var _ll_remove_equal = Module["_ll_remove_equal"] = createExportWrapper("ll_remove_equal");

/** @type {function(...*):?} */
var _ll_remove_if = Module["_ll_remove_if"] = createExportWrapper("ll_remove_if");

/** @type {function(...*):?} */
var _ll_find_equal = Module["_ll_find_equal"] = createExportWrapper("ll_find_equal");

/** @type {function(...*):?} */
var _ll_find_if = Module["_ll_find_if"] = createExportWrapper("ll_find_if");

/** @type {function(...*):?} */
var _ll_find_adjacent_equal = Module["_ll_find_adjacent_equal"] = createExportWrapper("ll_find_adjacent_equal");

/** @type {function(...*):?} */
var _ll_count_equal = Module["_ll_count_equal"] = createExportWrapper("ll_count_equal");

/** @type {function(...*):?} */
var _ll_count_if = Module["_ll_count_if"] = createExportWrapper("ll_count_if");

/** @type {function(...*):?} */
var _ll_max = Module["_ll_max"] = createExportWrapper("ll_max");

/** @type {function(...*):?} */
var _ll_min = Module["_ll_min"] = createExportWrapper("ll_min");

/** @type {function(...*):?} */
var _ll_lexicographical_compare_3way = Module["_ll_lexicographical_compare_3way"] = createExportWrapper("ll_lexicographical_compare_3way");

/** @type {function(...*):?} */
var _ll_apply = Module["_ll_apply"] = createExportWrapper("ll_apply");

/** @type {function(...*):?} */
var _ll_reverse = Module["_ll_reverse"] = createExportWrapper("ll_reverse");

/** @type {function(...*):?} */
var _ll_next_permutation = Module["_ll_next_permutation"] = createExportWrapper("ll_next_permutation");

/** @type {function(...*):?} */
var _ll_prev_permutation = Module["_ll_prev_permutation"] = createExportWrapper("ll_prev_permutation");

/** @type {function(...*):?} */
var _ll_sort = Module["_ll_sort"] = createExportWrapper("ll_sort");

/** @type {function(...*):?} */
var _ll_merge = Module["_ll_merge"] = createExportWrapper("ll_merge");

/** @type {function(...*):?} */
var _ll_find_run = Module["_ll_find_run"] = createExportWrapper("ll_find_run");

/** @type {function(...*):?} */
var _ll_is_sorted = Module["_ll_is_sorted"] = createExportWrapper("ll_is_sorted");

/** @type {function(...*):?} */
var _ll_unique = Module["_ll_unique"] = createExportWrapper("ll_unique");

/** @type {function(...*):?} */
var _ll_sort_unique = Module["_ll_sort_unique"] = createExportWrapper("ll_sort_unique");

/** @type {function(...*):?} */
var _ll_insert_ordered = Module["_ll_insert_ordered"] = createExportWrapper("ll_insert_ordered");

/** @type {function(...*):?} */
var _ll_partition = Module["_ll_partition"] = createExportWrapper("ll_partition");

/** @type {function(...*):?} */
var _ll_find_partition = Module["_ll_find_partition"] = createExportWrapper("ll_find_partition");

/** @type {function(...*):?} */
var _llx_destroy = Module["_llx_destroy"] = createExportWrapper("llx_destroy");

/** @type {function(...*):?} */
var _llx_count = Module["_llx_count"] = createExportWrapper("llx_count");

/** @type {function(...*):?} */
var _llx_count_range = Module["_llx_count_range"] = createExportWrapper("llx_count_range");

/** @type {function(...*):?} */
var _llx_push_head = Module["_llx_push_head"] = createExportWrapper("llx_push_head");

/** @type {function(...*):?} */
var _llx_insert = Module["_llx_insert"] = createExportWrapper("llx_insert");

/** @type {function(...*):?} */
var _llx_push_tail = Module["_llx_push_tail"] = createExportWrapper("llx_push_tail");

/** @type {function(...*):?} */
var _llx_pop_head = Module["_llx_pop_head"] = createExportWrapper("llx_pop_head");

/** @type {function(...*):?} */
var _llx_remove = Module["_llx_remove"] = createExportWrapper("llx_remove");

/** @type {function(...*):?} */
var _llx_pop_tail = Module["_llx_pop_tail"] = createExportWrapper("llx_pop_tail");

/** @type {function(...*):?} */
var _llx_splice = Module["_llx_splice"] = createExportWrapper("llx_splice");

/** @type {function(...*):?} */
var _llx_swap = Module["_llx_swap"] = createExportWrapper("llx_swap");

/** @type {function(...*):?} */
var _llx_swap_range = Module["_llx_swap_range"] = createExportWrapper("llx_swap_range");

/** @type {function(...*):?} */
var _llx_remove_range = Module["_llx_remove_range"] = createExportWrapper("llx_remove_range");

/** @type {function(...*):?} */
var _llx_remove_equal = Module["_llx_remove_equal"] = createExportWrapper("llx_remove_equal");

/** @type {function(...*):?} */
var _llx_remove_if = Module["_llx_remove_if"] = createExportWrapper("llx_remove_if");

/** @type {function(...*):?} */
var _llx_find = Module["_llx_find"] = createExportWrapper("llx_find");

/** @type {function(...*):?} */
var _llx_find_equal = Module["_llx_find_equal"] = createExportWrapper("llx_find_equal");

/** @type {function(...*):?} */
var _llx_find_if = Module["_llx_find_if"] = createExportWrapper("llx_find_if");

/** @type {function(...*):?} */
var _llx_find_adjacent_equal = Module["_llx_find_adjacent_equal"] = createExportWrapper("llx_find_adjacent_equal");

/** @type {function(...*):?} */
var _llx_count_equal = Module["_llx_count_equal"] = createExportWrapper("llx_count_equal");

/** @type {function(...*):?} */
var _llx_count_if = Module["_llx_count_if"] = createExportWrapper("llx_count_if");

/** @type {function(...*):?} */
var _llx_max = Module["_llx_max"] = createExportWrapper("llx_max");

/** @type {function(...*):?} */
var _llx_min = Module["_llx_min"] = createExportWrapper("llx_min");

/** @type {function(...*):?} */
var _llx_lexicographical_compare_3way = Module["_llx_lexicographical_compare_3way"] = createExportWrapper("llx_lexicographical_compare_3way");

/** @type {function(...*):?} */
var _llx_apply = Module["_llx_apply"] = createExportWrapper("llx_apply");

/** @type {function(...*):?} */
var _llx_reverse = Module["_llx_reverse"] = createExportWrapper("llx_reverse");

/** @type {function(...*):?} */
var _llx_next_permutation = Module["_llx_next_permutation"] = createExportWrapper("llx_next_permutation");

/** @type {function(...*):?} */
var _llx_prev_permutation = Module["_llx_prev_permutation"] = createExportWrapper("llx_prev_permutation");

/** @type {function(...*):?} */
var _llx_sort = Module["_llx_sort"] = createExportWrapper("llx_sort");

/** @type {function(...*):?} */
var _llx_find_run = Module["_llx_find_run"] = createExportWrapper("llx_find_run");

/** @type {function(...*):?} */
var _llx_merge = Module["_llx_merge"] = createExportWrapper("llx_merge");

/** @type {function(...*):?} */
var _llx_is_sorted = Module["_llx_is_sorted"] = createExportWrapper("llx_is_sorted");

/** @type {function(...*):?} */
var _llx_unique = Module["_llx_unique"] = createExportWrapper("llx_unique");

/** @type {function(...*):?} */
var _llx_sort_unique = Module["_llx_sort_unique"] = createExportWrapper("llx_sort_unique");

/** @type {function(...*):?} */
var _llx_insert_ordered = Module["_llx_insert_ordered"] = createExportWrapper("llx_insert_ordered");

/** @type {function(...*):?} */
var _llx_partition = Module["_llx_partition"] = createExportWrapper("llx_partition");

/** @type {function(...*):?} */
var _llx_find_partition = Module["_llx_find_partition"] = createExportWrapper("llx_find_partition");

/** @type {function(...*):?} */
var _prompt_style_to_string = Module["_prompt_style_to_string"] = createExportWrapper("prompt_style_to_string");

/** @type {function(...*):?} */
var _range_map_init = Module["_range_map_init"] = createExportWrapper("range_map_init");

/** @type {function(...*):?} */
var _range_map_is_empty = Module["_range_map_is_empty"] = createExportWrapper("range_map_is_empty");

/** @type {function(...*):?} */
var _range_map_insert = Module["_range_map_insert"] = createExportWrapper("range_map_insert");

/** @type {function(...*):?} */
var _range_map_delete = Module["_range_map_delete"] = createExportWrapper("range_map_delete");

/** @type {function(...*):?} */
var _range_map_lookup = Module["_range_map_lookup"] = createExportWrapper("range_map_lookup");

/** @type {function(...*):?} */
var _range_map_first = Module["_range_map_first"] = createExportWrapper("range_map_first");

/** @type {function(...*):?} */
var _range_map_next = Module["_range_map_next"] = createExportWrapper("range_map_next");

/** @type {function(...*):?} */
var _range_set_create_pool = Module["_range_set_create_pool"] = createExportWrapper("range_set_create_pool");

/** @type {function(...*):?} */
var _range_set_contains = Module["_range_set_contains"] = createExportWrapper("range_set_contains");

/** @type {function(...*):?} */
var _range_set_scan = Module["_range_set_scan"] = createExportWrapper("range_set_scan");

/** @type {function(...*):?} */
var _range_tower_node_get_start = Module["_range_tower_node_get_start"] = createExportWrapper("range_tower_node_get_start");

/** @type {function(...*):?} */
var _range_tower_node_get_end = Module["_range_tower_node_get_end"] = createExportWrapper("range_tower_node_get_end");

/** @type {function(...*):?} */
var _range_tower_create = Module["_range_tower_create"] = createExportWrapper("range_tower_create");

/** @type {function(...*):?} */
var _range_tower_create_pool = Module["_range_tower_create_pool"] = createExportWrapper("range_tower_create_pool");

/** @type {function(...*):?} */
var _range_tower_clone = Module["_range_tower_clone"] = createExportWrapper("range_tower_clone");

/** @type {function(...*):?} */
var _range_tower_destroy = Module["_range_tower_destroy"] = createExportWrapper("range_tower_destroy");

/** @type {function(...*):?} */
var _range_tower_set1 = Module["_range_tower_set1"] = createExportWrapper("range_tower_set1");

/** @type {function(...*):?} */
var _range_tower_lookup = Module["_range_tower_lookup"] = createExportWrapper("range_tower_lookup");

/** @type {function(...*):?} */
var _range_tower_set0 = Module["_range_tower_set0"] = createExportWrapper("range_tower_set0");

/** @type {function(...*):?} */
var _range_tower_delete = Module["_range_tower_delete"] = createExportWrapper("range_tower_delete");

/** @type {function(...*):?} */
var _range_tower_insert0 = Module["_range_tower_insert0"] = createExportWrapper("range_tower_insert0");

/** @type {function(...*):?} */
var _range_tower_insert1 = Module["_range_tower_insert1"] = createExportWrapper("range_tower_insert1");

/** @type {function(...*):?} */
var _range_tower_move = Module["_range_tower_move"] = createExportWrapper("range_tower_move");

/** @type {function(...*):?} */
var _range_tower_contains = Module["_range_tower_contains"] = createExportWrapper("range_tower_contains");

/** @type {function(...*):?} */
var _range_tower_scan = Module["_range_tower_scan"] = createExportWrapper("range_tower_scan");

/** @type {function(...*):?} */
var _sparse_array_create = Module["_sparse_array_create"] = createExportWrapper("sparse_array_create");

/** @type {function(...*):?} */
var _sparse_array_create_pool = Module["_sparse_array_create_pool"] = createExportWrapper("sparse_array_create_pool");

/** @type {function(...*):?} */
var _sparse_array_destroy = Module["_sparse_array_destroy"] = createExportWrapper("sparse_array_destroy");

/** @type {function(...*):?} */
var _sparse_array_count = Module["_sparse_array_count"] = createExportWrapper("sparse_array_count");

/** @type {function(...*):?} */
var _sparse_array_insert = Module["_sparse_array_insert"] = createExportWrapper("sparse_array_insert");

/** @type {function(...*):?} */
var _sparse_array_get = Module["_sparse_array_get"] = createExportWrapper("sparse_array_get");

/** @type {function(...*):?} */
var _sparse_array_remove = Module["_sparse_array_remove"] = createExportWrapper("sparse_array_remove");

/** @type {function(...*):?} */
var _sparse_array_first = Module["_sparse_array_first"] = createExportWrapper("sparse_array_first");

/** @type {function(...*):?} */
var _sparse_array_next = Module["_sparse_array_next"] = createExportWrapper("sparse_array_next");

/** @type {function(...*):?} */
var _sparse_array_last = Module["_sparse_array_last"] = createExportWrapper("sparse_array_last");

/** @type {function(...*):?} */
var _sparse_array_prev = Module["_sparse_array_prev"] = createExportWrapper("sparse_array_prev");

/** @type {function(...*):?} */
var _sparse_xarray_get_n_rows = Module["_sparse_xarray_get_n_rows"] = createExportWrapper("sparse_xarray_get_n_rows");

/** @type {function(...*):?} */
var _sparse_xarray_model_checker_hash = Module["_sparse_xarray_model_checker_hash"] = createExportWrapper("sparse_xarray_model_checker_hash");

/** @type {function(...*):?} */
var _string_array_swap = Module["_string_array_swap"] = createExportWrapper("string_array_swap");

/** @type {function(...*):?} */
var _string_array_contains = Module["_string_array_contains"] = createExportWrapper("string_array_contains");

/** @type {function(...*):?} */
var _string_array_find = Module["_string_array_find"] = createExportWrapper("string_array_find");

/** @type {function(...*):?} */
var _string_array_insert_nocopy = Module["_string_array_insert_nocopy"] = createExportWrapper("string_array_insert_nocopy");

/** @type {function(...*):?} */
var _string_array_insert = Module["_string_array_insert"] = createExportWrapper("string_array_insert");

/** @type {function(...*):?} */
var _string_array_delete = Module["_string_array_delete"] = createExportWrapper("string_array_delete");

/** @type {function(...*):?} */
var _string_array_delete_nofree = Module["_string_array_delete_nofree"] = createExportWrapper("string_array_delete_nofree");

/** @type {function(...*):?} */
var _string_array_shrink = Module["_string_array_shrink"] = createExportWrapper("string_array_shrink");

/** @type {function(...*):?} */
var _string_array_parse = Module["_string_array_parse"] = createExportWrapper("string_array_parse");

/** @type {function(...*):?} */
var _string_map_node_swap_value = Module["_string_map_node_swap_value"] = createExportWrapper("string_map_node_swap_value");

/** @type {function(...*):?} */
var _string_map_node_swap_value_nocopy = Module["_string_map_node_swap_value_nocopy"] = createExportWrapper("string_map_node_swap_value_nocopy");

/** @type {function(...*):?} */
var _string_map_node_set_value = Module["_string_map_node_set_value"] = createExportWrapper("string_map_node_set_value");

/** @type {function(...*):?} */
var _string_map_node_set_value_nocopy = Module["_string_map_node_set_value_nocopy"] = createExportWrapper("string_map_node_set_value_nocopy");

/** @type {function(...*):?} */
var _string_map_node_destroy = Module["_string_map_node_destroy"] = createExportWrapper("string_map_node_destroy");

/** @type {function(...*):?} */
var _string_map_clone = Module["_string_map_clone"] = createExportWrapper("string_map_clone");

/** @type {function(...*):?} */
var _string_map_swap = Module["_string_map_swap"] = createExportWrapper("string_map_swap");

/** @type {function(...*):?} */
var _string_map_contains = Module["_string_map_contains"] = createExportWrapper("string_map_contains");

/** @type {function(...*):?} */
var _string_map_find_node = Module["_string_map_find_node"] = createExportWrapper("string_map_find_node");

/** @type {function(...*):?} */
var _string_map_find__ = Module["_string_map_find__"] = createExportWrapper("string_map_find__");

/** @type {function(...*):?} */
var _string_map_find_node__ = Module["_string_map_find_node__"] = createExportWrapper("string_map_find_node__");

/** @type {function(...*):?} */
var _string_map_find = Module["_string_map_find"] = createExportWrapper("string_map_find");

/** @type {function(...*):?} */
var _string_map_find_and_delete = Module["_string_map_find_and_delete"] = createExportWrapper("string_map_find_and_delete");

/** @type {function(...*):?} */
var _string_map_delete_node = Module["_string_map_delete_node"] = createExportWrapper("string_map_delete_node");

/** @type {function(...*):?} */
var _string_map_insert_nocopy = Module["_string_map_insert_nocopy"] = createExportWrapper("string_map_insert_nocopy");

/** @type {function(...*):?} */
var _string_map_replace = Module["_string_map_replace"] = createExportWrapper("string_map_replace");

/** @type {function(...*):?} */
var _string_map_replace_nocopy = Module["_string_map_replace_nocopy"] = createExportWrapper("string_map_replace_nocopy");

/** @type {function(...*):?} */
var _string_map_delete = Module["_string_map_delete"] = createExportWrapper("string_map_delete");

/** @type {function(...*):?} */
var _string_map_delete_nofree = Module["_string_map_delete_nofree"] = createExportWrapper("string_map_delete_nofree");

/** @type {function(...*):?} */
var _string_map_insert_map = Module["_string_map_insert_map"] = createExportWrapper("string_map_insert_map");

/** @type {function(...*):?} */
var _string_map_replace_map = Module["_string_map_replace_map"] = createExportWrapper("string_map_replace_map");

/** @type {function(...*):?} */
var _string_map_get_keys = Module["_string_map_get_keys"] = createExportWrapper("string_map_get_keys");

/** @type {function(...*):?} */
var _string_map_get_values = Module["_string_map_get_values"] = createExportWrapper("string_map_get_values");

/** @type {function(...*):?} */
var _string_map_equals = Module["_string_map_equals"] = createExportWrapper("string_map_equals");

/** @type {function(...*):?} */
var _string_set_clone = Module["_string_set_clone"] = createExportWrapper("string_set_clone");

/** @type {function(...*):?} */
var _string_set_swap = Module["_string_set_swap"] = createExportWrapper("string_set_swap");

/** @type {function(...*):?} */
var _string_set_delete_node = Module["_string_set_delete_node"] = createExportWrapper("string_set_delete_node");

/** @type {function(...*):?} */
var _string_set_delete_nofree = Module["_string_set_delete_nofree"] = createExportWrapper("string_set_delete_nofree");

/** @type {function(...*):?} */
var _string_set_union = Module["_string_set_union"] = createExportWrapper("string_set_union");

/** @type {function(...*):?} */
var _string_set_union_and_intersection = Module["_string_set_union_and_intersection"] = createExportWrapper("string_set_union_and_intersection");

/** @type {function(...*):?} */
var _string_set_intersect = Module["_string_set_intersect"] = createExportWrapper("string_set_intersect");

/** @type {function(...*):?} */
var _string_set_subtract = Module["_string_set_subtract"] = createExportWrapper("string_set_subtract");

/** @type {function(...*):?} */
var _stringi_map_node_swap_value = Module["_stringi_map_node_swap_value"] = createExportWrapper("stringi_map_node_swap_value");

/** @type {function(...*):?} */
var _stringi_map_node_swap_value_nocopy = Module["_stringi_map_node_swap_value_nocopy"] = createExportWrapper("stringi_map_node_swap_value_nocopy");

/** @type {function(...*):?} */
var _stringi_map_node_set_value = Module["_stringi_map_node_set_value"] = createExportWrapper("stringi_map_node_set_value");

/** @type {function(...*):?} */
var _stringi_map_node_set_value_nocopy = Module["_stringi_map_node_set_value_nocopy"] = createExportWrapper("stringi_map_node_set_value_nocopy");

/** @type {function(...*):?} */
var _stringi_map_node_destroy = Module["_stringi_map_node_destroy"] = createExportWrapper("stringi_map_node_destroy");

/** @type {function(...*):?} */
var _stringi_map_clone = Module["_stringi_map_clone"] = createExportWrapper("stringi_map_clone");

/** @type {function(...*):?} */
var _stringi_map_swap = Module["_stringi_map_swap"] = createExportWrapper("stringi_map_swap");

/** @type {function(...*):?} */
var _stringi_map_clear = Module["_stringi_map_clear"] = createExportWrapper("stringi_map_clear");

/** @type {function(...*):?} */
var _stringi_map_contains = Module["_stringi_map_contains"] = createExportWrapper("stringi_map_contains");

/** @type {function(...*):?} */
var _stringi_map_find_node = Module["_stringi_map_find_node"] = createExportWrapper("stringi_map_find_node");

/** @type {function(...*):?} */
var _stringi_map_find_and_delete = Module["_stringi_map_find_and_delete"] = createExportWrapper("stringi_map_find_and_delete");

/** @type {function(...*):?} */
var _stringi_map_delete_node = Module["_stringi_map_delete_node"] = createExportWrapper("stringi_map_delete_node");

/** @type {function(...*):?} */
var _stringi_map_insert_nocopy = Module["_stringi_map_insert_nocopy"] = createExportWrapper("stringi_map_insert_nocopy");

/** @type {function(...*):?} */
var _stringi_map_replace = Module["_stringi_map_replace"] = createExportWrapper("stringi_map_replace");

/** @type {function(...*):?} */
var _stringi_map_replace_nocopy = Module["_stringi_map_replace_nocopy"] = createExportWrapper("stringi_map_replace_nocopy");

/** @type {function(...*):?} */
var _stringi_map_delete = Module["_stringi_map_delete"] = createExportWrapper("stringi_map_delete");

/** @type {function(...*):?} */
var _stringi_map_delete_nofree = Module["_stringi_map_delete_nofree"] = createExportWrapper("stringi_map_delete_nofree");

/** @type {function(...*):?} */
var _stringi_map_insert_map = Module["_stringi_map_insert_map"] = createExportWrapper("stringi_map_insert_map");

/** @type {function(...*):?} */
var _stringi_map_replace_map = Module["_stringi_map_replace_map"] = createExportWrapper("stringi_map_replace_map");

/** @type {function(...*):?} */
var _stringi_map_get_keys = Module["_stringi_map_get_keys"] = createExportWrapper("stringi_map_get_keys");

/** @type {function(...*):?} */
var _stringi_map_get_values = Module["_stringi_map_get_values"] = createExportWrapper("stringi_map_get_values");

/** @type {function(...*):?} */
var _stringi_set_clone = Module["_stringi_set_clone"] = createExportWrapper("stringi_set_clone");

/** @type {function(...*):?} */
var _stringi_set_swap = Module["_stringi_set_swap"] = createExportWrapper("stringi_set_swap");

/** @type {function(...*):?} */
var _stringi_set_clear = Module["_stringi_set_clear"] = createExportWrapper("stringi_set_clear");

/** @type {function(...*):?} */
var _stringi_set_contains = Module["_stringi_set_contains"] = createExportWrapper("stringi_set_contains");

/** @type {function(...*):?} */
var _stringi_set_find_node = Module["_stringi_set_find_node"] = createExportWrapper("stringi_set_find_node");

/** @type {function(...*):?} */
var _stringi_set_insert_nocopy = Module["_stringi_set_insert_nocopy"] = createExportWrapper("stringi_set_insert_nocopy");

/** @type {function(...*):?} */
var _stringi_set_delete = Module["_stringi_set_delete"] = createExportWrapper("stringi_set_delete");

/** @type {function(...*):?} */
var _stringi_set_delete_node = Module["_stringi_set_delete_node"] = createExportWrapper("stringi_set_delete_node");

/** @type {function(...*):?} */
var _stringi_set_delete_nofree = Module["_stringi_set_delete_nofree"] = createExportWrapper("stringi_set_delete_nofree");

/** @type {function(...*):?} */
var _stringi_set_union = Module["_stringi_set_union"] = createExportWrapper("stringi_set_union");

/** @type {function(...*):?} */
var _stringi_set_union_and_intersection = Module["_stringi_set_union_and_intersection"] = createExportWrapper("stringi_set_union_and_intersection");

/** @type {function(...*):?} */
var _stringi_set_intersect = Module["_stringi_set_intersect"] = createExportWrapper("stringi_set_intersect");

/** @type {function(...*):?} */
var _stringi_set_subtract = Module["_stringi_set_subtract"] = createExportWrapper("stringi_set_subtract");

/** @type {function(...*):?} */
var _stringi_set_get_array = Module["_stringi_set_get_array"] = createExportWrapper("stringi_set_get_array");

/** @type {function(...*):?} */
var _tower_node_get_level = Module["_tower_node_get_level"] = createExportWrapper("tower_node_get_level");

/** @type {function(...*):?} */
var _tower_node_get_index = Module["_tower_node_get_index"] = createExportWrapper("tower_node_get_index");

/** @type {function(...*):?} */
var _tower_count = Module["_tower_count"] = createExportWrapper("tower_count");

/** @type {function(...*):?} */
var _tower_get = Module["_tower_get"] = createExportWrapper("tower_get");

/** @type {function(...*):?} */
var _u8_istream_is_auto = Module["_u8_istream_is_auto"] = createExportWrapper("u8_istream_is_auto");

/** @type {function(...*):?} */
var _u8_istream_is_utf8 = Module["_u8_istream_is_utf8"] = createExportWrapper("u8_istream_is_utf8");

/** @type {function(...*):?} */
var _u8_line_clear = Module["_u8_line_clear"] = createExportWrapper("u8_line_clear");

/** @type {function(...*):?} */
var _zip_member_read_all = Module["_zip_member_read_all"] = createExportWrapper("zip_member_read_all");

/** @type {function(...*):?} */
var _zip_reader_get_member_name = Module["_zip_reader_get_member_name"] = createExportWrapper("zip_reader_get_member_name");

/** @type {function(...*):?} */
var _zip_reader_contains_member = Module["_zip_reader_contains_member"] = createExportWrapper("zip_reader_contains_member");

/** @type {function(...*):?} */
var _zError = Module["_zError"] = createExportWrapper("zError");

/** @type {function(...*):?} */
var _zip_writer_create = Module["_zip_writer_create"] = createExportWrapper("zip_writer_create");

/** @type {function(...*):?} */
var _zip_writer_add = Module["_zip_writer_add"] = createExportWrapper("zip_writer_add");

/** @type {function(...*):?} */
var _zip_writer_add_string = Module["_zip_writer_add_string"] = createExportWrapper("zip_writer_add_string");

/** @type {function(...*):?} */
var _zip_writer_add_memory = Module["_zip_writer_add_memory"] = createExportWrapper("zip_writer_add_memory");

/** @type {function(...*):?} */
var _zip_writer_close = Module["_zip_writer_close"] = createExportWrapper("zip_writer_close");

/** @type {function(...*):?} */
var _box_whisker_whiskers = Module["_box_whisker_whiskers"] = createExportWrapper("box_whisker_whiskers");

/** @type {function(...*):?} */
var _box_whisker_hinges = Module["_box_whisker_hinges"] = createExportWrapper("box_whisker_hinges");

/** @type {function(...*):?} */
var _box_whisker_outliers = Module["_box_whisker_outliers"] = createExportWrapper("box_whisker_outliers");

/** @type {function(...*):?} */
var _interaction_case_is_missing = Module["_interaction_case_is_missing"] = createExportWrapper("interaction_case_is_missing");

/** @type {function(...*):?} */
var _interaction_case_hash = Module["_interaction_case_hash"] = createExportWrapper("interaction_case_hash");

/** @type {function(...*):?} */
var _interaction_case_equal = Module["_interaction_case_equal"] = createExportWrapper("interaction_case_equal");

/** @type {function(...*):?} */
var _interaction_case_cmp_3way = Module["_interaction_case_cmp_3way"] = createExportWrapper("interaction_case_cmp_3way");

/** @type {function(...*):?} */
var _categoricals_get_effects_code_for_case = Module["_categoricals_get_effects_code_for_case"] = createExportWrapper("categoricals_get_effects_code_for_case");

/** @type {function(...*):?} */
var _categoricals_get_weight_by_subscript = Module["_categoricals_get_weight_by_subscript"] = createExportWrapper("categoricals_get_weight_by_subscript");

/** @type {function(...*):?} */
var _categoricals_get_sum_by_subscript = Module["_categoricals_get_sum_by_subscript"] = createExportWrapper("categoricals_get_sum_by_subscript");

/** @type {function(...*):?} */
var _chart_get_scale = Module["_chart_get_scale"] = createExportWrapper("chart_get_scale");

/** @type {function(...*):?} */
var _chart_get_ticks_format = Module["_chart_get_ticks_format"] = createExportWrapper("chart_get_ticks_format");

/** @type {function(...*):?} */
var _fmax = Module["_fmax"] = createExportWrapper("fmax");

/** @type {function(...*):?} */
var _extrema_create = Module["_extrema_create"] = createExportWrapper("extrema_create");

/** @type {function(...*):?} */
var _extrema_destroy = Module["_extrema_destroy"] = createExportWrapper("extrema_destroy");

/** @type {function(...*):?} */
var _extrema_add = Module["_extrema_add"] = createExportWrapper("extrema_add");

/** @type {function(...*):?} */
var _extrema_list = Module["_extrema_list"] = createExportWrapper("extrema_list");

/** @type {function(...*):?} */
var _extrema_top = Module["_extrema_top"] = createExportWrapper("extrema_top");

/** @type {function(...*):?} */
var _interaction_clone = Module["_interaction_clone"] = createExportWrapper("interaction_clone");

/** @type {function(...*):?} */
var _interaction_is_proper_subset = Module["_interaction_is_proper_subset"] = createExportWrapper("interaction_is_proper_subset");

/** @type {function(...*):?} */
var _interaction_dump = Module["_interaction_dump"] = createExportWrapper("interaction_dump");

/** @type {function(...*):?} */
var _linreg_get_vars = Module["_linreg_get_vars"] = createExportWrapper("linreg_get_vars");

/** @type {function(...*):?} */
var _linreg_ref = Module["_linreg_ref"] = createExportWrapper("linreg_ref");

/** @type {function(...*):?} */
var _linreg_get_indep_variable_mean = Module["_linreg_get_indep_variable_mean"] = createExportWrapper("linreg_get_indep_variable_mean");

/** @type {function(...*):?} */
var _linreg_n_indeps = Module["_linreg_n_indeps"] = createExportWrapper("linreg_n_indeps");

/** @type {function(...*):?} */
var _linreg_get_depvar_mean = Module["_linreg_get_depvar_mean"] = createExportWrapper("linreg_get_depvar_mean");

/** @type {function(...*):?} */
var _merge_create = Module["_merge_create"] = createExportWrapper("merge_create");

/** @type {function(...*):?} */
var _merge_destroy = Module["_merge_destroy"] = createExportWrapper("merge_destroy");

/** @type {function(...*):?} */
var _merge_append = Module["_merge_append"] = createExportWrapper("merge_append");

/** @type {function(...*):?} */
var _merge_make_reader = Module["_merge_make_reader"] = createExportWrapper("merge_make_reader");

/** @type {function(...*):?} */
var _moments_of_values = Module["_moments_of_values"] = createExportWrapper("moments_of_values");

/** @type {function(...*):?} */
var _output_driver_init = Module["_output_driver_init"] = createExportWrapper("output_driver_init");

/** @type {function(...*):?} */
var _driver_option_get = Module["_driver_option_get"] = createExportWrapper("driver_option_get");

/** @type {function(...*):?} */
var _parse_boolean = Module["_parse_boolean"] = createExportWrapper("parse_boolean");

/** @type {function(...*):?} */
var _parse_chart_file_name = Module["_parse_chart_file_name"] = createExportWrapper("parse_chart_file_name");

/** @type {function(...*):?} */
var _isatty = Module["_isatty"] = createExportWrapper("isatty");

/** @type {function(...*):?} */
var _atol = Module["_atol"] = createExportWrapper("atol");

/** @type {function(...*):?} */
var _driver_option_destroy = Module["_driver_option_destroy"] = createExportWrapper("driver_option_destroy");

/** @type {function(...*):?} */
var _parse_int = Module["_parse_int"] = createExportWrapper("parse_int");

/** @type {function(...*):?} */
var _parse_enum = Module["_parse_enum"] = createExportWrapper("parse_enum");

/** @type {function(...*):?} */
var _render_direction_rtl = Module["_render_direction_rtl"] = createExportWrapper("render_direction_rtl");

/** @type {function(...*):?} */
var _output_driver_destroy = Module["_output_driver_destroy"] = createExportWrapper("output_driver_destroy");

/** @type {function(...*):?} */
var _ascii_test_write = Module["_ascii_test_write"] = createExportWrapper("ascii_test_write");

/** @type {function(...*):?} */
var _output_get_text_from_markup = Module["_output_get_text_from_markup"] = createExportWrapper("output_get_text_from_markup");

/** @type {function(...*):?} */
var _table_halign_interpret = Module["_table_halign_interpret"] = createExportWrapper("table_halign_interpret");

/** @type {function(...*):?} */
var _ascii_test_set_length = Module["_ascii_test_set_length"] = createExportWrapper("ascii_test_set_length");

/** @type {function(...*):?} */
var _ascii_test_flush = Module["_ascii_test_flush"] = createExportWrapper("ascii_test_flush");

/** @type {function(...*):?} */
var _ioctl = Module["_ioctl"] = createExportWrapper("ioctl");

/** @type {function(...*):?} */
var _text_item_get_type = Module["_text_item_get_type"] = createExportWrapper("text_item_get_type");

/** @type {function(...*):?} */
var _output_item_ref = Module["_output_item_ref"] = createExportWrapper("output_item_ref");

/** @type {function(...*):?} */
var _text_item_to_table_item = Module["_text_item_to_table_item"] = createExportWrapper("text_item_to_table_item");

/** @type {function(...*):?} */
var _message_item_get_msg = Module["_message_item_get_msg"] = createExportWrapper("message_item_get_msg");

/** @type {function(...*):?} */
var _table_from_string = Module["_table_from_string"] = createExportWrapper("table_from_string");

/** @type {function(...*):?} */
var _table_item_create = Module["_table_item_create"] = createExportWrapper("table_item_create");

/** @type {function(...*):?} */
var _render_pager_create = Module["_render_pager_create"] = createExportWrapper("render_pager_create");

/** @type {function(...*):?} */
var _render_pager_has_next = Module["_render_pager_has_next"] = createExportWrapper("render_pager_has_next");

/** @type {function(...*):?} */
var _render_pager_draw_next = Module["_render_pager_draw_next"] = createExportWrapper("render_pager_draw_next");

/** @type {function(...*):?} */
var _render_pager_destroy = Module["_render_pager_destroy"] = createExportWrapper("render_pager_destroy");

/** @type {function(...*):?} */
var _chart_item_init = Module["_chart_item_init"] = createExportWrapper("chart_item_init");

/** @type {function(...*):?} */
var _output_item_init = Module["_output_item_init"] = createExportWrapper("output_item_init");

/** @type {function(...*):?} */
var _chart_item_get_title = Module["_chart_item_get_title"] = createExportWrapper("chart_item_get_title");

/** @type {function(...*):?} */
var _chart_item_set_title = Module["_chart_item_set_title"] = createExportWrapper("chart_item_set_title");

/** @type {function(...*):?} */
var _output_item_is_shared = Module["_output_item_is_shared"] = createExportWrapper("output_item_is_shared");

/** @type {function(...*):?} */
var _output_submit = Module["_output_submit"] = createExportWrapper("output_submit");

/** @type {function(...*):?} */
var _parse_string = Module["_parse_string"] = createExportWrapper("parse_string");

/** @type {function(...*):?} */
var _table_item_get_table = Module["_table_item_get_table"] = createExportWrapper("table_item_get_table");

/** @type {function(...*):?} */
var _table_item_get_title = Module["_table_item_get_title"] = createExportWrapper("table_item_get_title");

/** @type {function(...*):?} */
var _table_get_cell = Module["_table_get_cell"] = createExportWrapper("table_get_cell");

/** @type {function(...*):?} */
var _table_item_get_caption = Module["_table_item_get_caption"] = createExportWrapper("table_item_get_caption");

/** @type {function(...*):?} */
var _table_collect_footnotes = Module["_table_collect_footnotes"] = createExportWrapper("table_collect_footnotes");

/** @type {function(...*):?} */
var _text_item_get_text = Module["_text_item_get_text"] = createExportWrapper("text_item_get_text");

/** @type {function(...*):?} */
var _output_set_filename = Module["_output_set_filename"] = createExportWrapper("output_set_filename");

/** @type {function(...*):?} */
var _output_get_group_level = Module["_output_get_group_level"] = createExportWrapper("output_get_group_level");

/** @type {function(...*):?} */
var _output_driver_is_registered = Module["_output_driver_is_registered"] = createExportWrapper("output_driver_is_registered");

/** @type {function(...*):?} */
var _output_driver_unregister = Module["_output_driver_unregister"] = createExportWrapper("output_driver_unregister");

/** @type {function(...*):?} */
var _output_driver_get_name = Module["_output_driver_get_name"] = createExportWrapper("output_driver_get_name");

/** @type {function(...*):?} */
var _output_driver_substitute_heading_vars = Module["_output_driver_substitute_heading_vars"] = createExportWrapper("output_driver_substitute_heading_vars");

/** @type {function(...*):?} */
var _group_open_item_create = Module["_group_open_item_create"] = createExportWrapper("group_open_item_create");

/** @type {function(...*):?} */
var _table_item_get_layers = Module["_table_item_get_layers"] = createExportWrapper("table_item_get_layers");

/** @type {function(...*):?} */
var _table_get_rule = Module["_table_get_rule"] = createExportWrapper("table_get_rule");

/** @type {function(...*):?} */
var _measure_dimension = Module["_measure_dimension"] = createExportWrapper("measure_dimension");

/** @type {function(...*):?} */
var _access = Module["_access"] = createExportWrapper("access");

/** @type {function(...*):?} */
var _getuid = Module["_getuid"] = createExportWrapper("getuid");

/** @type {function(...*):?} */
var _strtok = Module["_strtok"] = createExportWrapper("strtok");

/** @type {function(...*):?} */
var _driver_option_create = Module["_driver_option_create"] = createExportWrapper("driver_option_create");

/** @type {function(...*):?} */
var _parse_paper_size = Module["_parse_paper_size"] = createExportWrapper("parse_paper_size");

/** @type {function(...*):?} */
var _parse_dimension = Module["_parse_dimension"] = createExportWrapper("parse_dimension");

/** @type {function(...*):?} */
var _page_heading_copy = Module["_page_heading_copy"] = createExportWrapper("page_heading_copy");

/** @type {function(...*):?} */
var _page_heading_uninit = Module["_page_heading_uninit"] = createExportWrapper("page_heading_uninit");

/** @type {function(...*):?} */
var _page_setup_clone = Module["_page_setup_clone"] = createExportWrapper("page_setup_clone");

/** @type {function(...*):?} */
var _page_setup_destroy = Module["_page_setup_destroy"] = createExportWrapper("page_setup_destroy");

/** @type {function(...*):?} */
var _page_setup_item_create = Module["_page_setup_item_create"] = createExportWrapper("page_setup_item_create");

/** @type {function(...*):?} */
var _page_setup_item_submit = Module["_page_setup_item_submit"] = createExportWrapper("page_setup_item_submit");

/** @type {function(...*):?} */
var _pivot_table_assign_label_depth = Module["_pivot_table_assign_label_depth"] = createExportWrapper("pivot_table_assign_label_depth");

/** @type {function(...*):?} */
var _pivot_axis_iterator_next = Module["_pivot_axis_iterator_next"] = createExportWrapper("pivot_axis_iterator_next");

/** @type {function(...*):?} */
var _pivot_table_enumerate_axis = Module["_pivot_table_enumerate_axis"] = createExportWrapper("pivot_table_enumerate_axis");

/** @type {function(...*):?} */
var _table_create = Module["_table_create"] = createExportWrapper("table_create");

/** @type {function(...*):?} */
var _pivot_value_to_string = Module["_pivot_value_to_string"] = createExportWrapper("pivot_value_to_string");

/** @type {function(...*):?} */
var _table_create_footnote = Module["_table_create_footnote"] = createExportWrapper("table_create_footnote");

/** @type {function(...*):?} */
var _pivot_table_convert_indexes_ptod = Module["_pivot_table_convert_indexes_ptod"] = createExportWrapper("pivot_table_convert_indexes_ptod");

/** @type {function(...*):?} */
var _pivot_table_get = Module["_pivot_table_get"] = createExportWrapper("pivot_table_get");

/** @type {function(...*):?} */
var _table_hline = Module["_table_hline"] = createExportWrapper("table_hline");

/** @type {function(...*):?} */
var _table_vline = Module["_table_vline"] = createExportWrapper("table_vline");

/** @type {function(...*):?} */
var _table_item_set_title = Module["_table_item_set_title"] = createExportWrapper("table_item_set_title");

/** @type {function(...*):?} */
var _table_item_text_destroy = Module["_table_item_text_destroy"] = createExportWrapper("table_item_text_destroy");

/** @type {function(...*):?} */
var _pivot_value_format_body = Module["_pivot_value_format_body"] = createExportWrapper("pivot_value_format_body");

/** @type {function(...*):?} */
var _table_item_set_layers = Module["_table_item_set_layers"] = createExportWrapper("table_item_set_layers");

/** @type {function(...*):?} */
var _table_item_layers_destroy = Module["_table_item_layers_destroy"] = createExportWrapper("table_item_layers_destroy");

/** @type {function(...*):?} */
var _table_item_set_caption = Module["_table_item_set_caption"] = createExportWrapper("table_item_set_caption");

/** @type {function(...*):?} */
var _pivot_table_ref = Module["_pivot_table_ref"] = createExportWrapper("pivot_table_ref");

/** @type {function(...*):?} */
var _table_item_submit = Module["_table_item_submit"] = createExportWrapper("table_item_submit");

/** @type {function(...*):?} */
var _table_joint_text = Module["_table_joint_text"] = createExportWrapper("table_joint_text");

/** @type {function(...*):?} */
var _table_add_style = Module["_table_add_style"] = createExportWrapper("table_add_style");

/** @type {function(...*):?} */
var _table_add_footnote = Module["_table_add_footnote"] = createExportWrapper("table_add_footnote");

/** @type {function(...*):?} */
var _table_add_subscripts = Module["_table_add_subscripts"] = createExportWrapper("table_add_subscripts");

/** @type {function(...*):?} */
var _pivot_area_to_string = Module["_pivot_area_to_string"] = createExportWrapper("pivot_area_to_string");

/** @type {function(...*):?} */
var _pivot_area_get_default_style = Module["_pivot_area_get_default_style"] = createExportWrapper("pivot_area_get_default_style");

/** @type {function(...*):?} */
var _pivot_border_get_default_style = Module["_pivot_border_get_default_style"] = createExportWrapper("pivot_border_get_default_style");

/** @type {function(...*):?} */
var _pivot_border_to_string = Module["_pivot_border_to_string"] = createExportWrapper("pivot_border_to_string");

/** @type {function(...*):?} */
var _pivot_table_sizing_uninit = Module["_pivot_table_sizing_uninit"] = createExportWrapper("pivot_table_sizing_uninit");

/** @type {function(...*):?} */
var _pivot_axis_type_to_string = Module["_pivot_axis_type_to_string"] = createExportWrapper("pivot_axis_type_to_string");

/** @type {function(...*):?} */
var _pivot_dimension_destroy = Module["_pivot_dimension_destroy"] = createExportWrapper("pivot_dimension_destroy");

/** @type {function(...*):?} */
var _pivot_category_destroy = Module["_pivot_category_destroy"] = createExportWrapper("pivot_category_destroy");

/** @type {function(...*):?} */
var _font_style_uninit = Module["_font_style_uninit"] = createExportWrapper("font_style_uninit");

/** @type {function(...*):?} */
var _area_style_copy = Module["_area_style_copy"] = createExportWrapper("area_style_copy");

/** @type {function(...*):?} */
var _pivot_table_create_for_text = Module["_pivot_table_create_for_text"] = createExportWrapper("pivot_table_create_for_text");

/** @type {function(...*):?} */
var _area_style_uninit = Module["_area_style_uninit"] = createExportWrapper("area_style_uninit");

/** @type {function(...*):?} */
var _pivot_footnote_destroy = Module["_pivot_footnote_destroy"] = createExportWrapper("pivot_footnote_destroy");

/** @type {function(...*):?} */
var _pivot_table_is_shared = Module["_pivot_table_is_shared"] = createExportWrapper("pivot_table_is_shared");

/** @type {function(...*):?} */
var _pivot_table_create_footnote__ = Module["_pivot_table_create_footnote__"] = createExportWrapper("pivot_table_create_footnote__");

/** @type {function(...*):?} */
var _pivot_table_get_rw = Module["_pivot_table_get_rw"] = createExportWrapper("pivot_table_get_rw");

/** @type {function(...*):?} */
var _pivot_dimension_dump = Module["_pivot_dimension_dump"] = createExportWrapper("pivot_dimension_dump");

/** @type {function(...*):?} */
var _pivot_value_format = Module["_pivot_value_format"] = createExportWrapper("pivot_value_format");

/** @type {function(...*):?} */
var _pivot_table_dump = Module["_pivot_table_dump"] = createExportWrapper("pivot_table_dump");

/** @type {function(...*):?} */
var _font_style_dump = Module["_font_style_dump"] = createExportWrapper("font_style_dump");

/** @type {function(...*):?} */
var _cell_style_dump = Module["_cell_style_dump"] = createExportWrapper("cell_style_dump");

/** @type {function(...*):?} */
var _table_stroke_to_string = Module["_table_stroke_to_string"] = createExportWrapper("table_stroke_to_string");

/** @type {function(...*):?} */
var _cell_color_dump = Module["_cell_color_dump"] = createExportWrapper("cell_color_dump");

/** @type {function(...*):?} */
var _pivot_argument_uninit = Module["_pivot_argument_uninit"] = createExportWrapper("pivot_argument_uninit");

/** @type {function(...*):?} */
var _pivot_value_get_style = Module["_pivot_value_get_style"] = createExportWrapper("pivot_value_get_style");

/** @type {function(...*):?} */
var _font_style_copy = Module["_font_style_copy"] = createExportWrapper("font_style_copy");

/** @type {function(...*):?} */
var _pivot_value_set_style = Module["_pivot_value_set_style"] = createExportWrapper("pivot_value_set_style");

/** @type {function(...*):?} */
var _render_page_ref = Module["_render_page_ref"] = createExportWrapper("render_page_ref");

/** @type {function(...*):?} */
var _table_ref = Module["_table_ref"] = createExportWrapper("table_ref");

/** @type {function(...*):?} */
var _table_text = Module["_table_text"] = createExportWrapper("table_text");

/** @type {function(...*):?} */
var _area_style_clone = Module["_area_style_clone"] = createExportWrapper("area_style_clone");

/** @type {function(...*):?} */
var _table_text_format = Module["_table_text_format"] = createExportWrapper("table_text_format");

/** @type {function(...*):?} */
var _table_unref = Module["_table_unref"] = createExportWrapper("table_unref");

/** @type {function(...*):?} */
var _render_pager_draw = Module["_render_pager_draw"] = createExportWrapper("render_pager_draw");

/** @type {function(...*):?} */
var _render_pager_draw_region = Module["_render_pager_draw_region"] = createExportWrapper("render_pager_draw_region");

/** @type {function(...*):?} */
var _render_pager_get_size = Module["_render_pager_get_size"] = createExportWrapper("render_pager_get_size");

/** @type {function(...*):?} */
var _render_pager_get_best_breakpoint = Module["_render_pager_get_best_breakpoint"] = createExportWrapper("render_pager_get_best_breakpoint");

/** @type {function(...*):?} */
var _spv_writer_open = Module["_spv_writer_open"] = createExportWrapper("spv_writer_open");

/** @type {function(...*):?} */
var _spv_writer_close = Module["_spv_writer_close"] = createExportWrapper("spv_writer_close");

/** @type {function(...*):?} */
var _spv_writer_open_heading = Module["_spv_writer_open_heading"] = createExportWrapper("spv_writer_open_heading");

/** @type {function(...*):?} */
var _spv_writer_close_heading = Module["_spv_writer_close_heading"] = createExportWrapper("spv_writer_close_heading");

/** @type {function(...*):?} */
var _spv_writer_put_table = Module["_spv_writer_put_table"] = createExportWrapper("spv_writer_put_table");

/** @type {function(...*):?} */
var _spv_writer_put_text = Module["_spv_writer_put_text"] = createExportWrapper("spv_writer_put_text");

/** @type {function(...*):?} */
var _spv_writer_set_page_setup = Module["_spv_writer_set_page_setup"] = createExportWrapper("spv_writer_set_page_setup");

/** @type {function(...*):?} */
var _table_item_text_create = Module["_table_item_text_create"] = createExportWrapper("table_item_text_create");

/** @type {function(...*):?} */
var _table_item_text_clone = Module["_table_item_text_clone"] = createExportWrapper("table_item_text_clone");

/** @type {function(...*):?} */
var _area_style_free = Module["_area_style_free"] = createExportWrapper("area_style_free");

/** @type {function(...*):?} */
var _table_item_layer_copy = Module["_table_item_layer_copy"] = createExportWrapper("table_item_layer_copy");

/** @type {function(...*):?} */
var _table_item_layer_uninit = Module["_table_item_layer_uninit"] = createExportWrapper("table_item_layer_uninit");

/** @type {function(...*):?} */
var _table_item_layers_clone = Module["_table_item_layers_clone"] = createExportWrapper("table_item_layers_clone");

/** @type {function(...*):?} */
var _table_is_shared = Module["_table_is_shared"] = createExportWrapper("table_is_shared");

/** @type {function(...*):?} */
var _table_cell_format_footnote_markers = Module["_table_cell_format_footnote_markers"] = createExportWrapper("table_cell_format_footnote_markers");

/** @type {function(...*):?} */
var _table_halign_to_string = Module["_table_halign_to_string"] = createExportWrapper("table_halign_to_string");

/** @type {function(...*):?} */
var _table_valign_to_string = Module["_table_valign_to_string"] = createExportWrapper("table_valign_to_string");

/** @type {function(...*):?} */
var _table_box = Module["_table_box"] = createExportWrapper("table_box");

/** @type {function(...*):?} */
var _table_add_superscript = Module["_table_add_superscript"] = createExportWrapper("table_add_superscript");

/** @type {function(...*):?} */
var _table_cell_is_empty = Module["_table_cell_is_empty"] = createExportWrapper("table_cell_is_empty");

/** @type {function(...*):?} */
var _table_output_text_format = Module["_table_output_text_format"] = createExportWrapper("table_output_text_format");

/** @type {function(...*):?} */
var _text_item_type_to_string = Module["_text_item_type_to_string"] = createExportWrapper("text_item_type_to_string");

/** @type {function(...*):?} */
var _spvdx_border_bottom_to_string = Module["_spvdx_border_bottom_to_string"] = createExportWrapper("spvdx_border_bottom_to_string");

/** @type {function(...*):?} */
var _spvdx_border_left_to_string = Module["_spvdx_border_left_to_string"] = createExportWrapper("spvdx_border_left_to_string");

/** @type {function(...*):?} */
var _spvdx_border_right_to_string = Module["_spvdx_border_right_to_string"] = createExportWrapper("spvdx_border_right_to_string");

/** @type {function(...*):?} */
var _spvdx_border_top_to_string = Module["_spvdx_border_top_to_string"] = createExportWrapper("spvdx_border_top_to_string");

/** @type {function(...*):?} */
var _spvdx_day_type_to_string = Module["_spvdx_day_type_to_string"] = createExportWrapper("spvdx_day_type_to_string");

/** @type {function(...*):?} */
var _spvdx_dt_base_format_to_string = Module["_spvdx_dt_base_format_to_string"] = createExportWrapper("spvdx_dt_base_format_to_string");

/** @type {function(...*):?} */
var _spvdx_f_base_format_to_string = Module["_spvdx_f_base_format_to_string"] = createExportWrapper("spvdx_f_base_format_to_string");

/** @type {function(...*):?} */
var _spvdx_fit_cells_to_string = Module["_spvdx_fit_cells_to_string"] = createExportWrapper("spvdx_fit_cells_to_string");

/** @type {function(...*):?} */
var _spvdx_font_style_to_string = Module["_spvdx_font_style_to_string"] = createExportWrapper("spvdx_font_style_to_string");

/** @type {function(...*):?} */
var _spvdx_font_underline_to_string = Module["_spvdx_font_underline_to_string"] = createExportWrapper("spvdx_font_underline_to_string");

/** @type {function(...*):?} */
var _spvdx_font_weight_to_string = Module["_spvdx_font_weight_to_string"] = createExportWrapper("spvdx_font_weight_to_string");

/** @type {function(...*):?} */
var _spvdx_hour_format_to_string = Module["_spvdx_hour_format_to_string"] = createExportWrapper("spvdx_hour_format_to_string");

/** @type {function(...*):?} */
var _spvdx_label_location_horizontal_to_string = Module["_spvdx_label_location_horizontal_to_string"] = createExportWrapper("spvdx_label_location_horizontal_to_string");

/** @type {function(...*):?} */
var _spvdx_label_location_vertical_to_string = Module["_spvdx_label_location_vertical_to_string"] = createExportWrapper("spvdx_label_location_vertical_to_string");

/** @type {function(...*):?} */
var _spvdx_mdy_order_to_string = Module["_spvdx_mdy_order_to_string"] = createExportWrapper("spvdx_mdy_order_to_string");

/** @type {function(...*):?} */
var _spvdx_method_to_string = Module["_spvdx_method_to_string"] = createExportWrapper("spvdx_method_to_string");

/** @type {function(...*):?} */
var _spvdx_missing_to_string = Module["_spvdx_missing_to_string"] = createExportWrapper("spvdx_missing_to_string");

/** @type {function(...*):?} */
var _spvdx_month_format_to_string = Module["_spvdx_month_format_to_string"] = createExportWrapper("spvdx_month_format_to_string");

/** @type {function(...*):?} */
var _spvdx_name_to_string = Module["_spvdx_name_to_string"] = createExportWrapper("spvdx_name_to_string");

/** @type {function(...*):?} */
var _spvdx_part_to_string = Module["_spvdx_part_to_string"] = createExportWrapper("spvdx_part_to_string");

/** @type {function(...*):?} */
var _spvdx_position_to_string = Module["_spvdx_position_to_string"] = createExportWrapper("spvdx_position_to_string");

/** @type {function(...*):?} */
var _spvdx_purpose_to_string = Module["_spvdx_purpose_to_string"] = createExportWrapper("spvdx_purpose_to_string");

/** @type {function(...*):?} */
var _spvdx_scientific_to_string = Module["_spvdx_scientific_to_string"] = createExportWrapper("spvdx_scientific_to_string");

/** @type {function(...*):?} */
var _spvdx_text_alignment_to_string = Module["_spvdx_text_alignment_to_string"] = createExportWrapper("spvdx_text_alignment_to_string");

/** @type {function(...*):?} */
var _spvdx_parse_affix = Module["_spvdx_parse_affix"] = createExportWrapper("spvdx_parse_affix");

/** @type {function(...*):?} */
var _spvxml_parse_attributes = Module["_spvxml_parse_attributes"] = createExportWrapper("spvxml_parse_attributes");

/** @type {function(...*):?} */
var _spvxml_attr_parse_int = Module["_spvxml_attr_parse_int"] = createExportWrapper("spvxml_attr_parse_int");

/** @type {function(...*):?} */
var _spvxml_attr_parse_enum = Module["_spvxml_attr_parse_enum"] = createExportWrapper("spvxml_attr_parse_enum");

/** @type {function(...*):?} */
var _spvxml_attr_parse_bool = Module["_spvxml_attr_parse_bool"] = createExportWrapper("spvxml_attr_parse_bool");

/** @type {function(...*):?} */
var _spvxml_node_context_uninit = Module["_spvxml_node_context_uninit"] = createExportWrapper("spvxml_node_context_uninit");

/** @type {function(...*):?} */
var _spvxml_content_parse_end = Module["_spvxml_content_parse_end"] = createExportWrapper("spvxml_content_parse_end");

/** @type {function(...*):?} */
var _spvdx_free_affix = Module["_spvdx_free_affix"] = createExportWrapper("spvdx_free_affix");

/** @type {function(...*):?} */
var _spvdx_is_affix = Module["_spvdx_is_affix"] = createExportWrapper("spvdx_is_affix");

/** @type {function(...*):?} */
var _spvdx_cast_affix = Module["_spvdx_cast_affix"] = createExportWrapper("spvdx_cast_affix");

/** @type {function(...*):?} */
var _spvxml_node_collect_id = Module["_spvxml_node_collect_id"] = createExportWrapper("spvxml_node_collect_id");

/** @type {function(...*):?} */
var _spvdx_parse_alternating = Module["_spvdx_parse_alternating"] = createExportWrapper("spvdx_parse_alternating");

/** @type {function(...*):?} */
var _spvdx_free_alternating = Module["_spvdx_free_alternating"] = createExportWrapper("spvdx_free_alternating");

/** @type {function(...*):?} */
var _spvdx_is_alternating = Module["_spvdx_is_alternating"] = createExportWrapper("spvdx_is_alternating");

/** @type {function(...*):?} */
var _spvdx_cast_alternating = Module["_spvdx_cast_alternating"] = createExportWrapper("spvdx_cast_alternating");

/** @type {function(...*):?} */
var _spvdx_parse_axis = Module["_spvdx_parse_axis"] = createExportWrapper("spvdx_parse_axis");

/** @type {function(...*):?} */
var _spvdx_free_axis = Module["_spvdx_free_axis"] = createExportWrapper("spvdx_free_axis");

/** @type {function(...*):?} */
var _spvxml_content_parse_element = Module["_spvxml_content_parse_element"] = createExportWrapper("spvxml_content_parse_element");

/** @type {function(...*):?} */
var _spvdx_parse_label = Module["_spvdx_parse_label"] = createExportWrapper("spvdx_parse_label");

/** @type {function(...*):?} */
var _spvdx_parse_major_ticks = Module["_spvdx_parse_major_ticks"] = createExportWrapper("spvdx_parse_major_ticks");

/** @type {function(...*):?} */
var _spvdx_free_label = Module["_spvdx_free_label"] = createExportWrapper("spvdx_free_label");

/** @type {function(...*):?} */
var _spvdx_free_major_ticks = Module["_spvdx_free_major_ticks"] = createExportWrapper("spvdx_free_major_ticks");

/** @type {function(...*):?} */
var _spvdx_is_axis = Module["_spvdx_is_axis"] = createExportWrapper("spvdx_is_axis");

/** @type {function(...*):?} */
var _spvdx_cast_axis = Module["_spvdx_cast_axis"] = createExportWrapper("spvdx_cast_axis");

/** @type {function(...*):?} */
var _spvxml_node_resolve_ref = Module["_spvxml_node_resolve_ref"] = createExportWrapper("spvxml_node_resolve_ref");

/** @type {function(...*):?} */
var _spvdx_parse_categorical_domain = Module["_spvdx_parse_categorical_domain"] = createExportWrapper("spvdx_parse_categorical_domain");

/** @type {function(...*):?} */
var _spvdx_free_categorical_domain = Module["_spvdx_free_categorical_domain"] = createExportWrapper("spvdx_free_categorical_domain");

/** @type {function(...*):?} */
var _spvdx_parse_variable_reference = Module["_spvdx_parse_variable_reference"] = createExportWrapper("spvdx_parse_variable_reference");

/** @type {function(...*):?} */
var _spvdx_parse_simple_sort = Module["_spvdx_parse_simple_sort"] = createExportWrapper("spvdx_parse_simple_sort");

/** @type {function(...*):?} */
var _spvdx_free_variable_reference = Module["_spvdx_free_variable_reference"] = createExportWrapper("spvdx_free_variable_reference");

/** @type {function(...*):?} */
var _spvdx_free_simple_sort = Module["_spvdx_free_simple_sort"] = createExportWrapper("spvdx_free_simple_sort");

/** @type {function(...*):?} */
var _spvdx_is_categorical_domain = Module["_spvdx_is_categorical_domain"] = createExportWrapper("spvdx_is_categorical_domain");

/** @type {function(...*):?} */
var _spvdx_cast_categorical_domain = Module["_spvdx_cast_categorical_domain"] = createExportWrapper("spvdx_cast_categorical_domain");

/** @type {function(...*):?} */
var _spvdx_parse_category_order = Module["_spvdx_parse_category_order"] = createExportWrapper("spvdx_parse_category_order");

/** @type {function(...*):?} */
var _spvxml_content_parse_text = Module["_spvxml_content_parse_text"] = createExportWrapper("spvxml_content_parse_text");

/** @type {function(...*):?} */
var _spvdx_free_category_order = Module["_spvdx_free_category_order"] = createExportWrapper("spvdx_free_category_order");

/** @type {function(...*):?} */
var _spvdx_is_category_order = Module["_spvdx_is_category_order"] = createExportWrapper("spvdx_is_category_order");

/** @type {function(...*):?} */
var _spvdx_cast_category_order = Module["_spvdx_cast_category_order"] = createExportWrapper("spvdx_cast_category_order");

/** @type {function(...*):?} */
var _spvdx_parse_container = Module["_spvdx_parse_container"] = createExportWrapper("spvdx_parse_container");

/** @type {function(...*):?} */
var _spvdx_free_container = Module["_spvdx_free_container"] = createExportWrapper("spvdx_free_container");

/** @type {function(...*):?} */
var _spvdx_parse_container_extension = Module["_spvdx_parse_container_extension"] = createExportWrapper("spvdx_parse_container_extension");

/** @type {function(...*):?} */
var _spvdx_parse_location = Module["_spvdx_parse_location"] = createExportWrapper("spvdx_parse_location");

/** @type {function(...*):?} */
var _spvdx_parse_label_frame = Module["_spvdx_parse_label_frame"] = createExportWrapper("spvdx_parse_label_frame");

/** @type {function(...*):?} */
var _spvdx_free_label_frame = Module["_spvdx_free_label_frame"] = createExportWrapper("spvdx_free_label_frame");

/** @type {function(...*):?} */
var _spvdx_free_container_extension = Module["_spvdx_free_container_extension"] = createExportWrapper("spvdx_free_container_extension");

/** @type {function(...*):?} */
var _spvdx_free_location = Module["_spvdx_free_location"] = createExportWrapper("spvdx_free_location");

/** @type {function(...*):?} */
var _spvdx_is_container = Module["_spvdx_is_container"] = createExportWrapper("spvdx_is_container");

/** @type {function(...*):?} */
var _spvdx_cast_container = Module["_spvdx_cast_container"] = createExportWrapper("spvdx_cast_container");

/** @type {function(...*):?} */
var _spvxml_attr_parse_fixed = Module["_spvxml_attr_parse_fixed"] = createExportWrapper("spvxml_attr_parse_fixed");

/** @type {function(...*):?} */
var _spvdx_is_container_extension = Module["_spvdx_is_container_extension"] = createExportWrapper("spvdx_is_container_extension");

/** @type {function(...*):?} */
var _spvdx_cast_container_extension = Module["_spvdx_cast_container_extension"] = createExportWrapper("spvdx_cast_container_extension");

/** @type {function(...*):?} */
var _spvdx_parse_coordinates = Module["_spvdx_parse_coordinates"] = createExportWrapper("spvdx_parse_coordinates");

/** @type {function(...*):?} */
var _spvdx_free_coordinates = Module["_spvdx_free_coordinates"] = createExportWrapper("spvdx_free_coordinates");

/** @type {function(...*):?} */
var _spvdx_is_coordinates = Module["_spvdx_is_coordinates"] = createExportWrapper("spvdx_is_coordinates");

/** @type {function(...*):?} */
var _spvdx_cast_coordinates = Module["_spvdx_cast_coordinates"] = createExportWrapper("spvdx_cast_coordinates");

/** @type {function(...*):?} */
var _spvdx_parse_cross = Module["_spvdx_parse_cross"] = createExportWrapper("spvdx_parse_cross");

/** @type {function(...*):?} */
var _spvdx_free_cross = Module["_spvdx_free_cross"] = createExportWrapper("spvdx_free_cross");

/** @type {function(...*):?} */
var _spvdx_parse_unity = Module["_spvdx_parse_unity"] = createExportWrapper("spvdx_parse_unity");

/** @type {function(...*):?} */
var _spvdx_parse_nest = Module["_spvdx_parse_nest"] = createExportWrapper("spvdx_parse_nest");

/** @type {function(...*):?} */
var _spvxml_content_error = Module["_spvxml_content_error"] = createExportWrapper("spvxml_content_error");

/** @type {function(...*):?} */
var _spvdx_is_cross = Module["_spvdx_is_cross"] = createExportWrapper("spvdx_is_cross");

/** @type {function(...*):?} */
var _spvdx_cast_cross = Module["_spvdx_cast_cross"] = createExportWrapper("spvdx_cast_cross");

/** @type {function(...*):?} */
var _spvdx_parse_date_time_format = Module["_spvdx_parse_date_time_format"] = createExportWrapper("spvdx_parse_date_time_format");

/** @type {function(...*):?} */
var _spvdx_free_date_time_format = Module["_spvdx_free_date_time_format"] = createExportWrapper("spvdx_free_date_time_format");

/** @type {function(...*):?} */
var _spvdx_is_date_time_format = Module["_spvdx_is_date_time_format"] = createExportWrapper("spvdx_is_date_time_format");

/** @type {function(...*):?} */
var _spvdx_cast_date_time_format = Module["_spvdx_cast_date_time_format"] = createExportWrapper("spvdx_cast_date_time_format");

/** @type {function(...*):?} */
var _spvdx_parse_derived_variable = Module["_spvdx_parse_derived_variable"] = createExportWrapper("spvdx_parse_derived_variable");

/** @type {function(...*):?} */
var _spvdx_free_derived_variable = Module["_spvdx_free_derived_variable"] = createExportWrapper("spvdx_free_derived_variable");

/** @type {function(...*):?} */
var _spvdx_parse_variable_extension = Module["_spvdx_parse_variable_extension"] = createExportWrapper("spvdx_parse_variable_extension");

/** @type {function(...*):?} */
var _spvdx_parse_format = Module["_spvdx_parse_format"] = createExportWrapper("spvdx_parse_format");

/** @type {function(...*):?} */
var _spvdx_parse_string_format = Module["_spvdx_parse_string_format"] = createExportWrapper("spvdx_parse_string_format");

/** @type {function(...*):?} */
var _spvdx_parse_value_map_entry = Module["_spvdx_parse_value_map_entry"] = createExportWrapper("spvdx_parse_value_map_entry");

/** @type {function(...*):?} */
var _spvdx_free_variable_extension = Module["_spvdx_free_variable_extension"] = createExportWrapper("spvdx_free_variable_extension");

/** @type {function(...*):?} */
var _spvdx_free_value_map_entry = Module["_spvdx_free_value_map_entry"] = createExportWrapper("spvdx_free_value_map_entry");

/** @type {function(...*):?} */
var _spvdx_is_derived_variable = Module["_spvdx_is_derived_variable"] = createExportWrapper("spvdx_is_derived_variable");

/** @type {function(...*):?} */
var _spvdx_cast_derived_variable = Module["_spvdx_cast_derived_variable"] = createExportWrapper("spvdx_cast_derived_variable");

/** @type {function(...*):?} */
var _spvdx_parse_description = Module["_spvdx_parse_description"] = createExportWrapper("spvdx_parse_description");

/** @type {function(...*):?} */
var _spvdx_free_description = Module["_spvdx_free_description"] = createExportWrapper("spvdx_free_description");

/** @type {function(...*):?} */
var _spvdx_is_description = Module["_spvdx_is_description"] = createExportWrapper("spvdx_is_description");

/** @type {function(...*):?} */
var _spvdx_cast_description = Module["_spvdx_cast_description"] = createExportWrapper("spvdx_cast_description");

/** @type {function(...*):?} */
var _spvdx_parse_description_group = Module["_spvdx_parse_description_group"] = createExportWrapper("spvdx_parse_description_group");

/** @type {function(...*):?} */
var _spvdx_free_description_group = Module["_spvdx_free_description_group"] = createExportWrapper("spvdx_free_description_group");

/** @type {function(...*):?} */
var _spvdx_is_description_group = Module["_spvdx_is_description_group"] = createExportWrapper("spvdx_is_description_group");

/** @type {function(...*):?} */
var _spvdx_cast_description_group = Module["_spvdx_cast_description_group"] = createExportWrapper("spvdx_cast_description_group");

/** @type {function(...*):?} */
var _spvdx_parse_elapsed_time_format = Module["_spvdx_parse_elapsed_time_format"] = createExportWrapper("spvdx_parse_elapsed_time_format");

/** @type {function(...*):?} */
var _spvdx_free_elapsed_time_format = Module["_spvdx_free_elapsed_time_format"] = createExportWrapper("spvdx_free_elapsed_time_format");

/** @type {function(...*):?} */
var _spvdx_is_elapsed_time_format = Module["_spvdx_is_elapsed_time_format"] = createExportWrapper("spvdx_is_elapsed_time_format");

/** @type {function(...*):?} */
var _spvdx_cast_elapsed_time_format = Module["_spvdx_cast_elapsed_time_format"] = createExportWrapper("spvdx_cast_elapsed_time_format");

/** @type {function(...*):?} */
var _spvdx_parse_facet_layout = Module["_spvdx_parse_facet_layout"] = createExportWrapper("spvdx_parse_facet_layout");

/** @type {function(...*):?} */
var _spvdx_free_facet_layout = Module["_spvdx_free_facet_layout"] = createExportWrapper("spvdx_free_facet_layout");

/** @type {function(...*):?} */
var _spvdx_parse_table_layout = Module["_spvdx_parse_table_layout"] = createExportWrapper("spvdx_parse_table_layout");

/** @type {function(...*):?} */
var _spvdx_parse_set_cell_properties = Module["_spvdx_parse_set_cell_properties"] = createExportWrapper("spvdx_parse_set_cell_properties");

/** @type {function(...*):?} */
var _spvdx_parse_facet_level = Module["_spvdx_parse_facet_level"] = createExportWrapper("spvdx_parse_facet_level");

/** @type {function(...*):?} */
var _spvdx_free_set_cell_properties = Module["_spvdx_free_set_cell_properties"] = createExportWrapper("spvdx_free_set_cell_properties");

/** @type {function(...*):?} */
var _spvdx_free_table_layout = Module["_spvdx_free_table_layout"] = createExportWrapper("spvdx_free_table_layout");

/** @type {function(...*):?} */
var _spvdx_free_intersect = Module["_spvdx_free_intersect"] = createExportWrapper("spvdx_free_intersect");

/** @type {function(...*):?} */
var _spvdx_free_facet_level = Module["_spvdx_free_facet_level"] = createExportWrapper("spvdx_free_facet_level");

/** @type {function(...*):?} */
var _spvdx_is_facet_layout = Module["_spvdx_is_facet_layout"] = createExportWrapper("spvdx_is_facet_layout");

/** @type {function(...*):?} */
var _spvdx_cast_facet_layout = Module["_spvdx_cast_facet_layout"] = createExportWrapper("spvdx_cast_facet_layout");

/** @type {function(...*):?} */
var _spvxml_attr_parse_dimension = Module["_spvxml_attr_parse_dimension"] = createExportWrapper("spvxml_attr_parse_dimension");

/** @type {function(...*):?} */
var _spvdx_is_facet_level = Module["_spvdx_is_facet_level"] = createExportWrapper("spvdx_is_facet_level");

/** @type {function(...*):?} */
var _spvdx_cast_facet_level = Module["_spvdx_cast_facet_level"] = createExportWrapper("spvdx_cast_facet_level");

/** @type {function(...*):?} */
var _spvdx_parse_faceting = Module["_spvdx_parse_faceting"] = createExportWrapper("spvdx_parse_faceting");

/** @type {function(...*):?} */
var _spvdx_free_faceting = Module["_spvdx_free_faceting"] = createExportWrapper("spvdx_free_faceting");

/** @type {function(...*):?} */
var _spvdx_parse_layer = Module["_spvdx_parse_layer"] = createExportWrapper("spvdx_parse_layer");

/** @type {function(...*):?} */
var _spvdx_free_layer = Module["_spvdx_free_layer"] = createExportWrapper("spvdx_free_layer");

/** @type {function(...*):?} */
var _spvdx_is_faceting = Module["_spvdx_is_faceting"] = createExportWrapper("spvdx_is_faceting");

/** @type {function(...*):?} */
var _spvdx_cast_faceting = Module["_spvdx_cast_faceting"] = createExportWrapper("spvdx_cast_faceting");

/** @type {function(...*):?} */
var _spvdx_parse_footnote_mapping = Module["_spvdx_parse_footnote_mapping"] = createExportWrapper("spvdx_parse_footnote_mapping");

/** @type {function(...*):?} */
var _spvdx_free_footnote_mapping = Module["_spvdx_free_footnote_mapping"] = createExportWrapper("spvdx_free_footnote_mapping");

/** @type {function(...*):?} */
var _spvdx_is_footnote_mapping = Module["_spvdx_is_footnote_mapping"] = createExportWrapper("spvdx_is_footnote_mapping");

/** @type {function(...*):?} */
var _spvdx_cast_footnote_mapping = Module["_spvdx_cast_footnote_mapping"] = createExportWrapper("spvdx_cast_footnote_mapping");

/** @type {function(...*):?} */
var _spvdx_parse_footnotes = Module["_spvdx_parse_footnotes"] = createExportWrapper("spvdx_parse_footnotes");

/** @type {function(...*):?} */
var _spvdx_free_footnotes = Module["_spvdx_free_footnotes"] = createExportWrapper("spvdx_free_footnotes");

/** @type {function(...*):?} */
var _spvdx_is_footnotes = Module["_spvdx_is_footnotes"] = createExportWrapper("spvdx_is_footnotes");

/** @type {function(...*):?} */
var _spvdx_cast_footnotes = Module["_spvdx_cast_footnotes"] = createExportWrapper("spvdx_cast_footnotes");

/** @type {function(...*):?} */
var _spvxml_attr_parse_real = Module["_spvxml_attr_parse_real"] = createExportWrapper("spvxml_attr_parse_real");

/** @type {function(...*):?} */
var _spvdx_free_format = Module["_spvdx_free_format"] = createExportWrapper("spvdx_free_format");

/** @type {function(...*):?} */
var _spvdx_parse_relabel = Module["_spvdx_parse_relabel"] = createExportWrapper("spvdx_parse_relabel");

/** @type {function(...*):?} */
var _spvdx_free_relabel = Module["_spvdx_free_relabel"] = createExportWrapper("spvdx_free_relabel");

/** @type {function(...*):?} */
var _spvdx_is_format = Module["_spvdx_is_format"] = createExportWrapper("spvdx_is_format");

/** @type {function(...*):?} */
var _spvdx_cast_format = Module["_spvdx_cast_format"] = createExportWrapper("spvdx_cast_format");

/** @type {function(...*):?} */
var _spvdx_parse_format_mapping = Module["_spvdx_parse_format_mapping"] = createExportWrapper("spvdx_parse_format_mapping");

/** @type {function(...*):?} */
var _spvdx_free_format_mapping = Module["_spvdx_free_format_mapping"] = createExportWrapper("spvdx_free_format_mapping");

/** @type {function(...*):?} */
var _spvdx_is_format_mapping = Module["_spvdx_is_format_mapping"] = createExportWrapper("spvdx_is_format_mapping");

/** @type {function(...*):?} */
var _spvdx_cast_format_mapping = Module["_spvdx_cast_format_mapping"] = createExportWrapper("spvdx_cast_format_mapping");

/** @type {function(...*):?} */
var _spvdx_parse_formatting = Module["_spvdx_parse_formatting"] = createExportWrapper("spvdx_parse_formatting");

/** @type {function(...*):?} */
var _spvdx_free_formatting = Module["_spvdx_free_formatting"] = createExportWrapper("spvdx_free_formatting");

/** @type {function(...*):?} */
var _spvdx_is_formatting = Module["_spvdx_is_formatting"] = createExportWrapper("spvdx_is_formatting");

/** @type {function(...*):?} */
var _spvdx_cast_formatting = Module["_spvdx_cast_formatting"] = createExportWrapper("spvdx_cast_formatting");

/** @type {function(...*):?} */
var _spvdx_parse_graph = Module["_spvdx_parse_graph"] = createExportWrapper("spvdx_parse_graph");

/** @type {function(...*):?} */
var _spvdx_free_graph = Module["_spvdx_free_graph"] = createExportWrapper("spvdx_free_graph");

/** @type {function(...*):?} */
var _spvdx_parse_interval = Module["_spvdx_parse_interval"] = createExportWrapper("spvdx_parse_interval");

/** @type {function(...*):?} */
var _spvdx_free_interval = Module["_spvdx_free_interval"] = createExportWrapper("spvdx_free_interval");

/** @type {function(...*):?} */
var _spvdx_is_graph = Module["_spvdx_is_graph"] = createExportWrapper("spvdx_is_graph");

/** @type {function(...*):?} */
var _spvdx_cast_graph = Module["_spvdx_cast_graph"] = createExportWrapper("spvdx_cast_graph");

/** @type {function(...*):?} */
var _spvdx_parse_gridline = Module["_spvdx_parse_gridline"] = createExportWrapper("spvdx_parse_gridline");

/** @type {function(...*):?} */
var _spvdx_free_gridline = Module["_spvdx_free_gridline"] = createExportWrapper("spvdx_free_gridline");

/** @type {function(...*):?} */
var _spvdx_is_gridline = Module["_spvdx_is_gridline"] = createExportWrapper("spvdx_is_gridline");

/** @type {function(...*):?} */
var _spvdx_cast_gridline = Module["_spvdx_cast_gridline"] = createExportWrapper("spvdx_cast_gridline");

/** @type {function(...*):?} */
var _spvdx_parse_intersect = Module["_spvdx_parse_intersect"] = createExportWrapper("spvdx_parse_intersect");

/** @type {function(...*):?} */
var _spvdx_parse_where = Module["_spvdx_parse_where"] = createExportWrapper("spvdx_parse_where");

/** @type {function(...*):?} */
var _spvdx_parse_intersect_where = Module["_spvdx_parse_intersect_where"] = createExportWrapper("spvdx_parse_intersect_where");

/** @type {function(...*):?} */
var _spvdx_free_where = Module["_spvdx_free_where"] = createExportWrapper("spvdx_free_where");

/** @type {function(...*):?} */
var _spvdx_free_intersect_where = Module["_spvdx_free_intersect_where"] = createExportWrapper("spvdx_free_intersect_where");

/** @type {function(...*):?} */
var _spvdx_is_intersect = Module["_spvdx_is_intersect"] = createExportWrapper("spvdx_is_intersect");

/** @type {function(...*):?} */
var _spvdx_cast_intersect = Module["_spvdx_cast_intersect"] = createExportWrapper("spvdx_cast_intersect");

/** @type {function(...*):?} */
var _spvdx_is_intersect_where = Module["_spvdx_is_intersect_where"] = createExportWrapper("spvdx_is_intersect_where");

/** @type {function(...*):?} */
var _spvdx_cast_intersect_where = Module["_spvdx_cast_intersect_where"] = createExportWrapper("spvdx_cast_intersect_where");

/** @type {function(...*):?} */
var _spvdx_parse_labeling = Module["_spvdx_parse_labeling"] = createExportWrapper("spvdx_parse_labeling");

/** @type {function(...*):?} */
var _spvdx_free_labeling = Module["_spvdx_free_labeling"] = createExportWrapper("spvdx_free_labeling");

/** @type {function(...*):?} */
var _spvdx_is_interval = Module["_spvdx_is_interval"] = createExportWrapper("spvdx_is_interval");

/** @type {function(...*):?} */
var _spvdx_cast_interval = Module["_spvdx_cast_interval"] = createExportWrapper("spvdx_cast_interval");

/** @type {function(...*):?} */
var _spvdx_parse_text = Module["_spvdx_parse_text"] = createExportWrapper("spvdx_parse_text");

/** @type {function(...*):?} */
var _spvdx_free_text = Module["_spvdx_free_text"] = createExportWrapper("spvdx_free_text");

/** @type {function(...*):?} */
var _spvdx_is_label = Module["_spvdx_is_label"] = createExportWrapper("spvdx_is_label");

/** @type {function(...*):?} */
var _spvdx_cast_label = Module["_spvdx_cast_label"] = createExportWrapper("spvdx_cast_label");

/** @type {function(...*):?} */
var _spvdx_parse_paragraph = Module["_spvdx_parse_paragraph"] = createExportWrapper("spvdx_parse_paragraph");

/** @type {function(...*):?} */
var _spvdx_free_paragraph = Module["_spvdx_free_paragraph"] = createExportWrapper("spvdx_free_paragraph");

/** @type {function(...*):?} */
var _spvdx_is_label_frame = Module["_spvdx_is_label_frame"] = createExportWrapper("spvdx_is_label_frame");

/** @type {function(...*):?} */
var _spvdx_cast_label_frame = Module["_spvdx_cast_label_frame"] = createExportWrapper("spvdx_cast_label_frame");

/** @type {function(...*):?} */
var _spvdx_is_labeling = Module["_spvdx_is_labeling"] = createExportWrapper("spvdx_is_labeling");

/** @type {function(...*):?} */
var _spvdx_cast_labeling = Module["_spvdx_cast_labeling"] = createExportWrapper("spvdx_cast_labeling");

/** @type {function(...*):?} */
var _spvdx_is_layer = Module["_spvdx_is_layer"] = createExportWrapper("spvdx_is_layer");

/** @type {function(...*):?} */
var _spvdx_cast_layer = Module["_spvdx_cast_layer"] = createExportWrapper("spvdx_cast_layer");

/** @type {function(...*):?} */
var _spvdx_parse_layer_controller = Module["_spvdx_parse_layer_controller"] = createExportWrapper("spvdx_parse_layer_controller");

/** @type {function(...*):?} */
var _spvdx_free_layer_controller = Module["_spvdx_free_layer_controller"] = createExportWrapper("spvdx_free_layer_controller");

/** @type {function(...*):?} */
var _spvdx_is_layer_controller = Module["_spvdx_is_layer_controller"] = createExportWrapper("spvdx_is_layer_controller");

/** @type {function(...*):?} */
var _spvdx_cast_layer_controller = Module["_spvdx_cast_layer_controller"] = createExportWrapper("spvdx_cast_layer_controller");

/** @type {function(...*):?} */
var _spvdx_is_location = Module["_spvdx_is_location"] = createExportWrapper("spvdx_is_location");

/** @type {function(...*):?} */
var _spvdx_cast_location = Module["_spvdx_cast_location"] = createExportWrapper("spvdx_cast_location");

/** @type {function(...*):?} */
var _spvdx_is_major_ticks = Module["_spvdx_is_major_ticks"] = createExportWrapper("spvdx_is_major_ticks");

/** @type {function(...*):?} */
var _spvdx_cast_major_ticks = Module["_spvdx_cast_major_ticks"] = createExportWrapper("spvdx_cast_major_ticks");

/** @type {function(...*):?} */
var _spvdx_free_nest = Module["_spvdx_free_nest"] = createExportWrapper("spvdx_free_nest");

/** @type {function(...*):?} */
var _spvdx_is_nest = Module["_spvdx_is_nest"] = createExportWrapper("spvdx_is_nest");

/** @type {function(...*):?} */
var _spvdx_cast_nest = Module["_spvdx_cast_nest"] = createExportWrapper("spvdx_cast_nest");

/** @type {function(...*):?} */
var _spvdx_parse_number_format = Module["_spvdx_parse_number_format"] = createExportWrapper("spvdx_parse_number_format");

/** @type {function(...*):?} */
var _spvdx_free_number_format = Module["_spvdx_free_number_format"] = createExportWrapper("spvdx_free_number_format");

/** @type {function(...*):?} */
var _spvdx_is_number_format = Module["_spvdx_is_number_format"] = createExportWrapper("spvdx_is_number_format");

/** @type {function(...*):?} */
var _spvdx_cast_number_format = Module["_spvdx_cast_number_format"] = createExportWrapper("spvdx_cast_number_format");

/** @type {function(...*):?} */
var _spvdx_is_paragraph = Module["_spvdx_is_paragraph"] = createExportWrapper("spvdx_is_paragraph");

/** @type {function(...*):?} */
var _spvdx_cast_paragraph = Module["_spvdx_cast_paragraph"] = createExportWrapper("spvdx_cast_paragraph");

/** @type {function(...*):?} */
var _spvdx_is_relabel = Module["_spvdx_is_relabel"] = createExportWrapper("spvdx_is_relabel");

/** @type {function(...*):?} */
var _spvdx_cast_relabel = Module["_spvdx_cast_relabel"] = createExportWrapper("spvdx_cast_relabel");

/** @type {function(...*):?} */
var _spvdx_parse_set_style = Module["_spvdx_parse_set_style"] = createExportWrapper("spvdx_parse_set_style");

/** @type {function(...*):?} */
var _spvdx_parse_set_frame_style = Module["_spvdx_parse_set_frame_style"] = createExportWrapper("spvdx_parse_set_frame_style");

/** @type {function(...*):?} */
var _spvdx_parse_set_format = Module["_spvdx_parse_set_format"] = createExportWrapper("spvdx_parse_set_format");

/** @type {function(...*):?} */
var _spvdx_parse_set_meta_data = Module["_spvdx_parse_set_meta_data"] = createExportWrapper("spvdx_parse_set_meta_data");

/** @type {function(...*):?} */
var _spvdx_parse_union = Module["_spvdx_parse_union"] = createExportWrapper("spvdx_parse_union");

/** @type {function(...*):?} */
var _spvdx_free_union = Module["_spvdx_free_union"] = createExportWrapper("spvdx_free_union");

/** @type {function(...*):?} */
var _spvdx_is_set_cell_properties = Module["_spvdx_is_set_cell_properties"] = createExportWrapper("spvdx_is_set_cell_properties");

/** @type {function(...*):?} */
var _spvdx_cast_set_cell_properties = Module["_spvdx_cast_set_cell_properties"] = createExportWrapper("spvdx_cast_set_cell_properties");

/** @type {function(...*):?} */
var _spvdx_free_set_format = Module["_spvdx_free_set_format"] = createExportWrapper("spvdx_free_set_format");

/** @type {function(...*):?} */
var _spvdx_free_string_format = Module["_spvdx_free_string_format"] = createExportWrapper("spvdx_free_string_format");

/** @type {function(...*):?} */
var _spvdx_is_set_format = Module["_spvdx_is_set_format"] = createExportWrapper("spvdx_is_set_format");

/** @type {function(...*):?} */
var _spvdx_cast_set_format = Module["_spvdx_cast_set_format"] = createExportWrapper("spvdx_cast_set_format");

/** @type {function(...*):?} */
var _spvdx_free_set_frame_style = Module["_spvdx_free_set_frame_style"] = createExportWrapper("spvdx_free_set_frame_style");

/** @type {function(...*):?} */
var _spvdx_is_set_frame_style = Module["_spvdx_is_set_frame_style"] = createExportWrapper("spvdx_is_set_frame_style");

/** @type {function(...*):?} */
var _spvdx_cast_set_frame_style = Module["_spvdx_cast_set_frame_style"] = createExportWrapper("spvdx_cast_set_frame_style");

/** @type {function(...*):?} */
var _spvdx_free_set_meta_data = Module["_spvdx_free_set_meta_data"] = createExportWrapper("spvdx_free_set_meta_data");

/** @type {function(...*):?} */
var _spvdx_is_set_meta_data = Module["_spvdx_is_set_meta_data"] = createExportWrapper("spvdx_is_set_meta_data");

/** @type {function(...*):?} */
var _spvdx_cast_set_meta_data = Module["_spvdx_cast_set_meta_data"] = createExportWrapper("spvdx_cast_set_meta_data");

/** @type {function(...*):?} */
var _spvdx_free_set_style = Module["_spvdx_free_set_style"] = createExportWrapper("spvdx_free_set_style");

/** @type {function(...*):?} */
var _spvdx_is_set_style = Module["_spvdx_is_set_style"] = createExportWrapper("spvdx_is_set_style");

/** @type {function(...*):?} */
var _spvdx_cast_set_style = Module["_spvdx_cast_set_style"] = createExportWrapper("spvdx_cast_set_style");

/** @type {function(...*):?} */
var _spvdx_is_simple_sort = Module["_spvdx_is_simple_sort"] = createExportWrapper("spvdx_is_simple_sort");

/** @type {function(...*):?} */
var _spvdx_cast_simple_sort = Module["_spvdx_cast_simple_sort"] = createExportWrapper("spvdx_cast_simple_sort");

/** @type {function(...*):?} */
var _spvdx_parse_source_variable = Module["_spvdx_parse_source_variable"] = createExportWrapper("spvdx_parse_source_variable");

/** @type {function(...*):?} */
var _spvdx_free_source_variable = Module["_spvdx_free_source_variable"] = createExportWrapper("spvdx_free_source_variable");

/** @type {function(...*):?} */
var _spvdx_is_source_variable = Module["_spvdx_is_source_variable"] = createExportWrapper("spvdx_is_source_variable");

/** @type {function(...*):?} */
var _spvdx_cast_source_variable = Module["_spvdx_cast_source_variable"] = createExportWrapper("spvdx_cast_source_variable");

/** @type {function(...*):?} */
var _spvdx_is_string_format = Module["_spvdx_is_string_format"] = createExportWrapper("spvdx_is_string_format");

/** @type {function(...*):?} */
var _spvdx_cast_string_format = Module["_spvdx_cast_string_format"] = createExportWrapper("spvdx_cast_string_format");

/** @type {function(...*):?} */
var _spvdx_parse_style = Module["_spvdx_parse_style"] = createExportWrapper("spvdx_parse_style");

/** @type {function(...*):?} */
var _spvxml_attr_parse_color = Module["_spvxml_attr_parse_color"] = createExportWrapper("spvxml_attr_parse_color");

/** @type {function(...*):?} */
var _spvdx_free_style = Module["_spvdx_free_style"] = createExportWrapper("spvdx_free_style");

/** @type {function(...*):?} */
var _spvdx_is_style = Module["_spvdx_is_style"] = createExportWrapper("spvdx_is_style");

/** @type {function(...*):?} */
var _spvdx_cast_style = Module["_spvdx_cast_style"] = createExportWrapper("spvdx_cast_style");

/** @type {function(...*):?} */
var _spvdx_is_table_layout = Module["_spvdx_is_table_layout"] = createExportWrapper("spvdx_is_table_layout");

/** @type {function(...*):?} */
var _spvdx_cast_table_layout = Module["_spvdx_cast_table_layout"] = createExportWrapper("spvdx_cast_table_layout");

/** @type {function(...*):?} */
var _spvdx_is_text = Module["_spvdx_is_text"] = createExportWrapper("spvdx_is_text");

/** @type {function(...*):?} */
var _spvdx_cast_text = Module["_spvdx_cast_text"] = createExportWrapper("spvdx_cast_text");

/** @type {function(...*):?} */
var _spvdx_is_union = Module["_spvdx_is_union"] = createExportWrapper("spvdx_is_union");

/** @type {function(...*):?} */
var _spvdx_cast_union = Module["_spvdx_cast_union"] = createExportWrapper("spvdx_cast_union");

/** @type {function(...*):?} */
var _spvdx_free_unity = Module["_spvdx_free_unity"] = createExportWrapper("spvdx_free_unity");

/** @type {function(...*):?} */
var _spvdx_is_unity = Module["_spvdx_is_unity"] = createExportWrapper("spvdx_is_unity");

/** @type {function(...*):?} */
var _spvdx_cast_unity = Module["_spvdx_cast_unity"] = createExportWrapper("spvdx_cast_unity");

/** @type {function(...*):?} */
var _spvdx_parse_user_source = Module["_spvdx_parse_user_source"] = createExportWrapper("spvdx_parse_user_source");

/** @type {function(...*):?} */
var _spvdx_free_user_source = Module["_spvdx_free_user_source"] = createExportWrapper("spvdx_free_user_source");

/** @type {function(...*):?} */
var _spvdx_is_user_source = Module["_spvdx_is_user_source"] = createExportWrapper("spvdx_is_user_source");

/** @type {function(...*):?} */
var _spvdx_cast_user_source = Module["_spvdx_cast_user_source"] = createExportWrapper("spvdx_cast_user_source");

/** @type {function(...*):?} */
var _spvdx_is_value_map_entry = Module["_spvdx_is_value_map_entry"] = createExportWrapper("spvdx_is_value_map_entry");

/** @type {function(...*):?} */
var _spvdx_cast_value_map_entry = Module["_spvdx_cast_value_map_entry"] = createExportWrapper("spvdx_cast_value_map_entry");

/** @type {function(...*):?} */
var _spvdx_is_variable_reference = Module["_spvdx_is_variable_reference"] = createExportWrapper("spvdx_is_variable_reference");

/** @type {function(...*):?} */
var _spvdx_cast_variable_reference = Module["_spvdx_cast_variable_reference"] = createExportWrapper("spvdx_cast_variable_reference");

/** @type {function(...*):?} */
var _spvdx_is_variable_extension = Module["_spvdx_is_variable_extension"] = createExportWrapper("spvdx_is_variable_extension");

/** @type {function(...*):?} */
var _spvdx_cast_variable_extension = Module["_spvdx_cast_variable_extension"] = createExportWrapper("spvdx_cast_variable_extension");

/** @type {function(...*):?} */
var _spvdx_parse_visualization = Module["_spvdx_parse_visualization"] = createExportWrapper("spvdx_parse_visualization");

/** @type {function(...*):?} */
var _spvdx_free_visualization = Module["_spvdx_free_visualization"] = createExportWrapper("spvdx_free_visualization");

/** @type {function(...*):?} */
var _spvdx_parse_visualization_extension = Module["_spvdx_parse_visualization_extension"] = createExportWrapper("spvdx_parse_visualization_extension");

/** @type {function(...*):?} */
var _spvdx_free_visualization_extension = Module["_spvdx_free_visualization_extension"] = createExportWrapper("spvdx_free_visualization_extension");

/** @type {function(...*):?} */
var _spvdx_is_visualization = Module["_spvdx_is_visualization"] = createExportWrapper("spvdx_is_visualization");

/** @type {function(...*):?} */
var _spvdx_cast_visualization = Module["_spvdx_cast_visualization"] = createExportWrapper("spvdx_cast_visualization");

/** @type {function(...*):?} */
var _spvdx_is_visualization_extension = Module["_spvdx_is_visualization_extension"] = createExportWrapper("spvdx_is_visualization_extension");

/** @type {function(...*):?} */
var _spvdx_cast_visualization_extension = Module["_spvdx_cast_visualization_extension"] = createExportWrapper("spvdx_cast_visualization_extension");

/** @type {function(...*):?} */
var _spvdx_is_where = Module["_spvdx_is_where"] = createExportWrapper("spvdx_is_where");

/** @type {function(...*):?} */
var _spvdx_cast_where = Module["_spvdx_cast_where"] = createExportWrapper("spvdx_cast_where");

/** @type {function(...*):?} */
var _spvlb_parse_table = Module["_spvlb_parse_table"] = createExportWrapper("spvlb_parse_table");

/** @type {function(...*):?} */
var _spvlb_parse_header = Module["_spvlb_parse_header"] = createExportWrapper("spvlb_parse_header");

/** @type {function(...*):?} */
var _spvlb_parse_titles = Module["_spvlb_parse_titles"] = createExportWrapper("spvlb_parse_titles");

/** @type {function(...*):?} */
var _spvlb_parse_footnotes = Module["_spvlb_parse_footnotes"] = createExportWrapper("spvlb_parse_footnotes");

/** @type {function(...*):?} */
var _spvlb_parse_areas = Module["_spvlb_parse_areas"] = createExportWrapper("spvlb_parse_areas");

/** @type {function(...*):?} */
var _spvlb_parse_borders = Module["_spvlb_parse_borders"] = createExportWrapper("spvlb_parse_borders");

/** @type {function(...*):?} */
var _spvlb_parse_print_settings = Module["_spvlb_parse_print_settings"] = createExportWrapper("spvlb_parse_print_settings");

/** @type {function(...*):?} */
var _spvlb_parse_table_settings = Module["_spvlb_parse_table_settings"] = createExportWrapper("spvlb_parse_table_settings");

/** @type {function(...*):?} */
var _spvlb_parse_formats = Module["_spvlb_parse_formats"] = createExportWrapper("spvlb_parse_formats");

/** @type {function(...*):?} */
var _spvlb_parse_dimensions = Module["_spvlb_parse_dimensions"] = createExportWrapper("spvlb_parse_dimensions");

/** @type {function(...*):?} */
var _spvlb_parse_axes = Module["_spvlb_parse_axes"] = createExportWrapper("spvlb_parse_axes");

/** @type {function(...*):?} */
var _spvlb_parse_cells = Module["_spvlb_parse_cells"] = createExportWrapper("spvlb_parse_cells");

/** @type {function(...*):?} */
var _spvbin_position_save = Module["_spvbin_position_save"] = createExportWrapper("spvbin_position_save");

/** @type {function(...*):?} */
var _spvbin_match_bytes = Module["_spvbin_match_bytes"] = createExportWrapper("spvbin_match_bytes");

/** @type {function(...*):?} */
var _spvbin_position_restore = Module["_spvbin_position_restore"] = createExportWrapper("spvbin_position_restore");

/** @type {function(...*):?} */
var _spvbin_error = Module["_spvbin_error"] = createExportWrapper("spvbin_error");

/** @type {function(...*):?} */
var _spvlb_free_table = Module["_spvlb_free_table"] = createExportWrapper("spvlb_free_table");

/** @type {function(...*):?} */
var _spvbin_parse_int32 = Module["_spvbin_parse_int32"] = createExportWrapper("spvbin_parse_int32");

/** @type {function(...*):?} */
var _spvbin_parse_bool = Module["_spvbin_parse_bool"] = createExportWrapper("spvbin_parse_bool");

/** @type {function(...*):?} */
var _spvbin_parse_int64 = Module["_spvbin_parse_int64"] = createExportWrapper("spvbin_parse_int64");

/** @type {function(...*):?} */
var _spvlb_parse_value = Module["_spvlb_parse_value"] = createExportWrapper("spvlb_parse_value");

/** @type {function(...*):?} */
var _spvlb_free_value = Module["_spvlb_free_value"] = createExportWrapper("spvlb_free_value");

/** @type {function(...*):?} */
var _spvlb_parse_footnote = Module["_spvlb_parse_footnote"] = createExportWrapper("spvlb_parse_footnote");

/** @type {function(...*):?} */
var _spvlb_parse_area = Module["_spvlb_parse_area"] = createExportWrapper("spvlb_parse_area");

/** @type {function(...*):?} */
var _spvlb_free_areas = Module["_spvlb_free_areas"] = createExportWrapper("spvlb_free_areas");

/** @type {function(...*):?} */
var _spvbin_limit_parse = Module["_spvbin_limit_parse"] = createExportWrapper("spvbin_limit_parse");

/** @type {function(...*):?} */
var _spvbin_parse_be32 = Module["_spvbin_parse_be32"] = createExportWrapper("spvbin_parse_be32");

/** @type {function(...*):?} */
var _spvlb_parse_border = Module["_spvlb_parse_border"] = createExportWrapper("spvlb_parse_border");

/** @type {function(...*):?} */
var _spvbin_input_at_end = Module["_spvbin_input_at_end"] = createExportWrapper("spvbin_input_at_end");

/** @type {function(...*):?} */
var _spvbin_limit_pop = Module["_spvbin_limit_pop"] = createExportWrapper("spvbin_limit_pop");

/** @type {function(...*):?} */
var _spvbin_parse_bestring = Module["_spvbin_parse_bestring"] = createExportWrapper("spvbin_parse_bestring");

/** @type {function(...*):?} */
var _spvbin_parse_byte = Module["_spvbin_parse_byte"] = createExportWrapper("spvbin_parse_byte");

/** @type {function(...*):?} */
var _spvbin_limit_parse_be = Module["_spvbin_limit_parse_be"] = createExportWrapper("spvbin_limit_parse_be");

/** @type {function(...*):?} */
var _spvlb_parse_breakpoints = Module["_spvlb_parse_breakpoints"] = createExportWrapper("spvlb_parse_breakpoints");

/** @type {function(...*):?} */
var _spvlb_parse_keeps = Module["_spvlb_parse_keeps"] = createExportWrapper("spvlb_parse_keeps");

/** @type {function(...*):?} */
var _spvlb_parse_point_keeps = Module["_spvlb_parse_point_keeps"] = createExportWrapper("spvlb_parse_point_keeps");

/** @type {function(...*):?} */
var _spvlb_free_table_settings = Module["_spvlb_free_table_settings"] = createExportWrapper("spvlb_free_table_settings");

/** @type {function(...*):?} */
var _spvbin_parse_string = Module["_spvbin_parse_string"] = createExportWrapper("spvbin_parse_string");

/** @type {function(...*):?} */
var _spvlb_parse_y0 = Module["_spvlb_parse_y0"] = createExportWrapper("spvlb_parse_y0");

/** @type {function(...*):?} */
var _spvlb_parse_custom_currency = Module["_spvlb_parse_custom_currency"] = createExportWrapper("spvlb_parse_custom_currency");

/** @type {function(...*):?} */
var _spvlb_parse_x0 = Module["_spvlb_parse_x0"] = createExportWrapper("spvlb_parse_x0");

/** @type {function(...*):?} */
var _spvlb_parse_x1 = Module["_spvlb_parse_x1"] = createExportWrapper("spvlb_parse_x1");

/** @type {function(...*):?} */
var _spvlb_parse_x2 = Module["_spvlb_parse_x2"] = createExportWrapper("spvlb_parse_x2");

/** @type {function(...*):?} */
var _spvlb_parse_x3 = Module["_spvlb_parse_x3"] = createExportWrapper("spvlb_parse_x3");

/** @type {function(...*):?} */
var _spvlb_free_formats = Module["_spvlb_free_formats"] = createExportWrapper("spvlb_free_formats");

/** @type {function(...*):?} */
var _spvlb_parse_dimension = Module["_spvlb_parse_dimension"] = createExportWrapper("spvlb_parse_dimension");

/** @type {function(...*):?} */
var _spvlb_free_dimension = Module["_spvlb_free_dimension"] = createExportWrapper("spvlb_free_dimension");

/** @type {function(...*):?} */
var _spvlb_parse_cell = Module["_spvlb_parse_cell"] = createExportWrapper("spvlb_parse_cell");

/** @type {function(...*):?} */
var _spvlb_free_header = Module["_spvlb_free_header"] = createExportWrapper("spvlb_free_header");

/** @type {function(...*):?} */
var _spvlb_free_titles = Module["_spvlb_free_titles"] = createExportWrapper("spvlb_free_titles");

/** @type {function(...*):?} */
var _spvlb_free_footnotes = Module["_spvlb_free_footnotes"] = createExportWrapper("spvlb_free_footnotes");

/** @type {function(...*):?} */
var _spvlb_free_borders = Module["_spvlb_free_borders"] = createExportWrapper("spvlb_free_borders");

/** @type {function(...*):?} */
var _spvlb_free_print_settings = Module["_spvlb_free_print_settings"] = createExportWrapper("spvlb_free_print_settings");

/** @type {function(...*):?} */
var _spvlb_free_x0 = Module["_spvlb_free_x0"] = createExportWrapper("spvlb_free_x0");

/** @type {function(...*):?} */
var _spvlb_free_x2 = Module["_spvlb_free_x2"] = createExportWrapper("spvlb_free_x2");

/** @type {function(...*):?} */
var _spvlb_free_x3 = Module["_spvlb_free_x3"] = createExportWrapper("spvlb_free_x3");

/** @type {function(...*):?} */
var _spvlb_free_dimensions = Module["_spvlb_free_dimensions"] = createExportWrapper("spvlb_free_dimensions");

/** @type {function(...*):?} */
var _spvlb_free_axes = Module["_spvlb_free_axes"] = createExportWrapper("spvlb_free_axes");

/** @type {function(...*):?} */
var _spvlb_free_cells = Module["_spvlb_free_cells"] = createExportWrapper("spvlb_free_cells");

/** @type {function(...*):?} */
var _spvlb_print_table = Module["_spvlb_print_table"] = createExportWrapper("spvlb_print_table");

/** @type {function(...*):?} */
var _spvbin_print_header = Module["_spvbin_print_header"] = createExportWrapper("spvbin_print_header");

/** @type {function(...*):?} */
var _spvlb_print_header = Module["_spvlb_print_header"] = createExportWrapper("spvlb_print_header");

/** @type {function(...*):?} */
var _spvlb_print_titles = Module["_spvlb_print_titles"] = createExportWrapper("spvlb_print_titles");

/** @type {function(...*):?} */
var _spvlb_print_footnotes = Module["_spvlb_print_footnotes"] = createExportWrapper("spvlb_print_footnotes");

/** @type {function(...*):?} */
var _spvlb_print_areas = Module["_spvlb_print_areas"] = createExportWrapper("spvlb_print_areas");

/** @type {function(...*):?} */
var _spvlb_print_borders = Module["_spvlb_print_borders"] = createExportWrapper("spvlb_print_borders");

/** @type {function(...*):?} */
var _spvlb_print_print_settings = Module["_spvlb_print_print_settings"] = createExportWrapper("spvlb_print_print_settings");

/** @type {function(...*):?} */
var _spvlb_print_table_settings = Module["_spvlb_print_table_settings"] = createExportWrapper("spvlb_print_table_settings");

/** @type {function(...*):?} */
var _spvlb_print_formats = Module["_spvlb_print_formats"] = createExportWrapper("spvlb_print_formats");

/** @type {function(...*):?} */
var _spvlb_print_dimensions = Module["_spvlb_print_dimensions"] = createExportWrapper("spvlb_print_dimensions");

/** @type {function(...*):?} */
var _spvlb_print_axes = Module["_spvlb_print_axes"] = createExportWrapper("spvlb_print_axes");

/** @type {function(...*):?} */
var _spvlb_print_cells = Module["_spvlb_print_cells"] = createExportWrapper("spvlb_print_cells");

/** @type {function(...*):?} */
var _spvbin_print_int32 = Module["_spvbin_print_int32"] = createExportWrapper("spvbin_print_int32");

/** @type {function(...*):?} */
var _spvbin_print_bool = Module["_spvbin_print_bool"] = createExportWrapper("spvbin_print_bool");

/** @type {function(...*):?} */
var _spvbin_print_int64 = Module["_spvbin_print_int64"] = createExportWrapper("spvbin_print_int64");

/** @type {function(...*):?} */
var _spvlb_print_value = Module["_spvlb_print_value"] = createExportWrapper("spvlb_print_value");

/** @type {function(...*):?} */
var _spvlb_print_footnote = Module["_spvlb_print_footnote"] = createExportWrapper("spvlb_print_footnote");

/** @type {function(...*):?} */
var _spvlb_print_area = Module["_spvlb_print_area"] = createExportWrapper("spvlb_print_area");

/** @type {function(...*):?} */
var _spvlb_print_border = Module["_spvlb_print_border"] = createExportWrapper("spvlb_print_border");

/** @type {function(...*):?} */
var _spvbin_print_string = Module["_spvbin_print_string"] = createExportWrapper("spvbin_print_string");

/** @type {function(...*):?} */
var _spvbin_print_byte = Module["_spvbin_print_byte"] = createExportWrapper("spvbin_print_byte");

/** @type {function(...*):?} */
var _spvlb_print_breakpoints = Module["_spvlb_print_breakpoints"] = createExportWrapper("spvlb_print_breakpoints");

/** @type {function(...*):?} */
var _spvlb_print_keeps = Module["_spvlb_print_keeps"] = createExportWrapper("spvlb_print_keeps");

/** @type {function(...*):?} */
var _spvlb_print_point_keeps = Module["_spvlb_print_point_keeps"] = createExportWrapper("spvlb_print_point_keeps");

/** @type {function(...*):?} */
var _spvlb_print_y0 = Module["_spvlb_print_y0"] = createExportWrapper("spvlb_print_y0");

/** @type {function(...*):?} */
var _spvlb_print_custom_currency = Module["_spvlb_print_custom_currency"] = createExportWrapper("spvlb_print_custom_currency");

/** @type {function(...*):?} */
var _spvlb_print_x0 = Module["_spvlb_print_x0"] = createExportWrapper("spvlb_print_x0");

/** @type {function(...*):?} */
var _spvlb_print_x1 = Module["_spvlb_print_x1"] = createExportWrapper("spvlb_print_x1");

/** @type {function(...*):?} */
var _spvlb_print_x2 = Module["_spvlb_print_x2"] = createExportWrapper("spvlb_print_x2");

/** @type {function(...*):?} */
var _spvlb_print_x3 = Module["_spvlb_print_x3"] = createExportWrapper("spvlb_print_x3");

/** @type {function(...*):?} */
var _spvlb_print_dimension = Module["_spvlb_print_dimension"] = createExportWrapper("spvlb_print_dimension");

/** @type {function(...*):?} */
var _spvlb_print_cell = Module["_spvlb_print_cell"] = createExportWrapper("spvlb_print_cell");

/** @type {function(...*):?} */
var _spvbin_match_byte = Module["_spvbin_match_byte"] = createExportWrapper("spvbin_match_byte");

/** @type {function(...*):?} */
var _spvlb_parse_value_mod = Module["_spvlb_parse_value_mod"] = createExportWrapper("spvlb_parse_value_mod");

/** @type {function(...*):?} */
var _spvbin_parse_double = Module["_spvbin_parse_double"] = createExportWrapper("spvbin_parse_double");

/** @type {function(...*):?} */
var _spvlb_parse_argument = Module["_spvlb_parse_argument"] = createExportWrapper("spvlb_parse_argument");

/** @type {function(...*):?} */
var _spvlb_free_value_mod = Module["_spvlb_free_value_mod"] = createExportWrapper("spvlb_free_value_mod");

/** @type {function(...*):?} */
var _spvbin_print_case = Module["_spvbin_print_case"] = createExportWrapper("spvbin_print_case");

/** @type {function(...*):?} */
var _spvlb_print_value_mod = Module["_spvlb_print_value_mod"] = createExportWrapper("spvlb_print_value_mod");

/** @type {function(...*):?} */
var _spvbin_print_double = Module["_spvbin_print_double"] = createExportWrapper("spvbin_print_double");

/** @type {function(...*):?} */
var _spvlb_print_argument = Module["_spvlb_print_argument"] = createExportWrapper("spvlb_print_argument");

/** @type {function(...*):?} */
var _spvlb_free_footnote = Module["_spvlb_free_footnote"] = createExportWrapper("spvlb_free_footnote");

/** @type {function(...*):?} */
var _spvbin_parse_float = Module["_spvbin_parse_float"] = createExportWrapper("spvbin_parse_float");

/** @type {function(...*):?} */
var _spvlb_free_area = Module["_spvlb_free_area"] = createExportWrapper("spvlb_free_area");

/** @type {function(...*):?} */
var _spvlb_free_border = Module["_spvlb_free_border"] = createExportWrapper("spvlb_free_border");

/** @type {function(...*):?} */
var _spvlb_parse_point_keep = Module["_spvlb_parse_point_keep"] = createExportWrapper("spvlb_parse_point_keep");

/** @type {function(...*):?} */
var _spvlb_free_breakpoints = Module["_spvlb_free_breakpoints"] = createExportWrapper("spvlb_free_breakpoints");

/** @type {function(...*):?} */
var _spvlb_free_keeps = Module["_spvlb_free_keeps"] = createExportWrapper("spvlb_free_keeps");

/** @type {function(...*):?} */
var _spvlb_free_point_keeps = Module["_spvlb_free_point_keeps"] = createExportWrapper("spvlb_free_point_keeps");

/** @type {function(...*):?} */
var _spvlb_print_keep = Module["_spvlb_print_keep"] = createExportWrapper("spvlb_print_keep");

/** @type {function(...*):?} */
var _spvlb_parse_keep = Module["_spvlb_parse_keep"] = createExportWrapper("spvlb_parse_keep");

/** @type {function(...*):?} */
var _spvlb_free_keep = Module["_spvlb_free_keep"] = createExportWrapper("spvlb_free_keep");

/** @type {function(...*):?} */
var _spvlb_free_point_keep = Module["_spvlb_free_point_keep"] = createExportWrapper("spvlb_free_point_keep");

/** @type {function(...*):?} */
var _spvlb_print_point_keep = Module["_spvlb_print_point_keep"] = createExportWrapper("spvlb_print_point_keep");

/** @type {function(...*):?} */
var _spvlb_parse_y1 = Module["_spvlb_parse_y1"] = createExportWrapper("spvlb_parse_y1");

/** @type {function(...*):?} */
var _spvlb_parse_y2 = Module["_spvlb_parse_y2"] = createExportWrapper("spvlb_parse_y2");

/** @type {function(...*):?} */
var _spvbin_parse_int16 = Module["_spvbin_parse_int16"] = createExportWrapper("spvbin_parse_int16");

/** @type {function(...*):?} */
var _spvlb_parse_style_pair = Module["_spvlb_parse_style_pair"] = createExportWrapper("spvlb_parse_style_pair");

/** @type {function(...*):?} */
var _spvlb_free_y0 = Module["_spvlb_free_y0"] = createExportWrapper("spvlb_free_y0");

/** @type {function(...*):?} */
var _spvlb_free_custom_currency = Module["_spvlb_free_custom_currency"] = createExportWrapper("spvlb_free_custom_currency");

/** @type {function(...*):?} */
var _spvlb_free_y1 = Module["_spvlb_free_y1"] = createExportWrapper("spvlb_free_y1");

/** @type {function(...*):?} */
var _spvlb_free_x1 = Module["_spvlb_free_x1"] = createExportWrapper("spvlb_free_x1");

/** @type {function(...*):?} */
var _spvlb_print_y1 = Module["_spvlb_print_y1"] = createExportWrapper("spvlb_print_y1");

/** @type {function(...*):?} */
var _spvlb_print_y2 = Module["_spvlb_print_y2"] = createExportWrapper("spvlb_print_y2");

/** @type {function(...*):?} */
var _spvlb_print_style_map = Module["_spvlb_print_style_map"] = createExportWrapper("spvlb_print_style_map");

/** @type {function(...*):?} */
var _spvlb_print_style_pair = Module["_spvlb_print_style_pair"] = createExportWrapper("spvlb_print_style_pair");

/** @type {function(...*):?} */
var _spvlb_free_y2 = Module["_spvlb_free_y2"] = createExportWrapper("spvlb_free_y2");

/** @type {function(...*):?} */
var _spvlb_parse_style_map = Module["_spvlb_parse_style_map"] = createExportWrapper("spvlb_parse_style_map");

/** @type {function(...*):?} */
var _spvlb_parse_font_style = Module["_spvlb_parse_font_style"] = createExportWrapper("spvlb_parse_font_style");

/** @type {function(...*):?} */
var _spvlb_parse_cell_style = Module["_spvlb_parse_cell_style"] = createExportWrapper("spvlb_parse_cell_style");

/** @type {function(...*):?} */
var _spvlb_free_style_map = Module["_spvlb_free_style_map"] = createExportWrapper("spvlb_free_style_map");

/** @type {function(...*):?} */
var _spvlb_free_style_pair = Module["_spvlb_free_style_pair"] = createExportWrapper("spvlb_free_style_pair");

/** @type {function(...*):?} */
var _spvbin_print_int16 = Module["_spvbin_print_int16"] = createExportWrapper("spvbin_print_int16");

/** @type {function(...*):?} */
var _spvlb_print_font_style = Module["_spvlb_print_font_style"] = createExportWrapper("spvlb_print_font_style");

/** @type {function(...*):?} */
var _spvlb_print_cell_style = Module["_spvlb_print_cell_style"] = createExportWrapper("spvlb_print_cell_style");

/** @type {function(...*):?} */
var _spvlb_parse_dim_properties = Module["_spvlb_parse_dim_properties"] = createExportWrapper("spvlb_parse_dim_properties");

/** @type {function(...*):?} */
var _spvlb_parse_category = Module["_spvlb_parse_category"] = createExportWrapper("spvlb_parse_category");

/** @type {function(...*):?} */
var _spvlb_free_group = Module["_spvlb_free_group"] = createExportWrapper("spvlb_free_group");

/** @type {function(...*):?} */
var _spvlb_print_dim_properties = Module["_spvlb_print_dim_properties"] = createExportWrapper("spvlb_print_dim_properties");

/** @type {function(...*):?} */
var _spvlb_print_category = Module["_spvlb_print_category"] = createExportWrapper("spvlb_print_category");

/** @type {function(...*):?} */
var _spvlb_parse_leaf = Module["_spvlb_parse_leaf"] = createExportWrapper("spvlb_parse_leaf");

/** @type {function(...*):?} */
var _spvlb_parse_group = Module["_spvlb_parse_group"] = createExportWrapper("spvlb_parse_group");

/** @type {function(...*):?} */
var _spvlb_free_dim_properties = Module["_spvlb_free_dim_properties"] = createExportWrapper("spvlb_free_dim_properties");

/** @type {function(...*):?} */
var _spvlb_free_category = Module["_spvlb_free_category"] = createExportWrapper("spvlb_free_category");

/** @type {function(...*):?} */
var _spvlb_print_group = Module["_spvlb_print_group"] = createExportWrapper("spvlb_print_group");

/** @type {function(...*):?} */
var _spvlb_free_leaf = Module["_spvlb_free_leaf"] = createExportWrapper("spvlb_free_leaf");

/** @type {function(...*):?} */
var _spvlb_print_leaf = Module["_spvlb_print_leaf"] = createExportWrapper("spvlb_print_leaf");

/** @type {function(...*):?} */
var _spvlb_free_cell = Module["_spvlb_free_cell"] = createExportWrapper("spvlb_free_cell");

/** @type {function(...*):?} */
var _spvlb_parse_template_string = Module["_spvlb_parse_template_string"] = createExportWrapper("spvlb_parse_template_string");

/** @type {function(...*):?} */
var _spvlb_free_argument = Module["_spvlb_free_argument"] = createExportWrapper("spvlb_free_argument");

/** @type {function(...*):?} */
var _spvlb_free_template_string = Module["_spvlb_free_template_string"] = createExportWrapper("spvlb_free_template_string");

/** @type {function(...*):?} */
var _spvlb_print_template_string = Module["_spvlb_print_template_string"] = createExportWrapper("spvlb_print_template_string");

/** @type {function(...*):?} */
var _spvlb_free_font_style = Module["_spvlb_free_font_style"] = createExportWrapper("spvlb_free_font_style");

/** @type {function(...*):?} */
var _spvlb_free_cell_style = Module["_spvlb_free_cell_style"] = createExportWrapper("spvlb_free_cell_style");

/** @type {function(...*):?} */
var _spvob_parse_legacy_binary = Module["_spvob_parse_legacy_binary"] = createExportWrapper("spvob_parse_legacy_binary");

/** @type {function(...*):?} */
var _spvob_parse_metadata = Module["_spvob_parse_metadata"] = createExportWrapper("spvob_parse_metadata");

/** @type {function(...*):?} */
var _spvob_free_legacy_binary = Module["_spvob_free_legacy_binary"] = createExportWrapper("spvob_free_legacy_binary");

/** @type {function(...*):?} */
var _spvob_free_metadata = Module["_spvob_free_metadata"] = createExportWrapper("spvob_free_metadata");

/** @type {function(...*):?} */
var _spvob_print_legacy_binary = Module["_spvob_print_legacy_binary"] = createExportWrapper("spvob_print_legacy_binary");

/** @type {function(...*):?} */
var _spvob_print_metadata = Module["_spvob_print_metadata"] = createExportWrapper("spvob_print_metadata");

/** @type {function(...*):?} */
var _spvob_parse_strings = Module["_spvob_parse_strings"] = createExportWrapper("spvob_parse_strings");

/** @type {function(...*):?} */
var _spvob_parse_source_maps = Module["_spvob_parse_source_maps"] = createExportWrapper("spvob_parse_source_maps");

/** @type {function(...*):?} */
var _spvob_parse_labels = Module["_spvob_parse_labels"] = createExportWrapper("spvob_parse_labels");

/** @type {function(...*):?} */
var _spvob_free_strings = Module["_spvob_free_strings"] = createExportWrapper("spvob_free_strings");

/** @type {function(...*):?} */
var _spvob_parse_source_map = Module["_spvob_parse_source_map"] = createExportWrapper("spvob_parse_source_map");

/** @type {function(...*):?} */
var _spvob_free_source_map = Module["_spvob_free_source_map"] = createExportWrapper("spvob_free_source_map");

/** @type {function(...*):?} */
var _spvob_parse_label = Module["_spvob_parse_label"] = createExportWrapper("spvob_parse_label");

/** @type {function(...*):?} */
var _spvob_free_source_maps = Module["_spvob_free_source_maps"] = createExportWrapper("spvob_free_source_maps");

/** @type {function(...*):?} */
var _spvob_free_labels = Module["_spvob_free_labels"] = createExportWrapper("spvob_free_labels");

/** @type {function(...*):?} */
var _spvob_print_strings = Module["_spvob_print_strings"] = createExportWrapper("spvob_print_strings");

/** @type {function(...*):?} */
var _spvob_print_source_maps = Module["_spvob_print_source_maps"] = createExportWrapper("spvob_print_source_maps");

/** @type {function(...*):?} */
var _spvob_print_labels = Module["_spvob_print_labels"] = createExportWrapper("spvob_print_labels");

/** @type {function(...*):?} */
var _spvob_print_source_map = Module["_spvob_print_source_map"] = createExportWrapper("spvob_print_source_map");

/** @type {function(...*):?} */
var _spvob_print_label = Module["_spvob_print_label"] = createExportWrapper("spvob_print_label");

/** @type {function(...*):?} */
var _spvob_parse_variable_map = Module["_spvob_parse_variable_map"] = createExportWrapper("spvob_parse_variable_map");

/** @type {function(...*):?} */
var _spvob_print_variable_map = Module["_spvob_print_variable_map"] = createExportWrapper("spvob_print_variable_map");

/** @type {function(...*):?} */
var _spvob_free_variable_map = Module["_spvob_free_variable_map"] = createExportWrapper("spvob_free_variable_map");

/** @type {function(...*):?} */
var _spvob_print_datum_map = Module["_spvob_print_datum_map"] = createExportWrapper("spvob_print_datum_map");

/** @type {function(...*):?} */
var _spvob_parse_datum_map = Module["_spvob_parse_datum_map"] = createExportWrapper("spvob_parse_datum_map");

/** @type {function(...*):?} */
var _spvob_free_datum_map = Module["_spvob_free_datum_map"] = createExportWrapper("spvob_free_datum_map");

/** @type {function(...*):?} */
var _spvob_free_label = Module["_spvob_free_label"] = createExportWrapper("spvob_free_label");

/** @type {function(...*):?} */
var _spv_parse_css_style = Module["_spv_parse_css_style"] = createExportWrapper("spv_parse_css_style");

/** @type {function(...*):?} */
var _spv_item_dump = Module["_spv_item_dump"] = createExportWrapper("spv_item_dump");

/** @type {function(...*):?} */
var _spv_data_uninit = Module["_spv_data_uninit"] = createExportWrapper("spv_data_uninit");

/** @type {function(...*):?} */
var _spv_data_source_uninit = Module["_spv_data_source_uninit"] = createExportWrapper("spv_data_source_uninit");

/** @type {function(...*):?} */
var _spv_data_dump = Module["_spv_data_dump"] = createExportWrapper("spv_data_dump");

/** @type {function(...*):?} */
var _spv_data_variable_dump = Module["_spv_data_variable_dump"] = createExportWrapper("spv_data_variable_dump");

/** @type {function(...*):?} */
var _spv_data_source_dump = Module["_spv_data_source_dump"] = createExportWrapper("spv_data_source_dump");

/** @type {function(...*):?} */
var _spv_data_find_source = Module["_spv_data_find_source"] = createExportWrapper("spv_data_find_source");

/** @type {function(...*):?} */
var _spv_data_find_variable = Module["_spv_data_find_variable"] = createExportWrapper("spv_data_find_variable");

/** @type {function(...*):?} */
var _spv_data_source_find_variable = Module["_spv_data_source_find_variable"] = createExportWrapper("spv_data_source_find_variable");

/** @type {function(...*):?} */
var _spv_data_variable_uninit = Module["_spv_data_variable_uninit"] = createExportWrapper("spv_data_variable_uninit");

/** @type {function(...*):?} */
var _spv_data_value_uninit = Module["_spv_data_value_uninit"] = createExportWrapper("spv_data_value_uninit");

/** @type {function(...*):?} */
var _spv_data_value_dump = Module["_spv_data_value_dump"] = createExportWrapper("spv_data_value_dump");

/** @type {function(...*):?} */
var _spv_data_value_equal = Module["_spv_data_value_equal"] = createExportWrapper("spv_data_value_equal");

/** @type {function(...*):?} */
var _spv_data_values_clone = Module["_spv_data_values_clone"] = createExportWrapper("spv_data_values_clone");

/** @type {function(...*):?} */
var _spv_legacy_data_decode = Module["_spv_legacy_data_decode"] = createExportWrapper("spv_legacy_data_decode");

/** @type {function(...*):?} */
var _spvbin_input_init = Module["_spvbin_input_init"] = createExportWrapper("spvbin_input_init");

/** @type {function(...*):?} */
var _spvbin_input_to_error = Module["_spvbin_input_to_error"] = createExportWrapper("spvbin_input_to_error");

/** @type {function(...*):?} */
var _decode_spvsx_legacy_properties = Module["_decode_spvsx_legacy_properties"] = createExportWrapper("decode_spvsx_legacy_properties");

/** @type {function(...*):?} */
var _spv_legacy_properties_destroy = Module["_spv_legacy_properties_destroy"] = createExportWrapper("spv_legacy_properties_destroy");

/** @type {function(...*):?} */
var _decode_spvdx_table = Module["_decode_spvdx_table"] = createExportWrapper("decode_spvdx_table");

/** @type {function(...*):?} */
var _spv_decode_fmt_spec = Module["_spv_decode_fmt_spec"] = createExportWrapper("spv_decode_fmt_spec");

/** @type {function(...*):?} */
var _decode_spvlb_table = Module["_decode_spvlb_table"] = createExportWrapper("decode_spvlb_table");

/** @type {function(...*):?} */
var _spv_text_submit = Module["_spv_text_submit"] = createExportWrapper("spv_text_submit");

/** @type {function(...*):?} */
var _spv_item_get_class = Module["_spv_item_get_class"] = createExportWrapper("spv_item_get_class");

/** @type {function(...*):?} */
var _spv_item_get_text = Module["_spv_item_get_text"] = createExportWrapper("spv_item_get_text");

/** @type {function(...*):?} */
var _spv_select = Module["_spv_select"] = createExportWrapper("spv_select");

/** @type {function(...*):?} */
var _spv_get_root = Module["_spv_get_root"] = createExportWrapper("spv_get_root");

/** @type {function(...*):?} */
var _spv_item_next = Module["_spv_item_next"] = createExportWrapper("spv_item_next");

/** @type {function(...*):?} */
var _spv_item_is_visible = Module["_spv_item_is_visible"] = createExportWrapper("spv_item_is_visible");

/** @type {function(...*):?} */
var _spv_item_load = Module["_spv_item_load"] = createExportWrapper("spv_item_load");

/** @type {function(...*):?} */
var _spv_item_get_command_id = Module["_spv_item_get_command_id"] = createExportWrapper("spv_item_get_command_id");

/** @type {function(...*):?} */
var _spv_item_get_subtype = Module["_spv_item_get_subtype"] = createExportWrapper("spv_item_get_subtype");

/** @type {function(...*):?} */
var _spv_item_get_label = Module["_spv_item_get_label"] = createExportWrapper("spv_item_get_label");

/** @type {function(...*):?} */
var _gmtime = Module["_gmtime"] = createExportWrapper("gmtime");

/** @type {function(...*):?} */
var _asctime = Module["_asctime"] = createExportWrapper("asctime");

/** @type {function(...*):?} */
var _spv_get_page_setup = Module["_spv_get_page_setup"] = createExportWrapper("spv_get_page_setup");

/** @type {function(...*):?} */
var _spv_item_type_to_string = Module["_spv_item_type_to_string"] = createExportWrapper("spv_item_type_to_string");

/** @type {function(...*):?} */
var _spv_item_class_to_string = Module["_spv_item_class_to_string"] = createExportWrapper("spv_item_class_to_string");

/** @type {function(...*):?} */
var _spv_item_class_from_string = Module["_spv_item_class_from_string"] = createExportWrapper("spv_item_class_from_string");

/** @type {function(...*):?} */
var _spv_item_get_type = Module["_spv_item_get_type"] = createExportWrapper("spv_item_get_type");

/** @type {function(...*):?} */
var _spv_item_is_heading = Module["_spv_item_is_heading"] = createExportWrapper("spv_item_is_heading");

/** @type {function(...*):?} */
var _spv_item_get_n_children = Module["_spv_item_get_n_children"] = createExportWrapper("spv_item_get_n_children");

/** @type {function(...*):?} */
var _spv_item_get_child = Module["_spv_item_get_child"] = createExportWrapper("spv_item_get_child");

/** @type {function(...*):?} */
var _spv_item_is_table = Module["_spv_item_is_table"] = createExportWrapper("spv_item_is_table");

/** @type {function(...*):?} */
var _spv_item_is_text = Module["_spv_item_is_text"] = createExportWrapper("spv_item_is_text");

/** @type {function(...*):?} */
var _spv_item_get_parent = Module["_spv_item_get_parent"] = createExportWrapper("spv_item_get_parent");

/** @type {function(...*):?} */
var _spv_item_get_level = Module["_spv_item_get_level"] = createExportWrapper("spv_item_get_level");

/** @type {function(...*):?} */
var _spv_item_get_table = Module["_spv_item_get_table"] = createExportWrapper("spv_item_get_table");

/** @type {function(...*):?} */
var _spv_item_format_path = Module["_spv_item_format_path"] = createExportWrapper("spv_item_format_path");

/** @type {function(...*):?} */
var _spvxml_context_finish = Module["_spvxml_context_finish"] = createExportWrapper("spvxml_context_finish");

/** @type {function(...*):?} */
var _spv_item_get_light_table = Module["_spv_item_get_light_table"] = createExportWrapper("spv_item_get_light_table");

/** @type {function(...*):?} */
var _spv_item_is_light_table = Module["_spv_item_is_light_table"] = createExportWrapper("spv_item_is_light_table");

/** @type {function(...*):?} */
var _spv_item_get_raw_light_table = Module["_spv_item_get_raw_light_table"] = createExportWrapper("spv_item_get_raw_light_table");

/** @type {function(...*):?} */
var _spv_item_is_legacy_table = Module["_spv_item_is_legacy_table"] = createExportWrapper("spv_item_is_legacy_table");

/** @type {function(...*):?} */
var _spv_item_get_raw_legacy_data = Module["_spv_item_get_raw_legacy_data"] = createExportWrapper("spv_item_get_raw_legacy_data");

/** @type {function(...*):?} */
var _spv_item_get_legacy_data = Module["_spv_item_get_legacy_data"] = createExportWrapper("spv_item_get_legacy_data");

/** @type {function(...*):?} */
var _spv_item_get_legacy_table = Module["_spv_item_get_legacy_table"] = createExportWrapper("spv_item_get_legacy_table");

/** @type {function(...*):?} */
var _spv_item_get_structure = Module["_spv_item_get_structure"] = createExportWrapper("spv_item_get_structure");

/** @type {function(...*):?} */
var _spv_detect = Module["_spv_detect"] = createExportWrapper("spv_detect");

/** @type {function(...*):?} */
var _spv_open = Module["_spv_open"] = createExportWrapper("spv_open");

/** @type {function(...*):?} */
var _spvsx_parse_root_heading = Module["_spvsx_parse_root_heading"] = createExportWrapper("spvsx_parse_root_heading");

/** @type {function(...*):?} */
var _spvsx_free_root_heading = Module["_spvsx_free_root_heading"] = createExportWrapper("spvsx_free_root_heading");

/** @type {function(...*):?} */
var _spv_close = Module["_spv_close"] = createExportWrapper("spv_close");

/** @type {function(...*):?} */
var _spvsx_is_container = Module["_spvsx_is_container"] = createExportWrapper("spvsx_is_container");

/** @type {function(...*):?} */
var _spvsx_cast_container = Module["_spvsx_cast_container"] = createExportWrapper("spvsx_cast_container");

/** @type {function(...*):?} */
var _spvsx_is_container_text = Module["_spvsx_is_container_text"] = createExportWrapper("spvsx_is_container_text");

/** @type {function(...*):?} */
var _spvsx_cast_container_text = Module["_spvsx_cast_container_text"] = createExportWrapper("spvsx_cast_container_text");

/** @type {function(...*):?} */
var _spvsx_is_table = Module["_spvsx_is_table"] = createExportWrapper("spvsx_is_table");

/** @type {function(...*):?} */
var _spvsx_cast_table = Module["_spvsx_cast_table"] = createExportWrapper("spvsx_cast_table");

/** @type {function(...*):?} */
var _spvsx_is_graph = Module["_spvsx_is_graph"] = createExportWrapper("spvsx_is_graph");

/** @type {function(...*):?} */
var _spvsx_cast_graph = Module["_spvsx_cast_graph"] = createExportWrapper("spvsx_cast_graph");

/** @type {function(...*):?} */
var _spvsx_is_model = Module["_spvsx_is_model"] = createExportWrapper("spvsx_is_model");

/** @type {function(...*):?} */
var _spvsx_cast_model = Module["_spvsx_cast_model"] = createExportWrapper("spvsx_cast_model");

/** @type {function(...*):?} */
var _spvsx_is_object = Module["_spvsx_is_object"] = createExportWrapper("spvsx_is_object");

/** @type {function(...*):?} */
var _spvsx_cast_object = Module["_spvsx_cast_object"] = createExportWrapper("spvsx_cast_object");

/** @type {function(...*):?} */
var _spvsx_is_image = Module["_spvsx_is_image"] = createExportWrapper("spvsx_is_image");

/** @type {function(...*):?} */
var _spvsx_cast_image = Module["_spvsx_cast_image"] = createExportWrapper("spvsx_cast_image");

/** @type {function(...*):?} */
var _spvsx_is_tree = Module["_spvsx_is_tree"] = createExportWrapper("spvsx_is_tree");

/** @type {function(...*):?} */
var _spvsx_cast_tree = Module["_spvsx_cast_tree"] = createExportWrapper("spvsx_cast_tree");

/** @type {function(...*):?} */
var _spvsx_is_heading = Module["_spvsx_is_heading"] = createExportWrapper("spvsx_is_heading");

/** @type {function(...*):?} */
var _spvsx_cast_heading = Module["_spvsx_cast_heading"] = createExportWrapper("spvsx_cast_heading");

/** @type {function(...*):?} */
var _spvbin_parse_be16 = Module["_spvbin_parse_be16"] = createExportWrapper("spvbin_parse_be16");

/** @type {function(...*):?} */
var _spvbin_parse_be64 = Module["_spvbin_parse_be64"] = createExportWrapper("spvbin_parse_be64");

/** @type {function(...*):?} */
var _spvbin_print_presence = Module["_spvbin_print_presence"] = createExportWrapper("spvbin_print_presence");

/** @type {function(...*):?} */
var _spvxml_attr_error = Module["_spvxml_attr_error"] = createExportWrapper("spvxml_attr_error");

/** @type {function(...*):?} */
var _spvxml_attr_parse_ref = Module["_spvxml_attr_parse_ref"] = createExportWrapper("spvxml_attr_parse_ref");

/** @type {function(...*):?} */
var _spvsx_border_style_type_to_string = Module["_spvsx_border_style_type_to_string"] = createExportWrapper("spvsx_border_style_type_to_string");

/** @type {function(...*):?} */
var _spvsx_chart_size_to_string = Module["_spvsx_chart_size_to_string"] = createExportWrapper("spvsx_chart_size_to_string");

/** @type {function(...*):?} */
var _spvsx_font_style_to_string = Module["_spvsx_font_style_to_string"] = createExportWrapper("spvsx_font_style_to_string");

/** @type {function(...*):?} */
var _spvsx_font_weight_to_string = Module["_spvsx_font_weight_to_string"] = createExportWrapper("spvsx_font_weight_to_string");

/** @type {function(...*):?} */
var _spvsx_label_location_vertical_to_string = Module["_spvsx_label_location_vertical_to_string"] = createExportWrapper("spvsx_label_location_vertical_to_string");

/** @type {function(...*):?} */
var _spvsx_marker_position_to_string = Module["_spvsx_marker_position_to_string"] = createExportWrapper("spvsx_marker_position_to_string");

/** @type {function(...*):?} */
var _spvsx_number_format_to_string = Module["_spvsx_number_format_to_string"] = createExportWrapper("spvsx_number_format_to_string");

/** @type {function(...*):?} */
var _spvsx_row_dimension_labels_to_string = Module["_spvsx_row_dimension_labels_to_string"] = createExportWrapper("spvsx_row_dimension_labels_to_string");

/** @type {function(...*):?} */
var _spvsx_table_type_to_string = Module["_spvsx_table_type_to_string"] = createExportWrapper("spvsx_table_type_to_string");

/** @type {function(...*):?} */
var _spvsx_text_align_to_string = Module["_spvsx_text_align_to_string"] = createExportWrapper("spvsx_text_align_to_string");

/** @type {function(...*):?} */
var _spvsx_text_alignment_to_string = Module["_spvsx_text_alignment_to_string"] = createExportWrapper("spvsx_text_alignment_to_string");

/** @type {function(...*):?} */
var _spvsx_text_type_to_string = Module["_spvsx_text_type_to_string"] = createExportWrapper("spvsx_text_type_to_string");

/** @type {function(...*):?} */
var _spvsx_type_to_string = Module["_spvsx_type_to_string"] = createExportWrapper("spvsx_type_to_string");

/** @type {function(...*):?} */
var _spvsx_visibility_to_string = Module["_spvsx_visibility_to_string"] = createExportWrapper("spvsx_visibility_to_string");

/** @type {function(...*):?} */
var _spvsx_parse_vi_zml = Module["_spvsx_parse_vi_zml"] = createExportWrapper("spvsx_parse_vi_zml");

/** @type {function(...*):?} */
var _spvsx_free_vi_zml = Module["_spvsx_free_vi_zml"] = createExportWrapper("spvsx_free_vi_zml");

/** @type {function(...*):?} */
var _spvsx_is_vi_zml = Module["_spvsx_is_vi_zml"] = createExportWrapper("spvsx_is_vi_zml");

/** @type {function(...*):?} */
var _spvsx_cast_vi_zml = Module["_spvsx_cast_vi_zml"] = createExportWrapper("spvsx_cast_vi_zml");

/** @type {function(...*):?} */
var _spvsx_parse_border_properties = Module["_spvsx_parse_border_properties"] = createExportWrapper("spvsx_parse_border_properties");

/** @type {function(...*):?} */
var _spvsx_parse_border_style = Module["_spvsx_parse_border_style"] = createExportWrapper("spvsx_parse_border_style");

/** @type {function(...*):?} */
var _spvsx_free_border_properties = Module["_spvsx_free_border_properties"] = createExportWrapper("spvsx_free_border_properties");

/** @type {function(...*):?} */
var _spvsx_free_border_style = Module["_spvsx_free_border_style"] = createExportWrapper("spvsx_free_border_style");

/** @type {function(...*):?} */
var _spvsx_is_border_properties = Module["_spvsx_is_border_properties"] = createExportWrapper("spvsx_is_border_properties");

/** @type {function(...*):?} */
var _spvsx_cast_border_properties = Module["_spvsx_cast_border_properties"] = createExportWrapper("spvsx_cast_border_properties");

/** @type {function(...*):?} */
var _spvsx_is_border_style = Module["_spvsx_is_border_style"] = createExportWrapper("spvsx_is_border_style");

/** @type {function(...*):?} */
var _spvsx_cast_border_style = Module["_spvsx_cast_border_style"] = createExportWrapper("spvsx_cast_border_style");

/** @type {function(...*):?} */
var _spvsx_parse_cell_format_properties = Module["_spvsx_parse_cell_format_properties"] = createExportWrapper("spvsx_parse_cell_format_properties");

/** @type {function(...*):?} */
var _spvsx_free_cell_format_properties = Module["_spvsx_free_cell_format_properties"] = createExportWrapper("spvsx_free_cell_format_properties");

/** @type {function(...*):?} */
var _spvsx_parse_cell_style = Module["_spvsx_parse_cell_style"] = createExportWrapper("spvsx_parse_cell_style");

/** @type {function(...*):?} */
var _spvsx_free_cell_style = Module["_spvsx_free_cell_style"] = createExportWrapper("spvsx_free_cell_style");

/** @type {function(...*):?} */
var _spvsx_is_cell_format_properties = Module["_spvsx_is_cell_format_properties"] = createExportWrapper("spvsx_is_cell_format_properties");

/** @type {function(...*):?} */
var _spvsx_cast_cell_format_properties = Module["_spvsx_cast_cell_format_properties"] = createExportWrapper("spvsx_cast_cell_format_properties");

/** @type {function(...*):?} */
var _spvsx_parse_style = Module["_spvsx_parse_style"] = createExportWrapper("spvsx_parse_style");

/** @type {function(...*):?} */
var _spvsx_free_style = Module["_spvsx_free_style"] = createExportWrapper("spvsx_free_style");

/** @type {function(...*):?} */
var _spvsx_is_cell_style = Module["_spvsx_is_cell_style"] = createExportWrapper("spvsx_is_cell_style");

/** @type {function(...*):?} */
var _spvsx_cast_cell_style = Module["_spvsx_cast_cell_style"] = createExportWrapper("spvsx_cast_cell_style");

/** @type {function(...*):?} */
var _spvsx_parse_container = Module["_spvsx_parse_container"] = createExportWrapper("spvsx_parse_container");

/** @type {function(...*):?} */
var _spvsx_free_container = Module["_spvsx_free_container"] = createExportWrapper("spvsx_free_container");

/** @type {function(...*):?} */
var _spvsx_parse_label = Module["_spvsx_parse_label"] = createExportWrapper("spvsx_parse_label");

/** @type {function(...*):?} */
var _spvsx_parse_table = Module["_spvsx_parse_table"] = createExportWrapper("spvsx_parse_table");

/** @type {function(...*):?} */
var _spvsx_parse_container_text = Module["_spvsx_parse_container_text"] = createExportWrapper("spvsx_parse_container_text");

/** @type {function(...*):?} */
var _spvsx_parse_graph = Module["_spvsx_parse_graph"] = createExportWrapper("spvsx_parse_graph");

/** @type {function(...*):?} */
var _spvsx_parse_model = Module["_spvsx_parse_model"] = createExportWrapper("spvsx_parse_model");

/** @type {function(...*):?} */
var _spvsx_parse_object = Module["_spvsx_parse_object"] = createExportWrapper("spvsx_parse_object");

/** @type {function(...*):?} */
var _spvsx_parse_image = Module["_spvsx_parse_image"] = createExportWrapper("spvsx_parse_image");

/** @type {function(...*):?} */
var _spvsx_parse_tree = Module["_spvsx_parse_tree"] = createExportWrapper("spvsx_parse_tree");

/** @type {function(...*):?} */
var _spvsx_free_label = Module["_spvsx_free_label"] = createExportWrapper("spvsx_free_label");

/** @type {function(...*):?} */
var _spvsx_free_container_text = Module["_spvsx_free_container_text"] = createExportWrapper("spvsx_free_container_text");

/** @type {function(...*):?} */
var _spvsx_parse_html = Module["_spvsx_parse_html"] = createExportWrapper("spvsx_parse_html");

/** @type {function(...*):?} */
var _spvsx_free_html = Module["_spvsx_free_html"] = createExportWrapper("spvsx_free_html");

/** @type {function(...*):?} */
var _spvsx_parse_csv_path = Module["_spvsx_parse_csv_path"] = createExportWrapper("spvsx_parse_csv_path");

/** @type {function(...*):?} */
var _spvsx_free_csv_path = Module["_spvsx_free_csv_path"] = createExportWrapper("spvsx_free_csv_path");

/** @type {function(...*):?} */
var _spvsx_is_csv_path = Module["_spvsx_is_csv_path"] = createExportWrapper("spvsx_is_csv_path");

/** @type {function(...*):?} */
var _spvsx_cast_csv_path = Module["_spvsx_cast_csv_path"] = createExportWrapper("spvsx_cast_csv_path");

/** @type {function(...*):?} */
var _spvsx_parse_data_path = Module["_spvsx_parse_data_path"] = createExportWrapper("spvsx_parse_data_path");

/** @type {function(...*):?} */
var _spvsx_free_data_path = Module["_spvsx_free_data_path"] = createExportWrapper("spvsx_free_data_path");

/** @type {function(...*):?} */
var _spvsx_is_data_path = Module["_spvsx_is_data_path"] = createExportWrapper("spvsx_is_data_path");

/** @type {function(...*):?} */
var _spvsx_cast_data_path = Module["_spvsx_cast_data_path"] = createExportWrapper("spvsx_cast_data_path");

/** @type {function(...*):?} */
var _spvsx_parse_footnote_properties = Module["_spvsx_parse_footnote_properties"] = createExportWrapper("spvsx_parse_footnote_properties");

/** @type {function(...*):?} */
var _spvsx_free_footnote_properties = Module["_spvsx_free_footnote_properties"] = createExportWrapper("spvsx_free_footnote_properties");

/** @type {function(...*):?} */
var _spvsx_is_footnote_properties = Module["_spvsx_is_footnote_properties"] = createExportWrapper("spvsx_is_footnote_properties");

/** @type {function(...*):?} */
var _spvsx_cast_footnote_properties = Module["_spvsx_cast_footnote_properties"] = createExportWrapper("spvsx_cast_footnote_properties");

/** @type {function(...*):?} */
var _spvsx_parse_general_properties = Module["_spvsx_parse_general_properties"] = createExportWrapper("spvsx_parse_general_properties");

/** @type {function(...*):?} */
var _spvsx_free_general_properties = Module["_spvsx_free_general_properties"] = createExportWrapper("spvsx_free_general_properties");

/** @type {function(...*):?} */
var _spvsx_is_general_properties = Module["_spvsx_is_general_properties"] = createExportWrapper("spvsx_is_general_properties");

/** @type {function(...*):?} */
var _spvsx_cast_general_properties = Module["_spvsx_cast_general_properties"] = createExportWrapper("spvsx_cast_general_properties");

/** @type {function(...*):?} */
var _spvsx_free_graph = Module["_spvsx_free_graph"] = createExportWrapper("spvsx_free_graph");

/** @type {function(...*):?} */
var _spvsx_parse_path = Module["_spvsx_parse_path"] = createExportWrapper("spvsx_parse_path");

/** @type {function(...*):?} */
var _spvsx_free_path = Module["_spvsx_free_path"] = createExportWrapper("spvsx_free_path");

/** @type {function(...*):?} */
var _spvsx_parse_heading = Module["_spvsx_parse_heading"] = createExportWrapper("spvsx_parse_heading");

/** @type {function(...*):?} */
var _spvsx_free_heading = Module["_spvsx_free_heading"] = createExportWrapper("spvsx_free_heading");

/** @type {function(...*):?} */
var _spvsx_is_html = Module["_spvsx_is_html"] = createExportWrapper("spvsx_is_html");

/** @type {function(...*):?} */
var _spvsx_cast_html = Module["_spvsx_cast_html"] = createExportWrapper("spvsx_cast_html");

/** @type {function(...*):?} */
var _spvsx_free_image = Module["_spvsx_free_image"] = createExportWrapper("spvsx_free_image");

/** @type {function(...*):?} */
var _spvsx_is_label = Module["_spvsx_is_label"] = createExportWrapper("spvsx_is_label");

/** @type {function(...*):?} */
var _spvsx_cast_label = Module["_spvsx_cast_label"] = createExportWrapper("spvsx_cast_label");

/** @type {function(...*):?} */
var _spvsx_free_model = Module["_spvsx_free_model"] = createExportWrapper("spvsx_free_model");

/** @type {function(...*):?} */
var _spvsx_parse_pmml_container_path = Module["_spvsx_parse_pmml_container_path"] = createExportWrapper("spvsx_parse_pmml_container_path");

/** @type {function(...*):?} */
var _spvsx_parse_stats_container_path = Module["_spvsx_parse_stats_container_path"] = createExportWrapper("spvsx_parse_stats_container_path");

/** @type {function(...*):?} */
var _spvsx_free_pmml_container_path = Module["_spvsx_free_pmml_container_path"] = createExportWrapper("spvsx_free_pmml_container_path");

/** @type {function(...*):?} */
var _spvsx_free_stats_container_path = Module["_spvsx_free_stats_container_path"] = createExportWrapper("spvsx_free_stats_container_path");

/** @type {function(...*):?} */
var _spvsx_free_object = Module["_spvsx_free_object"] = createExportWrapper("spvsx_free_object");

/** @type {function(...*):?} */
var _spvsx_parse_page_footer = Module["_spvsx_parse_page_footer"] = createExportWrapper("spvsx_parse_page_footer");

/** @type {function(...*):?} */
var _spvsx_free_page_footer = Module["_spvsx_free_page_footer"] = createExportWrapper("spvsx_free_page_footer");

/** @type {function(...*):?} */
var _spvsx_parse_page_paragraph = Module["_spvsx_parse_page_paragraph"] = createExportWrapper("spvsx_parse_page_paragraph");

/** @type {function(...*):?} */
var _spvsx_free_page_paragraph = Module["_spvsx_free_page_paragraph"] = createExportWrapper("spvsx_free_page_paragraph");

/** @type {function(...*):?} */
var _spvsx_is_page_footer = Module["_spvsx_is_page_footer"] = createExportWrapper("spvsx_is_page_footer");

/** @type {function(...*):?} */
var _spvsx_cast_page_footer = Module["_spvsx_cast_page_footer"] = createExportWrapper("spvsx_cast_page_footer");

/** @type {function(...*):?} */
var _spvsx_parse_page_header = Module["_spvsx_parse_page_header"] = createExportWrapper("spvsx_parse_page_header");

/** @type {function(...*):?} */
var _spvsx_free_page_header = Module["_spvsx_free_page_header"] = createExportWrapper("spvsx_free_page_header");

/** @type {function(...*):?} */
var _spvsx_is_page_header = Module["_spvsx_is_page_header"] = createExportWrapper("spvsx_is_page_header");

/** @type {function(...*):?} */
var _spvsx_cast_page_header = Module["_spvsx_cast_page_header"] = createExportWrapper("spvsx_cast_page_header");

/** @type {function(...*):?} */
var _spvsx_parse_page_paragraph_text = Module["_spvsx_parse_page_paragraph_text"] = createExportWrapper("spvsx_parse_page_paragraph_text");

/** @type {function(...*):?} */
var _spvsx_free_page_paragraph_text = Module["_spvsx_free_page_paragraph_text"] = createExportWrapper("spvsx_free_page_paragraph_text");

/** @type {function(...*):?} */
var _spvsx_is_page_paragraph = Module["_spvsx_is_page_paragraph"] = createExportWrapper("spvsx_is_page_paragraph");

/** @type {function(...*):?} */
var _spvsx_cast_page_paragraph = Module["_spvsx_cast_page_paragraph"] = createExportWrapper("spvsx_cast_page_paragraph");

/** @type {function(...*):?} */
var _spvsx_is_page_paragraph_text = Module["_spvsx_is_page_paragraph_text"] = createExportWrapper("spvsx_is_page_paragraph_text");

/** @type {function(...*):?} */
var _spvsx_cast_page_paragraph_text = Module["_spvsx_cast_page_paragraph_text"] = createExportWrapper("spvsx_cast_page_paragraph_text");

/** @type {function(...*):?} */
var _spvsx_parse_page_setup = Module["_spvsx_parse_page_setup"] = createExportWrapper("spvsx_parse_page_setup");

/** @type {function(...*):?} */
var _spvsx_free_page_setup = Module["_spvsx_free_page_setup"] = createExportWrapper("spvsx_free_page_setup");

/** @type {function(...*):?} */
var _spvsx_is_page_setup = Module["_spvsx_is_page_setup"] = createExportWrapper("spvsx_is_page_setup");

/** @type {function(...*):?} */
var _spvsx_cast_page_setup = Module["_spvsx_cast_page_setup"] = createExportWrapper("spvsx_cast_page_setup");

/** @type {function(...*):?} */
var _spvsx_is_path = Module["_spvsx_is_path"] = createExportWrapper("spvsx_is_path");

/** @type {function(...*):?} */
var _spvsx_cast_path = Module["_spvsx_cast_path"] = createExportWrapper("spvsx_cast_path");

/** @type {function(...*):?} */
var _spvsx_is_pmml_container_path = Module["_spvsx_is_pmml_container_path"] = createExportWrapper("spvsx_is_pmml_container_path");

/** @type {function(...*):?} */
var _spvsx_cast_pmml_container_path = Module["_spvsx_cast_pmml_container_path"] = createExportWrapper("spvsx_cast_pmml_container_path");

/** @type {function(...*):?} */
var _spvsx_parse_printing_properties = Module["_spvsx_parse_printing_properties"] = createExportWrapper("spvsx_parse_printing_properties");

/** @type {function(...*):?} */
var _spvsx_free_printing_properties = Module["_spvsx_free_printing_properties"] = createExportWrapper("spvsx_free_printing_properties");

/** @type {function(...*):?} */
var _spvsx_is_printing_properties = Module["_spvsx_is_printing_properties"] = createExportWrapper("spvsx_is_printing_properties");

/** @type {function(...*):?} */
var _spvsx_cast_printing_properties = Module["_spvsx_cast_printing_properties"] = createExportWrapper("spvsx_cast_printing_properties");

/** @type {function(...*):?} */
var _spvsx_is_root_heading = Module["_spvsx_is_root_heading"] = createExportWrapper("spvsx_is_root_heading");

/** @type {function(...*):?} */
var _spvsx_cast_root_heading = Module["_spvsx_cast_root_heading"] = createExportWrapper("spvsx_cast_root_heading");

/** @type {function(...*):?} */
var _spvsx_is_stats_container_path = Module["_spvsx_is_stats_container_path"] = createExportWrapper("spvsx_is_stats_container_path");

/** @type {function(...*):?} */
var _spvsx_cast_stats_container_path = Module["_spvsx_cast_stats_container_path"] = createExportWrapper("spvsx_cast_stats_container_path");

/** @type {function(...*):?} */
var _spvsx_is_style = Module["_spvsx_is_style"] = createExportWrapper("spvsx_is_style");

/** @type {function(...*):?} */
var _spvsx_cast_style = Module["_spvsx_cast_style"] = createExportWrapper("spvsx_cast_style");

/** @type {function(...*):?} */
var _spvsx_free_table = Module["_spvsx_free_table"] = createExportWrapper("spvsx_free_table");

/** @type {function(...*):?} */
var _spvsx_parse_table_properties = Module["_spvsx_parse_table_properties"] = createExportWrapper("spvsx_parse_table_properties");

/** @type {function(...*):?} */
var _spvsx_parse_table_structure = Module["_spvsx_parse_table_structure"] = createExportWrapper("spvsx_parse_table_structure");

/** @type {function(...*):?} */
var _spvsx_free_table_properties = Module["_spvsx_free_table_properties"] = createExportWrapper("spvsx_free_table_properties");

/** @type {function(...*):?} */
var _spvsx_free_table_structure = Module["_spvsx_free_table_structure"] = createExportWrapper("spvsx_free_table_structure");

/** @type {function(...*):?} */
var _spvsx_is_table_properties = Module["_spvsx_is_table_properties"] = createExportWrapper("spvsx_is_table_properties");

/** @type {function(...*):?} */
var _spvsx_cast_table_properties = Module["_spvsx_cast_table_properties"] = createExportWrapper("spvsx_cast_table_properties");

/** @type {function(...*):?} */
var _spvsx_is_table_structure = Module["_spvsx_is_table_structure"] = createExportWrapper("spvsx_is_table_structure");

/** @type {function(...*):?} */
var _spvsx_cast_table_structure = Module["_spvsx_cast_table_structure"] = createExportWrapper("spvsx_cast_table_structure");

/** @type {function(...*):?} */
var _spvsx_free_tree = Module["_spvsx_free_tree"] = createExportWrapper("spvsx_free_tree");

/** @type {function(...*):?} */
var _UTF8ToHtml = Module["_UTF8ToHtml"] = createExportWrapper("UTF8ToHtml");

/** @type {function(...*):?} */
var _iconv_close = Module["_iconv_close"] = createExportWrapper("iconv_close");

/** @type {function(...*):?} */
var _xmlGenericErrorDefaultFunc = Module["_xmlGenericErrorDefaultFunc"] = createExportWrapper("xmlGenericErrorDefaultFunc");

/** @type {function(...*):?} */
var _vsnprintf = Module["_vsnprintf"] = createExportWrapper("vsnprintf");

/** @type {function(...*):?} */
var _xmlParserValidityWarning = Module["_xmlParserValidityWarning"] = createExportWrapper("xmlParserValidityWarning");

/** @type {function(...*):?} */
var _xmlParserValidityError = Module["_xmlParserValidityError"] = createExportWrapper("xmlParserValidityError");

/** @type {function(...*):?} */
var _xmlParserError = Module["_xmlParserError"] = createExportWrapper("xmlParserError");

/** @type {function(...*):?} */
var _xmlParserWarning = Module["_xmlParserWarning"] = createExportWrapper("xmlParserWarning");

/** @type {function(...*):?} */
var _fprintf = Module["_fprintf"] = createExportWrapper("fprintf");

/** @type {function(...*):?} */
var _xmlSAX2IgnorableWhitespace = Module["_xmlSAX2IgnorableWhitespace"] = createExportWrapper("xmlSAX2IgnorableWhitespace");

/** @type {function(...*):?} */
var _xmlNop = Module["_xmlNop"] = createExportWrapper("xmlNop");

/** @type {function(...*):?} */
var _xmlSAX2GetEntity = Module["_xmlSAX2GetEntity"] = createExportWrapper("xmlSAX2GetEntity");

/** @type {function(...*):?} */
var _xmlSAX2EntityDecl = Module["_xmlSAX2EntityDecl"] = createExportWrapper("xmlSAX2EntityDecl");

/** @type {function(...*):?} */
var _xmlSAX2EndElement = Module["_xmlSAX2EndElement"] = createExportWrapper("xmlSAX2EndElement");

/** @type {function(...*):?} */
var _xmlSAX2StartElement = Module["_xmlSAX2StartElement"] = createExportWrapper("xmlSAX2StartElement");

/** @type {function(...*):?} */
var ___xmlParserInputBufferCreateFilename = Module["___xmlParserInputBufferCreateFilename"] = createExportWrapper("__xmlParserInputBufferCreateFilename");

/** @type {function(...*):?} */
var _gzdirect = Module["_gzdirect"] = createExportWrapper("gzdirect");

/** @type {function(...*):?} */
var ___xmlOutputBufferCreateFilename = Module["___xmlOutputBufferCreateFilename"] = createExportWrapper("__xmlOutputBufferCreateFilename");

/** @type {function(...*):?} */
var _dup = Module["_dup"] = createExportWrapper("dup");

/** @type {function(...*):?} */
var _gzdopen = Module["_gzdopen"] = createExportWrapper("gzdopen");

/** @type {function(...*):?} */
var _gzwrite = Module["_gzwrite"] = createExportWrapper("gzwrite");

/** @type {function(...*):?} */
var _nan = Module["_nan"] = createExportWrapper("nan");

/** @type {function(...*):?} */
var ___fpclassify = Module["___fpclassify"] = createExportWrapper("__fpclassify");

/** @type {function(...*):?} */
var _xmlSAX2ExternalSubset = Module["_xmlSAX2ExternalSubset"] = createExportWrapper("xmlSAX2ExternalSubset");

/** @type {function(...*):?} */
var _xmlSAX2InternalSubset = Module["_xmlSAX2InternalSubset"] = createExportWrapper("xmlSAX2InternalSubset");

/** @type {function(...*):?} */
var _xmlSAX2GetParameterEntity = Module["_xmlSAX2GetParameterEntity"] = createExportWrapper("xmlSAX2GetParameterEntity");

/** @type {function(...*):?} */
var _xmlSAX2ResolveEntity = Module["_xmlSAX2ResolveEntity"] = createExportWrapper("xmlSAX2ResolveEntity");

/** @type {function(...*):?} */
var _xmlSAX2HasExternalSubset = Module["_xmlSAX2HasExternalSubset"] = createExportWrapper("xmlSAX2HasExternalSubset");

/** @type {function(...*):?} */
var _xmlSAX2HasInternalSubset = Module["_xmlSAX2HasInternalSubset"] = createExportWrapper("xmlSAX2HasInternalSubset");

/** @type {function(...*):?} */
var _xmlSAX2IsStandalone = Module["_xmlSAX2IsStandalone"] = createExportWrapper("xmlSAX2IsStandalone");

/** @type {function(...*):?} */
var _xmlSAX2ElementDecl = Module["_xmlSAX2ElementDecl"] = createExportWrapper("xmlSAX2ElementDecl");

/** @type {function(...*):?} */
var _xmlSAX2AttributeDecl = Module["_xmlSAX2AttributeDecl"] = createExportWrapper("xmlSAX2AttributeDecl");

/** @type {function(...*):?} */
var _xmlSAX2CDataBlock = Module["_xmlSAX2CDataBlock"] = createExportWrapper("xmlSAX2CDataBlock");

/** @type {function(...*):?} */
var _xmlSAX2Characters = Module["_xmlSAX2Characters"] = createExportWrapper("xmlSAX2Characters");

/** @type {function(...*):?} */
var _xmlSAX2Reference = Module["_xmlSAX2Reference"] = createExportWrapper("xmlSAX2Reference");

/** @type {function(...*):?} */
var _xmlSAX2EndDocument = Module["_xmlSAX2EndDocument"] = createExportWrapper("xmlSAX2EndDocument");

/** @type {function(...*):?} */
var _xmlSAX2StartDocument = Module["_xmlSAX2StartDocument"] = createExportWrapper("xmlSAX2StartDocument");

/** @type {function(...*):?} */
var _xmlSAX2SetDocumentLocator = Module["_xmlSAX2SetDocumentLocator"] = createExportWrapper("xmlSAX2SetDocumentLocator");

/** @type {function(...*):?} */
var _xmlSAX2UnparsedEntityDecl = Module["_xmlSAX2UnparsedEntityDecl"] = createExportWrapper("xmlSAX2UnparsedEntityDecl");

/** @type {function(...*):?} */
var _xmlSAX2NotationDecl = Module["_xmlSAX2NotationDecl"] = createExportWrapper("xmlSAX2NotationDecl");

/** @type {function(...*):?} */
var _xmlSAX2ProcessingInstruction = Module["_xmlSAX2ProcessingInstruction"] = createExportWrapper("xmlSAX2ProcessingInstruction");

/** @type {function(...*):?} */
var _xmlSAX2Comment = Module["_xmlSAX2Comment"] = createExportWrapper("xmlSAX2Comment");

/** @type {function(...*):?} */
var _xmlSAX2GetColumnNumber = Module["_xmlSAX2GetColumnNumber"] = createExportWrapper("xmlSAX2GetColumnNumber");

/** @type {function(...*):?} */
var _xmlSAX2GetLineNumber = Module["_xmlSAX2GetLineNumber"] = createExportWrapper("xmlSAX2GetLineNumber");

/** @type {function(...*):?} */
var _xmlSAX2GetSystemId = Module["_xmlSAX2GetSystemId"] = createExportWrapper("xmlSAX2GetSystemId");

/** @type {function(...*):?} */
var _xmlSAX2GetPublicId = Module["_xmlSAX2GetPublicId"] = createExportWrapper("xmlSAX2GetPublicId");

/** @type {function(...*):?} */
var _xmlSchemaFreeType = Module["_xmlSchemaFreeType"] = createExportWrapper("xmlSchemaFreeType");

/** @type {function(...*):?} */
var _rand_r = Module["_rand_r"] = createExportWrapper("rand_r");

/** @type {function(...*):?} */
var ___ctype_get_mb_cur_max = Module["___ctype_get_mb_cur_max"] = createExportWrapper("__ctype_get_mb_cur_max");

/** @type {function(...*):?} */
var _libiconv_open_into = Module["_libiconv_open_into"] = createExportWrapper("libiconv_open_into");

/** @type {function(...*):?} */
var _libiconvctl = Module["_libiconvctl"] = createExportWrapper("libiconvctl");

/** @type {function(...*):?} */
var _libiconvlist = Module["_libiconvlist"] = createExportWrapper("libiconvlist");

/** @type {function(...*):?} */
var _iconv_canonicalize = Module["_iconv_canonicalize"] = createExportWrapper("iconv_canonicalize");

/** @type {function(...*):?} */
var _adler32 = Module["_adler32"] = createExportWrapper("adler32");

/** @type {function(...*):?} */
var _adler32_combine = Module["_adler32_combine"] = createExportWrapper("adler32_combine");

/** @type {function(...*):?} */
var _adler32_combine64 = Module["_adler32_combine64"] = createExportWrapper("adler32_combine64");

/** @type {function(...*):?} */
var _get_crc_table = Module["_get_crc_table"] = createExportWrapper("get_crc_table");

/** @type {function(...*):?} */
var _crc32 = Module["_crc32"] = createExportWrapper("crc32");

/** @type {function(...*):?} */
var _crc32_combine = Module["_crc32_combine"] = createExportWrapper("crc32_combine");

/** @type {function(...*):?} */
var _crc32_combine64 = Module["_crc32_combine64"] = createExportWrapper("crc32_combine64");

/** @type {function(...*):?} */
var _deflateInit2_ = Module["_deflateInit2_"] = createExportWrapper("deflateInit2_");

/** @type {function(...*):?} */
var _zcalloc = Module["_zcalloc"] = createExportWrapper("zcalloc");

/** @type {function(...*):?} */
var _zcfree = Module["_zcfree"] = createExportWrapper("zcfree");

/** @type {function(...*):?} */
var _deflateResetKeep = Module["_deflateResetKeep"] = createExportWrapper("deflateResetKeep");

/** @type {function(...*):?} */
var _deflateReset = Module["_deflateReset"] = createExportWrapper("deflateReset");

/** @type {function(...*):?} */
var _deflateSetDictionary = Module["_deflateSetDictionary"] = createExportWrapper("deflateSetDictionary");

/** @type {function(...*):?} */
var __tr_init = Module["__tr_init"] = createExportWrapper("_tr_init");

/** @type {function(...*):?} */
var _deflateSetHeader = Module["_deflateSetHeader"] = createExportWrapper("deflateSetHeader");

/** @type {function(...*):?} */
var _deflatePending = Module["_deflatePending"] = createExportWrapper("deflatePending");

/** @type {function(...*):?} */
var _deflatePrime = Module["_deflatePrime"] = createExportWrapper("deflatePrime");

/** @type {function(...*):?} */
var __tr_flush_bits = Module["__tr_flush_bits"] = createExportWrapper("_tr_flush_bits");

/** @type {function(...*):?} */
var _deflateParams = Module["_deflateParams"] = createExportWrapper("deflateParams");

/** @type {function(...*):?} */
var __tr_flush_block = Module["__tr_flush_block"] = createExportWrapper("_tr_flush_block");

/** @type {function(...*):?} */
var __tr_align = Module["__tr_align"] = createExportWrapper("_tr_align");

/** @type {function(...*):?} */
var __tr_stored_block = Module["__tr_stored_block"] = createExportWrapper("_tr_stored_block");

/** @type {function(...*):?} */
var _deflateTune = Module["_deflateTune"] = createExportWrapper("deflateTune");

/** @type {function(...*):?} */
var _deflateBound = Module["_deflateBound"] = createExportWrapper("deflateBound");

/** @type {function(...*):?} */
var _deflateCopy = Module["_deflateCopy"] = createExportWrapper("deflateCopy");

/** @type {function(...*):?} */
var _gzclose_r = Module["_gzclose_r"] = createExportWrapper("gzclose_r");

/** @type {function(...*):?} */
var _gzclose_w = Module["_gzclose_w"] = createExportWrapper("gzclose_w");

/** @type {function(...*):?} */
var _gzopen64 = Module["_gzopen64"] = createExportWrapper("gzopen64");

/** @type {function(...*):?} */
var _gzbuffer = Module["_gzbuffer"] = createExportWrapper("gzbuffer");

/** @type {function(...*):?} */
var _gzrewind = Module["_gzrewind"] = createExportWrapper("gzrewind");

/** @type {function(...*):?} */
var _gzseek64 = Module["_gzseek64"] = createExportWrapper("gzseek64");

/** @type {function(...*):?} */
var _gz_error = Module["_gz_error"] = createExportWrapper("gz_error");

/** @type {function(...*):?} */
var _gzseek = Module["_gzseek"] = createExportWrapper("gzseek");

/** @type {function(...*):?} */
var _gztell64 = Module["_gztell64"] = createExportWrapper("gztell64");

/** @type {function(...*):?} */
var _gztell = Module["_gztell"] = createExportWrapper("gztell");

/** @type {function(...*):?} */
var _gzoffset64 = Module["_gzoffset64"] = createExportWrapper("gzoffset64");

/** @type {function(...*):?} */
var _gzoffset = Module["_gzoffset"] = createExportWrapper("gzoffset");

/** @type {function(...*):?} */
var _gzeof = Module["_gzeof"] = createExportWrapper("gzeof");

/** @type {function(...*):?} */
var _gzerror = Module["_gzerror"] = createExportWrapper("gzerror");

/** @type {function(...*):?} */
var _gzclearerr = Module["_gzclearerr"] = createExportWrapper("gzclearerr");

/** @type {function(...*):?} */
var _gzgetc = Module["_gzgetc"] = createExportWrapper("gzgetc");

/** @type {function(...*):?} */
var _gzgetc_ = Module["_gzgetc_"] = createExportWrapper("gzgetc_");

/** @type {function(...*):?} */
var _gzungetc = Module["_gzungetc"] = createExportWrapper("gzungetc");

/** @type {function(...*):?} */
var _gzgets = Module["_gzgets"] = createExportWrapper("gzgets");

/** @type {function(...*):?} */
var _inflateInit2_ = Module["_inflateInit2_"] = createExportWrapper("inflateInit2_");

/** @type {function(...*):?} */
var _inflateReset = Module["_inflateReset"] = createExportWrapper("inflateReset");

/** @type {function(...*):?} */
var _gzputc = Module["_gzputc"] = createExportWrapper("gzputc");

/** @type {function(...*):?} */
var _gzputs = Module["_gzputs"] = createExportWrapper("gzputs");

/** @type {function(...*):?} */
var _gzvprintf = Module["_gzvprintf"] = createExportWrapper("gzvprintf");

/** @type {function(...*):?} */
var _gzprintf = Module["_gzprintf"] = createExportWrapper("gzprintf");

/** @type {function(...*):?} */
var _gzflush = Module["_gzflush"] = createExportWrapper("gzflush");

/** @type {function(...*):?} */
var _gzsetparams = Module["_gzsetparams"] = createExportWrapper("gzsetparams");

/** @type {function(...*):?} */
var _inflate_fast = Module["_inflate_fast"] = createExportWrapper("inflate_fast");

/** @type {function(...*):?} */
var _inflateResetKeep = Module["_inflateResetKeep"] = createExportWrapper("inflateResetKeep");

/** @type {function(...*):?} */
var _inflateReset2 = Module["_inflateReset2"] = createExportWrapper("inflateReset2");

/** @type {function(...*):?} */
var _inflatePrime = Module["_inflatePrime"] = createExportWrapper("inflatePrime");

/** @type {function(...*):?} */
var _inflate_table = Module["_inflate_table"] = createExportWrapper("inflate_table");

/** @type {function(...*):?} */
var _inflateGetDictionary = Module["_inflateGetDictionary"] = createExportWrapper("inflateGetDictionary");

/** @type {function(...*):?} */
var _inflateSetDictionary = Module["_inflateSetDictionary"] = createExportWrapper("inflateSetDictionary");

/** @type {function(...*):?} */
var _inflateGetHeader = Module["_inflateGetHeader"] = createExportWrapper("inflateGetHeader");

/** @type {function(...*):?} */
var _inflateSync = Module["_inflateSync"] = createExportWrapper("inflateSync");

/** @type {function(...*):?} */
var _inflateSyncPoint = Module["_inflateSyncPoint"] = createExportWrapper("inflateSyncPoint");

/** @type {function(...*):?} */
var _inflateCopy = Module["_inflateCopy"] = createExportWrapper("inflateCopy");

/** @type {function(...*):?} */
var _inflateUndermine = Module["_inflateUndermine"] = createExportWrapper("inflateUndermine");

/** @type {function(...*):?} */
var _inflateMark = Module["_inflateMark"] = createExportWrapper("inflateMark");

/** @type {function(...*):?} */
var __tr_tally = Module["__tr_tally"] = createExportWrapper("_tr_tally");

/** @type {function(...*):?} */
var _zlibVersion = Module["_zlibVersion"] = createExportWrapper("zlibVersion");

/** @type {function(...*):?} */
var _zlibCompileFlags = Module["_zlibCompileFlags"] = createExportWrapper("zlibCompileFlags");

/** @type {function(...*):?} */
var _isdigit = Module["_isdigit"] = createExportWrapper("isdigit");

/** @type {function(...*):?} */
var ___isdigit_l = Module["___isdigit_l"] = createExportWrapper("__isdigit_l");

/** @type {function(...*):?} */
var _isdigit_l = Module["_isdigit_l"] = createExportWrapper("isdigit_l");

/** @type {function(...*):?} */
var ___iswcntrl_l = Module["___iswcntrl_l"] = createExportWrapper("__iswcntrl_l");

/** @type {function(...*):?} */
var _iswcntrl_l = Module["_iswcntrl_l"] = createExportWrapper("iswcntrl_l");

/** @type {function(...*):?} */
var _pthread_self = Module["_pthread_self"] = createExportWrapper("pthread_self");

/** @type {function(...*):?} */
var ___isxdigit_l = Module["___isxdigit_l"] = createExportWrapper("__isxdigit_l");

/** @type {function(...*):?} */
var _isxdigit_l = Module["_isxdigit_l"] = createExportWrapper("isxdigit_l");

/** @type {function(...*):?} */
var _islower = Module["_islower"] = createExportWrapper("islower");

/** @type {function(...*):?} */
var ___toupper_l = Module["___toupper_l"] = createExportWrapper("__toupper_l");

/** @type {function(...*):?} */
var _toupper_l = Module["_toupper_l"] = createExportWrapper("toupper_l");

/** @type {function(...*):?} */
var ___islower_l = Module["___islower_l"] = createExportWrapper("__islower_l");

/** @type {function(...*):?} */
var _islower_l = Module["_islower_l"] = createExportWrapper("islower_l");

/** @type {function(...*):?} */
var ___isupper_l = Module["___isupper_l"] = createExportWrapper("__isupper_l");

/** @type {function(...*):?} */
var _isupper_l = Module["_isupper_l"] = createExportWrapper("isupper_l");

/** @type {function(...*):?} */
var ___tolower_l = Module["___tolower_l"] = createExportWrapper("__tolower_l");

/** @type {function(...*):?} */
var _tolower_l = Module["_tolower_l"] = createExportWrapper("tolower_l");

/** @type {function(...*):?} */
var ___iscntrl_l = Module["___iscntrl_l"] = createExportWrapper("__iscntrl_l");

/** @type {function(...*):?} */
var _iscntrl_l = Module["_iscntrl_l"] = createExportWrapper("iscntrl_l");

/** @type {function(...*):?} */
var ___isspace_l = Module["___isspace_l"] = createExportWrapper("__isspace_l");

/** @type {function(...*):?} */
var _isspace_l = Module["_isspace_l"] = createExportWrapper("isspace_l");

/** @type {function(...*):?} */
var _getopt_long_only = Module["_getopt_long_only"] = createExportWrapper("getopt_long_only");

/** @type {function(...*):?} */
var ___getopt_msg = Module["___getopt_msg"] = createExportWrapper("__getopt_msg");

/** @type {function(...*):?} */
var _getopt = Module["_getopt"] = createExportWrapper("getopt");

/** @type {function(...*):?} */
var _getrlimit64 = Module["_getrlimit64"] = createExportWrapper("getrlimit64");

/** @type {function(...*):?} */
var ___emscripten_pthread_data_constructor = Module["___emscripten_pthread_data_constructor"] = createExportWrapper("__emscripten_pthread_data_constructor");

/** @type {function(...*):?} */
var ___lctrans_cur = Module["___lctrans_cur"] = createExportWrapper("__lctrans_cur");

/** @type {function(...*):?} */
var _flockfile = Module["_flockfile"] = createExportWrapper("flockfile");

/** @type {function(...*):?} */
var _funlockfile = Module["_funlockfile"] = createExportWrapper("funlockfile");

/** @type {function(...*):?} */
var ___posix_getopt = Module["___posix_getopt"] = createExportWrapper("__posix_getopt");

/** @type {function(...*):?} */
var _wctomb = Module["_wctomb"] = createExportWrapper("wctomb");

/** @type {function(...*):?} */
var ___loc_is_allocated = Module["___loc_is_allocated"] = createExportWrapper("__loc_is_allocated");

/** @type {function(...*):?} */
var ___newlocale = Module["___newlocale"] = createExportWrapper("__newlocale");

/** @type {function(...*):?} */
var ___get_locale = Module["___get_locale"] = createExportWrapper("__get_locale");

/** @type {function(...*):?} */
var ___pleval = Module["___pleval"] = createExportWrapper("__pleval");

/** @type {function(...*):?} */
var ___gettextdomain = Module["___gettextdomain"] = createExportWrapper("__gettextdomain");

/** @type {function(...*):?} */
var _dgettext = Module["_dgettext"] = createExportWrapper("dgettext");

/** @type {function(...*):?} */
var _dngettext = Module["_dngettext"] = createExportWrapper("dngettext");

/** @type {function(...*):?} */
var ___lock = Module["___lock"] = createExportWrapper("__lock");

/** @type {function(...*):?} */
var ___unlock = Module["___unlock"] = createExportWrapper("__unlock");

/** @type {function(...*):?} */
var _dcngettext = Module["_dcngettext"] = createExportWrapper("dcngettext");

/** @type {function(...*):?} */
var ___munmap = Module["___munmap"] = createExportWrapper("__munmap");

/** @type {function(...*):?} */
var ___mo_lookup = Module["___mo_lookup"] = createExportWrapper("__mo_lookup");

/** @type {function(...*):?} */
var _strtoul = Module["_strtoul"] = createExportWrapper("strtoul");

/** @type {function(...*):?} */
var _dcgettext = Module["_dcgettext"] = createExportWrapper("dcgettext");

/** @type {function(...*):?} */
var ___strchrnul = Module["___strchrnul"] = createExportWrapper("__strchrnul");

/** @type {function(...*):?} */
var ___lctrans_impl = Module["___lctrans_impl"] = createExportWrapper("__lctrans_impl");

/** @type {function(...*):?} */
var ___nl_langinfo_l = Module["___nl_langinfo_l"] = createExportWrapper("__nl_langinfo_l");

/** @type {function(...*):?} */
var ___nl_langinfo = Module["___nl_langinfo"] = createExportWrapper("__nl_langinfo");

/** @type {function(...*):?} */
var ___lctrans = Module["___lctrans"] = createExportWrapper("__lctrans");

/** @type {function(...*):?} */
var _nl_langinfo_l = Module["_nl_langinfo_l"] = createExportWrapper("nl_langinfo_l");

/** @type {function(...*):?} */
var ___uselocale = Module["___uselocale"] = createExportWrapper("__uselocale");

/** @type {function(...*):?} */
var _feclearexcept = Module["_feclearexcept"] = createExportWrapper("feclearexcept");

/** @type {function(...*):?} */
var _feraiseexcept = Module["_feraiseexcept"] = createExportWrapper("feraiseexcept");

/** @type {function(...*):?} */
var _fetestexcept = Module["_fetestexcept"] = createExportWrapper("fetestexcept");

/** @type {function(...*):?} */
var _fegetround = Module["_fegetround"] = createExportWrapper("fegetround");

/** @type {function(...*):?} */
var ___fesetround = Module["___fesetround"] = createExportWrapper("__fesetround");

/** @type {function(...*):?} */
var _fegetenv = Module["_fegetenv"] = createExportWrapper("fegetenv");

/** @type {function(...*):?} */
var _fesetenv = Module["_fesetenv"] = createExportWrapper("fesetenv");

/** @type {function(...*):?} */
var ___shlim = Module["___shlim"] = createExportWrapper("__shlim");

/** @type {function(...*):?} */
var ___shgetc = Module["___shgetc"] = createExportWrapper("__shgetc");

/** @type {function(...*):?} */
var ___procfdname = Module["___procfdname"] = createExportWrapper("__procfdname");

/** @type {function(...*):?} */
var ___intscan = Module["___intscan"] = createExportWrapper("__intscan");

/** @type {function(...*):?} */
var ___floatscan = Module["___floatscan"] = createExportWrapper("__floatscan");

/** @type {function(...*):?} */
var ___wasi_syscall_ret = Module["___wasi_syscall_ret"] = createExportWrapper("__wasi_syscall_ret");

/** @type {function(...*):?} */
var _lseek64 = Module["_lseek64"] = createExportWrapper("lseek64");

/** @type {function(...*):?} */
var ___aio_close = Module["___aio_close"] = createExportWrapper("__aio_close");

/** @type {function(...*):?} */
var _fabs = Module["_fabs"] = createExportWrapper("fabs");

/** @type {function(...*):?} */
var _fabsl = Module["_fabsl"] = createExportWrapper("fabsl");

/** @type {function(...*):?} */
var _scalbn = Module["_scalbn"] = createExportWrapper("scalbn");

/** @type {function(...*):?} */
var ___expo2 = Module["___expo2"] = createExportWrapper("__expo2");

/** @type {function(...*):?} */
var ___sin = Module["___sin"] = createExportWrapper("__sin");

/** @type {function(...*):?} */
var ___rem_pio2 = Module["___rem_pio2"] = createExportWrapper("__rem_pio2");

/** @type {function(...*):?} */
var ___cos = Module["___cos"] = createExportWrapper("__cos");

/** @type {function(...*):?} */
var ___tan = Module["___tan"] = createExportWrapper("__tan");

/** @type {function(...*):?} */
var _sqrt = Module["_sqrt"] = createExportWrapper("sqrt");

/** @type {function(...*):?} */
var ___rem_pio2_large = Module["___rem_pio2_large"] = createExportWrapper("__rem_pio2_large");

/** @type {function(...*):?} */
var _copysignl = Module["_copysignl"] = createExportWrapper("copysignl");

/** @type {function(...*):?} */
var _scalbnl = Module["_scalbnl"] = createExportWrapper("scalbnl");

/** @type {function(...*):?} */
var _vsscanf = Module["_vsscanf"] = createExportWrapper("vsscanf");

/** @type {function(...*):?} */
var ___isoc99_vsscanf = Module["___isoc99_vsscanf"] = createExportWrapper("__isoc99_vsscanf");

/** @type {function(...*):?} */
var ___stdio_close = Module["___stdio_close"] = createExportWrapper("__stdio_close");

/** @type {function(...*):?} */
var ___stdio_write = Module["___stdio_write"] = createExportWrapper("__stdio_write");

/** @type {function(...*):?} */
var ___stdio_seek = Module["___stdio_seek"] = createExportWrapper("__stdio_seek");

/** @type {function(...*):?} */
var ___unlist_locked_file = Module["___unlist_locked_file"] = createExportWrapper("__unlist_locked_file");

/** @type {function(...*):?} */
var _clearerr = Module["_clearerr"] = createExportWrapper("clearerr");

/** @type {function(...*):?} */
var ___ofl_lock = Module["___ofl_lock"] = createExportWrapper("__ofl_lock");

/** @type {function(...*):?} */
var ___ofl_unlock = Module["___ofl_unlock"] = createExportWrapper("__ofl_unlock");

/** @type {function(...*):?} */
var _fflush_unlocked = Module["_fflush_unlocked"] = createExportWrapper("fflush_unlocked");

/** @type {function(...*):?} */
var ___overflow = Module["___overflow"] = createExportWrapper("__overflow");

/** @type {function(...*):?} */
var _fputc_unlocked = Module["_fputc_unlocked"] = createExportWrapper("fputc_unlocked");

/** @type {function(...*):?} */
var __IO_putc_unlocked = Module["__IO_putc_unlocked"] = createExportWrapper("_IO_putc_unlocked");

/** @type {function(...*):?} */
var ___fmodeflags = Module["___fmodeflags"] = createExportWrapper("__fmodeflags");

/** @type {function(...*):?} */
var ___fdopen = Module["___fdopen"] = createExportWrapper("__fdopen");

/** @type {function(...*):?} */
var _fopen64 = Module["_fopen64"] = createExportWrapper("fopen64");

/** @type {function(...*):?} */
var ___fseeko_unlocked = Module["___fseeko_unlocked"] = createExportWrapper("__fseeko_unlocked");

/** @type {function(...*):?} */
var ___fseeko = Module["___fseeko"] = createExportWrapper("__fseeko");

/** @type {function(...*):?} */
var _fseeko64 = Module["_fseeko64"] = createExportWrapper("fseeko64");

/** @type {function(...*):?} */
var _ftrylockfile = Module["_ftrylockfile"] = createExportWrapper("ftrylockfile");

/** @type {function(...*):?} */
var ___toread = Module["___toread"] = createExportWrapper("__toread");

/** @type {function(...*):?} */
var _vsprintf = Module["_vsprintf"] = createExportWrapper("vsprintf");

/** @type {function(...*):?} */
var _vsiprintf = Module["_vsiprintf"] = createExportWrapper("vsiprintf");

/** @type {function(...*):?} */
var ___small_vsprintf = Module["___small_vsprintf"] = createExportWrapper("__small_vsprintf");

/** @type {function(...*):?} */
var ___vfprintf_internal = Module["___vfprintf_internal"] = createExportWrapper("__vfprintf_internal");

/** @type {function(...*):?} */
var _vfiprintf = Module["_vfiprintf"] = createExportWrapper("vfiprintf");

/** @type {function(...*):?} */
var ___small_vfprintf = Module["___small_vfprintf"] = createExportWrapper("__small_vfprintf");

/** @type {function(...*):?} */
var ___fwritex = Module["___fwritex"] = createExportWrapper("__fwritex");

/** @type {function(...*):?} */
var ___uflow = Module["___uflow"] = createExportWrapper("__uflow");

/** @type {function(...*):?} */
var _fgetc_unlocked = Module["_fgetc_unlocked"] = createExportWrapper("fgetc_unlocked");

/** @type {function(...*):?} */
var __IO_getc_unlocked = Module["__IO_getc_unlocked"] = createExportWrapper("_IO_getc_unlocked");

/** @type {function(...*):?} */
var __IO_putc = Module["__IO_putc"] = createExportWrapper("_IO_putc");

/** @type {function(...*):?} */
var _sprintf = Module["_sprintf"] = createExportWrapper("sprintf");

/** @type {function(...*):?} */
var _vsniprintf = Module["_vsniprintf"] = createExportWrapper("vsniprintf");

/** @type {function(...*):?} */
var ___small_vsnprintf = Module["___small_vsnprintf"] = createExportWrapper("__small_vsnprintf");

/** @type {function(...*):?} */
var ___string_read = Module["___string_read"] = createExportWrapper("__string_read");

/** @type {function(...*):?} */
var ___do_orphaned_stdio_locks = Module["___do_orphaned_stdio_locks"] = createExportWrapper("__do_orphaned_stdio_locks");

/** @type {function(...*):?} */
var _vfscanf = Module["_vfscanf"] = createExportWrapper("vfscanf");

/** @type {function(...*):?} */
var ___isoc99_sscanf = Module["___isoc99_sscanf"] = createExportWrapper("__isoc99_sscanf");

/** @type {function(...*):?} */
var __IO_feof_unlocked = Module["__IO_feof_unlocked"] = createExportWrapper("_IO_feof_unlocked");

/** @type {function(...*):?} */
var __IO_ferror_unlocked = Module["__IO_ferror_unlocked"] = createExportWrapper("_IO_ferror_unlocked");

/** @type {function(...*):?} */
var ___stdio_read = Module["___stdio_read"] = createExportWrapper("__stdio_read");

/** @type {function(...*):?} */
var ___extendsftf2 = Module["___extendsftf2"] = createExportWrapper("__extendsftf2");

/** @type {function(...*):?} */
var _fmodl = Module["_fmodl"] = createExportWrapper("fmodl");

/** @type {function(...*):?} */
var ___multi3 = Module["___multi3"] = createExportWrapper("__multi3");

/** @type {function(...*):?} */
var ___trunctfsf2 = Module["___trunctfsf2"] = createExportWrapper("__trunctfsf2");

/** @type {function(...*):?} */
var ___isoc99_vfscanf = Module["___isoc99_vfscanf"] = createExportWrapper("__isoc99_vfscanf");

/** @type {function(...*):?} */
var __IO_getc = Module["__IO_getc"] = createExportWrapper("_IO_getc");

/** @type {function(...*):?} */
var _fread_unlocked = Module["_fread_unlocked"] = createExportWrapper("fread_unlocked");

/** @type {function(...*):?} */
var ___ofl_add = Module["___ofl_add"] = createExportWrapper("__ofl_add");

/** @type {function(...*):?} */
var _fileno_unlocked = Module["_fileno_unlocked"] = createExportWrapper("fileno_unlocked");

/** @type {function(...*):?} */
var ___stdio_exit = Module["___stdio_exit"] = createExportWrapper("__stdio_exit");

/** @type {function(...*):?} */
var ___stdio_exit_needed = Module["___stdio_exit_needed"] = createExportWrapper("__stdio_exit_needed");

/** @type {function(...*):?} */
var ___toread_needs_stdio_exit = Module["___toread_needs_stdio_exit"] = createExportWrapper("__toread_needs_stdio_exit");

/** @type {function(...*):?} */
var ___wasi_fd_is_valid = Module["___wasi_fd_is_valid"] = createExportWrapper("__wasi_fd_is_valid");

/** @type {function(...*):?} */
var _fstat64 = Module["_fstat64"] = createExportWrapper("fstat64");

/** @type {function(...*):?} */
var _stat64 = Module["_stat64"] = createExportWrapper("stat64");

/** @type {function(...*):?} */
var _lstat64 = Module["_lstat64"] = createExportWrapper("lstat64");

/** @type {function(...*):?} */
var ___vm_wait = Module["___vm_wait"] = createExportWrapper("__vm_wait");

/** @type {function(...*):?} */
var _munmap = Module["_munmap"] = createExportWrapper("munmap");

/** @type {function(...*):?} */
var _strtoll = Module["_strtoll"] = createExportWrapper("strtoll");

/** @type {function(...*):?} */
var _strtoimax = Module["_strtoimax"] = createExportWrapper("strtoimax");

/** @type {function(...*):?} */
var _strtoumax = Module["_strtoumax"] = createExportWrapper("strtoumax");

/** @type {function(...*):?} */
var ___strtol_internal = Module["___strtol_internal"] = createExportWrapper("__strtol_internal");

/** @type {function(...*):?} */
var ___strtoul_internal = Module["___strtoul_internal"] = createExportWrapper("__strtoul_internal");

/** @type {function(...*):?} */
var ___strtoll_internal = Module["___strtoll_internal"] = createExportWrapper("__strtoll_internal");

/** @type {function(...*):?} */
var ___strtoull_internal = Module["___strtoull_internal"] = createExportWrapper("__strtoull_internal");

/** @type {function(...*):?} */
var ___strtoimax_internal = Module["___strtoimax_internal"] = createExportWrapper("__strtoimax_internal");

/** @type {function(...*):?} */
var ___strtoumax_internal = Module["___strtoumax_internal"] = createExportWrapper("__strtoumax_internal");

/** @type {function(...*):?} */
var _strtof = Module["_strtof"] = createExportWrapper("strtof");

/** @type {function(...*):?} */
var _strtold = Module["_strtold"] = createExportWrapper("strtold");

/** @type {function(...*):?} */
var _strtof_l = Module["_strtof_l"] = createExportWrapper("strtof_l");

/** @type {function(...*):?} */
var _strtold_l = Module["_strtold_l"] = createExportWrapper("strtold_l");

/** @type {function(...*):?} */
var _strchrnul = Module["_strchrnul"] = createExportWrapper("strchrnul");

/** @type {function(...*):?} */
var ___xpg_strerror_r = Module["___xpg_strerror_r"] = createExportWrapper("__xpg_strerror_r");

/** @type {function(...*):?} */
var ___stpncpy = Module["___stpncpy"] = createExportWrapper("__stpncpy");

/** @type {function(...*):?} */
var _stpncpy = Module["_stpncpy"] = createExportWrapper("stpncpy");

/** @type {function(...*):?} */
var _open64 = Module["_open64"] = createExportWrapper("open64");

/** @type {function(...*):?} */
var _execv = Module["_execv"] = createExportWrapper("execv");

/** @type {function(...*):?} */
var ___emscripten_environ_constructor = Module["___emscripten_environ_constructor"] = createExportWrapper("__emscripten_environ_constructor");

/** @type {function(...*):?} */
var ___putenv = Module["___putenv"] = createExportWrapper("__putenv");

/** @type {function(...*):?} */
var _putenv = Module["_putenv"] = createExportWrapper("putenv");

/** @type {function(...*):?} */
var __get_tzname = Module["__get_tzname"] = createExportWrapper("_get_tzname");

/** @type {function(...*):?} */
var __get_daylight = Module["__get_daylight"] = createExportWrapper("_get_daylight");

/** @type {function(...*):?} */
var __get_timezone = Module["__get_timezone"] = createExportWrapper("_get_timezone");

/** @type {function(...*):?} */
var ___ashlti3 = Module["___ashlti3"] = createExportWrapper("__ashlti3");

/** @type {function(...*):?} */
var ___lshrti3 = Module["___lshrti3"] = createExportWrapper("__lshrti3");

/** @type {function(...*):?} */
var ___fe_getround = Module["___fe_getround"] = createExportWrapper("__fe_getround");

/** @type {function(...*):?} */
var ___fe_raise_inexact = Module["___fe_raise_inexact"] = createExportWrapper("__fe_raise_inexact");

/** @type {function(...*):?} */
var _setThrew = Module["_setThrew"] = createExportWrapper("setThrew");

/** @type {function(...*):?} */
var stackSave = Module["stackSave"] = createExportWrapper("stackSave");

/** @type {function(...*):?} */
var stackRestore = Module["stackRestore"] = createExportWrapper("stackRestore");

/** @type {function(...*):?} */
var stackAlloc = Module["stackAlloc"] = createExportWrapper("stackAlloc");

/** @type {function(...*):?} */
var _emscripten_stack_init = Module["_emscripten_stack_init"] = createExportWrapper("emscripten_stack_init");

/** @type {function(...*):?} */
var _emscripten_stack_get_current = Module["_emscripten_stack_get_current"] = createExportWrapper("emscripten_stack_get_current");

/** @type {function(...*):?} */
var _emscripten_stack_get_free = Module["_emscripten_stack_get_free"] = createExportWrapper("emscripten_stack_get_free");

/** @type {function(...*):?} */
var _sbrk = Module["_sbrk"] = createExportWrapper("sbrk");

/** @type {function(...*):?} */
var _realloc_in_place = Module["_realloc_in_place"] = createExportWrapper("realloc_in_place");

/** @type {function(...*):?} */
var _memalign = Module["_memalign"] = createExportWrapper("memalign");

/** @type {function(...*):?} */
var _posix_memalign = Module["_posix_memalign"] = createExportWrapper("posix_memalign");

/** @type {function(...*):?} */
var _valloc = Module["_valloc"] = createExportWrapper("valloc");

/** @type {function(...*):?} */
var _pvalloc = Module["_pvalloc"] = createExportWrapper("pvalloc");

/** @type {function(...*):?} */
var _mallinfo = Module["_mallinfo"] = createExportWrapper("mallinfo");

/** @type {function(...*):?} */
var _mallopt = Module["_mallopt"] = createExportWrapper("mallopt");

/** @type {function(...*):?} */
var _malloc_trim = Module["_malloc_trim"] = createExportWrapper("malloc_trim");

/** @type {function(...*):?} */
var _malloc_usable_size = Module["_malloc_usable_size"] = createExportWrapper("malloc_usable_size");

/** @type {function(...*):?} */
var _malloc_footprint = Module["_malloc_footprint"] = createExportWrapper("malloc_footprint");

/** @type {function(...*):?} */
var _malloc_max_footprint = Module["_malloc_max_footprint"] = createExportWrapper("malloc_max_footprint");

/** @type {function(...*):?} */
var _malloc_footprint_limit = Module["_malloc_footprint_limit"] = createExportWrapper("malloc_footprint_limit");

/** @type {function(...*):?} */
var _malloc_set_footprint_limit = Module["_malloc_set_footprint_limit"] = createExportWrapper("malloc_set_footprint_limit");

/** @type {function(...*):?} */
var _independent_calloc = Module["_independent_calloc"] = createExportWrapper("independent_calloc");

/** @type {function(...*):?} */
var _independent_comalloc = Module["_independent_comalloc"] = createExportWrapper("independent_comalloc");

/** @type {function(...*):?} */
var _bulk_free = Module["_bulk_free"] = createExportWrapper("bulk_free");

/** @type {function(...*):?} */
var _emscripten_builtin_malloc = Module["_emscripten_builtin_malloc"] = createExportWrapper("emscripten_builtin_malloc");

/** @type {function(...*):?} */
var _emscripten_builtin_free = Module["_emscripten_builtin_free"] = createExportWrapper("emscripten_builtin_free");

/** @type {function(...*):?} */
var _emscripten_builtin_memalign = Module["_emscripten_builtin_memalign"] = createExportWrapper("emscripten_builtin_memalign");

/** @type {function(...*):?} */
var _brk = Module["_brk"] = createExportWrapper("brk");

/** @type {function(...*):?} */
var _emscripten_has_threading_support = Module["_emscripten_has_threading_support"] = createExportWrapper("emscripten_has_threading_support");

/** @type {function(...*):?} */
var _emscripten_num_logical_cores = Module["_emscripten_num_logical_cores"] = createExportWrapper("emscripten_num_logical_cores");

/** @type {function(...*):?} */
var _emscripten_force_num_logical_cores = Module["_emscripten_force_num_logical_cores"] = createExportWrapper("emscripten_force_num_logical_cores");

/** @type {function(...*):?} */
var _emscripten_atomic_exchange_u8 = Module["_emscripten_atomic_exchange_u8"] = createExportWrapper("emscripten_atomic_exchange_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_exchange_u16 = Module["_emscripten_atomic_exchange_u16"] = createExportWrapper("emscripten_atomic_exchange_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_exchange_u32 = Module["_emscripten_atomic_exchange_u32"] = createExportWrapper("emscripten_atomic_exchange_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_exchange_u64 = Module["_emscripten_atomic_exchange_u64"] = createExportWrapper("emscripten_atomic_exchange_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_cas_u8 = Module["_emscripten_atomic_cas_u8"] = createExportWrapper("emscripten_atomic_cas_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_cas_u16 = Module["_emscripten_atomic_cas_u16"] = createExportWrapper("emscripten_atomic_cas_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_cas_u32 = Module["_emscripten_atomic_cas_u32"] = createExportWrapper("emscripten_atomic_cas_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_cas_u64 = Module["_emscripten_atomic_cas_u64"] = createExportWrapper("emscripten_atomic_cas_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_load_u8 = Module["_emscripten_atomic_load_u8"] = createExportWrapper("emscripten_atomic_load_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_load_u16 = Module["_emscripten_atomic_load_u16"] = createExportWrapper("emscripten_atomic_load_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_load_u32 = Module["_emscripten_atomic_load_u32"] = createExportWrapper("emscripten_atomic_load_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_load_f32 = Module["_emscripten_atomic_load_f32"] = createExportWrapper("emscripten_atomic_load_f32");

/** @type {function(...*):?} */
var _emscripten_atomic_load_u64 = Module["_emscripten_atomic_load_u64"] = createExportWrapper("emscripten_atomic_load_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_load_f64 = Module["_emscripten_atomic_load_f64"] = createExportWrapper("emscripten_atomic_load_f64");

/** @type {function(...*):?} */
var _emscripten_atomic_store_u8 = Module["_emscripten_atomic_store_u8"] = createExportWrapper("emscripten_atomic_store_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_store_u16 = Module["_emscripten_atomic_store_u16"] = createExportWrapper("emscripten_atomic_store_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_store_u32 = Module["_emscripten_atomic_store_u32"] = createExportWrapper("emscripten_atomic_store_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_store_f32 = Module["_emscripten_atomic_store_f32"] = createExportWrapper("emscripten_atomic_store_f32");

/** @type {function(...*):?} */
var _emscripten_atomic_store_u64 = Module["_emscripten_atomic_store_u64"] = createExportWrapper("emscripten_atomic_store_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_store_f64 = Module["_emscripten_atomic_store_f64"] = createExportWrapper("emscripten_atomic_store_f64");

/** @type {function(...*):?} */
var _emscripten_atomic_fence = Module["_emscripten_atomic_fence"] = createExportWrapper("emscripten_atomic_fence");

/** @type {function(...*):?} */
var _emscripten_atomic_add_u8 = Module["_emscripten_atomic_add_u8"] = createExportWrapper("emscripten_atomic_add_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_add_u16 = Module["_emscripten_atomic_add_u16"] = createExportWrapper("emscripten_atomic_add_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_add_u32 = Module["_emscripten_atomic_add_u32"] = createExportWrapper("emscripten_atomic_add_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_add_u64 = Module["_emscripten_atomic_add_u64"] = createExportWrapper("emscripten_atomic_add_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_sub_u8 = Module["_emscripten_atomic_sub_u8"] = createExportWrapper("emscripten_atomic_sub_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_sub_u16 = Module["_emscripten_atomic_sub_u16"] = createExportWrapper("emscripten_atomic_sub_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_sub_u32 = Module["_emscripten_atomic_sub_u32"] = createExportWrapper("emscripten_atomic_sub_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_sub_u64 = Module["_emscripten_atomic_sub_u64"] = createExportWrapper("emscripten_atomic_sub_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_and_u8 = Module["_emscripten_atomic_and_u8"] = createExportWrapper("emscripten_atomic_and_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_and_u16 = Module["_emscripten_atomic_and_u16"] = createExportWrapper("emscripten_atomic_and_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_and_u32 = Module["_emscripten_atomic_and_u32"] = createExportWrapper("emscripten_atomic_and_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_and_u64 = Module["_emscripten_atomic_and_u64"] = createExportWrapper("emscripten_atomic_and_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_or_u8 = Module["_emscripten_atomic_or_u8"] = createExportWrapper("emscripten_atomic_or_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_or_u16 = Module["_emscripten_atomic_or_u16"] = createExportWrapper("emscripten_atomic_or_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_or_u32 = Module["_emscripten_atomic_or_u32"] = createExportWrapper("emscripten_atomic_or_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_or_u64 = Module["_emscripten_atomic_or_u64"] = createExportWrapper("emscripten_atomic_or_u64");

/** @type {function(...*):?} */
var _emscripten_atomic_xor_u8 = Module["_emscripten_atomic_xor_u8"] = createExportWrapper("emscripten_atomic_xor_u8");

/** @type {function(...*):?} */
var _emscripten_atomic_xor_u16 = Module["_emscripten_atomic_xor_u16"] = createExportWrapper("emscripten_atomic_xor_u16");

/** @type {function(...*):?} */
var _emscripten_atomic_xor_u32 = Module["_emscripten_atomic_xor_u32"] = createExportWrapper("emscripten_atomic_xor_u32");

/** @type {function(...*):?} */
var _emscripten_atomic_xor_u64 = Module["_emscripten_atomic_xor_u64"] = createExportWrapper("emscripten_atomic_xor_u64");

/** @type {function(...*):?} */
var __emscripten_atomic_fetch_and_add_u64 = Module["__emscripten_atomic_fetch_and_add_u64"] = createExportWrapper("_emscripten_atomic_fetch_and_add_u64");

/** @type {function(...*):?} */
var __emscripten_atomic_fetch_and_sub_u64 = Module["__emscripten_atomic_fetch_and_sub_u64"] = createExportWrapper("_emscripten_atomic_fetch_and_sub_u64");

/** @type {function(...*):?} */
var __emscripten_atomic_fetch_and_and_u64 = Module["__emscripten_atomic_fetch_and_and_u64"] = createExportWrapper("_emscripten_atomic_fetch_and_and_u64");

/** @type {function(...*):?} */
var __emscripten_atomic_fetch_and_or_u64 = Module["__emscripten_atomic_fetch_and_or_u64"] = createExportWrapper("_emscripten_atomic_fetch_and_or_u64");

/** @type {function(...*):?} */
var __emscripten_atomic_fetch_and_xor_u64 = Module["__emscripten_atomic_fetch_and_xor_u64"] = createExportWrapper("_emscripten_atomic_fetch_and_xor_u64");

/** @type {function(...*):?} */
var _emscripten_futex_wait = Module["_emscripten_futex_wait"] = createExportWrapper("emscripten_futex_wait");

/** @type {function(...*):?} */
var _emscripten_futex_wake = Module["_emscripten_futex_wake"] = createExportWrapper("emscripten_futex_wake");

/** @type {function(...*):?} */
var _emscripten_is_main_runtime_thread = Module["_emscripten_is_main_runtime_thread"] = createExportWrapper("emscripten_is_main_runtime_thread");

/** @type {function(...*):?} */
var _emscripten_main_thread_process_queued_calls = Module["_emscripten_main_thread_process_queued_calls"] = createExportWrapper("emscripten_main_thread_process_queued_calls");

/** @type {function(...*):?} */
var _emscripten_current_thread_process_queued_calls = Module["_emscripten_current_thread_process_queued_calls"] = createExportWrapper("emscripten_current_thread_process_queued_calls");

/** @type {function(...*):?} */
var _pthread_mutex_trylock = Module["_pthread_mutex_trylock"] = createExportWrapper("pthread_mutex_trylock");

/** @type {function(...*):?} */
var _pthread_mutex_timedlock = Module["_pthread_mutex_timedlock"] = createExportWrapper("pthread_mutex_timedlock");

/** @type {function(...*):?} */
var _pthread_mutex_consistent = Module["_pthread_mutex_consistent"] = createExportWrapper("pthread_mutex_consistent");

/** @type {function(...*):?} */
var _pthread_barrier_init = Module["_pthread_barrier_init"] = createExportWrapper("pthread_barrier_init");

/** @type {function(...*):?} */
var _pthread_barrier_destroy = Module["_pthread_barrier_destroy"] = createExportWrapper("pthread_barrier_destroy");

/** @type {function(...*):?} */
var _pthread_barrier_wait = Module["_pthread_barrier_wait"] = createExportWrapper("pthread_barrier_wait");

/** @type {function(...*):?} */
var _pthread_key_create = Module["_pthread_key_create"] = createExportWrapper("pthread_key_create");

/** @type {function(...*):?} */
var _pthread_key_delete = Module["_pthread_key_delete"] = createExportWrapper("pthread_key_delete");

/** @type {function(...*):?} */
var _pthread_getspecific = Module["_pthread_getspecific"] = createExportWrapper("pthread_getspecific");

/** @type {function(...*):?} */
var _pthread_setspecific = Module["_pthread_setspecific"] = createExportWrapper("pthread_setspecific");

/** @type {function(...*):?} */
var _pthread_cond_wait = Module["_pthread_cond_wait"] = createExportWrapper("pthread_cond_wait");

/** @type {function(...*):?} */
var _pthread_cond_signal = Module["_pthread_cond_signal"] = createExportWrapper("pthread_cond_signal");

/** @type {function(...*):?} */
var _pthread_cond_broadcast = Module["_pthread_cond_broadcast"] = createExportWrapper("pthread_cond_broadcast");

/** @type {function(...*):?} */
var _pthread_cond_init = Module["_pthread_cond_init"] = createExportWrapper("pthread_cond_init");

/** @type {function(...*):?} */
var _pthread_cond_destroy = Module["_pthread_cond_destroy"] = createExportWrapper("pthread_cond_destroy");

/** @type {function(...*):?} */
var _pthread_cond_timedwait = Module["_pthread_cond_timedwait"] = createExportWrapper("pthread_cond_timedwait");

/** @type {function(...*):?} */
var _pthread_atfork = Module["_pthread_atfork"] = createExportWrapper("pthread_atfork");

/** @type {function(...*):?} */
var _pthread_equal = Module["_pthread_equal"] = createExportWrapper("pthread_equal");

/** @type {function(...*):?} */
var ___towrite = Module["___towrite"] = createExportWrapper("__towrite");

/** @type {function(...*):?} */
var ___towrite_needs_stdio_exit = Module["___towrite_needs_stdio_exit"] = createExportWrapper("__towrite_needs_stdio_exit");

/** @type {function(...*):?} */
var _fwrite_unlocked = Module["_fwrite_unlocked"] = createExportWrapper("fwrite_unlocked");

/** @type {function(...*):?} */
var _fputs_unlocked = Module["_fputs_unlocked"] = createExportWrapper("fputs_unlocked");

/** @type {function(...*):?} */
var _printf = Module["_printf"] = createExportWrapper("printf");

/** @type {function(...*):?} */
var dynCall_jiji = Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");

/** @type {function(...*):?} */
var _orig$__unordtf2 = Module["_orig$__unordtf2"] = createExportWrapper("orig$__unordtf2");

/** @type {function(...*):?} */
var _orig$__addtf3 = Module["_orig$__addtf3"] = createExportWrapper("orig$__addtf3");

/** @type {function(...*):?} */
var _orig$__gttf2 = Module["_orig$__gttf2"] = createExportWrapper("orig$__gttf2");

/** @type {function(...*):?} */
var _orig$__netf2 = Module["_orig$__netf2"] = createExportWrapper("orig$__netf2");

/** @type {function(...*):?} */
var _orig$printf_frexpl = Module["_orig$printf_frexpl"] = createExportWrapper("orig$printf_frexpl");

/** @type {function(...*):?} */
var _orig$__fixtfsi = Module["_orig$__fixtfsi"] = createExportWrapper("orig$__fixtfsi");

/** @type {function(...*):?} */
var _orig$__subtf3 = Module["_orig$__subtf3"] = createExportWrapper("orig$__subtf3");

/** @type {function(...*):?} */
var _orig$__eqtf2 = Module["_orig$__eqtf2"] = createExportWrapper("orig$__eqtf2");

/** @type {function(...*):?} */
var _orig$__lttf2 = Module["_orig$__lttf2"] = createExportWrapper("orig$__lttf2");

/** @type {function(...*):?} */
var _orig$__multf3 = Module["_orig$__multf3"] = createExportWrapper("orig$__multf3");

/** @type {function(...*):?} */
var _orig$__getf2 = Module["_orig$__getf2"] = createExportWrapper("orig$__getf2");

/** @type {function(...*):?} */
var _orig$frexpl = Module["_orig$frexpl"] = createExportWrapper("orig$frexpl");

/** @type {function(...*):?} */
var _orig$__trunctfdf2 = Module["_orig$__trunctfdf2"] = createExportWrapper("orig$__trunctfdf2");

/** @type {function(...*):?} */
var _orig$count_leading_zeros_ll = Module["_orig$count_leading_zeros_ll"] = createExportWrapper("orig$count_leading_zeros_ll");

/** @type {function(...*):?} */
var _orig$count_one_bits_ll = Module["_orig$count_one_bits_ll"] = createExportWrapper("orig$count_one_bits_ll");

/** @type {function(...*):?} */
var _orig$ftello = Module["_orig$ftello"] = createExportWrapper("orig$ftello");

/** @type {function(...*):?} */
var _orig$fseeko = Module["_orig$fseeko"] = createExportWrapper("orig$fseeko");

/** @type {function(...*):?} */
var _orig$imaxtostr = Module["_orig$imaxtostr"] = createExportWrapper("orig$imaxtostr");

/** @type {function(...*):?} */
var _orig$gl_isfinitel = Module["_orig$gl_isfinitel"] = createExportWrapper("orig$gl_isfinitel");

/** @type {function(...*):?} */
var _orig$gl_isinfl = Module["_orig$gl_isinfl"] = createExportWrapper("orig$gl_isinfl");

/** @type {function(...*):?} */
var _orig$rpl_lseek = Module["_orig$rpl_lseek"] = createExportWrapper("orig$rpl_lseek");

/** @type {function(...*):?} */
var _orig$lseek = Module["_orig$lseek"] = createExportWrapper("orig$lseek");

/** @type {function(...*):?} */
var _orig$offtostr = Module["_orig$offtostr"] = createExportWrapper("orig$offtostr");

/** @type {function(...*):?} */
var _orig$ldexpl = Module["_orig$ldexpl"] = createExportWrapper("orig$ldexpl");

/** @type {function(...*):?} */
var _orig$gl_signbitl = Module["_orig$gl_signbitl"] = createExportWrapper("orig$gl_signbitl");

/** @type {function(...*):?} */
var _orig$umaxtostr = Module["_orig$umaxtostr"] = createExportWrapper("orig$umaxtostr");

/** @type {function(...*):?} */
var _orig$integer_put = Module["_orig$integer_put"] = createExportWrapper("orig$integer_put");

/** @type {function(...*):?} */
var _orig$ext_array_read = Module["_orig$ext_array_read"] = createExportWrapper("orig$ext_array_read");

/** @type {function(...*):?} */
var _orig$ext_array_write = Module["_orig$ext_array_write"] = createExportWrapper("orig$ext_array_write");

/** @type {function(...*):?} */
var _orig$integer_get = Module["_orig$integer_get"] = createExportWrapper("orig$integer_get");

/** @type {function(...*):?} */
var _orig$__divtf3 = Module["_orig$__divtf3"] = createExportWrapper("orig$__divtf3");

/** @type {function(...*):?} */
var _orig$__letf2 = Module["_orig$__letf2"] = createExportWrapper("orig$__letf2");

/** @type {function(...*):?} */
var _orig$integer_identify = Module["_orig$integer_identify"] = createExportWrapper("orig$integer_identify");

/** @type {function(...*):?} */
var _orig$__fpclassifyl = Module["_orig$__fpclassifyl"] = createExportWrapper("orig$__fpclassifyl");

/** @type {function(...*):?} */
var _orig$strtoull = Module["_orig$strtoull"] = createExportWrapper("orig$strtoull");

/** @type {function(...*):?} */
var _orig$line_reader_tell = Module["_orig$line_reader_tell"] = createExportWrapper("orig$line_reader_tell");

/** @type {function(...*):?} */
var _orig$spvbin_print_int64 = Module["_orig$spvbin_print_int64"] = createExportWrapper("orig$spvbin_print_int64");

/** @type {function(...*):?} */
var _orig$adler32_combine = Module["_orig$adler32_combine"] = createExportWrapper("orig$adler32_combine");

/** @type {function(...*):?} */
var _orig$adler32_combine64 = Module["_orig$adler32_combine64"] = createExportWrapper("orig$adler32_combine64");

/** @type {function(...*):?} */
var _orig$crc32_combine = Module["_orig$crc32_combine"] = createExportWrapper("orig$crc32_combine");

/** @type {function(...*):?} */
var _orig$crc32_combine64 = Module["_orig$crc32_combine64"] = createExportWrapper("orig$crc32_combine64");

/** @type {function(...*):?} */
var _orig$gzseek64 = Module["_orig$gzseek64"] = createExportWrapper("orig$gzseek64");

/** @type {function(...*):?} */
var _orig$gzseek = Module["_orig$gzseek"] = createExportWrapper("orig$gzseek");

/** @type {function(...*):?} */
var _orig$gztell64 = Module["_orig$gztell64"] = createExportWrapper("orig$gztell64");

/** @type {function(...*):?} */
var _orig$gztell = Module["_orig$gztell"] = createExportWrapper("orig$gztell");

/** @type {function(...*):?} */
var _orig$gzoffset64 = Module["_orig$gzoffset64"] = createExportWrapper("orig$gzoffset64");

/** @type {function(...*):?} */
var _orig$gzoffset = Module["_orig$gzoffset"] = createExportWrapper("orig$gzoffset");

/** @type {function(...*):?} */
var _orig$__shlim = Module["_orig$__shlim"] = createExportWrapper("orig$__shlim");

/** @type {function(...*):?} */
var _orig$__intscan = Module["_orig$__intscan"] = createExportWrapper("orig$__intscan");

/** @type {function(...*):?} */
var _orig$lseek64 = Module["_orig$lseek64"] = createExportWrapper("orig$lseek64");

/** @type {function(...*):?} */
var _orig$fabsl = Module["_orig$fabsl"] = createExportWrapper("orig$fabsl");

/** @type {function(...*):?} */
var _orig$copysignl = Module["_orig$copysignl"] = createExportWrapper("orig$copysignl");

/** @type {function(...*):?} */
var _orig$scalbnl = Module["_orig$scalbnl"] = createExportWrapper("orig$scalbnl");

/** @type {function(...*):?} */
var _orig$__stdio_seek = Module["_orig$__stdio_seek"] = createExportWrapper("orig$__stdio_seek");

/** @type {function(...*):?} */
var _orig$__fseeko_unlocked = Module["_orig$__fseeko_unlocked"] = createExportWrapper("orig$__fseeko_unlocked");

/** @type {function(...*):?} */
var _orig$__fseeko = Module["_orig$__fseeko"] = createExportWrapper("orig$__fseeko");

/** @type {function(...*):?} */
var _orig$fseeko64 = Module["_orig$fseeko64"] = createExportWrapper("orig$fseeko64");

/** @type {function(...*):?} */
var _orig$fmodl = Module["_orig$fmodl"] = createExportWrapper("orig$fmodl");

/** @type {function(...*):?} */
var _orig$__multi3 = Module["_orig$__multi3"] = createExportWrapper("orig$__multi3");

/** @type {function(...*):?} */
var _orig$__trunctfsf2 = Module["_orig$__trunctfsf2"] = createExportWrapper("orig$__trunctfsf2");

/** @type {function(...*):?} */
var _orig$strtoll = Module["_orig$strtoll"] = createExportWrapper("orig$strtoll");

/** @type {function(...*):?} */
var _orig$strtoimax = Module["_orig$strtoimax"] = createExportWrapper("orig$strtoimax");

/** @type {function(...*):?} */
var _orig$strtoumax = Module["_orig$strtoumax"] = createExportWrapper("orig$strtoumax");

/** @type {function(...*):?} */
var _orig$__strtoll_internal = Module["_orig$__strtoll_internal"] = createExportWrapper("orig$__strtoll_internal");

/** @type {function(...*):?} */
var _orig$__strtoull_internal = Module["_orig$__strtoull_internal"] = createExportWrapper("orig$__strtoull_internal");

/** @type {function(...*):?} */
var _orig$__strtoimax_internal = Module["_orig$__strtoimax_internal"] = createExportWrapper("orig$__strtoimax_internal");

/** @type {function(...*):?} */
var _orig$__strtoumax_internal = Module["_orig$__strtoumax_internal"] = createExportWrapper("orig$__strtoumax_internal");

/** @type {function(...*):?} */
var _orig$__ashlti3 = Module["_orig$__ashlti3"] = createExportWrapper("orig$__ashlti3");

/** @type {function(...*):?} */
var _orig$__lshrti3 = Module["_orig$__lshrti3"] = createExportWrapper("orig$__lshrti3");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_exchange_u64 = Module["_orig$emscripten_atomic_exchange_u64"] = createExportWrapper("orig$emscripten_atomic_exchange_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_cas_u64 = Module["_orig$emscripten_atomic_cas_u64"] = createExportWrapper("orig$emscripten_atomic_cas_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_load_u64 = Module["_orig$emscripten_atomic_load_u64"] = createExportWrapper("orig$emscripten_atomic_load_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_store_u64 = Module["_orig$emscripten_atomic_store_u64"] = createExportWrapper("orig$emscripten_atomic_store_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_add_u64 = Module["_orig$emscripten_atomic_add_u64"] = createExportWrapper("orig$emscripten_atomic_add_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_sub_u64 = Module["_orig$emscripten_atomic_sub_u64"] = createExportWrapper("orig$emscripten_atomic_sub_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_and_u64 = Module["_orig$emscripten_atomic_and_u64"] = createExportWrapper("orig$emscripten_atomic_and_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_or_u64 = Module["_orig$emscripten_atomic_or_u64"] = createExportWrapper("orig$emscripten_atomic_or_u64");

/** @type {function(...*):?} */
var _orig$emscripten_atomic_xor_u64 = Module["_orig$emscripten_atomic_xor_u64"] = createExportWrapper("orig$emscripten_atomic_xor_u64");

/** @type {function(...*):?} */
var _orig$_emscripten_atomic_fetch_and_add_u64 = Module["_orig$_emscripten_atomic_fetch_and_add_u64"] = createExportWrapper("orig$_emscripten_atomic_fetch_and_add_u64");

/** @type {function(...*):?} */
var _orig$_emscripten_atomic_fetch_and_sub_u64 = Module["_orig$_emscripten_atomic_fetch_and_sub_u64"] = createExportWrapper("orig$_emscripten_atomic_fetch_and_sub_u64");

/** @type {function(...*):?} */
var _orig$_emscripten_atomic_fetch_and_and_u64 = Module["_orig$_emscripten_atomic_fetch_and_and_u64"] = createExportWrapper("orig$_emscripten_atomic_fetch_and_and_u64");

/** @type {function(...*):?} */
var _orig$_emscripten_atomic_fetch_and_or_u64 = Module["_orig$_emscripten_atomic_fetch_and_or_u64"] = createExportWrapper("orig$_emscripten_atomic_fetch_and_or_u64");

/** @type {function(...*):?} */
var _orig$_emscripten_atomic_fetch_and_xor_u64 = Module["_orig$_emscripten_atomic_fetch_and_xor_u64"] = createExportWrapper("orig$_emscripten_atomic_fetch_and_xor_u64");

/** @type {function(...*):?} */
var __growWasmMemory = Module["__growWasmMemory"] = createExportWrapper("__growWasmMemory");

/** @type {function(...*):?} */
var ___assign_got_enties = Module["___assign_got_enties"] = createExportWrapper("__assign_got_enties");


var NAMED_GLOBALS = {
  "optarg": 1580832,
  "stdout": 1712608,
  "announced_version": 519600,
  "stdin": 1711048,
  "is_basic_table": 269744,
  "unicase_empty_prefix_context": 5508,
  "unicase_empty_suffix_context": 5516,
  "uninorm_nfd": 280948,
  "_UC_CATEGORY_NONE": 280936,
  "UC_PROPERTY_SOFT_DOTTED": 280944,
  "unilbrkprop": 152760,
  "unilbrk_table": 187904,
  "gl_uninorm_decomp_index_table": 214392,
  "gl_uninorm_decomp_chars_table": 188816,
  "uninorm_nfkd": 280964,
  "uniwbrk_prop_index": 235840,
  "uniwbrk_table": 235936,
  "stdlib_allocator": 280980,
  "gl_linkedhash_list_implementation": 281136,
  "gl_linked_list_implementation": 281016,
  "error_print_progname": 281568,
  "stderr": 1710320,
  "error_message_count": 281584,
  "error_one_per_line": 281572,
  "exit_failure": 280996,
  "program_name": 290908,
  "version_etc_copyright": 280352,
  "gsl_check_range": 301744,
  "_gsl_sf_bessel_amp_phase_bm1_cs": 407144,
  "_gsl_sf_bessel_amp_phase_bth1_cs": 407376,
  "gsl_rng_mt19937": 416072,
  "gsl_rng_default_seed": 416144,
  "measure": 376336,
  "role": 376384,
  "align": 376288,
  "F_8_0": 351700,
  "F_8_2": 351712,
  "F_4_3": 351724,
  "F_5_1": 351736,
  "sys_file_reader_class": 391336,
  "por_file_reader_class": 391536,
  "pcp_file_reader_class": 391496,
  "version": 519585,
  "host_system": 519616,
  "bare_version": 519579,
  "sys_codepage_number_to_name": 377936,
  "sys_codepage_name_to_number": 380528,
  "xmlFree": 672692,
  "__THREW__": 1714192,
  "__threwValue": 1714196,
  "empty_string": 480028,
  "operations": 495104,
  "agr_func_tab": 507936,
  "ag_func": 508640,
  "N_AG_FUNCS": 488644,
  "cell_spec": 508912,
  "min_buffers": 562680,
  "max_buffers": 562684,
  "show_table": 509632,
  "lack_of_warranty": 520032,
  "copyleft": 521200,
  "opterr": 1580820,
  "build_system": 519648,
  "locale_dir": 519680,
  "map": 558252,
  "examples_dir": 519712,
  "authors": 557984,
  "legal": 519744,
  "llx_malloc_mgr": 558144,
  "ptile_alg_desc": 562656,
  "table_item_class": 592228,
  "text_item_class": 592292,
  "message_item_class": 591320,
  "txt_driver_factory": 590696,
  "list_driver_factory": 590708,
  "chart_item_class": 590876,
  "histogram_chart_class": 602164,
  "scatterplot_chart_class": 602172,
  "barchart_class": 602148,
  "piechart_class": 602160,
  "csv_driver_factory": 590884,
  "html_driver_factory": 590936,
  "odt_driver_factory": 591344,
  "spv_driver_factory": 592200,
  "group_open_item_class": 590920,
  "group_close_item_class": 590928,
  "page_setup_item_class": 591372,
  "spvdx_affix_class": 592380,
  "spvdx_alternating_class": 592424,
  "spvdx_axis_class": 592440,
  "spvdx_style_class": 595792,
  "spvdx_categorical_domain_class": 592456,
  "spvdx_category_order_class": 592472,
  "spvdx_container_class": 592488,
  "spvdx_container_extension_class": 592536,
  "spvdx_coordinates_class": 592552,
  "spvdx_cross_class": 592568,
  "spvdx_date_time_format_class": 592928,
  "spvdx_derived_variable_class": 593168,
  "spvdx_source_variable_class": 595424,
  "spvdx_description_class": 593208,
  "spvdx_description_group_class": 593256,
  "spvdx_faceting_class": 593472,
  "spvdx_elapsed_time_format_class": 593424,
  "spvdx_facet_layout_class": 593440,
  "spvdx_facet_level_class": 593456,
  "spvdx_footnote_mapping_class": 593536,
  "spvdx_footnotes_class": 593552,
  "spvdx_format_class": 594036,
  "spvdx_format_mapping_class": 594184,
  "spvdx_formatting_class": 594232,
  "spvdx_graph_class": 594248,
  "spvdx_gridline_class": 594264,
  "spvdx_intersect_class": 594280,
  "spvdx_intersect_where_class": 594296,
  "spvdx_interval_class": 594312,
  "spvdx_label_class": 594328,
  "spvdx_label_frame_class": 594424,
  "spvdx_labeling_class": 594440,
  "spvdx_layer_class": 594536,
  "spvdx_layer_controller_class": 594552,
  "spvdx_location_class": 594660,
  "spvdx_major_ticks_class": 594884,
  "spvdx_nest_class": 594900,
  "spvdx_number_format_class": 595036,
  "spvdx_paragraph_class": 595080,
  "spvdx_relabel_class": 595096,
  "spvdx_set_cell_properties_class": 595144,
  "spvdx_set_format_class": 595160,
  "spvdx_set_frame_style_class": 595176,
  "spvdx_set_meta_data_class": 595248,
  "spvdx_set_style_class": 595264,
  "spvdx_simple_sort_class": 595304,
  "spvdx_string_format_class": 595440,
  "spvdx_table_layout_class": 596208,
  "spvdx_text_class": 596248,
  "spvdx_union_class": 596264,
  "spvdx_unity_class": 596292,
  "spvdx_user_source_class": 596344,
  "spvdx_value_map_entry_class": 596392,
  "spvdx_variable_reference_class": 596440,
  "spvdx_variable_extension_class": 596456,
  "spvdx_visualization_class": 596588,
  "spvdx_visualization_extension_class": 596604,
  "spvdx_where_class": 596620,
  "spvsx_vi_zml_class": 599816,
  "spvsx_border_properties_class": 599832,
  "spvsx_border_style_class": 599848,
  "spvsx_cell_format_properties_class": 599928,
  "spvsx_cell_style_class": 599944,
  "spvsx_container_class": 600028,
  "spvsx_container_text_class": 600104,
  "spvsx_csv_path_class": 600168,
  "spvsx_data_path_class": 600184,
  "spvsx_footnote_properties_class": 600200,
  "spvsx_general_properties_class": 600372,
  "spvsx_graph_class": 600576,
  "spvsx_heading_class": 600592,
  "spvsx_html_class": 600632,
  "spvsx_image_class": 600648,
  "spvsx_label_class": 600664,
  "spvsx_model_class": 600796,
  "spvsx_object_class": 600812,
  "spvsx_page_footer_class": 600828,
  "spvsx_page_header_class": 600844,
  "spvsx_page_paragraph_class": 600860,
  "spvsx_page_paragraph_text_class": 600904,
  "spvsx_page_setup_class": 601092,
  "spvsx_path_class": 601168,
  "spvsx_pmml_container_path_class": 601184,
  "spvsx_printing_properties_class": 601308,
  "spvsx_root_heading_class": 601324,
  "spvsx_stats_container_path_class": 601340,
  "spvsx_style_class": 601528,
  "spvsx_table_class": 601864,
  "spvsx_table_properties_class": 601920,
  "spvsx_table_structure_class": 601948,
  "spvsx_tree_class": 602028,
  "boxplot_class": 602152,
  "np_plot_chart_class": 602156,
  "roc_chart_class": 602168,
  "scree_class": 602176,
  "spreadlevel_plot_chart_class": 602180,
  "xmlMalloc": 672696,
  "xmlRealloc": 672704,
  "xmlMemStrdup": 672708,
  "xmlGenericErrorContext": 672792,
  "xmlGenericError": 672784,
  "xmlStructuredError": 672788,
  "xmlStructuredErrorContext": 672796,
  "xmlGetWarningsDefaultValue": 672744,
  "xmlLastError": 673252,
  "xmlIsBaseCharGroup": 736244,
  "xmlParserDebugEntities": 672736,
  "xmlLoadExtDtdDefaultValue": 672748,
  "xmlDoValidityCheckingDefaultValue": 672740,
  "xmlPedanticParserDefaultValue": 672752,
  "xmlLineNumbersDefaultValue": 672756,
  "xmlKeepBlanksDefaultValue": 672760,
  "xmlSubstituteEntitiesDefaultValue": 672764,
  "xmlDefaultSAXHandler": 672816,
  "xmlIndentTreeOutput": 672800,
  "xmlIsDigitGroup": 736760,
  "xmlIsCombiningGroup": 736684,
  "xmlIsExtenderGroup": 736824,
  "xmlMallocAtomic": 672700,
  "xmlIsPubidChar_tab": 735200,
  "xmlDefaultSAXLocator": 672928,
  "xmlBufferAllocScheme": 672724,
  "__xmlRegisterCallbacks": 615636,
  "xmlRegisterNodeDefaultValue": 672768,
  "xmlDeregisterNodeDefaultValue": 672772,
  "xmlStringText": 615640,
  "xmlStringComment": 615655,
  "xmlStringTextNoenc": 615645,
  "xmlDefaultBufferSize": 672728,
  "xmlParserInputBufferCreateFilenameValue": 672776,
  "xmlOutputBufferCreateFilenameValue": 672780,
  "htmlDefaultSAXHandler": 672944,
  "xmlXPathPINF": 663688,
  "xmlXPathNINF": 663696,
  "xmlXPathNAN": 663680,
  "docbDefaultSAXHandler": 673056,
  "xmlTreeIndentString": 672808,
  "xmlSaveNoEmptyTags": 672812,
  "_libiconv_version": 751444,
  "z_errmsg": 1577440,
  "_length_code": 1575104,
  "_dist_code": 1574592,
  "deflate_copyright": 1571008,
  "inflate_copyright": 1574288,
  "__optreset": 1580824,
  "optind": 1580816,
  "__optpos": 1580828,
  "optopt": 1580836,
  "optreset": 1580824,
  "__c_dot_utf8_locale": 1707016,
  "__c_locale": 1706992,
  "__c_dot_utf8": 1706964,
  "__progname": 1707040,
  "__progname_full": 1707044,
  "program_invocation_short_name": 1707040,
  "program_invocation_name": 1707044,
  "__stderr_used": 1710324,
  "__stdout_used": 1712612,
  "__stdin_used": 1711052,
  "__environ": 1714164,
  "___environ": 1714164,
  "_environ": 1714164,
  "environ": 1714164,
  "__env_map": 1714172,
  "tzname": 1714176,
  "daylight": 1714184,
  "timezone": 1714188,
  "__data_end": 1718800
};
for (var named in NAMED_GLOBALS) {
  Module['_' + named] = gb + NAMED_GLOBALS[named];
}
Module['NAMED_GLOBALS'] = NAMED_GLOBALS;

for (var named in NAMED_GLOBALS) {
  (function(named) {
    var addr = Module['_' + named];
    Module['g$_' + named] = function() { return addr };
  })(named);
}

Module['_fp$localtime_r$iii'] = function() {
  
  assert(Module["_localtime_r"] || typeof _localtime_r !== "undefined", "external function `localtime_r` is missing.perhaps a side module was not linked in? if this symbol was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=XX in the environment");
  // Use the original wasm function itself, for the table, from the main module.
  var func = Module['asm']['localtime_r'];
  // Try an original version from a side module.
  if (!func) func = Module['_localtime_r'];
  // Otherwise, look for a regular function or JS library function.
  if (!func) func = Module['_localtime_r'];
  if (!func) func = _localtime_r;
  var fp = addFunction(func, 'iii');
  Module['_fp$localtime_r$iii'] = function() { return fp };
  return fp;
}


Module['_fp$gmtime_r$iii'] = function() {
  
  assert(Module["_gmtime_r"] || typeof _gmtime_r !== "undefined", "external function `gmtime_r` is missing.perhaps a side module was not linked in? if this symbol was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=XX in the environment");
  // Use the original wasm function itself, for the table, from the main module.
  var func = Module['asm']['gmtime_r'];
  // Try an original version from a side module.
  if (!func) func = Module['_gmtime_r'];
  // Otherwise, look for a regular function or JS library function.
  if (!func) func = Module['_gmtime_r'];
  if (!func) func = _gmtime_r;
  var fp = addFunction(func, 'iii');
  Module['_fp$gmtime_r$iii'] = function() { return fp };
  return fp;
}


Module['_fp$emscripten_longjmp$vii'] = function() {
  
  assert(Module["_emscripten_longjmp"] || typeof _emscripten_longjmp !== "undefined", "external function `emscripten_longjmp` is missing.perhaps a side module was not linked in? if this symbol was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=XX in the environment");
  // Use the original wasm function itself, for the table, from the main module.
  var func = Module['asm']['emscripten_longjmp'];
  // Try an original version from a side module.
  if (!func) func = Module['_emscripten_longjmp'];
  // Otherwise, look for a regular function or JS library function.
  if (!func) func = Module['_emscripten_longjmp'];
  if (!func) func = _emscripten_longjmp;
  var fp = addFunction(func, 'vii');
  Module['_fp$emscripten_longjmp$vii'] = function() { return fp };
  return fp;
}


Module['_fp$__assert_fail$viiii'] = function() {
  
  assert(Module["___assert_fail"] || typeof ___assert_fail !== "undefined", "external function `__assert_fail` is missing.perhaps a side module was not linked in? if this symbol was expected to arrive from a system library, try to build the MAIN_MODULE with EMCC_FORCE_STDLIBS=XX in the environment");
  // Use the original wasm function itself, for the table, from the main module.
  var func = Module['asm']['__assert_fail'];
  // Try an original version from a side module.
  if (!func) func = Module['___assert_fail'];
  // Otherwise, look for a regular function or JS library function.
  if (!func) func = Module['___assert_fail'];
  if (!func) func = ___assert_fail;
  var fp = addFunction(func, 'viiii');
  Module['_fp$__assert_fail$viiii'] = function() { return fp };
  return fp;
}

function invoke_i(index) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iii(index,a1,a2) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_ii(index,a1) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_vi(index,a1) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_di(index,a1) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_viii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iiii(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiiii(index,a1,a2,a3,a4,a5) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2,a3,a4,a5);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_vii(index,a1,a2) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_d(index) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)();
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_iidd(index,a1,a2,a3) {
  var sp = stackSave();
  try {
    return wasmTable.get(index)(a1,a2,a3);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}

function invoke_viiii(index,a1,a2,a3,a4) {
  var sp = stackSave();
  try {
    wasmTable.get(index)(a1,a2,a3,a4);
  } catch(e) {
    stackRestore(sp);
    if (e !== e+0 && e !== 'longjmp') throw e;
    _setThrew(1, 0);
  }
}




var MAGIC = 0;
Math.random = function() {
  MAGIC = Math.pow(MAGIC + 1.8912, 3) % 1;
  return MAGIC;
};
var TIME = 10000;
Date.now = function() {
  return TIME++;
};
if (typeof performance === 'object') performance.now = Date.now;
if (ENVIRONMENT_IS_NODE) process['hrtime'] = Date.now;

if (!Module) Module = {};
Module['thisProgram'] = 'thisProgram'; // for consistency between different builds than between runs of the same build

function hashMemory(id) {
  var ret = 0;
  var len = HEAP32[DYNAMICTOP_PTR>>2];
  for (var i = 0; i < len; i++) {
    ret = (ret*17 + HEAPU8[i])|0;
  }
  return id + ':' + ret;
}

function hashString(s) {
  var ret = 0;
  for (var i = 0; i < s.length; i++) {
    ret = (ret*17 + s.charCodeAt(i))|0;
  }
  return ret;
}




// === Auto-generated postamble setup entry stuff ===

Module["intArrayFromString"] = intArrayFromString;
if (!Object.getOwnPropertyDescriptor(Module, "intArrayToString")) Module["intArrayToString"] = function() { abort("'intArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["ccall"] = ccall;
Module["cwrap"] = cwrap;
Module["setValue"] = setValue;
Module["getValue"] = getValue;
Module["allocate"] = allocate;
Module["getMemory"] = getMemory;
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ArrayToString")) Module["UTF8ArrayToString"] = function() { abort("'UTF8ArrayToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF8ToString")) Module["UTF8ToString"] = function() { abort("'UTF8ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8Array")) Module["stringToUTF8Array"] = function() { abort("'stringToUTF8Array' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF8")) Module["stringToUTF8"] = function() { abort("'stringToUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF8")) Module["lengthBytesUTF8"] = function() { abort("'lengthBytesUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreRun")) Module["addOnPreRun"] = function() { abort("'addOnPreRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnInit")) Module["addOnInit"] = function() { abort("'addOnInit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPreMain")) Module["addOnPreMain"] = function() { abort("'addOnPreMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnExit")) Module["addOnExit"] = function() { abort("'addOnExit' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addOnPostRun")) Module["addOnPostRun"] = function() { abort("'addOnPostRun' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeStringToMemory")) Module["writeStringToMemory"] = function() { abort("'writeStringToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeArrayToMemory")) Module["writeArrayToMemory"] = function() { abort("'writeArrayToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeAsciiToMemory")) Module["writeAsciiToMemory"] = function() { abort("'writeAsciiToMemory' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addRunDependency")) Module["addRunDependency"] = function() { abort("'addRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "removeRunDependency")) Module["removeRunDependency"] = function() { abort("'removeRunDependency' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createFolder")) Module["FS_createFolder"] = function() { abort("'FS_createFolder' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPath")) Module["FS_createPath"] = function() { abort("'FS_createPath' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDataFile")) Module["FS_createDataFile"] = function() { abort("'FS_createDataFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createPreloadedFile")) Module["FS_createPreloadedFile"] = function() { abort("'FS_createPreloadedFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLazyFile")) Module["FS_createLazyFile"] = function() { abort("'FS_createLazyFile' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createLink")) Module["FS_createLink"] = function() { abort("'FS_createLink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_createDevice")) Module["FS_createDevice"] = function() { abort("'FS_createDevice' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "FS_unlink")) Module["FS_unlink"] = function() { abort("'FS_unlink' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ). Alternatively, forcing filesystem support (-s FORCE_FILESYSTEM=1) can export this for you") };
if (!Object.getOwnPropertyDescriptor(Module, "dynamicAlloc")) Module["dynamicAlloc"] = function() { abort("'dynamicAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadDynamicLibrary")) Module["loadDynamicLibrary"] = function() { abort("'loadDynamicLibrary' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "loadWebAssemblyModule")) Module["loadWebAssemblyModule"] = function() { abort("'loadWebAssemblyModule' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getLEB")) Module["getLEB"] = function() { abort("'getLEB' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFunctionTables")) Module["getFunctionTables"] = function() { abort("'getFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "alignFunctionTables")) Module["alignFunctionTables"] = function() { abort("'alignFunctionTables' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "registerFunctions")) Module["registerFunctions"] = function() { abort("'registerFunctions' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "addFunction")) Module["addFunction"] = function() { abort("'addFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "removeFunction")) Module["removeFunction"] = function() { abort("'removeFunction' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "prettyPrint")) Module["prettyPrint"] = function() { abort("'prettyPrint' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "makeBigInt")) Module["makeBigInt"] = function() { abort("'makeBigInt' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getCompilerSetting")) Module["getCompilerSetting"] = function() { abort("'getCompilerSetting' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "print")) Module["print"] = function() { abort("'print' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "printErr")) Module["printErr"] = function() { abort("'printErr' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getTempRet0")) Module["getTempRet0"] = function() { abort("'getTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setTempRet0")) Module["setTempRet0"] = function() { abort("'setTempRet0' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callMain")) Module["callMain"] = function() { abort("'callMain' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abort")) Module["abort"] = function() { abort("'abort' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToNewUTF8")) Module["stringToNewUTF8"] = function() { abort("'stringToNewUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscripten_realloc_buffer")) Module["emscripten_realloc_buffer"] = function() { abort("'emscripten_realloc_buffer' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ENV")) Module["ENV"] = function() { abort("'ENV' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_CODES")) Module["ERRNO_CODES"] = function() { abort("'ERRNO_CODES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ERRNO_MESSAGES")) Module["ERRNO_MESSAGES"] = function() { abort("'ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setErrNo")) Module["setErrNo"] = function() { abort("'setErrNo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "DNS")) Module["DNS"] = function() { abort("'DNS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GAI_ERRNO_MESSAGES")) Module["GAI_ERRNO_MESSAGES"] = function() { abort("'GAI_ERRNO_MESSAGES' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Protocols")) Module["Protocols"] = function() { abort("'Protocols' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Sockets")) Module["Sockets"] = function() { abort("'Sockets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "traverseStack")) Module["traverseStack"] = function() { abort("'traverseStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UNWIND_CACHE")) Module["UNWIND_CACHE"] = function() { abort("'UNWIND_CACHE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "withBuiltinMalloc")) Module["withBuiltinMalloc"] = function() { abort("'withBuiltinMalloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgsArray")) Module["readAsmConstArgsArray"] = function() { abort("'readAsmConstArgsArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readAsmConstArgs")) Module["readAsmConstArgs"] = function() { abort("'readAsmConstArgs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "mainThreadEM_ASM")) Module["mainThreadEM_ASM"] = function() { abort("'mainThreadEM_ASM' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_q")) Module["jstoi_q"] = function() { abort("'jstoi_q' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jstoi_s")) Module["jstoi_s"] = function() { abort("'jstoi_s' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getExecutableName")) Module["getExecutableName"] = function() { abort("'getExecutableName' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "listenOnce")) Module["listenOnce"] = function() { abort("'listenOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "autoResumeAudioContext")) Module["autoResumeAudioContext"] = function() { abort("'autoResumeAudioContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCallLegacy")) Module["dynCallLegacy"] = function() { abort("'dynCallLegacy' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getDynCaller")) Module["getDynCaller"] = function() { abort("'getDynCaller' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "dynCall")) Module["dynCall"] = function() { abort("'dynCall' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "callRuntimeCallbacks")) Module["callRuntimeCallbacks"] = function() { abort("'callRuntimeCallbacks' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "abortStackOverflow")) Module["abortStackOverflow"] = function() { abort("'abortStackOverflow' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reallyNegative")) Module["reallyNegative"] = function() { abort("'reallyNegative' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "unSign")) Module["unSign"] = function() { abort("'unSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "reSign")) Module["reSign"] = function() { abort("'reSign' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "formatString")) Module["formatString"] = function() { abort("'formatString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH")) Module["PATH"] = function() { abort("'PATH' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PATH_FS")) Module["PATH_FS"] = function() { abort("'PATH_FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SYSCALLS")) Module["SYSCALLS"] = function() { abort("'SYSCALLS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMmap2")) Module["syscallMmap2"] = function() { abort("'syscallMmap2' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "syscallMunmap")) Module["syscallMunmap"] = function() { abort("'syscallMunmap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "JSEvents")) Module["JSEvents"] = function() { abort("'JSEvents' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "specialHTMLTargets")) Module["specialHTMLTargets"] = function() { abort("'specialHTMLTargets' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "maybeCStringToJsString")) Module["maybeCStringToJsString"] = function() { abort("'maybeCStringToJsString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findEventTarget")) Module["findEventTarget"] = function() { abort("'findEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "findCanvasEventTarget")) Module["findCanvasEventTarget"] = function() { abort("'findCanvasEventTarget' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "polyfillSetImmediate")) Module["polyfillSetImmediate"] = function() { abort("'polyfillSetImmediate' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangle")) Module["demangle"] = function() { abort("'demangle' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "demangleAll")) Module["demangleAll"] = function() { abort("'demangleAll' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "jsStackTrace")) Module["jsStackTrace"] = function() { abort("'jsStackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackTrace")) Module["stackTrace"] = function() { abort("'stackTrace' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getEnvStrings")) Module["getEnvStrings"] = function() { abort("'getEnvStrings' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "checkWasiClock")) Module["checkWasiClock"] = function() { abort("'checkWasiClock' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64")) Module["writeI53ToI64"] = function() { abort("'writeI53ToI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Clamped")) Module["writeI53ToI64Clamped"] = function() { abort("'writeI53ToI64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToI64Signaling")) Module["writeI53ToI64Signaling"] = function() { abort("'writeI53ToI64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Clamped")) Module["writeI53ToU64Clamped"] = function() { abort("'writeI53ToU64Clamped' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeI53ToU64Signaling")) Module["writeI53ToU64Signaling"] = function() { abort("'writeI53ToU64Signaling' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromI64")) Module["readI53FromI64"] = function() { abort("'readI53FromI64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "readI53FromU64")) Module["readI53FromU64"] = function() { abort("'readI53FromU64' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertI32PairToI53")) Module["convertI32PairToI53"] = function() { abort("'convertI32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "convertU32PairToI53")) Module["convertU32PairToI53"] = function() { abort("'convertU32PairToI53' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionLast")) Module["exceptionLast"] = function() { abort("'exceptionLast' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionCaught")) Module["exceptionCaught"] = function() { abort("'exceptionCaught' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exceptionThrowBuf")) Module["exceptionThrowBuf"] = function() { abort("'exceptionThrowBuf' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfoAttrs")) Module["ExceptionInfoAttrs"] = function() { abort("'ExceptionInfoAttrs' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "ExceptionInfo")) Module["ExceptionInfo"] = function() { abort("'ExceptionInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "CatchInfo")) Module["CatchInfo"] = function() { abort("'CatchInfo' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_addRef")) Module["exception_addRef"] = function() { abort("'exception_addRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "exception_decRef")) Module["exception_decRef"] = function() { abort("'exception_decRef' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "Browser")) Module["Browser"] = function() { abort("'Browser' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "funcWrappers")) Module["funcWrappers"] = function() { abort("'funcWrappers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "getFuncWrapper")) Module["getFuncWrapper"] = function() { abort("'getFuncWrapper' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "setMainLoop")) Module["setMainLoop"] = function() { abort("'setMainLoop' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "FS")) Module["FS"] = function() { abort("'FS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "MEMFS")) Module["MEMFS"] = function() { abort("'MEMFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "TTY")) Module["TTY"] = function() { abort("'TTY' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "PIPEFS")) Module["PIPEFS"] = function() { abort("'PIPEFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SOCKFS")) Module["SOCKFS"] = function() { abort("'SOCKFS' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "tempFixedLengthArray")) Module["tempFixedLengthArray"] = function() { abort("'tempFixedLengthArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "miniTempWebGLFloatBuffers")) Module["miniTempWebGLFloatBuffers"] = function() { abort("'miniTempWebGLFloatBuffers' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapObjectForWebGLType")) Module["heapObjectForWebGLType"] = function() { abort("'heapObjectForWebGLType' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "heapAccessShiftForWebGLHeap")) Module["heapAccessShiftForWebGLHeap"] = function() { abort("'heapAccessShiftForWebGLHeap' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GL")) Module["GL"] = function() { abort("'GL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGet")) Module["emscriptenWebGLGet"] = function() { abort("'emscriptenWebGLGet' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "computeUnpackAlignedImageSize")) Module["computeUnpackAlignedImageSize"] = function() { abort("'computeUnpackAlignedImageSize' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetTexPixelData")) Module["emscriptenWebGLGetTexPixelData"] = function() { abort("'emscriptenWebGLGetTexPixelData' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetUniform")) Module["emscriptenWebGLGetUniform"] = function() { abort("'emscriptenWebGLGetUniform' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "emscriptenWebGLGetVertexAttrib")) Module["emscriptenWebGLGetVertexAttrib"] = function() { abort("'emscriptenWebGLGetVertexAttrib' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "writeGLArray")) Module["writeGLArray"] = function() { abort("'writeGLArray' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AL")) Module["AL"] = function() { abort("'AL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_unicode")) Module["SDL_unicode"] = function() { abort("'SDL_unicode' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_ttfContext")) Module["SDL_ttfContext"] = function() { abort("'SDL_ttfContext' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_audio")) Module["SDL_audio"] = function() { abort("'SDL_audio' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL")) Module["SDL"] = function() { abort("'SDL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "SDL_gfx")) Module["SDL_gfx"] = function() { abort("'SDL_gfx' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLUT")) Module["GLUT"] = function() { abort("'GLUT' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "EGL")) Module["EGL"] = function() { abort("'EGL' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW_Window")) Module["GLFW_Window"] = function() { abort("'GLFW_Window' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLFW")) Module["GLFW"] = function() { abort("'GLFW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "GLEW")) Module["GLEW"] = function() { abort("'GLEW' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "IDBStore")) Module["IDBStore"] = function() { abort("'IDBStore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "runAndAbortIfError")) Module["runAndAbortIfError"] = function() { abort("'runAndAbortIfError' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "warnOnce")) Module["warnOnce"] = function() { abort("'warnOnce' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackSave")) Module["stackSave"] = function() { abort("'stackSave' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackRestore")) Module["stackRestore"] = function() { abort("'stackRestore' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stackAlloc")) Module["stackAlloc"] = function() { abort("'stackAlloc' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "AsciiToString")) Module["AsciiToString"] = function() { abort("'AsciiToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToAscii")) Module["stringToAscii"] = function() { abort("'stringToAscii' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF16ToString")) Module["UTF16ToString"] = function() { abort("'UTF16ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF16")) Module["stringToUTF16"] = function() { abort("'stringToUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF16")) Module["lengthBytesUTF16"] = function() { abort("'lengthBytesUTF16' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "UTF32ToString")) Module["UTF32ToString"] = function() { abort("'UTF32ToString' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "stringToUTF32")) Module["stringToUTF32"] = function() { abort("'stringToUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "lengthBytesUTF32")) Module["lengthBytesUTF32"] = function() { abort("'lengthBytesUTF32' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8")) Module["allocateUTF8"] = function() { abort("'allocateUTF8' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
if (!Object.getOwnPropertyDescriptor(Module, "allocateUTF8OnStack")) Module["allocateUTF8OnStack"] = function() { abort("'allocateUTF8OnStack' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") };
Module["writeStackCookie"] = writeStackCookie;
Module["checkStackCookie"] = checkStackCookie;Module["ALLOC_NORMAL"] = ALLOC_NORMAL;
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_STACK")) Object.defineProperty(Module, "ALLOC_STACK", { configurable: true, get: function() { abort("'ALLOC_STACK' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_DYNAMIC")) Object.defineProperty(Module, "ALLOC_DYNAMIC", { configurable: true, get: function() { abort("'ALLOC_DYNAMIC' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });
if (!Object.getOwnPropertyDescriptor(Module, "ALLOC_NONE")) Object.defineProperty(Module, "ALLOC_NONE", { configurable: true, get: function() { abort("'ALLOC_NONE' was not exported. add it to EXTRA_EXPORTED_RUNTIME_METHODS (see the FAQ)") } });


var calledRun;

/**
 * @constructor
 * @this {ExitStatus}
 */
function ExitStatus(status) {
  this.name = "ExitStatus";
  this.message = "Program terminated with exit(" + status + ")";
  this.status = status;
}

var calledMain = false;


dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function callMain(args) {
  assert(runDependencies == 0, 'cannot call main when async dependencies remain! (listen on Module["onRuntimeInitialized"])');
  assert(__ATPRERUN__.length == 0, 'cannot call main when preRun functions remain to be called');

  var entryFunction = Module['_main'];


  args = args || [];

  var argc = args.length+1;
  var argv = stackAlloc((argc + 1) * 4);
  HEAP32[argv >> 2] = allocateUTF8OnStack(thisProgram);
  for (var i = 1; i < argc; i++) {
    HEAP32[(argv >> 2) + i] = allocateUTF8OnStack(args[i - 1]);
  }
  HEAP32[(argv >> 2) + argc] = 0;

  try {


    var ret = entryFunction(argc, argv);


    // In PROXY_TO_PTHREAD builds, we should never exit the runtime below, as execution is asynchronously handed
    // off to a pthread.
    // if we're not running an evented main loop, it's time to exit
      exit(ret, /* implicit = */ true);
  }
  catch(e) {
    if (e instanceof ExitStatus) {
      // exit() throws this once it's done to make sure execution
      // has been stopped completely
      return;
    } else if (e == 'unwind') {
      // running an evented main loop, don't immediately exit
      noExitRuntime = true;
      return;
    } else {
      var toLog = e;
      if (e && typeof e === 'object' && e.stack) {
        toLog = [e, e.stack];
      }
      err('exception thrown: ' + toLog);
      quit_(1, e);
    }
  } finally {
    calledMain = true;
  }
}




/** @type {function(Array=)} */
function run(args) {
  args = args || arguments_;

  if (runDependencies > 0) {
    return;
  }

  writeStackCookie();

  preRun();

  if (runDependencies > 0) return; // a preRun added a dependency, run will be called later

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    preMain();

    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    if (shouldRunNow) callMain(args);

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}
Module['run'] = run;

function checkUnflushedContent() {
  // Compiler settings do not allow exiting the runtime, so flushing
  // the streams is not possible. but in ASSERTIONS mode we check
  // if there was something to flush, and if so tell the user they
  // should request that the runtime be exitable.
  // Normally we would not even include flush() at all, but in ASSERTIONS
  // builds we do so just for this check, and here we see if there is any
  // content to flush, that is, we check if there would have been
  // something a non-ASSERTIONS build would have not seen.
  // How we flush the streams depends on whether we are in SYSCALLS_REQUIRE_FILESYSTEM=0
  // mode (which has its own special function for this; otherwise, all
  // the code is inside libc)
  var print = out;
  var printErr = err;
  var has = false;
  out = err = function(x) {
    has = true;
  }
  try { // it doesn't matter if it fails
    var flush = Module['_fflush'];
    if (flush) flush(0);
    // also flush in the JS FS layer
    ['stdout', 'stderr'].forEach(function(name) {
      var info = FS.analyzePath('/dev/' + name);
      if (!info) return;
      var stream = info.object;
      var rdev = stream.rdev;
      var tty = TTY.ttys[rdev];
      if (tty && tty.output && tty.output.length) {
        has = true;
      }
    });
  } catch(e) {}
  out = print;
  err = printErr;
  if (has) {
    warnOnce('stdio streams had content in them that was not flushed. you should set EXIT_RUNTIME to 1 (see the FAQ), or make sure to emit a newline when you printf etc.');
  }
}

/** @param {boolean|number=} implicit */
function exit(status, implicit) {
  checkUnflushedContent();

  // if this is just main exit-ing implicitly, and the status is 0, then we
  // don't need to do anything here and can just leave. if the status is
  // non-zero, though, then we need to report it.
  // (we may have warned about this earlier, if a situation justifies doing so)
  if (implicit && noExitRuntime && status === 0) {
    return;
  }

  if (noExitRuntime) {
    // if exit() was called, we may warn the user if the runtime isn't actually being shut down
    if (!implicit) {
      var msg = 'program exited (with status: ' + status + '), but EXIT_RUNTIME is not set, so halting execution but not exiting the runtime or preventing further async execution (build with EXIT_RUNTIME=1, if you want a true shutdown)';
      err(msg);
    }
  } else {

    ABORT = true;
    EXITSTATUS = status;

    exitRuntime();

    if (Module['onExit']) Module['onExit'](status);
  }

  quit_(status, new ExitStatus(status));
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

// shouldRunNow refers to calling main(), not run().
var shouldRunNow = true;

if (Module['noInitialRun']) shouldRunNow = false;


  noExitRuntime = true;

run();






// {{MODULE_ADDITIONS}}




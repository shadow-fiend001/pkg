
const path = require('path').join(__dirname, 'schnorrkel_js_bg.wasm');
const bytes = require('fs').readFileSync(path);
let imports = {};
imports['./schnorrkel_js.js'] = require('./schnorrkel_js.js');

const wasmModule = new WebAssembly.Module(bytes);
const wasmInstance = new WebAssembly.Instance(wasmModule, imports);
module.exports = wasmInstance.exports;
module.exports = async function createExportPromise () {
  return wasmInstance.exports;
}


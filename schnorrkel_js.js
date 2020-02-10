let wasm;
const { u8aToString } = require('@polkadot/util');

const heap = new Array(32);

heap.fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 36) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray8ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 1);
    getUint8Memory0().set(arg, ptr / 1);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}

let cachegetInt32Memory0 = null;
function getInt32Memory0() {
    if (cachegetInt32Memory0 === null || cachegetInt32Memory0.buffer !== wasm.memory.buffer) {
        cachegetInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachegetInt32Memory0;
}

function getArrayU8FromWasm0(ptr, len) {
    return getUint8Memory0().subarray(ptr / 1, ptr / 1 + len);
}
/**
* Perform a derivation on a secret
*
* * secret: UIntArray with 64 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector the derived keypair as a array of 96 bytes
* @param {Uint8Array} pair
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
module.exports.derive_keypair_hard = function(pair, cc) {
    var ptr0 = passArray8ToWasm0(pair, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(cc, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.derive_keypair_hard(8, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
};

/**
* Perform a derivation on a secret
*
* * secret: UIntArray with 64 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector the derived keypair as a array of 96 bytes
* @param {Uint8Array} pair
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
module.exports.derive_keypair_soft = function(pair, cc) {
    var ptr0 = passArray8ToWasm0(pair, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(cc, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.derive_keypair_soft(8, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
};

/**
* Perform a derivation on a publicKey
*
* * pubkey: UIntArray with 32 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector is the derived publicKey as a array of 32 bytes
* @param {Uint8Array} public_key
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
module.exports.derive_public_soft = function(public_key, cc) {
    var ptr0 = passArray8ToWasm0(public_key, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(cc, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    wasm.derive_public_soft(8, ptr0, len0, ptr1, len1);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v2 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v2;
};

/**
* Generate a key pair.
*
* * seed: UIntArray with 32 element
*
* returned vector is the concatenation of first the private key (64 bytes)
* followed by the public key (32) bytes.
* @param {Uint8Array} seed
* @returns {Uint8Array}
*/
module.exports.keypair_from_seed = function(seed) {
    var ptr0 = passArray8ToWasm0(seed, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.keypair_from_seed(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
};

/**
* Generate a  public from private. .
* * private: UIntArray with 64 element
* returned vector is the  public key (32) bytes.
* @param {Uint8Array} secret
* @returns {Uint8Array}
*/
module.exports.to_public = function(secret) {
    var ptr0 = passArray8ToWasm0(secret, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    wasm.to_public(8, ptr0, len0);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v1 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v1;
};

/**
* Sign a message
*
* The combination of both public and private key must be provided.
* This is effectively equivalent to a keypair.
*
* * public: UIntArray with 32 element
* * private: UIntArray with 64 element
* * message: Arbitrary length UIntArray
*
* * returned vector is the signature consisting of 64 bytes.
* @param {Uint8Array} public_key
* @param {Uint8Array} secret
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
module.exports.sign = function(public_key, secret, message) {
    var ptr0 = passArray8ToWasm0(public_key, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(secret, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    wasm.sign(8, ptr0, len0, ptr1, len1, ptr2, len2);
    var r0 = getInt32Memory0()[8 / 4 + 0];
    var r1 = getInt32Memory0()[8 / 4 + 1];
    var v3 = getArrayU8FromWasm0(r0, r1).slice();
    wasm.__wbindgen_free(r0, r1 * 1);
    return v3;
};

/**
* Verify a message and its corresponding against a public key;
*
* * signature: UIntArray with 64 element
* * message: Arbitrary length UIntArray
* * pubkey: UIntArray with 32 element
* @param {Uint8Array} signature
* @param {Uint8Array} message
* @param {Uint8Array} public_key
* @returns {boolean}
*/
module.exports.verify = function(signature, message, public_key) {
    var ptr0 = passArray8ToWasm0(signature, wasm.__wbindgen_malloc);
    var len0 = WASM_VECTOR_LEN;
    var ptr1 = passArray8ToWasm0(message, wasm.__wbindgen_malloc);
    var len1 = WASM_VECTOR_LEN;
    var ptr2 = passArray8ToWasm0(public_key, wasm.__wbindgen_malloc);
    var len2 = WASM_VECTOR_LEN;
    var ret = wasm.verify(ptr0, len0, ptr1, len1, ptr2, len2);
    return ret !== 0;
};

// let cachedTextDecoder = new TextDecoder('utf-8', { ignoreBOM: true, fatal: true });

u8aToString();

function getStringFromWasm0(ptr, len) {
    return u8aToString(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

module.exports.__wbindgen_object_drop_ref = function(arg0) {
    takeObject(arg0);
};

module.exports.__wbg_new_3a746f2619705add = function(arg0, arg1) {
    var ret = new Function(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_call_f54d3a6dadb199ca = function(arg0, arg1) {
    var ret = getObject(arg0).call(getObject(arg1));
    return addHeapObject(ret);
};

module.exports.__wbindgen_jsval_eq = function(arg0, arg1) {
    var ret = getObject(arg0) === getObject(arg1);
    return ret;
};

module.exports.__wbg_self_ac379e780a0d8b94 = function(arg0) {
    var ret = getObject(arg0).self;
    return addHeapObject(ret);
};

module.exports.__wbg_crypto_1e4302b85d4f64a2 = function(arg0) {
    var ret = getObject(arg0).crypto;
    return addHeapObject(ret);
};

module.exports.__wbindgen_is_undefined = function(arg0) {
    var ret = getObject(arg0) === undefined;
    return ret;
};

module.exports.__wbg_getRandomValues_1b4ba144162a5c9e = function(arg0) {
    var ret = getObject(arg0).getRandomValues;
    return addHeapObject(ret);
};

module.exports.__wbg_require_6461b1e9a0d7c34a = function(arg0, arg1) {
    var ret = require(getStringFromWasm0(arg0, arg1));
    return addHeapObject(ret);
};

module.exports.__wbg_randomFillSync_1b52c8482374c55b = function(arg0, arg1, arg2) {
    getObject(arg0).randomFillSync(getArrayU8FromWasm0(arg1, arg2));
};

module.exports.__wbg_getRandomValues_1ef11e888e5228e9 = function(arg0, arg1, arg2) {
    getObject(arg0).getRandomValues(getArrayU8FromWasm0(arg1, arg2));
};
// wasm = require('./schnorrkel_js_bg');


module.exports.abort = function () { throw new Error('abort'); };

const createPromise = require('./schnorrkel_js_bg');
const wasmPromise = createPromise().catch(() => null);

module.exports.isReady = function () { return !!wasm; }
module.exports.waitReady = function () { return wasmPromise.then(() => !!wasm); }

wasmPromise.then((_wasm) => { wasm = _wasm });


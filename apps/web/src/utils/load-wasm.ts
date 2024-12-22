import '../../wasm-exec.js';

let wasmModule: WebAssembly.Instance | null;

export async function loadWasm(): Promise<void> {
  if (!wasmModule) {
    const goWasm = new window.Go();
    const result = await WebAssembly.instantiateStreaming(fetch('../../argon2.wasm'), goWasm.importObject);
    goWasm.run(result.instance);
    wasmModule = result.instance;
  }
}

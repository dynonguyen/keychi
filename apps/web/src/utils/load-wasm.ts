import '../../wasm-exec.js';
import { getAssetUrl } from './get-asset.js';

let wasmModule: WebAssembly.Instance | null;

export async function loadWasm(): Promise<void> {
  if (!wasmModule) {
    const goWasm = new window.Go();
    const result = await WebAssembly.instantiateStreaming(fetch(getAssetUrl('bin/argon2.wasm')), goWasm.importObject);
    goWasm.run(result.instance);
    wasmModule = result.instance;
  }
}

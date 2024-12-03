export function hexToArrayBuffer(hex: string): ArrayBuffer {
  if (hex.length % 2 !== 0) {
    throw new Error('Invalid hex string: length must be even.');
  }

  const length = hex.length / 2;
  const buffer = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    buffer[i] = parseInt(hex.slice(i * 2, i * 2 + 2), 16);
  }

  return buffer.buffer;
}

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer);

  return Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('');
}

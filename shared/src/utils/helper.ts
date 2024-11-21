import i18next from 'i18next';
import { ApiErrorResponse } from '../types/common.type';
import { Any } from '../types/util.type';

export function toNumber(
  value: Any,
  defaultValue?: number,
  options: {
    allowNull?: boolean;
    allowNegative?: boolean;
    allowZero?: boolean;
  } = {}
) {
  const { allowNegative = true, allowNull = true, allowZero = true } = options;

  if (!allowNull && value === null) return defaultValue;

  const numValue = Number(value);

  if (isNaN(numValue)) return defaultValue;
  if (!allowNegative && numValue < 0) return defaultValue;
  if (!allowZero && numValue === 0) return defaultValue;

  return numValue;
}

export function emitCustomEvent<T>(key: string, data?: T, opts?: EventInit) {
  window.dispatchEvent(new CustomEvent(key, { ...opts, detail: data }));
}

export function getErrorMessage(error: ApiErrorResponse): string {
  const errorKey = `error.${error.code}`;
  const errorMsg = i18next.t(errorKey as Any);

  return errorMsg === errorKey ? error.message : errorMsg;
}

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

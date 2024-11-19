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

export function arrayBufferToHex(buffer: ArrayBuffer): string {
  const view = new Uint8Array(buffer);
  let hexString = '';

  for (let i = 0; i < view.length; i++) {
    const hex = view[i].toString(16).padStart(2, '0');
    hexString += hex;
  }

  return hexString;
}

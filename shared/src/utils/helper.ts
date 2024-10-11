import { Any } from '../types/common.type';

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

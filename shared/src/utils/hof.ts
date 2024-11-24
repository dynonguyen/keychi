export function withDefault<T extends object>(
  obj: T,
  defaultValues: Partial<{ [K in keyof T]: NonNullable<T[K]> }>
): T {
  const result = { ...obj } as T;

  for (const key in defaultValues) {
    const val = result[key];

    if (val === null || val === undefined) {
      result[key] = defaultValues[key] as T[Extract<keyof T, string>];
    }
  }

  return result;
}

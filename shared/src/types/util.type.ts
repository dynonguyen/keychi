import i18next from 'i18next';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Any = any;

/**
	Example:

  const tmp = { x: 'a', y: 'b' } as const
  type A = ValueMap<typeof tmp>; // 'a' | 'b'
*/
type TypeMap<T> = {
  [K in keyof T]: T[K];
};
export type ValueMap<T> = TypeMap<T>[keyof TypeMap<T>];

/**
	Example:

	enum Abc { A = 'x' B = 'y' };
  type Xy = EnumValue<Abc>; // 'x' | 'y'
*/
export type EnumValue<T extends string | number | bigint | boolean | null | undefined> =
  `${T}` extends `${infer N extends string}` ? N : never;

export type TFunction = typeof i18next.t;

export type Maybe<T> = T | null | undefined;

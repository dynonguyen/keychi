import { shuffle } from 'lodash-es';

const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz'.split('');
const NUMBERS = '0123456789'.split('');
const SYMBOLS = '!@#$%^&*()_+{}:"<>?|[];\',./`~'.split('');
const AMBIGUOUS = new Set(['l', '1', '0', 'O']);

// Password Generator
export type PasswordGeneratorOptions = {
  length?: number;
  includeUppercase?: boolean;
  includeLowercase?: boolean;
  includeNumber?: boolean;
  includeSymbols?: boolean;
  avoidAmbiguous?: boolean;
};

const pwdGenDefaultOpts: Required<PasswordGeneratorOptions> = {
  length: 14,
  includeUppercase: true,
  includeLowercase: true,
  includeNumber: true,
  includeSymbols: true,
  avoidAmbiguous: false
};

function randomChar(charset: string[]): string {
  return charset[Math.floor(Math.random() * charset.length)];
}

export function passwordGenerator(options: PasswordGeneratorOptions = pwdGenDefaultOpts): string {
  const { length, includeUppercase, includeLowercase, includeNumber, includeSymbols, avoidAmbiguous } = {
    ...pwdGenDefaultOpts,
    ...options
  };

  const minLength =
    Number(includeUppercase) + Number(includeLowercase) + Number(includeNumber) + Number(includeSymbols) || 1;

  if (length < minLength) {
    throw new Error(`Password length must be at least ${minLength}`);
  }

  if (!includeUppercase && !includeLowercase && !includeNumber && !includeSymbols) {
    throw new Error('At least one character set must be included.');
  }

  const filterAmbiguous = (charset: string[]): string[] => {
    return avoidAmbiguous ? charset.filter((c) => !AMBIGUOUS.has(c)) : charset;
  };

  let password = [];

  const CHARSET = {
    UPPERCASE: filterAmbiguous(UPPERCASE),
    LOWERCASE: filterAmbiguous(LOWERCASE),
    NUMBERS: filterAmbiguous(NUMBERS),
    SPECIAL: filterAmbiguous(SYMBOLS)
  };

  if (includeUppercase) password.push(randomChar(CHARSET.UPPERCASE));
  if (includeLowercase) password.push(randomChar(CHARSET.LOWERCASE));
  if (includeNumber) password.push(randomChar(CHARSET.NUMBERS));
  if (includeSymbols) password.push(randomChar(CHARSET.SPECIAL));

  password = shuffle(password);

  if (password.length < length) {
    const SEED_CHARSET = [];

    includeLowercase && SEED_CHARSET.push(...CHARSET.LOWERCASE);
    includeUppercase && SEED_CHARSET.push(...CHARSET.UPPERCASE);
    includeNumber && SEED_CHARSET.push(...CHARSET.NUMBERS);
    includeSymbols && SEED_CHARSET.push(...CHARSET.SPECIAL);

    for (let i = password.length; i < length; i++) {
      password.push(randomChar(SEED_CHARSET));
    }
  }

  return password.join('');
}

// Password Strength Meter
export enum PasswordStrength {
  VeryWeak = 'very-weak',
  Weak = 'weak',
  Medium = 'medium',
  Good = 'good',
  Strong = 'strong'
}

type PasswordStrengthResult = {
  strength: PasswordStrength;
  score: number;
  includeLowercase: boolean;
  includeUppercase: boolean;
  includeNumber: boolean;
  includeSymbols: boolean;
};

export function passwordStrengthMeter(password: string): PasswordStrengthResult {
  const length = password.length;

  let score = 0;
  let strength = PasswordStrength.VeryWeak;

  const includeCharset = (charset: string[]) => charset.some((c) => password.includes(c));

  const includeLowercase = includeCharset(LOWERCASE);
  const includeUppercase = includeCharset(UPPERCASE);
  const includeNumber = includeCharset(NUMBERS);
  const includeSymbols = includeCharset(SYMBOLS);

  const uniqueCharsLen = new Set(password.split('')).size;

  // Calculate score
  if (length < 8) {
    score = 1; // Very Weak
  } else if (uniqueCharsLen < 6) {
    score = 3; // Weak
  } else if (length > 10 && uniqueCharsLen > 6) {
    score = 10; // Strong
  } else {
    score++;
    if (length >= 12) score++;
    if (includeLowercase) score++;
    if (includeUppercase) score++;
    if (includeNumber) score++;
    if (includeSymbols) score++;
  }

  // Evaluate password strength
  if (score <= 2) {
    strength = PasswordStrength.VeryWeak;
  } else if (score === 3) {
    strength = PasswordStrength.Weak;
  } else if (score === 4) {
    strength = PasswordStrength.Medium;
  } else if (score === 5) {
    strength = PasswordStrength.Good;
  } else {
    strength = PasswordStrength.Strong;
  }

  return { strength, score, includeLowercase, includeUppercase, includeNumber, includeSymbols };
}

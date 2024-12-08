import { DEFAULT } from '@shared/constants';
import { ThemeMode, UserProfile } from '@shared/types';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { LS_KEY } from '../constants/key';
import { Cipher } from '../utils/cipher';

type ProfileStore = UserProfile & {
  cipher: Cipher;
  masterPwd: string;
  setMasterPwd(pwd: string): void;
  setProfile(profile: UserProfile): void;
  setTheme(theme: ThemeMode): void;
};

const initTheme = (): ThemeMode => {
  const savedTheme = localStorage.getItem(LS_KEY.THEME) as ThemeMode | undefined;
  return savedTheme && Object.values(ThemeMode).includes(savedTheme) ? savedTheme : DEFAULT.USER_THEME;
};

const defaultStore = {
  preferences: {
    theme: initTheme()
  }
} as ProfileStore;

export const useProfileStore = createWithEqualityFn<ProfileStore>(
  (set, get) => ({
    ...defaultStore,

    setProfile(profile) {
      const { email, preferences } = profile;
      const { kdfAlgorithm, kdfIterations, kdfSalt, kdfMemory, kdfParallelism } = preferences;

      const cipher = new Cipher({
        email,
        masterPwd: get().masterPwd,
        kdfParams: { kdfAlgorithm, kdfIterations, kdfSalt, kdfMemory, kdfParallelism }
      });

      set({ ...profile, cipher });
    },

    setMasterPwd(pwd) {
      set({ masterPwd: pwd });
    },

    setTheme(theme) {
      set({ preferences: { ...get().preferences, theme } });
    }
  }),
  isEqual
);

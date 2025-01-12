import { UserProfile } from '@keychi/shared/types';
import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { Cipher } from '../utils/cipher';

type ProfileStore = UserProfile & {
  cipher: Cipher;
  masterPwd: string;
  setMasterPwd(pwd: string): void;
  setProfile(profile: UserProfile): void;
  lock(): void;
};

const defaultStore = {} as ProfileStore;

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

    lock() {
      set({ masterPwd: '' });
    }
  }),
  isEqual
);

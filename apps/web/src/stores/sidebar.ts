import isEqual from 'react-fast-compare';
import { createWithEqualityFn } from 'zustand/traditional';
import { LS_KEY } from '../constants/key';

type SidebarStore = {
  open: boolean;
  toggle(): void;
};

export const useSidebarStore = createWithEqualityFn<SidebarStore>(
  (set, get) => ({
    open: localStorage.getItem(LS_KEY.SIDEBAR) !== 'hide',

    toggle() {
      const open = !get().open;
      localStorage.setItem(LS_KEY.SIDEBAR, open ? 'show' : 'hide');
      set({ open });
    }
  }),
  isEqual
);

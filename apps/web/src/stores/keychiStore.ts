import { create } from 'zustand';

type KeychiState = {
  lightOn: boolean;
  getTheme: () => boolean;
  switchTheme: () => void;
};

export const getInitialTheme = (): boolean => {
  const savedTheme = localStorage.getItem('lightOn');
  return savedTheme ? JSON.parse(savedTheme) : false;
};

export const useKeychiStore = create<KeychiState>((set, get) => ({
  lightOn: getInitialTheme(),
  getTheme: () => get().lightOn,
  switchTheme: () =>
    set((state) => {
      const newTheme = !state.lightOn;
      document.documentElement.setAttribute('data-theme', newTheme ? 'light' : 'dark');
      localStorage.setItem('lightOn', JSON.stringify(newTheme));
      return { lightOn: newTheme };
    })
}));

export default useKeychiStore;

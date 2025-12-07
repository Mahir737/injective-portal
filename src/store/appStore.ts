import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AppState {
  currentView: 'home' | 'browser' | 'wallet' | 'settings';
  setCurrentView: (view: 'home' | 'browser' | 'wallet' | 'settings') => void;
  pinnedDapps: string[];
  togglePinDapp: (id: string) => void;
  isPinned: (id: string) => boolean;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentView: 'home',
      setCurrentView: (view) => set({ currentView: view }),
      pinnedDapps: [],
      togglePinDapp: (id: string) => {
        const { pinnedDapps } = get();
        const newPinned = pinnedDapps.includes(id)
          ? pinnedDapps.filter(dappId => dappId !== id)
          : [...pinnedDapps, id];
        set({ pinnedDapps: newPinned });
      },
      isPinned: (id: string) => {
        const { pinnedDapps } = get();
        return pinnedDapps.includes(id);
      },
    }),
    {
      name: 'injective-app-storage',
    }
  )
);

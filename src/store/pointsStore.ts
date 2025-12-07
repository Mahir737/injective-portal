import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface PointsState {
  points: number;
  level: number;
  transactions: number;
  lastTransactionDate: string | null;
  streak: number;
  achievements: string[];
  redeemedRewards: string[];
  activeMultiplier: number;
  multiplierEndTime: number | null;
  
  addPoints: (amount: number) => void;
  addTransaction: () => void;
  unlockAchievement: (id: string) => void;
  redeemReward: (id: string) => void;
  setMultiplier: (multiplier: number, duration: number) => void;
  checkStreak: () => void;
}

export const usePointsStore = create<PointsState>()(
  persist(
    (set, get) => ({
      points: 0,
      level: 1,
      transactions: 0,
      lastTransactionDate: null,
      streak: 0,
      achievements: [],
      redeemedRewards: [],
      activeMultiplier: 1,
      multiplierEndTime: null,

      addPoints: (amount) => {
        const { points, activeMultiplier } = get();
        const finalAmount = Math.floor(amount * activeMultiplier);
        const newPoints = points + finalAmount;
        const newLevel = Math.floor(newPoints / 1000) + 1;
        set({ points: newPoints, level: newLevel });
      },

      addTransaction: () => {
        const { transactions, addPoints, checkStreak } = get();
        set({ transactions: transactions + 1 });
        checkStreak();
        addPoints(100);
      },

      unlockAchievement: (id) => {
        const { achievements } = get();
        if (!achievements.includes(id)) {
          set({ achievements: [...achievements, id] });
        }
      },

      redeemReward: (id) => {
        const { redeemedRewards } = get();
        if (!redeemedRewards.includes(id)) {
          set({ redeemedRewards: [...redeemedRewards, id] });
        }
      },

      setMultiplier: (multiplier, duration) => {
        set({
          activeMultiplier: multiplier,
          multiplierEndTime: Date.now() + duration,
        });
      },

      checkStreak: () => {
        const { lastTransactionDate, streak } = get();
        const today = new Date().toDateString();
        
        if (lastTransactionDate === today) {
          return;
        }
        
        const yesterday = new Date(Date.now() - 86400000).toDateString();
        const newStreak = lastTransactionDate === yesterday ? streak + 1 : 1;
        
        set({
          lastTransactionDate: today,
          streak: newStreak,
        });
      },
    }),
    {
      name: 'injective-points-storage',
    }
  )
);

'use client';

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useEffectEvent,
  useState,
} from 'react';

type StreakContextType = {
  streak: number;
  setStreak: Dispatch<SetStateAction<number>>;
};

const StreakContext = createContext<StreakContextType | undefined>(undefined);

export function StreakProvider({ children }: { children: ReactNode }) {
  const [streak, setStreak] = useState<number>(0);
  const updateStreak = useEffectEvent(() => {
    const savedStreak = localStorage.getItem('streak_count');
    const lastDate = localStorage.getItem('last_study_date');
    const today = new Date().toISOString().split('T')[0];

    if (!savedStreak || !lastDate) return;

    const streakVal = parseInt(savedStreak);

    // Create a date object for "Yesterday"
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    if (lastDate === today || lastDate === yesterdayStr) {
      // Streak is still valid!
      setStreak(streakVal);
    } else {
      // More than 24 hours have passed since last study
      setStreak(0);
      localStorage.setItem('streak_count', '0');
    }
  });

  // Persist changes
  useEffect(() => {
    updateStreak();
  }, [streak]);

  return (
    <StreakContext.Provider value={{ streak, setStreak }}>
      {children}
    </StreakContext.Provider>
  );
}

export function useStreak() {
  const ctx = useContext(StreakContext);

  if (!ctx) {
    throw new Error('useStreak must be used inside StreakProvider');
  }

  return ctx;
}

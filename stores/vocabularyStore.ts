// store/useVocabularyStore.ts
import { VocabularyDTO } from "@/types/vocabulary";
import { create } from "zustand";

export type View = "map" | "cards" | "library";

interface VocabularyState {
  // State
  queue: VocabularyDTO[]; // Replace 'any' with your VocabularyDTO
  view: View;
  isReviewMode: boolean;
  selectedLevel: number;
  searchQuery: string;
  wordsData: VocabularyDTO[];
  masteredIds: number[];
  wordsPerLevel: number;

  // Actions
  setQueue: (queue: VocabularyDTO[]) => void;
  advanceQueue: () => void; // Specifically for "marking as mastered"
  setView: (view: View) => void;
  setIsReviewMode: (isReview: boolean) => void;
  setSelectedLevel: (level: number) => void;
  setSearchQuery: (query: string) => void;
  setWordsData: (data: VocabularyDTO[]) => void;
  setMasteredIds: (ids: number[]) => void;
  // Derived Logic (Getters)
  getDerivedStats: () => {
    totalLevels: number;
    levelWords: VocabularyDTO[];
    masteredInLevel: number;
    isLevelComplete: boolean;
    wordsPerLevel: number;
  };
}

export const useVocabularyStore = create<VocabularyState>((set, get) => ({
  queue: [],
  view: "library",
  isReviewMode: true,
  searchQuery: "",
  wordsData: [],
  masteredIds: [],
  selectedLevel: 1,
  wordsPerLevel: 10,

  setQueue: (queue) => set({ queue }),

  advanceQueue: () =>
    set((state) => ({
      queue: state.queue.slice(1),
    })),

  setView: (view) => set({ view }),

  setIsReviewMode: (isReviewMode) => set({ isReviewMode }),

  setSelectedLevel: (selectedLevel) => set({ selectedLevel }),

  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setWordsData: (wordsData) => set({ wordsData }),
  setMasteredIds: (masteredIds) => set({ masteredIds }),
  getDerivedStats: () => {
    const { wordsData, masteredIds, selectedLevel, wordsPerLevel } = get();

    const totalLevels = Math.ceil(wordsData.length / wordsPerLevel);

    const levelWords = wordsData.filter(
      (w) =>
        w.rank > (selectedLevel - 1) * wordsPerLevel &&
        w.rank <= selectedLevel * wordsPerLevel,
    );

    const masteredInLevel = levelWords.filter((w) =>
      masteredIds.includes(w.rank),
    ).length;

    const isLevelComplete =
      levelWords.length > 0 && masteredInLevel === levelWords.length;

    return {
      totalLevels,
      levelWords,
      masteredInLevel,
      isLevelComplete,
      wordsPerLevel,
    };
  },
}));

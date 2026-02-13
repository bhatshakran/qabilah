"use client";
import { useEffect, useEffectEvent } from "react";
import ProgressBar from "@/app/_components/progress_bar";
import { useUserProgress } from "@/app/hooks/useUserProgress";
import { useAuth } from "@/app/contexts/authContext";
import { useVocabularyStore } from "@/stores/vocabularyStore";
import ViewHandler from "@/app/_components/viewHandler";
import { VocabularyDTO } from "@/types/vocabulary";

export type View = "map" | "cards" | "library";
export const fetcher = <T,>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());

export default function FlashcardApp({
  wordsData,
}: {
  wordsData: VocabularyDTO[];
}) {
  const { user } = useAuth();
  const {
    view,
    setView,
    setIsReviewMode,
    setQueue,
    selectedLevel,
    getDerivedStats,
    setWordsData,
    setMasteredIds,
  } = useVocabularyStore();

  const { progress } = useUserProgress(user ? user.id : null);
  const masteredIds = progress?.mastered_words ?? [];
  const { wordsPerLevel } = getDerivedStats();

  // 3. SYNC: Push wordsData prop to store
  useEffect(() => {
    if (wordsData) setWordsData(wordsData);
  }, [wordsData, setWordsData]);
  // 4. SYNC: Push progress (mastered_words) to store
  useEffect(() => {
    if (progress?.mastered_words) {
      setMasteredIds(progress.mastered_words.map(Number));
    }
  }, [progress, setMasteredIds]);
  // --- Core Logic ---
  const setInitialState = useEffectEvent(() => {
    // If progress hasn't loaded yet, don't set the state
    if (!progress) return;

    const savedMastered = progress.mastered_words || [];

    // Ensure we compare strings to strings or numbers to numbers
    // MongoDB might return strings, but rank is a number
    const savedMasteredNumbers = savedMastered.map(Number);

    const allWordsInThisLevel = wordsData.filter(
      (w) =>
        w.rank > (selectedLevel - 1) * wordsPerLevel &&
        w.rank <= selectedLevel * wordsPerLevel,
    );
    const unmastered = allWordsInThisLevel.filter(
      (w) => !savedMasteredNumbers.includes(w.rank),
    );

    if (unmastered.length > 0) {
      setQueue(unmastered.slice(0, 10));
      setIsReviewMode(false);
    } else {
      setQueue(allWordsInThisLevel);
      setIsReviewMode(true);
    }
  });

  useEffect(() => {
    if (wordsData && progress) {
      setInitialState();
    }
  }, [selectedLevel, wordsData, progress]);

  if (!wordsData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center w-full">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex flex-col md:items-center w-full">
      <ProgressBar
        masteredCount={masteredIds.length}
        wordsAvailableCount={wordsData.length}
      />

      <ViewHandler />

      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 rounded-full flex gap-2 shadow-2xl">
        <button
          onClick={() => setView("map")}
          className={`px-6 py-2 cursor-pointer rounded-full text-xs font-black transition-all ${view === "map" ? "bg-amber-500 text-black" : "text-zinc-400"}`}
        >
          MAP
        </button>
        <button
          onClick={() => setView("cards")}
          className={`px-6 py-2 cursor-pointer rounded-full text-xs font-black transition-all ${view === "cards" ? "bg-amber-500 text-black" : "text-zinc-400"}`}
        >
          FLASHCARDS
        </button>
        <button
          onClick={() => setView("library")}
          className={`px-6 py-2 cursor-pointer rounded-full text-xs font-black transition-all ${view === "library" ? "bg-amber-500 text-black" : "text-zinc-400"}`}
        >
          LIBRARY
        </button>
      </div>
    </div>
  );
}

"use client";
import { useState, useEffect, useEffectEvent, useCallback } from "react";
import FrontSide from "./_components/frontside";
import Backside from "./_components/backside";
import ProgressBar from "./_components/progress_bar";
import Result from "./_components/result";
import LibraryView from "./_components/library_view";
import Map from "./_components/map";
import { VocabularyType } from "./models/vocabulary";
import useSWR from "swr";
import { preload } from "swr";
import { useUserProgress } from "./hooks/useUserProgress";
import { useAuth } from "./contexts/authContext";
import Flashcard from "./_components/flashcard";

export type View = "map" | "cards" | "library";
export const fetcher = <T,>(url: string): Promise<T> =>
  fetch(url).then((res) => res.json());
preload(`/api/vocabulary`, fetcher);

export default function FlashcardApp() {
  const { data: response, isLoading } = useSWR<{
    data: VocabularyType[];
    pagination: { total: number };
  }>("/api/vocabulary", fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
  });
  const { user } = useAuth();
  const wordsData = response?.data;
  // const totalCount = response?.pagination.total;
  const [isFlipped, setIsFlipped] = useState(false);
  // const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const [queue, setQueue] = useState<VocabularyType[]>([]);
  const [view, setView] = useState<View>("library");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const { progress, syncMastery } = useUserProgress(user?.userId);
  const masteredIds = progress?.mastered_words ?? [];
  const wordsPerLevel = 10;
  const currentWord = queue[0];

  // --- Core Logic ---
  const setInitialState = useEffectEvent((fetchedWords: VocabularyType[]) => {
    // If progress hasn't loaded yet, don't set the state
    console.log(progress, "progress");
    if (!progress) return;

    const savedMastered = progress.mastered_words || [];

    // Ensure we compare strings to strings or numbers to numbers
    // MongoDB might return strings, but rank is a number
    const savedMasteredNumbers = savedMastered.map(Number);

    const allWordsInThisLevel = fetchedWords.filter(
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
    if (wordsData) {
      setInitialState(wordsData);
    }
  }, [wordsData, progress, selectedLevel]);

  const markAsMastered = useCallback(
    (id: number) => {
      setIsFlipped(false);
      if (!isReviewMode) {
        // Logic is now on the server!
        syncMastery(id);
        setQueue((prev) => prev.slice(1));
      } else {
        setQueue((prev) => prev.slice(1));
      }
    },
    [isReviewMode, syncMastery],
  );

  // --- Event Handlers (Stay the same) ---
  const handleAgain = () => {
    setIsFlipped(false);
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first];
    });
  };

  const handleGood = () => {
    setIsFlipped(false);
    setQueue((prev) => prev.slice(1));
  };
  // Keyboard support remains same...
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord) return;
      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((v) => !v);
      }
      if (isFlipped) {
        if (e.key === "1") handleAgain();
        if (e.key === "2") handleGood();
        if (e.key === "3") markAsMastered(currentWord.rank);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentWord, markAsMastered]);

  if (isLoading || !wordsData) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center w-full">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  // --- Derived State  ---
  const totalLevels = Math.ceil(wordsData.length / wordsPerLevel);
  const levelWords = wordsData?.filter(
    (w) =>
      w.rank > (selectedLevel - 1) * wordsPerLevel &&
      w.rank <= selectedLevel * wordsPerLevel,
  );

  const masteredCount = masteredIds.length;
  const masteredInLevel = levelWords?.filter((w) =>
    masteredIds.includes(w.rank),
  ).length;
  const isLevelComplete =
    levelWords?.length > 0 && masteredInLevel === levelWords?.length;

  return (
    <div className="flex flex-col md:items-center w-full">
      <ProgressBar
        masteredCount={masteredCount}
        wordsAvailableCount={wordsData.length}
      />

      {view === "map" ? (
        <Map
          masteredIds={masteredIds}
          setSelectedLevel={setSelectedLevel}
          setView={setView}
          totalLevels={totalLevels}
          wordsData={wordsData}
          wordsPerLevel={wordsPerLevel}
        />
      ) : view === "library" ? ( // Note: Fixed case to match bottom nav
        <LibraryView
          masteredIds={masteredIds}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setView={setView}
          wordsData={wordsData}
        />
      ) : queue.length === 0 ? (
        <Result
          setView={setView}
          isLevelComplete={isLevelComplete}
          currentLevel={selectedLevel}
          totalLevels={totalLevels}
          onNextLevel={() => {
            setSelectedLevel((prev) => prev + 1);
          }}
        />
      ) : (
        <Flashcard
          currentWord={currentWord}
          handleAgain={handleAgain}
          handleGood={handleGood}
          isFlipped={isFlipped}
          isReviewMode={isReviewMode}
          markAsMastered={markAsMastered}
          setIsFlipped={setIsFlipped}
        />
      )}

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

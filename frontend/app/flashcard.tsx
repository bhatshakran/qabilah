"use client";
import { useState, useEffect, useEffectEvent } from "react";
import wordsData from "../public/words_seed.json";
import FrontSide from "./_components/frontside";
import Backside from "./_components/backside";
import ProgressBar from "./_components/progress_bar";
import Result from "./_components/result";
import Library from "./_components/library";
import Map from "./_components/map";
import { useStreak } from "./contexts/streakContext";
export interface CurrentWord {
  rank: number;
  arabic: string;
  english: string;
  transliteration: string;
  type: string;
  level: string;
  examples: {
    ar: string;
    en: string;
  }[];
}

export default function FlashcardApp() {
  const [isFlipped, setIsFlipped] = useState(false);
  const streakCtx = useStreak();
  const [masteredIds, setMasteredIds] = useState<number[]>([]);
  const masteredCount = masteredIds.length;
  const [queue, setQueue] = useState<typeof wordsData>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const currentWord = queue[0];
  const [view, setView] = useState("map"); // 'study' or 'library'
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState(1);
  const [isReviewMode, setIsReviewMode] = useState(false);
  const wordsPerLevel = 10;
  const totalLevels = Math.ceil(wordsData.length / wordsPerLevel);
  const levelWords = wordsData.filter(
    (w) =>
      w.rank > (selectedLevel - 1) * wordsPerLevel &&
      w.rank <= selectedLevel * wordsPerLevel,
  );

  const masteredInLevel = levelWords.filter((w) =>
    masteredIds.includes(w.rank),
  ).length;
  const isLevelComplete = masteredInLevel === levelWords.length;

  const setInitialState = useEffectEvent(() => {
    setIsLoaded(false); // Ensure we hide the UI while calculating

    const savedMastered = JSON.parse(
      localStorage.getItem("mastered_words") || "[]",
    );
    setMasteredIds(savedMastered);

    // 1. Get EVERY word that belongs to this level (don't filter mastery yet!)
    const allWordsInThisLevel = wordsData.filter(
      (w) =>
        w.rank > (selectedLevel - 1) * wordsPerLevel &&
        w.rank <= selectedLevel * wordsPerLevel,
    );

    // 2. Identify which of these are NOT mastered
    const unmastered = allWordsInThisLevel.filter(
      (w) => !savedMastered.includes(w.rank),
    );

    if (unmastered.length > 0) {
      // STUDY MODE: There are new words to learn
      // We only put the unmastered ones in the queue
      setQueue(unmastered.slice(0, 10));
      setIsReviewMode(false);
    } else {
      // REVIEW MODE: Level is already 100% complete
      // We load ALL words from the level so the queue isn't empty!
      setQueue(allWordsInThisLevel);
      setIsReviewMode(true);
    }

    setIsLoaded(true);
  });

  // 1. INITIAL LOAD: Run this only once on mount
  useEffect(() => {
    setInitialState();
  }, [selectedLevel]);

  // 2. CORE LOGIC FUNCTIONS
  const handleAgain = () => {
    setIsFlipped(false);
    setQueue((prev) => {
      const [first, ...rest] = prev;
      return [...rest, first]; // Move to back of queue
    });
  };
  const handleGood = () => {
    setIsFlipped(false);
    setQueue((prev) => prev.slice(1)); // Just remove from current session
  };

  const markAsMastered = (id: number) => {
    setIsFlipped(false);
    if (!isReviewMode) {
      const newMastered = [...masteredIds, id];
      setMasteredIds(newMastered);
      localStorage.setItem("mastered_words", JSON.stringify(newMastered));

      setQueue((prev) => prev.slice(1));

      const today = new Date().toISOString().split("T")[0];
      const lastDate = localStorage.getItem("last_study_date");

      if (lastDate !== today) {
        const newStreak = streakCtx.streak + 1;
        streakCtx.setStreak(newStreak);
        localStorage.setItem("streak_count", newStreak.toString());
        localStorage.setItem("last_study_date", today);
      }
    }
    // Just remove from queue and move on
    if (isReviewMode) {
      setQueue((prev) => prev.slice(1));
    }
  };

  // 3. KEYBOARD SUPPORT
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
  }, [isFlipped, currentWord]);

  // 4. SESSION COMPLETE STATE
  if (!isLoaded)
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen flex flex-col md:items-center w-full">
      {/* Progress Header */}
      <ProgressBar
        masteredCount={masteredCount}
        wordsAvailableCount={wordsData.length}
      />
      {view == "map" ? (
        <Map
          masteredIds={masteredIds}
          setSelectedLevel={setSelectedLevel}
          setView={setView}
          totalLevels={totalLevels}
          wordsData={wordsData}
          wordsPerLevel={wordsPerLevel}
        />
      ) : view == "library" ? (
        <Library
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
            setIsLoaded(false);
            setSelectedLevel((prev) => prev + 1);
          }}
        />
      ) : (
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full max-w-lg h-full max-h-[350px] cursor-pointer perspective-1000"
        >
          {isReviewMode && (
            <div className="mb-4 px-4 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full inline-block">
              <span className="text-blue-500 text-[10px] font-black uppercase tracking-widest text-center">
                Reviewing Mastered Words
              </span>
            </div>
          )}
          <div
            className={`relative w-full h-full min-h-[400px] transition-transform duration-500 transform-style-3d ${isFlipped ? "rotate-y-180" : ""}`}
          >
            {/* Front Side (Arabic) */}
            <FrontSide currentWord={currentWord} />

            {/* Back Side (English) */}
            <Backside
              handleGood={handleGood}
              handleAgain={handleAgain}
              markAsMastered={markAsMastered}
              currentWord={currentWord}
            />
          </div>
        </div>
      )}

      {/* Sidebar / Social Placeholder */}
      {/* <Sidebar /> */}
      {/* Bottom Navigation */}
      <div className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-2 rounded-full flex gap-2 shadow-2xl">
        <button
          onClick={() => setView("map")}
          className={`px-6 py-2 cursor-pointer rounded-full text-xs font-black transition-all ${view === "map" ? "bg-amber-500 text-black" : "text-zinc-400"}`}
        >
          MAP
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

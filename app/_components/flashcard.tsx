import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/authContext";
import { useSigninPopup } from "@/app/hooks/useSigninPopup";
import Backside from "@/app/_components/backside";
import FrontSide from "@/app/_components/frontside";
import { useUserProgress } from "@/app/hooks/useUserProgress";
import { useVocabularyStore } from "@/stores/vocabularyStore";

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { user } = useAuth();
  const { syncMastery } = useUserProgress(user ? user.id : null);
  const { isReviewMode, setQueue, queue } = useVocabularyStore();
  const currentWord = queue[0];
  const markAsMastered = (id: number) => {
    setIsFlipped(false);
    if (!isReviewMode) {
      // Logic is now on the server!
      syncMastery(id);
      setQueue(queue.slice(1));
    } else {
      setQueue(queue.slice(1));
    }
  };
  useSigninPopup(user);
  // --- Event Handlers (Stay the same) ---
  const handleAgain = () => {
    setIsFlipped(false);
    const [first, ...rest] = queue;
    const updatedQueue = [...rest, first];
    setQueue(updatedQueue);
  };

  const handleGood = () => {
    setIsFlipped(false);
    setQueue(queue.slice(1));
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
  return (
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
        <FrontSide currentWord={currentWord} />
        <Backside
          handleGood={handleGood}
          handleAgain={handleAgain}
          markAsMastered={markAsMastered}
          currentWord={currentWord}
        />
      </div>
    </div>
  );
};

export default Flashcard;

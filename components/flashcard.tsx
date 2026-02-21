import { useEffect, useState } from "react";
import { useAuth } from "@/app/contexts/authContext";
import { useSigninPopup } from "@/app/hooks/useSigninPopup";
import Backside from "@/components/backside";
import FrontSide from "@/components/frontside";
import { useUserProgress } from "@/app/hooks/useUserProgress";
import { useVocabularyStore } from "@/stores/vocabularyStore";

const Flashcard = () => {
  const [isFlipped, setIsFlipped] = useState(false);
  const { user } = useAuth();
  const { syncMastery } = useUserProgress(user ? user.id : null);
  const { setQueue, queue } = useVocabularyStore();

  useSigninPopup(user);

  const currentWord = queue[0];

  // --- The Unified Logic Handler ---
  const handleResponse = (action: "again" | "good" | "easy") => {
    if (!currentWord) return;
    setIsFlipped(false); // Reset flip for next card

    switch (action) {
      case "easy":
        // 1. Permanent Pass: Save to DB & remove from session
        syncMastery(currentWord.rank);
        break;

      case "good":
        // 2. Hesitant Pass: Move 3 cards back (Strict learning)
        const [firstG, ...restG] = queue;
        const insertIndex = Math.min(3, restG.length);
        const newQueueG = [
          ...restG.slice(0, insertIndex),
          firstG,
          ...restG.slice(insertIndex),
        ];
        setQueue(newQueueG);
        break;

      case "again":
        // 3. Fail: Move to the very back
        const [firstA, ...restA] = queue;
        setQueue([...restA, firstA]);
        break;
    }
  };

  // Keyboard Support
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!currentWord) return;

      if (e.code === "Space") {
        e.preventDefault();
        setIsFlipped((v) => !v);
      }

      if (isFlipped) {
        if (e.key === "1") handleResponse("again");
        if (e.key === "2") handleResponse("good");
        if (e.key === "3") handleResponse("easy");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFlipped, currentWord]);

  if (!currentWord) return null;

  return (
    <div className="relative w-full max-w-lg h-full max-h-[350px] perspective-1000">
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className={`relative w-full h-full min-h-[400px] transition-transform duration-500 transform-style-3d cursor-pointer ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        <FrontSide currentWord={currentWord} />
        <Backside
          // Pass the unified handler to the UI buttons
          handleAgain={() => handleResponse("again")}
          handleGood={() => handleResponse("good")}
          markAsMastered={() => handleResponse("easy")}
          currentWord={currentWord}
        />
      </div>
    </div>
  );
};

export default Flashcard;

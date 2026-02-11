import { useAuth } from "../contexts/authContext";
import { useSigninPopup } from "../hooks/useSigninPopup";
import { VocabularyType } from "../models/vocabulary";
import Backside from "./backside";
import FrontSide from "./frontside";

const Flashcard = ({
  setIsFlipped,
  isReviewMode,
  handleAgain,
  handleGood,
  markAsMastered,
  currentWord,
  isFlipped,
}: {
  setIsFlipped: (val: boolean) => void;
  isReviewMode: boolean;
  handleAgain: VoidFunction;
  handleGood: VoidFunction;
  markAsMastered: (id: number) => void;
  currentWord: VocabularyType;
  isFlipped: boolean;
}) => {
  const { user } = useAuth();
  useSigninPopup(user);
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

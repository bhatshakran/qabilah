import { View } from "../flashcard";

const Result = ({
  setView,
  isLevelComplete,
  currentLevel,
  onNextLevel,
  totalLevels,
}: {
  setView: (view: View) => void;
  isLevelComplete: boolean;
  currentLevel: number;
  onNextLevel: () => void;
  totalLevels: number;
}) => {
  // Logic: Are we at the literal end of the journey?
  const isGrandFinale = isLevelComplete && currentLevel === totalLevels;

  return (
    <div className="bg-zinc-950 text-white flex flex-col items-center justify-center p-6 text-center w-full max-w-md mx-auto animate-in fade-in zoom-in duration-500">
      {/* Dynamic Icon/Emoji Based on State */}
      <div className="relative mb-8">
        <div
          className={`absolute inset-0 blur-2xl opacity-20 animate-pulse ${isGrandFinale ? "bg-emerald-500" : "bg-amber-500"}`}
        ></div>
        <div className="relative w-24 h-24 bg-zinc-900 border-2 border-white/10 rounded-full flex items-center justify-center shadow-2xl">
          <span className="text-5xl">
            {isGrandFinale ? "👑" : isLevelComplete && "🔓"}
          </span>
        </div>
      </div>

      {/* Dynamic Heading */}
      <h1 className="text-4xl font-black mb-2 tracking-tight uppercase">
        {isGrandFinale
          ? "Tribe Legend!"
          : isLevelComplete && `Level ${currentLevel} Clear`}
      </h1>

      {/* Dynamic Description */}
      <p className="text-zinc-400 mb-10 font-medium leading-relaxed">
        {isGrandFinale
          ? "You have mastered all 5,000 words. You are now a master of the language and a legend of the Tribe."
          : isLevelComplete &&
            `You've conquered Level ${currentLevel}. The journey continues!`}
      </p>

      <div className="w-full space-y-4">
        {isGrandFinale ? (
          /* End of Journey Button */
          <button
            onClick={() => setView("library")}
            className="w-full py-5 bg-emerald-500 text-black font-black rounded-2xl transition-all active:scale-95 shadow-xl shadow-emerald-500/20"
          >
            BROWSE YOUR LIBRARY
          </button>
        ) : (
          isLevelComplete && (
            /* Move to Next Level */
            <button
              onClick={onNextLevel}
              className="w-full py-5 bg-amber-500 text-black font-black rounded-2xl transition-all active:scale-95 shadow-xl shadow-amber-500/20"
            >
              UNLOCK LEVEL {currentLevel + 1}
            </button>
          )
        )}

        <button
          onClick={() => setView("map")}
          className="w-full py-4 text-zinc-500 font-bold hover:text-white transition-colors flex items-center justify-center gap-2"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
          Back to Map
        </button>
      </div>
    </div>
  );
};

export default Result;

import { CurrentWord } from "../flashcard";

const Map = ({
  setView,
  totalLevels,
  wordsPerLevel,
  masteredIds,
  setSelectedLevel,
  wordsData,
}: {
  setView: (view: string) => void;
  totalLevels: number;
  wordsPerLevel: number;
  masteredIds: number[];
  setSelectedLevel: (level: number) => void;
  wordsData: CurrentWord[];
}) => {
  return (
    <div className="w-full mx-auto p-8 select-none ">
      {/* Grid Container */}
      <div className="grid grid-cols-4 gap-y-20 gap-x-4 relative">
        {Array.from({ length: totalLevels }, (_, i) => {
          const level = i + 1;

          // Data Calculation
          const levelWords = wordsData.filter(
            (w) =>
              w.rank > (level - 1) * wordsPerLevel &&
              w.rank <= level * wordsPerLevel,
          );
          const masteredCount = levelWords.filter((w) =>
            masteredIds.includes(w.rank),
          ).length;
          const progress = (masteredCount / wordsPerLevel) * 100;
          const isCompleted = progress === 100;

          // Lock Logic
          const isLocked =
            level > 1 &&
            (() => {
              const prevLevelMax = (level - 1) * wordsPerLevel;
              const prevWords = wordsData.filter(
                (w) =>
                  w.rank > (level - 2) * wordsPerLevel &&
                  w.rank <= prevLevelMax,
              );
              return prevWords.some((w) => !masteredIds.includes(w.rank));
            })();

          return (
            <div key={level} className="relative flex flex-col items-center">
              {/* Horizontal Connector Line (Only between items in the same row) */}
              {(i + 1) % 5 !== 0 && i !== totalLevels - 1 && (
                <div className="absolute top-1/2 left-[70%] w-full h-px bg-zinc-900 -z-10" />
              )}

              {/* Level Label */}
              <span
                className={`absolute -top-8 text-[9px] font-bold tracking-[0.2em] uppercase transition-colors ${isLocked ? "text-zinc-800" : "text-zinc-500"}`}
              >
                Lvl {level}
              </span>

              <button
                disabled={isLocked}
                onClick={() => {
                  setSelectedLevel(level);
                  setView("study");
                }}
                className={`
                  relative w-16 h-16 flex items-center justify-center transition-all duration-300
                  ${isLocked ? "cursor-not-allowed" : "cursor-pointer hover:scale-110 active:scale-95"}
                `}
              >
                {/* The Square/Diamond Node */}
                <div
                  className={`
                  w-10 h-10 flex items-center justify-center transition-all duration-500 border rotate-45
                  ${
                    isLocked
                      ? "bg-zinc-950 border-zinc-900 text-zinc-900"
                      : isCompleted
                        ? "bg-white border-white text-black shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                        : "bg-zinc-900 border-amber-500 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.1)]"
                  }
                `}
                >
                  <span className="text-xs font-black -rotate-45">
                    {isCompleted ? "✓" : level}
                  </span>
                </div>
              </button>

              {/* Progress Bar Underneath */}
              <div className="absolute -bottom-4 w-10 h-[2px] bg-zinc-900 rounded-full overflow-hidden">
                {!isLocked && !isCompleted && progress > 0 && (
                  <div
                    className="h-full bg-amber-500 transition-all duration-700"
                    style={{ width: `${progress}%` }}
                  />
                )}
                {isCompleted && <div className="h-full w-full bg-white" />}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Map;

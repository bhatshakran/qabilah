import { VocabularyDTO } from "@/types/vocabulary";

const Backside = ({
  currentWord,
  handleGood,
  handleAgain,
  markAsMastered,
}: {
  currentWord: VocabularyDTO;
  handleGood: () => void;
  handleAgain: () => void;
  markAsMastered: (rank: number) => void;
}) => {
  return (
    <div className="absolute overflow-hidden inset-0 bg-zinc-900 border border-amber-900/30 rounded-3xl flex flex-col items-center justify-center p-6 backface-hidden rotate-y-180 shadow-2xl">
      <span className="text-amber-500 text-sm mb-4">Definition</span>
      <p className="font-semibold text-xl text-center mb-2">
        {currentWord.english}
      </p>
      <p className="text-zinc-400 italic mb-6">[{currentWord.type}]</p>
      {/* Examples Section - Only renders if examples exist and have items */}
      {currentWord.examples && currentWord.examples.length > 0 ? (
        <div className="w-full bg-zinc-800/50 rounded-2xl p-4 border border-zinc-700/50">
          <p className="text-zinc-400 text-xs mb-2 uppercase font-bold tracking-tighter">
            Example Context
          </p>
          <div className="space-y-3">
            {currentWord.examples.map((ex, i) => (
              <div key={i} className="text-right">
                <p dir="rtl" className="text-xl text-amber-50 font-amiri mb-1">
                  {ex.ar}
                </p>
                <p
                  dir="ltr"
                  className="text-sm text-zinc-400 text-left border-l border-zinc-600 pl-2"
                >
                  {ex.en}
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center p-8 opacity-20">
          <div className="w-12 h-1 bg-zinc-700 rounded-full"></div>
          <p className="text-[10px] mt-2 italic">No context available yet</p>
        </div>
      )}
      {/* Action Buttons */}
      <div className="flex gap-3 w-full py-6 shrink-0">
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAgain();
          }}
          className="flex-1 py-4 cursor-pointer bg-zinc-900 hover:bg-red-950/30 text-red-500/80 hover:text-red-400 rounded-2xl border border-zinc-800 hover:border-red-900/50 transition-all active:scale-95 font-bold text-[10px] tracking-widest uppercase"
        >
          Again
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            handleGood();
          }}
          className="flex-1 py-4 cursor-pointer bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-2xl border border-zinc-800 transition-all active:scale-95 font-bold text-[10px] tracking-widest uppercase"
        >
          Good
        </button>

        <button
          onClick={(e) => {
            e.stopPropagation();
            markAsMastered(currentWord.rank);
          }}
          className="flex-1 py-4 cursor-pointer bg-amber-500 text-black rounded-2xl transition-all active:scale-95 font-bold text-[10px] tracking-widest uppercase shadow-[0_10px_20px_rgba(245,158,11,0.2)] hover:shadow-amber-500/40"
        >
          Easy
        </button>
      </div>
    </div>
  );
};

export default Backside;

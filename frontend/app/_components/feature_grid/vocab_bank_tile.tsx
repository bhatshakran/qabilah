const VocabBankTile = () => {
  return (
    <div className="md:col-span-2 relative bg-zinc-900 rounded-3xl p-8 border border-zinc-800 overflow-hidden group">
      {/* Soft neutral glow */}
      <div className="absolute -top-24 -right-24 w-[260px] h-[260px] bg-white/5 blur-[120px]" />

      {/* Header */}
      <div className="relative z-10 flex justify-between items-center mb-8">
        <div>
          <h3 className="text-3xl font-bold tracking-tight">Your Word Bank</h3>
          <p className="text-zinc-500 text-sm mt-1">
            Every word you’ve mastered — always one tap away.
          </p>
        </div>

        <span className="bg-zinc-800 border border-zinc-700 px-4 py-1.5 rounded-full text-xs text-zinc-400 tracking-wide">
          42 mastered
        </span>
      </div>

      {/* Words */}
      <div className="relative z-10 flex flex-wrap gap-3 max-w-[90%]">
        {["العلم", "السلام", "المستقبل", "التاريخ", "الثقافة", "المعرفة"].map(
          (word, i) => (
            <span
              key={word}
              className={`
            px-4 py-2 rounded-xl font-arabic text-lg cursor-default
            border transition-colors duration-300
            ${
              i % 3 === 0
                ? "bg-zinc-800 border-zinc-600 text-white"
                : "bg-zinc-850 border-zinc-700 text-zinc-200 hover:border-zinc-500"
            }
          `}
            >
              {word}
            </span>
          ),
        )}
      </div>

      {/* Continuation hint */}
      <div className="absolute bottom-6 right-8 text-zinc-600 text-sm tracking-widest uppercase">
        + hundreds more
      </div>
    </div>
  );
};

export default VocabBankTile;

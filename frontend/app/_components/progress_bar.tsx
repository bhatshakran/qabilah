const ProgressBar = ({
  masteredCount,
  wordsAvailableCount,
}: {
  masteredCount: number;
  wordsAvailableCount: number;
}) => {
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between text-sm mb-2 text-zinc-400">
        <span>Progress</span>
        <span>
          {masteredCount} / {wordsAvailableCount}
        </span>
      </div>
      <div className="h-1.5 w-full bg-zinc-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
        <div
          className="h-full bg-linear-to-r from-amber-600 via-amber-400 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)] transition-all duration-700 ease-out relative"
          style={{ width: `${(masteredCount / wordsAvailableCount) * 100}%` }}
        >
          {/* Animated shine effect */}
          <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent w-full animate-shimmer" />
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;

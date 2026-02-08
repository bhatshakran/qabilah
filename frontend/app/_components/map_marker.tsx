const MapMarker = ({
  level,
  isLocked,
  progress,
  onClick,
}: {
  level: number;
  isLocked: boolean;
  progress: number;
  onClick: () => void;
}) => {
  // SVG Circle Math
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col items-center transition-all duration-300 ${isLocked ? 'cursor-not-allowed opacity-60' : 'cursor-pointer hover:scale-110 active:scale-95'}`}
    >
      <div className="relative w-20 h-20 flex items-center justify-center">
        {/* Progress Ring Background */}
        <svg className="absolute inset-0 w-full h-full -rotate-90">
          <circle
            cx="40"
            cy="40"
            r={radius}
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="4"
            fill="transparent"
          />
          {/* Active Progress Ring */}
          {!isLocked && (
            <circle
              cx="40"
              cy="40"
              r={radius}
              stroke={progress === 100 ? '#10b981' : '#f59e0b'}
              strokeWidth="4"
              fill="transparent"
              strokeDasharray={circumference}
              style={{
                strokeDashoffset: offset,
                transition: 'stroke-dashoffset 0.5s ease-out',
              }}
              strokeLinecap="round"
            />
          )}
        </svg>

        {/* The Level Bubble */}
        <div
          className={`
            w-14 h-14 rounded-full flex items-center justify-center font-black text-xl z-10
            ${
              isLocked
                ? 'bg-zinc-800 text-zinc-600 border-2 border-zinc-700'
                : progress === 100
                  ? 'bg-emerald-500 text-emerald-950 shadow-[0_0_20px_rgba(16,185,129,0.3)]'
                  : 'bg-zinc-900 text-amber-500 border-2 border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)]'
            }
          `}
        >
          {isLocked ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            level
          )}
        </div>
      </div>

      {/* Label */}
      <span
        className={`mt-2 text-[10px] font-black tracking-[0.2em] uppercase ${isLocked ? 'text-zinc-700' : 'text-zinc-400'}`}
      >
        Level {level}
      </span>
    </div>
  );
};

export default MapMarker;

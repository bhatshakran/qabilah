const MapTile = () => {
  return (
    <div className="relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 overflow-hidden flex flex-col gap-8">
      {/* Header */}
      <div className="max-w-[60%]">
        <h3 className="text-3xl font-bold mb-2 tracking-tight">The Map</h3>
        <p className="text-zinc-400 text-sm leading-relaxed">
          A spatial curriculum that unlocks as you master words.
        </p>
      </div>

      {/* Framed Map Preview */}
      <div className="relative bg-zinc-850 border border-zinc-800 rounded-2xl p-6 shadow-lg">
        {/* Soft vignette */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent rounded-2xl" />

        {/* Mini Grid */}
        <div className="grid grid-cols-5 gap-y-10 gap-x-4 pb-6">
          {Array.from({ length: 12 }).map((_, i) => {
            const state =
              i === 0 || i === 1
                ? "completed"
                : i === 2
                  ? "active"
                  : i > 6
                    ? "locked"
                    : "idle";

            return (
              <div key={i} className="relative flex flex-col items-center">
                {/* Connector */}
                {i % 5 !== 4 && (
                  <div className="absolute top-1/2 left-[70%] w-full h-px bg-zinc-800" />
                )}

                {/* Node */}
                <div
                  className={`
                w-8 h-8 rotate-45 border flex items-center justify-center
                ${
                  state === "completed"
                    ? "bg-white border-white text-black"
                    : state === "active"
                      ? "bg-zinc-900 border-amber-400 text-amber-400"
                      : state === "locked"
                        ? "bg-zinc-900 border-zinc-800 text-zinc-700"
                        : "bg-zinc-900 border-zinc-700 text-zinc-400"
                }
              `}
                >
                  <span className="-rotate-45 text-[9px] font-bold">
                    {state === "completed" ? "✓" : i + 1}
                  </span>
                </div>

                {/* Progress */}
                <div className="absolute -bottom-4 w-8 h-[2px] bg-zinc-800 rounded-full overflow-hidden">
                  {state === "active" && (
                    <div className="h-full w-1/2 bg-amber-400" />
                  )}
                  {state === "completed" && (
                    <div className="h-full w-full bg-white" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Neutral light wash */}
      <div className="pointer-events-none absolute -top-24 right-0 w-[260px] h-[260px] bg-white/5 blur-[140px]" />
    </div>
  );
};

export default MapTile;

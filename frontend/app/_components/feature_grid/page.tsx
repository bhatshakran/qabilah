const FeatureGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-[300px]">
      {/* 1. Translation Popover Snapshot */}
      <div className="md:col-span-2 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 overflow-hidden relative group">
        {/* Copy */}
        <div className="max-w-[60%] relative z-10">
          <h3 className="text-3xl font-bold mb-3 tracking-tight">
            Smart Popover
          </h3>
          <p className="text-zinc-400 leading-relaxed">
            Tap any word to instantly reveal AI-powered roots, grammar,
            pronunciation, and contextual translations.
          </p>
        </div>

        {/* Floating Popover Mock */}
        <div className="absolute right-6 bottom-6 translate-y-6 rotate-[-6deg] group-hover:rotate-0 group-hover:translate-y-0 transition-all duration-500 ease-out">
          <div className="relative bg-white/95 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-2xl rounded-2xl p-5 w-[260px] backdrop-blur">
            {/* Header */}
            <div className="flex justify-between items-start mb-3">
              <div>
                <p className="text-2xl font-bold text-emerald-500 font-arabic">
                  يَتَمَيَّزُ
                </p>
                <p className="text-[10px] uppercase tracking-widest text-zinc-400">
                  Verb • Root م – ي – ز
                </p>
              </div>
              <div className="w-6 h-6 rounded-full bg-zinc-100 dark:bg-zinc-800" />
            </div>

            {/* Meaning */}
            <div className="mb-4">
              <p className="text-xs uppercase tracking-widest text-zinc-400 font-semibold mb-1">
                Meaning
              </p>
              <p className="text-lg text-zinc-900 dark:text-zinc-100">
                To stand out; to be distinguished.
              </p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-zinc-100 dark:border-zinc-800">
              <div className="flex-1 py-2 rounded-lg bg-emerald-100/70 dark:bg-emerald-900/30 text-emerald-600 text-sm font-medium text-center">
                Save
              </div>
              <div className="w-9 h-9 rounded-lg bg-zinc-100 dark:bg-zinc-800" />
            </div>

            {/* Arrow */}
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />
          </div>
        </div>

        {/* Glow Accent */}
        <div className="absolute right-0 bottom-0 w-[300px] h-[300px] bg-emerald-500/10 blur-[120px] rounded-full" />
      </div>

      {/* 2. Audio/Voice Snapshot */}
      <div className="relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col justify-between overflow-hidden group">
        {/* Glow */}
        <div className="absolute -top-24 -right-24 w-[300px] h-[300px] bg-amber-500/20 blur-[120px] rounded-full" />

        {/* Header */}
        <h3 className="relative z-10 text-3xl font-bold leading-tight">
          Native <br />
          Audio Sync
        </h3>

        {/* Card Preview */}
        <div className="relative mt-6 bg-zinc-900 border border-zinc-800 rounded-3xl p-6 shadow-2xl">
          {/* Listen Button */}
          <div className="absolute -top-5 -right-5">
            <div className="p-3 rounded-full bg-zinc-800 text-amber-500 shadow-lg ring-1 ring-amber-500/30 group-hover:scale-105 transition">
              ▶
            </div>
          </div>

          {/* Language */}
          <span className="block text-zinc-500 text-xs mb-3 tracking-wide">
            Arabic
          </span>

          {/* Arabic Word */}
          <h1
            dir="rtl"
            className="text-5xl font-bold font-amiri text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.6)] mb-2"
          >
            يَتَمَيَّزُ
          </h1>

          {/* Transliteration */}
          <p className="text-zinc-400 text-sm italic tracking-wide mb-4">
            yatamay-yazu
          </p>

          {/* Fake Progress Bar */}
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div className="h-full w-2/5 bg-linear-to-r from-amber-400 to-amber-500 animate-pulse" />
          </div>
        </div>

        {/* Ambient grid */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] bg-size-[24px_24px]" />
      </div>

      {/* 3. Interactive Map Snapshot */}
      {/* 3. Interactive Map Snapshot */}
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

      {/* 4. Vocab Bank Snapshot */}
      {/* 4. Vocab Bank Snapshot */}
      <div className="md:col-span-2 relative bg-zinc-900 rounded-3xl p-8 border border-zinc-800 overflow-hidden group">
        {/* Soft neutral glow */}
        <div className="absolute -top-24 -right-24 w-[260px] h-[260px] bg-white/5 blur-[120px]" />

        {/* Header */}
        <div className="relative z-10 flex justify-between items-center mb-8">
          <div>
            <h3 className="text-3xl font-bold tracking-tight">
              Your Word Bank
            </h3>
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
    </div>
  );
};

export default FeatureGrid;

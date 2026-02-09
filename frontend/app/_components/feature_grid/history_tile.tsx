const HistoryTile = () => {
  return (
    <div className="col-span-2 lg:col-span-1 relative bg-zinc-900 border border-zinc-800 rounded-3xl p-8 h-auto group flex flex-col overflow-hidden justify-between">
      {/* Soft Emerald Wash */}
      <div className="absolute -top-32 -left-32 w-[340px] h-[340px] bg-emerald-700/10 blur-[140px] rounded-full" />

      {/* Header */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-3xl font-bold tracking-tight mb-2">
            Living History
          </h3>
          {/* Enlarged Flag */}
          <div className="flex flex-col w-7 h-5 rounded-sm overflow-hidden border border-zinc-600 shadow-sm">
            <div className="h-1/3 bg-black" />
            <div className="h-1/3 bg-white relative">
              <div className="absolute left-0 top-0 h-full w-3 bg-red-600 [clip-path:polygon(0_0,100%_50%,0_100%)]" />
            </div>
            <div className="h-1/3 bg-emerald-600" />
          </div>
        </div>

        <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
          Explore the profound narratives of resistance, memory, and heritage.
        </p>
      </div>

      {/* Snapshot */}
      <div className="relative mt-3 rounded-2xl border border-zinc-800 px-6 py-3 bg-zinc-950/60 backdrop-blur-sm group-hover:bg-zinc-950/80 transition-colors">
        <div className="flex flex-col gap-1" dir="rtl">
          <p className="text-xl font-amiri text-zinc-200 leading-relaxed">
            تَجْذُرُ{" "}
            <span className="text-emerald-500">أَشْجَارُ الزَّيْتُونِ</span> فِي
            هَذِهِ الأَرْضِ، كَمَا يَجْذُرُ التَّارِيخُ فِي أَرْوَاحِنَا.
          </p>

          <div className="w-10 h-1 bg-emerald-500/50" />

          <p
            className="text-[11px] text-zinc-500 font-medium italic leading-relaxed"
            dir="ltr"
          >
            &ldquo;The olive trees are rooted in this land, just as history is
            rooted in our souls.&ldquo;
          </p>
        </div>
      </div>
    </div>
  );
};

export default HistoryTile;

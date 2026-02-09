const PoetryTile = () => {
  return (
    <div className="md:col-span-2 relative bg-zinc-950 border border-zinc-800 rounded-3xl p-8 overflow-hidden group">
      <div className="absolute -bottom-24 -right-24 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full" />

      <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center h-full">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
            <p className="text-[10px] uppercase tracking-[0.2em] text-blue-400 font-semibold">
              Master the Eloquence
            </p>
          </div>
          <h3 className="text-4xl font-bold tracking-tight mb-4">
            Classical Poetry
          </h3>
          <p className="text-zinc-400 leading-relaxed max-w-[280px]">
            Unpack the rhythmic complexity and deep metaphors of the Arab
            world&apos;s greatest literary tradition.
          </p>
        </div>

        <div className="flex-[1.2] w-full relative">
          <div className="relative bg-zinc-900/80 backdrop-blur-md border border-zinc-800 rounded-2xl p-6 transition-all duration-500 group-hover:border-blue-500/40">
            <div className="absolute -top-3 left-6 px-3 py-1 bg-zinc-800 border border-zinc-700 rounded-full text-[10px] font-bold text-zinc-400 uppercase tracking-wider z-20">
              Snippet: Al-Mutanabbi
            </div>

            <div className="flex flex-col gap-4 mt-2" dir="rtl">
              <p className="text-2xl lg:text-3xl font-amiri text-zinc-100 leading-snug border-r-2 border-blue-500/30 pr-4">
                الخَيْلُ وَاللّيْلُ وَالبَيْداءُ تَعرِفُني
              </p>
              <p className="text-2xl lg:text-3xl font-amiri text-blue-400/90 leading-snug mr-8">
                وَالسّيفُ وَالرّمحُ وَالقِرْطاسُ وَالقَلَمُ
              </p>
              <div className="pt-4 border-t border-zinc-800/50" dir="ltr">
                <p className="text-[10px] text-zinc-600 uppercase tracking-tighter mb-1 font-semibold">
                  Interactive Verse
                </p>
                <p className="text-xs text-zinc-500 italic">
                  Tap to analyze meter, roots, and rhetorical devices.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoetryTile;

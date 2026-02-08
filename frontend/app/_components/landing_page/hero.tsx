import Link from "next/link";

function Hero() {
  return (
    <section className="relative pt-32 pb-20 px-6 overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-amber-500/10 blur-[120px] rounded-full -z-10" />

      <div className="max-w-4xl mx-auto text-center">
        <div className="inline-block px-4 py-1.5 mb-6 rounded-full border border-amber-500/20 bg-amber-500/5 text-amber-500 text-[10px] font-black uppercase tracking-[0.2em]">
          The Future of Arabic Literacy
        </div>

        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
          READ. DISCUSS. <br />
          <span className="text-amber-500 italic">BELONG.</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Join the <span className="text-white font-bold italic">Qabilah</span>.
          A collective of modern learners mastering Arabic through real-world
          news, history, and collaborative study.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/library"
            className="w-full sm:w-auto px-8 py-4 bg-amber-500 text-black font-black uppercase tracking-tighter rounded-2xl hover:scale-105 transition-transform"
          >
            Enter the Library
          </Link>
          <Link
            href="/auth/signup"
            className="w-full sm:w-auto px-8 py-4 bg-zinc-900 border border-zinc-800 text-white font-black uppercase tracking-tighter rounded-2xl hover:bg-zinc-800 transition-colors"
          >
            Join the Tribe
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;

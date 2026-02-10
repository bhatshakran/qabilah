const Footer = () => {
  return (
    <footer className="relative mt-32 border-t border-zinc-800 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
        {/* Brand Lockup */}
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="relative w-10 h-10 flex items-center justify-center">
            <div className="absolute inset-0 bg-amber-500 rounded-xl rotate-12 opacity-20" />
            <div className="relative w-8 h-8 bg-linear-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-black font-black text-xl tracking-tighter">
                Q
              </span>
            </div>
          </div>

          <div>
            <h2 className="text-lg font-black tracking-tighter text-white leading-none">
              QABILAH
            </h2>
            <p className="text-[10px] text-amber-500/80 font-bold tracking-[0.2em] uppercase">
              The Tribe
            </p>
          </div>
        </div>

        {/* Motto */}
        <p className="max-w-sm text-sm text-zinc-400 leading-relaxed">
          Learn Arabic through mastery systems, spatial memory, and ritual-like
          daily practice.
        </p>

        {/* Legal / Contact */}
        <div className="flex items-center gap-8 text-[11px] font-bold tracking-widest uppercase text-zinc-500">
          <a href="#" className="hover:text-white transition-colors">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Terms
          </a>
          <a href="#" className="hover:text-white transition-colors">
            Contact
          </a>
        </div>
      </div>

      {/* Accent Line */}
      <div className="h-px bg-linear-to-r from-transparent via-amber-500/40 to-transparent" />
    </footer>
  );
};

export default Footer;

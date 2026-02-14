export default function BetaHeader() {
  return (
    <div className="w-full bg-zinc-950 border-b border-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-center text-xs sm:text-sm text-zinc-400">
        <span className="opacity-80">Qabilah is currently in beta.</span>

        <a
          href="https://forms.gle/1hzwfvxvf6vs8wDbA"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-2 text-amber-500 hover:text-amber-400 font-medium transition-colors"
        >
          Share feedback →
        </a>
      </div>
    </div>
  );
}

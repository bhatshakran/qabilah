export interface ReaderSettings {
  fontSize: number;
  fontFamily: string;
  theme: "dark" | "light" | "sepia";
  showEnglish: boolean;
}
interface SettingsPaneProps {
  isOpen: boolean;
  onClose: () => void;
  settings: ReaderSettings;
  updateSettings: (newSettings: Partial<ReaderSettings>) => void;
}

export default function SettingsPane({
  isOpen,
  onClose,
  settings,
  updateSettings,
}: SettingsPaneProps) {
  const themes = {
    dark: "bg-zinc-900 text-zinc-100",
    light: "bg-white text-zinc-900",
    sepia: "bg-[#f4ecd8] text-[#5b4636]",
  };

  return (
    <>
      {/* Overlay/Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed inset-y-0 h-dvh right-0 w-80 bg-zinc-900 border-l border-zinc-800 z-50 transform transition-transform duration-300 ease-in-out p-6 shadow-2xl ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-bold text-white">Reader Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-zinc-800 rounded-full text-zinc-400"
          >
            ✕
          </button>
        </div>

        <div className="space-y-10">
          {/* Font Size */}
          <section>
            <div className="flex justify-between mb-3">
              <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold">
                Text Size
              </label>
              <span className="text-xs text-amber-500">
                {settings.fontSize}px
              </span>
            </div>
            <input
              type="range"
              min="16"
              max="42"
              value={settings.fontSize}
              onChange={(e) =>
                updateSettings({ fontSize: parseInt(e.target.value) })
              }
              className="w-full h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </section>

          {/* Theme Selector */}
          <section>
            <label className="text-xs uppercase tracking-widest text-zinc-500 font-bold mb-4 block">
              Background
            </label>
            <div className="grid grid-cols-3 gap-3">
              {(["dark", "light", "sepia"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => updateSettings({ theme: t })}
                  className={`h-12 rounded-lg border-2 transition-all ${themes[t]} ${
                    settings.theme === t
                      ? "border-amber-500 scale-105"
                      : "border-zinc-800 hover:border-zinc-600"
                  }`}
                >
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>
          </section>

          {/* English Toggle */}
          <section className="flex justify-between items-center pt-4 border-t border-zinc-800">
            <span className="text-sm text-zinc-300 font-medium">
              Show Translation
            </span>
            <button
              onClick={() =>
                updateSettings({ showEnglish: !settings.showEnglish })
              }
              className={`w-12 h-6 rounded-full transition-colors relative ${settings.showEnglish ? "bg-emerald-500" : "bg-zinc-700"}`}
            >
              <div
                className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${settings.showEnglish ? "left-7" : "left-1"}`}
              />
            </button>
          </section>
        </div>
      </div>
    </>
  );
}

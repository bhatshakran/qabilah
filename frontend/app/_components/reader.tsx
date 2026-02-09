"use client";

import { useEffect, useState } from "react";
import SettingsPane, { ReaderSettings } from "./settings_pane";
import { Article, Sentence, Token } from "./article_list";
import WordPopover from "./word_popover";
import { createPortal } from "react-dom";
import { BookOpen, MessageSquare } from "lucide-react";
import ArticleSidebar from "./article_sidebar";

export default function Reader({ article }: { article: Article }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTokenKey, setSelectedTokenKey] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<"notebook" | "halaqa">("notebook");
  const [popoverData, setPopoverData] = useState<{
    word: string;
    pos: { top: number; left: number };
  } | null>(null);

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 24,
    fontFamily: "amiri",
    theme: "dark",
    showEnglish: true,
  });
  console.log(article, "article");

  const updateSettings = (newFields: Partial<ReaderSettings>) => {
    setSettings((prev) => ({ ...prev, ...newFields }));
  };

  const themeClasses = {
    dark: "bg-zinc-950 text-zinc-100",
    light: "bg-zinc-50 text-zinc-900",
    sepia: "bg-[#f4ecd8] text-[#5b4636]",
  };

  const handleTokenClick = (
    e: React.MouseEvent,
    token: Token,
    sentence: Sentence,
  ) => {
    const rect = e.currentTarget.getBoundingClientRect(); // Target the span specifically

    setPopoverData({
      word: token.surface,
      pos: {
        // rect.top is the distance from the top of the visible screen
        top: rect.top,
        // rect.left is the distance from the left of the visible screen
        left: rect.left + rect.width / 2,
      },
    });
    setSelectedTokenKey((prev) =>
      prev == `${sentence.id}-${token.index}`
        ? null
        : `${sentence.id}-${token.index}`,
    );
  };
  useEffect(() => {
    const handleScroll = () => {
      if (popoverData) setPopoverData(null);
    };

    window.addEventListener("scroll", handleScroll, true); // Use capture phase
    return () => window.removeEventListener("scroll", handleScroll, true);
  }, [popoverData]);

  return (
    <div
      className={`w-full max-w-4xl relative mx-auto mt-6 space-y-10 pb-40 px-4 transition-colors duration-500 ${themeClasses[settings.theme]}`}
    >
      <ArticleSidebar
        sentenceIndex={activeBlock}
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
        }}
        tab={tab}
        slug={article.slug}
        setTab={setTab}
      />
      {popoverData &&
        createPortal(
          <WordPopover
            word={popoverData.word}
            position={popoverData.pos}
            onClose={() => {
              setPopoverData(null);
              setSelectedTokenKey(null);
            }}
            onSave={(w) => console.log("Saving word:", w)}
          />,
          document.body,
        )}
      <SettingsPane
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
      />
      <header className="sticky top-0 z-10 w-full bg-zinc-950 border-b border-zinc-800 py-4">
        <div className="w-full flex items-center">
          {/* Left Section: Command Cluster */}
          <div className="flex items-center gap-4 justify-between grow">
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="group flex items-center justify-center w-10 h-10 
             rounded-lg border border-zinc-800 bg-zinc-900 
             text-zinc-500 hover:text-white hover:border-zinc-600 
             hover:bg-zinc-800 transition-all duration-200 
             active:scale-95 shadow-lg"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
                <circle cx="12" cy="12" r="3" />
              </svg>
            </button>

            {/* Chapter Indicator */}
            <div className="hidden sm:flex flex-col pl-6">
              <h1
                dir="rtl"
                className="text-lg md:text-xl font-amiri font-bold text-amber-500 tracking-wide text-right"
              >
                {article.title}
              </h1>
              <span className="font-medium text-xl truncate text-wrap">
                {article.subtitle}
              </span>
            </div>
          </div>

          {/* Exit Action */}
          <div className="flex items-center pl-4 border-zinc-800">
            <button
              className="p-2 text-zinc-600 hover:text-zinc-100 transition-colors group"
              onClick={() => window.history.back()}
              aria-label="Back to Map"
            >
              <span className="text-[10px] uppercase tracking-widest font-bold mr-2 hidden md:inline-block opacity-80 group-hover:opacity-100 transition-opacity">
                Exit Reader
              </span>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="inline-block"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>

        {/* Solid Industrial Progress Bar */}
        <div className="absolute bottom-0 left-0 h-[3px] bg-zinc-900 w-full">
          <div
            className="h-full bg-amber-600 transition-all duration-500 ease-out shadow-[0_0_12px_rgba(217,119,6,0.4)]"
            style={{ width: "42%" }}
          />
        </div>
      </header>

      {/* ---------- ARTICLE BODY ---------- */}
      <div className="space-y-12">
        {article.paragraphs.map((p) => (
          <div key={p.paragraphIndex} className="space-y-8">
            {p.sentences.map((s) => (
              <div
                key={s.sentenceIndex}
                className={`transition-opacity duration-300 ${
                  selectedTokenKey && !selectedTokenKey.startsWith(s.id)
                    ? "opacity-40"
                    : "opacity-100"
                }`}
              >
                {/* Sidebar Indicators */}
                <div className="flex flex-col gap-1 w-6 pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setActiveBlock(s.sentenceIndex);
                      setSidebarOpen(true);
                      setTab("halaqa");
                    }}
                    className="p-1 hover:text-amber-500 text-zinc-700 transition-colors"
                  >
                    <MessageSquare size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveBlock(s.sentenceIndex);
                      setSidebarOpen(true);
                      setTab("notebook");
                    }}
                    className="p-1 hover:text-amber-500 text-zinc-700 transition-colors"
                  >
                    <BookOpen size={14} />
                  </button>
                </div>
                {/* Arabic */}
                <div
                  dir="rtl"
                  style={{ fontSize: `${settings.fontSize}px` }}
                  className="text-right leading-[2.5] font-medium flex flex-wrap gap-x-2"
                >
                  {s.tokens.map((t) => (
                    <div id="popover-element" key={`${t.index}-${s.id}`}>
                      <span
                        onClick={(e) => {
                          handleTokenClick(e, t, s);
                        }}
                        className={`cursor-pointer rounded transition-all ${
                          selectedTokenKey === `${s.id}-${t.index}`
                            ? "bg-emerald-500/30 text-emerald-400 ring-1 ring-emerald-500/50"
                            : "hover:text-emerald-400"
                        }`}
                      >
                        {t.surface}
                      </span>
                    </div>
                  ))}
                </div>

                {/* English - Toggleable */}
                {s.en && settings.showEnglish && (
                  <div className="mt-4 text-sm text-zinc-500 border-l-2 border-zinc-800 pl-4 py-1 italic">
                    {s.en}
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

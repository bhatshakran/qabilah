'use client';

import { useEffect, useState } from 'react';
import SettingsPane, { ReaderSettings } from './settings_pane';
import { Article, Sentence, Token } from './article_list';
import WordPopover from './word_popover';
import { createPortal } from 'react-dom';
import { BookOpen, MessageSquare } from 'lucide-react';
import ArticleSidebar from './article_sidebar';

export default function Reader({ article }: { article: Article }) {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedTokenKey, setSelectedTokenKey] = useState<string | null>(null);
  const [activeBlock, setActiveBlock] = useState<number | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState<'notebook' | 'halaqa'>('notebook');
  const [popoverData, setPopoverData] = useState<{
    word: string;
    pos: { top: number; left: number };
  } | null>(null);

  const [settings, setSettings] = useState<ReaderSettings>({
    fontSize: 24,
    fontFamily: 'amiri',
    theme: 'dark',
    showEnglish: true,
  });

  const updateSettings = (newFields: Partial<ReaderSettings>) => {
    setSettings((prev) => ({ ...prev, ...newFields }));
  };

  const themeClasses = {
    dark: 'bg-zinc-950 text-zinc-100',
    light: 'bg-zinc-50 text-zinc-900',
    sepia: 'bg-[#f4ecd8] text-[#5b4636]',
  };

  const handleTokenClick = (
    e: React.MouseEvent,
    token: Token,
    sentence: Sentence
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
        : `${sentence.id}-${token.index}`
    );
  };
  useEffect(() => {
    const handleScroll = () => {
      if (popoverData) setPopoverData(null);
    };

    window.addEventListener('scroll', handleScroll, true); // Use capture phase
    return () => window.removeEventListener('scroll', handleScroll, true);
  }, [popoverData]);

  return (
    <div
      className={`w-full max-w-2xl relative mx-auto mt-6 space-y-10 pb-40 px-4 transition-colors duration-500 ${themeClasses[settings.theme]}`}
    >
      <ArticleSidebar
        sentenceIndex={activeBlock}
        isOpen={sidebarOpen}
        onClose={() => {
          setSidebarOpen(false);
        }}
        tab={tab}
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
            onSave={(w) => console.log('Saving word:', w)}
          />,
          document.body
        )}
      <SettingsPane
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        settings={settings}
        updateSettings={updateSettings}
      />
      <header className="sticky top-0 z-30 w-full border-b border-zinc-800 backdrop-blur-md px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          {/* Settings Button - Now feels like a real interactive element */}
          <button
            onClick={() => setIsSettingsOpen(true)}
            className="group relative flex items-center justify-center w-12 h-12 
                 rounded-xl border border-zinc-800 bg-zinc-900 
                 text-zinc-400 hover:text-amber-400 hover:border-amber-500/50 
                 hover:bg-zinc-800 active:scale-95 transition-all duration-200 
                 shadow-sm hover:shadow-amber-500/10"
            aria-label="Settings"
          >
            <span className="text-2xl transition-transform group-hover:rotate-45 duration-300">
              ⚙️
            </span>
          </button>

          {/* Headline - Balanced and aligned */}
          <h1
            dir="rtl"
            className="flex-1 text-xl md:text-2xl font-black text-amber-400 leading-tight text-right"
          >
            {article.title}
          </h1>
        </div>
      </header>

      {/* ---------- ARTICLE BODY ---------- */}
      <div className="space-y-12">
        {article.paragraphs.map((p) => (
          <div key={p.paragraphIndex} className="space-y-8">
            {p.sentences.map((s) => (
              <div
                key={s.id}
                className={`transition-opacity duration-300 ${
                  selectedTokenKey && !selectedTokenKey.startsWith(s.id)
                    ? 'opacity-40'
                    : 'opacity-100'
                }`}
              >
                {/* Sidebar Indicators */}
                <div className="flex flex-col gap-1 w-6 pt-1 opacity-50 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => {
                      setActiveBlock(s.sentenceIndex);
                      setSidebarOpen(true);
                      setTab('halaqa');
                    }}
                    className="p-1 hover:text-amber-500 text-zinc-700 transition-colors"
                  >
                    <MessageSquare size={14} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveBlock(s.sentenceIndex);
                      setSidebarOpen(true);
                      setTab('notebook');
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
                    <div id="popover-element" key={t.index}>
                      <span
                        onClick={(e) => {
                          handleTokenClick(e, t, s);
                        }}
                        className={`cursor-pointer rounded transition-all ${
                          selectedTokenKey === `${s.id}-${t.index}`
                            ? 'bg-emerald-500/30 text-emerald-400 ring-1 ring-emerald-500/50'
                            : 'hover:text-emerald-400'
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

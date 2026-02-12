import { useState } from "react";
import ArticleList from "./article_list";
import { VocabularyType } from "../models/vocabulary";
import { View } from "../flashcards";
import { useVocabularyStore } from "@/stores/vocabularyStore";

const VocabLibrary = ({
  wordsData,
  searchQuery,
  masteredIds,
  setSearchQuery,
}: {
  wordsData: VocabularyType[];
  searchQuery: string;
  masteredIds: number[];
  setSearchQuery: (q: string) => void;
}) => {
  return (
    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Search Bar */}
      <div className="relative mb-6">
        <input
          type="text"
          placeholder="Search Arabic or English..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-amber-500 transition-colors"
        />
      </div>

      {/* Scrollable List */}
      <div className="space-y-3 h-[60vh] overflow-y-auto pr-2 scrollbar-hide">
        {wordsData
          .filter(
            (w) =>
              w.arabic.includes(searchQuery) ||
              w.english.toLowerCase().includes(searchQuery.toLowerCase()),
          )
          .map((word) => {
            const isMastered = masteredIds.includes(word.rank);
            return (
              <div
                key={word.rank}
                className={`p-4 rounded-2xl border flex items-center justify-between transition-all ${
                  isMastered
                    ? "bg-amber-500/5 border-amber-500/20"
                    : "bg-zinc-900 border-zinc-800"
                }`}
              >
                <div className="flex flex-col">
                  <span className="text-zinc-500 text-[10px] font-bold">
                    #{word.rank}
                  </span>
                  <span className="text-lg font-bold text-white">
                    {word.english}
                  </span>
                  <span className="text-xs text-zinc-500 uppercase">
                    {word.type}
                  </span>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span
                    dir="rtl"
                    className="text-2xl font-amiri text-white mb-1"
                  >
                    {word.arabic}
                  </span>
                  {isMastered && (
                    <span className="text-[10px] bg-amber-500 text-black px-2 py-0.5 rounded-full font-black uppercase">
                      Mastered
                    </span>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

const LibraryView = ({
  wordsData,
  masteredIds,
}: {
  wordsData: VocabularyType[];
  masteredIds: number[];
}) => {
  const { searchQuery, setSearchQuery } = useVocabularyStore();
  const [activeTab, setActiveTab] = useState<"vocab" | "articles">("articles");

  return (
    <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white">Library</h2>
      </div>

      {/* TABS TOGGLE */}
      <div className="bg-zinc-900 p-1 rounded-xl flex mb-6 border border-zinc-800">
        <button
          onClick={() => setActiveTab("articles")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "articles"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Texts & Articles
        </button>
        <button
          onClick={() => setActiveTab("vocab")}
          className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${
            activeTab === "vocab"
              ? "bg-zinc-800 text-white shadow-sm"
              : "text-zinc-500 hover:text-zinc-300"
          }`}
        >
          Vocabulary{" "}
          <span className="text-[10px] opacity-60 ml-1">
            ({wordsData.length})
          </span>
        </button>
      </div>

      {/* CONTENT AREA */}
      {activeTab === "articles" ? (
        <ArticleList />
      ) : (
        <VocabLibrary
          wordsData={wordsData}
          searchQuery={searchQuery}
          masteredIds={masteredIds}
          setSearchQuery={setSearchQuery}
        />
      )}
    </div>
  );
};

export default LibraryView;

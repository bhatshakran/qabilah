import Link from 'next/link';
import { useEffect, useState } from 'react';
// Mock Data (Replace with your real imports later)
export interface Token {
  surface: string;
  index: number;
}

export interface Sentence {
  id: string;
  ar: string;
  en: string;
  tokens: Token[];
  sentenceIndex: number;
}

export interface Paragraph {
  paragraphIndex: number;
  sentences: Sentence[];
}

export interface Article {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  source: string;
  author: string;
  paragraphs: Paragraph[];
  level: string;
  category: string;
}

/**
 * For the Library / index.json view
 * This represents the "card" preview data
 */
export interface ArticleMeta {
  id: string;
  title: string; // Matches 'headline' in the reader
  subtitle: string; // English translation of headline
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  progress: number; // 0 to 100
}

const ArticleList = () => {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      const response = await fetch('/content/index.json');
      const data = await response.json();
      setArticles(data);
    }
    loadArticles();
  }, []);

  return (
    <div className="space-y-4 h-[65vh] overflow-y-auto pr-2 scrollbar-hide pb-20">
      {articles.map((article) => (
        <Link
          href={`/read/${article.id}`}
          key={article.id}
          className="group block relative bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden hover:border-amber-500/50 transition-all active:scale-[0.98]"
        >
          {/* Progress Bar Top */}
          {/* {article.progress > 0 && (
            <div className="h-1 w-full bg-zinc-800">
              <div
                className="h-full bg-amber-500"
                style={{ width: `${article.progress}%` }}
              />
            </div>
          )} */}

          <div className="p-5 flex justify-between items-start">
            <div className="space-y-1">
              {/* Badges */}
              <div className="flex gap-2 mb-2">
                <span
                  className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded text-black ${
                    article.level === 'Beginner'
                      ? 'bg-emerald-400'
                      : 'bg-amber-400'
                  }`}
                >
                  {article.level}
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 border border-zinc-700">
                  {article.category}
                </span>
              </div>

              {/* Titles */}
              <h3
                dir="rtl"
                className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors"
              >
                {article.title}
              </h3>
              <p className="text-sm text-zinc-500 font-medium">
                {article.subtitle}
              </p>
            </div>

            {/* Action Arrow */}
            <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:bg-amber-500 group-hover:text-black transition-colors">
              →
            </div>
          </div>
        </Link>
      ))}

      {/* "Coming Soon" Placeholder */}
      <div className="p-8 border-2 border-dashed border-zinc-800 rounded-2xl flex flex-col items-center justify-center text-zinc-600 gap-2">
        <span className="text-2xl">📚</span>
        <span className="text-xs uppercase tracking-widest font-bold">
          More Articles Coming Soon
        </span>
      </div>
    </div>
  );
};

export default ArticleList;

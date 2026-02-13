import { Book, Clock } from "lucide-react";
import { DocumentDTO } from "@/app/_components/article_list";
import Link from "next/link";

function ArticlePreview({ article }: { article: DocumentDTO }) {
  return (
    <Link href={`/read/${article.slug}`} className="group">
      <div className="h-full bg-zinc-900/30 border border-zinc-800/50 rounded-3xl p-6 transition-all group-hover:bg-zinc-900 group-hover:border-amber-500/30">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
              {article.source}
            </span>
          </div>
          <span className="text-[10px] font-bold text-zinc-700">
            {article.date}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-3 leading-tight group-hover:text-amber-500 transition-colors">
          {article.title}
        </h3>

        <p className="text-zinc-500 text-sm font-arabic line-clamp-2 mb-8 leading-relaxed italic">
          {article.subtitle}
        </p>

        <div className="flex items-center gap-4 mt-auto">
          <div className="flex items-center gap-1 text-[10px] font-black text-zinc-600 uppercase">
            <Clock size={12} /> 5 min read
          </div>
          <div className="flex items-center gap-1 text-[10px] font-black text-zinc-600 uppercase">
            <Book size={12} /> {article.level || "Level 2"}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ArticlePreview;

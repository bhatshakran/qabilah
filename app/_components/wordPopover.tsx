"use client";
import { motion, AnimatePresence } from "framer-motion";
import { BookmarkPlus, Loader2, Volume2, X } from "lucide-react";
import { useEffect, useState } from "react";

interface WordPopoverProps {
  word: string;
  position: { top: number; left: number } | null;
  onClose: () => void;
  onSave: (word: string) => void;
}

export default function WordPopover({
  word,
  position,
  onClose,
  onSave,
}: WordPopoverProps) {
  const [translation, setTranslation] = useState("Translation Placeholder");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!word) return;

    let isMounted = true; // Prevents state updates on unmounted components

    const translate = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/ai/translation", {
          method: "POST",
          body: JSON.stringify({ text: word }),
        });
        const data = await res.json();

        if (isMounted) {
          setTranslation(data.translation);
          setLoading(false);
        }
      } catch {
        if (isMounted) {
          setTranslation("Could not translate");
          setLoading(false);
        }
      }
    };

    translate();

    return () => {
      isMounted = false;
    }; // Cleanup function
  }, [word]);

  if (!position) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        style={{
          position: "fixed", // Key change
          top: position.top - 12, // Gap between word and popover
          left: position.left,
          transform: "translate(-50%, -100%)", // Lift it up and center it
        }}
        className="z-50 min-w-[180px] bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-2xl p-4 flex flex-col gap-3"
      >
        {/* Header: Word & Close */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 font-arabic">
            {word}
          </h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-full transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Translation Placeholder */}
        <div className="py-1">
          <p className="text-sm text-zinc-500 uppercase tracking-widest font-semibold">
            Meaning
          </p>
          <p className="text-lg text-zinc-800 dark:text-zinc-200">
            {loading ? <Loader2 className="animate-spin" /> : translation}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
          <button
            onClick={() => onSave(word)}
            className="flex-1 flex items-center justify-center gap-2 py-2 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-lg text-sm font-medium hover:bg-emerald-100 transition-colors"
          >
            <BookmarkPlus size={16} />
            Save
          </button>
          <button className="p-2 bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 rounded-lg hover:bg-zinc-200 transition-colors">
            <Volume2 size={16} />
          </button>
        </div>

        {/* Pointer Arrow */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white dark:bg-zinc-900 border-r border-b border-zinc-200 dark:border-zinc-800 rotate-45" />
      </motion.div>
    </AnimatePresence>
  );
}

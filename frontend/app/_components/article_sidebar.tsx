"use client";
import { MessageSquare, BookOpen, X, Heart, Send, Loader2 } from "lucide-react";
import { useAuth } from "../contexts/authContext";
import { useEffect, useState } from "react";
import { Comment } from "../models/comment";
import { Note } from "../models/note";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  sentenceIndex: number | null;
  tab: "halaqa" | "notebook";
  setTab: (s: "halaqa" | "notebook") => void;
  slug: string;
}

export default function ArticleSidebar({
  isOpen,
  onClose,
  sentenceIndex,
  tab,
  setTab,
  slug,
}: SidebarProps) {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [data, setData] = useState<{
    publicComments: Comment[];
    personalNotes: Note[];
  }>({ publicComments: [], personalNotes: [] });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Fetch Data on Open
  useEffect(() => {
    if (isOpen) {
      fetch(`/api/articles/${slug}/context`)
        .then((res) => res.json())
        .then((json) => setData(json));
    }
  }, [isOpen, slug]);
  const handleNoteDelete = (noteId: string) => {
    setData((prev) => ({
      ...prev,
      personalNotes: prev.personalNotes.filter((note) => note._id !== noteId),
    }));
  };
  const handleNoteUpdate = (noteId: string, newContent: string) => {
    const updatedNotes = data.personalNotes.map((note: Note) =>
      note._id === noteId
        ? {
            ...note,
            content: newContent,
            updatedAt: new Date(),
          }
        : note,
    );
    setData((prev) => ({
      ...prev,
      personalNotes: updatedNotes,
    }));
  };
  const handleSubmit = async () => {
    if (!content.trim() || !user) return;
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/articles/${slug}/interaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: tab === "halaqa" ? "comment" : "note",
          sentenceIndex: sentenceIndex,
          content: content,
          authorName: user.email.split("@")[0],
        }),
      });

      if (res.ok) {
        const newItem = await res.json();
        // Update local state instantly
        if (tab === "halaqa") {
          setData((prev) => ({
            ...prev,
            publicComments: [newItem, ...prev.publicComments],
          }));
        } else {
          setData((prev) => ({
            ...prev,
            personalNotes: [newItem, ...prev.personalNotes],
          }));
        }
        setContent("");
      }
    } catch (err) {
      console.log(err);
      console.error("Failed to post");
    } finally {
      setIsSubmitting(false);
    }
  };
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 h-screen right-0 w-full max-w-sm bg-zinc-900 border-l border-zinc-800 shadow-2xl z-50 flex flex-col animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-4 border-b border-zinc-800 flex items-center justify-between">
        <div className="flex bg-black p-1 rounded-xl">
          <button
            onClick={() => setTab("halaqa")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${tab === "halaqa" ? "bg-zinc-800 text-amber-500" : "text-zinc-500"}`}
          >
            <MessageSquare size={14} /> Halaqa
          </button>
          <button
            onClick={() => setTab("notebook")}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-black uppercase tracking-tighter transition-all ${tab === "notebook" ? "bg-zinc-800 text-amber-500" : "text-zinc-500"}`}
          >
            <BookOpen size={14} /> Notebook
          </button>
        </div>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-white p-2"
        >
          <X size={20} />
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {sentenceIndex !== null && (
          <div className="bg-amber-500/5 border border-amber-500/20 p-3 rounded-xl mb-4">
            <span className="text-[10px] text-amber-500 font-black uppercase tracking-widest">
              Context: Paragraph {sentenceIndex}
            </span>
          </div>
        )}

        {tab === "halaqa" ? (
          <HalaqaFeed
            publicComments={data.publicComments}
            sentenceIndex={sentenceIndex}
          />
        ) : (
          <NotebookView
            personalNotes={data.personalNotes}
            sentenceIndex={sentenceIndex}
            onUpdate={handleNoteUpdate}
            onDelete={handleNoteDelete}
            slug={slug}
          />
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-zinc-800 bg-zinc-900/50 backdrop-blur-md">
        <div className="relative">
          <textarea
            placeholder={
              tab === "halaqa"
                ? "Join the discussion..."
                : "Write a private note..."
            }
            className="w-full bg-black border border-zinc-800 rounded-2xl p-4 pr-12 text-sm text-white placeholder:text-zinc-700 focus:border-amber-500 outline-none resize-none"
            rows={3}
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
          />
          <button className="absolute bottom-3 right-3 p-2 bg-amber-500 text-black rounded-xl hover:scale-105 transition-transform">
            {!isSubmitting ? (
              <Send size={16} onClick={handleSubmit} />
            ) : (
              <Loader2 className="animate-spin" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

// Sub-components for the Feed
function HalaqaFeed({
  publicComments,
  sentenceIndex,
}: {
  publicComments: Comment[];
  sentenceIndex: number | null;
}) {
  // Filter dummy comments by sentenceIndex if needed
  return (
    <div className="space-y-4">
      {publicComments
        .filter((c) => c.sentenceIndex == sentenceIndex)
        .map((comment) => (
          <div key={comment.createdAt.toString()} className="group">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-black text-white uppercase tracking-tighter">
                {comment.authorName}
              </span>
              <span className="text-[10px] text-zinc-600">2h ago</span>
            </div>
            <p className="text-sm text-zinc-400 leading-relaxed">
              {comment.content}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <button className="flex items-center gap-1 text-[10px] font-bold text-zinc-500 hover:text-amber-500 uppercase">
                <Heart size={12} /> {comment.likes}
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

function NotebookView({
  personalNotes,
  sentenceIndex,
  onUpdate,
  onDelete,
  slug,
}: {
  personalNotes: Note[];
  sentenceIndex: number | null;
  onUpdate: (noteId: string, newContent: string) => void;
  onDelete: (noteId: string) => void;
  slug: string;
}) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (id: string) => {
    if (
      !confirm("Are you sure you want to remove this note from your notebook?")
    )
      return;

    setIsDeleting(true);
    const res = await fetch(`/api/articles/${slug}/interaction`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ noteId: id }),
    });

    if (res.ok) {
      onDelete(id);
    } else {
      setIsDeleting(false);
      alert("Failed to delete");
    }
  };
  const handleStartEdit = (note: Note) => {
    setEditingId(note._id);
    setEditText(note.content);
  };

  const handleSave = async () => {
    // Call the API
    const res = await fetch(`/api/articles/${slug}/interaction`, {
      method: "PATCH",
      body: JSON.stringify({ id: editingId, content: editText }),
    });

    if (res.ok) {
      onUpdate(editingId as string, editText);
      setEditingId(null);
    }
  };
  return (
    <div className="space-y-4">
      {personalNotes.length === 0 && (
        <p className="text-zinc-600 text-xs text-center py-10 italic">
          No notes for this section yet.
        </p>
      )}

      {personalNotes
        .filter((c) => c.sentenceIndex == sentenceIndex)
        .map((note) => (
          <div
            key={note._id}
            className="bg-zinc-800/30 border border-zinc-800 p-4 rounded-2xl group transition-all hover:border-zinc-700"
          >
            {editingId === note._id ? (
              <div className="space-y-3">
                <textarea
                  className="w-full bg-black border border-amber-500/50 rounded-xl p-3 text-sm text-white outline-none"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  autoFocus
                />
                <div className="flex justify-end gap-2">
                  <button
                    onClick={() => setEditingId(null)}
                    className="text-[10px] font-bold text-zinc-500 uppercase"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleSave()}
                    className="text-[10px] font-bold text-amber-500 uppercase"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-sm text-zinc-300 leading-relaxed italic">
                  &quot;{note.content}&quot;
                </p>
                <div className="mt-3 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[9px] text-zinc-600 uppercase font-bold tracking-widest">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                  <button
                    onClick={() => handleStartEdit(note)}
                    className="text-[10px] font-bold text-amber-500/60 hover:text-amber-500 uppercase tracking-widest"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(note._id)}
                    disabled={isDeleting}
                    className="text-[10px] font-bold text-red-500/40 hover:text-red-500 uppercase tracking-widest ml-4"
                  >
                    {isDeleting ? "Removing..." : "Delete"}
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
    </div>
  );
}

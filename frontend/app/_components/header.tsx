"use client";
import Link from "next/link";
import { useStreak } from "../contexts/streakContext";
import { useState } from "react";
import SignInForm from "./forms/signin";
import { createPortal } from "react-dom";
import { useAuth } from "../contexts/authContext";

const Header = () => {
  const { user, loading, logout } = useAuth();
  const { streak } = useStreak();
  const [showSignin, setShowSignin] = useState(false);
  return (
    <div className="w-full flex items-center justify-between flex-wrap mb-10 pt-4 mx-auto px-4">
      <Link href={"/"} className="flex items-center gap-3">
        {/* Logo: Geometric Crescent */}
        <div className="relative w-10 h-10 flex items-center justify-center cursor-pointer">
          <div className="absolute inset-0 bg-amber-500 rounded-xl rotate-12 opacity-20 animate-pulse"></div>
          <div className="relative w-8 h-8 bg-linear-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-black font-black text-xl tracking-tighter">
              Q
            </span>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-black tracking-tighter text-white leading-none">
            QABILAH
          </h1>
          <p className="text-[10px] text-amber-500/80 font-bold tracking-[0.2em] uppercase">
            The Tribe
          </p>
        </div>
      </Link>

      {/* Streak Counter */}
      <div className="flex items-center">
        <div
          className={`flex items-center gap-2 px-4 py-2 rounded-2xl border transition-all ${streak > 0 ? "bg-orange-500/10 border-orange-500/30" : "bg-zinc-900 border-zinc-800"}`}
        >
          <span className={`text-xl ${streak > 0 ? "" : "grayscale"}`}>🔥</span>
          <div className="flex flex-col">
            <span className="text-[10px] text-zinc-500 font-bold uppercase leading-none">
              Streak
            </span>
            <span
              className={`text-sm font-black ${streak > 0 ? "text-orange-500" : "text-zinc-400"}`}
            >
              {streak} {streak === 1 ? "Day" : "Days"}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {loading ? (
            <div className="w-4 h-4 border-2 border-amber-500 border-t-transparent rounded-full animate-spin" />
          ) : user ? (
            <div className="flex items-center gap-4">
              <span className="text-xs font-black tracking-widest text-zinc-500 uppercase">
                {user.name}
              </span>
              <button
                onClick={logout}
                className="text-[10px] font-bold text-amber-500/60 hover:text-amber-500 uppercase tracking-widest transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              className="px-4 py-2 text-sm font-medium hover:text-amber-600 transition-colors cursor-pointer"
              onClick={() => setShowSignin(true)}
            >
              Sign In
            </div>
          )}
        </div>

        {showSignin &&
          !user &&
          createPortal(
            <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
              {/* 1. Dark Backdrop Overlay */}
              <div
                className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm transition-opacity"
                onClick={() => setShowSignin(false)} // Close when clicking outside
              />

              {/* 2. The Form Container */}
              <div className="relative w-full max-w-md animate-in fade-in zoom-in duration-200">
                {/* Close Button (Optional but recommended) */}
                <button
                  onClick={() => setShowSignin(false)}
                  className="absolute -top-12 right-0 text-white/70 hover:text-white flex items-center gap-1 text-sm font-medium"
                >
                  Close <span className="text-xl">×</span>
                </button>

                <SignInForm />
              </div>
            </div>,
            document.body,
          )}
      </div>
    </div>
  );
};

export default Header;

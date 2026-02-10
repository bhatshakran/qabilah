"use client";
import { useState } from "react";
import { Loader2, User, Mail, Lock } from "lucide-react";

export default function SignUpForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log(loading, "loading");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Successful signup - you could trigger a login here or redirect
        window.location.reload(); // Quick way to reset state for now
      } else {
        setError(data.message || "Signup failed");
      }
    } catch (err) {
      console.log(err);
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -right-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase">
          Join the <span className="text-amber-500">Tribe</span>
        </h2>
        <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-1">
          Begin your journey with Qabilah
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Name Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
            Full Name
          </label>
          <div className="relative">
            <User
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              size={18}
            />
            <input
              type="text"
              required
              className="w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-white placeholder:text-zinc-700"
              placeholder="Zayd ibn Thabit"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>
        </div>

        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
            Email
          </label>
          <div className="relative">
            <Mail
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              size={18}
            />
            <input
              type="email"
              required
              className="w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-white placeholder:text-zinc-700"
              placeholder="warrior@qabilah.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>
        </div>

        {/* Password Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
            Password
          </label>
          <div className="relative">
            <Lock
              className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
              size={18}
            />
            <input
              type="password"
              required
              className="w-full pl-11 pr-4 py-3 bg-black border border-zinc-800 rounded-xl focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none transition-all text-white placeholder:text-zinc-700"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>
        </div>

        {error && (
          <div className="text-orange-500 text-[11px] font-bold bg-orange-500/5 border border-orange-500/20 p-3 rounded-lg animate-shake">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-linear-to-br from-amber-400 to-amber-600 text-black font-black uppercase tracking-tighter rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {/* {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : ( */}
          Enlist Now
          {/* )} */}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500 font-medium">
          Already part of the tribe?{" "}
          <button className="text-amber-500 font-bold hover:underline underline-offset-4">
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
}

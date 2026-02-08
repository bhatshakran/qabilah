'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import SignUpForm from './signup';
import { Loader2, Lock, Mail } from 'lucide-react';
import { useAuth } from '@/app/contexts/authContext';

export default function SignInForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        login(data.user);
      } else {
        setError(data.message || 'Something went wrong');
      }
    } catch (err) {
      console.log(err);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };
  if (showSignup) return <SignUpForm />;
  return (
    <div className="w-full max-w-md bg-zinc-900 p-8 rounded-3xl shadow-2xl border border-zinc-800 relative overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="mb-8">
        <h2 className="text-3xl font-black tracking-tighter text-white uppercase leading-none">
          Welcome <span className="text-amber-500 text-2xl block">Back</span>
        </h2>
        <p className="text-[10px] text-zinc-500 font-bold tracking-[0.2em] uppercase mt-2">
          Return to the Tribe
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* Email Input */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 ml-1">
            Email Address
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>

        {error && (
          <div className="text-orange-500 text-[11px] font-bold bg-orange-500/5 border border-orange-500/20 p-3 rounded-lg">
            ⚠️ {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 mt-4 bg-linear-to-br from-amber-400 to-amber-600 text-black font-black uppercase tracking-tighter rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-amber-600/20 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 className="animate-spin" size={20} />
          ) : (
            'Enter Library'
          )}
        </button>
      </form>

      <div className="mt-8 text-center">
        <p className="text-xs text-zinc-500 font-medium">
          New to the tribe?{' '}
          <button
            className="text-amber-500 font-bold hover:underline underline-offset-4"
            onClick={() => setShowSignup(!showSignup)}
          >
            Enlist Here
          </button>
        </p>
      </div>
    </div>
  );
}

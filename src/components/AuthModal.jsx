import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Sparkles, User, Mail, Lock, Flame, ArrowRight } from 'lucide-react';

export const AuthModal = ({ isOpen, onClose }) => {
  const { loginUser, registerUser, users } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);

  // Sign In Form
  const [loginIdentifier, setLoginIdentifier] = useState('aman@studytrack.com');
  const [loginPassword, setLoginPassword] = useState('password123');

  // Sign Up Form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [target, setTarget] = useState('Both (TCS + Banking)');
  const [startingStreak, setStartingStreak] = useState('10');

  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const res = loginUser(loginIdentifier, loginPassword);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setErrorMessage('');
    if (!name.trim() || !email.trim() || !password.trim()) {
      setErrorMessage('Please fill in all fields.');
      return;
    }
    const res = registerUser({ name, email, password, target, startingStreak });
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleQuickLogin = (u) => {
    loginUser(u.email, u.password);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Glow */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/20 mb-3">
            <Flame className="w-7 h-7 animate-pulse" />
          </div>
          <h2 className="text-2xl font-black text-white">
            {isSignUp ? 'Create Learner / Friend Profile' : 'Sign In to Study Track Pro'}
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isSignUp
              ? 'Join the daily consistency challenge for TCS NQT & Banking exams!'
              : 'Sign in to sync your streaks, punch attendance, and take mock tests.'}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
          <button
            type="button"
            onClick={() => { setIsSignUp(false); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              !isSignUp ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => { setIsSignUp(true); setErrorMessage(''); }}
            className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
              isSignUp ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign Up (New Friend)
          </button>
        </div>

        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
            ⚠️ {errorMessage}
          </div>
        )}

        {/* Forms */}
        {!isSignUp ? (
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email or Username</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={loginIdentifier}
                  onChange={(e) => setLoginIdentifier(e.target.value)}
                  placeholder="aman@studytrack.com"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition flex items-center justify-center space-x-2"
            >
              <span>Sign In & Continue Streak</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Name / Friend's Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Exam</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Both (TCS + Banking)">Both (TCS + Bank)</option>
                  <option value="TCS NQT">Track A: TCS NQT</option>
                  <option value="Banking Exams">Track B: Banking Exams</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Initial Streak</label>
                <div className="relative">
                  <Flame className="absolute left-3 top-2.5 w-4 h-4 text-orange-500" />
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={startingStreak}
                    onChange={(e) => setStartingStreak(e.target.value)}
                    placeholder="10"
                    className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition flex items-center justify-center space-x-2 mt-2"
            >
              <span>Register & Start Day {startingStreak || 1}</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* Quick Demo Switcher */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2.5 text-center">
            Or One-Click Switch Existing Learner:
          </p>
          <div className="flex flex-wrap gap-2 justify-center">
            {users.map(u => (
              <button
                key={u.id}
                type="button"
                onClick={() => handleQuickLogin(u)}
                className="px-2.5 py-1.5 rounded-lg bg-slate-950 hover:bg-slate-800 border border-slate-800 text-xs text-slate-300 flex items-center gap-1.5 transition"
              >
                <span>🔥 {u.streak}d</span>
                <span className="font-semibold text-white">{u.name.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

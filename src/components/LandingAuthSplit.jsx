import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, Eye, EyeOff, KeyRound, Sparkles, ArrowRight, 
  Send, RefreshCw, CheckCircle2, AlertCircle, Code2, Flame, Award, 
  BookOpen, Terminal, Check
} from 'lucide-react';

export const LandingAuthSplit = () => {
  const { loginUser, registerUser, requestPasswordResetOtp, resetPasswordWithOtp } = useAuth();

  // Mode: 'login' | 'signup' | 'forgot_request' | 'forgot_verify'
  const [authMode, setAuthMode] = useState('login');

  // Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [target, setTarget] = useState('Both (TCS + Banking)');

  // Password visibility
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Forgot Password States
  const [resetEmail, setResetEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [dispatchedOtp, setDispatchedOtp] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const clearMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    clearMessages();
    if (!loginIdentifier.trim() || !loginPassword) {
      setErrorMessage('Please enter your email/username and password.');
      return;
    }
    const res = loginUser(loginIdentifier, loginPassword);
    if (!res.success) {
      setErrorMessage(res.error);
    }
  };

  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    clearMessages();
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }
    const res = registerUser({ name, email, password, target, startingStreak: 1 });
    if (!res.success) {
      setErrorMessage(res.error);
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    clearMessages();
    if (!resetEmail.trim()) {
      setErrorMessage('Please enter your registered email address.');
      return;
    }
    const res = requestPasswordResetOtp(resetEmail);
    if (res.success) {
      setDispatchedOtp(res.otp);
      setSuccessMessage(`OTP verification code generated! Check below.`);
      setAuthMode('forgot_verify');
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleVerifyOtpAndReset = (e) => {
    e.preventDefault();
    clearMessages();
    if (!enteredOtp.trim() || !newPassword) {
      setErrorMessage('Please enter the 6-digit OTP and your new password.');
      return;
    }
    const res = resetPasswordWithOtp(resetEmail, enteredOtp, newPassword);
    if (res.success) {
      setSuccessMessage(res.message);
      setLoginIdentifier(resetEmail);
      setLoginPassword('');
      setTimeout(() => {
        setAuthMode('login');
      }, 1500);
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto my-4 sm:my-8 px-2 sm:px-6 animate-fadeIn">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[660px]">
        
        {/* ================= LEFT SIDE: REALISTIC STUDENTS STUDY & CODING SCENE ================= */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/50 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          
          {/* Subtle Ambient Lighting */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Tagline */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Student & Aspirant Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Study Track Pro
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-2.5 max-w-xl leading-relaxed">
              Your realistic daily activity & performance tracking portal for <b>TCS NQT</b> and <b>Banking Exams (IBPS/SBI)</b>. 
              Join your peers in maintaining daily unbroken streaks, verifying attendance, and tracking diagnostic progress.
            </p>
          </div>

          {/* REALISTIC GRAPHIC: STUDENTS SITTING AT DESK CODING ON LAPTOPS */}
          <div className="my-6 relative z-10">
            <div className="bg-slate-950/95 border border-slate-800/90 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              
              {/* Terminal Window Top Bar */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/90 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/90 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/90 inline-block"></span>
                  <span className="ml-2 font-mono text-[11px] text-slate-400">group_study_lab.cpp • 3 Students Active</span>
                </div>
                <div className="flex items-center space-x-1.5 text-[10px] text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  <span>Live Study Session</span>
                </div>
              </div>

              {/* Vector SVG Scene: Students Sitting Together Coding on Laptops */}
              <div className="w-full h-44 sm:h-52 bg-gradient-to-b from-slate-900/90 to-slate-950 rounded-xl border border-slate-800/80 p-2 overflow-hidden flex items-center justify-center">
                <svg viewBox="0 0 600 240" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Background Room & Bookshelf */}
                  <rect x="20" y="20" width="120" height="80" rx="6" fill="#1e293b" opacity="0.4" />
                  <line x1="30" y1="50" x2="130" y2="50" stroke="#334155" strokeWidth="3" />
                  <line x1="30" y1="75" x2="130" y2="75" stroke="#334155" strokeWidth="3" />
                  {/* Books on shelf */}
                  <rect x="35" y="30" width="10" height="20" fill="#f97316" rx="1" />
                  <rect x="48" y="26" width="12" height="24" fill="#3b82f6" rx="1" />
                  <rect x="63" y="32" width="8" height="18" fill="#10b981" rx="1" />
                  <rect x="75" y="28" width="14" height="22" fill="#a855f7" rx="1" />
                  <rect x="95" y="31" width="10" height="19" fill="#eab308" rx="1" />
                  
                  {/* Window / Motivational Board */}
                  <rect x="460" y="20" width="110" height="70" rx="8" fill="#0f172a" stroke="#334155" strokeWidth="2" />
                  <text x="475" y="45" fill="#f97316" fontSize="11" fontWeight="bold" fontFamily="sans-serif">🔥 DAY 10 STREAK</text>
                  <text x="475" y="62" fill="#94a3b8" fontSize="9" fontFamily="sans-serif">TCS NQT & Banking</text>
                  <text x="475" y="76" fill="#38bdf8" fontSize="8" fontFamily="sans-serif">Attendance: 100%</text>

                  {/* Main Shared Study Desk */}
                  <rect x="50" y="165" width="500" height="14" rx="3" fill="#334155" />
                  <rect x="70" y="179" width="12" height="55" fill="#1e293b" />
                  <rect x="518" y="179" width="12" height="55" fill="#1e293b" />
                  <line x1="70" y1="195" x2="520" y2="195" stroke="#1e293b" strokeWidth="4" />

                  {/* ================= STUDENT 1 (GIRL - LEFT - WRITING / CODING ON LAPTOP) ================= */}
                  {/* Chair */}
                  <rect x="100" y="140" width="40" height="40" rx="4" fill="#1e293b" />
                  {/* Body & Clothes */}
                  <path d="M 100 170 C 100 135, 140 135, 140 170 Z" fill="#ec4899" />
                  {/* Head & Hair */}
                  <circle cx="120" cy="115" r="14" fill="#fed7aa" />
                  <path d="M 105 115 Q 120 90, 135 115 Q 138 135, 132 140 Q 120 120, 108 140 Z" fill="#475569" />
                  {/* Hair bun */}
                  <circle cx="120" cy="98" r="6" fill="#475569" />
                  {/* Arms typing on laptop */}
                  <path d="M 112 145 L 140 162" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 128 145 L 148 162" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  {/* Laptop 1 */}
                  <polygon points="135,165 170,165 165,142 140,142" fill="#64748b" />
                  <rect x="141" y="144" width="22" height="17" rx="1" fill="#0284c7" />
                  <text x="144" y="156" fill="#ffffff" fontSize="7" fontFamily="monospace">&lt;pyq/&gt;</text>
                  <rect x="130" y="165" width="45" height="3" rx="1" fill="#94a3b8" />
                  {/* Label */}
                  <text x="105" y="85" fill="#f472b6" fontSize="9" fontWeight="bold">Priya (Bank)</text>

                  {/* ================= STUDENT 2 (BOY - CENTER - CODING AT LAPTOP) ================= */}
                  {/* Chair */}
                  <rect x="270" y="135" width="45" height="45" rx="4" fill="#1e293b" />
                  {/* Body & Blue Hoodie */}
                  <path d="M 270 170 C 270 130, 315 130, 315 170 Z" fill="#2563eb" />
                  {/* Head & Short Hair */}
                  <circle cx="292" cy="112" r="15" fill="#fcd34d" />
                  <path d="M 277 110 Q 292 92, 307 110 Q 307 100, 292 95 Q 277 100, 277 110 Z" fill="#1e293b" />
                  {/* Arms typing on laptop */}
                  <path d="M 280 145 L 295 160" stroke="#fcd34d" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 305 145 L 305 160" stroke="#fcd34d" strokeWidth="6" strokeLinecap="round" />
                  {/* Laptop 2 (Open screen with code glowing) */}
                  <polygon points="280,165 325,165 320,135 285,135" fill="#475569" />
                  <rect x="287" y="137" width="31" height="24" rx="2" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
                  <text x="290" y="148" fill="#4ade80" fontSize="7" fontFamily="monospace">void dfs()</text>
                  <text x="290" y="156" fill="#fb923c" fontSize="7" fontFamily="monospace">return 1;</text>
                  <rect x="275" y="165" width="55" height="3" rx="1" fill="#cbd5e1" />
                  {/* Coffee Cup on desk */}
                  <rect x="340" y="152" width="10" height="13" rx="2" fill="#f97316" />
                  <path d="M 350 156 Q 354 158, 350 162" stroke="#f97316" strokeWidth="2" fill="none" />
                  {/* Label */}
                  <text x="272" y="85" fill="#60a5fa" fontSize="9" fontWeight="bold">Rahul (TCS NQT)</text>

                  {/* ================= STUDENT 3 (GIRL - RIGHT - STUDYING & TAKING NOTES ON LAPTOP) ================= */}
                  {/* Chair */}
                  <rect x="440" y="140" width="40" height="40" rx="4" fill="#1e293b" />
                  {/* Body & Purple Top */}
                  <path d="M 440 170 C 440 135, 480 135, 480 170 Z" fill="#9333ea" />
                  {/* Head & Ponytail Hair */}
                  <circle cx="460" cy="115" r="14" fill="#fed7aa" />
                  <path d="M 448 115 Q 460 92, 472 115 Q 470 135, 460 120 Z" fill="#78350f" />
                  <path d="M 470 110 Q 485 115, 482 135" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
                  {/* Arms */}
                  <path d="M 450 145 L 435 162" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  <path d="M 470 145 L 445 162" stroke="#fed7aa" strokeWidth="5" strokeLinecap="round" />
                  {/* Laptop 3 */}
                  <polygon points="415,165 450,165 445,142 420,142" fill="#64748b" />
                  <rect x="421" y="144" width="22" height="17" rx="1" fill="#6366f1" />
                  <text x="424" y="156" fill="#ffffff" fontSize="7" fontFamily="monospace">Quant%</text>
                  <rect x="410" y="165" width="45" height="3" rx="1" fill="#94a3b8" />
                  {/* Notebook on desk */}
                  <polygon points="370,160 395,158 398,165 372,166" fill="#fef08a" />
                  {/* Label */}
                  <text x="440" y="85" fill="#c084fc" fontSize="9" fontWeight="bold">Sneha (Quant)</text>
                </svg>
              </div>

              {/* Code Progress Bar */}
              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5 font-semibold text-slate-300">
                  <Terminal className="w-3.5 h-3.5 text-orange-400" />
                  <span>3 Students Practicing Together • Aptitude, Puzzles & Hands-on Coding</span>
                </span>
                <span className="text-orange-400 font-bold font-mono">100% Attendance Stamped</span>
              </div>

            </div>
          </div>

          {/* Quick Pillars */}
          <div className="relative z-10 pt-1 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <b className="text-white block text-xs">Individual Accounts</b>
              <span>Unique Streaks & Progress</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <b className="text-orange-400 block text-xs">Snapchat Habit</b>
              <span>Daily Consistency Fire 🔥</span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800">
              <b className="text-emerald-400 block text-xs">Categorized PYQs</b>
              <span>Real Exam Questions</span>
            </div>
          </div>

        </div>

        {/* ================= RIGHT SIDE: AUTHENTICATION PORTAL ================= */}
        <div className="lg:col-span-5 bg-slate-900 p-6 sm:p-10 flex flex-col justify-center">
          
          {/* Mode Switcher Tabs */}
          {(authMode === 'login' || authMode === 'signup') && (
            <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
              <button
                type="button"
                onClick={() => { setAuthMode('login'); clearMessages(); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                  authMode === 'login'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthMode('signup'); clearMessages(); }}
                className={`flex-1 py-2.5 text-xs font-bold rounded-lg transition ${
                  authMode === 'signup'
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* Dynamic Header */}
          <div className="mb-5">
            <h2 className="text-2xl font-black text-white">
              {authMode === 'login' && 'Sign In to Your Account'}
              {authMode === 'signup' && 'Create Your Student Profile'}
              {authMode === 'forgot_request' && 'Reset Password'}
              {authMode === 'forgot_verify' && 'Verify OTP & Set New Password'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {authMode === 'login' && 'Access your individual attendance register, track streak, and practice PYQs.'}
              {authMode === 'signup' && 'Register your profile to begin your unbroken exam preparation streak.'}
              {authMode === 'forgot_request' && 'Enter your registered email ID to receive a 6-digit OTP code.'}
              {authMode === 'forgot_verify' && 'Enter the 6-digit verification code to update your password.'}
            </p>
          </div>

          {/* Alert Messages */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-start gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ================= FORM 1: SIGN IN ================= */}
          {authMode === 'login' && (
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email or Username</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={loginIdentifier}
                    onChange={(e) => setLoginIdentifier(e.target.value)}
                    placeholder="Enter your email or username"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-300">Password</label>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthMode('forgot_request');
                      setResetEmail(loginIdentifier);
                      clearMessages();
                    }}
                    className="text-[11px] text-orange-400 hover:text-orange-300 hover:underline font-semibold"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type={showLoginPassword ? "text" : "password"}
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowLoginPassword(!showLoginPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white transition p-0.5"
                    title={showLoginPassword ? "Hide password" : "Show password"}
                  >
                    {showLoginPassword ? <EyeOff className="w-4 h-4 text-orange-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center justify-center space-x-2"
              >
                <span>Sign In & Open Portal</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-400">
                <span>New student? </span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('signup'); clearMessages(); }}
                  className="text-orange-400 hover:underline font-bold"
                >
                  Create account here
                </button>
              </div>
            </form>
          )}

          {/* ================= FORM 2: SIGN UP ================= */}
          {authMode === 'signup' && (
            <form onSubmit={handleSignUpSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Full Student Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Swathi Yadav"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
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
                    placeholder="student@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Exam Track</label>
                <select
                  value={target}
                  onChange={(e) => setTarget(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                >
                  <option value="Both (TCS + Banking)">Both Tracks: TCS NQT + Banking Exams</option>
                  <option value="TCS NQT">Track A: TCS NQT (National Qualifier Test)</option>
                  <option value="Banking Exams">Track B: Banking Exams (IBPS / SBI PO & Clerk)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Set Password (Min. 6 chars)</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showSignupPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create secure password"
                    className="w-full pl-10 pr-11 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowSignupPassword(!showSignupPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white transition p-0.5"
                    title={showSignupPassword ? "Hide password" : "Show password"}
                  >
                    {showSignupPassword ? <EyeOff className="w-4 h-4 text-orange-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center justify-center space-x-2 mt-2"
              >
                <span>Create Student Account & Begin Day 1</span>
                <Sparkles className="w-4 h-4" />
              </button>

              <div className="pt-2 text-center text-xs text-slate-400">
                <span>Already have an account? </span>
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); clearMessages(); }}
                  className="text-orange-400 hover:underline font-bold"
                >
                  Sign in here
                </button>
              </div>
            </form>
          )}

          {/* ================= FORM 3: FORGOT PASSWORD (REQUEST OTP) ================= */}
          {authMode === 'forgot_request' && (
            <form onSubmit={handleRequestOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Registered Student Email ID</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="Enter your registered email address"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400 mt-1.5">
                  An OTP verification code will be generated to authorize password change.
                </p>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center justify-center space-x-2"
              >
                <Send className="w-4 h-4" />
                <span>Generate OTP Verification Code</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); clearMessages(); }}
                  className="text-xs text-slate-400 hover:text-white underline font-semibold"
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* ================= FORM 4: FORGOT PASSWORD (VERIFY OTP & UPDATE) ================= */}
          {authMode === 'forgot_verify' && (
            <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
              {dispatchedOtp && (
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold flex items-center gap-1.5">
                      <KeyRound className="w-4 h-4 text-amber-400" />
                      Security OTP Code Generated:
                    </span>
                    <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                      Valid for 10m
                    </span>
                  </div>
                  <div className="font-mono text-xl tracking-widest font-black text-center py-1.5 text-white bg-slate-950 rounded-xl border border-amber-500/40 my-1">
                    {dispatchedOtp}
                  </div>
                  <p className="text-[10px] text-slate-400 text-center">
                    Enter this 6-digit code below to set your new password.
                  </p>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Enter 6-Digit OTP</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  value={enteredOtp}
                  onChange={(e) => setEnteredOtp(e.target.value.replace(/\D/g, ''))}
                  placeholder="e.g. 849201"
                  className="w-full text-center font-mono text-lg tracking-widest px-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Create New Password</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
                  <input
                    type={showResetPassword ? "text" : "password"}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="New password (min. 6 chars)"
                    className="w-full pl-10 pr-11 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowResetPassword(!showResetPassword)}
                    className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white transition p-0.5"
                    title={showResetPassword ? "Hide password" : "Show password"}
                  >
                    {showResetPassword ? <EyeOff className="w-4 h-4 text-orange-400" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/25 transition flex items-center justify-center space-x-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Update Password & Complete Reset</span>
              </button>

              <div className="flex items-center justify-between text-xs pt-1">
                <button
                  type="button"
                  onClick={() => {
                    requestPasswordResetOtp(resetEmail);
                    setSuccessMessage("New OTP code generated!");
                  }}
                  className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Resend OTP</span>
                </button>

                <button
                  type="button"
                  onClick={() => { setAuthMode('login'); clearMessages(); }}
                  className="text-slate-400 hover:text-white underline font-semibold"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}

        </div>

      </div>
    </div>
  );
};

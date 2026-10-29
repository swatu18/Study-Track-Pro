import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Lock, Mail, User, Eye, EyeOff, KeyRound, Sparkles, ArrowRight, 
  Send, RefreshCw, CheckCircle2, AlertCircle, ShieldAlert, BookOpen, 
  Code2, Flame, Award, ChevronRight, Check
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
  const [startingStreak, setStartingStreak] = useState('1');

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
    const res = registerUser({ name, email, password, target, startingStreak });
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
      setSuccessMessage(`OTP security code generated for ${res.email}!`);
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
    <div className="w-full max-w-7xl mx-auto my-4 sm:my-8 px-2 sm:px-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[640px]">
        
        {/* ================= LEFT SIDE: REALISTIC LEARNER WORKSPACE ================= */}
        <div className="lg:col-span-7 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950/40 p-6 sm:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 relative overflow-hidden">
          
          {/* Background subtle glow */}
          <div className="absolute top-0 -left-20 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Top Tagline */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Official Student & Aspirant Portal</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
              Welcome to <br />
              <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-rose-400 bg-clip-text text-transparent">
                Study Track Pro
              </span>
            </h1>

            <p className="text-xs sm:text-sm text-slate-300 mt-3 max-w-xl leading-relaxed">
              The realistic daily activity and performance tracker built for <b>TCS NQT</b> and <b>Banking Exams (IBPS / SBI)</b>.
              Every question you solve validates your attendance format, counts towards your streak, and logs your performance.
            </p>
          </div>

          {/* REALISTIC GRAPHIC: STUDENTS CODING & COLLABORATING */}
          <div className="my-6 relative z-10">
            <div className="relative bg-slate-950/90 border border-slate-800 rounded-2xl p-4 sm:p-5 shadow-2xl backdrop-blur-md">
              
              {/* Workspace Header Bar */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800/80">
                <div className="flex items-center space-x-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="ml-2 font-mono text-[11px] text-slate-400">group_study_session.cpp • Active Collaborators (3)</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                  Live Session
                </span>
              </div>

              {/* Vector Illustration of 3 Students (2 Girls + 1 Boy) Studying & Coding */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                
                {/* Student 1: Ananya (Girl - Solving Quant & DI) */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-pink-500 to-rose-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    👩‍💻
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Priya (Banking)</p>
                    <p className="text-[10px] text-pink-400 flex items-center gap-1">
                      <span>Analyzing DI Puzzles</span>
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">Streak: 🔥 12d</span>
                  </div>
                </div>

                {/* Student 2: Rahul (Boy - Writing TCS NQT Code) */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-500 to-blue-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    👨‍💻
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Rahul (TCS NQT)</p>
                    <p className="text-[10px] text-indigo-400 flex items-center gap-1">
                      <span>Coding In-Place Shift</span>
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">Streak: 🔥 8d</span>
                  </div>
                </div>

                {/* Student 3: Sneha (Girl - Reasoning & Blood Relations) */}
                <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-500 to-amber-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                    👩‍💼
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-bold text-white truncate">Sneha (Both)</p>
                    <p className="text-[10px] text-amber-400 flex items-center gap-1">
                      <span>Reasoning Logic</span>
                    </p>
                    <span className="text-[9px] text-slate-500 font-mono">Streak: 🔥 10d</span>
                  </div>
                </div>

              </div>

              {/* Code Snippet Screen Simulation */}
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 font-mono text-[11px] text-slate-300">
                <div className="flex items-center justify-between text-slate-500 text-[10px] pb-1 border-b border-slate-800 mb-2">
                  <span>// Real PYQ Practice Engine</span>
                  <span className="text-emerald-400 font-bold">Passed All Test Cases ✓</span>
                </div>
                <p className="text-purple-400">void <span className="text-amber-300">recordDailyAttendance</span>(Student student, PYQ question) &#123;</p>
                <p className="pl-4 text-slate-400">// Automatically stamp attendance format & extend unbroken streak</p>
                <p className="pl-4 text-emerald-300">student.attendanceDates.push(today);</p>
                <p className="pl-4 text-orange-400">student.streak += 1; <span className="text-slate-500">// 🔥 Verified</span></p>
                <p className="pl-4 text-cyan-300">facultyDatabase.syncStudentProgress(student);</p>
                <p className="text-purple-400">&#125;</p>
              </div>

            </div>
          </div>

          {/* Quick Key Highlights Footnote */}
          <div className="relative z-10 pt-2 grid grid-cols-3 gap-2 text-center text-[11px] text-slate-400">
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <b className="text-white block text-xs">100% Secure</b>
              <span>Student Credentials Protected</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <b className="text-orange-400 block text-xs">Snapchat Streak</b>
              <span>Daily Consistency Fire 🔥</span>
            </div>
            <div className="p-2 rounded-xl bg-slate-950/60 border border-slate-800">
              <b className="text-emerald-400 block text-xs">Faculty Oversight</b>
              <span>Progress Database Tracked</span>
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
              {authMode === 'forgot_request' && 'Reset Student Password'}
              {authMode === 'forgot_verify' && 'Verify OTP & Set New Password'}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {authMode === 'login' && 'Access your daily attendance register, track streak, and practice PYQs.'}
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
                    placeholder="Enter email (e.g. admin@studytrack.com)"
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

              {/* Discreet Faculty Admin Quick Fill */}
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-center">
                <button
                  type="button"
                  onClick={() => {
                    setLoginIdentifier('admin@studytrack.com');
                    setLoginPassword('Admin@Password2026');
                  }}
                  className="text-[11px] text-slate-500 hover:text-indigo-400 transition flex items-center justify-center gap-1 mx-auto"
                >
                  <ShieldAlert className="w-3 h-3 text-indigo-400" />
                  <span>Faculty Admin Autofill (admin@studytrack.com)</span>
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
                      placeholder="1"
                      className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
                    />
                  </div>
                </div>
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
                    className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
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
                <span>Register & Begin Day {startingStreak || 1}</span>
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
                    className="absolute right-3.5 top-2 text-slate-400 hover:text-white transition p-0.5"
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

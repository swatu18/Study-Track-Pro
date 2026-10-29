import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  X, Sparkles, User, Mail, Lock, Flame, ArrowRight, Eye, EyeOff, 
  KeyRound, ShieldCheck, CheckCircle2, AlertCircle, RefreshCw, Send
} from 'lucide-react';

export const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const { loginUser, registerUser, requestPasswordResetOtp, resetPasswordWithOtp } = useAuth();
  
  // Modes: 'login' | 'signup' | 'forgot_request' | 'forgot_verify'
  const [mode, setMode] = useState(initialMode);

  // Form Fields
  const [loginIdentifier, setLoginIdentifier] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [target, setTarget] = useState('Both (TCS + Banking)');

  // Password visibility states
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showResetPassword, setShowResetPassword] = useState(false);

  // Forgot password OTP flow states
  const [resetEmail, setResetEmail] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [dispatchedOtpNotice, setDispatchedOtpNotice] = useState(null);

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const resetMessages = () => {
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleLogin = (e) => {
    e.preventDefault();
    resetMessages();
    if (!loginIdentifier.trim() || !loginPassword) {
      setErrorMessage('Please enter both your email/username and password.');
      return;
    }
    const res = loginUser(loginIdentifier, loginPassword);
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    resetMessages();
    if (!name.trim() || !email.trim() || !password) {
      setErrorMessage('Please fill in all mandatory fields.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('Security Rule: Password must be at least 6 characters.');
      return;
    }
    const res = registerUser({ name, email, password, target, startingStreak: 1 });
    if (res.success) {
      onClose();
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleRequestOtp = (e) => {
    e.preventDefault();
    resetMessages();
    if (!resetEmail.trim()) {
      setErrorMessage('Please provide your registered student email address.');
      return;
    }
    const res = requestPasswordResetOtp(resetEmail);
    if (res.success) {
      setDispatchedOtpNotice(res.otp);
      setSuccessMessage(`Security OTP generated for ${res.email}! Verification code sent.`);
      setMode('forgot_verify');
    } else {
      setErrorMessage(res.error);
    }
  };

  const handleVerifyOtpAndReset = (e) => {
    e.preventDefault();
    resetMessages();
    if (!enteredOtp.trim() || !newPassword) {
      setErrorMessage('Please enter the 6-digit OTP code and your new password.');
      return;
    }
    const res = resetPasswordWithOtp(resetEmail, enteredOtp, newPassword);
    if (res.success) {
      setSuccessMessage(res.message);
      // Pre-fill login
      setLoginIdentifier(resetEmail);
      setLoginPassword('');
      setTimeout(() => {
        setMode('login');
      }, 1500);
    } else {
      setErrorMessage(res.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl p-6 sm:p-8 overflow-hidden">
        
        {/* Decorative background aura */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-500 to-orange-500 text-white shadow-lg shadow-orange-500/25 mb-3">
            {mode === 'login' && <Lock className="w-6 h-6" />}
            {mode === 'signup' && <User className="w-6 h-6" />}
            {(mode === 'forgot_request' || mode === 'forgot_verify') && <KeyRound className="w-6 h-6 animate-pulse" />}
          </div>

          <h2 className="text-2xl font-black text-white">
            {mode === 'login' && 'Sign In to Study Track Pro'}
            {mode === 'signup' && 'Create Student Account'}
            {mode === 'forgot_request' && 'Forgot Your Password?'}
            {mode === 'forgot_verify' && 'Verify OTP & Reset Password'}
          </h2>

          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
            {mode === 'login' && 'Enter your credentials to access your daily attendance, streak, and PYQ tests.'}
            {mode === 'signup' && 'Register your individual profile. Your attendance & study analytics will be tracked separately.'}
            {mode === 'forgot_request' && 'Enter your registered email ID to receive a secure 6-digit OTP code.'}
            {mode === 'forgot_verify' && 'Enter the OTP code received on your email and choose a strong new password.'}
          </p>
        </div>

        {/* Tab Switcher (Visible in Login & Sign Up) */}
        {(mode === 'login' || mode === 'signup') && (
          <div className="flex bg-slate-950 p-1 rounded-xl mb-6 border border-slate-800">
            <button
              type="button"
              onClick={() => { setMode('login'); resetMessages(); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'login' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setMode('signup'); resetMessages(); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg transition ${
                mode === 'signup' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sign Up (New Student)
            </button>
          </div>
        )}

        {/* Error Notification */}
        {errorMessage && (
          <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs flex items-start gap-2">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Success Notification */}
        {successMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ----------------- MODE: LOGIN ----------------- */}
        {mode === 'login' && (
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
                  placeholder="Enter your student email or username"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-xs font-semibold text-slate-300">Password</label>
                <button
                  type="button"
                  onClick={() => {
                    setMode('forgot_request');
                    setResetEmail(loginIdentifier);
                    resetMessages();
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
                  className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
                {/* Show/Hide Password Eye Button */}
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
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition flex items-center justify-center space-x-2"
            >
              <span>Sign In & Continue Streak</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ----------------- MODE: SIGN UP ----------------- */}
        {mode === 'signup' && (
          <form onSubmit={handleSignUp} className="space-y-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Full Student Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
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
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
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
                  className="absolute right-3.5 top-2 text-slate-400 hover:text-white transition p-0.5"
                  title={showSignupPassword ? "Hide password" : "Show password"}
                >
                  {showSignupPassword ? <EyeOff className="w-4 h-4 text-orange-400" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition flex items-center justify-center space-x-2 mt-2"
            >
              <span>Create Student Account & Begin Day 1</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* ----------------- MODE: FORGOT PASSWORD (STEP 1 - REQUEST OTP) ----------------- */}
        {mode === 'forgot_request' && (
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
              <p className="text-[11px] text-slate-500 mt-1.5">
                We will generate an OTP security code to verify your identity.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition flex items-center justify-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Generate OTP Verification Code</span>
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => { setMode('login'); resetMessages(); }}
                className="text-xs text-slate-400 hover:text-white underline font-semibold"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}

        {/* ----------------- MODE: FORGOT PASSWORD (STEP 2 - ENTER OTP & RESET) ----------------- */}
        {mode === 'forgot_verify' && (
          <form onSubmit={handleVerifyOtpAndReset} className="space-y-4">
            {dispatchedOtpNotice && (
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
                  {dispatchedOtpNotice}
                </div>
                <p className="text-[10px] text-slate-400 text-center">
                  Copy or type this 6-digit code into the box below to authorize password update.
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
                  placeholder="New strong password (min. 6 chars)"
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
              className="w-full py-3 rounded-xl font-bold text-xs bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25 hover:from-emerald-600 hover:to-teal-600 transition flex items-center justify-center space-x-2"
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
                className="text-amber-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Resend OTP</span>
              </button>

              <button
                type="button"
                onClick={() => { setMode('login'); resetMessages(); }}
                className="text-slate-400 hover:text-white underline"
              >
                Cancel
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
};

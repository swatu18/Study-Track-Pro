import React, { useState } from 'react';
import { AuthProvider, useAuth, getTodayKey } from './context/AuthContext';
import { Header } from './components/Header';
import { WelcomeConfettiBanner } from './components/WelcomeConfettiBanner';
import { DailyAttendanceRegister } from './components/DailyAttendanceRegister';
import { SkillDiagnostics } from './components/SkillDiagnostics';
import { PracticeArena } from './components/PracticeArena';
import { MockTestModal } from './components/MockTestModal';
import { AuthModal } from './components/AuthModal';
import { DailySprintChecklist } from './components/DailySprintChecklist';
import { PeerLeaderboard } from './components/PeerLeaderboard';
import { mockTestsData } from './data/mockTestsData';
import { Flame, CheckCircle, Clock, Zap, Award, ArrowRight, TrendingUp, Sparkles, BookOpen } from 'lucide-react';

function DashboardHome({ setCurrentView, onLaunchMock, onSelectTopic }) {
  const { currentUser, punchTodayAttendance } = useAuth();
  const todayKey = getTodayKey();
  const isMarked = currentUser?.attendanceDates?.includes(todayKey);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Login Confetti & Welcome Banner */}
      <WelcomeConfettiBanner
        onStartMock={() => onLaunchMock("mock-tcs-nqt-day1")}
        onGoPractice={() => setCurrentView('practice')}
      />

      {/* Hero Streak & Attendance Punch Card */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Flame & Status */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-500 to-red-600 rounded-3xl blur-md opacity-75 group-hover:opacity-100 transition animate-pulse"></div>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-slate-950 to-slate-900 border border-orange-500/50 flex flex-col items-center justify-center shadow-xl">
                <Flame className="w-12 h-12 text-orange-500 animate-bounce fill-orange-500" />
                <span className="text-xl sm:text-2xl font-black text-white -mt-1">{currentUser?.streak || 10}</span>
                <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase">STREAK</span>
              </div>
            </div>

            <div className="flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  Snapchat-Style Habit Streak
                </span>

                {isMarked ? (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Attendance Marked Today
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1 animate-pulse">
                    <Clock className="w-3 h-3" />
                    Attendance Pending Today
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome to Day {currentUser?.streak || 10}, {currentUser?.name?.split(' ')[0]}! 🔥
              </h1>

              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                {isMarked
                  ? `Your attendance is locked in for today! Your continuous streak is at ${currentUser?.streak} days. Practice more PYQs or challenge yourself with a mock test.`
                  : `You are on Day ${currentUser?.streak || 10}! Solve at least 1 PYQ or click Punch below to mark today's attendance format and maintain your streak.`}
              </p>

              {/* Action buttons */}
              <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-3">
                {!isMarked ? (
                  <button
                    onClick={punchTodayAttendance}
                    className="px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold bg-gradient-to-r from-orange-500 via-amber-500 to-orange-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center gap-2 animate-bounce"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Punch Today's Attendance</span>
                  </button>
                ) : (
                  <button
                    disabled
                    className="px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 cursor-default flex items-center gap-2"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>Attendance Stamped Today</span>
                  </button>
                )}

                <button
                  onClick={() => setCurrentView('practice')}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition flex items-center gap-1.5"
                >
                  <Zap className="w-4 h-4 text-amber-400" />
                  <span>Solve 1 PYQ</span>
                </button>

                <button
                  onClick={() => onLaunchMock("mock-tcs-nqt-day1")}
                  className="px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 transition flex items-center gap-1.5"
                >
                  <Award className="w-4 h-4 text-indigo-400" />
                  <span>Day 10 Mock Test</span>
                </button>
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Days Attended</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-emerald-400">{currentUser?.attendanceDates?.length || 10}</span>
                <span className="text-xs text-slate-500 font-medium">100% Rate</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Longest Streak</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-amber-400">{currentUser?.longestStreak || 10}d</span>
                <span className="text-xs text-amber-500/80 font-medium">Record</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Questions Solved</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-cyan-400">{currentUser?.solvedQuestions?.length || 0}</span>
                <span className="text-xs text-slate-500 font-medium">PYQs</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 flex flex-col justify-between">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Study Minutes</span>
              <div className="mt-2 flex items-baseline justify-between">
                <span className="text-2xl font-black text-purple-400">{currentUser?.minutesStudied || 0}m</span>
                <span className="text-xs text-slate-500 font-medium">Focus</span>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Daily Sprint & Checklist */}
      <DailySprintChecklist />

      {/* Dual Tracks Cards */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-black text-white">Select Your Preparation Track</h3>
            <p className="text-xs text-slate-400">Choose between TCS NQT & Banking Exams</p>
          </div>
          <button
            onClick={() => setCurrentView('practice')}
            className="text-xs text-orange-400 hover:text-orange-300 font-semibold flex items-center gap-1"
          >
            <span>Browse All Questions</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Track A */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition group shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Track A • IT Placement
              </span>
              <span className="text-xs font-semibold text-slate-400">Foundation & Advanced</span>
            </div>
            <h4 className="text-xl font-black text-white group-hover:text-orange-400 transition">
              TCS NQT (National Qualifier Test)
            </h4>
            <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
              Numerical Ability, Logical Reasoning, Verbal Ability, and In-place Coding Sandbox.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Percentages</span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Time & Work</span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Hands-on Coding</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('practice')}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 transition text-center"
              >
                Practice TCS PYQs
              </button>
              <button
                onClick={() => onLaunchMock("mock-tcs-nqt-day1")}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Day 10 Mock
              </button>
            </div>
          </div>

          {/* Track B */}
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 hover:border-indigo-500/40 transition group shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                Track B • Govt & Banking
              </span>
              <span className="text-xs font-semibold text-slate-400">IBPS / SBI PO & Clerk</span>
            </div>
            <h4 className="text-xl font-black text-white group-hover:text-indigo-400 transition">
              Banking Exams (Prelims & Mains)
            </h4>
            <p className="text-xs text-slate-400 mt-1 mb-4 leading-relaxed">
              Quantitative Aptitude, Seating Puzzles, English Error Spotting, and Banking Awareness with negative marking.
            </p>
            <div className="flex flex-wrap gap-2 mb-5">
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Approximation</span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">Circular Puzzles</span>
              <span className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-800 text-slate-300">RBI Policy</span>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCurrentView('practice')}
                className="flex-1 py-2.5 rounded-xl font-bold text-xs bg-indigo-600 hover:bg-indigo-500 text-white shadow-md shadow-indigo-600/20 transition text-center"
              >
                Practice Banking PYQs
              </button>
              <button
                onClick={() => onLaunchMock("mock-banking-prelims-1")}
                className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition"
              >
                Speed Mock
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics summary preview */}
      <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <span className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h4 className="text-base font-bold text-white">Diagnostics: "Good At" vs "Low In"</h4>
              <p className="text-xs text-slate-400">Live accuracy evaluation to guide your daily activity</p>
            </div>
          </div>
          <button
            onClick={() => setCurrentView('diagnostics')}
            className="text-xs text-orange-400 hover:underline font-semibold flex items-center gap-1"
          >
            <span>Full Radar</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Object.entries(currentUser?.topicStats || {}).slice(0, 4).map(([topic, stats]) => {
            const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
            const isGood = acc >= 75;
            const isLow = acc < 50;

            return (
              <div key={topic} className="p-4 rounded-2xl bg-slate-950 border border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white truncate max-w-[130px]">{topic}</span>
                  <span className={`text-xs font-bold ${isGood ? 'text-emerald-400' : isLow ? 'text-rose-400' : 'text-amber-400'}`}>
                    {acc}%
                  </span>
                </div>
                <div className="mt-2 w-full bg-slate-800 rounded-full h-1">
                  <div
                    className={`h-1 rounded-full ${isGood ? 'bg-emerald-500' : isLow ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${acc}%` }}
                  ></div>
                </div>
                <div className="mt-2 flex items-center justify-between text-[10px] text-slate-400">
                  <span>{stats.correct}/{stats.total} Solved</span>
                  <span className={`font-semibold ${isGood ? 'text-emerald-400' : isLow ? 'text-rose-400' : 'text-amber-400'}`}>
                    {isGood ? 'Good at' : isLow ? 'Low in this' : 'Moderate'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MainApp() {
  const [currentView, setCurrentView] = useState('dashboard');
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMockOpen, setIsMockOpen] = useState(false);
  const [selectedMockId, setSelectedMockId] = useState("mock-tcs-nqt-day1");
  const [targetTopic, setTargetTopic] = useState(null);

  const handleLaunchMock = (mockId = "mock-tcs-nqt-day1") => {
    setSelectedMockId(mockId);
    setIsMockOpen(true);
  };

  const handleSelectTopic = (topicName) => {
    setTargetTopic(topicName);
    setCurrentView('practice');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLaunchMock={handleLaunchMock}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'dashboard' && (
          <DashboardHome
            setCurrentView={setCurrentView}
            onLaunchMock={handleLaunchMock}
            onSelectTopic={handleSelectTopic}
          />
        )}

        {currentView === 'attendance' && <DailyAttendanceRegister />}

        {currentView === 'practice' && (
          <PracticeArena
            initialTopic={targetTopic}
          />
        )}

        {currentView === 'diagnostics' && (
          <SkillDiagnostics onPracticeTopic={handleSelectTopic} />
        )}

        {currentView === 'mock-tests' && (
          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
              <h2 className="text-xl sm:text-2xl font-black text-white">Full-Length Real Mock Tests</h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Simulated exams with countdown timers, question navigation palettes, real score calculations, and full answer review.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {mockTestsData.map(mock => (
                <div
                  key={mock.id}
                  className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 transition flex flex-col justify-between shadow-xl"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="px-3 py-1 rounded-full text-xs font-bold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                        {mock.track}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">⏱️ {mock.durationMinutes} Minutes</span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-2">{mock.title}</h3>
                    <p className="text-xs text-slate-400 mb-4">{mock.description}</p>

                    <div className="flex items-center space-x-4 text-xs text-slate-300 mb-6">
                      <span>Questions: <b className="text-white">{mock.questions.length}</b></span>
                      <span>Total Marks: <b className="text-amber-400">{mock.totalMarks}</b></span>
                      <span>Negative: <b className="text-rose-400">{mock.negativeMarking > 0 ? `-${mock.negativeMarking}` : 'None'}</b></span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleLaunchMock(mock.id)}
                    className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center justify-center gap-2"
                  >
                    <span>Launch Timed Mock Test</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'leaderboard' && (
          <PeerLeaderboard onOpenAddFriend={() => setIsAuthOpen(true)} />
        )}
      </main>

      <footer className="border-t border-slate-800/80 bg-slate-950 py-6 text-center text-xs text-slate-500">
        <p>Study Track Pro • Built for TCS NQT & Banking Aspirants • Daily Attendance & Habit Tracker</p>
      </footer>

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
      />

      <MockTestModal
        isOpen={isMockOpen}
        onClose={() => setIsMockOpen(false)}
        selectedMockId={selectedMockId}
      />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

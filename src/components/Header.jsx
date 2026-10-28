import React, { useState } from 'react';
import { useAuth, getTodayKey } from '../context/AuthContext';
import { Flame, CheckCircle, Clock, ChevronDown, User, LogOut, Trophy, Calendar } from 'lucide-react';

export const Header = ({ currentView, setCurrentView, onOpenAuth, onLaunchMock }) => {
  const { currentUser, logoutUser, punchTodayAttendance } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const todayKey = getTodayKey();
  const isMarkedToday = currentUser?.attendanceDates?.includes(todayKey);

  return (
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div 
          onClick={() => setCurrentView('dashboard')}
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-orange-500 to-red-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
            <Flame className="w-6 h-6 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="font-black text-xl tracking-tight text-white">Study Track</span>
              <span className="font-black text-xl tracking-tight text-orange-400">PRO</span>
            </div>
            <p className="text-[10px] text-slate-400 hidden sm:block">TCS NQT & Banking Daily Attendance Platform</p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="hidden md:flex items-center space-x-1 bg-slate-950/70 p-1 rounded-2xl border border-slate-800">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'dashboard'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('attendance')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'attendance'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Attendance Register
          </button>
          <button
            onClick={() => setCurrentView('practice')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'practice'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            PYQ Practice
          </button>
          <button
            onClick={() => setCurrentView('diagnostics')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'diagnostics'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Good vs Low
          </button>
          <button
            onClick={() => setCurrentView('mock-tests')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'mock-tests'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Mock Tests
          </button>
          <button
            onClick={() => setCurrentView('leaderboard')}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              currentView === 'leaderboard'
                ? 'bg-orange-500 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Friends
          </button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {currentUser ? (
            <>
              {/* Snapchat Streak Pill */}
              <div
                onClick={() => setCurrentView('attendance')}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 font-black text-xs sm:text-sm cursor-pointer hover:border-orange-500/60 transition shadow-sm"
                title={`${currentUser.streak} Days Continuous Learning Streak!`}
              >
                <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-bounce" />
                <span>{currentUser.streak} <span className="font-normal text-slate-300 text-xs">Days</span></span>
              </div>

              {/* Punch Button */}
              <button
                onClick={punchTodayAttendance}
                disabled={isMarkedToday}
                className={`hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border transition ${
                  isMarkedToday
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400 cursor-default'
                    : 'bg-orange-500 hover:bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-500/20 animate-pulse'
                }`}
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>{isMarkedToday ? 'Marked Present' : 'Punch In'}</span>
              </button>

              {/* User Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center space-x-2 p-1.5 rounded-xl hover:bg-slate-800 border border-slate-700/60 transition"
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-indigo-500 to-purple-600 flex items-center justify-center font-bold text-white text-xs">
                    {currentUser.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-xs font-bold text-slate-200 hidden lg:inline max-w-[90px] truncate">
                    {currentUser.name.split(' ')[0]}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl py-2 z-50">
                    <div className="px-4 py-2 border-b border-slate-800">
                      <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                      <p className="text-[11px] text-slate-400 truncate">{currentUser.email}</p>
                      <span className="inline-block mt-1 text-[10px] text-amber-400 font-semibold">
                        Track: {currentUser.target}
                      </span>
                    </div>

                    <button
                      onClick={() => { setMenuOpen(false); setCurrentView('attendance'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Calendar className="w-4 h-4 text-orange-400" />
                      Attendance Register
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); setCurrentView('diagnostics'); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <Trophy className="w-4 h-4 text-amber-400" />
                      Good vs Low Radar
                    </button>
                    <button
                      onClick={() => { setMenuOpen(false); onOpenAuth(); }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-300 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-blue-400" />
                      Switch Learner / Add Friend
                    </button>

                    <div className="border-t border-slate-800 my-1"></div>

                    <button
                      onClick={() => { setMenuOpen(false); logoutUser(); }}
                      className="w-full text-left px-4 py-2 text-xs text-red-400 hover:bg-slate-800 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={onOpenAuth}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25 transition"
            >
              Sign In / Register
            </button>
          )}
        </div>

      </div>

      {/* Mobile nav */}
      <div className="md:hidden flex items-center justify-around py-2 border-t border-slate-800/80 bg-slate-950/80 text-[11px]">
        <button
          onClick={() => setCurrentView('dashboard')}
          className={`px-2 py-1 rounded ${currentView === 'dashboard' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          Home
        </button>
        <button
          onClick={() => setCurrentView('attendance')}
          className={`px-2 py-1 rounded ${currentView === 'attendance' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          Register
        </button>
        <button
          onClick={() => setCurrentView('practice')}
          className={`px-2 py-1 rounded ${currentView === 'practice' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          PYQs
        </button>
        <button
          onClick={() => setCurrentView('diagnostics')}
          className={`px-2 py-1 rounded ${currentView === 'diagnostics' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          Good vs Low
        </button>
        <button
          onClick={() => setCurrentView('mock-tests')}
          className={`px-2 py-1 rounded ${currentView === 'mock-tests' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          Mocks
        </button>
        <button
          onClick={() => setCurrentView('leaderboard')}
          className={`px-2 py-1 rounded ${currentView === 'leaderboard' ? 'text-orange-400 font-bold' : 'text-slate-400'}`}
        >
          Friends
        </button>
      </div>
    </header>
  );
};

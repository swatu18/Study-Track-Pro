import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, Play, ArrowRight, X } from 'lucide-react';

export const WelcomeConfettiBanner = ({ onStartMock, onGoPractice }) => {
  const { loginBanner, clearLoginBanner, currentUser } = useAuth();

  if (!loginBanner) return null;

  return (
    <div className="relative overflow-hidden mb-6 p-5 sm:p-6 rounded-3xl bg-gradient-to-r from-orange-600/30 via-amber-600/25 to-red-600/30 border border-orange-500/40 shadow-2xl backdrop-blur-md">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        <div className="flex items-start space-x-3.5">
          <div className="p-3 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 flex-shrink-0">
            <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
                Official Check-In 🎉
              </span>
              <span className="text-xs text-amber-400 font-semibold">
                Day {currentUser?.streak || 10} Consistency Active
              </span>
            </div>
            <h3 className="text-base sm:text-xl font-black text-white mt-1">
              {loginBanner.message}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              Consistent daily practice is your ticket to cracking TCS NQT & Banking exams. Let's make today count!
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex items-center space-x-2.5 w-full sm:w-auto">
          <button
            onClick={() => {
              clearLoginBanner();
              onStartMock();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-bold text-xs bg-white text-slate-950 hover:bg-slate-100 shadow-md transition flex items-center justify-center space-x-1.5"
          >
            <Play className="w-3.5 h-3.5 fill-current text-orange-600" />
            <span>Start Mock Test</span>
          </button>

          <button
            onClick={() => {
              clearLoginBanner();
              onGoPractice();
            }}
            className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl font-semibold text-xs bg-slate-900/80 hover:bg-slate-800 text-white border border-slate-700 transition flex items-center justify-center space-x-1.5"
          >
            <span>Practice PYQs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={clearLoginBanner}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/60 transition"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

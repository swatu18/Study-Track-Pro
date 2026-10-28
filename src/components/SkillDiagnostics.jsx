import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, AlertTriangle, CheckCircle, ArrowRight, BookOpen, Target } from 'lucide-react';

export const SkillDiagnostics = ({ onPracticeTopic }) => {
  const { currentUser } = useAuth();
  const topicStats = currentUser?.topicStats || {};

  const categories = {
    good: [],
    moderate: [],
    low: []
  };

  Object.entries(topicStats).forEach(([topic, stats]) => {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    const item = {
      name: topic,
      correct: stats.correct,
      total: stats.total,
      accuracy
    };

    if (accuracy >= 75) {
      categories.good.push(item);
    } else if (accuracy >= 50) {
      categories.moderate.push(item);
    } else {
      categories.low.push(item);
    }
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center space-x-3 mb-2">
          <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Trophy className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Skill Diagnostics: "Completed / Good At / Low In"
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Live automated performance radar showing what you have completed, what you have mastered, and where you are low.
            </p>
          </div>
        </div>
      </div>

      {/* 3 Pillars */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Pillar 1: Good At */}
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 flex flex-col shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="font-bold text-sm sm:text-base text-emerald-400">Completed & Very Good At</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-500/20 text-emerald-300">
              {categories.good.length} Topics
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Mastered topics with ≥ 75% accuracy. High confidence for TCS NQT & Banking.
          </p>

          <div className="space-y-3 flex-1">
            {categories.good.length > 0 ? (
              categories.good.map(item => (
                <div key={item.name} className="p-3.5 rounded-2xl bg-slate-950/80 border border-emerald-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-xs font-bold text-emerald-400">{item.accuracy}%</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${item.accuracy}%` }}></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.correct}/{item.total} Questions Correct</span>
                    <span className="text-emerald-400 font-semibold">Strong Mastery</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Solve more questions to build your strong topics list!
              </div>
            )}
          </div>
        </div>

        {/* Pillar 2: Moderate Practice Needed */}
        <div className="bg-slate-900/90 border border-amber-500/30 rounded-3xl p-6 flex flex-col shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-amber-500/20 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-amber-500"></span>
              <h3 className="font-bold text-sm sm:text-base text-amber-400">Moderate Practice Needed</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-500/20 text-amber-300">
              {categories.moderate.length} Topics
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Between 50% and 74% accuracy. Need a few more PYQs to solidify.
          </p>

          <div className="space-y-3 flex-1">
            {categories.moderate.length > 0 ? (
              categories.moderate.map(item => (
                <div key={item.name} className="p-3.5 rounded-2xl bg-slate-950/80 border border-amber-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-xs font-bold text-amber-400">{item.accuracy}%</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-1.5 rounded-full" style={{ width: `${item.accuracy}%` }}></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span>{item.correct}/{item.total} Questions Correct</span>
                    <button
                      onClick={() => onPracticeTopic(item.name)}
                      className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
                    >
                      <span>Practice</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                Solve PYQs to identify intermediate topics.
              </div>
            )}
          </div>
        </div>

        {/* Pillar 3: I Am Very Low In */}
        <div className="bg-slate-900/90 border border-rose-500/30 rounded-3xl p-6 flex flex-col shadow-lg">
          <div className="flex items-center justify-between pb-4 border-b border-rose-500/20 mb-4">
            <div className="flex items-center space-x-2">
              <span className="w-3 h-3 rounded-full bg-rose-500 animate-ping"></span>
              <h3 className="font-bold text-sm sm:text-base text-rose-400">I Am Very Low In</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-rose-500/20 text-rose-300">
              {categories.low.length} Topics
            </span>
          </div>

          <p className="text-xs text-slate-400 mb-4">
            Accuracy &lt; 50%. High negative marking risk. Prioritize immediate revision.
          </p>

          <div className="space-y-3 flex-1">
            {categories.low.length > 0 ? (
              categories.low.map(item => (
                <div key={item.name} className="p-3.5 rounded-2xl bg-slate-950/80 border border-rose-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-xs sm:text-sm font-semibold text-white">{item.name}</span>
                    <span className="text-xs font-bold text-rose-400">{item.accuracy}%</span>
                  </div>
                  <div className="mt-2 w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-rose-500 h-1.5 rounded-full" style={{ width: `${item.accuracy}%` }}></div>
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="text-rose-400 font-semibold">{item.correct}/{item.total} Solved</span>
                    <button
                      onClick={() => onPracticeTopic(item.name)}
                      className="px-2.5 py-1 rounded-lg bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-[11px] font-bold flex items-center gap-1"
                    >
                      <span>Fix Now</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-slate-500 text-xs">
                No critically low topics identified right now. Keep up the high standard!
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

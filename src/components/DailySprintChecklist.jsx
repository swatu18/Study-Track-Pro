import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { CheckSquare, Square, Play, Pause, RotateCcw, Plus, Clock } from 'lucide-react';

export const DailySprintChecklist = () => {
  const { currentUser, toggleChecklist, addChecklist, logStudyTime } = useAuth();
  const [newGoal, setNewGoal] = useState('');

  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [sprintCount, setSprintCount] = useState(0);

  useEffect(() => {
    let timer = null;
    if (isRunning && secondsLeft > 0) {
      timer = setInterval(() => setSecondsLeft(s => s - 1), 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      setSprintCount(c => c + 1);
      logStudyTime(25);
      setSecondsLeft(25 * 60);
      alert("🎉 Great focus! 25 minutes logged into your study record.");
    }
    return () => clearInterval(timer);
  }, [isRunning, secondsLeft]);

  const handleAdd = (e) => {
    e.preventDefault();
    if (newGoal.trim()) {
      addChecklist(newGoal.trim());
      setNewGoal('');
    }
  };

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;
  const timeFormatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  const items = currentUser?.dailyChecklist || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
      
      {/* Daily Checklist */}
      <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col justify-between shadow-xl">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-5 h-5 text-orange-400" />
              <h3 className="text-base font-bold text-white">Daily Target Checklist</h3>
            </div>
            <span className="text-xs text-slate-400">
              {items.filter(c => c.completed).length}/{items.length} Completed
            </span>
          </div>

          <div className="space-y-2.5 mb-4">
            {items.map(item => (
              <div
                key={item.id}
                onClick={() => toggleChecklist(item.id)}
                className={`p-3 rounded-2xl border transition flex items-center space-x-3 cursor-pointer ${
                  item.completed
                    ? 'bg-emerald-500/10 border-emerald-500/20 text-slate-400 line-through'
                    : 'bg-slate-950/60 border-slate-800 text-slate-200 hover:border-slate-700'
                }`}
              >
                {item.completed ? (
                  <CheckSquare className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                ) : (
                  <Square className="w-4 h-4 text-slate-500 flex-shrink-0" />
                )}
                <span className="text-xs sm:text-sm font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={handleAdd} className="flex gap-2 pt-3 border-t border-slate-800">
          <input
            type="text"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
            placeholder="Add new daily goal (e.g. 5 Coding problems)..."
            className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-orange-500"
          />
          <button
            type="submit"
            className="px-3.5 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </form>
      </div>

      {/* Focus Timer */}
      <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950/30 border border-slate-800 rounded-3xl p-6 sm:p-7 flex flex-col items-center justify-center text-center shadow-xl">
        <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 mb-2 flex items-center gap-1">
          <Clock className="w-4 h-4" />
          Focus Study Sprint
        </span>

        <div className="my-3 text-5xl font-black font-mono tracking-tight text-white">
          {timeFormatted}
        </div>

        <p className="text-xs text-slate-400 mb-5">
          25m study sprint for TCS & Banking prep • {sprintCount} completed today
        </p>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 shadow-lg transition ${
              isRunning
                ? 'bg-amber-500 text-slate-950 hover:bg-amber-400'
                : 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-indigo-600/30'
            }`}
          >
            {isRunning ? (
              <>
                <Pause className="w-3.5 h-3.5 fill-current" />
                <span>Pause Sprint</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Start Sprint</span>
              </>
            )}
          </button>

          <button
            onClick={() => { setIsRunning(false); setSecondsLeft(25 * 60); }}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
            title="Reset"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  );
};

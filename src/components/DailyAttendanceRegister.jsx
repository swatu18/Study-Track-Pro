import React, { useState } from 'react';
import { useAuth, getTodayKey } from '../context/AuthContext';
import { Calendar, Flame, CheckCircle, Clock, Printer, Award, FileSpreadsheet, Sparkles } from 'lucide-react';

export const DailyAttendanceRegister = () => {
  const { currentUser, punchTodayAttendance } = useAuth();
  const [tabMode, setTabMode] = useState('sheet'); // 'sheet' | 'log'

  const todayKey = getTodayKey();
  const attendedDates = currentUser?.attendanceDates || [];
  const isTodayAttended = attendedDates.includes(todayKey);

  // Calendar calculations
  const now = new Date();
  const year = now.getFullYear();
  const monthIdx = now.getMonth();
  const monthName = now.toLocaleString('default', { month: 'long' });

  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const firstDayOfWeek = new Date(year, monthIdx, 1).getDay();

  const cells = [];
  for (let i = 0; i < firstDayOfWeek; i++) {
    cells.push(null);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dayStr = String(d).padStart(2, '0');
    const monthStr = String(monthIdx + 1).padStart(2, '0');
    const fullKey = `${year}-${monthStr}-${dayStr}`;
    const isAttended = attendedDates.includes(fullKey);
    const isToday = fullKey === todayKey;

    cells.push({
      day: d,
      dateKey: fullKey,
      isAttended,
      isToday
    });
  }

  const attendedDaysCount = attendedDates.length;
  const currentDayNumber = now.getDate();
  const attendancePercentage = Math.min(100, Math.round((attendedDaysCount / Math.max(1, currentDayNumber)) * 100));

  return (
    <div className="space-y-6">
      
      {/* Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2.5">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                Official Daily Attendance Register
              </h2>
              <span className="text-xs text-orange-400 font-semibold">
                Daily Activity Format for TCS NQT & Banking Aspirants
              </span>
            </div>
          </div>
          <p className="text-xs text-slate-400 mt-2 max-w-xl">
            Every day you solve at least 1 question, code, or take a mock test, your attendance is officially stamped here with an unbroken streak 🔥.
          </p>
        </div>

        {/* View toggles & punch */}
        <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
          {!isTodayAttended ? (
            <button
              onClick={punchTodayAttendance}
              className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 transition flex items-center gap-2 animate-bounce"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Punch Today's Attendance</span>
            </button>
          ) : (
            <div className="px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Present Today ({todayKey})</span>
            </div>
          )}

          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setTabMode('sheet')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                tabMode === 'sheet' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Sheet View
            </button>
            <button
              onClick={() => setTabMode('log')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                tabMode === 'log' ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Log Records
            </button>
          </div>

          <button
            onClick={() => window.print()}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            title="Print Attendance Sheet"
          >
            <Printer className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance Month</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-xl font-black text-white">{monthName} {year}</span>
            <span className="text-xs text-orange-400 font-bold">{daysInMonth} Days</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Days Attended</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400">{attendedDaysCount} Days</span>
            <span className="text-xs text-emerald-500 font-bold">100% Present</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Current Streak</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-orange-400 flex items-center gap-1">
              <Flame className="w-5 h-5 fill-orange-500 animate-pulse" />
              {currentUser?.streak || 10}d
            </span>
            <span className="text-xs text-slate-400">Unbroken</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance Rate</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">{attendancePercentage}%</span>
            <span className="text-xs text-amber-500 font-bold">Top Tier</span>
          </div>
        </div>
      </div>

      {/* Sheet View: 31-Day Calendar Grid */}
      {tabMode === 'sheet' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
            <div className="flex items-center space-x-3">
              <h3 className="text-base sm:text-lg font-black text-white">
                {monthName} {year} • Official Learner Sheet
              </h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold">
                Day {currentUser?.streak || 10} Milestone
              </span>
            </div>

            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-emerald-500/20 border border-emerald-500/50 inline-block"></span>
                <span className="text-slate-300">Present (🔥)</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-amber-500/20 border border-amber-500/50 inline-block"></span>
                <span className="text-slate-300">Today</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="w-3 h-3 rounded-md bg-slate-950 border border-slate-800 inline-block"></span>
                <span className="text-slate-500">Upcoming</span>
              </div>
            </div>
          </div>

          {/* Weekday Headers */}
          <div className="grid grid-cols-7 gap-2 mb-2 text-center text-xs font-bold text-slate-400 uppercase tracking-wider">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Day Cells Grid */}
          <div className="grid grid-cols-7 gap-2">
            {cells.map((cell, idx) => {
              if (!cell) {
                return <div key={`empty-${idx}`} className="h-20 sm:h-24 rounded-2xl bg-slate-950/20 border border-transparent"></div>;
              }

              return (
                <div
                  key={cell.dateKey}
                  className={`relative h-20 sm:h-24 p-2 sm:p-2.5 rounded-2xl border transition flex flex-col justify-between ${
                    cell.isAttended
                      ? 'bg-gradient-to-br from-emerald-950/40 via-slate-900 to-emerald-900/20 border-emerald-500/40 text-emerald-300 shadow-sm'
                      : cell.isToday
                      ? 'bg-amber-950/30 border-amber-500/50 text-amber-200'
                      : 'bg-slate-950/60 border-slate-800/80 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className={`text-xs sm:text-sm font-bold ${cell.isToday ? 'text-amber-400 underline underline-offset-4' : 'text-slate-300'}`}>
                      {cell.day}
                    </span>
                    {cell.isAttended && (
                      <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-orange-400 fill-orange-400 animate-pulse" />
                    )}
                  </div>

                  <div className="mt-auto">
                    {cell.isAttended ? (
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 text-[10px] font-bold">
                        <CheckCircle className="w-3 h-3" />
                        <span className="hidden sm:inline">Present</span>
                      </div>
                    ) : cell.isToday ? (
                      <div className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-400 text-[10px] font-semibold">
                        <Clock className="w-3 h-3" />
                        <span className="hidden sm:inline">Today</span>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-600 block text-right">—</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Log Records View */}
      {tabMode === 'log' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
          <h3 className="text-base sm:text-lg font-black text-white mb-4">
            Daily Attendance & Practice Punch Log
          </h3>

          <div className="divide-y divide-slate-800">
            {attendedDates.slice().reverse().map(dateStr => {
              const isToday = dateStr === todayKey;
              return (
                <div key={dateStr} className="py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-400 font-bold">
                      <Flame className="w-5 h-5 fill-orange-500" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-bold text-white">{dateStr}</span>
                        {isToday && (
                          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            Today
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Verified Attendance • Track: {currentUser?.target || 'Both'} • Streak: +1 Day
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1.5">
                    <CheckCircle className="w-3.5 h-3.5" />
                    Status: Stamped Present
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

    </div>
  );
};

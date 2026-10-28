import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Trophy, Flame, UserPlus } from 'lucide-react';

export const PeerLeaderboard = ({ onOpenAddFriend }) => {
  const { users, currentUser } = useAuth();

  const sorted = [...users].sort((a, b) => {
    if (b.streak !== a.streak) return b.streak - a.streak;
    return (b.solvedQuestions?.length || 0) - (a.solvedQuestions?.length || 0);
  });

  return (
    <div className="space-y-6">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
              <Trophy className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              Friends & Peer Streak Leaderboard
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Stay accountable together! The longer your unbroken streak, the higher you climb.
          </p>
        </div>

        <button
          onClick={onOpenAddFriend}
          className="px-4 py-2.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-md transition flex items-center gap-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Add Friend / Register Profile</span>
        </button>
      </div>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl">
        <div className="divide-y divide-slate-800">
          {sorted.map((user, idx) => {
            const isMe = user.id === currentUser?.id;
            const rank = idx + 1;

            return (
              <div
                key={user.id}
                className={`p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition ${
                  isMe ? 'bg-orange-500/10 border-l-4 border-l-orange-500' : 'hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-sm ${
                    rank === 1 ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-400/30' :
                    rank === 2 ? 'bg-slate-300 text-slate-950' :
                    rank === 3 ? 'bg-amber-700 text-white' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {rank === 1 ? '🥇' : rank === 2 ? '🥈' : rank === 3 ? '🥉' : rank}
                  </div>

                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-white text-base">
                    {user.name.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">{user.name}</span>
                      {isMe && (
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30">
                          You
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
                      <span>Target: <b className="text-slate-300">{user.target}</b></span>
                      <span>•</span>
                      <span>{user.attendanceDates?.length || 0} Days Attended</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 ml-12 sm:ml-0">
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Questions Solved</span>
                    <span className="text-sm font-bold text-cyan-400">
                      {user.solvedQuestions?.length || 0} PYQs
                    </span>
                  </div>

                  <div className="flex items-center space-x-1.5 px-3.5 py-2 rounded-2xl bg-gradient-to-r from-orange-500/20 to-amber-500/20 border border-orange-500/30 text-orange-400 font-black text-sm">
                    <Flame className="w-4 h-4 fill-orange-500 animate-pulse" />
                    <span>{user.streak} <span className="text-xs font-normal text-slate-300">Days</span></span>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

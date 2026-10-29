import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  ShieldAlert, Users, Key, Clock, Award, CheckCircle, Search, 
  Eye, EyeOff, Activity, BookOpen, Flame, Lock, RefreshCw, FileText, UserCheck, BarChart3
} from 'lucide-react';

export const AdminDashboard = () => {
  const { users, currentUser, activityLogs, adminUpdateStudentPassword } = useAuth();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [overridePassword, setOverridePassword] = useState('');
  const [overrideSuccess, setOverrideSuccess] = useState('');
  const [revealedPasswords, setRevealedPasswords] = useState({});

  // Security Wall: If not logged in as Admin, reject with strict access denial
  if (!currentUser || currentUser.role !== 'admin') {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4 text-center animate-fadeIn">
        <div className="p-8 rounded-3xl bg-slate-900 border border-red-500/30 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-400 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black text-white">Access Denied • Restricted Portal</h2>
          <p className="text-sm text-slate-400 mt-2">
            The Administration Center is strictly reserved for the course faculty and administrator. 
            Students cannot access student credentials, logs, or overrides.
          </p>
          <div className="mt-6 p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
            Please sign in using your designated Administrator faculty credentials to access this dashboard.
          </div>
        </div>
      </div>
    );
  }

  const togglePasswordReveal = (userId) => {
    setRevealedPasswords(prev => ({
      ...prev,
      [userId]: !prev[userId]
    }));
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (u.target && u.target.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const studentsOnly = users.filter(u => u.role !== 'admin');
  const totalStudents = studentsOnly.length;
  const totalAttendanceLogged = users.reduce((acc, u) => acc + (u.attendanceDates?.length || 0), 0);
  const totalQuestionsSolved = users.reduce((acc, u) => acc + (u.solvedQuestions?.length || 0), 0);
  const totalMocksTaken = users.reduce((acc, u) => acc + (u.mockHistory?.length || 0), 0);

  const handleOverride = (e) => {
    e.preventDefault();
    if (!selectedStudent || !overridePassword) return;
    adminUpdateStudentPassword(selectedStudent.id, overridePassword);
    setOverrideSuccess(`Successfully updated password for ${selectedStudent.name}!`);
    setOverridePassword('');
    setTimeout(() => setOverrideSuccess(''), 4000);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900 border border-indigo-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3.5">
            <div className="p-3 rounded-2xl bg-gradient-to-tr from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-600/30 flex-shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Private Faculty Administrator Portal
                </span>
                <span className="text-xs text-amber-400 font-bold">
                  Logged in as: {currentUser.name}
                </span>
              </div>
              <h2 className="text-2xl font-black text-white mt-1">
                Student Central Credentials & Progress Monitor
              </h2>
              <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                This dashboard is private to you. Only you can view student credentials, progress diagnostics, attendance logs, and student activity.
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2 bg-slate-950/80 px-4 py-2 rounded-2xl border border-indigo-500/20 text-xs text-slate-300">
            <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>Strict Access Enforced</span>
          </div>
        </div>
      </div>

      {/* Overview Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Registered Students</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-white">{totalStudents}</span>
            <span className="text-xs text-indigo-400 font-bold">In Database</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Attendance Days Punched</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-emerald-400">{totalAttendanceLogged}</span>
            <span className="text-xs text-emerald-500 font-bold">Total Stamped</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">PYQ Questions Solved</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-cyan-400">{totalQuestionsSolved}</span>
            <span className="text-xs text-cyan-500 font-bold">Practiced</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Mock Tests Submitted</span>
          <div className="mt-2 flex items-baseline justify-between">
            <span className="text-2xl font-black text-amber-400">{totalMocksTaken}</span>
            <span className="text-xs text-amber-500 font-bold">Evaluations</span>
          </div>
        </div>
      </div>

      {/* Student Database Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-400" />
              <span>Student Credentials Database & Progress</span>
            </h3>
            <p className="text-xs text-slate-400">
              Only visible to you. Shows exact email, password credentials, active streak, and attendance days.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filter by student name or email..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {overrideSuccess && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            <span>{overrideSuccess}</span>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Registered Email</th>
                <th className="py-3 px-4">Student Password</th>
                <th className="py-3 px-4">Target Exam</th>
                <th className="py-3 px-4 text-center">Active Streak</th>
                <th className="py-3 px-4 text-center">Attendance Days</th>
                <th className="py-3 px-4 text-center">Questions Solved</th>
                <th className="py-3 px-4 text-right">Admin Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {filteredUsers.map((user) => {
                const isUserAdmin = user.role === 'admin';
                const isRevealed = revealedPasswords[user.id];

                return (
                  <tr key={user.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3.5 px-4 font-semibold text-white flex items-center gap-2">
                      <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center font-bold text-xs text-white">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <span>{user.name}</span>
                        {isUserAdmin && (
                          <span className="block text-[9px] uppercase font-bold text-indigo-400">You (Admin)</span>
                        )}
                      </div>
                    </td>

                    <td className="py-3.5 px-4 font-mono text-slate-300">
                      {user.email}
                    </td>

                    <td className="py-3.5 px-4 font-mono">
                      <div className="inline-flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                        <span className="font-bold text-amber-300">{isRevealed ? user.password : '••••••••'}</span>
                        <button
                          type="button"
                          onClick={() => togglePasswordReveal(user.id)}
                          className="text-slate-500 hover:text-white transition"
                          title={isRevealed ? "Hide password" : "Show password"}
                        >
                          {isRevealed ? <EyeOff className="w-3.5 h-3.5 text-orange-400" /> : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 font-medium text-[11px]">
                        {user.target || 'Both (TCS + Bank)'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 font-bold text-orange-400">
                        <Flame className="w-3.5 h-3.5 fill-orange-500" />
                        {user.streak || 0}d
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-emerald-400">
                      {user.attendanceDates?.length || 0} Days
                    </td>

                    <td className="py-3.5 px-4 text-center font-semibold text-cyan-400">
                      {user.solvedQuestions?.length || 0} PYQs
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedStudent(user)}
                        className="px-2.5 py-1 rounded-lg bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 border border-indigo-500/30 font-semibold text-[11px] transition"
                      >
                        Inspect Progress
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Student Progress Inspection & Password Override */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl">
            <button
              onClick={() => setSelectedStudent(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800"
            >
              ✕
            </button>

            <h3 className="text-lg font-black text-white flex items-center gap-2 mb-1">
              <UserCheck className="w-5 h-5 text-indigo-400" />
              <span>Student Profile: {selectedStudent.name}</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">
              Registered Email: <b className="text-slate-200">{selectedStudent.email}</b> • Current Password: <b className="text-amber-400 font-mono">{selectedStudent.password}</b>
            </p>

            {/* Diagnostic breakdown */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 mb-5 space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400">Topics Practiced & Accuracy</span>
              <div className="flex flex-wrap gap-2 pt-1">
                {selectedStudent.topicStats && Object.keys(selectedStudent.topicStats).length > 0 ? (
                  Object.entries(selectedStudent.topicStats).map(([topic, stat]) => (
                    <span key={topic} className="px-2 py-1 rounded bg-slate-900 text-slate-300 text-[11px] border border-slate-800">
                      {topic}: <b>{stat.correct}/{stat.total}</b>
                    </span>
                  ))
                ) : (
                  <span className="text-slate-500 text-xs">No questions attempted yet.</span>
                )}
              </div>
            </div>

            {/* Override Form */}
            <form onSubmit={handleOverride} className="space-y-3">
              <label className="block text-xs font-semibold text-slate-300">
                Admin Password Override for this student:
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-2.5 w-4 h-4 text-slate-500" />
                <input
                  type="text"
                  required
                  value={overridePassword}
                  onChange={(e) => setOverridePassword(e.target.value)}
                  placeholder="Enter new password directly..."
                  className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-indigo-500 font-mono"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedStudent(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-white"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition"
                >
                  Update Student Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Activity Audit Stream */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-5 h-5 text-emerald-400" />
              <span>Real-Time Student Activity Stream</span>
            </h3>
            <p className="text-xs text-slate-400">
              Live audit records of who logged in, who signed out, when attendance was punched, and mock test scorecards.
            </p>
          </div>
          <span className="text-xs text-slate-500 font-mono">
            {activityLogs.length} Events Tracked
          </span>
        </div>

        <div className="divide-y divide-slate-800/80 max-h-96 overflow-y-auto">
          {activityLogs.map((log) => (
            <div key={log.id} className="py-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-start sm:items-center space-x-3">
                <span className="w-2 h-2 rounded-full bg-indigo-400 mt-1 sm:mt-0 flex-shrink-0"></span>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">{log.userName}</span>
                    <span className="text-[11px] text-slate-400 font-mono">({log.userEmail})</span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                      {log.action}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5">{log.details}</p>
                </div>
              </div>

              <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1 flex-shrink-0">
                <Clock className="w-3 h-3" />
                {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

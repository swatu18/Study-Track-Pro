import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { mockTestsData } from '../data/mockTestsData';
import { X, Clock, CheckCircle, Award, Flame, ChevronLeft, ChevronRight, Bookmark, RotateCcw } from 'lucide-react';

export const MockTestModal = ({ isOpen, onClose, selectedMockId = "mock-tcs-nqt-day1" }) => {
  const { logMockTestResult, currentUser } = useAuth();
  
  const [activeMock, setActiveMock] = useState(() => 
    mockTestsData.find(m => m.id === selectedMockId) || mockTestsData[0]
  );
  
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [markedForReview, setMarkedForReview] = useState(new Set());
  const [timeLeft, setTimeLeft] = useState(activeMock.durationMinutes * 60);
  const [isTestSubmitted, setIsTestSubmitted] = useState(false);
  const [scoreReport, setScoreReport] = useState(null);

  useEffect(() => {
    if (!isOpen || isTestSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isTestSubmitted]);

  const handleSwitchMock = (mock) => {
    setActiveMock(mock);
    setCurrentQIndex(0);
    setUserAnswers({});
    setMarkedForReview(new Set());
    setTimeLeft(mock.durationMinutes * 60);
    setIsTestSubmitted(false);
    setScoreReport(null);
  };

  if (!isOpen) return null;

  const currentQ = activeMock.questions[currentQIndex];

  const handleSelectOption = (optIndex) => {
    if (isTestSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [currentQIndex]: optIndex
    }));
  };

  const toggleMarkForReview = () => {
    setMarkedForReview(prev => {
      const updated = new Set(prev);
      if (updated.has(currentQIndex)) {
        updated.delete(currentQIndex);
      } else {
        updated.add(currentQIndex);
      }
      return updated;
    });
  };

  const handleSubmitTest = () => {
    let score = 0;
    let correctCount = 0;
    let wrongCount = 0;
    let unattemptedCount = 0;
    const topicBreakdown = {};

    activeMock.questions.forEach((q, idx) => {
      const topic = q.topic || "General";
      if (!topicBreakdown[topic]) {
        topicBreakdown[topic] = { correct: 0, total: 0 };
      }
      topicBreakdown[topic].total += 1;

      const chosen = userAnswers[idx];
      if (chosen === undefined) {
        unattemptedCount += 1;
      } else if (chosen === q.correctAnswer) {
        correctCount += 1;
        score += 1;
        topicBreakdown[topic].correct += 1;
      } else {
        wrongCount += 1;
        if (activeMock.negativeMarking > 0) {
          score -= activeMock.negativeMarking;
        }
      }
    });

    const accuracy = (correctCount + wrongCount) > 0
      ? Math.round((correctCount / (correctCount + wrongCount)) * 100)
      : 0;

    const report = {
      testId: activeMock.id,
      title: activeMock.title,
      track: activeMock.track,
      score: Math.max(0, Number(score.toFixed(2))),
      totalMarks: activeMock.totalMarks,
      correctCount,
      wrongCount,
      unattemptedCount,
      accuracy,
      topicBreakdown,
      date: new Date().toISOString().split('T')[0]
    };

    setScoreReport(report);
    setIsTestSubmitted(true);

    // Save to user profile & stamp attendance + streak!
    logMockTestResult(report);
  };

  const formatTimer = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-5xl h-[92vh] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="w-8 h-8 rounded-xl bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center font-bold text-sm">
              <Award className="w-4 h-4" />
            </span>
            <div>
              <h2 className="text-sm sm:text-base font-black text-white truncate max-w-xs sm:max-w-md">
                {activeMock.title}
              </h2>
              <span className="text-xs text-orange-400 font-semibold">{activeMock.track}</span>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {!isTestSubmitted && (
              <div className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 font-mono text-sm font-bold">
                <Clock className="w-4 h-4" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        {!isTestSubmitted ? (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
            
            {/* Left 8 Cols: Active Question */}
            <div className="lg:col-span-8 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto border-b lg:border-b-0 lg:border-r border-slate-800">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-800 text-slate-300">
                    Question {currentQIndex + 1} of {activeMock.questions.length}
                  </span>
                  <div className="flex items-center space-x-2 text-xs">
                    <span className="text-slate-400">Marks: <b className="text-emerald-400">+1.0</b></span>
                    {activeMock.negativeMarking > 0 && (
                      <span className="text-slate-400">Negative: <b className="text-rose-400">-{activeMock.negativeMarking}</b></span>
                    )}
                  </div>
                </div>

                <div className="text-xs text-amber-400 font-semibold mb-2">
                  Topic: {currentQ.topic} • Section: {currentQ.section}
                </div>

                <p className="text-sm sm:text-base font-medium text-slate-100 whitespace-pre-line leading-relaxed mb-6">
                  {currentQ.question}
                </p>

                <div className="space-y-3">
                  {currentQ.options.map((opt, optIdx) => {
                    const isSelected = userAnswers[currentQIndex] === optIdx;
                    return (
                      <button
                        key={optIdx}
                        onClick={() => handleSelectOption(optIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center space-x-3 text-xs sm:text-sm ${
                          isSelected
                            ? 'border-orange-500 bg-orange-500/20 text-orange-200 ring-1 ring-orange-500 font-semibold'
                            : 'border-slate-800 bg-slate-950/60 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Nav */}
              <div className="pt-6 mt-6 border-t border-slate-800 flex items-center justify-between">
                <button
                  disabled={currentQIndex === 0}
                  onClick={() => setCurrentQIndex(prev => prev - 1)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1 ${
                    currentQIndex > 0 ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-slate-900 text-slate-600'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>

                <button
                  onClick={toggleMarkForReview}
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition ${
                    markedForReview.has(currentQIndex)
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                      : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{markedForReview.has(currentQIndex) ? 'Marked' : 'Mark for Review'}</span>
                </button>

                {currentQIndex < activeMock.questions.length - 1 ? (
                  <button
                    onClick={() => setCurrentQIndex(prev => prev + 1)}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-orange-500 hover:bg-orange-600 text-white flex items-center gap-1 shadow-md shadow-orange-500/20"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleSubmitTest}
                    className="px-5 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-white flex items-center gap-1 shadow-md shadow-emerald-500/20 animate-pulse"
                  >
                    <span>Submit Mock</span>
                    <CheckCircle className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* Right 4 Cols: Question Palette */}
            <div className="lg:col-span-4 p-6 bg-slate-950 flex flex-col justify-between overflow-y-auto">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Question Navigation Palette
                </h4>

                <div className="grid grid-cols-5 gap-2 mb-6 max-h-72 overflow-y-auto pr-1">
                  {activeMock.questions.map((_, idx) => {
                    const isAnswered = userAnswers[idx] !== undefined;
                    const isMarked = markedForReview.has(idx);
                    const isCurrent = currentQIndex === idx;

                    let bgClass = "bg-slate-800 text-slate-400 border-slate-700";
                    if (isCurrent) {
                      bgClass = "ring-2 ring-white font-black";
                    }
                    if (isAnswered) {
                      bgClass += " bg-emerald-600 text-white border-emerald-500";
                    } else if (isMarked) {
                      bgClass += " bg-amber-500 text-slate-950 border-amber-400 font-bold";
                    }

                    return (
                      <button
                        key={idx}
                        onClick={() => setCurrentQIndex(idx)}
                        className={`h-9 rounded-xl border text-xs font-semibold transition ${bgClass}`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>

                <div className="space-y-2 text-xs text-slate-400 border-t border-slate-800 pt-4">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block"></span>
                    <span>Answered ({Object.keys(userAnswers).length})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-md bg-amber-500 inline-block"></span>
                    <span>Marked for Review ({markedForReview.size})</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-md bg-slate-800 inline-block"></span>
                    <span>Not Visited ({activeMock.questions.length - Object.keys(userAnswers).length})</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-800">
                <button
                  onClick={handleSubmitTest}
                  className="w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600 transition"
                >
                  Finish & Submit Test Now
                </button>
              </div>
            </div>

          </div>
        ) : (
          /* Scorecard */
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto space-y-6">
              
              <div className="text-center p-6 rounded-3xl bg-gradient-to-b from-orange-500/20 to-transparent border border-orange-500/30">
                <div className="inline-flex p-3 rounded-2xl bg-orange-500 text-white shadow-lg shadow-orange-500/30 mb-2">
                  <Flame className="w-8 h-8 animate-bounce fill-orange-500" />
                </div>
                <h3 className="text-2xl font-black text-white">
                  Mock Test Finished! 🎉
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  Attendance stamped for today! Your streak is active at {currentUser?.streak} days.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-semibold block">Total Score</span>
                  <span className="text-2xl font-black text-amber-400 mt-1 block">
                    {scoreReport.score} / {scoreReport.totalMarks}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-semibold block">Accuracy</span>
                  <span className="text-2xl font-black text-emerald-400 mt-1 block">
                    {scoreReport.accuracy}%
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-semibold block">Correct</span>
                  <span className="text-2xl font-black text-green-400 mt-1 block">
                    {scoreReport.correctCount}
                  </span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
                  <span className="text-xs text-slate-400 font-semibold block">Wrong</span>
                  <span className="text-2xl font-black text-rose-400 mt-1 block">
                    {scoreReport.wrongCount}
                  </span>
                </div>
              </div>

              {/* Diagnostics breakdown */}
              <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Topic Diagnostic ("Good At" vs "Low In")
                </h4>
                <div className="space-y-3">
                  {Object.entries(scoreReport.topicBreakdown).map(([topic, stats]) => {
                    const acc = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
                    const isGood = acc >= 75;
                    const isLow = acc < 50;

                    return (
                      <div key={topic} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs">
                        <div>
                          <span className="font-semibold text-white">{topic}</span>
                          <span className="text-slate-400 block text-[11px]">{stats.correct}/{stats.total} Correct</span>
                        </div>
                        <span className={`px-2.5 py-1 rounded-full font-bold ${
                          isGood ? 'bg-emerald-500/20 text-emerald-400' :
                          isLow ? 'bg-rose-500/20 text-rose-400' :
                          'bg-amber-500/20 text-amber-400'
                        }`}>
                          {isGood ? 'Good At' : isLow ? 'Low in this' : 'Moderate'} ({acc}%)
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => handleSwitchMock(activeMock)}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition flex items-center gap-1.5"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Retake Test</span>
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md transition"
                >
                  Done & Return to Dashboard
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

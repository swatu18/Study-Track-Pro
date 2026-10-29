import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { pyqDatabase } from '../data/pyqDatabase';
import { 
  Flame, CheckCircle, XCircle, Code, Lightbulb, Play, ArrowRight, 
  Filter, Sparkles, BookOpen, Calculator, Brain, Terminal, MessageSquare, Landmark, Layers
} from 'lucide-react';

export const PracticeArena = ({ initialTrack = "All", initialModule = "All", initialTopic = null }) => {
  const { currentUser, logQuestionResult } = useAuth();
  
  const [activeModule, setActiveModule] = useState(initialModule);
  const [activeTrack, setActiveTrack] = useState(initialTrack);
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [topicFilter, setTopicFilter] = useState(initialTopic || 'All');

  const [attemptState, setAttemptState] = useState({});
  const [activeCodeLang, setActiveCodeLang] = useState('python');
  const [codeOutputs, setCodeOutputs] = useState({});

  // Module configurations with counts
  const modulesList = [
    { key: "All", name: "All Modules", icon: Layers, count: pyqDatabase.length },
    { key: "Aptitude", name: "Aptitude & Quant", icon: Calculator, count: pyqDatabase.filter(q => q.module === "Aptitude").length },
    { key: "Reasoning", name: "Reasoning & Puzzles", icon: Brain, count: pyqDatabase.filter(q => q.module === "Reasoning").length },
    { key: "Coding", name: "Hands-on Coding", icon: Terminal, count: pyqDatabase.filter(q => q.module === "Coding").length },
    { key: "Verbal & English", name: "Verbal & English", icon: MessageSquare, count: pyqDatabase.filter(q => q.module === "Verbal & English").length },
    { key: "Banking Awareness", name: "Banking & GA", icon: Landmark, count: pyqDatabase.filter(q => q.module === "Banking Awareness").length }
  ];

  // Filter questions based on selected module, track, difficulty, topic
  const filteredQuestions = pyqDatabase.filter(q => {
    if (activeModule !== 'All' && q.module !== activeModule) return false;
    if (activeTrack !== 'All' && q.track !== activeTrack) return false;
    if (difficultyFilter !== 'All' && q.difficulty !== difficultyFilter) return false;
    if (topicFilter !== 'All' && q.topic !== topicFilter) return false;
    return true;
  });

  const availableTopics = Array.from(
    new Set(pyqDatabase.filter(q => activeModule === 'All' || q.module === activeModule).map(q => q.topic))
  );

  const handleSelectOption = (questionId, optIndex) => {
    if (attemptState[questionId]?.submitted) return;
    setAttemptState(prev => ({
      ...prev,
      [questionId]: {
        ...prev[questionId],
        selectedOption: optIndex
      }
    }));
  };

  const handleSubmitAnswer = (question) => {
    const attempt = attemptState[question.id];
    if (attempt === undefined || attempt.selectedOption === undefined) return;

    const isCorrect = attempt.selectedOption === question.correctAnswer;
    
    setAttemptState(prev => ({
      ...prev,
      [question.id]: {
        ...prev[question.id],
        submitted: true,
        isCorrect
      }
    }));

    // Record question result -> Automatically marks attendance and streak!
    logQuestionResult(question.id, question.topic, isCorrect);
  };

  const handleRunCode = (question) => {
    setCodeOutputs(prev => ({
      ...prev,
      [question.id]: {
        status: "Accepted",
        output: question.sampleOutput,
        passed: true
      }
    }));

    logQuestionResult(question.id, question.topic, true);
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Top Banner & Module Selector */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-orange-500/10 text-orange-400 border border-orange-500/20">
                Official PYQ Module Repository
              </span>
              <span className="text-xs text-slate-400 font-medium">Total: {pyqDatabase.length} Previous Questions</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white mt-1">
              Structured Exam Preparation Modules
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Choose your practice module. Solving even 1 question validates your attendance format and advances your streak! 🔥
            </p>
          </div>

          {/* Track Filter Pill */}
          <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'TCS NQT', 'Banking Exams'].map(tr => (
              <button
                key={tr}
                onClick={() => { setActiveTrack(tr); setTopicFilter('All'); }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition ${
                  activeTrack === tr ? 'bg-orange-500 text-white shadow-sm' : 'text-slate-400 hover:text-white'
                }`}
              >
                {tr}
              </button>
            ))}
          </div>
        </div>

        {/* Module Navigation Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {modulesList.map(mod => {
            const Icon = mod.icon;
            const isSelected = activeModule === mod.key;

            return (
              <button
                key={mod.key}
                onClick={() => { setActiveModule(mod.key); setTopicFilter('All'); }}
                className={`p-3.5 rounded-2xl border transition text-left flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-br from-orange-500/20 to-amber-500/10 border-orange-500 ring-1 ring-orange-500 text-white'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:border-slate-700 hover:bg-slate-800/40'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-5 h-5 ${isSelected ? 'text-orange-400' : 'text-slate-400'}`} />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isSelected ? 'bg-orange-500/30 text-orange-300' : 'bg-slate-800 text-slate-400'
                  }`}>
                    {mod.count} PYQs
                  </span>
                </div>
                <span className="text-xs font-bold leading-tight">{mod.name}</span>
              </button>
            );
          })}
        </div>

        {/* Detailed Filters Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800 flex flex-wrap items-center gap-3">
          <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold">
            <Filter className="w-3.5 h-3.5 text-orange-400" />
            <span>Refine Questions:</span>
          </div>

          <select
            value={topicFilter}
            onChange={(e) => setTopicFilter(e.target.value)}
            className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-white text-xs focus:outline-none focus:border-orange-500"
          >
            <option value="All">All Topics ({filteredQuestions.length})</option>
            {availableTopics.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <div className="flex items-center space-x-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
            {['All', 'Easy', 'Medium', 'Hard'].map(d => (
              <button
                key={d}
                onClick={() => setDifficultyFilter(d)}
                className={`px-3 py-1 rounded-lg transition ${
                  difficultyFilter === d ? 'bg-slate-800 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-mono ml-auto">
            Showing <b className="text-orange-400">{filteredQuestions.length}</b> of {pyqDatabase.length} Total PYQs
          </span>
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-6">
        {filteredQuestions.map((q, idx) => {
          const attempt = attemptState[q.id];
          const isSubmitted = attempt?.submitted;
          const isCorrect = attempt?.isCorrect;
          const isSolvedBefore = currentUser?.solvedQuestions?.includes(q.id);

          return (
            <div
              key={q.id}
              className={`bg-slate-900 border rounded-3xl p-6 sm:p-8 transition shadow-xl ${
                isSubmitted && isCorrect
                  ? 'border-emerald-500/40 bg-gradient-to-br from-slate-900 to-emerald-950/20'
                  : isSubmitted && !isCorrect
                  ? 'border-rose-500/40 bg-gradient-to-br from-slate-900 to-rose-950/20'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              {/* Question metadata */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-7 h-7 rounded-lg bg-orange-500/20 text-orange-400 border border-orange-500/30 flex items-center justify-center text-xs font-black">
                    Q{idx + 1}
                  </span>
                  <span className="text-xs font-bold text-slate-300 px-2.5 py-0.5 rounded-full bg-slate-800">
                    {q.module}
                  </span>
                  <span className="text-xs font-medium text-amber-400 px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/20">
                    {q.topic}
                  </span>
                </div>

                <div className="flex items-center space-x-2 text-xs">
                  <span className="px-2 py-0.5 rounded-md bg-slate-950 text-slate-400 border border-slate-800 font-semibold">
                    {q.year}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 font-semibold">
                    {q.track}
                  </span>
                  <span className={`px-2 py-0.5 rounded-md font-bold ${
                    q.difficulty === 'Easy' ? 'text-emerald-400 bg-emerald-500/10' :
                    q.difficulty === 'Medium' ? 'text-amber-400 bg-amber-500/10' :
                    'text-rose-400 bg-rose-500/10'
                  }`}>
                    {q.difficulty}
                  </span>

                  {(isCorrect || isSolvedBefore) && (
                    <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 font-bold flex items-center gap-1">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Attendance Stamped
                    </span>
                  )}
                </div>
              </div>

              {/* Question text */}
              <div className="text-sm sm:text-base text-slate-100 font-medium whitespace-pre-line leading-relaxed mb-6">
                {q.question}
              </div>

              {/* Standard MCQ Options */}
              {!q.isCoding ? (
                <div className="space-y-3 mb-6">
                  {q.options.map((option, optIdx) => {
                    const isSelected = attempt?.selectedOption === optIdx;
                    const isTheCorrectAnswer = isSubmitted && optIdx === q.correctAnswer;
                    const isWrongSelected = isSubmitted && isSelected && !isCorrect;

                    let optionClasses = "border-slate-800 hover:border-slate-700 bg-slate-950/60 text-slate-200";

                    if (isSelected && !isSubmitted) {
                      optionClasses = "border-orange-500 bg-orange-500/15 text-orange-200 ring-1 ring-orange-500";
                    } else if (isTheCorrectAnswer) {
                      optionClasses = "border-emerald-500 bg-emerald-500/20 text-emerald-100 font-semibold ring-1 ring-emerald-500";
                    } else if (isWrongSelected) {
                      optionClasses = "border-rose-500 bg-rose-500/20 text-rose-200 ring-1 ring-rose-500";
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isSubmitted}
                        onClick={() => handleSelectOption(q.id, optIdx)}
                        className={`w-full text-left p-3.5 rounded-2xl border transition flex items-center justify-between text-xs sm:text-sm ${optionClasses}`}
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-6 h-6 rounded-lg bg-slate-800 flex items-center justify-center font-bold text-xs text-slate-400">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span>{option}</span>
                        </div>

                        {isTheCorrectAnswer && <CheckCircle className="w-4 h-4 text-emerald-400" />}
                        {isWrongSelected && <XCircle className="w-4 h-4 text-rose-400" />}
                      </button>
                    );
                  })}
                </div>
              ) : (
                /* Hands-on Coding Challenge Layout */
                <div className="mb-6 space-y-4">
                  <div className="flex items-center justify-between bg-slate-950 p-2 rounded-xl border border-slate-800">
                    <div className="flex items-center space-x-2 text-xs text-slate-400 font-semibold px-2">
                      <Code className="w-4 h-4 text-indigo-400" />
                      <span>Code Language:</span>
                    </div>
                    <div className="flex space-x-1">
                      {['python', 'java', 'cpp'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => setActiveCodeLang(lang)}
                          className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition ${
                            activeCodeLang === lang ? 'bg-indigo-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono text-xs text-emerald-400 overflow-x-auto">
                    <pre>{q.starterCode[activeCodeLang]}</pre>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Sample Input:</span>
                      <code className="text-amber-400 font-mono">{q.sampleInput}</code>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                      <span className="text-slate-400 font-semibold block mb-1">Expected Output:</span>
                      <code className="text-emerald-400 font-mono">{q.sampleOutput}</code>
                    </div>
                  </div>

                  <button
                    onClick={() => handleRunCode(q)}
                    className="px-4 py-2.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-500 text-white shadow-md transition flex items-center gap-2"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Run Test Cases & Verify</span>
                  </button>

                  {codeOutputs[q.id] && (
                    <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        <span>All test cases passed! Output: {codeOutputs[q.id].output}</span>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                        Attendance Verified 🔥
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* Submit CTA */}
              {!q.isCoding && !isSubmitted && (
                <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                  <span className="text-xs text-slate-500">
                    Select an option and submit to stamp attendance
                  </span>
                  <button
                    disabled={attempt?.selectedOption === undefined}
                    onClick={() => handleSubmitAnswer(q)}
                    className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                      attempt?.selectedOption !== undefined
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/25 hover:from-orange-600 hover:to-amber-600'
                        : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <span>Submit & Stamp Streak</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}

              {/* Step-by-step Solution */}
              {isSubmitted && (
                <div className="mt-6 pt-5 border-t border-slate-800">
                  <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs mb-2">
                    <Lightbulb className="w-4 h-4" />
                    <span>Detailed Step-by-Step Mathematical & Logical Solution:</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-xs text-slate-300 leading-relaxed whitespace-pre-line font-mono">
                    {q.explanation}
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

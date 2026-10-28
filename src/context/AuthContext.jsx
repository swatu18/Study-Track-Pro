import React, { createContext, useContext, useState, useEffect } from 'react';
import { launchConfetti, launchMegaWelcomeConfetti } from '../utils/confetti';

const AuthContext = createContext();

export const getTodayKey = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getRecentDays = (count) => {
  const dates = [];
  const today = new Date();
  for (let i = count - 1; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    dates.push(`${y}-${m}-${day}`);
  }
  return dates;
};

// Seed users: The user (with Day 10 streak) + sample friends
const seedUsers = [
  {
    id: "user-primary",
    name: "Aman Yadav",
    email: "aman@studytrack.com",
    password: "password123",
    target: "Both (TCS + Banking)",
    streak: 10,
    longestStreak: 10,
    attendanceDates: getRecentDays(10), // Day 10!
    lastActiveDate: getTodayKey(),
    solvedQuestions: ["tcs-q1", "bank-q1"],
    topicStats: {
      "Percentages & Profit Loss": { correct: 2, total: 2 },
      "Simplification & Approximation": { correct: 3, total: 3 },
      "Number Systems": { correct: 2, total: 2 },
      "Time & Work": { correct: 1, total: 2 },
      "Seating Puzzles": { correct: 0, total: 2 },
      "Inequalities": { correct: 2, total: 2 }
    },
    mockHistory: [
      {
        testId: "mock-tcs-nqt-day1",
        title: "TCS NQT National Qualifier Mock Exam",
        score: 6,
        totalMarks: 7,
        accuracy: 85,
        date: getRecentDays(1)[0]
      }
    ],
    dailyChecklist: [
      { id: 1, text: "Solve 5 Aptitude / Quant PYQs", completed: true },
      { id: 2, text: "Solve 1 TCS Coding or Banking Puzzle", completed: false },
      { id: 3, text: "Take 1 Timed Speed Mock Test", completed: false },
      { id: 4, text: "Revise Low-Score Formulae", completed: false }
    ],
    minutesStudied: 290
  },
  {
    id: "user-friend-1",
    name: "Rohan Verma",
    email: "rohan@studytrack.com",
    password: "password123",
    target: "TCS NQT",
    streak: 8,
    longestStreak: 8,
    attendanceDates: getRecentDays(8),
    lastActiveDate: getTodayKey(),
    solvedQuestions: ["tcs-q1", "tcs-q4"],
    topicStats: {
      "Percentages & Profit Loss": { correct: 2, total: 2 },
      "Blood Relations": { correct: 1, total: 1 }
    },
    mockHistory: [],
    dailyChecklist: [],
    minutesStudied: 180
  },
  {
    id: "user-friend-2",
    name: "Ananya Sen",
    email: "ananya@studytrack.com",
    password: "password123",
    target: "Banking Exams",
    streak: 12,
    longestStreak: 14,
    attendanceDates: getRecentDays(12),
    lastActiveDate: getTodayKey(),
    solvedQuestions: ["bank-q1", "bank-q3", "bank-q5"],
    topicStats: {
      "Simplification & Approximation": { correct: 4, total: 4 },
      "Quadratic Equations": { correct: 3, total: 3 }
    },
    mockHistory: [],
    dailyChecklist: [],
    minutesStudied: 350
  }
];

export const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("study_track_pro_users");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return seedUsers; }
    }
    return seedUsers;
  });

  const [currentUser, setCurrentUser] = useState(() => {
    const activeId = localStorage.getItem("study_track_pro_active_userId");
    if (activeId) {
      const match = users.find(u => u.id === activeId);
      if (match) return match;
    }
    return users[0];
  });

  const [loginBanner, setLoginBanner] = useState(null);

  useEffect(() => {
    localStorage.setItem("study_track_pro_users", JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("study_track_pro_active_userId", currentUser.id);
    }
  }, [currentUser]);

  const updateActiveUser = (updater) => {
    setCurrentUser(prev => {
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setUsers(all => all.map(u => u.id === updated.id ? updated : u));
      return updated;
    });
  };

  // Sign In function
  const loginUser = (emailOrName, password) => {
    const found = users.find(
      u => (u.email.toLowerCase() === emailOrName.toLowerCase() || u.name.toLowerCase() === emailOrName.toLowerCase()) && u.password === password
    );

    if (!found) {
      return { success: false, error: "Invalid username/email or password. Please try again." };
    }

    setCurrentUser(found);
    launchMegaWelcomeConfetti();
    setLoginBanner({
      name: found.name,
      streak: found.streak,
      message: `🎉 Congratulations, ${found.name}! You are logged in successfully. Welcome to Day ${found.streak}! Start your Day ${found.streak} mock test.`
    });
    return { success: true, user: found };
  };

  // Sign Up function for user & friends
  const registerUser = ({ name, email, password, target = "Both (TCS + Banking)", startingStreak = 10 }) => {
    const exists = users.find(u => u.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { success: false, error: "An account with this email already exists." };
    }

    const streakNum = Math.max(1, parseInt(startingStreak) || 1);
    const pastAtt = getRecentDays(streakNum);

    const newUser = {
      id: "user-" + Date.now(),
      name: name.trim(),
      email: email.trim(),
      password,
      target,
      streak: streakNum,
      longestStreak: streakNum,
      attendanceDates: pastAtt,
      lastActiveDate: getTodayKey(),
      solvedQuestions: [],
      topicStats: {},
      mockHistory: [],
      dailyChecklist: [
        { id: 1, text: "Solve 5 Aptitude / Quant PYQs", completed: false },
        { id: 2, text: "Solve 1 TCS Coding or Banking Puzzle", completed: false },
        { id: 3, text: "Take 1 Timed Speed Mock Test", completed: false },
        { id: 4, text: "Revise Low-Score Formulae", completed: false }
      ],
      minutesStudied: 0
    };

    const updatedUsers = [newUser, ...users];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    launchMegaWelcomeConfetti();

    setLoginBanner({
      name: newUser.name,
      streak: newUser.streak,
      message: `🎉 Congratulations, ${newUser.name}! You are logged in. Welcome to Day ${newUser.streak}! Start your Day ${newUser.streak} mock test.`
    });

    return { success: true, user: newUser };
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("study_track_pro_active_userId");
  };

  // Punch attendance manually
  const punchTodayAttendance = () => {
    const today = getTodayKey();
    if (!currentUser) return false;

    if (currentUser.attendanceDates.includes(today)) {
      return { alreadyMarked: true };
    }

    updateActiveUser(prev => {
      const newStreak = prev.streak + 1;
      return {
        ...prev,
        attendanceDates: [...prev.attendanceDates, today],
        streak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak || newStreak),
        lastActiveDate: today
      };
    });

    launchMegaWelcomeConfetti();
    return { alreadyMarked: false, streak: currentUser.streak + 1 };
  };

  // Record PYQ answer attempt (marks attendance automatically!)
  const logQuestionResult = (questionId, topic, isCorrect) => {
    const today = getTodayKey();
    let isStreakAwarded = false;

    updateActiveUser(prev => {
      const alreadySolved = prev.solvedQuestions.includes(questionId);
      const newSolved = alreadySolved ? prev.solvedQuestions : [...prev.solvedQuestions, questionId];

      const prevTopic = prev.topicStats[topic] || { correct: 0, total: 0 };
      const newTopicStats = {
        ...prev.topicStats,
        [topic]: {
          correct: prevTopic.correct + (isCorrect ? 1 : 0),
          total: prevTopic.total + 1
        }
      };

      const attendanceDates = [...prev.attendanceDates];
      let newStreak = prev.streak;

      if (!attendanceDates.includes(today)) {
        attendanceDates.push(today);
        newStreak = prev.streak + 1;
        isStreakAwarded = true;
      }

      return {
        ...prev,
        solvedQuestions: newSolved,
        topicStats: newTopicStats,
        attendanceDates,
        streak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak || newStreak),
        lastActiveDate: today
      };
    });

    if (isStreakAwarded) {
      launchConfetti();
    }
    return isStreakAwarded;
  };

  // Record Mock Test submission
  const logMockTestResult = (testResult) => {
    const today = getTodayKey();

    updateActiveUser(prev => {
      const attendanceDates = [...prev.attendanceDates];
      let newStreak = prev.streak;

      if (!attendanceDates.includes(today)) {
        attendanceDates.push(today);
        newStreak = prev.streak + 1;
      }

      const mergedTopics = { ...prev.topicStats };
      if (testResult.topicBreakdown) {
        Object.entries(testResult.topicBreakdown).forEach(([topic, stat]) => {
          const current = mergedTopics[topic] || { correct: 0, total: 0 };
          mergedTopics[topic] = {
            correct: current.correct + stat.correct,
            total: current.total + stat.total
          };
        });
      }

      return {
        ...prev,
        attendanceDates,
        streak: newStreak,
        longestStreak: Math.max(newStreak, prev.longestStreak || newStreak),
        lastActiveDate: today,
        mockHistory: [testResult, ...prev.mockHistory],
        topicStats: mergedTopics
      };
    });

    launchMegaWelcomeConfetti();
  };

  // Checklist toggles
  const toggleChecklist = (id) => {
    updateActiveUser(prev => ({
      ...prev,
      dailyChecklist: prev.dailyChecklist.map(c => c.id === id ? { ...c, completed: !c.completed } : c)
    }));
  };

  const addChecklist = (text) => {
    if (!text.trim()) return;
    updateActiveUser(prev => ({
      ...prev,
      dailyChecklist: [...prev.dailyChecklist, { id: Date.now(), text: text.trim(), completed: false }]
    }));
  };

  const logStudyTime = (mins) => {
    updateActiveUser(prev => ({
      ...prev,
      minutesStudied: (prev.minutesStudied || 0) + mins
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        loginUser,
        registerUser,
        logoutUser,
        punchTodayAttendance,
        logQuestionResult,
        logMockTestResult,
        toggleChecklist,
        addChecklist,
        logStudyTime,
        loginBanner,
        clearLoginBanner: () => setLoginBanner(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

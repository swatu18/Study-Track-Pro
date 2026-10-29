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

export const getRecentDays = (count) => {
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

// Default pre-seeded admin/faculty account
const defaultAdminAccount = {
  id: "admin-teacher",
  name: "Faculty Admin",
  email: "admin@studytrack.com",
  password: "Admin@Password2026",
  role: "admin",
  target: "Both (TCS + Banking)",
  streak: 15,
  longestStreak: 15,
  attendanceDates: getRecentDays(15),
  lastActiveDate: getTodayKey(),
  solvedQuestions: ["tcs-q1", "tcs-q2", "bank-q1"],
  topicStats: {
    "Percentages & Profit Loss": { correct: 5, total: 5 },
    "Time & Work": { correct: 4, total: 4 },
    "Simplification & Approximation": { correct: 5, total: 5 }
  },
  mockHistory: [
    {
      testId: "mock-tcs-nqt-day1",
      title: "Faculty Reference Mock",
      score: 7,
      totalMarks: 7,
      accuracy: 100,
      date: getRecentDays(1)[0]
    }
  ],
  dailyChecklist: [
    { id: 1, text: "Review Student Attendance Records", completed: true },
    { id: 2, text: "Monitor Weak Topic Diagnostic", completed: true }
  ],
  minutesStudied: 450,
  lastLoginAt: new Date().toISOString()
};

export const AuthProvider = ({ children }) => {
  // All registered users
  const [users, setUsers] = useState(() => {
    const stored = localStorage.getItem("study_track_pro_users");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        // Ensure admin exists
        const hasAdmin = parsed.some(u => u.role === "admin" || u.email.toLowerCase() === "admin@studytrack.com");
        if (!hasAdmin) {
          parsed.unshift(defaultAdminAccount);
        }
        return parsed;
      } catch (e) {
        return [defaultAdminAccount];
      }
    }
    return [defaultAdminAccount];
  });

  // Current authenticated user (NULL by default unless they previously signed in)
  const [currentUser, setCurrentUser] = useState(() => {
    const activeId = localStorage.getItem("study_track_pro_active_userId");
    if (activeId) {
      const stored = localStorage.getItem("study_track_pro_users");
      const userList = stored ? JSON.parse(stored) : [defaultAdminAccount];
      const match = userList.find(u => u.id === activeId);
      if (match) return match;
    }
    // Critical: Do NOT auto-login as anyone! Let students see a secure welcome page.
    return null;
  });

  const [loginBanner, setLoginBanner] = useState(null);

  // Theme mode (Dark / Light)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("study_track_pro_theme") || "dark";
  });

  useEffect(() => {
    localStorage.setItem("study_track_pro_theme", theme);
    if (theme === 'light') {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    } else {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Activity audit log for Admin monitoring
  const [activityLogs, setActivityLogs] = useState(() => {
    const stored = localStorage.getItem("study_track_pro_activity_logs");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return []; }
    }
    return [
      {
        id: "log-seed-1",
        timestamp: new Date().toISOString(),
        userName: "System",
        userEmail: "system@studytrack.com",
        action: "Security & Portal Infrastructure Initialized",
        details: "Student protection, password visibility, and OTP reset online."
      }
    ];
  });

  // OTP storage: { email, otp, expiresAt }
  const [otpRequests, setOtpRequests] = useState(() => {
    const stored = localStorage.getItem("study_track_pro_otps");
    if (stored) {
      try { return JSON.parse(stored); } catch (e) { return {}; }
    }
    return {};
  });

  // Sync users to storage
  useEffect(() => {
    localStorage.setItem("study_track_pro_users", JSON.stringify(users));
  }, [users]);

  // Sync current user ID
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("study_track_pro_active_userId", currentUser.id);
    } else {
      localStorage.removeItem("study_track_pro_active_userId");
    }
  }, [currentUser]);

  // Sync activity logs
  useEffect(() => {
    localStorage.setItem("study_track_pro_activity_logs", JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Sync OTP requests
  useEffect(() => {
    localStorage.setItem("study_track_pro_otps", JSON.stringify(otpRequests));
  }, [otpRequests]);

  // Helper to log user action for Admin monitoring
  const recordActivity = (userName, userEmail, action, details) => {
    const newLog = {
      id: "log-" + Date.now() + "-" + Math.random().toString(36).substr(2, 4),
      timestamp: new Date().toISOString(),
      userName: userName || "Anonymous",
      userEmail: userEmail || "N/A",
      action,
      details
    };
    setActivityLogs(prev => [newLog, ...prev.slice(0, 200)]); // keep last 200 logs
  };

  const updateActiveUser = (updater) => {
    setCurrentUser(prev => {
      if (!prev) return null;
      const updated = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      setUsers(all => all.map(u => u.id === updated.id ? updated : u));
      return updated;
    });
  };

  // Sign In function
  const loginUser = (emailOrName, password) => {
    const cleanIdent = emailOrName.trim().toLowerCase();
    const found = users.find(
      u => (u.email.toLowerCase() === cleanIdent || u.name.toLowerCase() === cleanIdent) && u.password === password
    );

    if (!found) {
      recordActivity("Failed Attempt", emailOrName, "Failed Login Attempt", "Invalid credentials provided");
      return { success: false, error: "Invalid username/email or password. Please verify your credentials or click 'Forgot Password?'." };
    }

    const updatedUser = {
      ...found,
      lastLoginAt: new Date().toISOString()
    };

    setUsers(all => all.map(u => u.id === found.id ? updatedUser : u));
    setCurrentUser(updatedUser);
    launchMegaWelcomeConfetti();

    recordActivity(found.name, found.email, "Student Sign In", `Logged into Study Track Pro (Role: ${found.role || 'student'})`);

    setLoginBanner({
      name: found.name,
      streak: found.streak,
      role: found.role || "student",
      message: `🎉 Congratulations, ${found.name}! You are logged in successfully. Welcome to Day ${found.streak}! Start your Day ${found.streak} mock test.`
    });
    return { success: true, user: updatedUser };
  };

  // Sign Up / Register function
  const registerUser = ({ name, email, password, target = "Both (TCS + Banking)", startingStreak = 1 }) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = name.trim();

    const exists = users.find(u => u.email.toLowerCase() === cleanEmail);
    if (exists) {
      return { success: false, error: "An account with this email already exists. Please log in or use Forgot Password." };
    }

    const streakNum = Math.max(1, parseInt(startingStreak) || 1);
    const pastAtt = getRecentDays(streakNum);

    const newUser = {
      id: "user-" + Date.now(),
      name: cleanName,
      email: cleanEmail,
      password,
      role: "student",
      target,
      streak: streakNum,
      longestStreak: streakNum,
      attendanceDates: pastAtt,
      lastActiveDate: getTodayKey(),
      createdAt: new Date().toISOString(),
      lastLoginAt: new Date().toISOString(),
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

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    setCurrentUser(newUser);
    launchMegaWelcomeConfetti();

    recordActivity(newUser.name, newUser.email, "Student Registered", `New account registered with ${streakNum}-day streak. Target: ${target}`);

    setLoginBanner({
      name: newUser.name,
      streak: newUser.streak,
      role: "student",
      message: `🎉 Welcome to Study Track Pro, ${newUser.name}! Your account has been created. Start your Day ${newUser.streak} practice!`
    });

    return { success: true, user: newUser };
  };

  // Sign out function
  const logoutUser = () => {
    if (currentUser) {
      recordActivity(currentUser.name, currentUser.email, "Student Sign Out", "User voluntarily signed out of session");
    }
    setCurrentUser(null);
    localStorage.removeItem("study_track_pro_active_userId");
  };

  // Forgot password: Step 1 Generate 6-Digit OTP
  const requestPasswordResetOtp = (emailInput) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const user = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!user) {
      return { success: false, error: "No account found registered with this email address. Please verify your email or sign up." };
    }

    // Generate secure 6-digit numeric OTP code
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 10 * 60 * 1000; // valid for 10 minutes

    const updatedOtps = {
      ...otpRequests,
      [cleanEmail]: {
        otp: generatedOtp,
        expiresAt,
        userName: user.name
      }
    };
    setOtpRequests(updatedOtps);

    recordActivity(user.name, user.email, "Password Reset OTP Requested", `OTP verification code dispatched.`);

    return {
      success: true,
      otp: generatedOtp, // surfaced so user can see verification alert in mock portal
      userName: user.name,
      email: cleanEmail
    };
  };

  // Forgot password: Step 2 Verify OTP and Update Password
  const resetPasswordWithOtp = (emailInput, enteredOtp, newPassword) => {
    const cleanEmail = emailInput.trim().toLowerCase();
    const cleanOtp = enteredOtp.trim();

    const request = otpRequests[cleanEmail];
    if (!request) {
      return { success: false, error: "No OTP request found for this email. Please request a new code." };
    }

    if (Date.now() > request.expiresAt) {
      return { success: false, error: "This OTP has expired. Please request a fresh OTP code." };
    }

    if (request.otp !== cleanOtp) {
      recordActivity(request.userName, cleanEmail, "Failed OTP Verification", "Incorrect OTP entered");
      return { success: false, error: "Invalid OTP code. Please check your verification code and try again." };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, error: "Password must be at least 6 characters long." };
    }

    // Update user password in users list
    setUsers(all => all.map(u => {
      if (u.email.toLowerCase() === cleanEmail) {
        return {
          ...u,
          password: newPassword,
          lastPasswordResetAt: new Date().toISOString()
        };
      }
      return u;
    }));

    // Clean up OTP
    const updated = { ...otpRequests };
    delete updated[cleanEmail];
    setOtpRequests(updated);

    recordActivity(request.userName, cleanEmail, "Password Reset Successful", "Password updated via OTP verification");

    return { success: true, message: "Your password has been successfully reset! You can now sign in with your new password." };
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

    recordActivity(currentUser.name, currentUser.email, "Attendance Stamped", `Manually punched attendance for ${today}. Streak: ${currentUser.streak + 1}`);
    launchMegaWelcomeConfetti();
    return { alreadyMarked: false, streak: currentUser.streak + 1 };
  };

  // Record PYQ answer attempt (marks attendance automatically!)
  const logQuestionResult = (questionId, topic, isCorrect) => {
    if (!currentUser) return false;
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

    recordActivity(
      currentUser.name,
      currentUser.email,
      "Question Attempted",
      `Topic: ${topic} • Result: ${isCorrect ? 'Correct ✅' : 'Incorrect ❌'} • Streak: ${isStreakAwarded ? '+1 Day' : 'Maintained'}`
    );

    if (isStreakAwarded) {
      launchConfetti();
    }
    return isStreakAwarded;
  };

  // Record Mock Test submission
  const logMockTestResult = (testResult) => {
    if (!currentUser) return;
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

    recordActivity(
      currentUser.name,
      currentUser.email,
      "Mock Test Submitted",
      `${testResult.title} • Score: ${testResult.score}/${testResult.totalMarks} (${testResult.accuracy}%)`
    );

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
    if (!currentUser) return;
    updateActiveUser(prev => ({
      ...prev,
      minutesStudied: (prev.minutesStudied || 0) + mins
    }));
    recordActivity(currentUser.name, currentUser.email, "Pomodoro Sprint Completed", `Logged ${mins} minutes of focused study`);
  };

  // Admin capability: reset student password or update student directly
  const adminUpdateStudentPassword = (studentId, newPassword) => {
    setUsers(all => all.map(u => {
      if (u.id === studentId) {
        return { ...u, password: newPassword };
      }
      return u;
    }));
    recordActivity("Faculty Admin", "admin@studytrack.com", "Admin Password Override", `Admin updated credentials for user ID: ${studentId}`);
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        users,
        currentUser,
        activityLogs,
        loginUser,
        registerUser,
        logoutUser,
        requestPasswordResetOtp,
        resetPasswordWithOtp,
        punchTodayAttendance,
        logQuestionResult,
        logMockTestResult,
        toggleChecklist,
        addChecklist,
        logStudyTime,
        loginBanner,
        theme,
        toggleTheme,
        adminUpdateStudentPassword,
        clearLoginBanner: () => setLoginBanner(null)
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

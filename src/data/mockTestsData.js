import { pyqDatabase } from './pyqDatabase';

export const mockTestsData = [
  {
    id: "mock-tcs-nqt-day1",
    title: "TCS NQT National Qualifier Mock Exam (Day 10 Special)",
    track: "TCS NQT",
    description: "Real exam simulation with Numerical, Reasoning, Verbal, and Hands-on Coding questions.",
    durationMinutes: 25,
    totalMarks: 7,
    negativeMarking: 0,
    questions: pyqDatabase.filter(q => q.track === "TCS NQT")
  },
  {
    id: "mock-banking-prelims-1",
    title: "IBPS / SBI PO Prelims Speed Mock Exam",
    track: "Banking Exams",
    description: "Speed & accuracy drill with negative marking (-0.25) covering Quant, Puzzles, English & GA.",
    durationMinutes: 20,
    totalMarks: 7,
    negativeMarking: 0.25,
    questions: pyqDatabase.filter(q => q.track === "Banking Exams")
  }
];

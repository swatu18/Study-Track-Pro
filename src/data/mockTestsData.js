import { pyqDatabase } from './pyqDatabase';

const tcsQuestions = pyqDatabase.filter(q => q.track === "TCS NQT");
const bankingQuestions = pyqDatabase.filter(q => q.track === "Banking Exams");

export const mockTestsData = [
  {
    id: "mock-tcs-nqt-day1",
    title: "TCS NQT National Qualifier Comprehensive Mock Exam",
    track: "TCS NQT",
    description: "Realistic exam simulation with Numerical Ability, Reasoning, Verbal, and Hands-on Coding questions.",
    durationMinutes: 45,
    totalMarks: tcsQuestions.length,
    negativeMarking: 0,
    questions: tcsQuestions
  },
  {
    id: "mock-banking-prelims-1",
    title: "IBPS / SBI PO Prelims Speed Mock Exam",
    track: "Banking Exams",
    description: "High-speed accuracy drill with official -0.25 negative marking covering Quantitative Aptitude, Puzzles, English & Banking Awareness.",
    durationMinutes: 45,
    totalMarks: bankingQuestions.length,
    negativeMarking: 0.25,
    questions: bankingQuestions
  },
  {
    id: "mock-combined-mastery",
    title: "Study Track Pro 50-Question Master Benchmark Exam",
    track: "Both (TCS + Banking)",
    description: "Full-spectrum 50-question diagnostic covering all 5 core modules: Quant, Puzzles, Coding, Verbal, and Banking GA.",
    durationMinutes: 60,
    totalMarks: pyqDatabase.length,
    negativeMarking: 0.25,
    questions: pyqDatabase
  }
];

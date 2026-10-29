export const pyqDatabase = [
  // ===================== MODULE 1: APTITUDE & QUANTITATIVE =====================
  {
    id: "apt-1",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Percentages & Profit Loss",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "A merchant marks his goods 40% above the cost price and allows a discount of 20% on the marked price. If he earns a profit of Rs. 360, what was the original cost price?",
    options: ["Rs. 2,800", "Rs. 3,000", "Rs. 3,200", "Rs. 3,600"],
    correctAnswer: 1, // Rs. 3,000
    explanation: "Let CP = 100x.\nMarked Price (MP) = 100x + 40% of 100x = 140x.\nDiscount = 20% of 140x = 28x.\nSelling Price (SP) = 140x - 28x = 112x.\nProfit = SP - CP = 112x - 100x = 12x.\nGiven Profit = 360 => 12x = 360 => x = 30.\nCost Price = 100 * 30 = Rs. 3,000."
  },
  {
    id: "apt-2",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Time & Work",
    year: "TCS NQT 2023",
    difficulty: "Medium",
    question: "Worker P can complete a project in 15 days, and Worker Q can complete it in 20 days. If they work together with R, they finish the entire work in 6 days. In how many days can R alone complete the project?",
    options: ["18 days", "20 days", "24 days", "30 days"],
    correctAnswer: 1, // 20 days
    explanation: "Total Work = LCM(15, 20, 6) = 60 units.\nEfficiency of P = 60 / 15 = 4 units/day.\nEfficiency of Q = 60 / 20 = 3 units/day.\nEfficiency of P + Q + R = 60 / 6 = 10 units/day.\nEfficiency of R = 10 - (4 + 3) = 3 units/day.\nTime taken by R alone = 60 / 3 = 20 days."
  },
  {
    id: "apt-3",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Number Systems",
    year: "TCS NQT 2024",
    difficulty: "Easy",
    question: "What is the unit digit of the expression (7^95 - 3^58)?",
    options: ["0", "4", "6", "8"],
    correctAnswer: 1, // 4
    explanation: "Cyclicity of 7 is 4: 7^1=7, 7^2=9, 7^3=3, 7^4=1.\n95 mod 4 = 3 => Unit digit of 7^95 is 3.\nCyclicity of 3 is 4: 3^1=3, 3^2=9, 3^3=7, 3^4=1.\n58 mod 4 = 2 => Unit digit of 3^58 is 9.\nSince 3 < 9, we take carry: 13 - 9 = 4.\nTherefore, the unit digit is 4."
  },
  {
    id: "apt-4",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Simplification & Approximation",
    year: "SBI PO 2024",
    difficulty: "Easy",
    question: "Estimate the approximate value of (?):\n59.98% of 1499.85 + 24.99% of 799.90 - (?) = 849.95",
    options: ["250", "275", "300", "325"],
    correctAnswer: 0, // 250
    explanation: "Round off to nearest integers:\n60% of 1500 = 900\n25% of 800 = 200\n900 + 200 - ? = 850\n1100 - ? = 850 => ? = 250."
  },
  {
    id: "apt-5",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Missing Number Series",
    year: "IBPS PO 2023",
    difficulty: "Medium",
    question: "Find the missing term in the sequence:\n6, 7, 16, 51, 208, ?",
    options: ["1045", "1040", "1050", "1035"],
    correctAnswer: 0, // 1045
    explanation: "Pattern:\n6 * 1 + 1 = 7\n7 * 2 + 2 = 16\n16 * 3 + 3 = 51\n51 * 4 + 4 = 208\n208 * 5 + 5 = 1040 + 5 = 1045."
  },
  {
    id: "apt-6",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Quadratic Equations",
    year: "IBPS Clerk 2024",
    difficulty: "Easy",
    question: "Equation I: x^2 - 11x + 30 = 0\nEquation II: y^2 - 15y + 56 = 0\nDetermine the mathematical relationship between x and y:",
    options: ["x > y", "x < y", "x ≥ y", "x ≤ y"],
    correctAnswer: 1, // x < y
    explanation: "For Equation I:\nx^2 - 11x + 30 = 0 => (x - 5)(x - 6) = 0 => x = 5, 6.\nFor Equation II:\ny^2 - 15y + 56 = 0 => (y - 7)(y - 8) = 0 => y = 7, 8.\nSince both values of x (5 and 6) are strictly less than both values of y (7 and 8), x < y."
  },
  {
    id: "apt-7",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Time Speed Distance",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "A train 180 meters long travelling at 72 km/hr passes a platform in 20 seconds. What is the length of the platform?",
    options: ["200 m", "220 m", "240 m", "260 m"],
    correctAnswer: 1, // 220 m
    explanation: "Speed in m/s = 72 * (5/18) = 20 m/s.\nTotal distance = Speed * Time = 20 * 20 = 400 m.\nPlatform Length = Total distance - Train Length = 400 - 180 = 220 m."
  },

  // ===================== MODULE 2: REASONING & PUZZLES =====================
  {
    id: "reas-1",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Blood Relations",
    year: "TCS NQT 2024",
    difficulty: "Easy",
    question: "Introducing a man, a woman said, 'His mother is the only daughter of my mother.' How is the woman related to the man?",
    options: ["Sister", "Mother", "Aunt", "Grandmother"],
    correctAnswer: 1, // Mother
    explanation: "The only daughter of the woman's mother is the woman herself.\nTherefore, the woman is the man's mother."
  },
  {
    id: "reas-2",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Coding-Decoding",
    year: "TCS NQT 2023",
    difficulty: "Medium",
    question: "If 'STREAM' is coded as 'UVTGCO', how will 'NATURE' be coded in that same system?",
    options: ["PCVWTG", "PCVVTH", "OCVWTG", "PDVWTG"],
    correctAnswer: 0, // PCVWTG
    explanation: "Pattern is +2 forward shift for each letter:\nS(+2)->U, T(+2)->V, R(+2)->T, E(+2)->G, A(+2)->C, M(+2)->O.\nApplying to NATURE:\nN(+2)->P, A(+2)->C, T(+2)->V, U(+2)->W, R(+2)->T, E(+2)->G.\nResult: PCVWTG."
  },
  {
    id: "reas-3",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Seating Puzzles",
    year: "SBI PO 2024",
    difficulty: "Hard",
    question: "Six executives (P, Q, R, S, T, U) sit around a circular conference table facing inward. P sits second to the left of T. Q sits to the immediate right of P. S is seated opposite to Q. Who sits to the immediate left of S?",
    options: ["R", "U", "T", "P"],
    correctAnswer: 2, // T
    explanation: "Positions 1 to 6 clockwise facing inward:\nLet T be at position 1.\nP sits 2nd to left => position 3.\nQ sits immediate right of P => position 2.\nS is opposite to Q => S is at position 5.\nFacing inward at position 5, immediate left is T."
  },
  {
    id: "reas-4",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Inequalities",
    year: "IBPS PO 2023",
    difficulty: "Easy",
    question: "Given: M ≥ N = O > P ≤ Q < R\nConclusions:\nI. M > P\nII. R > P",
    options: ["Only I is true", "Only II is true", "Both I and II are true", "Neither I nor II is true"],
    correctAnswer: 2, // Both I and II are true
    explanation: "For I: M ≥ N = O > P implies M > P (True).\nFor II: P ≤ Q < R implies P < R, which means R > P (True).\nBoth conclusions are true."
  },
  {
    id: "reas-5",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Syllogisms",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "Statements: All routers are switches. Some switches are firewalls.\nConclusions:\nI. Some firewalls are switches.\nII. All routers are firewalls.",
    options: ["Only conclusion I follows", "Only conclusion II follows", "Both I and II follow", "Neither I nor II follows"],
    correctAnswer: 0, // Only I follows
    explanation: "Since some switches are firewalls, the intersection is non-empty, so Some firewalls are switches definitely follows. All routers are firewalls cannot be derived."
  },

  // ===================== MODULE 3: HANDS-ON CODING MODULE =====================
  {
    id: "code-1",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Array In-Place Manipulation",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    isCoding: true,
    question: "Write an algorithm to move all zeroes present in an integer array to the end while maintaining the relative order of the non-zero elements. Constraint: Must be solved in O(N) time and O(1) space.",
    sampleInput: "[0, 1, 0, 3, 12]",
    sampleOutput: "[1, 3, 12, 0, 0]",
    starterCode: {
      python: "# TCS NQT Coding Sandbox\ndef moveZeroes(arr):\n    insert_idx = 0\n    for num in arr:\n        if num != 0:\n            arr[insert_idx] = num\n            insert_idx += 1\n    while insert_idx < len(arr):\n        arr[insert_idx] = 0\n        insert_idx += 1\n    return arr\n\nprint(moveZeroes([0, 1, 0, 3, 12]))",
      java: "// TCS NQT Java Solution\npublic class Solution {\n    public static void moveZeroes(int[] nums) {\n        int insertIdx = 0;\n        for (int num : nums) {\n            if (num != 0) {\n                nums[insertIdx++] = num;\n            }\n        }\n        while (insertIdx < nums.length) {\n            nums[insertIdx++] = 0;\n        }\n    }\n}",
      cpp: "// TCS NQT C++ Solution\n#include <vector>\nusing namespace std;\n\nvoid moveZeroes(vector<int>& nums) {\n    int insertIdx = 0;\n    for(int num : nums) {\n        if(num != 0) nums[insertIdx++] = num;\n    }\n    while(insertIdx < nums.size()) nums[insertIdx++] = 0;\n}"
    },
    options: ["O(N) Time, O(1) Space", "O(N^2) Time, O(1) Space", "O(N) Time, O(N) Space", "O(N log N) Time"],
    correctAnswer: 0,
    explanation: "Two-pointer write approach overwrites non-zero elements into their compressed positions and pads zeroes. Time: O(N), Space: O(1)."
  },
  {
    id: "code-2",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Strings & Palindromes",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    isCoding: true,
    question: "Given a string, write a program to check if it is a palindrome after removing all non-alphanumeric characters and ignoring case sensitivity.",
    sampleInput: "\"A man, a plan, a canal: Panama\"",
    sampleOutput: "true",
    starterCode: {
      python: "def isPalindrome(s: str) -> bool:\n    clean = [c.lower() for c in s if c.isalnum()]\n    return clean == clean[::-1]\n\nprint(isPalindrome(\"A man, a plan, a canal: Panama\"))",
      java: "public class Solution {\n    public static boolean isPalindrome(String s) {\n        int i = 0, j = s.length() - 1;\n        while (i < j) {\n            while (i < j && !Character.isLetterOrDigit(s.charAt(i))) i++;\n            while (i < j && !Character.isLetterOrDigit(s.charAt(j))) j--;\n            if (Character.toLowerCase(s.charAt(i)) != Character.toLowerCase(s.charAt(j))) return false;\n            i++; j--;\n        }\n        return true;\n    }\n}",
      cpp: "#include <string>\n#include <cctype>\nusing namespace std;\n\nbool isPalindrome(string s) {\n    int i = 0, j = s.size() - 1;\n    while(i < j) {\n        while(i < j && !isalnum(s[i])) i++;\n        while(i < j && !isalnum(s[j])) j--;\n        if(tolower(s[i]) != tolower(s[j])) return false;\n        i++; j--;\n    }\n    return true;\n}"
    },
    options: ["Two-Pointer O(N) Time", "O(N^2) Recursive", "O(2^N) Exponential", "O(N log N) Sorting"],
    correctAnswer: 0,
    explanation: "Two pointers inward scan checks valid alphanumeric characters from both ends in linear time O(N)."
  },

  // ===================== MODULE 4: VERBAL & ENGLISH MODULE =====================
  {
    id: "verb-1",
    module: "Verbal & English",
    track: "TCS NQT",
    section: "Verbal Ability",
    topic: "Sentence Correction",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "Identify the correct replacement for the bold phrase: 'The team of researchers __have discovered__ an ancient site.'",
    options: ["have discovered", "has discovered", "are discovering", "were discovered"],
    correctAnswer: 1, // has discovered
    explanation: "The true subject of the sentence is the collective noun 'team' (singular), not 'researchers'. Therefore, the singular verb 'has discovered' is required."
  },
  {
    id: "verb-2",
    module: "Verbal & English",
    track: "Banking Exams",
    section: "English Language",
    topic: "Error Spotting",
    year: "SBI Clerk 2024",
    difficulty: "Medium",
    question: "Locate the segment with an error:\n(A) Had the government / (B) implemented the economic reforms earlier, / (C) the inflation rate would not / (D) have rose so sharply.",
    options: ["Part A", "Part B", "Part C", "Part D"],
    correctAnswer: 3, // Part D
    explanation: "In third conditional structures ('would have + V3'), past participle of 'rise' is 'risen', not 'rose'."
  },

  // ===================== MODULE 5: BANKING & GENERAL AWARENESS =====================
  {
    id: "ga-1",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Monetary Policy & RBI",
    year: "SBI PO Mains 2024",
    difficulty: "Easy",
    question: "What is the primary policy interest rate that the Reserve Bank of India (RBI) uses to signal its monetary stance to the economy?",
    options: ["Bank Rate", "Repo Rate", "Reverse Repo Rate", "SDR Rate"],
    correctAnswer: 1, // Repo Rate
    explanation: "The Repo Rate (Repurchase Option rate) is the benchmark policy rate used by the Monetary Policy Committee (MPC) of RBI to manage liquidity and control inflation."
  },
  {
    id: "ga-2",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Financial Abbreviations",
    year: "IBPS PO Mains 2023",
    difficulty: "Easy",
    question: "In Indian banking, what does the acronym 'RTGS' stand for?",
    options: [
      "Real Time Gross Settlement",
      "Real Transfer Government Scheme",
      "Regional Treasury Gross Security",
      "Rapid Transaction Gateway System"
    ],
    correctAnswer: 0, // Real Time Gross Settlement
    explanation: "RTGS stands for Real Time Gross Settlement, an electronic funds transfer system operated by the RBI for high-value continuous transactions."
  }
];

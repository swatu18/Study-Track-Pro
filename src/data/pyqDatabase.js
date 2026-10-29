export const pyqDatabase = [
  // =========================================================================
  // MODULE 1: APTITUDE & QUANTITATIVE (14 Questions)
  // =========================================================================
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
  {
    id: "apt-8",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Simple & Compound Interest",
    year: "SBI Clerk 2024",
    difficulty: "Medium",
    question: "The difference between compound interest and simple interest on a certain principal sum at 10% per annum for 2 years is Rs. 140. Find the principal sum.",
    options: ["Rs. 12,000", "Rs. 14,000", "Rs. 15,000", "Rs. 16,000"],
    correctAnswer: 1, // Rs. 14,000
    explanation: "For 2 years: Difference = P * (R / 100)^2.\n140 = P * (10 / 100)^2 = P * (1 / 100).\nP = 140 * 100 = Rs. 14,000."
  },
  {
    id: "apt-9",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Ratio & Proportion",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    question: "Two numbers are in the ratio 4 : 5. If 6 is subtracted from each, the ratio becomes 7 : 9. Find the larger number.",
    options: ["50", "60", "70", "80"],
    correctAnswer: 1, // 60
    explanation: "Let the numbers be 4x and 5x.\n(4x - 6) / (5x - 6) = 7 / 9.\n9(4x - 6) = 7(5x - 6)\n36x - 54 = 35x - 42\nx = 12.\nLarger number = 5x = 5 * 12 = 60."
  },
  {
    id: "apt-10",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Averages & Mixtures",
    year: "IBPS PO 2024",
    difficulty: "Medium",
    question: "The average weight of 24 students in a batch is 45 kg. If the teacher's weight is included, the average increases by 500 grams. What is the teacher's weight?",
    options: ["55.5 kg", "57.5 kg", "58 kg", "60 kg"],
    correctAnswer: 1, // 57.5 kg
    explanation: "Initial total weight = 24 * 45 = 1080 kg.\nNew count = 25 members, new average = 45.5 kg.\nNew total = 25 * 45.5 = 1137.5 kg.\nTeacher's weight = 1137.5 - 1080 = 57.5 kg."
  },
  {
    id: "apt-11",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Permutation & Probability",
    year: "TCS NQT 2024",
    difficulty: "Hard",
    question: "In how many distinct ways can the letters of the word 'LEADER' be arranged such that all vowels always occur together?",
    options: ["72", "144", "240", "360"],
    correctAnswer: 0, // 72
    explanation: "Vowels in LEADER: E, A, E (3 vowels: two E's, one A).\nConsonants: L, D, R (3 consonants).\nTreat the 3 vowels as 1 single block => Total units = 3 consonants + 1 block = 4 units.\n4 units can be arranged in 4! = 24 ways.\nThe vowels (E, A, E) can be arranged internally in 3! / 2! = 3 ways.\nTotal distinct arrangements = 24 * 3 = 72 ways."
  },
  {
    id: "apt-12",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Pipes & Cisterns",
    year: "SBI PO 2023",
    difficulty: "Medium",
    question: "Pipe A can fill a tank in 12 hours, while Pipe B can empty it in 18 hours. If both pipes are opened simultaneously in an empty tank, how long will it take to fill completely?",
    options: ["30 hours", "32 hours", "36 hours", "42 hours"],
    correctAnswer: 2, // 36 hours
    explanation: "Capacity = LCM(12, 18) = 36 units.\nInflow rate of A = +3 units/hr.\nOutflow rate of B = -2 units/hr.\nNet rate = +3 - 2 = +1 unit/hr.\nTotal time = 36 / 1 = 36 hours."
  },
  {
    id: "apt-13",
    module: "Aptitude",
    track: "TCS NQT",
    section: "Numerical Ability",
    topic: "Mensuration & Geometry",
    year: "TCS NQT 2023",
    difficulty: "Medium",
    question: "The perimeter of a rectangle is 84 cm and the ratio of its length to breadth is 4 : 3. What is the area of this rectangle?",
    options: ["420 sq cm", "432 sq cm", "448 sq cm", "456 sq cm"],
    correctAnswer: 1, // 432 sq cm
    explanation: "Perimeter = 2(L + B) = 84 => L + B = 42.\nRatio L : B = 4 : 3 => 7 units = 42 => 1 unit = 6.\nLength = 4 * 6 = 24 cm, Breadth = 3 * 6 = 18 cm.\nArea = Length * Breadth = 24 * 18 = 432 sq cm."
  },
  {
    id: "apt-14",
    module: "Aptitude",
    track: "Banking Exams",
    section: "Quantitative Aptitude",
    topic: "Data Interpretation",
    year: "IBPS Clerk 2024",
    difficulty: "Easy",
    question: "A company produced 4,800 units in 2023 and 6,000 units in 2024. What is the percentage increase in production?",
    options: ["20%", "22.5%", "25%", "28%"],
    correctAnswer: 2, // 25%
    explanation: "Increase = 6,000 - 4,800 = 1,200 units.\nPercentage Increase = (1,200 / 4,800) * 100 = (1/4) * 100 = 25%."
  },

  // =========================================================================
  // MODULE 2: REASONING & PUZZLES (12 Questions)
  // =========================================================================
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
    explanation: "Since some switches are firewalls, the conversion 'Some firewalls are switches' is definitively valid. Conclusion II (All routers are firewalls) has no direct certainty, so only I follows."
  },
  {
    id: "reas-6",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Direction Sense",
    year: "SBI Clerk 2024",
    difficulty: "Medium",
    question: "Ravi walks 15 meters North, turns right and walks 20 meters, turns right again and walks 15 meters, then turns left and walks 10 meters. How far and in which direction is he from his starting point?",
    options: ["30 m East", "25 m East", "30 m West", "25 m North"],
    correctAnswer: 0, // 30 m East
    explanation: "North movement (+15) and South movement (-15) cancel out: Y-displacement = 0.\nEast movement = 20 + 10 = 30 meters East.\nHence, he is exactly 30 meters East of the starting point."
  },
  {
    id: "reas-7",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Order & Ranking",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    question: "In a class of 45 students, Sneha ranks 14th from the top. What is her rank from the bottom?",
    options: ["31st", "32nd", "33rd", "34th"],
    correctAnswer: 1, // 32nd
    explanation: "Total = Top + Bottom - 1 => 45 = 14 + Bottom - 1 => Bottom = 45 - 13 = 32nd."
  },
  {
    id: "reas-8",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Linear Seating Puzzles",
    year: "IBPS PO 2024",
    difficulty: "Hard",
    question: "Seven candidates (A, B, C, D, E, F, G) sit in a straight line facing North. D sits exactly in the middle. B sits to the immediate left of D. C sits at the extreme right end. A is third to the left of C. Who is sitting at the extreme left end?",
    options: ["E or F", "G only", "B", "A"],
    correctAnswer: 0, // E or F
    explanation: "Seven positions (1 to 7):\nMiddle is position 4 => D is at 4.\nB is immediate left of D => B is at 3.\nC is at extreme right => C is at 7.\nA is 3rd to left of C => A is at 7 - 3 = 4 (overlap constraint checked), so A is adjacent to B or at pos 2, leaving positions 1 occupied by either E or F depending on remaining conditions."
  },
  {
    id: "reas-9",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Clock & Calendar",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "What is the angle between the hour hand and the minute hand of a clock at 3:40 PM?",
    options: ["120 degrees", "130 degrees", "135 degrees", "140 degrees"],
    correctAnswer: 1, // 130 degrees
    explanation: "Angle formula = |30*H - (11/2)*M|.\nAt 3:40: H = 3, M = 40.\nAngle = |30(3) - (11/2)(40)| = |90 - 220| = |-130| = 130 degrees."
  },
  {
    id: "reas-10",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Statement & Assumptions",
    year: "SBI PO 2023",
    difficulty: "Medium",
    question: "Statement: 'The national bank has launched a biometric contactless authentication feature to reduce ATM cash fraud.'\nAssumptions:\nI. Biometric security is harder to replicate than a 4-digit PIN.\nII. Customers will refuse to adopt biometric verification.",
    options: ["Only Assumption I is implicit", "Only Assumption II is implicit", "Both I and II are implicit", "Neither I nor II is implicit"],
    correctAnswer: 0, // Only I is implicit
    explanation: "Launching a biometric feature assumes it offers superior fraud protection (I is implicit). Assuming customers will refuse contradicts the bank's initiative (II is not implicit)."
  },
  {
    id: "reas-11",
    module: "Reasoning",
    track: "TCS NQT",
    section: "Reasoning Ability",
    topic: "Letter-Number Series",
    year: "TCS NQT 2024",
    difficulty: "Easy",
    question: "Identify the next term in the series: A2Z, C4X, E8V, G16T, ?",
    options: ["I32R", "I32S", "H32R", "I24R"],
    correctAnswer: 0, // I32R
    explanation: "Letters 1: A(+2)->C(+2)->E(+2)->G(+2)->I.\nNumbers: 2(*2)->4(*2)->8(*2)->16(*2)->32.\nLetters 2: Z(-2)->X(-2)->V(-2)->T(-2)->R.\nNext term = I32R."
  },
  {
    id: "reas-12",
    module: "Reasoning",
    track: "Banking Exams",
    section: "Reasoning & Puzzles",
    topic: "Data Sufficiency",
    year: "IBPS Clerk 2024",
    difficulty: "Medium",
    question: "Is X older than Y?\nStatement 1: X was born 3 years before Z.\nStatement 2: Y was born 5 years after Z.",
    options: ["Statement 1 alone is sufficient", "Statement 2 alone is sufficient", "Both statements together are sufficient", "Neither statement is sufficient"],
    correctAnswer: 2, // Both together
    explanation: "From St. 1: X = Z + 3. From St. 2: Y = Z - 5.\nCombining both: X = Y + 8, meaning X is strictly 8 years older than Y. Both statements together are required and sufficient."
  },

  // =========================================================================
  // MODULE 3: HANDS-ON CODING (8 Questions)
  // =========================================================================
  {
    id: "code-1",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Array In-Place Manipulation",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    isCoding: true,
    question: "Write an algorithm to move all zeroes present in an integer array to the end while maintaining the relative order of the non-zero elements. Must be solved in O(N) time and O(1) auxiliary space.",
    sampleInput: "[0, 1, 0, 3, 12]",
    sampleOutput: "[1, 3, 12, 0, 0]",
    starterCode: {
      python: "# TCS NQT Coding Sandbox\ndef moveZeroes(arr):\n    insert_idx = 0\n    for num in arr:\n        if num != 0:\n            arr[insert_idx] = num\n            insert_idx += 1\n    while insert_idx < len(arr):\n        arr[insert_idx] = 0\n        insert_idx += 1\n    return arr\n\nprint(moveZeroes([0, 1, 0, 3, 12]))",
      java: "// TCS NQT Java Solution\npublic class Solution {\n    public static void moveZeroes(int[] nums) {\n        int insertIdx = 0;\n        for (int num : nums) {\n            if (num != 0) nums[insertIdx++] = num;\n        }\n        while (insertIdx < nums.length) nums[insertIdx++] = 0;\n    }\n}",
      cpp: "// TCS NQT C++ Solution\n#include <vector>\nusing namespace std;\n\nvoid moveZeroes(vector<int>& nums) {\n    int insertIdx = 0;\n    for(int num : nums) {\n        if(num != 0) nums[insertIdx++] = num;\n    }\n    while(insertIdx < nums.size()) nums[insertIdx++] = 0;\n}"
    },
    options: ["O(N) Time, O(1) Space", "O(N^2) Time, O(1) Space", "O(N) Time, O(N) Space", "O(N log N) Time"],
    correctAnswer: 0,
    explanation: "Two-pointer write approach overwrites non-zero elements into compressed positions and pads zeroes at the tail. Time: O(N), Space: O(1)."
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
  {
    id: "code-3",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Two Sum Hash Map",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    isCoding: true,
    question: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target in O(N) time.",
    sampleInput: "nums = [2, 7, 11, 15], target = 9",
    sampleOutput: "[0, 1]",
    starterCode: {
      python: "def twoSum(nums, target):\n    lookup = {}\n    for i, num in enumerate(nums):\n        diff = target - num\n        if diff in lookup:\n            return [lookup[diff], i]\n        lookup[num] = i\n    return []\n\nprint(twoSum([2, 7, 11, 15], 9))",
      java: "import java.util.HashMap;\npublic class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        HashMap<Integer, Integer> map = new HashMap<>();\n        for (int i = 0; i < nums.length; i++) {\n            int diff = target - nums[i];\n            if (map.containsKey(diff)) return new int[] { map.get(diff), i };\n            map.put(nums[i], i);\n        }\n        return new int[]{};\n    }\n}",
      cpp: "#include <vector>\n#include <unordered_map>\nusing namespace std;\nvector<int> twoSum(vector<int>& nums, int target) {\n    unordered_map<int, int> mp;\n    for(int i = 0; i < nums.size(); i++) {\n        int complement = target - nums[i];\n        if(mp.count(complement)) return {mp[complement], i};\n        mp[nums[i]] = i;\n    }\n    return {};\n}"
    },
    options: ["O(N) Hash Table Lookup", "O(N^2) Brute Force", "O(N log N) Binary Search", "O(1) Space Lookup"],
    correctAnswer: 0,
    explanation: "Using an unordered hash map enables single-pass complement lookups in O(1) average time, achieving total O(N) time."
  },
  {
    id: "code-4",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Stacks & Valid Parentheses",
    year: "TCS NQT 2023",
    difficulty: "Medium",
    isCoding: true,
    question: "Given a string containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid using a LIFO stack.",
    sampleInput: "\"()[]{}\"",
    sampleOutput: "true",
    starterCode: {
      python: "def isValid(s: str) -> bool:\n    stack = []\n    mapping = {')': '(', '}': '{', ']': '['}\n    for char in s:\n        if char in mapping:\n            top = stack.pop() if stack else '#'\n            if mapping[char] != top: return False\n        else:\n            stack.append(char)\n    return not stack\n\nprint(isValid(\"()[]{}\"))",
      java: "import java.util.Stack;\npublic class Solution {\n    public static boolean isValid(String s) {\n        Stack<Character> stack = new Stack<>();\n        for (char c : s.toCharArray()) {\n            if (c == '(') stack.push(')');\n            else if (c == '{') stack.push('}');\n            else if (c == '[') stack.push(']');\n            else if (stack.isEmpty() || stack.pop() != c) return false;\n        }\n        return stack.isEmpty();\n    }\n}",
      cpp: "#include <stack>\n#include <string>\nusing namespace std;\nbool isValid(string s) {\n    stack<char> st;\n    for(char c : s) {\n        if(c == '(') st.push(')');\n        else if(c == '{') st.push('}');\n        else if(c == '[') st.push(']');\n        else if(st.empty() || st.top() != c) return false;\n        else st.pop();\n    }\n    return st.empty();\n}"
    },
    options: ["O(N) Stack Verification", "O(N^2) Nested Replace", "O(1) Counter Only", "O(N log N) Sorting"],
    correctAnswer: 0,
    explanation: "A LIFO stack matches opening and closing brackets in correct nested sequence in O(N) time and O(N) space."
  },
  {
    id: "code-5",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Rotate Array by K",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    isCoding: true,
    question: "Rotate an array to the right by k steps, where k is non-negative. Implement the 3-step reverse algorithm in O(1) extra space.",
    sampleInput: "nums = [1,2,3,4,5,6,7], k = 3",
    sampleOutput: "[5,6,7,1,2,3,4]",
    starterCode: {
      python: "def rotate(nums, k):\n    n = len(nums)\n    k = k % n\n    nums.reverse()\n    nums[:k] = reversed(nums[:k])\n    nums[k:] = reversed(nums[k:])\n    return nums\n\nprint(rotate([1,2,3,4,5,6,7], 3))",
      java: "public class Solution {\n    public void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    private void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int temp = nums[start];\n            nums[start++] = nums[end];\n            nums[end--] = temp;\n        }\n    }\n}",
      cpp: "#include <vector>\n#include <algorithm>\nusing namespace std;\nvoid rotate(vector<int>& nums, int k) {\n    k %= nums.size();\n    reverse(nums.begin(), nums.end());\n    reverse(nums.begin(), nums.begin() + k);\n    reverse(nums.begin() + k, nums.end());\n}"
    },
    options: ["O(N) Time, O(1) Extra Space", "O(N) Extra Array", "O(N*K) Shift Approach", "O(N^2) Quadratic"],
    correctAnswer: 0,
    explanation: "Reversing the entire array, then reversing the first k elements, then reversing the remaining elements achieves right rotation in O(N) time with O(1) space."
  },
  {
    id: "code-6",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Reverse Words in String",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    isCoding: true,
    question: "Given an input string s, reverse the order of the words. A word is defined as a sequence of non-space characters. Return words separated by a single space without leading/trailing spaces.",
    sampleInput: "\"the sky is blue\"",
    sampleOutput: "\"blue is sky the\"",
    starterCode: {
      python: "def reverseWords(s: str) -> str:\n    return ' '.join(s.strip().split()[::-1])\n\nprint(reverseWords(\"the sky is blue\"))",
      java: "public class Solution {\n    public static String reverseWords(String s) {\n        String[] parts = s.trim().split(\"\\\\s+\");\n        StringBuilder sb = new StringBuilder();\n        for (int i = parts.length - 1; i >= 0; i--) {\n            sb.append(parts[i]);\n            if (i > 0) sb.append(\" \");\n        }\n        return sb.toString();\n    }\n}",
      cpp: "#include <string>\n#include <sstream>\n#include <vector>\nusing namespace std;\nstring reverseWords(string s) {\n    stringstream ss(s);\n    string word, res;\n    vector<string> words;\n    while(ss >> word) words.push_back(word);\n    for(int i = words.size()-1; i >= 0; i--) {\n        res += words[i] + (i > 0 ? \" \" : \"\");\n    }\n    return res;\n}"
    },
    options: ["O(N) String Tokenization", "O(N^2) Repeated Search", "O(N log N) Sort", "O(2^N) Recursion"],
    correctAnswer: 0,
    explanation: "Extracting valid tokens and pushing them into reverse order delivers the clean formatted sentence in linear O(N) time."
  },
  {
    id: "code-7",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Find Second Largest Element",
    year: "TCS NQT 2024",
    difficulty: "Easy",
    isCoding: true,
    question: "Given an array of integers, find the second largest distinct element in a single pass without sorting.",
    sampleInput: "[12, 35, 1, 10, 34, 1]",
    sampleOutput: "34",
    starterCode: {
      python: "def secondLargest(arr):\n    first = second = float('-inf')\n    for n in arr:\n        if n > first:\n            second, first = first, n\n        elif n > second and n != first:\n            second = n\n    return second if second != float('-inf') else -1\n\nprint(secondLargest([12, 35, 1, 10, 34, 1]))",
      java: "public class Solution {\n    public static int secondLargest(int[] arr) {\n        int first = Integer.MIN_VALUE, second = Integer.MIN_VALUE;\n        for (int n : arr) {\n            if (n > first) {\n                second = first;\n                first = n;\n            } else if (n > second && n != first) {\n                second = n;\n            }\n        }\n        return second == Integer.MIN_VALUE ? -1 : second;\n    }\n}",
      cpp: "#include <vector>\n#include <climits>\nusing namespace std;\nint secondLargest(vector<int>& arr) {\n    int first = INT_MIN, second = INT_MIN;\n    for(int n : arr) {\n        if(n > first) { second = first; first = n; }\n        else if(n > second && n != first) { second = n; }\n    }\n    return second == INT_MIN ? -1 : second;\n}"
    },
    options: ["Single Pass O(N) Time", "Sorting O(N log N)", "Double Pass O(2N)", "Priority Queue O(N log K)"],
    correctAnswer: 0,
    explanation: "Maintaining two scalar variables `first` and `second` allows finding the answer in a single linear scan O(N) without auxiliary storage."
  },
  {
    id: "code-8",
    module: "Coding",
    track: "TCS NQT",
    section: "Hands-on Coding",
    topic: "Longest Common Prefix",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    isCoding: true,
    question: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string.",
    sampleInput: "[\"flower\", \"flow\", \"flight\"]",
    sampleOutput: "\"fl\"",
    starterCode: {
      python: "def longestCommonPrefix(strs):\n    if not strs: return \"\"\n    prefix = strs[0]\n    for s in strs[1:]:\n        while not s.startswith(prefix):\n            prefix = prefix[:-1]\n            if not prefix: return \"\"\n    return prefix\n\nprint(longestCommonPrefix([\"flower\", \"flow\", \"flight\"]))",
      java: "public class Solution {\n    public static String longestCommonPrefix(String[] strs) {\n        if (strs == null || strs.length == 0) return \"\";\n        String prefix = strs[0];\n        for (int i = 1; i < strs.length; i++) {\n            while (strs[i].indexOf(prefix) != 0) {\n                prefix = prefix.substring(0, prefix.length() - 1);\n                if (prefix.isEmpty()) return \"\";\n            }\n        }\n        return prefix;\n    }\n}",
      cpp: "#include <vector>\n#include <string>\nusing namespace std;\nstring longestCommonPrefix(vector<string>& strs) {\n    if (strs.empty()) return \"\";\n    string prefix = strs[0];\n    for (size_t i = 1; i < strs.size(); i++) {\n        while (strs[i].find(prefix) != 0) {\n            prefix = prefix.substr(0, prefix.length() - 1);\n            if (prefix.empty()) return \"\";\n        }\n    }\n    return prefix;\n}"
    },
    options: ["Horizontal Scanning O(S)", "Vertical Scanning O(S)", "Divide and Conquer", "Binary Search on Length"],
    correctAnswer: 0,
    explanation: "Horizontal prefix trimming iteratively truncates candidate prefix until it matches each word, running in O(S) where S is sum of all characters."
  },

  // =========================================================================
  // MODULE 4: VERBAL & ENGLISH (8 Questions)
  // =========================================================================
  {
    id: "verb-1",
    module: "Verbal & English",
    track: "TCS NQT",
    section: "Verbal Ability",
    topic: "Subject-Verb Agreement",
    year: "TCS NQT 2024",
    difficulty: "Medium",
    question: "Identify the correct replacement for the bold phrase: 'The team of researchers __have discovered__ an ancient site.'",
    options: ["have discovered", "has discovered", "are discovering", "were discovered"],
    correctAnswer: 1, // has discovered
    explanation: "The true subject of the sentence is the collective noun 'team' (singular), not 'researchers'. Therefore, the singular verb 'has discovered' is grammatically correct."
  },
  {
    id: "verb-2",
    module: "Verbal & English",
    track: "Banking Exams",
    section: "English Language",
    topic: "Error Spotting",
    year: "SBI Clerk 2024",
    difficulty: "Medium",
    question: "Locate the segment containing an error:\n(A) Had the government / (B) implemented the economic reforms earlier, / (C) the inflation rate would not / (D) have rose so sharply.",
    options: ["Part A", "Part B", "Part C", "Part D"],
    correctAnswer: 3, // Part D
    explanation: "In third conditional structures ('would have + V3'), past participle of 'rise' is 'risen', not 'rose'."
  },
  {
    id: "verb-3",
    module: "Verbal & English",
    track: "TCS NQT",
    section: "Verbal Ability",
    topic: "Cloze Test & Vocabulary",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    question: "Fill in the blank with the most appropriate word: 'The company decided to _______ the merger until market volatility settled.'",
    options: ["defer", "deter", "defy", "diffuse"],
    correctAnswer: 0, // defer
    explanation: "'Defer' means to put off to a later time or postpone, which fits the context of waiting for market conditions to stabilize."
  },
  {
    id: "verb-4",
    module: "Verbal & English",
    track: "Banking Exams",
    section: "English Language",
    topic: "Idioms & Phrases",
    year: "IBPS PO 2024",
    difficulty: "Medium",
    question: "What is the meaning of the idiom 'To burn the candle at both ends'?",
    options: [
      "To waste money extravagantly",
      "To work exhausting hours from early morning until late night",
      "To cause accidental damage to property",
      "To make peace with an opponent"
    ],
    correctAnswer: 1, // To work exhausting hours
    explanation: "'To burn the candle at both ends' means overworking oneself by waking up very early and sleeping very late."
  },
  {
    id: "verb-5",
    module: "Verbal & English",
    track: "TCS NQT",
    section: "Verbal Ability",
    topic: "Para Jumbles",
    year: "TCS NQT 2024",
    difficulty: "Hard",
    question: "Rearrange the sentences into a coherent paragraph:\nP. Artificial Intelligence has accelerated rapidly.\nQ. Consequently, ethical guidelines must keep pace.\nR. In recent years, generative models have emerged.\nS. These systems create synthetic text, audio, and code.",
    options: ["P-R-S-Q", "R-P-Q-S", "S-R-P-Q", "P-Q-R-S"],
    correctAnswer: 0, // P-R-S-Q
    explanation: "P introduces rapid AI growth, R specifies generative models, S details what 'These systems' create, and Q concludes with the necessary ethical consequence."
  },
  {
    id: "verb-6",
    module: "Verbal & English",
    track: "Banking Exams",
    section: "English Language",
    topic: "Sentence Improvement",
    year: "SBI PO 2023",
    difficulty: "Medium",
    question: "Choose the correct substitution for: 'No sooner did the bell ring __when__ the students rushed out of the classroom.'",
    options: ["when", "then", "than", "and"],
    correctAnswer: 2, // than
    explanation: "'No sooner' is always paired correlatively with 'than' ('No sooner ... than'). 'Hardly/Scarcely' pairs with 'when'."
  },
  {
    id: "verb-7",
    module: "Verbal & English",
    track: "TCS NQT",
    section: "Verbal Ability",
    topic: "Active & Passive Voice",
    year: "TCS NQT 2023",
    difficulty: "Easy",
    question: "Convert to passive voice: 'The senior engineer has tested all software modules.'",
    options: [
      "All software modules have been tested by the senior engineer.",
      "All software modules had been tested by the senior engineer.",
      "All software modules was tested by the senior engineer.",
      "All software modules are being tested by the senior engineer."
    ],
    correctAnswer: 0,
    explanation: "Present perfect active ('has tested') converts to plural passive ('have been tested') agreeing with 'All software modules'."
  },
  {
    id: "verb-8",
    module: "Verbal & English",
    track: "Banking Exams",
    section: "English Language",
    topic: "One-Word Substitution",
    year: "IBPS Clerk 2024",
    difficulty: "Easy",
    question: "A person who is unable to pay their debts in commercial transactions is known as:",
    options: ["Insolvent", "Altruist", "Iconoclast", "Fugitive"],
    correctAnswer: 0, // Insolvent
    explanation: "'Insolvent' (or bankrupt) denotes someone who cannot satisfy their financial obligations as they become due."
  },

  // =========================================================================
  // MODULE 5: BANKING & GENERAL AWARENESS (8 Questions)
  // =========================================================================
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
  },
  {
    id: "ga-3",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Priority Sector Lending",
    year: "SBI Clerk 2024",
    difficulty: "Medium",
    question: "What percentage of Adjusted Net Bank Credit (ANBC) or Credit Equivalent Amount of Off-Balance Sheet Exposure (CEOBE) is mandated for domestic commercial banks as Priority Sector Lending (PSL)?",
    options: ["30%", "35%", "40%", "50%"],
    correctAnswer: 2, // 40%
    explanation: "RBI mandates that domestic scheduled commercial banks allocate 40% of their ANBC or CEOBE to designated Priority Sectors (Agriculture, MSME, Education, Housing, etc.)."
  },
  {
    id: "ga-4",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Deposit Insurance (DICGC)",
    year: "IBPS PO 2024",
    difficulty: "Easy",
    question: "Under the DICGC Act, what is the maximum insurance coverage provided to a bank depositor per insured bank (principal + interest)?",
    options: ["Rs. 1 Lakh", "Rs. 2 Lakhs", "Rs. 5 Lakhs", "Rs. 10 Lakhs"],
    correctAnswer: 2, // Rs. 5 Lakhs
    explanation: "Deposit Insurance and Credit Guarantee Corporation (DICGC), a wholly owned subsidiary of RBI, provides insurance coverage of up to Rs. 5,00,000 per depositor per bank."
  },
  {
    id: "ga-5",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Monetary Policy Committee (MPC)",
    year: "SBI PO 2023",
    difficulty: "Medium",
    question: "How many members constitute the Monetary Policy Committee (MPC) of India, and who serves as its ex-officio Chairman?",
    options: [
      "5 members; Finance Minister",
      "6 members; RBI Governor",
      "6 members; Chief Economic Advisor",
      "7 members; Deputy Governor of RBI"
    ],
    correctAnswer: 1, // 6 members; RBI Governor
    explanation: "The MPC consists of 6 members: 3 from the RBI (including the Governor) and 3 external members nominated by the Central Government. The RBI Governor is ex-officio Chairman."
  },
  {
    id: "ga-6",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Negotiable Instruments Act",
    year: "IBPS Clerk 2024",
    difficulty: "Medium",
    question: "Under Section 138 of the Negotiable Instruments Act, 1881, dishonour of a cheque for insufficiency of funds is punishable with imprisonment up to:",
    options: ["1 year", "2 years", "3 years", "5 years"],
    correctAnswer: 1, // 2 years
    explanation: "Under Section 138 of the NI Act, 1881, cheque bouncing due to insufficient funds can attract imprisonment for a term up to 2 years, or fine up to twice the amount of the cheque, or both."
  },
  {
    id: "ga-7",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Inflation Indicators",
    year: "SBI PO 2024",
    difficulty: "Easy",
    question: "Which index does the Reserve Bank of India use as its headline metric to target inflation in India?",
    options: ["Wholesale Price Index (WPI)", "Consumer Price Index (CPI) Combined", "Index of Industrial Production (IIP)", "GDP Deflator"],
    correctAnswer: 1, // Consumer Price Index Combined
    explanation: "Under the flexible inflation targeting framework adopted following the Urjit Patel Committee report, RBI targets headline CPI (Combined) inflation at 4% with a tolerance band of +/- 2%."
  },
  {
    id: "ga-8",
    module: "Banking Awareness",
    track: "Banking Exams",
    section: "Banking Awareness",
    topic: "Capital Adequacy & Basel Norms",
    year: "IBPS PO Mains 2023",
    difficulty: "Hard",
    question: "According to RBI guidelines on Basel III capital regulations, what is the minimum Capital to Risk-Weighted Assets Ratio (CRAR) required for Indian scheduled commercial banks?",
    options: ["8.0%", "9.0%", "10.5%", "11.5%"],
    correctAnswer: 1, // 9.0%
    explanation: "While Basel III international norms set minimum CRAR at 8.0%, the RBI stipulates a more conservative minimum CRAR of 9.0% (excluding the 2.5% Capital Conservation Buffer) for Indian banks."
  }
];

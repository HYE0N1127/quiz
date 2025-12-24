export type Quiz = {
  type: QuizType;
  difficulty: QuizDifficulty;
  category: string;
  question: string;
  correctAnswer: string;
  incorrectAnswer: string[];
};

export type QuizType = "multiple" | "boolean";

export type QuizDifficulty = "easy" | "medium" | "hard";

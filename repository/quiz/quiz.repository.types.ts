import { Category } from "../../type/category.js";
import { QuizDifficulty, QuizType } from "../../type/quiz.js";

export type QuizResponse = {
  response_code: number;
  results: QuizItemResponse[];
};

export type QuizItemResponse = {
  type: QuizType;
  category: string;
  difficulty: QuizDifficulty;
  incorrect_answers: string[];
  correct_answer: string;
  question: string;
};

export type CategoryResponse = {
  trivia_categories: Category[];
};

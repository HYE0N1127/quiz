import { Category } from "../category.js";
import { Quiz } from "../quiz.js";

export type QuizResponse = {
  response_code: number;
  results: Quiz[];
};

export type CategoryResponse = {
  trivia_categories: Category[];
};

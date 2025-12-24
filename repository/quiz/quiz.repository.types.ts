import { Category } from "../../type/category.js";
import { Quiz } from "../../type/quiz.js";

export type QuizResponse = {
  response_code: number;
  results: Quiz[];
};

export type CategoryResponse = {
  trivia_categories: Category[];
};

import { Quiz } from "../../type/quiz.js";
import { QuizItemResponse, QuizResponse } from "./quiz.repository.types.js";

export function QuizDomainMapper(response: QuizItemResponse): Quiz {
  return {
    type: response.type,
    difficulty: response.difficulty,
    category: response.category,
    question: response.question,
    correctAnswer: response.correct_answer,
    incorrectAnswer: response.incorrect_answers,
  };
}

import { QuizItemResponse } from "../repository/quiz/quiz.repository.types.js";
import { QuizDifficulty, QuizType } from "../type/quiz.js";
import { shuffle } from "../util/array.js";

export class Quiz {
  public readonly type: QuizType;
  public readonly difficulty: QuizDifficulty;
  public readonly correctAnswer: string;
  public readonly incorrectAnswers: string[];
  public readonly question: string;
  public readonly category: string;

  constructor(init: QuizItemResponse) {
    this.type = init.type;
    this.difficulty = init.difficulty;
    this.correctAnswer = init.correct_answer;
    this.incorrectAnswers = init.incorrect_answers;
    this.question = init.question;
    this.category = init.category;
  }

  public get answers(): string[] {
    switch (this.type) {
      case "boolean": {
        const answers = [...this.incorrectAnswers];

        if (this.correctAnswer === "True") {
          answers.unshift(this.correctAnswer);
        } else {
          answers.push(this.correctAnswer);
        }

        return answers;
      }
      case "multiple": {
        return shuffle([this.correctAnswer, ...this.incorrectAnswers]);
      }
    }
  }

  public isCorrect = (answer: string): boolean => {
    return this.correctAnswer === answer;
  };
}

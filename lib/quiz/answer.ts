import { Quiz } from "../../model/quiz.js";

export class QuizService {
  private _quizzes: Quiz[];
  private _order: number;
  private _correctCount: number;
  private _incorrectCount: number;

  constructor(_quizzes: Quiz[]) {
    this._quizzes = _quizzes;
    this._order = 0;
    this._correctCount = 0;
    this._incorrectCount = 0;
  }

  public get order(): number {
    return this._order + 1;
  }

  public get correctCount(): number {
    return this._correctCount;
  }

  public get incorrectCount(): number {
    return this._incorrectCount;
  }

  public get amount(): number {
    return this._quizzes.length;
  }

  public set quizzes(value: Quiz[]) {
    this._quizzes = value;
  }

  public setAnswerCount(isCorrect: boolean) {
    if (isCorrect) {
      this._correctCount += 1;
    } else {
      this._incorrectCount += 1;
    }
  }

  public getNextQuiz(): Quiz | undefined {
    this._order += 1;

    if (this._order === this._quizzes.length) {
      return undefined;
    }

    return this._quizzes[this._order];
  }

  public getCurrentQuiz(): Quiz {
    return this._quizzes[this._order]!;
  }
}

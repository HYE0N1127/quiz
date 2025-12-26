import { Quiz } from "../../type/quiz.js";

export class QuizService {
  private _quizzes: Quiz[];
  private _ordinal: number;

  constructor(_quizzes: Quiz[]) {
    this._quizzes = _quizzes;
    this._ordinal = 0;
  }

  public set quizzes(value: Quiz[]) {
    this._quizzes = value;
  }

  public get ordinal(): number {
    return this._ordinal + 1;
  }

  public getNextQuiz(): Quiz | undefined {
    this._ordinal += 1;

    if (this.ordinal === this._quizzes.length) {
      return undefined;
    }

    return this._quizzes[this.ordinal];
  }

  public getCurrentQuiz(): Quiz {
    return this._quizzes[this._ordinal]!;
  }
}

import { Quiz } from "../../model/quiz.js";

// FIXME:  QuizService가 할 수 있는 일이 더 많을 것 같음.
export class QuizService {
  private _quizzes: Quiz[];
  private _order: number;
  private _correctCount: number;
  private _incorrectCount: number;
  private _isLoaded: boolean = false;

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

  public get isFinish(): boolean {
    console.log(this._quizzes.length);
    console.log(this._order + 1);
    return this._isLoaded && this._quizzes.length < this._order + 1;
  }

  public set quizzes(value: Quiz[]) {
    this._quizzes = value;
    this._isLoaded = true;
    this._order = 0;
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

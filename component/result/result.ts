import { SESSION_STORAGE_QUIZ_RESULT_KEY } from "../../constants/storage.js";
import { navigate } from "../../lib/html/route.js";
import { QuizResult } from "../../type/result.js";
import { Component } from "../component.js";

export class ResultPageComponent extends Component<{
  correctAnswer: number;
  incorrectAnswer: number;
}> {
  constructor() {
    super(
      `
      <div class="result">
        <span class="result__score"></span>
        <span class="result__count"></span>
        <button class="result__back">다른 문제 풀러가기</button>
      </div>
    `,
      {
        correctAnswer: 0,
        incorrectAnswer: 0,
      }
    );
  }

  private parseSessionStorageData = <QuizResult>(): QuizResult | undefined => {
    const raw = sessionStorage.getItem(SESSION_STORAGE_QUIZ_RESULT_KEY);

    if (!raw) return undefined;

    sessionStorage.removeItem(SESSION_STORAGE_QUIZ_RESULT_KEY);

    try {
      return JSON.parse(raw) as QuizResult;
    } catch {
      return undefined;
    }
  };

  public componentDidMount = () => {
    const payload = this.parseSessionStorageData<QuizResult>();

    if (payload == null) {
      alert("잘못된 접근입니다.");
      navigate({ route: "home" });
      return;
    }

    this.state.value = {
      correctAnswer: Number(payload.correctAnswer),
      incorrectAnswer: Number(payload.incorrectAnswer),
    };
  };

  private calculateScore(correctCount: number, incorrectCount: number): string {
    const score = (correctCount / (correctCount + incorrectCount)) * 100;

    return `${score.toFixed(1)}점`;
  }

  public render(): void {
    const { correctAnswer, incorrectAnswer } = this.state.value;

    const scoreElement = this.element.querySelector(
      ".result__score"
    ) as HTMLSpanElement;
    const countElement = this.element.querySelector(
      ".result__count"
    ) as HTMLSpanElement;
    const backButtonElement = this.element.querySelector(
      ".result__back"
    ) as HTMLButtonElement;

    scoreElement.textContent = this.calculateScore(
      correctAnswer,
      incorrectAnswer
    );
    countElement.textContent = `정답 갯수: ${correctAnswer}개, 오답 갯수: ${incorrectAnswer}개`;

    backButtonElement.onclick = () => {
      navigate({ route: "home" });
    };
  }
}

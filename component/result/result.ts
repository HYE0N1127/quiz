import { navigate } from "../../lib/html/route.js";
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

  public componentDidMount = () => {
    // FIXME: QueryParameter로 받으면 유저가 URL을 조작해서 점수를 다르게 받을 수 있음. 다른 방법을 생각해볼것
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    if (payload.correctAnswer == null || payload.incorrectAnswer == null) {
      alert("잘못된 접근입니다.");
      navigate({ route: "home" });
    }

    this.state.value = {
      correctAnswer: Number(payload.correctAnswer),
      incorrectAnswer: Number(payload.incorrectAnswer),
      // 점수
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

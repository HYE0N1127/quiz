import { navigate } from "../../lib/html/route.js";
import { calculateScore } from "../../lib/quiz/result.js";
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

    this.fetch();
  }

  private fetch = () => {
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    console.log(payload);

    if (payload.correctAnswer == null || payload.incorrectAnswer == null) {
    }

    this.state.value = {
      correctAnswer: Number(payload.correctAnswer),
      incorrectAnswer: Number(payload.incorrectAnswer),
    };
  };

  protected render(): void {
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

    scoreElement.textContent = calculateScore(correctAnswer, incorrectAnswer);
    countElement.textContent = `정답 갯수: ${correctAnswer}개, 오답 갯수: ${incorrectAnswer}개`;

    backButtonElement.onclick = () => {
      navigate({ route: "home" });
    };
  }
}

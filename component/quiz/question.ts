import { Quiz } from "./../../type/quiz.js";
import { Component } from "../component.js";
import { QuizRepository } from "../../repository/quiz/quiz.repository.js";
import { BASE_URL } from "../../constants/url.js";

export class QuestionComponent extends Component<{
  currentQuiz: Quiz | undefined;
}> {
  private readonly repository: QuizRepository;

  constructor() {
    super(
      `
      <div class="quiz">
        <div class="quiz__content">
          <div class="quiz__question">
            <span class="quiz__title">
            </span>
            <div class="quiz__difficulty">
            </div>
          </div>
          <div class="quiz__answer"></div>
        </div>
      </div>
    `,
      {
        currentQuiz: undefined,
      }
    );

    this.repository = new QuizRepository(BASE_URL);
    this.fetch();
  }

  // FIXME: page 부분으로 옮기기 및 페이지에서 quiz index state를 가질 것
  private fetch = async () => {
    console.log("fetch as question.ts");
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    try {
      const value = await this.repository.getQuizList(payload);

      if (value.length === 0) {
        // TODO 이전페이지로 이동 및 퀴즈 개수가 충분하지 않다는 알림 띄우기
      }

      console.log(`value ${value}`);

      this.state.value = {
        currentQuiz: value[0]!,
      };
    } catch (error) {
      console.error(error);
      alert("서버 통신에 실패하였습니다. 새로고침해주세요.");
    }
  };

  protected render(): void {
    console.log("render at question.ts");
    const { currentQuiz } = this.state.value;
    const circleCounts = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    console.log(currentQuiz);

    if (currentQuiz) {
      const titleElement = this.element.querySelector(
        ".quiz__title"
      ) as HTMLSpanElement;
      const difficultyElement = this.element.querySelector(
        ".quiz__difficulty"
      ) as HTMLDivElement;

      this.addDifficultyCircle(
        circleCounts[currentQuiz.difficulty],
        difficultyElement
      );
      titleElement.textContent = this.decodeHtml(currentQuiz.question);
    }
  }

  private addDifficultyCircle(circleCount: number, root: HTMLElement): void {
    const elements = Array.from({ length: circleCount }).map(() => {
      const element = document.createElement("div");
      element.classList.add("circle");

      return element;
    });

    root.append(...elements);
  }

  private decodeHtml(encoded: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(encoded, "text/html");
    return doc.documentElement.textContent;
  }
}

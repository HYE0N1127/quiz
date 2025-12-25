import { Quiz } from "../../../type/quiz.js";
import { Component } from "../../component.js";
import { QuizRepository } from "../../../repository/quiz/quiz.repository.js";
import { BASE_URL } from "../../../constants/url.js";
import { AnswerComponent } from "../answer/multiple.js";
import { decodeHtml } from "../../../lib/html/decode.js";

export class QuestionComponent extends Component<{
  currentIndex: number;
  currentQuiz: Quiz | undefined;
  quizList: Quiz[];
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
        currentIndex: 0,
        currentQuiz: undefined,
        quizList: [],
      }
    );

    this.repository = new QuizRepository(BASE_URL);
    this.fetch();
  }

  private fetch = async () => {
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    try {
      const value = await this.repository.getQuizList(payload);

      if (value.length === 0) {
        alert("문제의 개수가 충분하지 않습니다.");
        window.history.back();
      }

      this.state.value = {
        currentIndex: 0,
        currentQuiz: value[0]!,
        quizList: value,
      };
    } catch (error) {
      console.error(error);
      alert("서버 통신에 실패하였습니다. 새로고침해주세요.");
    }
  };

  protected render(): void {
    const { currentQuiz } = this.state.value;
    const circleCounts = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (currentQuiz) {
      const titleElement = this.element.querySelector(
        ".quiz__title"
      ) as HTMLSpanElement;
      const difficultyElement = this.element.querySelector(
        ".quiz__difficulty"
      ) as HTMLDivElement;
      const answerElement = this.element.querySelector(
        ".quiz__answer"
      ) as HTMLDivElement;

      const answerComponent = new AnswerComponent(currentQuiz);

      answerElement.append(answerComponent.element);

      this.addDifficultyCircle(
        circleCounts[currentQuiz.difficulty],
        difficultyElement
      );
      titleElement.textContent = decodeHtml(currentQuiz.question);
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
}

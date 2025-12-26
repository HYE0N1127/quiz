import { Quiz } from "../../../type/quiz.js";
import { Component } from "../../component.js";
import { AnswerComponent } from "../answer/answer.js";
import { decodeHtml } from "../../../lib/html/decode.js";
import { QuizRepository } from "../../../repository/quiz/quiz.repository.js";
import { BASE_URL } from "../../../constants/url.js";
import { QuizService } from "../../../lib/quiz/answer.js";

export class QuestionComponent extends Component<{
  currentQuiz: Quiz | undefined;
}> {
  private repository: QuizRepository;
  private service: QuizService;

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
    this.service = new QuizService([]);

    this.fetch();
    this.initListener();
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

      this.service.quizzes = value;

      this.state.value = {
        currentQuiz: this.service.getCurrentQuiz(),
      };
    } catch (error) {
      console.error(error);
      alert("서버 통신에 실패하였습니다.");
      window.history.back();
    }
  };

  private initListener = () => {
    this.element.addEventListener("answerSubmit", async () => {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      this.state.value = {
        currentQuiz: this.service.getNextQuiz(),
      };
    });
  };

  protected render(): void {
    const { currentQuiz } = this.state.value;
    const circleCounts = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    // TODO : 제한시간

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

      answerElement.innerHTML = "";
      difficultyElement.innerHTML = "";

      const answerComponent = new AnswerComponent(currentQuiz);
      answerElement.append(answerComponent.element);

      this.addDifficultyCircle(
        circleCounts[currentQuiz.difficulty],
        difficultyElement
      );
      titleElement.textContent = decodeHtml(currentQuiz.question);
    } else {
      // TODO: 점수 결과 페이지로 넘기기
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

import { TimerComponent } from "./../timer/timer.js";
import { Component } from "../../component.js";
import { AnswerComponent } from "../answer/answer.js";
import { decodeHtml } from "../../../lib/html/decode.js";
import { QuizRepository } from "../../../repository/quiz/quiz.repository.js";
import { BASE_URL } from "../../../constants/url.js";
import { QuizService } from "../../../lib/quiz/answer.js";
import { Quiz } from "../../../model/quiz.js";
import { querify } from "../../../lib/http/query.js";
import { alertAndMovePage, movePage } from "../../../lib/html/alert.js";
import { clear } from "../../../lib/html/clear.js";

export class QuizPageComponent extends Component<{
  currentQuiz: Quiz | undefined;
}> {
  private repository: QuizRepository;
  private service: QuizService;
  private timer: TimerComponent | undefined = undefined;

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
            <div class="quiz__timer">
            </div>
            <div class="quiz__order"></div>
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
  }

  private fetch = async () => {
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    try {
      const value = await this.repository.getQuizList(payload);

      if (value.length === 0) {
        alertAndMovePage(
          "알 수 없는 에러가 발생하였습니다.",
          "../../page/home/index.html"
        );
      }

      this.service.quizzes = value;

      this.state.value = {
        currentQuiz: this.service.getCurrentQuiz(),
      };
    } catch (error) {
      console.error(error);
      alertAndMovePage(
        "알 수 없는 에러가 발생하였습니다.",
        "../../page/home/index.html"
      );
    }
  };

  private onSubmit = async (isCorrect: boolean) => {
    this.timer?.stop();
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.service.setAnswerCount(isCorrect);
    this.state.value = {
      currentQuiz: this.service.getNextQuiz(),
    };
  };

  protected render(): void {
    const { currentQuiz } = this.state.value;
    const circleCounts = {
      easy: 1,
      medium: 2,
      hard: 3,
    };

    if (currentQuiz == null) {
      const query = querify({
        correctAnswer: this.service.correctCount,
        incorrectAnswer: this.service.incorrectCount,
      });

      movePage(`../../page/result/index.html${query}`);
      return;
    }

    const titleElement = this.element.querySelector(
      ".quiz__title"
    ) as HTMLElement;
    const difficultyElement = this.element.querySelector(
      ".quiz__difficulty"
    ) as HTMLElement;
    const answerElement = this.element.querySelector(
      ".quiz__answer"
    ) as HTMLElement;
    const timerElement = this.element.querySelector(
      ".quiz__timer"
    ) as HTMLElement;
    const orderElement = this.element.querySelector(
      ".quiz__order"
    ) as HTMLElement;

    clear([answerElement, difficultyElement, timerElement]);

    this.timer = new TimerComponent(10, () => {
      answerComponent.timeout();
    });

    const answerComponent = new AnswerComponent(currentQuiz, this.onSubmit);

    timerElement.append(this.timer.element);
    answerElement.append(answerComponent.element);

    this.addDifficultyCircle(
      circleCounts[currentQuiz.difficulty],
      difficultyElement
    );

    orderElement.textContent = `${this.service.order} / ${this.service.amount}`;

    titleElement.textContent = decodeHtml(currentQuiz.question);
  }

  private addDifficultyCircle = (
    circleCount: number,
    root: HTMLElement
  ): void => {
    const elements = Array.from({ length: circleCount }).map(() => {
      const element = document.createElement("div");
      element.classList.add("circle");

      return element;
    });

    root.append(...elements);
  };
}

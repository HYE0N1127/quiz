import { Component } from "../../component.js";
import { AnswerComponent } from "../answer/answer.js";
import { decodeHtml } from "../../../lib/html/decode.js";
import { QuizRepository } from "../../../repository/quiz/quiz.repository.js";
import { QuizService } from "../../../lib/quiz/answer.js";
import { Quiz } from "../../../model/quiz.js";
import { navigate } from "../../../lib/html/route.js";
import { Timer } from "../../../lib/timer/timer.js";
import { ProgressComponent } from "../timer/progress.js";

const CIRCLES = {
  easy: 1,
  medium: 2,
  hard: 3,
} as const;

export class QuizPageComponent extends Component<{
  currentQuiz: Quiz | undefined;
}> {
  private repository: QuizRepository;
  private service: QuizService;
  private timer: Timer;

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

    this.repository = new QuizRepository();
    this.service = new QuizService([]);
    this.timer = new Timer(10, 100);
  }

  public componentDidMount = async () => {
    const query = new URLSearchParams(window.location.search);
    const payload = Object.fromEntries(query.entries());

    try {
      const value = await this.repository.getQuizList(payload);

      if (value.length === 0) {
        throw new Error("Failed to fetch quiz");
      }

      this.service.quizzes = value;

      this.state.value = {
        currentQuiz: this.service.getCurrentQuiz(),
      };
    } catch (error) {
      console.error(error);

      alert("알 수 없는 에러가 발생하였습니다.");
      navigate({ route: "home" });
    }
  };

  private onSubmit = async (isCorrect: boolean) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    this.service.setAnswerCount(isCorrect);
    this.state.value = {
      currentQuiz: this.service.getNextQuiz(),
    };
  };

  public render(): void {
    this.timer.stop();

    if (this.service.isFinish) {
      navigate({
        route: "result",
        query: {
          correctAnswer: this.service.correctCount,
          incorrectAnswer: this.service.incorrectCount,
        },
      });
      return;
    }

    const { currentQuiz } = this.state.value;

    if (currentQuiz) {
      const timerComponent = this.renderTimer();
      const answerComponent = this.renderAnswer(currentQuiz);

      this.renderDifficulty(currentQuiz);

      const titleElement = this.element.querySelector(
        ".quiz__title"
      ) as HTMLElement;
      const orderElement = this.element.querySelector(
        ".quiz__order"
      ) as HTMLElement;

      orderElement.textContent = `${this.service.order} / ${this.service.amount}`;

      titleElement.textContent = decodeHtml(currentQuiz.question);

      this.timer.start(
        (percent: number) => {
          timerComponent.update(percent);
        },
        () => {
          console.log("submit at timer timeover");
          answerComponent.timeout();
        }
      );
    }
  }

  private renderTimer = () => {
    const element = this.element.querySelector(".quiz__timer") as HTMLElement;

    element.innerHTML = "";

    const timerComponent = new ProgressComponent();

    timerComponent.attachTo(element);

    return timerComponent;
  };

  private renderAnswer = (quiz: Quiz) => {
    const element = this.element.querySelector(".quiz__answer") as HTMLElement;

    element.innerHTML = "";

    const answer = new AnswerComponent(quiz, (isCorrect) => {
      console.log("click submit");
      this.timer.stop();
      this.onSubmit(isCorrect);
    });

    answer.attachTo(element);

    return answer;
  };

  private renderDifficulty = (quiz: Quiz): void => {
    const element = this.element.querySelector(
      ".quiz__difficulty"
    ) as HTMLElement;

    element.innerHTML = "";

    const count = CIRCLES[quiz.difficulty];

    const elements = Array.from({ length: count }).map(() => {
      const element = document.createElement("div");

      element.classList.add("circle");

      return element;
    });

    element.append(...elements);
  };
}

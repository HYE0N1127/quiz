import { TimerComponent } from "./../timer/timer.js";
import { Component } from "../../component.js";
import { AnswerComponent } from "../answer/answer.js";
import { decodeHtml } from "../../../lib/html/decode.js";
import { QuizRepository } from "../../../repository/quiz/quiz.repository.js";
import { BASE_URL } from "../../../constants/url.js";
import { QuizService } from "../../../lib/quiz/answer.js";
import { Quiz } from "../../../model/quiz.js";

export class QuestionComponent extends Component<{
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
      // TODO: 결과페이지 이동
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

    answerElement.innerHTML = "";
    difficultyElement.innerHTML = "";
    timerElement.innerHTML = "";

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

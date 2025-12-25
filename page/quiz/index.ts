import { QuestionComponent } from "../../component/quiz/question/question.js";
import { BASE_URL } from "../../constants/url.js";
import { State } from "../../lib/state/state.js";
import { QuizRepository } from "../../repository/quiz/quiz.repository.js";
import { Quiz } from "../../type/quiz.js";

type QuizPageState = {
  current: number;
  total: number;
  list: Quiz[];
};

class QuizPage {
  private readonly repository: QuizRepository;
  private state: State<QuizPageState>;

  constructor() {
    this.repository = new QuizRepository(BASE_URL);
    this.state = new State({
      current: 0,
      total: 0,
      list: [],
    });

    this.state.subscribe(() => this.render());
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
        current: 1,
        total: value.length,
        list: value,
      };
    } catch (error) {
      console.error(error);
      alert("서버 통신에 실패하였습니다.");
      window.history.back();
    }
  };

  private render = (): void => {
    const { current, total, list } = this.state.value;
    const root = document.querySelector("#root") as HTMLBodyElement;
    const quizComponent = new QuestionComponent(
      current,
      total,
      list[current - 1]!
    );

    root.append(quizComponent.element);
  };
}

export const quizPage = new QuizPage();

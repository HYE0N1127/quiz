import { QuestionComponent } from "../../component/quiz/question/question.js";

// TODO: render 내부 구현을 바깥으로 빼기
class QuizPage {
  constructor() {
    this.render();
  }

  private render = (): void => {
    const root = document.querySelector("#root") as HTMLBodyElement;
    const quizComponent = new QuestionComponent();

    root.innerHTML = "";
    root.append(quizComponent.element);
  };
}

export const quizPage = new QuizPage();

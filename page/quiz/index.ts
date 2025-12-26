import { QuestionComponent } from "../../component/quiz/question/question.js";

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

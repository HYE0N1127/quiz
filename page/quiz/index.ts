import { QuestionComponent } from "../../component/quiz/question.js";

class QuizPage {
  constructor() {
    this.render();
  }

  private render = (): void => {
    const root = document.querySelector("#root") as HTMLBodyElement;
    const quizComponent = new QuestionComponent();

    root.append(quizComponent.element);
  };
}

export const quizPage = new QuizPage();

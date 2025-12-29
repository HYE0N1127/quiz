import { QuizPageComponent } from "../../component/quiz/question/question.js";

const render = (): void => {
  const root = document.querySelector("#root") as HTMLBodyElement;
  const quizComponent = new QuizPageComponent();

  quizComponent.mount(root);
};

render();

import { decodeHtml } from "./../../../lib/html/decode.js";
import { Component } from "../../component.js";
import { QuizType } from "../../../type/quiz.js";
import { Quiz } from "../../../model/quiz.js";

export class AnswerComponent extends Component<{
  quiz: Quiz;
}> {
  private readonly onSubmit: (isCorrect: boolean) => void;

  constructor(quiz: Quiz, onSubmit: (isCorrect: boolean) => void) {
    super(
      `
      <div class="quiz__multiple">
      </div>  
    `,
      {
        quiz,
      }
    );

    this.onSubmit = onSubmit;
    this.render();
  }

  private checkAnswer(clicked: number, correctIndex: number): void {
    this.element.style.pointerEvents = "none";

    this.onSubmit(clicked === correctIndex);
    this.renderAnswer(clicked, correctIndex);
  }

  private makeChoiceElement(
    answer: string,
    index: number,
    type: QuizType
  ): HTMLDivElement {
    const element = document.createElement("div");
    element.classList.add("quiz__choice");
    element.setAttribute("data-id", (index + 1).toString());
    element.setAttribute("data-type", type);

    const choiceNumberElement = document.createElement("span");
    choiceNumberElement.classList.add("quiz__choice-number");
    choiceNumberElement.textContent = `${index + 1}. `;

    const choiceContentElement = document.createElement("span");
    choiceContentElement.classList.add("quiz__choice-content");
    choiceContentElement.textContent = decodeHtml(answer);

    element.append(choiceNumberElement);
    element.append(choiceContentElement);

    return element;
  }

  private renderAnswer(selected: number = -1, correctIndex: number) {
    const selectedElement = this.element.querySelector(
      `div[data-id="${selected + 1}"]`
    );
    if (selected === correctIndex) {
      selectedElement?.classList.add("correct");
    } else {
      const correctElement = this.element.querySelector(
        `div[data-id="${correctIndex + 1}"]`
      );

      selectedElement?.classList.add("incorrect");
      correctElement?.classList.add("correct");
    }
  }

  public timeout = (): void => {
    const { correctAnswer } = this.state.value.quiz;
    const answer = decodeHtml(correctAnswer);
    let correctIndex = -1;

    const contentElements = this.element.querySelectorAll(
      ".quiz__choice-content"
    );

    contentElements.forEach((element, index) => {
      if (element.textContent === answer) {
        correctIndex = index;
      }
    });

    if (correctIndex !== -1) {
      this.checkAnswer(-1, correctIndex);
    }
  };

  public render(): void {
    this.element.innerHTML = "";

    const { type, answers } = this.state.value.quiz;

    answers.forEach((answer, index) => {
      const element = this.makeChoiceElement(answer, index, type);
      const correctIndex = answers.findIndex(this.state.value.quiz.isCorrect);

      element.onclick = () => {
        this.checkAnswer(index, correctIndex);
      };

      this.element.append(element);
    });
  }
}

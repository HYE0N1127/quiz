import { Component } from "../../component.js";
import { shuffle } from "../../../util/array.js";
import { Quiz, QuizType } from "../../../type/quiz.js";

export class AnswerComponent extends Component<{
  quiz: Quiz;
}> {
  constructor(quiz: Quiz) {
    super(
      `
      <div class="quiz__multiple">
      </div>  
    `,
      {
        quiz,
      }
    );
  }

  private checkAnswer(clicked: number, correct: number): void {
    const isCorrect = clicked === correct;
    const elements = this.element.querySelectorAll(".quiz__choice");
    console.log(isCorrect);
    console.log(elements);

    this.renderAnswer(clicked, correct);

    const event = new CustomEvent("answerSubmit", {
      detail: { isCorrect },
      bubbles: true,
    });

    this.element.dispatchEvent(event);
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
    choiceContentElement.textContent = answer;

    element.append(choiceNumberElement);
    element.append(choiceContentElement);

    return element;
  }

  private renderAnswer(selected: number, correctIndex: number) {
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

  protected render(): void {
    const { type, correctAnswer, incorrectAnswer } = this.state.value.quiz;
    const answers: string[] = [];

    switch (type) {
      case "boolean": {
        answers.push("True");
        answers.push("False");
        break;
      }

      case "multiple": {
        const shuffled = shuffle([correctAnswer, ...incorrectAnswer]);
        answers.push(...shuffled);
        break;
      }
    }

    answers.forEach((answer, index) => {
      const element = this.makeChoiceElement(answer, index, type);
      const correctIndex = answers.findIndex(
        (answer) => this.state.value.quiz.correctAnswer === answer
      );

      element.onclick = () => {
        this.checkAnswer(index, correctIndex);
      };

      this.element.append(element);
    });
  }
}

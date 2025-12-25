import { Component } from "../../component.js";
import { shuffle } from "../../../util/array.js";

export class AnswerComponent extends Component<{
  correctAnswer: string;
  incorrectAnswers: string[];
}> {
  constructor(correctAnswer: string, incorrectAnswers: string[]) {
    super(
      `
      <div class="quiz__multiple">
      </div>  
    `,
      {
        correctAnswer,
        incorrectAnswers,
      }
    );
  }

  protected render(): void {
    const answers = shuffle([
      this.state.value.correctAnswer,
      ...this.state.value.incorrectAnswers,
    ]);

    const choices = this.element.querySelectorAll(".quiz__choice");

    choices.forEach((element, index) => {
      const answer = answers[index] ?? "";
      const inner = this.makeChoiceElement(answer, index);
      element.append(inner);

      (element as HTMLElement).onclick = () => {
        this.checkAnswer(answer, index);
      };

      this.element.insertAdjacentElement("beforeend", element);
    });
  }

  private checkAnswer = (answer: string, index: number) => {
    const correctAnswer = this.state.value.correctAnswer;
    const isCorrect = answer === correctAnswer;
    if (isCorrect) {
      // TODO: 맞췄다는 초록색 띄워주기
    } else {
      // TODO: 클릭한거 빨갛게 만들고 정답 초록색 만들기
    }

    const event = new CustomEvent("answerSubmit", {
      detail: { isCorrect },
    });

    this.element.dispatchEvent(event);
  };

  private makeChoiceElement = (
    answer: string,
    index: number
  ): HTMLDivElement => {
    const element = document.createElement("div");
    element.classList.add("quiz__choice");
    element.setAttribute("data-id", index.toString());

    const choiceNumberElement = document.createElement("span");
    choiceNumberElement.classList.add("quiz__choice-number");
    choiceNumberElement.textContent = `${index}. `;

    const choiceContentElement = document.createElement("span");
    choiceContentElement.classList.add("quiz__choice-content");
    choiceContentElement.textContent = answer;

    element.append(choiceNumberElement);
    element.append(choiceContentElement);

    return element;
  };
}

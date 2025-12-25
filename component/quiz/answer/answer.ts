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

  private checkAnswer(answer: string, index: number): void {
    const { correctAnswer } = this.state.value.quiz;
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
  }

  private makeChoiceElement(
    answer: string,
    index: number,
    type: QuizType
  ): HTMLDivElement {
    const element = document.createElement("div");
    element.classList.add("quiz__choice");
    element.setAttribute("data-id", index.toString());
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

    console.log(answers);
    answers.forEach((answer, index) => {
      const element = this.makeChoiceElement(answer, index, type);

      element.onclick = () => {
        this.checkAnswer(answer, index);
      };

      this.element.append(element);
    });
  }
}

import { navigate } from "../../lib/html/route.js";
import { QuizRepository } from "../../repository/quiz/quiz.repository.js";
import { Category } from "../../type/category.js";
import { Component } from "../component.js";

export class SetupComponent extends Component<{ categories: Category[] }> {
  private readonly repository: QuizRepository;

  constructor() {
    super(
      `
      <div class="quiz">
        <form class="quiz__form">
          <div class="quiz__selector">
            <label for="quiz__category" class="quiz__type">Category</label>
            <select id="quiz__category" name="category" class="quiz__options">
              <option value="">Any</option>
            </select>
          </div>

          <div class="quiz__selector">
            <label for="quiz__type" class="quiz__type">Type</label>
            <select id="quiz__type" name="type" class="quiz__options">
              <option value="">Any</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <div class="quiz__selector">
            <label for="quiz__difficulty" class="quiz__type">Difficulty</label>
            <select id="quiz__difficulty" name="difficulty" class="quiz__options" id="quiz__options-difficulty">
              <option value="">Any</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>

          <div class="quiz__selector">
            <label for="amount" class="quiz__type">Amount</label>
            <input type="number" name="amount" class="quiz__amount" id="quiz__amount" min="1" max="50" value="10" />
          </div>

          <button type="submit" class="quiz__start">시작하기</button>
        </form>
      </div>
    `,
      {
        categories: [],
      }
    );

    this.repository = new QuizRepository();
  }

  public componentDidMount = async () => {
    try {
      const value = await this.repository.getCategories();

      this.state.value = {
        categories: value,
      };
    } catch (e) {
      console.error(e);
      alert("서버 통신에 실패하였습니다. 새로고침해주세요.");
    }
  };

  public render(): void {
    const { categories } = this.state.value;
    const form = this.element.querySelector(".quiz__form") as HTMLFormElement;
    const categoryElement = this.element.querySelector(
      "#quiz__category"
    ) as HTMLDivElement;

    const elements = categories.map((category) =>
      this.makeCategoryOption(category)
    );

    categoryElement.append(...elements);

    // form.addEventListener("click", function () {
    //   console.log(this);
    // });

    // form.addEventListener("click", () => {
    //   console.log(this);
    // })

    form.onsubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      navigate({
        route: "quiz",
        query: Object.fromEntries(formData.entries()) as Record<string, string>,
      });
    };
  }

  private makeCategoryOption(category: Category): HTMLOptionElement {
    const option = document.createElement("option");

    option.value = category.id.toString();
    option.textContent = category.name;

    return option;
  }
}

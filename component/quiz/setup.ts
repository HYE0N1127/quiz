import { BASE_URL } from "../../constants/url.js";
import { querify } from "../../lib/http/query.js";
import { QuizRepository } from "../../repository/quiz.js";
import { Category } from "../../type/category.js";
import { Component } from "../component.js";

export class SetupComponent extends Component<void> {
  private readonly repository: QuizRepository;

  constructor() {
    super(
      `
      <div class="quiz">
        <form class="quiz__form">
          <div class="quiz__selector">
            <label for="quiz__category" class="quiz__type">Category</label>
            <select id="quiz__category" name="category" class="quiz__options">
              <option value="any">Any</option>
            </select>
          </div>

          <div class="quiz__selector">
            <label for="quiz__type" class="quiz__type">Type</label>
            <select id="quiz__type" name="type" class="quiz__options">
              <option value="any">Any</option>
              <option value="multiple">Multiple Choice</option>
              <option value="boolean">True / False</option>
            </select>
          </div>

          <div class="quiz__selector">
            <label for="quiz__difficulty" class="quiz__type">Difficulty</label>
            <select id="quiz__difficulty" name="difficulty" class="quiz__options" id="quiz__options-difficulty">
              <option value="any">Any</option>
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
    `
    );

    this.repository = new QuizRepository(BASE_URL);

    this.render();
  }

  protected render(): void {
    const form = this.element.querySelector(".quiz__form") as HTMLFormElement;
    const category = this.element.querySelector(
      "#quiz__category"
    ) as HTMLDivElement;

    this.repository
      .getCategories()
      .then((value) => {
        const elements = value.map((category) =>
          this.makeCategoryOption(category)
        );

        category.append(...elements);
      })
      .catch((error) => {
        console.error(error);
        alert("서버 통신에 실패하였습니다. 새로고침해주세요.");
      });

    form.onsubmit = (e) => {
      e.preventDefault();

      const formData = new FormData(form);

      const amount = Number(formData.get("amount")?.toString()) || 10;

      const categoryRaw = formData.get("category")?.toString();
      const category =
        categoryRaw && categoryRaw !== "any" ? Number(categoryRaw) : "";

      const difficultyRaw = formData.get("difficulty")?.toString() ?? "";
      const difficulty = difficultyRaw === "any" ? "" : difficultyRaw;

      const typeRaw = formData.get("type")?.toString() ?? "";
      const type = typeRaw === "any" ? "" : typeRaw;

      const params = querify({
        amount,
        category,
        difficulty,
        type,
      });

      window.location.href = `../../page/quiz/index.html?${params.toString()}`;
    };
  }

  private makeCategoryOption(category: Category): HTMLOptionElement {
    const option = document.createElement("option");

    option.value = category.id.toString();
    option.textContent = category.name;

    return option;
  }
}

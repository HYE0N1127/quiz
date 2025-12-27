import { Category } from "../../type/category.js";
import { QuizDifficulty, QuizType } from "../../type/quiz.js";
import { CategoryResponse, QuizResponse } from "./quiz.repository.types.js";
import { Repository } from "../repository.js";
import { Quiz } from "../../model/quiz.js";
import { BASE_URL } from "../../constants/url.js";

export type QuizListPayload = {
  amount?: number;
  categoryId?: number;
  difficulty?: QuizDifficulty;
  type?: QuizType;
};

export class QuizRepository extends Repository {
  constructor() {
    super(BASE_URL);
  }

  public getQuizList = async (payload: QuizListPayload): Promise<Quiz[]> => {
    const data = await this.get<QuizResponse>("/api.php", {
      query: payload,
    });

    const mapped = (data.results ?? []).map((item) => new Quiz(item));

    return mapped;
  };

  public getCategories = async (): Promise<Category[]> => {
    const data = await this.get<CategoryResponse>("/api_category.php");

    return data.trivia_categories ?? [];
  };
}

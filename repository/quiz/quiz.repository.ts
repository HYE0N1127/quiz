import { Category } from "../../type/category.js";
import { Quiz, QuizDifficulty, QuizType } from "../../type/quiz.js";
import { CategoryResponse, QuizResponse } from "./quiz.repository.types.js";
import { Repository } from "../repository.js";

export type QuizListPayload = {
  amount?: number;
  categoryId?: number;
  difficulty?: QuizDifficulty;
  type?: QuizType;
};

export class QuizRepository extends Repository {
  constructor(baseUrl: string) {
    super(baseUrl);
  }

  public getQuizList = async (payload: QuizListPayload): Promise<Quiz[]> => {
    const data = await this.get<QuizResponse>("/", {
      headers: {
        "Content-Type": "application/json",
      },
      query: payload,
    });

    return data.results ?? [];
  };

  public getCategories = async (): Promise<Category[]> => {
    const data = await this.get<CategoryResponse>("/api_category.php");

    return data.trivia_categories ?? [];
  };
}

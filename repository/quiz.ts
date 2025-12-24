import { Category } from "../type/category.js";
import { Quiz, QuizDifficulty, QuizType } from "../type/quiz.js";
import { CategoryResponse, QuizResponse } from "../type/response/response.js";
import { Repository } from "./repository.js";

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

  public getQuizList = async (query: string): Promise<Quiz[]> => {
    const url = `${this.baseUrl}?${query}`;

    try {
      const data = await this.get<QuizResponse>(url);

      return data.results ?? [];
    } catch (error) {
      throw new Error(`get Quiz list fetch error : ${error}`);
    }
  };

  public getCategories = async (): Promise<Category[]> => {
    const url = `${this.baseUrl}/api_category.php`;

    try {
      const data = await this.get<CategoryResponse>(url);

      return data.trivia_categories ?? [];
    } catch (error) {
      throw new Error(`get category fetch error : ${error}`);
    }
  };
}

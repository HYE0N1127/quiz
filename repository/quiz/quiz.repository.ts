import { Category } from "../../type/category.js";
import { Quiz, QuizDifficulty, QuizType } from "../../type/quiz.js";
import { CategoryResponse, QuizResponse } from "./quiz.repository.types.js";
import { Repository } from "../repository.js";
import { QuizDomainMapper } from "./quiz.repository.mapper.js";

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
    const data = await this.get<QuizResponse>("/api.php", {
      query: payload,
    });

    const mapped = (data.results ?? []).map((item) => QuizDomainMapper(item));

    return mapped;
  };

  public getCategories = async (): Promise<Category[]> => {
    const data = await this.get<CategoryResponse>("/api_category.php");

    return data.trivia_categories ?? [];
  };
}

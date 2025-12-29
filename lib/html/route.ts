import { SESSION_STORAGE_QUIZ_RESULT_KEY } from "../../constants/storage.js";
import { querify } from "../http/query.js";

type NavigateOptions<T = unknown> = {
  route: "home" | "result" | "quiz";
  query?: Record<string, string | number | boolean>;
  state?: T;
};

export const navigate = <T>(options: NavigateOptions<T>): void => {
  const { route, query, state } = options;

  let path: string = "";

  switch (route) {
    case "home":
      path = "/page/home/index.html";
      break;
    case "result":
      path = "/page/result/index.html";
      break;
    case "quiz":
      path = "/page/quiz/index.html";
      break;
    default:
      path = "";
  }

  if (state != null && route === "result") {
    sessionStorage.setItem(
      SESSION_STORAGE_QUIZ_RESULT_KEY,
      JSON.stringify(state)
    );
  }

  window.location.href = `${window.location.origin}${path}${querify(
    query ?? {}
  )}`;
};

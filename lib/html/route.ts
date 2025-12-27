import { querify } from "../http/query.js";

type NavigateOptions = {
  route: "home" | "result" | "quiz";
  query?: Record<string, string | number | boolean>;
};

export const navigate = (options: NavigateOptions): void => {
  const { route, query } = options;

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

  window.location.href = `${window.location.origin}${path}${querify(
    query ?? {}
  )}`;
};

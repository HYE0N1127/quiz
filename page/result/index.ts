import { ResultPageComponent } from "../../component/result/result.js";

const render = () => {
  const main = document.querySelector("#root");
  const resultPageComponent = new ResultPageComponent();

  main?.append(resultPageComponent.element);
};

render();

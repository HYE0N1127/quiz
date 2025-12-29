import { ResultPageComponent } from "../../component/result/result.js";

const render = () => {
  const main = document.querySelector("#root") as HTMLBodyElement;
  const resultPageComponent = new ResultPageComponent();

  resultPageComponent.mount(main);
};

render();

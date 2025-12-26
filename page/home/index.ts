import { SetupComponent } from "./../../component/home/setup.js";

const render = () => {
  const root = document.querySelector("#root");
  const setupForm = new SetupComponent();

  root?.append(setupForm.element);
};

render();

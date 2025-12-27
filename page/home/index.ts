import { SetupComponent } from "./../../component/home/setup.js";

const render = () => {
  const root = document.querySelector("#root") as HTMLBodyElement;
  const setupForm = new SetupComponent();

  setupForm.attachTo(root);
};

render();

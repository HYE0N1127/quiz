import { SetupComponent } from "../../component/quiz/setup.js";

class Home {
  constructor() {
    this.render();
  }

  render() {
    const root = document.querySelector("#root");
    const setupForm = new SetupComponent();

    root?.append(setupForm.element);
  }
}

export const home = new Home();

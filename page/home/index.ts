import { SetupComponent } from "./../../component/home/setup.js";

// TODO: Render 내부 구현을 바깥으로 빼기, d
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

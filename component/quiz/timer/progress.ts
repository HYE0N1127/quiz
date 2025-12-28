import { Component } from "../../component.js";

export class ProgressComponent extends Component<void> {
  constructor() {
    super(
      `
      <div class="quiz__timer-track">
        <div class="quiz__timer-bar"></div>
      </div>
    `
    );
  }

  public update(percent: number) {
    const bar = this.element.querySelector(".quiz__timer-bar") as HTMLElement;

    bar.style.width = `${percent}%`;
  }
}

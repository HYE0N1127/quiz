import { Component } from "../../component.js";

export class TimerComponent extends Component<{
  duration: number;
  callback: () => void;
}> {
  private interval: number | undefined = undefined;

  constructor(duration: number = 10, callback: () => void) {
    super(
      `
      <div class="quiz__timer-track">
        <div class="quiz__timer-bar"></div>
      </div>
    `,
      { duration, callback }
    );

    this.render();
  }

  private start(): void {
    const { duration, callback } = this.state.value;
    const bar = this.element.querySelector(".quiz__timer-bar") as HTMLElement;
    const frequency = 100;
    let currentTime = 0;

    this.interval = window.setInterval(async () => {
      if (this.interval === undefined) return;

      currentTime += frequency / 1000;
      const percent = Math.min(frequency, (currentTime / duration) * 100);

      bar.style.width = `${percent}%`;

      if (currentTime >= duration) {
        this.stop();
        callback();
      }
    }, frequency);
  }

  public stop(): void {
    window.clearInterval(this.interval);
    this.interval = undefined;
  }

  protected render(): void {
    this.start();
  }
}

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

  public stop(): void {
    clearInterval(this.interval);
    this.interval = undefined;
  }

  private start({
    duration,
    ms,
    onProgress,
    onEnd,
  }: {
    duration: number;
    ms: number;
    onProgress: (progress: number) => void;
    onEnd: () => void;
  }) {
    let time = 0;

    this.interval = setInterval(() => {
      time += ms / 1000;

      onProgress(Math.min(100, (time / duration) * 100));

      if (time >= duration) {
        this.stop();
        onEnd();
      }
    }, ms);
  }

  protected render(): void {
    const { duration, callback } = this.state.value;

    const bar = this.element.querySelector(".quiz__timer-bar") as HTMLElement;

    this.start({
      duration,
      ms: 100,
      onProgress: (progress) => {
        bar.style.width = `${progress}%`;
      },
      onEnd: callback,
    });
  }
}

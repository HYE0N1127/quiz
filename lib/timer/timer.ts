export class Timer {
  private readonly onProgress: (percent: number) => void;
  private readonly onEnd: () => void;
  private readonly duration: number;
  private readonly ms: number;
  private interval: number | undefined;
  private _time: number;

  constructor(
    duration: number,
    ms: number,
    onProgress: (percent: number) => void,
    onEnd: () => void
  ) {
    this.ms = ms;
    this.duration = duration;
    this.onProgress = onProgress;
    this.onEnd = onEnd;
    this._time = 0;
  }

  public get time() {
    return this._time;
  }

  public start() {
    this._time = 0;

    this.interval = setInterval(() => {
      this._time += this.ms / 1000;

      this.onProgress(Math.min(100, (this.time / this.duration) * 100));

      if (this._time >= this.duration) {
        this.stop();
        this.onEnd();
      }
    }, this.ms);
  }

  public stop() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}

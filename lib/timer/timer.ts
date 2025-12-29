export class Timer {
  private readonly duration: number;
  private readonly ms: number;
  private interval: number | undefined;
  private _time: number;

  constructor(duration: number, ms: number) {
    this.ms = ms;
    this.duration = duration;
    this._time = 0;
  }

  public get time() {
    return this._time;
  }

  public start(onProgress: (percent: number) => void, onEnd: () => void) {
    this._time = 0;

    this.interval = setInterval(() => {
      this._time += this.ms / 1000;

      onProgress(Math.min(100, (this.time / this.duration) * 100));

      if (this._time >= this.duration) {
        this.stop();
        onEnd();
      }
    }, this.ms);
  }

  public stop() {
    clearInterval(this.interval);
    this.interval = undefined;
  }
}

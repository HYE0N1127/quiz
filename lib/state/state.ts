import { Observable } from "./observable.js";

export class State<T> extends Observable {
  private _value: T;
  private _silent: boolean = false;

  constructor(initial: T) {
    super();
    this._value = initial;
  }

  public set value(value: T) {
    if (!this._silent) {
      this.notify();
    }
    this._value = value;
  }

  public get value(): T {
    return this._value;
  }

  public silently(value: T): void {
    this._silent = true;
    this.value = value;
    this._silent = false;
  }
}

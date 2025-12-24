import { Observable } from "./observable.js";

export class State<T> extends Observable {
  private _value: T;

  constructor(initial: T) {
    super();
    this._value = initial;
  }

  public set value(value: T) {
    this._value = value;
    this.notify();
  }

  public get value(): T {
    return this._value;
  }
}

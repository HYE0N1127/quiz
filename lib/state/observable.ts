export class Observable {
  private listeners: Set<() => void>;

  constructor() {
    this.listeners = new Set();
  }

  protected notify() {
    this.listeners.forEach((listener) => listener());
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  public unsubscribe(listener: () => void) {
    this.listeners.delete(listener);
  }
}

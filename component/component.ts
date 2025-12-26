import { State } from "../lib/state/state.js";

export abstract class Component<T> {
  private _state: State<T>;
  public element: HTMLElement;

  constructor(htmlString: string, initial: T) {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = htmlString;

    if (!(template.content.firstElementChild instanceof HTMLElement)) {
      throw new Error("element is null");
    }

    this.element = template.content.firstElementChild;
    this._state = new State<T>(initial);

    this._state.subscribe(() => {
      this.render();
    });

    this.render();
  }

  public get state(): State<T> {
    return this._state;
  }

  protected abstract render(): void;
}

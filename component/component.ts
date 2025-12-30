import { State } from "../lib/state/state.js";

interface ComponentLifeCycle {
  componentDidMount?(): void;

  render?(): void;
}

export interface Component<T> extends ComponentLifeCycle {}
export class Component<T> {
  private _state: State<T>;
  protected element: HTMLElement;

  constructor(htmlString: string, initial: T) {
    const template: HTMLTemplateElement = document.createElement("template");
    template.innerHTML = htmlString;

    if (!(template.content.firstElementChild instanceof HTMLElement)) {
      throw new Error("element is null");
    }

    this.element = template.content.firstElementChild;
    this._state = new State<T>(initial);

    this._state.subscribe(() => {
      this.render?.();
    });

    this.render?.();
    this.componentDidMount?.();
  }

  public get state(): State<T> {
    return this._state;
  }

  public attachTo(
    parent: HTMLElement,
    position: InsertPosition = "beforeend"
  ): void {
    parent.insertAdjacentElement(position, this.element);
  }
}

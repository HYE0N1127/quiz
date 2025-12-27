export function clear(elements: HTMLElement[]): void {
  elements.forEach((element) => (element.innerHTML = ""));
}

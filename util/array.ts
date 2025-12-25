export const shuffle = <T>(array: T[]): T[] => {
  let copied = [...array];
  let current = array.length - 1;

  while (current !== 0) {
    current--;

    const random = Math.floor(Math.random() * current);

    [copied[current], copied[random]] = [
      copied[random] as T,
      copied[current] as T,
    ];
  }

  return copied;
};

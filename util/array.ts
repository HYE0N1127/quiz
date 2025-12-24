export const shuffle = <T>(array: T[]): T[] => {
  let copied = [...array];
  let current = array.length;

  while (current !== 0) {
    const random = Math.floor(Math.random() * (current - 1));

    [copied[current], copied[random]] = [
      copied[random] as T,
      copied[current] as T,
    ];
  }

  return copied;
};

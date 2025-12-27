export function calculateScore(
  correctCount: number,
  incorrectCount: number
): string {
  const score = (correctCount / (correctCount + incorrectCount)) * 100;

  return `${score.toFixed(1)}점`;
}

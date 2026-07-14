export const MIN_CREDIBLE_LEARNERS = 100;

export function isCredibleLearnerCount(count: number): boolean {
  return count >= MIN_CREDIBLE_LEARNERS;
}

export function formatLearnerCount(count: number): string {
  return `${count.toLocaleString()}+`;
}

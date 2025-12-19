export function randomValue<T extends string | number>(input: Record<T, number>): T {
  const values: T[] = Object.entries(input)
    .map(([value, percent]) => new Array(percent).fill(value) as any)
    .reduce((acc, next) => acc.concat(next));
  const randomNumber = Math.floor(Math.random() * values.length);
  return values[randomNumber];
}

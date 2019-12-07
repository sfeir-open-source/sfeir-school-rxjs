export type Sequence<T> = (iter: (value: T) => void) => void;

export function sequenceMap<T, U>(
  s: Sequence<T>,
  f: (v: T) => U
): Sequence<U> {
  return iter => {
    s(v => iter(f(v)));
  };
}

export function sequenceFlatMap<T, U>(
  s: Sequence<T>,
  f: (v: T) => Sequence<U>
): Sequence<U> {
  return iter => {
    s(v => f(v)(iter));
  };
}

export function sequenceFilter<T>(
  s: Sequence<T>,
  p: (v: T) => boolean
): Sequence<T> {
  return iter => {
    s(v => {
      if (p(v)) iter(v);
    });
  };
}

export function sequenceReduce<T>(
  s: Sequence<T>,
  concat: (a: T, b: T) => T
): T {
  let r: T;
  s(v => {
    r = r === undefined ? v : concat(r, v);
  });
  return r!;
}

export type Sequence<T> = (iter: (value: T) => void) => void;
export type SequenceOp<T, U> = (
  source: Sequence<T>
) => Sequence<U>;

export function map<T, U>(f: (v: T) => U): SequenceOp<T, U> {
  return source => iter => {
    source(v => iter(f(v)));
  };
}

export function flatMap<T, U>(
  f: (v: T) => Sequence<U>
): SequenceOp<T, U> {
  return source => iter => {
    source(v => f(v)(iter));
  };
}

export function filter<T>(
  p: (v: T) => boolean
): SequenceOp<T, T> {
  return source => iter => {
    source(v => {
      if (p(v)) iter(v);
    });
  };
}

export function reduce<T>(
  concat: (a: T, b: T) => T
): (source: Sequence<T>) => T {
  return source => {
    let r: T;
    source(v => {
      r = r === undefined ? v : concat(r, v);
    });
    return r!;
  };
}

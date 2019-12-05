type lazy<T> = () => T;

export const lazy = <T>(value: T): lazy<T> => () => value;

export const map = <T, U>(lazy: lazy<T>, f: (v: T) => U): lazy<U> => () => f(lazy());

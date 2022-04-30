# Exercise 1

You will expect the same output but by using Sequence (an object representing sequences)

1. Replace in main.ts the import of `solution` by `code`
1. Remove `declare` for the function `sequenceFrom`, `getModuleMasses`, `getRequiredFuel`, `getTotalRequiredFuel`
1. Implement the functions

## sequenceFrom

the sequenceFrom should return a function that will transform the input iterable into a Sequence (a function that do something with a value)

```typescript
export type Sequence<T> = (iter: (value: T) => void) => void;

export type SequenceOp<T, U> = (
  source: Sequence<T>
) => Sequence<U>;
```

## getModuleMasses, getRequiredFuel, getTotalRequiredFuel

They should be rewritten using sequence like in Exercise 0 (you can use map, filter, reduce and pipe we recode for you and integrate as import)

Here you cannot chain map, filter, .... you should use pipe (from ramda lib) function to do this

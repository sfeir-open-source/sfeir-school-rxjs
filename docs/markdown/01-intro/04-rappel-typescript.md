## Rappels : TypeScript

```typescript
// JavaScript
function fn(a, b) {
  return a * b;
}

// TypeScript
function fn(a: number, b: number) {
  return a * b;
}
```

<!-- .element: class="big-code block" -->

Notes:

- RxJS est écrit en TypeScript
- il est entièrement typé
- on peut l'utiliser en JavaScript aussi
- TypeScript est un superset de JavaScript qui offre un système de typage explicite

##==##

## Rappels : TypeScript - les génériques

```typescript
interface Box<T> {
  content: T;
}

type Apple = { color: 'red' | 'green' };
type PiePastry = { cooked: boolean };

// OK
const appleBox: Box<Apple> = { content: { color: 'red' } };
const piePastryBox: Box<PiePastry> = { content: { cooked: true } };
// KO
const box: Box<PiePastry> = { content: { color: 'green' } };
```

<!-- .element: class="big-code block" -->

# Tips : un opérateur n'est rien de plus qu'une fonction !

```typescript
const multicast$ = monocast$.pipe(
  share({
    connector: () => new BehaviorSubject(-1),
    resetOnError: false,
    resetOnRefCountZero: false,
    resetOnComplete: false,
  }),
);
```

##==##

# Tips : un opérateur n'est rien de plus qu'une fonction !

```typescript
function shareKeepState<T>(initialValue: T) {
  return share({
    connector: () => new BehaviorSubject(initialValue),
    resetOnError: false,
    resetOnRefCountZero: false,
    resetOnComplete: false,
  });
}

const multicast$ = monocast$.pipe(shareKeepState(-1));
```

##==##

# Tips : un opérateur n'est rien de plus qu'une fonction !

```typescript
function shareKeepState<T>(initialValue: T) {
  return (source$: Observable<T>) =>
    source$.pipe(
      share({
        connector: () => new BehaviorSubject(initialValue),
        resetOnError: false,
        resetOnRefCountZero: false,
        resetOnComplete: false,
      }),
    );
}

const multicast$ = monocast$.pipe(shareKeepState());
```

Notes:

- Avec la syntaxe complète d'un opérateur custom
- Ici on pourrait imaginer combiner plusieurs opérateurs d'un coup

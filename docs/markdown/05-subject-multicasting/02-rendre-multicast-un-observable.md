# Rendre multicast un Observable

```typescript
let i = 0;
const monocast$ = new Observable((subscriber) => {
  setInterval(() => subscriber.next(i++), 1_000);
});

monocast$.subscribe((i) => console.log('ONE', i));
monocast$.subscribe((i) => console.log('TWO', i));
```

```text
=> ONE 0
=> TWO 1
=> ONE 2
=> TWO 3
=> ONE 4
=> TWO 5
...
```

##==##

# Rendre multicast un Observable

```typescript
const monocast$ = new Observable((subscriber) => {
  let i = 0;
  setInterval(() => subscriber.next(i++), 1_000);
});

const multicast$ = monocast$.pipe(share());

multicast$.subscribe((i) => console.log('ONE', i));
multicast$.subscribe((i) => console.log('TWO', i));
```

```text
=> ONE 0
=> TWO 0
=> ONE 1
=> TWO 1
=> ONE 2
=> TWO 2
...
```

##==##

# share ne conserve pas l'état

```typescript
const monocast$ = new Observable((subscriber) => {
  let i = 0;
  setInterval(() => subscriber.next(i++), 1_000);
});

const multicast$ = monocast$.pipe(share());

const subOne = multicast$.subscribe((i) => console.log('ONE', i));
const subTwo = multicast$.subscribe((i) => console.log('TWO', i));
setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
  multicast$.subscribe((i) => console.log('THREE', i));
}, 3_100);
```

```text
=> ONE 0
=> TWO 0
=> ONE 1
=> TWO 1
=> ONE 2
=> TWO 2
=> THREE 0
=> THREE 1
=> THREE 2
...
```

Notes:
Sous le capot, share utilise un Subject

##==##

# Comment conserver l'état ?

```typescript
const monocast$ = new Observable<number>((subscriber) => {
  let i = 0;
  setInterval(() => subscriber.next(i++), 1_000);
});

const multicast$ = monocast$.pipe(
  share({
    connector: () => new BehaviorSubject(-1),
    resetOnError: false,
    resetOnRefCountZero: false,
    resetOnComplete: false,
  }),
);

const subOne = multicast$.subscribe((i) => console.log('ONE', i));
const subTwo = multicast$.subscribe((i) => console.log('TWO', i));
setTimeout(() => {
  subOne.unsubscribe();
  subTwo.unsubscribe();
  multicast$.subscribe((i) => console.log('THREE', i));
}, 3_100);
```

```text
=> ONE 0
=> TWO 0
=> ONE 1
=> TWO 1
=> ONE 2
=> TWO 2
=> THREE 2
=> THREE 3
=> THREE 4
=> THREE 5
...
```

Notes:
On remplace le Subject normalement utilisé par un BehaviorSubject et quelques paramètres

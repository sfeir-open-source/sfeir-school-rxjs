<!-- .slide: class="bg-blue transition" -->

# RxJS Operators

##==##

# List of operators

## Catch them all

ajax / bindCallback / bindNodeCallback / defer / empty / from / fromEvent / fromEventPattern / generate / interval / of / range / throwError / timer / iif / combineLatest / concat / forkJoin / merge / race / zip / buffer / bufferCount / bufferTime / bufferToggle / bufferWhen / concatMap / concatMapTo / exhaust / exhaustMap / expand / groupBy / map / mapTo / mergeMap / mergeMapTo / mergeScan / pairwise / partition / pluck / scan / switchMap / switchMapTo / window / windowCount / windowTime / windowToggle / windowWhen / audit / auditTime / debounce / debounceTime / distinct / distinctKey / distinctUntilChanged / distinctUntilKeyChanged / elementAt / filter / first / ignoreElements / last / sample / sampleTime / single / skip / skipLast / skipUntil / skipWhile / take / takeLast / takeUntil / takeWhile / throttle / throttleTime / combineAll / concatAll / exhaust / mergeAll / startWith / withLatestFrom / multicast / publish / publishBehavior / publishLast / publishReplay / share / catchError / retry / retryWhen / tap / delay / delayWhen / dematerialize / materialize / observeOn / subscribeOn / timeInterval / timestamp / timeout / timeoutWith / toArray / defaultIfEmpty / every / find / findIndex / isEmpty / count / max / min / reduce

<p class="text-center">😱</p>

##==##

<!-- .slide: data-background="./assets/images/chuttersnap-cY-SXZp6TUY-unsplash.jpg" class="transition"  -->

# How to choose?

<!-- .element: class="cadre" -->

##==##

# How to choose an operator?

> Use [Operator Decision Tree](https://rxjs.dev/operator-decision-tree)

https://rxjs.dev/operator-decision-tree

Or back to basics 😉

Notes:
Expliquer le principe et le regarder ensemble

##==##

# Operator = function

<br><br>

> like Observables? 🤔

> Operators are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.

Notes:
D'une manière générale un opérateur va retourner un observable et permet des actions qui sont soit chainables, soit créatives (cf slide après)

##==##

# 2 kinds : Pipeable / Creation

> A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.

<br>

> A Creation Operator can be called as standalone functions to create a new Observable.

Notes:
Différencier le rôle de l'opérateur

##==##

# HOO: High Order Operators

> A higher order observable is just a fancy name for an observable that emits observable. Let’s change the example a little bit so you can see what I’m talking about.

Notes:
Expliquer pourquoi on en a besoin : Eviter une sorte de callback hell de l'observable avec des mécanismes de désinscription

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition" data-type-show="prez" -->

# Live coding !

Notes:

1. Coder le problème
2. Coder la première solution (montrer qu'on ne récupère que des observables)
3. Ajouter la récupération du pull du dernier stream (mais préciser que c'est toujours pas mieux)
4. présenter les merge operators pour montrer comment les utiliser proprement

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem

```javascript
const button = document.querySelector('button');

fromEvent(button, 'click').subscribe(event => {
  interval(1000).subscribe(num => {
    console.log(num);
  });
});
```

You have to manually unsubscribe by yourself and it starts looking like callback Hell

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution ?

```javascript
const click$ = fromEvent(button, 'click');
const interval$ = interval(1000);

const clicksToInterval$ = click$.pipe(
  map(event => {
    return interval$;
  })
);

clicksToInterval$.subscribe(intervalObservable =>
  console.log(intervalObservable)
);
```

You write a HOO but we log Observables!

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution ?

```javascript
const click$ = fromEvent(button, 'click');
const interval$ = interval(1000);

const clicksToInterval$ = click$.pipe(
  map(event => {
    return interval$;
  })
);

clicksToInterval$.subscribe(intervalObservable$ => {
  intervalObservable$.subscribe(num => {
    console.log(num);
  });
});
```

It logs again the number, but is to close to callback Hell

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution (mergeAll)

```javascript
const click$ = fromEvent(button, ‘click’);
const interval$ = interval(1000);

const observable$ = click$.pipe(map(event => {
   return interval$;
}));

observable$.mergeAll().subscribe(num => console.log(num));
```

It takes the inner value to push it to final stream. Have a look at [Understanding mergeMap and switchMap in RxJS](https://netbasal.com/understanding-mergemap-and-switchmap-in-rxjs-13cf9c57c885)

##==##

# Flatten High Order Operators

- **concatAll()**: subscribes to each "inner" Observable that comes out of the "outer" Observable, and copies all the emitted values until that Observable completes, and goes on to the next one. All of the values are in that way concatenated.
- **mergeAll()**: subscribes to each inner Observable as it arrives, then emits each value as it arrives
- **switchAll()**: subscribes to the first inner Observable when it arrives, and emits each value as it arrives, but when the next inner Observable arrives, unsubscribes to the previous one, and subscribes to the new one.
- **exhaust()**: subscribes to the first inner Observable when it arrives, and emits each value as it arrives, discarding all newly arriving inner Observables until that first one completes, then waits for the next inner Observable.

##==##

# Main categories of operators

<br>

- Creation Operators: creates Observables (from, of, ...)
- Join Creation Operators: creates Observables from multiples (merge, race, ...) <!-- .element: class="fragment" -->
- Transformation Operators: transform the value emit by observable (map, scan, ...) <!-- .element: class="fragment" -->
- Filtering Operators: filter the values emit by observable (first, take, ...) <!-- .element: class="fragment" -->
- Join Operators: use to combine Observables (combineAll, concatAll, ...) <!-- .element: class="fragment" -->
- Multicasting Operators: share an observable to multiple subcribers (share, ...) <!-- .element: class="fragment" -->
- Error Handling Operators: help to deal with error emission <!-- .element: class="fragment" -->
- Utility Operators: affect the timing or the way the observable values are emit (tap, delay, ...) <!-- .element: class="fragment" -->
- Conditional and Boolean Operators: basic boolean operation (isEmpty, find, ...)<!-- .element: class="fragment" -->
- Mathematical and Aggregate Operators: reduce values (reduce, count, ...) <!-- .element: class="fragment" -->

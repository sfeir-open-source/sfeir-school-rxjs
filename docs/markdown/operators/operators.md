<!-- .slide: class="transition bg-pink" -->

# RxJS & Operators

##==##

# Let's talk about Purity

> In computer programming, a pure function is a function that has the following properties :
>
> 1. Its return value is the same for the same arguments.
> 2. Its evaluation has no side effects.

Notes:
expliquer les 2 points (exemples de code à venir sur les slides suivants)

##==##

<!-- .slide: class="with-code consolas" data-type-show="full"-->

# Its return value is the same for the same arguments.

```javascript
let a = 0;
function impureFunction(b) {
  return a + b;
}
impureFunction(1); // => 1
a = 1;
impureFunction(1); // => 2
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" data-type-show="full" -->

# Its return value is the same for the same arguments.

```javascript
function pureFunction(b) {
  const a = 0;
  return a + b;
}
pureFunction(1); // => 1
pureFunction(1); // => 1
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" data-type-show="full" -->

# Its evaluation has no side effects

```javascript
let count = 0;
const sideEffectFunction = () => count++;
const dependantFunction = b => count + b;

dependantFunction(1); // => 1
sideEffectFunction(); // count changed
dependantFunction(1); // => 2
```

<!-- .element: class="big-code" -->

Notes:
Expliquer que l'effet de bord si on a une autre méthode qui accède au paramètre count
alors, notre méthode a modifier le comportement de l'autre => problème

##==##

# About Purity

> Observables are immutable values

<br>

> Subscription is impure but combining observable values is not

##==##

# Back to basics

<br><br>

> Let's have a look to `map`, `filter`, `reduce`, `flatMap`

Notes:
classics: map, filter, reduce (what?), flatMap (but how?)
(voir d'autres)

##==##

# Piping

You can use operators like function and chain them. But it's not readable

```
op2()(op1()(obs))
```

<br>
So welcome to Pipe method !

```
obs.pipe(
  op1(),
  op2(),
)
```

Notes:
Même si un pipeable operator retourne un observable, il ne fait que réutiliser le précédent observable ! et donc n'est pas à l'origine de sa création

##==##

<!-- .slide: class="with-code consolas" -->

# Pipe everything

<br><br>

```typescript
function pipe(...fns) {
  return fns => x => fns.reduce((acc, f) => f(acc), x);
}
```

<!-- .element: class="big-code block" -->

##==##

<!-- .slide: class="exercice sfeir-bg-pink" -->

# RxObservables

## Exercice 3

<br>
1. Let's use RxObservables
<br>

### Make the test pass ;)

##==##

<!-- .slide: class="bg-blue transition" -->

# RxJS Operators

##==##

# List of operators

## Catch them all

ajax / bindCallback / bindNodeCallback / defer / empty / from / fromEvent / fromEventPattern / generate / interval / of / range / throwError / timer / iif / combineLatest / concat / forkJoin / merge / race / zip / buffer / bufferCount / bufferTime / bufferToggle / bufferWhen / concatMap / concatMapTo / exhaust / exhaustMap / expand / groupBy / map / mapTo / mergeMap / mergeMapTo / mergeScan / pairwise / partition / pluck / scan / switchMap / switchMapTo / window / windowCount / windowTime / windowToggle / windowWhen / audit / auditTime / debounce / debounceTime / distinct / distinctKey / distinctUntilChanged / distinctUntilKeyChanged / elementAt / filter / first / ignoreElements / last / sample / sampleTime / single / skip / skipLast / skipUntil / skipWhile / take / takeLast / takeUntil / takeWhile / throttle / throttleTime / combineAll / concatAll / exhaust / mergeAll / startWith / withLatestFrom / multicast / publish / publishBehavior / publishLast / publishReplay / share / catchError / retry / retryWhen / tap / delay / delayWhen / dematerialize / materialize / observeOn / subscribeOn / timeInterval / timestamp / timeout / timeoutWith / toArray / defaultIfEmpty / every / find / findIndex / isEmpty / count / max / min / reduce

<h1 class="center">😱</h1>

##==##

<!-- .slide: data-background="./assets/images/chuttersnap-cY-SXZp6TUY-unsplash.jpg" class="transition"  -->

# How to choose?

<!-- .element: class="cadre" -->

##==##

# How to choose it's operator?

> Use [Operator Decision Tree](https://rxjs.dev/operator-decision-tree)

Or back to basics 😉

Notes:
Expliquer le principe et le regarder ensemble

##==##

# Operator = function

<br><br>

> like Observables? 🤔

> Operators are pure functions that enable a functional programming style of dealing with collections with operations like map, filter, concat, reduce, etc.

Notes:
D'une manière générale un opérateur va retourner un observable et permet des actions qui sont soit chainable, soit créatives (cf slide après)

##==##

# 2 kinds : Pipeable / Creation

> A Pipeable Operator is a function that takes an Observable as its input and returns another Observable. It is a pure operation: the previous Observable stays unmodified.

<br>
> A Creation Operator can be called as standalone functions to create a new Observable.

Notes:
Différencier le role de l'opérateur

##==##

# HOO: High Order Operators

> A higher order observable is just a fancy name for an observable that emits observable. Let’s change the example a little bit so you can see what I’m talking about.

Notes:
Expliquer pourquoi on en a besoin : Eviter une sorte de callback hell de l'observable avec des mécanismes de desynscription

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition" data-type-show="prez" -->

# Live coding !

Notes:

1. Coder le problème
2. Coder la première solution (montrer qu'on récupère que des observables)
3. Ajouter la récupération du pull du dernier stream (mais préciser que c'est toujours pas mieux)
4. présenter les merge operators pour montrer comment les utiliser proprement

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem

```javascript
const button = document.querySelector('button');

Observable.fromEvent(button, 'click').subscribe(event => {
  Observable.interval(1000).subscribe(num => {
    console.log(num);
  });
});
```

You have to manualy unsubscribe from yourself and start looking like callback Hell

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution ?

```javascript
const click$ = Observable.fromEvent(button, 'click');
const interval$ = Observable.interval(1000);

const clicksToInterval$ = click$.map(event => {
  return interval$;
});

clicksToInterval$.subscribe(intervalObservable =>
  console.log(intervalObservable)
);
```

You write a HOO but we log Observables!

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution ?

```javascript
const click$ = Observable.fromEvent(button, 'click');
const interval$ = Observable.interval(1000);

const clicksToInterval$ = click$.map(event => {
  return interval$;
});

clicksToInterval$.subscribe(intervalObservable$ => {
  intervalObservable$.subscribe(num => {
    console.log(num);
  });
});
```

It log again the number, but is to close to callback Hell

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# The problem : solution (mergeAll)

```javascript
const click$ = Observable.fromEvent(button, ‘click’);
const interval$ = Observable.interval(1000);

const observable$ = click$.map(event => {
   return interval$;
});

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

##==##

<!-- .slide: class="transition bg-blue" -->

# Main Operators

##==##

# Understand Marble diagram

![full-center h-600](./assets/images/marble-diagram-anatomy.svg)

##==##

# Creator - Of

> Converts the arguments to an observable sequence.

![center hm-600](./assets/images/of.png)

##==##

# Creator - From

> Creates an Observable from an Array, an array-like object, a Promise, an iterable object, or an Observable-like object.

![center hm-600](./assets/images/from.png)

##==##

# Creator - merge

> Creates an output Observable which concurrently emits all values from every given input Observable.

![center hm-600](./assets/images/merge.png)

##==##

# Creator - concat

> Creates an output Observable which sequentially emits all values from given Observable and then moves on to the next.

![center hm-600](./assets/images/concat.png)

##==##

# Transformation - Map

> Applies a given project function to each value emitted by the source Observable, and emits the resulting values as an Observable.

![center hm-600](./assets/images/map.png)

Notes:
Transform le contenu d'un stream

##==##

# Transformation - Scan

> Applies an accumulator function over the source Observable, and returns each intermediate result, with an optional seed value

![center hm-600](./assets/images/scan.png)

##==##

# Transformation - Reduce

> Applies an accumulator function over the source Observable, and returns the accumulated result when the source completes, given an optional seed value.

![center hm-600](./assets/images/reduce.png)

##==##

# Filtering - Filter

> Filter items emitted by the source Observable by only emitting those that satisfy a specified predicate.

![center hm-600](./assets/images/filter.png)
##==##

# Time - Debounce

> Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.

![center hm-600](./assets/images/debounce.png)

##==##

# Transformation - TakeUntil

> Emits the values emitted by the source Observable until a notifier Observable emits a value.

![center hm-600](./assets/images/takeUntil.png)

##==##

# Time - Delay

> Delays the emission of items from the source Observable by a given timeout or until a given Date.

![center hm-600](./assets/images/delay.png)

##==##

# Utility - Tap

> Perform a side effect for every emission on the source Observable, but return an Observable that is identical to the source.

![center hm-600](./assets/images/tap.png)

##==##

<!-- .slide: class="exercice" -->

# Loads of Streams

## Exercice 4

<br>
1. Advent of code day 2
<br>
### run the tests

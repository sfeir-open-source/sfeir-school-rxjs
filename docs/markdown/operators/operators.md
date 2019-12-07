<!-- .slide: class="transition-white sfeir-bg-red" -->

# Operators

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

# HOO: High Order Operators

> A higher order observable is just a fancy name for an observable that emits observable. Let’s change the example a little bit so you can see what I’m talking about.

Notes:
Expliquer pourquoi on en a besoin : Eviter une sorte de callback hell de l'observable avec des mécanismes de desynscription

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition-white transition-center" data-type-show="prez" -->

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

clicksToInterval$.subscribe(intervalObservable => console.log(intervalObservable));
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

<!-- .slide: class="transition-white sfeir-bg-blue" -->

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

# Transformation - Debounce

> Emits a value from the source Observable only after a particular time span determined by another Observable has passed without another source emission.

![center hm-600](./assets/images/debounce.png)

##==##

# Transformation - TakeUntil

> Emits the values emitted by the source Observable until a notifier Observable emits a value.

![center hm-600](./assets/images/takeUntil.png)

##==##

# Transformation - Delay

> Delays the emission of items from the source Observable by a given timeout or until a given Date.

![center hm-600](./assets/images/delay.png)

##==##

<!-- .slide: data-background="./assets/images/chuttersnap-cY-SXZp6TUY-unsplash.jpg" class="transition-center transition-white"  -->

# How to choose?

<!-- .element: class="cadre" -->

##==##

# How to choose it's operator?

> Use [Operator Decision Tree](https://rxjs.dev/operator-decision-tree)

Notes:
Expliquer le principe et le regarder ensemble

##==##

<!--.slide: data-background="./assets/images/wall-clock-at-5-50-707582.jpg" class="transition-black transition-center" -->

# How to deal with time?

##==##

# Scheduler vs timeOperator

<br><br>

> An **Operator** can use a **Scheduler** to affect the timing of publication in the stream.

Notes:
Préciser qu'un opérateur jouant sur le temps va surement utiliser une scheduler et pas l'inverse

##==##

# A scheduler

> A scheduler controls when a subscription starts and when notifications are delivered.

<br>

> A Scheduler is an execution context. It denotes where and when the task is executed (e.g. immediately, or in another callback mechanism such as setTimeout or process.nextTick, or the animation frame).
> ##==##

# Kind of scheduler

| SCHEDULER               | PURPOSE                                                                       |
| ----------------------- | ----------------------------------------------------------------------------- |
| null                    | Notifications are delivered synchronously and recursively.                    |
| queueScheduler          | Schedules on a queue in the current event frame (trampoline scheduler).       |
| asapScheduler           | Schedules on the micro task queue, which is the same queue used for promises. |
| asyncScheduler          | Schedules work with setInterval .                                             |
| animationFrameScheduler | Schedules task that will happen just before next browser content repaint.     |

Notes:
d'une manière générale, c'est l'async qui est le plus utilisé. Sachez que les autres existent pour le jour où :)

##==##

<!-- .slide: class="two-column-layout" -->

# Example

##--##

# AsyncScheduler

<!-- .slide: class="with-code consolas" -->

```javascript
const observable = new Observable((observer) => {
  observer.next(1);
}).pipe(
  observeOn(asyncScheduler)
);
console.log('just before subscribe');
observable.subscribe({
  next(x) => console.log('got value ' + x),
});
console.log('just after subscribe');
```

<!-- .element: class="big-code block"-->

##--##

<!-- .slide: class="with-code consolas" -->

# Will print

```
just before subscribe
just after subscribe
got balue 1
```

<!-- .element: class="big-code block"-->

##==##

<!-- .slide: data-type-show="prez"-->

# Subscription context

## Use `subscribeOn`

> Use subscribeOn to schedule in what context will the subscribe() call happen.

Notes:
Par défaut, le subscribe est syncrhone et immédiat (rappel -> appel de fonction!)

##==##

<!-- .slide: data-type-show="full"-->

# Subscription context

Use subscribeOn to schedule in what context will the subscribe() call happen. By default, a subscribe() call on an Observable will happen synchronously and immediately. However, you may delay or schedule the actual subscription to happen on a given Scheduler, using the instance operator subscribeOn(scheduler), where scheduler is an argument you provide.

##==##

<!-- .slide: data-type-show="prez"-->

# Notification context

## Use `observeOn`

**List of operators using schedulers:**

```
bindCallback / bindNodeCallback /combineLatest / concat
empty / from / fromPromise / interval /merge / of
range / throw / timer
```

Notes:
On met donc en place une sorte de proxy observable de façon controler le timing de notification

##==##

<!-- .slide: data-type-show="full"-->

# Notification context

Use observeOn to schedule in what context will notifications be delivered. As we saw in the examples above, instance operator observeOn(scheduler) introduces a mediator Observer between the source Observable and the destination Observer, where the mediator schedules calls to the destination Observer using your given scheduler.

**List of operators using schedulers:**

```
bindCallback / bindNodeCallback /combineLatest / concat
empty / from / fromPromise / interval /merge / of
range / throw / timer
```

##==##

<!-- .slide: class="exercice sfeir-bg-pink" -->

# TODO Exercice Title

## Exercice

<br>
1. First step
2. Second step
3. Third step
<br>
Additionnal Advice
### Step: push-1
````

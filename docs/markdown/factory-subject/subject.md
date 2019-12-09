<!-- .slide: class="transition-white sfeir-bg-red" -->

# Factories / Subject manipulations

##==##

# Push: Observables & EventEmitters

<br>
> Contrary to popular claims, Observables are not like EventEmitters nor are they like Promises for multiple values. Observables may act like EventEmitters in some cases, namely when they are multicasted using RxJS Subjects, but usually they don't act like EventEmitters.

Notes:
Un Observable est un producteur d'événement mais qui peut être aussi bien multicasté que simplement

##==##

# EventEmitters

<br>

- EventEmitters can have multiples subscribers for a dedicated channel
- EventEmitters emit a message to All the subscribers and executes side effects in all subscribers

> As opposed to EventEmitters which share the side effects and have eager execution regardless of the existence of subscribers, Observables have no shared execution and are lazy.

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition-white transition-center" data-type-show="prez" -->

# Live coding !

##==##

<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Hot vs Cold

Notes:
On parle souvent de 2 types d'observables

##==##

<!-- .slide: class="with-code consolas" -->

# Cold Observable

> We call an Observable "Cold" when the data are produce by the observable itself. For example, observables created using the `of`, `from`, `range`, `interval` and `timer` operators will be cold.

```javascript
let obs = Observable.create(observer => observer.next(1));
```

<!-- .element: class="big-code block" -->

Notes:
Un cold observable partagera tout le temps le même stream pour ses subscribers sauf si on le transforme en hot

##==##

<!-- .slide: class="with-code consolas" -->

# Hot Observable

> We call an Observable "Hot" when the data are produce outside of the observable itself. For example, observables created using the `fromEvent` operators will be hot.

```javascript
const obs$ = Observable.fromEvent(document, 'click') //
  .map(event => ({
    clientX: event.clientX,
    clientY: event.clientY
  }));
```

<!-- .element: class="big-code block" -->

##==##

<!-- .slide: class="two-column-layout" -->

# Cold Observable could become Hot

##--##

### Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.from(['🍕', '🍪']) //
  .map(val => {
    return `Miam ${val}!`;
  });
```

<!-- .element: class="big-code"-->

##--##

### Become a Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.from(['🍕', '🍪']) //
  .map(val => {
    return `Miam ${val}!`;
  })
  .share();
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="two-column-layout" -->

# Hot Observable could become Cold

##--##

### Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.fromEvent(
  document, //
  'click'
).map(e => ({ clientX: e.clientX }));

const sub1 = obs$.subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->

##--##

### Become a Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obsFactory = () =>
  Observable.fromEvent(
    document, //
    'click'
  ).map(e => ({ clientX: e.clientX }));

const sub1 = obsFactory().subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Sharable stream

##==##

# Sharable steam

## Share a stream to multiple Observers

<br>
The main idea is to share a stream amoung multiples observers but without replaying the totality of the stream. We want to deal with **hot observable**.

<br>
It could helps us to save memory, avoid multiples call to backend, ...

<br>
To share a stream, we also have to deal with **Subjects**

##==##

<!-- .slide: class="with-code consolas" -->

# Basic Multicasting

<br><br>

```javascript
const source = interval(1000).pipe(multicast(new Subject()));
```

<!-- .element: class="big-code block" -->

<br>
When creating a multicast Observable, we allow it to multiple subscription. But it's not enough. We don't know when start the the subscription and how manage the unsubscription flow.

##==##

<!-- .slide: class="with-code consolas" -->

# Connect to the stream

<br><br>

```javascript
const source = interval(1000).pipe(multicast(new Subject()));

const connectable = source.connect();
```

<!-- .element: class="big-code block" -->
<br>
with this code, the `connectable` is in charge of subscription and unsubscription. To disconnect us from the stream, we call `unsubscribe()` on `connectable``

##==##

<!-- .slide: class="with-code consolas" -->

# Refcount for easier management

<br><br>

```javascript
const source = interval(1000).pipe(
  multicast(new Subject()),
  refCount()
);
```

<!-- .element: class="big-code block" -->

<br>
`refCount` maintain an counter of subscriptions and automaticly call the connect for us. When the number of observer is to 0, it call the `unsubscribe` on the stream source.

##==##

# Variants operators

### Some operators are doing multiples actions

| Operator        | Action                                                           |
| --------------- | ---------------------------------------------------------------- |
| publish         | shortcut for `multicast(() => new Subject())`                    |
| publishBehavior | shortcut for `multicast(() => new BehaviorSubject())`            |
| publishReplay   | shortcut for `multicast(() => new ReplaySubject())`              |
| publishLast     | shortcut for `multicast(() => new AsyncSubject())`               |
| share           | shortcut for `multicast(() => new Subject()) + refCount()`       |
| shareReplay     | shortcut for `multicast(() => new ReplaySubject()) + refCount()` |

##==##

<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Side effects

##==##

# Side effet of sharable

<br><br>

**Side Effect** represent operator that don't touch the stream but execute some external operations. For example, `tap` is a side effect operator.

##==##

<!-- .slide: class="two-column-layout" -->

# Side effet of sharable

##--##

### Cold observable

<!-- .slide: class="with-code consolas" -->

```javascript
cons log = (val) => console.log(val)
const example = timer(1000).pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
);
const subscribe1 = example.subscribe(log);
const subscribe2 = example.subscribe(log);
//***SIDE EFFECT***"
//"***RESULT***"
//"***SIDE EFFECT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height block" -->

##--##

<!-- .slide: class="with-code consolas" -->

### Share stream

```javascript
//share observable among subscribers
const shared = example.pipe(share());
const subscribe3 = shared.subscribe(log);
const subscribe4 = shared.subscribe(log);
//"***SIDE EFFECT***"
//"***RESULT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height block" -->

##==##

<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Subjects

##==##

# What is a Subject ?

> A Subject is like an Observable, but can multicast to many Observers. Subjects are like EventEmitters: they maintain a registry of many listeners.

<br>

By default, an Observable can only be cast to **one** observer for **one** event.

##==##

# Observable vs Subject

![center](./assets/images/Observable-vs-Subject.png)

##==##

<!-- .slide: class="two-column-layout" -->

# Observable vs Subject

##--##

<!-- .slide: class="with-code consolas" -->

```javascript
const store = new Rx.Subject();
store.subscribe(v => console.log(v));
store.subscribe(v => console.log(v));
store.next(1);
store.next(2);
// Log 1
// Log 1
// Log 2
// Log 2
```

<!-- .element: class="big-code no-max-height block" -->

##--##

<!-- .slide: class="with-code consolas" -->

```javascript
const base = Rx.Observable.create((observer){
  observer.next(1);
  observer.next(2);
  observer.complete();
})
base.subscribe(v => console.log(v));
base.subscribe(v => console.log(v));
// Log 1
// Log 2
// Log 1
// Log 2
```

<!-- .element: class="big-code no-max-height block" -->

##==##

# Multicasting Observable?

> A multicasted Observable uses a Subject under the hood to make multiple Observers see the same Observable execution.

You should connect an observable to the stream

Notes:
Y a pas de secret, un Observable multi casté est en fait un subject

##==##

# Other Subjects

<br><br>

| Type            | Action                                                                                               |
| --------------- | ---------------------------------------------------------------------------------------------------- |
| BehaviorSubject | Can send old value to new subscribers. Replay the last event when subscribe                          |
| ReplaySubject   | Like BehaviorSubject but can replay the last X events or the last event since de last X milliseconds |
| AsyncSubject    | Wait the completion of observable to send the events since the subcription                           |

##==##

<!-- .slide: class="with-code consolas" -->

# Subcription / Unsubscription

### When subcribe to an observable you can stop receive events

```javascript
import { interval } from 'rxjs';

const observable = interval(1000);
const subscription = observable.subscribe(x => console.log(x));
// Later:
// This cancels the ongoing Observable execution which
// was started by calling subscribe with an Observer.
subscription.unsubscribe();
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# Multiple unsubscription

### You can also group all the subscriptions

```javascript
const subscription = observable1.subscribe(x =>
  console.log('first: ' + x)
);
const childSubscription = observable2.subscribe(x =>
  console.log('second: ' + x)
);

subscription.add(childSubscription);

setTimeout(() => {
  // Unsubscribes BOTH subscription and childSubscription
  subscription.unsubscribe();
}, 1000);
```

<!-- .element: class="big-code" -->

Notes:
Précisez qu'on peut bien entendu faire une desincription manuelle mais que c'est plus pratique dans ce sens

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

<!-- .slide: data-type-show="prez" class="with-code consolas"-->

# Notification context

## Use `observeOn`

**List of operators using schedulers:**

```
bindCallback / bindNodeCallback /combineLatest / concat
empty / from / fromPromise / interval /merge / of
range / throw / timer
```

<!-- .element: class="big-code block" -->

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

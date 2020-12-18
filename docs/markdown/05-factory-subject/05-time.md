<!--.slide: data-background="./assets/images/wall-clock-at-5-50-707582.jpg" class="transition" -->

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

AsyncScheduler

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

Will print

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

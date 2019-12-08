<!-- .slide: class="transition-white sfeir-bg-red" -->

# Factories / Subject manipulations

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

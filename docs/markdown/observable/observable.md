<!-- .slide: class="transition bg-pink" -->

# Observable, the lazy push stream

##==##

# About Timing sequence

## What can we do if the value should be returned later?

- We could use **Callbacks**. What's the problem ?
- When stop it and how?

##==##

## Remember: Pattern Observer

<div class="full-center">
 <img src="./assets/images/Pattern-Observer.png">
</div>

Notes:
L'observer Pattern ne fait que dire qu'un objet est observé par les listeners et qu'ils réagissent à des événements

##==##

# An Observable is a function!

<br>

> Observables are like functions with zero arguments, but generalize those to allow multiple values

##==##

<!--  .slide: class="with-code consolas" -->

# Observable protocol

```typescript
interface Observer<T> {
  next(val: T): void;
  complete(): void;
}

interface Observable<T> {
  subscribe(observer: Observer<T>): void;
}
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="two-column-layout" -->

##--##

<!-- .slide: class="with-code consolas" -->

# Function way

```javascript
function foo() {
  console.log('Hello');
  return 42;
}
const x = foo.call(); // same as foo()
console.log(x);
const y = foo.call(); // same as foo()
console.log(y);
```

<!-- .element: class="big-code"-->

##--##

<!-- .slide: class="with-code consolas" -->

# Observable way

```javascript
import { Observable } from 'rxjs';
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});
foo.subscribe(x => console.log(x));
foo.subscribe(y => console.log(y));
```

<!-- .element: class="big-code"-->

##==##

# Observable subscription

<br><br>

> Subscribing to an Observable is analogous to calling a Function

Notes:
Rien ne se passe tant qu'on ne s'est pas enregistré !!
Retourner un Observable ne fait que retourner une fonction !

##==##

# Observable == function

<!-- .slide:  class="two-column-layout" -->

##--##

<!-- .slide: class="with-code consolas" -->

```javascript
console.log('before');
const foo = new Observable(subscriber => {
  console.log('Hello');
  subscriber.next(42);
});
foo.subscribe(x => {
  console.log(x);
});
console.log('after');
```

<!-- .element: class="big-code" -->

##--##

<!-- .slide: class="with-code consolas" -->

```javascript
// log "before"
// log nothing
//
//
//
// log 'Hello'
// log 42
//
// log 'after'
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# Observable API

```javascript
// send 1 to subcriber
subscriber.next(1);
// terminate the subcription (does not send a value)
subscriber.complete();
// send an exception to subscriber
subscriber.error(error);
```

<!-- .element: class="big-code block" -->

![h-300 center](./assets/images/Stream-explanation.png)

Notes:
Faire le lien entre le marble et l'api

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

Notes:
Précisez qu'on peut bien entendu faire une désinscription manuelle mais que c'est plus pratique dans ce sens

##==##

<!-- .slide: class="exercice" -->

# Create a chat (step 1)

## Exercice 2

<br>

1. Create an Observable that listens to the event 'new-user' sent by the server
2. Susbscribe to the previous Observable and set the username accordingly. Deal with the error case.
3. Do the same for the events 'refresh-users' and 'new-message' that respectively update the online users and update the displayed messages
<br>
<br>

### Don't forget to unsubscribe ;)

##==##

<!-- .slide: class="transition bg-blue" -->

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

Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.from(['🍕', '🍪']) //
  .map(val => {
    return `Miam ${val}!`;
  });
```

<!-- .element: class="big-code"-->

##--##

Become a Hot Observable

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

Hot Observable

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

Become a Cold Observable

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

<!-- .slide: class="exercice" -->

# Create a chat (step 2)

## Exercice 3

<br>

We now want to handle the submission of the username and the message by a keypress on `Enter`.

1. In `App.js` and `Username.jsx` : delete the `handleSubmit` function and the `<form>` tag.
2. Use the `fromEvent` operator to create observables that listen to the `keyup` event and if the pressed key is `Enter`, send the data.

<br>
<br>

### The keycode for `Enter` is 13
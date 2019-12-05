<!-- .slide: class="transition-white sfeir-bg-red" -->

# Observable and the push stream

##==##

## Remember: Pattern Observer

<div class="full-center">
 <img src="./assets/images/Pattern-Observer.png">
</div>

Notes:
L'observer Pattern ne fait que dire qu'un objet est observé par les listeners et qu'ils réagissent à des événements

##==##

# Push vs Pull

<br><br><br>

|          | Single                                    | Multiple                                   |
| -------- | ----------------------------------------- | ------------------------------------------ |
| **Pull** | **Passive**: produces data when requested | **Active**: decides when data is requested |
| **Pull** | Function                                  | Iterator                                   |
| **Push** | **Active**: produces data at its own pace | **Passive**: Reacts to received data       |
| **Push** | Promise                                   | Observable                                 |

Notes:
Revenir sur les concepts : Pull = On récupère
Push = on pousse une information

- A Function is a lazily evaluated computation that synchronously returns a single value on invocation.
- A generator is a lazily evaluated computation that synchronously returns zero to (potentially) infinite values on iteration.
- A Promise is a computation that may (or may not) eventually return a single value.
- An Observable is a lazily evaluated computation that can synchronously or asynchronously return zero to (potentially) infinite values from the time it's invoked onwards.

##==##

# An Observable is a function!

<br>

> Observables are like functions with zero arguments, but generalize those to allow multiple values

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

# Push: Observables & EventEmitters

> Contrary to popular claims, Observables are not like EventEmitters nor are they like Promises for multiple values. Observables may act like EventEmitters in some cases, namely when they are multicasted using RxJS Subjects, but usually they don't act like EventEmitters.

Notes:
Un Observable est un producteur d'événement mais qui peut être aussi bien multicasté que simplement

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
const subscription = observable1.subscribe(x => console.log('first: ' + x));
const childSubscription = observable2.subscribe(x => console.log('second: ' + x));

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

# Todo backpressure

Intérêt de garder le slide si au final on peut pas le gérer ? ou alors parler peut être plus des streams ?

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

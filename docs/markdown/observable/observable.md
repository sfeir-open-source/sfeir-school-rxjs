<!-- .slide: class="transition-white sfeir-bg-red" -->

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

<!-- .slide: class="exercice sfeir-bg-pink" -->

# Create or Observable

## Exercice 2

<br>
1. Create an Observable
2. Create the map Operator
<br>

### Make the test pass ;)

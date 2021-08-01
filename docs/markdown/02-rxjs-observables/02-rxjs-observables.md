## Introducing RxJS

<div class="full-center">
 <img src="./assets/images/Rx_Logo-512-512.png">
</div>

Notes:

RxJS est donc l'implémentation JavaScript du concept Reactive Programming. Il existe aussi RxJava, ...

##==##

<!-- .slide: class="with-code consolas" -->

# Installation

```sh
npm install rxjs
```

<!-- .element: class="big-code block" -->

Import everything (and this is quite much):

<!-- .element: class="text-center" -->

```javascript
import * as rxjs from 'rxjs';
```

<!-- .element: class="big-code block" -->

Import just what you need:

<!-- .element: class="text-center" -->

```javascript
import { fromEvent } from 'rxjs';
import { map } from 'rxjs/operators';
```

<!-- .element: class="big-code block" -->

##==##

# Buzzword time !

RxJS is a library for composing **asynchronous** and **event-based** programs by using **observable sequences**. It provides one core type, the **Observable** [...] and operators inspired by **Array#extras** (map, filter, reduce, every, etc) to allow handling asynchronous events as **collections**.

> Think of RxJS as Lodash for events.

RxJS combines the **Observer pattern** with the **Iterator pattern** and **functional programming with collections** to fill the need for an ideal way of managing **sequences of events**.

> Observables are **lazy Push collections of multiple values**

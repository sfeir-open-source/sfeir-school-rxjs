<!-- .slide: class="transition-white sfeir-bg-red" -->

# Introduction

##==##

## Pattern Observer

<div class="full-center">
 <img src="./assets/images/Pattern-Observer.png">
</div>

Notes:
Ça repose sur le pattern Observer / L'expliquer

##==##

<div class="full-center">
 <img class="h-600" src="./assets/images/everything-stream.jpeg">
</div>

Notes:
Indiquer tout est question de stream et que tout Rx repose sur la notion de stream

##==##

## Understand Reactive Programming

<div class="full-center">
 <img src="./assets/images/Stream-explanation.png">
</div>

Notes:
Expliquer le concepte de timeline et d'événements qui arrivent
Expliquer que ce schéma est courant et qu'il représente ce qu'on va rencontrer très réguilièrement pour expliquer les streams

##==##

## Introducing RxJS

<div class="full-center">
 <img src="./assets/images/Rx_Logo-512-512.png">
</div>

Notes:

RxJS est donc l'implémentation javascript du concept Reactive Programming. Il est existe aussi RxJava, ...

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

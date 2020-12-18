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
const dependantFunction = (b) => count + b;

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
  return (fns) => (x) => fns.reduce((acc, f) => f(acc), x);
}
```

<!-- .element: class="big-code block" -->

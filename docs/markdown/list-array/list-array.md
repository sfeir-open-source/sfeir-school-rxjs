<!-- .slide: class="transition-white sfeir-bg-red" -->

# List, Array and sequences

##==##

# Let's talk about Purity

> In computer programming, a pure function is a function that has the following properties :
>
> 1. Its return value is the same for the same arguments.
> 2. Its evaluation has no side effects.

Notes:
expliquer les 2 points (exemples de code à venir sur les slides suivants)

##==##

<!-- .slide: class="with-code consolas" -->

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

<!-- .slide: class="with-code consolas" -->

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

<!-- .slide: class="with-code consolas" -->

# Its evaluation has no side effects

```javascript
let count = 0;
const sideEffectFunction = () => count++;
const dependantFunction = b => count + b;

dependantFunction(1); // => 1
sideEffectFunction(); // count changed
dependantFunction(1); // => 2
```

<!-- .element: class="big-code" -->

Notes:
Expliquer que l'effet de bord si on a une autre méthode qui accède au paramètre count
alors, notre méthode a modifier le comportement de l'autre => problème

##==##

# Functions everywhere

<br>

> Given an array <br> \[ 1, 2, 3, 4, 5 \] <br> We filter it and map it

Notes:
TODO : trouver un bon exemple

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

##==##

# TODO Slide code approche fonctionelle pour résoudre le précédent problème

##==##

# TODO : Array vs generators (finite vs infinite value)

##==##

# TODO : retour sur les générateurs

##==##

# TODO : conclusion sur le chapitre

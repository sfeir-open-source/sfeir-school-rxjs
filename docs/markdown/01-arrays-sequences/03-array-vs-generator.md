<!-- .slide: class="two-column-layout" -->

# Recap: Array vs Generators

##--##

<!-- .slide: class="with-code consolas" -->

Array (Finite values)

```javascript
const finiteArray = [1, 2, 3, 4];

for (let number of finiteArray) {
  console.log(number);
}

//will show '1', '2', '3', '4'
```

<!-- .element: class="big-code consolas" -->

##--##

<!-- .slide: class="with-code" -->

Generators (Infinite values ?)

```javascript
function* myGenerator(max) {
  let count = 0;
  while (count < max) yield count++;
  return;
}
for (let number of myGenerator(x)) {
  console.log(number);
}
```

<!-- .element: class="big-code" -->

Notes:
Revenir sur le concept de finite vs infinite value

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition" data-type-show="prez" -->

# Live coding !

Notes:
Faire un livecoding de :

1. Return a generator
2. Comment controler le temps ? Le générateur peut générer des valeurs à tes temps différents

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return infinite values with time

```javascript
function* myGenerator() {
  ...
}
const myIterator = myGenerator();
console.log(myIterator.next());
console.log(myIterator.next());
setInterval(()=>console.log(myIterator.next()), 500);
```

<!-- .element: class="big-code" -->

Notes:
on récupère 0 et 1 très rapidement et ensuite on demande la suite toute les 500ms
⚠️ Avec un générateur, on est dans une stratégie bloquante

##==##

# How to return values ?

<br><br>

|      | Single   | Multiple |
| ---- | -------- | -------- |
| Pull | Function | Iterator |

<br>

- A function return an array of a single value (sync or not)
- A generator return an iterator (sync)

Notes:
Conclure sur le concept de réception

##==##

# Push vs Pull

<br><br><br>

|          | Single                                                 | Multiple                                                 |
| -------- | ------------------------------------------------------ | -------------------------------------------------------- |
| **Pull** | Function <br>**Passive**: produces data when requested | Iterator <br> **Active**: decides when data is requested |
| **Push** | Promise <br>**Active**: produces data at its own pace  | Observable <br>**Passive**: Reacts to received data      |

Notes:
Revenir sur les concepts : Pull = On récupère
Push = on pousse une information

- Une fonction est évaluée de façon syncrhone et retourne une valeur à son invocation
- Un générateur va être évalué de façon syncrhone et retourne de 0 à un nombre infini de valeurs
- Une promesse est une opération asyncrhone qui peut ou pas retourner une valeur
- Un observable est une opération qui de manière syncrhone ou asynchrone va produire 0 ou un nombre infini de valeurs du moment qu'il est invoqué.

##==##

<!-- .slide: class="with-code consolas" -->

# Multiple Values management

> A Sequence is a consider as a value. Except that, you can combined them with pure functions !

To deal with multiples values, think about a callback called on each value (like Array.forEach)!

Operator signature:

```typescript
export type Sequence<T> = (iter: (value: T) => void) => void;

export type SequenceOp<T, U> = (
  source: Sequence<T>
) => Sequence<U>;
```

<!-- .element: class="big-code block" -->

# WarmUp

> Given an array of integers<br> `[ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]`<br>
> return the product of their squares not multiple of 3

Notes:
Il faut parler de map, filter, reduce
Expliquer programmation déclarative

##==##

<!-- .slide: class="with-code consolas" -->

# Declarative programming

```javascript
input
  .map(x => x ** 2)
  .filter(x => x % 3 !== 0)
  .reduce((x, y) => x * y);
```

<!-- .element: class="big-code" -->

##==##

<!-- .slide: class="with-code consolas" -->

# More declarative programming

```javascript
const square = x => x ** 2;
const isMultipleOf = y => x => x % y === 0;
const not = f => x => !f(x);
const multiply => (a, b) => a * b;

input
  .map(square)
  .filter(not(isMultipleOf(3)))
  .reduce(multiply);
```

<!-- .element: class="big-code" -->

##==##

# How to return values ?

<br><br>

|      | Single   | Multiple |
| ---- | -------- | -------- |
| Pull | Function | Iterator |

Notes:
Ici pour récupérer des valeurs, on peut soit récupérer un nombre fini de valeurs, ou alors un nombre infini et surtout non borné dans le temps

##==##

<!-- .slide: data-background="./assets/images/computer-keyboard-34153.jpg" class="transition" data-type-show="prez" -->

# Live coding !

Notes:
Faire un livecoding de :

1. Return single value
2. Return finite multiple value
3. Controler le temps => retourner une promesse
4. Code avec un itérateur

```javascript
function singleValue() {
  return 'Hello World';
}
function multipleValue() {
  return ['Hello', 'World'];
}
function* infiniteValues() {
  let wontFinish = true;
  let count = 0;
  while (wontFinish) {
    wontFinish = yield count++;
  }
}
function promessify(f) {
  return new Promise((resolve, reject) => {
    resolve(f());
  });
}

console.log(singleValue());
console.log(multipleValue());
promessify(singleValue).then(console.log);
promessify(multipleValue).then(console.log);

const gen = infiniteValues();
console.log(gen.next(true));
console.log(gen.next(true));
console.log(gen.next());
```

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return a single value

```javascript
function singleValue() {
  return 'hello world!';
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on ne retourne qu'une seule valeure via notre function

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return multiples values

```javascript
function singleValue() {
  return ['hello', ' World', '!'];
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on récupère un nombre fini de valeurs

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return infinite values ?

```javascript
function* myGenerator() {
  let wontFinish = false;
  let count = 0;
  while (wontFinish) {
    wontFinish = yield count++;
  }
}
```

<!-- .element: class="big-code" -->

Notes:
Ici on récupère un nombre inifini de valeurs

##==##

<!-- .slide: data-type-show="full" class="with-code consolas" -->

# Return single value with time

```javascript
function asyncValue() {
  return new Promise((resolve, reject)=>{
    ...
    resolve(value);
  })
}
```

<!-- .element: class="big-code" -->

Notes:
on ne sait pas quand la valeur va arriver, mais elle arrivera un jour ! Par contre elle est unique

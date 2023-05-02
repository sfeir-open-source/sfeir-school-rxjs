## Rappels : Arrow Function

```typescript
// function expression
function multiplyBy2(n: number): number {
  return n * 2;
}

// arrow function
const multiplyBy2 = (n: number): number => n * 2;
```

<!-- .element: class="big-code block" -->

Notes:

- les deux sont des fonctions
- ce n'est pas tout à fait la même chose (l'arrow function est anonyme, n'a pas de context propre, etc.)
- on peut utiliser indifféremment les 2 dans la majorité des cas

##==##

## Rappels : fonction pure

```typescript
let FOO = 2;

function impure(n: number) {
  return n * FOO;
}

console.log(impure(2));

function pure(a: number, b: number) {
  return a * b;
}

console.log(pure(2, FOO));
```

```typescript
let FOO = 2;

function impureWithSideEffect(n: number) {
  FOO = n;
}

impureWithSideEffect(3);
```

Notes:

- une fonction pure est une fonction qui ne dépend que de ces paramètres
- et qui pour les mêmes paramètres renverra toujours le même résultat
- une fonction pure ne doit pas non plus avoir de side-effect

##==##

## Rappels : passer une fonction en paramètre

```typescript
const numbers = [1, 2, 3, 4, 5, 6];

function isEven(n: number): boolean {
  return n % 2 === 0;
}

const evenNumbers = numbers.filter((n) => isEven(n));
// ou
const evenNumbers = numbers.filter(isEven);
```

Notes:

Si on passe une fonction en paramètre d'une autre fonction, et qu'on ne fait que passer les paramètres à une autre fonction, on peut utiliser une référence de fonction

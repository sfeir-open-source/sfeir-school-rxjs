# Appliquer un traitement - trier les pommes

```typescript
apples$.subscribe((apple) => {
  if (isRed(apple)) {
    // do something
  }
});
```

##==##

# Appliquer un traitement - trier les pommes - Rx-style

```typescript
import { filter } from 'rxjs';

// const redApples$ = filter(isRed)(apples$);

const redApples$ = apples$.pipe(filter(isRed));

redApples$.subscribe((redApple) => {
  // do something
});
```

![w-1000 center](./assets/images/diagrams/apple_filter.svg)

##==##

# Appliquer un traitement - couper les pommes

```typescript
apples$.subscribe((apple) => {
  const appleSlices = cutInSlices(apple);
});
```

##==##

# Appliquer un traitement - couper les pommes - Rx-style

```typescript
import { map } from 'rxjs';

// const applesInSlices$ = map(cutInSlices)(apples$);

const applesInSlices$ = apples$.pipe(map(cutInSlices));

applesInSlices$.subscribe((appleInSlices) => {
  // do something
});
```

![w-1000 center](./assets/images/diagrams/apple_map.svg)

##==##

# Appliquer un traitement - trier et couper les pommes ?

```typescript
apples$.subscribe((apple) => {
  if (isRed(apple)) {
    const appleSlices = cutInSlices(apple);
  }
});
```

##==##

# Appliquer un traitement - Rx-style (naive)

```typescript
import { filter, map } from 'rxjs';

const redApples$ = apples$.pipe(filter(isRed));
const redApplesInSlices$ = redApples$.pipe(map(cutInSlices));

redApplesInSlices$.subscribe((oneRedAppleSlices) => {
  // do something
});
```

##==##

# Appliquer un traitement - Rx-style

```typescript
import { filter, map } from 'rxjs';

// const redApplesInSlices$ = map(cutInSlices)(filter(isRed)(apples$))

const redApplesInSlices$ = apples$.pipe(filter(isRed), map(cutInSlices));

redApplesInSlices$.subscribe((oneAppleSlices) => {
  // do something
});
```

Notes:

- plus intérressant parce qu'on peut plus facilement composer les différents traitements
- on est pas obligé de subscribe pour faire un traitement

##==##

# Appliquer un traitement - Rx-style

![w-1000 center](./assets/images/diagrams/apple_filter_and_map.svg)

##==##

<!-- .slide: class="quote-slide" -->

<blockquote>
<cite>
  Les opérations doivent être pures
</cite>
</blockquote>

Notes:

- il faut passer des fonctions pures aux opérateurs
- sinon on ne peut pas garantir que tout fonctionne comme attendu
- il y a des exceptions (comme tap)

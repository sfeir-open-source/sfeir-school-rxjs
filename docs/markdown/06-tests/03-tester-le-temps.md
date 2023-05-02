<!-- .slide: class="quote-slide" -->

<blockquote>
<cite>
  Comment tester le temps qui passe ?
</cite>
</blockquote>

Notes:

- la méthode simple permet de tester des cas de base
- mais nos Observable peuvent émettre plusieurs événements dans le temps
- c'est difficile de tester le temps comme ça
- on est aussi soumi au temps qui passe (ici le temps prendre 1s \* le nombre d'événement)

##==##

<!-- .slide: class="quote-slide" -->

<blockquote>
<cite>
An execution context and a data structure to order tasks and schedule their execution. Provides a notion of (potentially virtual) time, through the now() getter method.
</cite>
</blockquote>

Notes:

- Scheduler = brique qui va servir d'exécuteur de tâche et de gestionnaire de temps
- C'est une brique qu'on ne voit plus tellement hors des tests
- On peut simuler le temps qui passe avec un scheduler

##==##

# Tester le temps avec un TestScheduler

```typescript
import { TestScheduler } from 'rxjs/testing';

it('should emit an apple every second', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
});
```

Notes:
Décrire le TestScheduler
Insister sur son utilisation pour avoir des tests "instantanés"

##==##

# Cheat sheet marble syntax

- " " (espace) : espaces ignorés
- `-` : frame vide (= laisser passer 1ms)
- `|` : complete
- `#` : error
- `[a-z0-9]` : frame contenant un évènement
- `[0-9]+[ms|s|m]` : progression du temps en millisecondes, secondes ou minutes
- `(ab)`, `(a|)` : indique que plusieurs événements sont émit à la même frame

- `^` : démarrage de la subscription
- `!` : fin de la subscription (unsubscribe)

##==##

# Point d'attention : progression du temps

<blockquote>
<cite>
NOTE: You may have to subtract 1 millisecond from the time you want to progress because the alphanumeric marbles (representing an actual emitted value) advance time 1 virtual frame themselves already, after they emit. This can be counter-intuitive and frustrating, but for now it is indeed correct.
</cite>
</blockquote>

##==##

# Point marble

> --a--b--#

Notes:
Expliquer ces marbles
On frame 2 emit a, on frame 5 emit b, and on frame 8, error.

##==##

# Point d'attention : progression du temps - subtilité

<blockquote>
<cite>
"()" sync groupings: The position of the initial "(" determines the time at which its values are emitted. While it can be counter-intuitive at first, after all the values have synchronously emitted time will progress a number of frames equal to the number of ASCII characters in the group, including the parentheses. e.g. '(abc)' will emit the values of a, b, and c synchronously in the same frame and then advance virtual time by 5 frames, '(abc)'.length === 5.
</cite>
</blockquote>

[Lien vers la documentation](https://rxjs.dev/guide/testing/marble-testing#time-progression-syntax)

##==##

# Point marble

> --(abc)-|

Notes:
Expliquer ces marbles
On frame 2 emit a, b, and c, then on frame 8, complete.

##==##

# Point marble

> --a--b---|

Notes:
Interroger les participants
On frame 2 emit a, on frame 5 emit b, and on frame 8, complete.

##==##

# Point marble

> --^--!-

Notes:
Interroger les participants
on frame 2 a subscription happened, and on frame 5 was unsubscribed
Equivalent to NEVER, or an observable that never emits or errors or completes

##==##

# Point marble

> --(a|)

Notes:
Interroger les participants
on frame 2 emit a and complete

##==##

# Point marble

> (a)-|

Notes:
Interroger les participants
on frame 0 emit a and on frame 4, complete

##==##

# Point marble

> 1 4s (3|)

Notes:
Interroger les participants
on frame 0 emit 1, on frame 4001 emit 3 and complete

##==##

# Point marble

> --1--4s--(3|)

Notes:
Interroger les participants
on frame 2 emit 1, on frame 4007 emit 3 and complete

##==##

# Tester le temps avec un TestScheduler

```typescript
import { TestScheduler } from 'rxjs/testing';

it('should emit an apple every second', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  testScheduler.run(({ expectObservable }) => {
    const actual$ = HeartbeatService.getBeat();
    const expected = '1s h 1s h 1s h';
    expectObservable(actual$).toBe(expected);
  });
});
```

Notes:

- testScheduler nous fourni pas mal de helper
- ici on utilise que expectObservable
- est-ce que ça marche ?

##==##

# Tester le temps avec un TestScheduler

```typescript
import { TestScheduler } from 'rxjs/testing';

it('should emit an apple every second', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  testScheduler.run(({ expectObservable }) => {
    const actual$ = HeartbeatService.getBeat();
    const expected = '1s h 1s h 1s h';
    expectObservable(actual$).toBe(expected);
  });
});
```

<br />

### ❌ `HeartbeatService.getBeat()` est infini

### ❌ expected n'est pas exhaustif (comme actual$ est infini)

### ❌ on ne défini pas "h"

### ❌ souvez-vous: un "alphanumeric marbles" = 1ms

##==##

# Tester le temps avec un TestScheduler

```typescript
import { TestScheduler } from 'rxjs/testing';

it('should emit an apple every second', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  testScheduler.run(({ expectObservable }) => {
    const actual$ = HeartbeatService.getBeat();
    const actualSubscription = '^ 3500ms !';
    const expected = '1s h 999ms h 999ms h';
    expectObservable(actual$, actualSubscription).toBe(expected, { h: { type: 'heartbeat', status: 'OK' } });
  });
});
```

##==##

# Tester le temps avec un TestScheduler

```typescript [8]
import { TestScheduler } from 'rxjs/testing';

it('should emit an apple every second', () => {
  const testScheduler = new TestScheduler((actual, expected) => {
    expect(actual).toEqual(expected);
  });
  testScheduler.run(({ expectObservable }) => {
    const actual$ = HeartbeatService.getBeat().pipe(map(() => 'h'));
    const actualSubscription = '^ 3500ms !';
    const expected = '1s h 999ms h 999ms h';
    expectObservable(actual$, actualSubscription).toBe(expected);
  });
});
```

Notes:

- Si on ne sait pas ce qu'on va récupérer, on peut forcer la valeur émise
- Attention, on perd en pertinence du test, donc à faire quand on veut juste controller les timings

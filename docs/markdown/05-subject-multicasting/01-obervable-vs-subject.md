# Observable = monocast

```typescript
const obs$ = new Observable((subscriber) => {
  let i = 0;
  setInterval(() => subscriber.next(i++), 1_000);
});

obs$.subscribe((i) => console.log('ONE', i));
obs$.subscribe((i) => console.log('TWO', i));
```

```text
=> ONE 0
=> TWO 0
=> ONE 1
=> TWO 1
=> ONE 2
=> TWO 2
...
```

Notes:

- On peut souscrire plusieurs fois à un Observable
- Mais comme un Observable est lazy et monocast c'est comme si on créait 2 Observables différents
- il n'y a pas de partage

##==##

# Observable = monocast

```typescript
let i = 0;
const obs$ = new Observable((subscriber) => {
  setInterval(() => subscriber.next(i++), 1_000);
});

obs$.subscribe((i) => console.log('ONE', i));
obs$.subscribe((i) => console.log('TWO', i));
```

```text
=> ONE 0
=> TWO 1
=> ONE 2
=> TWO 3
=> ONE 4
=> TWO 5
...
```

Notes:
Si on sort la variable i de l'Observable ça ne fonctionne plus et on voit le côté monocast

##==##

<!-- .slide: class="quote-slide" -->

## Subject

<blockquote>
<cite>
  Un Subject est à la fois un Observable et un Observer. Par définition il est multicast.
</cite>
</blockquote>

##==##

# Subject = multicast

```typescript
let i = 0;
const obs$ = new Subject();

setInterval(() => subscriber.next(i++), 1_000);

obs$.subscribe((i) => console.log('ONE', i));
obs$.subscribe((i) => console.log('TWO', i));
```

```text
=> ONE 0
=> TWO 0
=> ONE 1
=> TWO 1
=> ONE 2
=> TWO 2
...
```

Notes:

- On retrouve de nouveau le fait d'avoir la même valeur entre nous 2 observer
- Cette fois-ci c'est parce qu'ils partagent le même événement
- Attention aux fuites mémoires : ici on va émettre des événements dans le Subject à l'infini, peu importe qu'on est un subscriber ou non

##==##

# Plusieurs types de Subject

- BehaviorSubject : nécessite une valeur initiale, porte une valeur qui est émise au moment du subscribe

##==##

# Plusieurs types de Subject

- BehaviorSubject : nécessite une valeur initiale, porte une valeur qui est émise au moment du subscribe
- ReplaySubject : va rejouer les N derniers événements au moment du subscribe

##==##

# Plusieurs types de Subject

- BehaviorSubject : nécessite une valeur initiale, porte une valeur qui est émise au moment du subscribe
- ReplaySubject : va rejouer les N derniers événements au moment du subscribe
- AsyncSubject : va émettre une seule fois quand il est complété

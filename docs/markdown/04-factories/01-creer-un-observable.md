# Créer un Observable

```typescript
import { Observable } from 'rxjs';

const obs$ = new Observable((subscriber) => {
  subscriber.next(1);
  subscriber.error(new Error('Cannot emit 6! 😢'));
  subscriber.complete();
});
```

<!-- .element: class="big-code block" -->

Notes:
Expliquer la logique de la création d'un Observable avec les 3 types d'events

##==##

# Créer un timer

```typescript [3|5|12|4|11|6-10|1-13]
import { Observable } from 'rxjs';

const interval$ = new Observable<number>((subscriber) => {
  let i = 0;
  const intervalId = setInterval(() => {
    if (subscriber.closed) {
      clearInterval(intervalId);
      subscriber.complete();
      return;
    }
    subscriber.next(i++);
  }, 1_000);
});
```

<!-- .element: class="big-code block" -->

Notes:
Expliquer le fonctionnement d'un "interval" minimaliste :

- pas de scheduler (juste évoquer l'existence des schedulers pour gérer le temps et typiquement pouvoir mocker le temps dans les tests)
- on wrap un setInterval standard JavaScript
- la fonction qu'on passe en paramètre de new Observable n'est exécuté que si on subscribe
- si on unsubscribe subscriber.closed passe à true, donc on coupe l'interval et on emet un complete

##==##

## Il existe des factories !

```typescript
import { interval } from 'rxjs';

const interval$ = interval(1_000);
```

<!-- .element: class="big-code block" -->

![w-1000 center](./assets/images/diagrams/factory_interval.svg)

# Observable

```typescript
import { Apple, AppleService } from './apple.service';
import { Observable } from 'rxjs';

const apples$: Observable<Apple> = AppleService.getApples();
```

<!-- .element: class="big-code" -->

Notes:

- on importe tout depuis rxjs (en RxJS 6 on avait plusieurs imports)
- convention du $ après les noms de variables
- on peut omettre de typer l'Observable plupart du temps
- AppleService.getApples() est une fonction qui nous donne un Observable
- apples$ ne contient aucune valeur (il faut souscrire pour ça) => les Observable sont lazy

##==##

# Observable

![w-1000 center](../../assets/images/diagrams/empty_stream.svg)

##==##

# Subscribe

```typescript
import { Apple, AppleService } from './apple.service';

const apples$: Observable<Apple> = AppleService.getApples();

apples$.subscribe(event => {
    console.log('EVENT', event);
});
```

<!-- .element: class="big-code" -->

```text
EVENT { color: 'red' }
EVENT { color: 'red' }
EVENT { color: 'green' }
EVENT { color: 'red' }
...
```

<!-- .element: class="big-code" -->

Notes:

- pour obtenir la valeur on appelle subscribe sur un Observable
- ça nous abonne sur le stream
- on peut agir à chaque nouvelle valeur
- si le stream ne se termine pas on continue d'écouter à l'infini

##==##

# Subscribe

![w-1000 center](../../assets/images/diagrams/infinite_apple.svg)

##==##

# Unsubscribe

```typescript
import { Apple, AppleService } from './apple.service';
import { Subscription } from 'rxjs';

const apples$: Observable<Apple> = AppleService.getApples();

const subscription: Subscription = apples$.subscribe(apple => {
    console.log('EVENT', apple);
    if (apple.color === 'green') {
        subscription.unsubscribe();
    }
});
```

<!-- .element: class="big-code" -->

```text
EVENT { color: 'red' }
EVENT { color: 'red' }
EVENT { color: 'green' }
```

<!-- .element: class="big-code" -->

Notes:

- pour couper l'abonnement (= arrêter d'écouter l'événement), on appelle unsubscribe
- il faut toujours unsubscribe sinon risque de fuite mémoire

##==## 

# Gérer les erreurs et la fin du stream

```typescript
const subscription: Subscription = apples$.subscribe({
    next(apple) {
        console.log('EVENT', apple);
        if (apple.color === 'green') {
            subscription.unsubscribe();
        }
    },
    error(error) {
        console.error('ERROR', error);
    },
    complete() {
        console.error('COMPLETE');
    }
});
```

<!-- .element: class="big-code" -->

```text
EVENT { color: 'red' }
EVENT { color: 'red' }
EVENT { color: 'green' }
COMPLETE
```

<!-- .element: class="big-code" -->

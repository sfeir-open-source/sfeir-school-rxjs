## forkJoin

```typescript
import { forkJoin } from 'rxjs';

const fromArray$ = from([1, 2, 3]);
const fromPromise$ = from(fetch('https://sfeir.com'));

const joinArray$ = forkJoin(fromArray$, fromPromise$);
joinArray$.subscribe(); // => [3, { data: '...'}]

const joinObject$ = forkJoin({ num: fromArray$, req: fromPromise$ });
joinObject$.subscribe(); // => { num: 3, req: { data: '...'} }
```

<!-- .element: class="big-code block" -->

![w-1000 center](./assets/images/diagrams/factory_forkjoin.svg)

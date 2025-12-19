## combineLatestWith

```typescript
import { combineLatestWith } from 'rxjs';

const interval$ = interval(1_000);
const fromPromise$ = from(fetch('https://sfeir.com'));

const combine$ = interval$.pipe(combineLatestWith(fromPromise$));
combine$.subscribe();
// => [1, { data: '...'}]
// => [2, { data: '...'}]
// => [3, { data: '...'}]
// ...
```

<!-- .element: class="big-code" -->

![](./assets/images/diagrams/factory_combinelatestwith.svg 'w-1000 center')

Notes:
Remplace combineLatest

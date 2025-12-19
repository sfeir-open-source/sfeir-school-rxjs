## from

```typescript
import { from } from 'rxjs';

const fromArray$ = from([1, 2, 3]);
const fromPromise$ = from(fetch('https://sfeir.com'));
const fromAnotherObservable$ = from(fromPromise$);
```

<!-- .element: class="big-code" -->

![](./assets/images/diagrams/factory_from.svg 'w-1000 center')

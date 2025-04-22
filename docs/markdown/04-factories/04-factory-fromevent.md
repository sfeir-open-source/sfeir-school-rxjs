## fromEvent

```typescript
import { fromEvent } from 'rxjs';

const button = document.querySelector('#my-button');
const buttonClickEvent$ = fromEvent(button, 'click');
```

<!-- .element: class="big-code" -->

![w-1000 center](./assets/images/diagrams/factory_fromevent.svg)

## fromEvent

```typescript
import { fromEvent } from 'rxjs';

const button = document.querySelector('#my-button');
const buttonClickEvent$ = fromEvent(button, 'click');
```

<!-- .element: class="big-code" -->

![](./assets/images/diagrams/factory_fromevent.svg 'w-1000 center')

<!-- .slide: class="transition-white sfeir-bg-red" -->

# Type manipulation and sides effects

##==##

# Todo: Typologie des chaines d'observable ?

##==##

<!-- .slide: class="transition-white sfeir-bg-blue" -->

# Hot vs Cold

Notes:
On parle souvent de 2 types d'observables

##==##

<!-- .slide: class="with-code consolas" -->

# Cold Observable

> We call an Observable "Cold" when the data are produce by the observable itself. For example, observables created using the `of`, `from`, `range`, `interval` and `timer` operators will be cold.

```javascript
let obs = Observable.create(observer => observer.next(1));
```

<!-- .element: class="big-code block" -->

Notes:
Un cold observable partagera tout le temps le même stream pour ses subscribers sauf si on le transforme en hot

##==##

<!-- .slide: class="with-code consolas" -->

# Hot Observable

> We call an Observable "Hot" when the data are produce outside of the observable itself. For example, observables created using the `fromEvent` operators will be hot.

```javascript
const obs$ = Observable.fromEvent(document, 'click') //
  .map(event => ({ clientX: event.clientX, clientY: event.clientY }));
```

<!-- .element: class="big-code block" -->

##==##

<!-- .slide: class="two-column-layout" -->

# Cold Observable could become Hot

##--##

### Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.from(['🍕', '🍪']) //
  .map(val => {
    return `Miam ${val}!`;
  });
```

<!-- .element: class="big-code"-->

##--##

### Become a Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.from(['🍕', '🍪']) //
  .map(val => {
    return `Miam ${val}!`;
  })
  .share();
```

<!-- .element: class="big-code"-->

##==##

<!-- .slide: class="two-column-layout" -->

# Hot Observable could become Cold

##--##

### Hot Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obs$ = Observable.fromEvent(
  document, //
  'click'
).map(e => ({ clientX: e.clientX }));

const sub1 = obs$.subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->

##--##

### Become a Cold Observable

<!-- .slide: class="with-code consolas"  -->

```javascript
const obsFactory = () =>
  Observable.fromEvent(
    document, //
    'click'
  ).map(e => ({ clientX: e.clientX }));

const sub1 = obsFactory().subscribe(val => {
  console.log('Sub1:', val);
});
```

<!-- .element: class="big-code"-->

##==##

# Sharable steam

## Share a stream to multiple Observers

<br>
The main idea is to share a stream amoung multiples observers but without replaying the totality of the stream. We want to deal with **hot observable**.

<br>
It could helps us to save memory, avoid multiples call to backend, ...

<br>
To share a stream, we also have to deal with **Subjects**

##==##

<!-- .slide: class="with-code consolas" -->

# Basic Multicasting

<br><br>

```javascript
const source = interval(1000).pipe(multicast(new Subject()));
```

<!-- .element: class="big-code block" -->

<br>
When creating a multicast Observable, we allow it to multiple subscription. But it's not enough. We don't know when start the the subscription and how manage the unsubscription flow.

##==##

<!-- .slide: class="with-code consolas" -->

# Connect to the stream

<br><br>

```javascript
const source = interval(1000).pipe(multicast(new Subject()));

const connectable = source.connect();
```

<!-- .element: class="big-code block" -->
<br>
with this code, the `connectable` is in charge of subscription and unsubscription. To disconnect us from the stream, we call `unsubscribe()` on `connectable``

##==##

<!-- .slide: class="with-code consolas" -->

# Refcount for easier management

<br><br>

```javascript
const source = interval(1000).pipe(multicast(new Subject()), refCount());
```

<!-- .element: class="big-code block" -->

<br>
`refCount` maintain an counter of subscriptions and automaticly call the connect for us. When the number of observer is to 0, it call the `unsubscribe` on the stream source.

##==##

# Variants operators

### Some operators are doing multiples actions

| Operator        | Action                                                           |
| --------------- | ---------------------------------------------------------------- |
| publish         | shortcut for `multicast(() => new Subject())`                    |
| publishBehavior | shortcut for `multicast(() => new BehaviorSubject())`            |
| publishReplay   | shortcut for `multicast(() => new ReplaySubject())`              |
| publishLast     | shortcut for `multicast(() => new AsyncSubject())`               |
| share           | shortcut for `multicast(() => new Subject()) + refCount()`       |
| shareReplay     | shortcut for `multicast(() => new ReplaySubject()) + refCount()` |

##==##

# Side effet of sharable

<br><br>

**Side Effect** represent operator that don't touch the stream but execute some external operations. For example, `tab` is a side effect operator.

##==##

<!-- .slide: class="two-column-layout" -->

# Side effet of sharable

##--##

## Cold observable

<!-- .slide: class="with-code consolas" -->

```javascript
cons log = (val) => console.log(val)
const example = timer(1000).pipe(
  tap(() => console.log('***SIDE EFFECT***')),
  mapTo('***RESULT***')
);
const subscribe1 = example.subscribe(log);
const subscribe2 = example.subscribe(log);
//***SIDE EFFECT***"
//"***RESULT***"
//"***SIDE EFFECT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height" -->

##--##

<!-- .slide: class="with-code consolas" -->

## Share stream

```javascript
//share observable among subscribers
const shared = example.pipe(share());
const subscribe3 = shared.subscribe(log);
const subscribe4 = shared.subscribe(log);
//"***SIDE EFFECT***"
//"***RESULT***"
//"***RESULT***"
```

<!-- .element: class="big-code no-max-height" -->

##==##

<!-- .slide: class="exercice sfeir-bg-pink" -->

# TODO Exercice Title

## Exercice

<br>
1. First step
2. Second step
3. Third step
<br>
Additionnal Advice
### Step: push-1

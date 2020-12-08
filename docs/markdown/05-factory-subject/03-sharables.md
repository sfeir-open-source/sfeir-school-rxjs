<!-- .slide: class="transition bg-blue" -->

# Sharable stream

##==##

# Sharable steam

## Share a stream to multiple Observers

<br>

The main idea is to share a stream amoung multiples observers but without replaying the totality of the stream. We want to deal with **concatAll()**

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

with this code, the `connectable` is in charge of subscription and unsubscription. To disconnect us from the stream, we call `unsubscribe()` on `connectable`

##==##

<!-- .slide: class="with-code consolas" -->

# Refcount for easier management

<br><br>

```javascript
const source = interval(1000).pipe(
  multicast(new Subject()),
  refCount()
);
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

<!-- .slide: class="with-code consolas" -->

# TestScheduler : Time management (API)

```javascript
testScheduler.run((helpers) => {
  const {
    cold,
    hot,
    expectObservable,
    expectSubscriptions,
    flush,
  } = helpers;
});
```

<!-- .element: class="big-code block" -->

##==##

# TestScheduler

- `hot(marbleDiagram: string, values?: object, error?: any)` - creates a "hot" observable (like a subject) that will behave as though it's already "running" when the test begins.
- `cold(marbleDiagram: string, values?: object, error?: any)` - creates a "cold" observable whose subscription starts when the test begins.
- `expectObservable(actual: Observable<T>, subscriptionMarbles?: string).toBe(marbleDiagram: string, values?: object, error?: any)` - schedules an assertion for when the TestScheduler flushes.
- `expectSubscriptions(actualSubscriptionLogs: SubscriptionLog[]).toBe(subscriptionMarbles: string)` - like expectObservable schedules an assertion for when the testScheduler flushes. Both cold() and hot() return an observable with a property subscriptions of type SubscriptionLog[].
- `flush()` - immediately starts virtual time. Not often used since run() will automatically flush for you when your callback returns.

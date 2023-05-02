# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', () => {
    expect(OrderService.getOrder()).toEqual({ id: '1', items: [] });
  });
});
```

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', () => {
    expect(OrderService.getOrder()).toEqual({ id: '1', items: [] });
  });
});
```

<br />

### ❌ `getOrder` nous donne un `Observable<Order>` par un `Order`

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', () => {
    OrderService.getOrder().subscribe((order) => {
      expect(order).toEqual({ id: '1', items: [] });
    });
  });
});
```

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', () => {
    OrderService.getOrder().subscribe((order) => {
      expect(order).toEqual({ id: '1', items: [] });
    });
  });
});
```

<br />

### ❌ on aura une valeur en asynchrone, donc ça ne fonctionnera pas

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', (done) => {
    OrderService.getOrder().subscribe((order) => {
      expect(order).toEqual({ id: '1', items: [] });
      done();
    });
  });
});
```

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', (done) => {
    OrderService.getOrder().subscribe((order) => {
      expect(order).toEqual({ id: '1', items: [] });
      done();
    });
  });
});
```

> Jest did not exit one second after the test run has completed.
> This usually means that there are asynchronous operations that weren't stopped in your tests. Consider running Jest with `--detectOpenHandles` to troubleshoot this issue.

<br />

### ❌ on Observable ne se termine pas tout seul, il faut unsubscribe

Notes:

- Dans l'idée pour certains cas on sait qu'on peut se passer d'unsubscribe mais c'est une bonne habitude

##==##

# Test simple

```typescript
describe('OrderService', () => {
  it('should return an order', (done) => {
    const subscription = OrderService.getOrder().subscribe((order) => {
      expect(order).toEqual({ id: '1', items: [] });
      done();
      subscription.unsubscribe();
    });
  });
});
```

<br />

### ✅

Notes:

- Pour des Observable qui renvoie une seule valeur, cette manière de faire est la plus simple
- c'est la manière dont on testerait une Promise ou un callback

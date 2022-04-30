# Exercise 2

Make the test pass.

Think about the contract of interfaces -> you could return a single object that matches with the contract of interface.

## Helper for opening file

```javascript
const fileStream = openInputFile(filename);
const rl = readline.createInterface(fileStream);

rl.on('line', line => {
  // TODO Something
});

rl.on('close', () => {
  // TODO something
});
```

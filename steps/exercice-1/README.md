# Create a chat (step 1)

## Exercise 2

1. Create an Observable that listens to the event 'new-user' sent by the server
2. Susbscribe to the previous Observable and set the username accordingly. Deal with the error case.
3. Do the same for the events 'refresh-users' and 'new-message' that respectively update the online users and update the displayed messages

### Don't forget to unsubscribe ;)

## First step

### Log in

1. Create the `username$` observable using the constructor `new Observable(...)` that listens to the event `new-user` sent by the server.

2. In the function `susbscribeToUsername`, subscribe to the observable `username$` and set the username accordingly. The server send an error if the username is already taken, deal with the error case !

#### Tips

- Use `socket.on('event-name')` to listen to an event sent by the server
- The server's response looks like this : `{ ok: boolean, username: string }` with `ok` being false when a username is already taken.
- Use the observer's error callback to deal with the error case
- To deal with error the subcription, give an object with methods (next, error, complete)

```javascript
myObservable$.subscribe({
  next(everythingIsGood)=>{},
  error(aBadError) => {},
  complete() =>{}
})
// Or like this
myObservable$.subscribe(
  (everythingIsGood)=>{}, // CallBack Next
  (aBadError) => {}, // CallBack Error
  () =>{} // CallBack Complete
})
```

### Display online users

1. Create the `users$` observable using the constructor `new Observable(...)` that listens to the event `refresh-users` sent by the server.

2. In the function `subscribeToUsers`, subscribe to the observable `users$` and set the user list accordingly.

#### Tips

- The server's reponse looks like this : `["user1", "user2"]`

### Display messages

1. Create the `messages$` observable using the constructor `new Observable(...)` that listens to the event `new-message` sent by the server.

2. In the function `subscribeToMessages`, subscribe to the observable `messages$` and add the new message to the message list.

#### Tips

- The server's reponse looks like this : `{ author: "string", content: "string", time: "string" }`

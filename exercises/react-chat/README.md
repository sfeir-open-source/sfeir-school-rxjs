# React Chat

The purpose of this exercise is to build a functional chat application with React and RxJS.

## Start the application

### Start the application with a local server
To start the application with a local server, run `npm run localstart`  
Keep in mind you will only be able to chat with yourself !

### Start the application and join an existing server
Replace the `SOCKET` url in `constants.js` with the url of the server and run `npm start`

### Start a public server
Run `npm run serve` and `npm run ngrok` and give the generated URL to the participants.

## First step

### Log in 
1. Create the `username$` observable using the constructor `new Observable(...)` that listens to the event `new-user` sent by the server.

2. In the function `susbscribeToUsername`, subscribe to the observable `username$` and set the username accordingly. The server send an error if the username is already taken, deal with the error case !

#### Tips
* Use `socket.on('event-name')` to listen to an event sent by the server
* The server's response looks like this : `{ ok: boolean, username: string }` with `ok` being false when a username is already taken.
* Use the observer's error callback to deal with the error case

### Display online users
1. Create the `users$` observable using the constructor `new Observable(...)` that listens to the event `refresh-users` sent by the server.

2. In the function `subscribeToUsers`, subscribe to the observable `users$` and set the user list accordingly.

#### Tips
* The server's reponse looks like this : `["user1", "user2"]`

### Display messages
1. Create the `messages$` observable using the constructor `new Observable(...)` that listens to the event `new-message` sent by the server.

2. In the function `subscribeToMessages`, subscribe to the observable `messages$` and add the new message to the message list.

#### Tips
* The server's reponse looks like this : `{ author: "string", content: "string", time: "string" }`

## Second step
We now want to handle the submission of the username and the message by a keypress on `Enter`.

1. In `App.js` and `Username.jsx` : delete the `handleSubmit` function and the `<form>` tag.
2. Use the `fromEvent` operator to create observables that listen to the `keyup` event and if the pressed key is `Enter`, send the data.

#### Tips
* The keycode for `Enter` is 13

## Third step
Use the pipe method and the correct operators to recreate the behaviour coded in the previous step.

## Fourth step
Let's create an anti-spamming feature so that users can not spam all the participants !  
Use the correct operators to set up the following constraints :
- A user cannot send an empty message
- Each message must be different from the previous one sent by the user
- A user cannot send multiple messages in less than 1 second

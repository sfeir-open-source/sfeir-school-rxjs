# Create a chat (step 2)

## Exercice 3

We now want to handle the submission of the username and the message by a keypress on `Enter`.

1. In `observableLogic.js` create an Observable that use the `fromEvent` operator to create observables that listen to the `keyup` event and if the pressed key is `Enter`, send the data to websocket.

### The keycode for `Enter` is 13

#### Tips

- The keycode for `Enter` is 13

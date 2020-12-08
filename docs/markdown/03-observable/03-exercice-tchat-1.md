<!-- .slide: class="exercice" -->

# Create a chat (step 2)

## Exercice 3

<br>

We now want to handle the submission of the username and the message by a keypress on `Enter`.

1. In `App.js` and `Username.jsx` : delete the `handleSubmit` function and the `<form>` tag.
2. Use the `fromEvent` operator to create observables that listen to the `keyup` event and if the pressed key is `Enter`, send the data.

<br>
<br>

### The keycode for `Enter` is 13

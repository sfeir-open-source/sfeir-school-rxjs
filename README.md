# RxJS

A [SFEIR School](https://www.sfeir.com/formation/school/)

![logo](./docs/assets/images/rxjs-school.png)

# Slides

You can view the slides [here](https://sfeir-open-source.github.io/sfeir-school-rxjs/).

# Exercises (Not the chat)

To run exercises, you have to go to "exercises" directory, run `npm install` to init the dependencies.

⚠️ You have to use Node 11+ to execute these exercises because some functions used in JavaScript require node 11.

## Run exercises (Not the chat)

To run an exercise, you can first run `npm run tsc XXX/FILE.ts` and after `node XXX/FILE.js` or run the script corresponding to exercise:

- `npm run 00`
- `npm run 0-intro`
- `npm run 1-sequences`
- `npm run 2-Observable`
- `npm run 3-RxObservable`

## Solutions

Each directory has a solution.ts file that contains the solution to the exercise. You can test it by running `npx jest`

# Exercises (The chat)

To run the chat exercises, simply run `npm install` at the root of repository to init the dependencies.

A websocket server will be run on port 3000, and the app is available on port 8080.

`npm start` runs the final solution.

## Run exercises (The chat)

To run a step of the exercise, run `npm start --step=XXX`

### Steps

Each exercise has two directories:

- a clean directory to get you started (ex: exercise-3)
- a solution directory (ex: exercise-3-solution)

to go to a step, run the npm script with --step=XX :

- `npm start --step=exercise-3` for an exercise
- `npm start --step=exercise-3-solution` for the solution

## For Trainers :

To play with RxJS in devtools for live coding, you can use this snippet :
https://gist.github.com/jefBinomed/ddafcbb1932c865690c792b3fd3f5286

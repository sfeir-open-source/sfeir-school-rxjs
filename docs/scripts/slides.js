function schoolSlides() {
  return [
    '00-school/00-TITLE.md',
    '00-school/speaker-jef.md',
    '00-school/speaker-wolf.md',
    '00-school/speaker-anthony.md'
  ];
}

function arraySequencesSlides() {
  const directory = '01-arrays-sequences';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-intro.md`,
    `${directory}/02-exercise-intro.md`,
    `${directory}/03-array-vs-generator.md`,
    `${directory}/04-exercise-sequence.md`
  ];
}

function rxjsObservablesSlides() {
  const directory = '02-rxjs-observables';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-observable-pattern.md`,
    `${directory}/02-rxjs-observables.md`
  ];
}

function observableSlides() {
  const directory = '03-observable';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-intro.md`,
    `${directory}/02-subscription.md`,
    `${directory}/03-exercise-chat-1.md`,
    `${directory}/04-hot-cold.md`,
    `${directory}/05-exercise-chat-2.md`
  ];
}

function operatorsSlides() {
  const directory = '04-operators';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-intro.md`,
    `${directory}/02-exercise-chat-3.md`,
    `${directory}/03-rxjs-operators.md`,
    `${directory}/04-main-operators.md`,
    `${directory}/05-exercise-chat-4.md`
  ];
}

function subjectSlides() {
  const directory = '05-factory-subject';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-intro.md`,
    `${directory}/02-subjects.md`,
    `${directory}/03-shareables.md`,
    `${directory}/04-side-effects.md`,
    `${directory}/05-time.md`
  ];
}
function testsSlides() {
  const directory = '06-tests';
  return [
    `${directory}/00-title.md`,
    `${directory}/01-marbles.md`,
    `${directory}/02-scheduler.md`
  ];
}

function formation() {
  return [
    //
    ...schoolSlides(),
    ...arraySequencesSlides(),
    ...rxjsObservablesSlides(),
    ...observableSlides(),
    ...operatorsSlides(),
    ...subjectSlides(),
    ...testsSlides()
  ].map(slidePath => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}

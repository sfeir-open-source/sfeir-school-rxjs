function schoolSlides() {
  return [
    '00-school/00-TITLE.md',
    '00-school/speaker-jef.md',
    '00-school/speaker-wolf.md',
  ];
}

function arraySequencesSlides() {
  return ['01-arrays-sequences/arrays-sequences.md'];
}

function rxjsObservablesSlides() {
  return ['02-rxjs-observables/rxjs-observables.md'];
}

function observableSlides() {
  return ['03-observable/observable.md'];
}

function operatorsSlides() {
  return ['04-operators/operators.md'];
}

function subjectSlides() {
  return ['05-factory-subject/subject.md'];
}
function testsSlides() {
  return ['06-tests/tests.md'];
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
    ...testsSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

export function usedSlides() {
  return formation();
}

function schoolSlides() {
  return ['00-school/00-TITLE.md', '00-school/speaker-jef.md', '00-school/speaker-wolf.md'];
}

function arraySequencesSlides() {
  return ['arrays-sequences/arrays-sequences.md'];
}

function rxjsObservablesSlides() {
  return ['rxjs-observables/rxjs-observables.md'];
}

function observableSlides() {
  return ['observable/observable.md'];
}

function operatorsSlides() {
  return ['operators/operators.md'];
}

function subjectSlides() {
  return ['factory-subject/subject.md'];
} 
function testsSlides() {
  return ['tests/tests.md'];
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
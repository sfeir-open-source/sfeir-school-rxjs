import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function schoolSlides() {
  return [
    '00-school/00-TITLE.md', //
    '00-school/speaker-garreau-jf.md', //
    '00-school/speaker-pena-a.md', //
  ];
}

function introSlides() {
  return ['01-intro/00-TITLE.md'];
}

function patternObservableSlides() {
  return ['02-pattern-observable/00-TITLE.md'];
}

function operateursSlides() {
  return ['03-operateurs/00-TITLE.md'];
}

function subjectMulticastingSlides() {
  return ['04-subject-multicasting/00-TITLE.md'];
}

function factoriesSlides() {
  return ['05-factories/00-TITLE.md'];
}

function testsSlides() {
  return ['06-tests/00-TITLE.md'];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...patternObservableSlides(),
    ...operateursSlides(),
    ...subjectMulticastingSlides(),
    ...factoriesSlides(),
    ...testsSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);

import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function schoolSlides() {
  return [
    '00-school/00-TITLE.md', //
    '00-school/01-speaker-garreau-jf.md', //
    '00-school/01-speaker-molza-j.md', //
    '00-school/01-speaker-pena-a.md', //
    '00-school/02-tour-de-table.md', //
  ];
}

function introSlides() {
  return [
    '01-intro/00-transition.md', //
    '01-intro/01-recette-tarte-aux-pommes.md',
    '01-intro/02-a-quoi-sert-rxjs.md', //
    '01-intro/03-reactivex.md', //
    '01-intro/04-rappel-typescript.md', //
    '01-intro/05-rappel-functions.md', //
    '01-intro/06-installation.md', //
  ];
}

function patternObservableSlides() {
  return [
    '02-pattern-observable/00-transition.md', //
    '02-pattern-observable/01-patterns.md', //
    '02-pattern-observable/02-observables.md', //
    '02-pattern-observable/03-lab.md', //
  ];
}

function operateursSlides() {
  return [
    '03-operateurs/00-transition.md', //
    '03-operateurs/01-pipe.md', //
    '03-operateurs/02-transition.md', //
    '03-operateurs/03-operator-map.md', //
    '03-operateurs/04-operator-filter.md', //
    '03-operateurs/05-operator-mergemap.md', //
    '03-operateurs/06-operator-switchmap.md', //
    '03-operateurs/07-operator-reduce.md', //
    '03-operateurs/08-operator-scan.md', //
    '03-operateurs/09-operator-debouncetime.md', //
    '03-operateurs/10-operator-debounce.md', //
    '03-operateurs/11-operator-takeuntil.md', //
    '03-operateurs/12-operator-takewhile.md', //
    '03-operateurs/13-operator-tap.md', //
    '03-operateurs/14-transition.md', //
    '03-operateurs/15-outils.md', //
    '03-operateurs/16-lab.md', //
    '03-operateurs/17-impossible-en-stream.md', //
  ];
}

function factoriesSlides() {
  return [
    '04-factories/00-transition.md', //
  ];
}

function subjectMulticastingSlides() {
  return [
    '05-subject-multicasting/00-transition.md', //
  ];
}

function testsSlides() {
  return [
    '06-tests/00-transition.md', //
  ];
}

function erreursAEviterSlides() {
  return [
    '07-erreur-a-eviter/00-transition.md', //
    '07-erreur-a-eviter/01-subscribe-in-subscribe.md', //
    '07-erreur-a-eviter/01-function-binding.md', //
  ];
}

function conclusionSlides() {
  return [
    '08-conclusion/00-transition.md', //
  ];
}

function formation() {
  return [
    ...schoolSlides(),
    ...introSlides(),
    ...patternObservableSlides(),
    ...operateursSlides(),
    ...factoriesSlides(),
    ...subjectMulticastingSlides(),
    ...testsSlides(),
    ...erreursAEviterSlides(),
    ...conclusionSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);

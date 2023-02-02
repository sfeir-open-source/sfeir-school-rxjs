import { SfeirThemeInitializer } from '../web_modules/sfeir-school-theme/sfeir-school-theme.mjs';

// One method per module
function schoolSlides() {
  return [
    '00-school/00-TITLE.md',
    '00-school/01-speaker-garreau-jf.md',
    '00-school/01-speaker-molza-j.md',
    '00-school/01-speaker-parsy-v.md',
    '00-school/01-speaker-pena-a.md',
    '00-school/02-tour-de-table.md',
  ];
}

function introSlides() {
  return [
    '01-intro/00-transition.md',
    '01-intro/01-recette-tarte-aux-pommes.md',
    '01-intro/02-a-quoi-sert-rxjs.md',
    '01-intro/03-reactivex.md',
    '01-intro/04-rappel-typescript.md',
    '01-intro/05-rappel-functions.md',
    '01-intro/06-installation.md',
  ];
}

function patternObservableSlides() {
  return [
    '02-pattern-observable/00-transition.md',
    '02-pattern-observable/01-patterns.md',
    '02-pattern-observable/02-observables.md',
    '02-pattern-observable/03-lab.md',
    '02-pattern-observable/99-pause.md',
  ];
}

function operateursSlides() {
  return [
    '03-operateurs/00-transition.md',
    '03-operateurs/01-pipe.md',
    '03-operateurs/02-transition.md',
    '03-operateurs/03-operator-map.md',
    '03-operateurs/04-operator-filter.md',
    '03-operateurs/05-operator-mergemap.md',
    '03-operateurs/06-operator-switchmap.md',
    '03-operateurs/07-operator-reduce.md',
    '03-operateurs/08-operator-scan.md',
    '03-operateurs/09-operator-debouncetime.md',
    '03-operateurs/10-operator-debounce.md',
    '03-operateurs/11-operator-takeuntil.md',
    '03-operateurs/12-operator-takewhile.md',
    '03-operateurs/13-operator-tap.md',
    '03-operateurs/14-operator-catcherror.md',
    '03-operateurs/15-operator-retry.md',
    '03-operateurs/16-transition.md',
    '03-operateurs/17-outils.md',
    '03-operateurs/18-impossible-en-stream.md',
    '03-operateurs/19-lab.md',
    '03-operateurs/99-pause.md',
  ];
}

function factoriesSlides() {
  return [
    '04-factories/00-transition.md',
    '04-factories/01-creer-un-observable.md',
    '04-factories/02-factory-of.md',
    '04-factories/03-factory-from.md',
    '04-factories/04-factory-fromevent.md',
    '04-factories/05-factory-merge.md',
    '04-factories/06-factory-forkjoin.md',
    '04-factories/07-factory-combinelatestwith.md',
    '04-factories/08-factory-throwerror.md',
    '04-factories/09-lab.md',
  ];
}

function subjectMulticastingSlides() {
  return [
    '05-subject-multicasting/00-transition.md',
    '05-subject-multicasting/01-obervable-vs-subject.md',
    '05-subject-multicasting/02-rendre-multicast-un-observable.md',
    '05-subject-multicasting/03-custom-operator.md',
    '05-subject-multicasting/99-lab.md',
    '05-subject-multicasting/99-pause.md',
  ];
}

function testsSlides() {
  return [
    '06-tests/00-transition.md',
    '06-tests/01-test-simple.md',
    '06-tests/02-lab.md',
    '06-tests/03-tester-le-temps.md',
    '06-tests/04-lab.md',
  ];
}

function erreursAEviterSlides() {
  return [
    '07-erreur-a-eviter/00-transition.md',
    '07-erreur-a-eviter/01-subscribe-in-subscribe.md',
    '07-erreur-a-eviter/01-function-binding.md',
  ];
}

function conclusionSlides() {
  return [
    '08-conclusion/00-transition.md', //
    '08-conclusion/01-feedback.md', //
    '08-conclusion/02-feedback-qr-code.md', // think to edit QR Code
  ];
}

function bonusSlides() {
  return [
    '09-lab-bonus/99-lab-bonus-1.md', //
    '09-lab-bonus/99-lab-bonus-2.md', //
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
    ...bonusSlides(),
  ].map((slidePath) => {
    return { path: slidePath };
  });
}

SfeirThemeInitializer.init(formation);

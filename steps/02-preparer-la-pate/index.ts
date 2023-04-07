import { AppleService, BakingService, PiePastryService } from '../common';

const APPLE_PIES_ORDERED_COUNT = 11;

AppleService.getApples().subscribe((apple) => {
  console.log(apple);
});

// TODO:
//  1. Retenter de s'abonner au stream de boites de pâtes si une erreur est émise
//  2. Transformer le stream de boites de pâtes en stream de pâtes (ouvrir les boites)
//  3. Prendre le nombre de pâtes à tarte défini dans APPLE_PIES_ORDERED_COUNT
PiePastryService.getPiePastries().subscribe({
  next(boxOfPiePastries) {
    console.log(boxOfPiePastries);
  },
  error(error) {
    console.error(error);
  },
});

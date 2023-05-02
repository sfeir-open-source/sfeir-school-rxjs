import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// ---------------------------------------
// Solution
// Correction du post LinkedIn de Jonathan
// ---------------------------------------
//
// ['Anthony PENA', 'Jonathan MOLZA'] au lieu de
// ['Anthony PENA, Jonathan MOLZA']
//
// ---------------------------------------

const freeTraining = of({
  course: 'RxJS',
  place: 'Sfeir Nantes',
  date: '26/01/2023',
  trainers: ['Anthony PENA, Jonathan MOLZA'],
});

freeTraining
  .pipe(
    map((sfeirSchool) => ({
      ...sfeirSchool,
      trainers: sfeirSchool.trainers[0].split(', '),
    })),
  )
  .subscribe(console.log);

import { halt, answer } from './code';

halt.subscribe(v => console.log('after halt:', v));
answer.subscribe(v => console.log('result:', v));

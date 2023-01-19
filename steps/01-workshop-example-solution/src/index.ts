import { AppleService } from '../../common/src';

AppleService.getApples$().subscribe((value) => console.log(value));

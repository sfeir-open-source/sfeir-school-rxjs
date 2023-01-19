export interface Apple {
  _type: 'Apple';
  color: 'red' | 'green';
  rot: boolean;
}

export interface PiePastry {
  _type: 'PiePastry';
}

export interface Box {
  _type: 'Box';
  load: PiePastry[];
}

export interface Compote {
  _type: 'Compote';
}

export interface AppleSlice {
  _type: 'AppleSlice';
}

export interface ApplePie {
  _type: 'ApplePie';
}

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
  content: PiePastry[];
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

export interface PiePlate {
  _type: 'PiePlate';
  pastry?: PiePastry;
}

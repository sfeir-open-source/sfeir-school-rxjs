import { lazy, map } from './code';

describe('producing values', () => {
  test('lazy function', () => {
    const lazyAnswer = lazy(42);
    expect(typeof lazyAnswer).toBe('function');
    expect(lazyAnswer()).toBe(42);
  });

  test('map', () => {
    const lazySource = lazy(21);
    const lazyAnswer = map(lazySource, x => x * 2);
    expect(lazyAnswer()).toBe(42);
  });
});

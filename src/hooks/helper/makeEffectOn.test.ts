import { act, renderHook } from '@testing-library/react-hooks';

import makeEffectOn from './makeEffectOn.hook';

type TFn = (arg1: string, arg2: Record<string, unknown>) => void;

let listeners: TFn[] = [];
const on = (fn: TFn): (() => void) => {
  listeners.push(fn);
  return () => (listeners = listeners.filter((listener) => listener !== fn));
};
const event: TFn = (arg1, arg2) => {
  listeners.forEach((listener) => listener(arg1, arg2));
};

describe('helper.hook makeEffectOn:', () => {
  // @ts-ignore
  const useEffectOn = makeEffectOn<Parameters<TFn>>(on);

  beforeEach(() => {
    listeners = [];
  });

  test('should be renderer', () => {
    let renderCounter = 0;
    let args: ThisParameterType<TFn> = [];
    const { rerender, unmount } = renderHook(() => {
      useEffectOn((arg1, arg2) => {
        renderCounter = renderCounter + 1;
        args = [arg1, arg2];
      });
    });
    rerender();
    expect(renderCounter).toEqual(0);

    act(() => event('1', { test: '1' }));
    expect(renderCounter).toEqual(1);
    expect(args).toEqual(['1', { test: '1' }]);

    unmount();
  });
});

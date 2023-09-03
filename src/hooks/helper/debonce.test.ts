import { renderHook, act } from '@testing-library/react-hooks';

import { useDebounce } from '.';

//   await new Promise<boolean>((resolve) => {
//     setTimeout(() => {
//       resolve(true);
//     }, 3000);
//   });

describe('helper.hook function:', () => {
  const utils = {
    timeout(ms: number): Promise<boolean> {
      return new Promise<boolean>((resolve) => setTimeout(() => resolve(true), ms));
    },
  };
  jest.useFakeTimers();

  test('useDebounce: should work right away', () => {
    let counter = 0;
    const { result } = renderHook(() => useDebounce());
    act(() => {
      result.current(() => (counter = 1), 5000);
    });
    expect(counter).toEqual(1);
  });

  // test('useDebounce: must wait', async () => {
  //   let counter = 0;
  //   const cb = jest.fn();
  //   const { result } = renderHook(() => useDebounce());
  //   act(result.current(() => (counter = 1), 5000));
  //   act(result.current(() => (counter = 2), 5000));
  //
  //   jest.advanceTimersByTime(50);
  //   expect(cb).toBeCalledTimes(0);
  //   jest.advanceTimersByTime(100);
  //   expect(cb).toBeCalledTimes(1);
  //
  //   expect(counter).toEqual(1);
  //   console.log('1');
  //   const timeoutSpy = jest.spyOn(utils, 'timeout').mockResolvedValueOnce();
  //   await utils.timeout(5500);
  //   console.log('2');
  //   timeoutSpy.mockRestore();
  //   console.log('3');
  //   expect(counter).toEqual(2);
  // });
  //
  // test('useDebounce: must ignore', async () => {
  //   let counter = 0;
  //   const { result } = renderHook(() => useDebounce());
  //   act(() => {
  //     result.current(() => (counter = 1), 5000);
  //     result.current(() => (counter = 2), 5000);
  //     result.current(() => (counter = 3), 5000);
  //     result.current(() => (counter = 4), 5000);
  //     result.current(() => (counter = 5), 5000);
  //   });
  //   expect(counter).toEqual(1);
  //   const timeoutSpy = jest.spyOn(utils, 'timeout').mockResolvedValueOnce();
  //   await utils.timeout(5500);
  //   timeoutSpy.mockRestore();
  //   expect(counter).toEqual(3);
  // });
});

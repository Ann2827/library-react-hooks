import { useTimer } from '.';
import { act, renderHook } from '@testing-library/react-hooks';

describe('timer.hook function:', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useTimer());
    result.current.reset();
  });

  test('useTimer: should be start', () => {
    const name = 'myTimer';
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setTimer(5000, { name });
    });
    expect(result.current.getTime(name)).toBeGreaterThan(0);
  });

  test('useTimer: should be canceled', () => {
    const name = 'myTimer';
    const { result } = renderHook(() => useTimer());
    act(() => {
      result.current.setTimer(5000, { name });
      result.current.cancelTimer(name);
    });
    expect(result.current.getTime(name)).toEqual(0);
  });
});

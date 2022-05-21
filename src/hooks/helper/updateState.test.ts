import { useUpdateState } from '.';
import { act, renderHook } from '@testing-library/react-hooks';

describe('helper.hook function:', () => {
  test('useUpdateState: should be initialed', () => {
    const { result } = renderHook(() => useUpdateState<number>(5));
    expect(result.current[0]).toEqual(5);
  });

  test('useUpdateState: should be set', () => {
    const { result } = renderHook(() => useUpdateState<number>(5));
    act(() => result.current[1](6));
    expect(result.current[0]).toEqual(6);
  });

  test('useUpdateState: should have prevState', () => {
    const { result } = renderHook(() => useUpdateState<number>(5));
    act(() =>
      result.current[1]((prev) => {
        return prev + 1;
      }),
    );
    expect(result.current[0]).toEqual(6);
  });

  test('useUpdateState: should be updated', () => {
    const { result, rerender } = renderHook((counter) => useUpdateState<number>(counter), { initialProps: 5 });
    rerender(6);
    expect(result.current[0]).toEqual(6);
  });
});

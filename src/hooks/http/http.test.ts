import { useHttp } from '.';
import { renderHook } from '@testing-library/react-hooks';

describe('http.hook function:', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useHttp());
    result.current._reset();
  });

  test('fnName: should ...', () => {
    const { result } = renderHook(() => useHttp());
    expect(result.current.error).toEqual({});
  });
});

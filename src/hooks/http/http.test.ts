import { renderHook } from '@testing-library/react-hooks';

import { useHttp } from '.';

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

import { useImagePreloader } from '.';
import { renderHook } from '@testing-library/react-hooks';

// TODO: add more tests

describe('imagePreloader.hook function:', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useImagePreloader());
    result.current.reset();
  });

  test('fnName: should ...', () => {
    const { result } = renderHook(() => useImagePreloader());
    expect(result.current.images).toEqual({});
  });
});

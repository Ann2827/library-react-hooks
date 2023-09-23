import { renderHook } from '@testing-library/react-hooks';

import { useOnceEffect } from '.';

// TODO: add more tests

describe('helper.hook function:', () => {
  test('useOnceEffect: should be renderer', () => {
    let renderCounter = 0;
    const { rerender, unmount } = renderHook(() => {
      useOnceEffect(() => {
        renderCounter = renderCounter + 1;
      });
    });
    rerender();
    unmount();
    expect(renderCounter).toEqual(1);
  });
});

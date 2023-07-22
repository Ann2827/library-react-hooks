import { useUnmount } from '.';
import { renderHook } from '@testing-library/react-hooks';

describe('helper.hook function:', () => {
  test('useUnmount: should be renderer', () => {
    let renderCounter = 0;
    const { rerender, unmount } = renderHook(() => {
      // console.log('renderHook');
      useUnmount(() => {
        // console.log('useUnmount');
        renderCounter = renderCounter + 1;
      });
    });
    rerender();
    unmount();
    expect(renderCounter).toEqual(1);
  });
});

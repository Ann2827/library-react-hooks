import { renderHook } from '@testing-library/react-hooks';

import { Defer } from '.';

describe('helper.hook Defer:', () => {
  test('useEffect: should be rendered', () => {
    let renderCounter = 0;
    const { rerender, unmount } = renderHook(() => {
      Defer.useEffect(() => {
        renderCounter = renderCounter + 1;
      });
    });
    rerender();
    rerender();
    expect(renderCounter).toEqual(3);
    unmount();
  });

  test('useEffect: should be rendered once', () => {
    let renderCounter = 0;
    const { rerender, unmount } = renderHook(() => {
      Defer.useEffect(() => {
        renderCounter = renderCounter + 1;
      }, []);
    });
    rerender();
    rerender();
    expect(renderCounter).toEqual(1);
    unmount();
  });

  test('useEffect: should be deferrer rendered', () => {
    let renderCounter = 0;
    const { rerender, unmount } = renderHook((init = false) => {
      Defer.useEffect(
        () => {
          renderCounter = renderCounter + 1;
        },
        [],
        init as boolean,
      );
    });
    rerender(false);
    rerender(true);
    expect(renderCounter).toEqual(1);
    unmount();
  });

  test('useState: should be deferrer', () => {
    let initialState = { counter: 1 };
    const { rerender, unmount, result } = renderHook((init = false) => Defer.useState(initialState, init as boolean));
    rerender(false);
    expect(result.current[0]).toEqual({ counter: 1 });
    initialState = { counter: 2 };
    rerender(true);
    expect(result.current[0]).toEqual({ counter: 2 });
    unmount();
  });

  test('useRef: should be deferrer', () => {
    let initialState = { counter: 1 };
    const { rerender, unmount, result } = renderHook((init = false) => Defer.useRef(initialState, init as boolean));
    rerender(false);
    expect(result.current.current).toEqual({ counter: 1 });
    initialState = { counter: 2 };
    rerender(true);
    expect(result.current.current).toEqual({ counter: 2 });
    unmount();
  });

  test('useCallback: should be deferrer', () => {
    let callCounter = 0;
    const { rerender, unmount, result } = renderHook((init = false) =>
      Defer.useCallback(
        () => {
          callCounter = callCounter + 1;
        },
        [],
        init as boolean,
      ),
    );
    rerender(false);
    result.current();
    expect(callCounter).toEqual(0);
    rerender(true);
    result.current();
    expect(callCounter).toEqual(1);
    unmount();
  });

  test('useMemo: should be deferrer', () => {
    let initialState = { counter: 1 };
    const { rerender, unmount, result } = renderHook((init = false) =>
      Defer.useMemo(() => initialState, [], init as boolean),
    );
    rerender(false);
    expect(result.current).toEqual({ counter: 1 });
    initialState = { counter: 2 };
    rerender(false);
    expect(result.current).toEqual({ counter: 1 });
    rerender(true);
    expect(result.current).toEqual({ counter: 2 });
    unmount();
  });
});

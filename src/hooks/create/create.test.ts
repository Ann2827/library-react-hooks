import { act, renderHook } from '@testing-library/react-hooks';
import { useState } from 'react';

import { hookCreator } from '.';
import { IData } from './create.types';

describe('create hook data:', () => {
  type TTestState = { name: string };
  type TTestEvent = {};
  interface ITestData extends IData<TTestState, TTestEvent> {
    setState(newState: TTestState): void;
  }

  const [data, useEffectOn] = hookCreator<TTestState, TTestEvent, ITestData>(
    (d) => ({
      ...d,
      setState(newState) {
        this._updateState({}, newState);
      },
    }),
    { name: '' },
  );

  beforeEach(() => {
    data.reset();
  });

  test('order with on', () => {
    const arr = ['Ann', 'Jack', 'Bob'];
    let state: TTestState = { name: '' };
    const clear = data.on((_e, s) => {
      state = s;
    });
    data.setState({ name: arr[0] });
    expect(data.state().name).toEqual(arr[0]);
    expect(state.name).toEqual(arr[0]);

    data.setState({ name: arr[1] });
    expect(data.state().name).toEqual(arr[1]);
    expect(state.name).toEqual(arr[1]);

    data.setState({ name: arr[2] });
    expect(data.state().name).toEqual(arr[2]);
    expect(state.name).toEqual(arr[2]);

    clear();
  });

  test('order with get state', () => {
    const arr = ['Ann', 'Jack', 'Bob'];

    data.setState({ name: arr[0] });
    expect(data.state().name).toEqual(arr[0]);

    setTimeout(() => {
      data.setState({ name: arr[2] });
    }, 2000);
    data.setState({ name: arr[1] });
    expect(data.state().name).toEqual(arr[1]);
    setTimeout(() => {
      expect(data.state().name).toEqual(arr[2]);
    }, 2000);
  });

  test('listeners quantity', () => {
    const { rerender, unmount } = renderHook(() =>
      useEffectOn((_event, newState) => {
        expect(newState).toEqual({ name: 'Test' });
      }, []),
    );
    data.setState({ name: 'Test' });
    expect(data._listeners.length).toEqual(1);

    rerender();
    expect(data._listeners.length).toEqual(1);

    unmount();
    expect(data._listeners.length).toEqual(0);
  });

  test('listeners sync', () => {
    let name1, name2;
    const { unmount: unmount1 } = renderHook(() =>
      useEffectOn((_event, newState) => {
        name1 = newState.name;
        expect(newState).toEqual({ name: 'Test' });
      }, []),
    );
    const { unmount: unmount2 } = renderHook(() =>
      useEffectOn((_event, newState) => {
        name2 = newState.name;
        expect(newState).toEqual({ name: 'Test' });
      }, []),
    );
    data.setState({ name: 'Test' });

    expect(name1).toEqual(name2);
    expect(data._listeners.length).toEqual(2);

    unmount1();
    unmount2();
  });
});

describe('create hook: Counter:', () => {
  type TCounterState = {
    counter: number;
  };
  type TCounterEvent = {
    type: 'updated';
  };
  interface ICounterData extends IData<TCounterState, TCounterEvent> {
    setCounter(): void;
    get counter(): number;
  }
  interface ICounter {
    counter: TCounterState['counter'];
    setCounter: ICounterData['setCounter'];
    reset: ICounterData['reset'];
  }
  const [data, useEffectOn] = hookCreator<TCounterState, TCounterEvent, ICounterData>(
    (d) => ({
      ...d,
      setCounter() {
        this._updateState({ type: 'updated' }, { counter: this._state.counter + 1 });
      },
      get counter(): number {
        return Number(this._state.counter);
      },
    }),
    { counter: 0 },
  );
  const useCounter = (): ICounter => {
    const [counter, setCounter] = useState<TCounterState['counter']>(() => data.counter);
    useEffectOn((_e, state) => {
      setCounter(state.counter);
    }, []);
    return { reset: () => data.reset(), counter, setCounter: () => data.setCounter() };
  };

  beforeEach(() => {
    const { result } = renderHook(() => useCounter());
    result.current.reset();
  });

  test('state: should be 0', () => {
    const { result } = renderHook(() => useCounter());
    expect(result.current.counter).toEqual(0);
  });

  test('state: should be 2', () => {
    const { result } = renderHook(() => useCounter());
    act(() => {
      result.current.setCounter();
      result.current.setCounter();
    });
    expect(result.current.counter).toEqual(2);
  });

  // test('state: should be 3', async () => {
  //   const { result } = renderHook(() => useCounter());
  //   await act(async () => {
  //     result.current.setCounter();
  //     expect.assertions(1);
  //     await new Promise<undefined>((resolve) => {
  //       setTimeout(() => {
  //         result.current.setCounter();
  //         result.current.setCounter();
  //         expect.assertions(2);
  //         resolve(undefined);
  //       }, 2000);
  //     });
  //   });
  //   expect(result.current.counter).toEqual(3);
  // });
});

# Create hook

This hook is the base for creating custom hooks.

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)

[//]: # (- [Properties]&#40;#properties&#41;)

[//]: # (- [Demo]&#40;https://ann2827.github.io/library-react-hooks/create&#41;)

## Usage <a name = "usage"></a>

For example: custom counter hook.

_counter.types.ts_

```ts
import {IData} from 'library-react-hooks';

export type TCounterState = {
  counter: number;
};
export type TCounterEvent = {
  type: 'updated';
};

export interface ICounterData extends IData<TCounterState, TCounterEvent> {
  setCounter(): void;
  get counter(): number;
}

export interface ICounter {
  counter: TCounterState['counter'];
  setCounter: ICounterData['setCounter'];
  reset: ICounterData['reset'];
}
```

_data.ts_
```tsx
import { hookCreator, IData } from 'library-react-hooks';
import { TCounterState, TCounterEvent, ICounterData } from './counter.types.ts';

export const [data, useEffectOn] = hookCreator<TCounterState, TCounterEvent, ICounterData>(
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
```

_counter.hook.ts_
```tsx
import React from 'react';
import { ICounter, TCounterState } from './counter.types.ts';
import { data, useEffectOn } from './data.ts';

const useCounter = (): ICounter => {
  const [counter, setCounter] = React.useState<TCounterState['counter']>(() => data.counter);
  useEffectOn((_e, state) => {
    setCounter(state.counter);
  }, []);
  return { reset: () => data.reset(), counter, setCounter: () => data.setCounter() };
};

export default useCounter;
```

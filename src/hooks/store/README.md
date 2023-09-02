# Store hook

[comment]: <> (description)

[comment]: <> (image)

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)

[//]: # (- [Properties]&#40;#properties&#41;)
[//]: # (- [Demo]&#40;https://ann2827.github.io/library-react-hooks/store&#41;)

## Usage <a name = "usage"></a>

For example: custom counter hook.

_counterStore.ts_
```tsx
import { makeStore } from 'library-react-hooks';

export type TCounterState = {
  counter: number;
  actions: {
    started: boolean;
    updated: boolean;
  };
};
interface ICounterData {
  __new(): this;
  _setStarted(): void;
  setCounter(): void;
}

const CounterStore = makeStore<TCounterState, ICounterData>({
  logger: false,
  hookName: 'counter',
  flatten: true,
})({ counter: 0, actions: { started: false, updated: false } }, (state, setState) =>
  ({
    __new() {
      this.setCounter = this.setCounter.bind(this);
      return this;
    },
    _setStarted() {
      setState({ 'actions.started': true });
    },
    setCounter() {
      this._setStarted();
      setState((prev) => ({ counter: prev.counter + 1 }));
    },
  }).__new(),
);

export default CounterStore;
```


```tsx
import React from 'react';
import counterStore from './counterStore';

const Example: React.VFC = () => {
  const counter = counterStore.useSubscribe<number>('counter');

  return (
    <div>
      <p>{counter}</p>
      <button onClick={counterStore.setCounter}>Counter + 1</button>
      <button onClick={counterStore.setState((prev) => ({ counter: prev + 2 }))}>Counter + 2</button>
    </div>
  );
};
```

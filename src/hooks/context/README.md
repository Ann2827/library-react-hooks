# Context hook

[comment]: <> (description)

[comment]: <> (image)

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)

[//]: # (- [Demo]&#40;https://ann2827.github.io/library-react-hooks/context&#41;)

## Usage <a name = "usage"></a>

```tsx
import React from 'react';
import { createContext, makeEffectOn, TStateFn } from 'library-react-hooks';

type TState = {
  key1: string;
  key2: string;
};
const initialState: TState = { key1: '', key2: '' };
const KeysContext = createContext<TState>(initialState, { ...options });
const useEffectOn = makeEffectOn<TStateFn<TState>>(KeysContext.on);

const Example: React.VFC = () => {
  const [key1, setKey1] = useState(KeysContext.state.key1);

  useEffectOn((prevState, nextState) => {
    setKey1(nextState.key1);
  });

  return (
    <div>
      <p>{key1}</p>
      <button onClick={() => { KeysContext.state.key1 = '1' }}>Update</button>
    </div>
  );
};
```

## Properties <a name = "properties"></a>

### createState `options`

```ts
createContext(initialState, { ... });
```

| name      | type    | default | what`s doing                                                        |
|-----------|---------|-------|---------------------------------------------------------------------|
| logger    | boolean | false | Turn on logger                                                      |
| hookName  | string  | "state" | This hook name for logs                                             |
| cleanKeys | boolean  | true  | If exists initialState then clean keys don`t exists in initialState |
| merge     | boolean  | false | Merge or rewrite new state                                          |                                                   |

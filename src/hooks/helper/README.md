# Helper hooks

A few simple auxiliary hooks.

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Update state hook](#update_state_hook)
- [Unmount hook](#unmount_hook)

## Update state hook <a name = "update_state_hook"></a>

It works like a useState hook, but the state is also updated if a new initial value comes from the control component:

```tsx
import React from 'react';
import { useUpdateState } from 'library-react-hooks';

const Example: React.VFC = ({ counter }: { counter: number }) => {
  const [state, setState] = useUpdateState<number>(counter);

  return (
    <div>
      <p>State: </p>
      {state}
    </div>
  );
};
```

## Unmount hook <a name = "unmount_hook"></a>

It works like a useEffect hook, but it is called once when the component will unmount:

```tsx
import React from 'react';
import { useUnmount } from 'library-react-hooks';

const Example: React.VFC = () => {
  useUnmount(() => {
    // clear
  });

  return null;
};
```

# Timer hook

[comment]: <> (description)

[comment]: <> (image)

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Demo](https://ann2827.github.io/library-react-hooks/timer)

## Usage <a name = "usage"></a>

Place for message dispatch:

```tsx
import React from 'react';
import { useTimer } from 'library-react-hooks';

const Example: React.FC = () => {
  const { } = useTimer();

  return (
    <div>

    </div>
  );
};
```

Timer component:

```tsx
import React from 'react';
import { useTimer } from 'library-react-hooks';

const Toast: React.FC = () => {
  const { } = useTimer();

  return <div></div>;
};
```

## Properties <a name = "properties"></a>

### Set Once `timerSettings`

```ts
timerSettings({ ... });
```

| name | type | default | what`s doing |
| ------ | ------ | ------ | ------ |
|  |  |  |  |

### Fn: `on`

```ts
const { on } = useTimer();

on((event: TTimerEvent) => {
  ...
});
```

This function listens for the events of adding and deleting messages.
Data contains: ...

# Timer hook

[comment]: <> (description)

[comment]: <> (image)

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Demo](https://ann2827.github.io/library-react-hooks/timer)

## Usage <a name = "usage"></a>

Starting the timer:

```tsx
import React from 'react';
import { useTimer } from 'library-react-hooks';

const Example: React.FC = () => {
  const { setTimer} = useTimer();

  return (
    <div>
      <button onClick={() => setTimer(10, { name: 'myTimer', autoFinish: true, callback: () => { console.log('finish') } })}>Button</button>
    </div>
  );
};
```

Attention! The component will be rerendered every second:

```tsx
import React from 'react';
import { useListenTime } from 'library-react-hooks';

const Example: React.FC = () => {
  const time = useListenTime();
  const { setTimer} = useTimer();

  return (
    <div>
      <p>My time: {time.timer1}</p>
      <button onClick={() => setTimer(10, { name: 'timer1', observe: true, listen: true })}>Button</button>
    </div>
  );
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

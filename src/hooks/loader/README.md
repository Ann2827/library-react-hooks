# Loader hook

This hook stores loading state. It is written according to the Singleton pattern.
Therefore, access to a single instance of the stored state is carried out without
prop transfers or provider wrapping.

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Demo](https://ann2827.github.io/library-react-hooks/loader)

## Usage <a name = "usage"></a>

Place for loading dispatch:

```ts
import { fnLoader } from 'library-react-hooks';

const { loaderOn, loaderOff, loaderStop } = fnLoader();

loaderOn();
loaderOff();
loaderStop();
```

or

```tsx
import React from 'react';
import { useLoader } from 'library-react-hooks';

const Example: React.FC = () => {
  const { loaderOn, loaderOff, loaderStop } = useLoader();

  return (
    <div>
      <button onClick={() => loaderOn()}>Start</button>
      <button onClick={() => loaderOff()}>Cancel</button>
      <button onClick={() => loaderStop()}>Stop</button>
    </div>
  );
};
```

Loader component:

```tsx
import React from 'react';
import { useLoader } from 'library-react-hooks';

const Loader: React.FC = () => {
  const { active } = useLoader();

  if (!active) return null;
  return <MyLoaderIcon />;
};
```

## Properties <a name = "properties"></a>

### Fn: `loaderOn`

```ts
const { loaderOn } = useLoader();

loaderOn();
```

Activate one (or one more) loader.

### Fn: `loaderOff`

```ts
const { loaderOff } = useLoader();

loaderOff();
```

Cancel one loader process.

### Fn: `loaderStop`

```ts
const { loaderStop } = useLoader();

loaderStop();
```

Stop all loader processes.

### Fn: `on`

```ts
const { on } = useLoader();

on((is: boolean) => { ... });
```

This function listens for the events of activate and determinate.

### Const: `active`

```ts
const { active } = useLoader();
```

Returns loader activity status.



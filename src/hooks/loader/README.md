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
  const { on } = useLoader();

  const [loading, setLoading] = useState<boolean>(false);
  useEffect(() => {
    on((is) => setLoading(is));
  }, [on]);

  if (!loading) return null;
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



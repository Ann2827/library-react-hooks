# Http hook

[comment]: <> (description)

[comment]: <> (image)

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)
- [Demo](https://ann2827.github.io/library-react-hooks/http)

## Usage <a name = "usage"></a>

Place for message dispatch:

```tsx
import React from 'react';
import { useHttp } from 'library-react-hooks';

const Example: React.FC = () => {
  const { } = useHttp();

  return (
    <div>

    </div>
  );
};
```

Http component:

```tsx
import React from 'react';
import { useHttp } from 'library-react-hooks';

const Toast: React.FC = () => {
  const { } = useHttp();

  return <div></div>;
};
```

## Properties <a name = "properties"></a>

### Set Once `httpSettings`

```ts
httpSettings({ ... });
```

| name | type | default | what`s doing |
| ------ | ------ | ------ | ------ |
|  |  |  |  |

### Fn: `on`

```ts
const { on } = useHttp();

on((data: HttpDataObject[]) => {
  ...
});
```

This function listens for the events of adding and deleting messages.
Data contains: ...

# ImagePreloader hook

This hook allows you to preload images into the browser's memory.

[Back](https://github.com/Ann2827/library-react-hooks/blob/main/README.md)

## Table of Contents

- [Usage](#usage)
- [Properties](#properties)

[//]: # (- [Demo]&#40;https://ann2827.github.io/library-react-hooks/imagePreloader&#41;)

## Usage <a name = "usage"></a>

Place for init:

```tsx
import React from 'react';
import { useImagePreloader } from 'library-react-hooks';

const Example: React.VFC = () => {
  useImagePreloader(
    {
      'errors40x.png': () => import('./assets/images/errors40x.png'),
      'notFound.png': () => import('./assets/images/notFound.png'),
    },
    'base64',
  );

  return (
    <div>

    </div>
  );
};
```

Place for dispatch image:

```tsx
import React from 'react';
import { useImagePreloader } from 'library-react-hooks';

const ImagePreloader: React.VFC = () => {
  const { images } = useImagePreloader();

  return <img className={styles.page_image} src={images['forbidden.png']?.base64} alt='forbiddenImage' />;
};
```

## Properties <a name = "properties"></a>

### Hook: `useEffectOnImagePreloader`

```ts
import { useEffectOnImagePreloader } from 'library-react-hooks';

useEffectOnImagePreloader((event, newState) => {
  ...
}, []);
```

This hook listens for the events of state.

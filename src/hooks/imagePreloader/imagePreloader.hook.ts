import React from 'react';

import { useOnceEffect } from '../helper';

import { data, useEffectOnImagePreloader } from './data';
import { IImagePreloaderData, TImagePreloaderType } from './imagePreloader.types';

import type { IImagePreloader } from './imagePreloader.types';

const useImagePreloader = (
  imageList?: { [K in string]: () => Promise<{ default: string }> },
  type: TImagePreloaderType = 'image',
): IImagePreloader => {
  const [images, setImages] = React.useState<IImagePreloaderData['_state']>(data._state);
  useEffectOnImagePreloader((_event, newState) => {
    setImages(newState);
  }, []);

  useOnceEffect(() => {
    if (imageList && Object.keys(imageList).length > 0) data.load(imageList, type);
  });

  const reset = React.useCallback(() => data.reset(), []);

  return { reset, images };
};

export default useImagePreloader;

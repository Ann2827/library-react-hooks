import { IData } from '../create';

export type TImagePreloaderType = 'image' | 'base64';

type TImagePreloaderEventState = 'loading' | 'loaded' | 'error';
export type TImagePreloaderEvent = {
  state: TImagePreloaderEventState;
  name: string;
};

export type TImagePreloaderStateImage = {
  image: null | HTMLImageElement;
  state: TImagePreloaderEventState;
  base64: undefined | string;
};
export type TImagePreloaderState = {
  [NAME in string]: TImagePreloaderStateImage;
};

/**
 * @private
 * @ignore
 */
export interface IImagePreloaderData extends IData<TImagePreloaderState, TImagePreloaderEvent> {
  _helperUpdateImage: ({
    name,
    image,
    state,
    base64,
  }: {
    name: string;
    image: TImagePreloaderStateImage['image'];
    state: TImagePreloaderStateImage['state'];
    base64: TImagePreloaderStateImage['base64'];
  }) => void;
  load: (
    imageList: { [K in string]: () => Promise<{ default: string }> },
    type: TImagePreloaderType,
  ) => Promise<(string | HTMLImageElement)[]>;
}

export interface IImagePreloader {
  /**
   * Uploaded images
   */
  images: IImagePreloaderData['_state'];

  /**
   * Resets the state
   */
  reset: IImagePreloaderData['reset'];
}

import { TImagePreloaderEvent, TImagePreloaderState, IImagePreloaderData } from './imagePreloader.types';
import { hookCreator } from '../create';
import { createBase64, createImage, imageLoader } from './imagePreloader.functions';

const dataOptions = {
  hookName: 'imagePreloader',
  logger: false,
};
export const logsImagePreloaderEnable = (): void => {
  dataOptions.logger = true;
};

export const [data, useEffectOnImagePreloader] = hookCreator<
  TImagePreloaderState,
  TImagePreloaderEvent,
  IImagePreloaderData
>(
  (d) => ({
    ...d,
    _helperUpdateImage({ name, image, state, base64 }) {
      this._updateState({ name, state }, { ...this._state, [name]: { image, state, base64 } });
    },
    load(imageList, type) {
      return Promise.all(
        Object.keys(imageList).map((key) => {
          return new Promise<HTMLImageElement | string>((resolve, reject) => {
            const item = imageList[key];
            Promise.resolve(imageLoader(item))
              .then((src) => {
                const existsImg = this._state[key];
                switch (existsImg.state) {
                  case 'loading':
                    reject(src);
                    break;
                  case 'loaded':
                    if (existsImg.image) resolve(existsImg.image);
                    if (existsImg.base64) resolve(existsImg.base64);
                    break;
                  case 'error':
                  default:
                    break;
                }

                this._helperUpdateImage({ name: key, image: null, state: 'loading', base64: undefined });

                if (type === 'image') {
                  createImage(
                    src,
                    (img) => {
                      this._helperUpdateImage({ name: key, image: img, state: 'loaded', base64: undefined });
                      resolve(img);
                    },
                    () => {
                      this._helperUpdateImage({ name: key, image: null, state: 'error', base64: undefined });
                      reject(src);
                    },
                  );
                } else {
                  createBase64(
                    src,
                    (dataUrl) => {
                      this._helperUpdateImage({ name: key, image: null, state: 'loaded', base64: dataUrl });
                      resolve(dataUrl);
                    },
                    () => {
                      this._helperUpdateImage({ name: key, image: null, state: 'error', base64: undefined });
                      reject(src);
                    },
                  );
                }
              })
              .catch(() => {
                this._helperUpdateImage({ name: key, image: null, state: 'error', base64: undefined });
              });
          });
        }),
      );
    },
  }),
  {},
  dataOptions,
);

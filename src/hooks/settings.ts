import { logsLoaderEnable } from './loader/loaderStore';
import { logsImagePreloaderEnable } from './imagePreloader/data';

export const logsEnable = (): void => {
  logsLoaderEnable();
  logsImagePreloaderEnable();
};

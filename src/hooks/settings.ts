import { logsLoaderEnable } from './loader/data';
import { logsImagePreloaderEnable } from './imagePreloader/data';

export const logsEnable = (): void => {
  logsLoaderEnable();
  logsImagePreloaderEnable();
};

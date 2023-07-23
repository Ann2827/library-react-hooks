import { logsLoaderEnable } from '../hooks/loader/data';
import { logsImagePreloaderEnable } from '../hooks/imagePreloader/data';

export const logsEnable = (): void => {
  logsLoaderEnable();
  logsImagePreloaderEnable();
};

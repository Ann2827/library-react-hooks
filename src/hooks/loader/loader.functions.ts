import { LoaderI } from './loader.types';
import { data } from './data';

const fnLoader = (): Pick<LoaderI, 'loaderOn' | 'loaderOff' | 'loaderStop'> => {
  return {
    loaderOn: () => data.activate(),
    loaderOff: () => data.determinate(),
    loaderStop: () => data.stop(),
  };
};

export default fnLoader;

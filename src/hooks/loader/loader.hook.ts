import React from 'react';

import { ILoader } from './loader.types';
import LoaderStore from './loaderStore';

const useLoader = (): ILoader => {
  const active = LoaderStore.useSubscribe<boolean>((state) => state.active);
  const on = React.useCallback<ILoader['on']>(
    (fn) => {
      return LoaderStore.on((_prevState, newState) => {
        fn(newState.active);
      });
    },
    [active],
  );

  return {
    active,
    loaderOn: () => LoaderStore.activate(),
    loaderOff: () => LoaderStore.determinate(),
    on,
    loaderStop: () => LoaderStore.stop(),
    useSubscribe: LoaderStore.useSubscribe,
    _reset: () => LoaderStore.reset(),
    reset: () => LoaderStore.reset(),
  };
};

export default useLoader;

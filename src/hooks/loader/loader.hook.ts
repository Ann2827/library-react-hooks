import React from 'react';

import { ILoader } from './loader.types';
import { data, useEffectOnLoader } from './data';

const useLoader = (): ILoader => {
  const [active, setActive] = React.useState<ILoader['active']>(data.getActive());
  useEffectOnLoader((_event, newState) => {
    setActive(newState.active);
  }, []);

  const loaderOn = React.useCallback<ILoader['loaderOn']>(() => data.activate(), []);
  const loaderOff = React.useCallback<ILoader['loaderOff']>(() => data.determinate(), []);
  const loaderStop = React.useCallback<ILoader['loaderStop']>(() => data.stop(), []);
  const on = React.useCallback<ILoader['on']>((fn) => data.on((_e, s) => fn(s.active)), []);
  const reset = React.useCallback(() => data.reset(), []);

  return {
    active,
    loaderOn,
    loaderOff,
    on,
    loaderStop,
    _reset: reset,
    reset,
  };
};

export default useLoader;

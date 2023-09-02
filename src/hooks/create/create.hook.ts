import React from 'react';

import { IData, TUseEffectOn, TDataEvent } from './create.types';

import type { TDataState } from './create.types';

/**
 * @deprecated use makeEffectOn
 * @param data
 */
export const makeCreateOn = <S extends TDataState, E extends TDataEvent, D extends IData<S, E>>(data: D) => {
  const useEffectOn: TUseEffectOn<S, E> = (callback, deps = []): void => {
    const dependency = React.useMemo(() => [callback, ...deps], [callback, deps]);
    React.useEffect(
      () =>
        data.on((event, store) => {
          callback(event, store);
        }),
      [callback, dependency],
    );
  };
  return useEffectOn;
};

import React from 'react';
import type { TDataState } from './create.types';
import { IData, TUseEffectOn, TDataEvent } from './create.types';

export const makeCreateOn = <S extends TDataState, E extends TDataEvent, D extends IData<S, E>>(data: D) => {
  const useEffectOn: TUseEffectOn<S, E> = (callback, deps = []): void => {
    const dependency = React.useMemo(() => [callback].concat(deps), [callback, deps]);
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

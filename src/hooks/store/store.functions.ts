import React from 'react';

import { onlyPublic, TOnlyPublic } from '../../utils/object';
import { createContext, IContextOptions, TContextFn, IContext } from '../context';
import { makeEffectOn } from '../helper';

import { TDataState, IStore, IStoreStateFn, TStoreEnrich } from './store.types';

// TODO: see reselect lib
export const makeSubscribe = <S extends TDataState = {}>(Context: IContext<S>): IStore<S>['useSubscribe'] => {
  // @ts-ignore
  const useEffectOn = makeEffectOn<Parameters<TContextFn<S>>>(Context.on);
  return <T = unknown>(listener: (state: S) => T): T => {
    // @ts-ignore
    const refListener = React.useRef(listener);
    const [state, setNewState] = React.useState<T>(refListener.current(Context.state));
    useEffectOn((prev, next) => {
      // @ts-ignore
      const nextState = refListener.current(next);
      // @ts-ignore
      if (JSON.stringify(refListener.current(prev)) !== JSON.stringify(nextState)) {
        setNewState(nextState);
      }
    });
    return state;
  };
};

const makeStore = <S extends TDataState = {}>(initialState: S, options: Partial<IContextOptions>): IStore<S> => {
  const BaseContext = createContext<S>(initialState, options);
  const setState = (fn: IStoreStateFn<S>): void => {
    BaseContext.state = typeof fn === 'function' ? fn(BaseContext.state) : fn;
  };

  const useSubscribe = makeSubscribe<S>(BaseContext);

  const enrich = <D extends Record<string, unknown> = {}>(
    enrichFn: (setState: (fn: ((prev: S) => S) | S) => void, state: S) => D,
  ): TStoreEnrich<S, D> => {
    const enrichData: D = enrichFn((fn) => setState(fn), BaseContext.state);

    const filterMethods: TOnlyPublic<D> = onlyPublic<D>(enrichData);

    return {
      ...filterMethods,
      useSubscribe,
      setState,
      reset: BaseContext.reset,
    };
  };

  return {
    useSubscribe,
    setState,
    reset: BaseContext.reset,
    enrich,
  };
};

export default makeStore;

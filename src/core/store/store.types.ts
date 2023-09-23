import { TOnlyPublic } from '@utils';

import { IContext } from '../context';

export type TDataState = Object;

export type IStoreStateFn<S> = ((prev: S) => S) | S;
export interface IStoreBase<S extends TDataState> extends Object {
  useSubscribe<T = unknown>(listener: (state: S) => T): T;
  // TODO: with option merge must type works for partial state
  setState(fn: IStoreStateFn<S>): void;
  reset: IContext<S>['reset'];
}
export type TStoreEnrich<S extends TDataState = {}, D extends Object = {}> = IStoreBase<S> & TOnlyPublic<D>;
export interface IStore<S extends TDataState = {}> extends IStoreBase<S> {
  enrich<D extends Record<string, unknown> = {}>(
    enrichFn: (setState: (fn: ((prev: S) => S) | S) => void, state: S, reset: IContext<S>['reset']) => D,
  ): TStoreEnrich<S, D>;
}

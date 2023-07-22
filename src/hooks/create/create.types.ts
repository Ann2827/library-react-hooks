import { DependencyList } from 'react';

export interface IDataOptions {
  logger: boolean;
  hookName: string;
}

/**
 * type TDataEvent = {
 *   type: 'update';
 *   state: 'loading' | 'loaded' | 'error';
 * }
 */
export type TDataEvent = Record<string, unknown>;
export type TDataState = Record<string, unknown>;

export type TDataFn<S, E> = (event: E, newState: S) => void;

export interface IData<S extends TDataState = {}, E extends TDataEvent = {}> extends Object {
  /** @protected **/
  _listeners: Array<TDataFn<S, E>>;
  /** @protected **/
  _state: S;
  /** @protected **/
  _event: TDataFn<S, E>;
  /** @protected **/
  _updateState: TDataFn<S, E>;
  state(): S;
  on(fn: TDataFn<S, E>): () => void;
  reset(): void;
}

export type TUseEffectOn<S extends TDataState, E extends TDataEvent> = (
  callback: TDataFn<S, E>,
  deps: DependencyList,
) => void;

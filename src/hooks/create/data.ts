import { loggerState, loggerMessage } from '../../utils/logger';

import { IDataOptions, TDataEvent, TDataState } from './create.types';

import type { IData } from './create.types';

export const createData = <S extends TDataState, E extends TDataEvent>(
  initialState: S,
  options?: Partial<IDataOptions>,
): IData<S, E> => ({
  constructor() {
    this._event.bind(this);
    this._updateState.bind(this);
    this.on.bind(this);
  },
  _listeners: [],
  _state: Object.assign({}, initialState),
  _event(e, newState) {
    this._listeners.forEach((listener) => listener(e, newState));
  },
  _updateState(e, newState) {
    const cloneNewState = Object.assign({}, newState);
    const cloneThisState = Object.assign({}, this._state);

    this._state = cloneNewState;
    this._event(e, newState);

    if (options?.logger) loggerState(options?.hookName || 'create', cloneThisState, cloneNewState);
  },
  state() {
    return Object.assign({}, this._state);
  },
  on(fn) {
    this._listeners.push(fn);
    return () => (this._listeners = this._listeners.filter((listener) => listener !== fn));
  },
  reset() {
    this._listeners = [];
    this._state = Object.assign({}, initialState);

    if (options?.logger) loggerMessage(options?.hookName || 'create', 'Was reset');
  },
});

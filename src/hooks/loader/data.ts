import { DataI } from './loader.types';

export const data: DataI = {
  _listeners: [],
  _active: false,
  _queue: 0,
  _event(e) {
    this._listeners.forEach((listener) => listener(e));
  },
  activate() {
    this._active = true;
    this._queue += 1;
    this._event(true);
  },
  determinate() {
    if (this._queue > 1) {
      this._queue -= 1;
    } else {
      this._active = false;
      this._queue = 0;
      this._event(false);
    }
  },
  stop() {
    this._active = false;
    this._queue = 0;
    this._event(false);
  },
  getActive() {
    return this._active;
  },
  on(fn) {
    this._listeners.push(fn);
    return () => (this._listeners = this._listeners.filter((listener) => listener !== fn));
  },
  reset() {
    this._listeners = [];
    this._active = false;
    this._queue = 0;
  },
};

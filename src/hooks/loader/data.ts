import { DataI } from './loader.types';

// const storageAvailable = (type: 'localStorage' | 'sessionStorage'): boolean => {
//   try {
//     return type in window && typeof window[type].getItem === 'function' && typeof window[type].setItem === 'function';
//   } catch {
//     return false;
//   }
// };
// const DEBUG_LOADER_KEY = 'debug-loader-key';
// let debug = false;
// if (storageAvailable('localStorage') && window.localStorage.getItem(DEBUG_LOADER_KEY)) {
//   debug = true;
// }

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
  getQuantity() {
    return this._queue;
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

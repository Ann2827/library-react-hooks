import { DataI } from './loader.types';

export const data: DataI = {
  _active: false,
  _queue: 0,
  _event(_value) {},
  _reset() {
    this._active = false;
    this._queue = 0;
    this._event(false);
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
    this._event = fn;
  },
};

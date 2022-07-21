import { DataI } from './loader.types';

export const data: DataI = {
  active: false,
  queue: 0,
  activate() {
    this.active = true;
    this.queue += 1;
    this.event(true);
  },
  determinate() {
    if (this.queue > 1) {
      this.queue -= 1;
    } else {
      this.active = false;
      this.queue = 0;
      this.event(false);
    }
  },
  stop() {
    this.active = false;
    this.queue = 0;
    this.event(false);
  },
  getActive() {
    return this.active;
  },
  // @ts-ignore
  event(value) {},
  on(fn) {
    this.event = fn;
  },
  _reset() {
    this.active = false;
    this.queue = 0;
    this.event(false);
  },
};

import type { IData } from './timer.types';

export const data: IData = {
  _timers: {},
  _onDone(options) {
    if (options.dispatch)
      this._event({ name: options.name, action: 'done', params: options.params, onExpired: options.onExpired });
    if (typeof options.onExpired === 'function' && options.autoFinish) options.onExpired();
    this._timers[options.name] = undefined;
  },
  _startTimeout(time, options) {
    if (options.dispatch)
      this._event({ name: options.name, action: 'start', params: options.params, onExpired: options.onExpired });
    this._timers[options.name] = {
      type: 'timeout',
      time,
      options,
      clear: setTimeout(() => this._onDone(options), time * 1000),
    };
  },
  _startInterval(time, options) {
    if (options.dispatch)
      this._event({ name: options.name, action: 'start', params: options.params, onExpired: options.onExpired });
    this._timers[options.name] = {
      type: 'interval',
      time,
      options,
      clear: setInterval(() => {
        const timer = this._timers[options.name];
        if (!timer) return;

        const leftTime = Number(timer.time);
        if (leftTime > 0) {
          if (options.dispatch)
            this._event({
              name: options.name,
              action: 'change',
              params: options.params,
              onExpired: options.onExpired,
              time: leftTime - 1,
            });
          this._timers[options.name]!.time = leftTime - 1;
        } else {
          const interval: NodeJS.Timeout | null = timer.clear;
          if (interval) {
            clearInterval(interval);
          }
          this._onDone(options);
        }
      }, 1000),
    };
  },
  _event(_e) {},
  setTimer(time, options) {
    if (time <= 0) return;

    if (options.observe) {
      this._startInterval(time, options);
      return;
    }
    this._startTimeout(time, options);
  },
  cancelTimer(name: string) {
    const timer = this._timers[name];
    if (!timer) return;
    if (timer.options.dispatch)
      this._event({ name, action: 'cancel', params: timer.options.params, onExpired: timer.options.onExpired });
    if (timer.type === 'interval') {
      clearInterval(timer.clear);
    }
    if (timer.type === 'timeout') {
      clearTimeout(timer.clear);
    }
    this._timers[name] = undefined;
  },
  clear() {
    Object.keys(this._timers).forEach((name) => {
      this.cancelTimer(name);
    });
  },
  getTime(name) {
    const timer = this._timers[name];
    if (timer) return timer.time;
    return 0;
  },
  on(fn) {
    this._event = fn;
  },
  reset() {
    this.clear();
    this._timers = {};
    this._event = (_e) => {};
  },
};

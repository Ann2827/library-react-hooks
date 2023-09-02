import type { IData } from './timer.types';

const data: IData = {
  _listeners: [],
  _timers: {},
  time: {},
  _onDone(name) {
    const timer = this._timers[name];
    if (!timer) return;

    if (timer.options.listen)
      this._event({ name, action: 'done', params: timer.options.params, callback: timer.options.callback });
    // Timeout при onDone выполнился сам
    if (timer.type === 'interval') {
      clearInterval(timer.clear);
    }
    if (typeof timer.options.callback === 'function' && timer.options.autoFinish) timer.options.callback();
    this._timers[name] = undefined;
    this.time[name] = 0;
  },
  _clearTimer(name) {
    const timer = this._timers[name];
    if (!timer) return;

    if (timer.options.listen)
      this._event({ name, action: 'cancel', params: timer.options.params, callback: timer.options.callback });
    if (timer.type === 'timeout') {
      clearTimeout(timer.clear);
    }
    if (timer.type === 'interval') {
      clearInterval(timer.clear);
    }
    this._timers[name] = undefined;
    this.time[name] = 0;
  },
  _startTimeout(time, options) {
    if (options.listen)
      this._event({ name: options.name, action: 'start', params: options.params, callback: options.callback });
    this._timers[options.name] = {
      type: 'timeout',
      time,
      options,
      clear: setTimeout(() => this._onDone(options.name), time * 1000),
    };
  },
  _startInterval(time, options) {
    if (options.listen)
      this._event({ name: options.name, action: 'start', params: options.params, callback: options.callback });
    this._timers[options.name] = {
      type: 'interval',
      time,
      options,
      clear: setInterval(() => {
        const timer = this._timers[options.name];
        if (!timer) return;

        const leftTime = Number(timer.time);
        if (leftTime > 0) {
          if (options.listen)
            this._event({
              name: options.name,
              action: 'change',
              params: options.params,
              callback: options.callback,
              time: leftTime - 1,
            });
          this._timers[options.name]!.time = leftTime - 1;
          this.time[options.name] = leftTime - 1;
        } else {
          this._onDone(options.name);
        }
      }, 1000),
    };
  },
  _event(e) {
    this._listeners.forEach((listener) => listener(e));
  },
  // get time() {
  //   return this._time;
  // },
  setTimer(time, options) {
    if (time <= 0) {
      this.time[options.name] = 0;
      return;
    }
    this._clearTimer(options.name);

    this.time[options.name] = time;
    if (options.observe) {
      this._startInterval(time, options);
      return;
    }
    this._startTimeout(time, options);
  },
  cancelTimer(name: string) {
    this._clearTimer(name);
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
    this._listeners.push(fn);
    return () => (this._listeners = this._listeners.filter((listener) => listener !== fn));
  },
  reset() {
    this.clear();
    this._listeners = [];
    this._timers = {};
    this.time = {};
  },
};

data.time = new Proxy<IData['time']>(data.time, {
  get(target, prop, _receiver) {
    return typeof prop === 'string' && prop in target ? target[prop] : 0;
  },
  // set(target, prop, newValue, _receiver): boolean {
  //   console.log('data.time Proxy set', target, prop, newValue);
  //   if (typeof prop !== 'string') return false;
  //   const value = target?.[prop];
  //   if (typeof value === 'function') {
  //     target[prop] = newValue;
  //     return true;
  //   }
  //   return false;
  // },
});

// data = new Proxy<IData>(data, privateProxy<IData>());

export default data;

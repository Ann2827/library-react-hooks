import { makeSetState, createContext } from '@core';

import { TDataTimer, TTimerOptions } from './timer.types';

export type TTimerState = {
  timers: {
    [K in string]: TDataTimer | undefined;
  };
  time: Record<string, number>;
};

const initialState: TTimerState = { timers: {}, time: {} };
const TimerContext = createContext<TTimerState>(initialState, { hookName: 'timer', logger: false });
const setState = makeSetState<TTimerState>(TimerContext);

const getTimer = (name: TTimerOptions['name']): TDataTimer | undefined => {
  return TimerContext.state.timers[name];
};
const setStateTime = (name: TTimerOptions['name'], time = 0): void => {
  // TODO: когда починится merge setState((prev) => ({ time: { ...prev.time, [name]: time } }));
  setState((prev) => ({ ...prev, time: { ...prev.time, [name]: time } }));
};
const setStateTimers = (name: TTimerOptions['name'], data?: TDataTimer): void => {
  setState((prev) => ({ ...prev, timers: { ...prev.timers, [name]: data } }));
};
const setStateTimersTime = (name: TTimerOptions['name'], time = 0): void => {
  const timer = getTimer(name);
  if (timer) {
    setState((prev) => ({ ...prev, timers: { ...prev.timers, [name]: { ...timer, time } } }));
  }
};

class TimerStore {
  static #onDone(name: TTimerOptions['name']) {
    const timer = getTimer(name);
    if (!timer) return;

    // if (timer.options.listen)
    //   this._event({ name, action: 'done', params: timer.options.params, callback: timer.options.callback });
    // Timeout при onDone выполнился сам
    if (timer.type === 'interval') {
      clearInterval(timer.clear);
    }
    if (typeof timer.options.callback === 'function' && timer.options.autoFinish) timer.options.callback();
    setStateTimers(name);
    setStateTime(name);
  }

  static #clearTimer(name: TTimerOptions['name']) {
    const timer = getTimer(name);
    if (!timer) return;

    // if (timer.options.listen)
    //   this._event({ name, action: 'cancel', params: timer.options.params, callback: timer.options.callback });
    if (timer.type === 'timeout') {
      clearTimeout(timer.clear);
    }
    if (timer.type === 'interval') {
      clearInterval(timer.clear);
    }
    setStateTimers(name);
    setStateTime(name);
  }

  static #startTimeout(time: number, options: TTimerOptions) {
    // if (options.listen)
    //   this._event({ name: options.name, action: 'start', params: options.params, callback: options.callback });
    setStateTimers(options.name, {
      type: 'timeout',
      time,
      options,
      clear: setTimeout(() => TimerStore.#onDone(options.name), time * 1000),
    });
  }

  static #startInterval(time: number, options: TTimerOptions) {
    // if (options.listen)
    //   this._event({ name: options.name, action: 'start', params: options.params, callback: options.callback });
    setStateTimers(options.name, {
      type: 'interval',
      time,
      options,
      clear: setInterval(() => {
        const timer = TimerContext.state.timers[options.name];
        if (!timer) return;

        const leftTime = Number(timer.time);
        if (leftTime > 0) {
          // if (options.listen)
          //   this._event({
          //     name: options.name,
          //     action: 'change',
          //     params: options.params,
          //     callback: options.callback,
          //     time: leftTime - 1,
          //   });
          setStateTimersTime(options.name, leftTime - 1);
          setStateTime(options.name, leftTime - 1);
        } else {
          TimerStore.#onDone(options.name);
        }
      }, 1000),
    });
  }

  public static setTimer(time: number, options: TTimerOptions): void {
    if (time <= 0) {
      setStateTime(options.name);
      return;
    }
    TimerStore.#clearTimer(options.name);

    setStateTime(options.name, time);
    if (options.observe) {
      TimerStore.#startInterval(time, options);
      return;
    }
    TimerStore.#startTimeout(time, options);
  }

  public static cancelTimer(name: string): void {
    this.#clearTimer(name);
  }

  public static clear(): void {
    Object.keys(TimerContext.state.timers).forEach((name) => {
      this.cancelTimer(name);
    });
  }

  /**
   * @deprecated use useSubscribe
   * @param name
   */
  public static getTime(name: string): number {
    return TimerContext.state.time[name] || 0;
  }
}

export default TimerStore;

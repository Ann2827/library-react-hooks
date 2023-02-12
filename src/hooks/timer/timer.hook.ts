import { useCallback } from 'react';
import type { ITimer } from './timer.types';
import data from './data';

const useTimer = (): ITimer => {
  return {
    time: {},
    expToTime: (exp) => exp - Math.floor(Date.now() / 1000),
    on: useCallback((fn) => data.on(fn), []),
    setTimer: useCallback((time, options) => data.setTimer(time, options), []),
    getTime: useCallback((name) => data.getTime(name), []),
    cancelTimer: useCallback((name) => data.cancelTimer(name), []),
    clear: useCallback(() => data.clear(), []),
    reset: useCallback(() => data.reset(), []),
  };
};

export default useTimer;

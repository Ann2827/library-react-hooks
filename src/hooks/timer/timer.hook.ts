import { useCallback, useEffect, useState } from 'react';
import type { ITimer } from './timer.types';
import data from './data';

const useTimer = (): ITimer => {
  const [time, setTime] = useState({ ...data.time });
  useEffect(() => {
    const clear = setInterval(() => {
      setTime({ ...data.time });
    }, 1000);
    return () => clearInterval(clear);
  }, []);
  const on = useCallback((fn) => data.on(fn), []);

  return {
    time,
    expToTime: (exp) => exp - Math.floor(Date.now() / 1000),
    on,
    setTimer: useCallback((time, options) => data.setTimer(time, options), []),
    getTime: useCallback((name) => data.getTime(name), []),
    cancelTimer: useCallback((name) => data.cancelTimer(name), []),
    clear: useCallback(() => data.clear(), []),
    reset: useCallback(() => data.reset(), []),
  };
};

export default useTimer;

import { useEffect, useState } from 'react';
import { TListenTime } from './timer.types';
import data from './data';
import { useDebounce } from '../helper';

const useListenTime = (): TListenTime => {
  const debounce = useDebounce();
  const [time, setTime] = useState({ ...data.time });
  useEffect(() => {
    let clearDebounce = () => {};
    const clearOn = data.on(() => {
      clearDebounce = debounce(() => setTime({ ...data.time }), 900);
    });
    return () => {
      clearDebounce();
      clearOn();
    };
  }, [debounce]);

  return time;
};

export default useListenTime;

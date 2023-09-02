import { useEffect, useState } from 'react';

import { useDebounce } from '../helper';

import { TListenTime } from './timer.types';
import data from './data';

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

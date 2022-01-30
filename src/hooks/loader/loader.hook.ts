import { useCallback, useEffect, useState } from 'react';
import { DataI, LoaderI } from './loader.types';

const data: DataI = {
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

const useLoader = (): LoaderI => {
  const [trigger, setTrigger] = useState(0);
  const [active, setActive] = useState(data.getActive());
  const loaderOn = useCallback(() => {
    data.activate();
    setTrigger((prev) => prev + 1);
  }, []);
  const loaderOff = useCallback(() => {
    data.determinate();
    setTrigger((prev) => prev + 1);
  }, []);
  const on = useCallback((fn) => data.on(fn), []);
  useEffect(() => {
    setActive(data.getActive());
  }, [trigger]);
  const loaderStop = useCallback(() => data.stop(), []);
  const _reset = useCallback(() => data._reset(), []);

  return { active, loaderOn, loaderOff, on, loaderStop, _reset };
};

export default useLoader;

export type TTimerOptions = {
  name: string;
  observe?: boolean;
  onExpired?: () => void | Promise<void>;
  autoFinish?: boolean;
  // вызывать всплывающие события
  dispatch?: boolean;
  params?: Record<string, unknown> | string;
};

export type TDataTimerType = 'timeout' | 'interval';
export type TDataTimer = {
  type: TDataTimerType;
  time: number;
  clear: NodeJS.Timeout;
  options: TTimerOptions;
};
export type TTimerEventAction = 'start' | 'change' | 'cancel' | 'done';
export type TTimerEvent = {
  name: TTimerOptions['name'];
  action: TTimerEventAction;
  params: TTimerOptions['params'];
  onExpired: TTimerOptions['onExpired'];
  time?: number;
};

export interface IData {
  _timers: {
    [K in string]: TDataTimer | undefined;
  };
  _onDone(options: TTimerOptions): void;
  _startTimeout(time: number, options: TTimerOptions): void;
  _startInterval(time: number, options: TTimerOptions): void;
  _event(event: TTimerEvent): void;
  setTimer(time: number, options: TTimerOptions): void;
  cancelTimer(name: string): void;
  clear(): void;
  getTime(name: string): number;
  on(fn: (event: TTimerEvent) => void): void;
  reset(): void;
}

export interface ITimer {
  /**
   * Resets the state
   */
  reset: IData['reset'];
  expToTime(exp: number): number;
  on: IData['on'];
  setTimer: IData['setTimer'];
  cancelTimer: IData['cancelTimer'];
  getTime: IData['getTime'];
  clear: IData['clear'];
}

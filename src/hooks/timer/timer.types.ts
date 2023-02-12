export type TTimerOptions = {
  /**
   * Timer name. For actions by name.
   */
  name: string;
  /**
   * When not observed, then timer runs in the background.
   * You won't get time changes in time state and with listeners (on)
   */
  observe?: boolean;
  /**
   * It can be received when listening to events.
   * For it to be called when the time expires, turn on `autoFinish`
   */
  callback?: () => void | Promise<void>;
  /**
   * To auto callback call when the time expires
   */
  autoFinish?: boolean;
  /**
   * If you want to listen to events using `on`.
   * Also, you needs to turn on `observe`.
   */
  listen?: boolean;
  /**
   * If you want to get the params passed at the start after the time has elapsed
   */
  params?: Record<string, unknown> | string;
};

/** @private **/
export type TDataTimerType = 'timeout' | 'interval';
/** @private **/
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
  callback: TTimerOptions['callback'];
  time?: number;
};
/** @private **/
export type TFn = (e: TTimerEvent) => void;

/**
 * @private
 * @ignore
 */
export interface IData {
  /** @protected **/
  _listeners: Array<TFn>;
  /** @protected **/
  _timers: {
    [K in string]: TDataTimer | undefined;
  };
  time: Record<string, number>;
  /** @protected **/
  _onDone(name: TTimerOptions['name']): void;
  /** @protected **/
  _clearTimer(name: TTimerOptions['name']): void;
  /** @protected **/
  _startTimeout(time: number, options: TTimerOptions): void;
  /** @protected **/
  _startInterval(time: number, options: TTimerOptions): void;
  /** @protected **/
  _event: TFn;
  // get time(): Record<string, number>;
  setTimer(time: number, options: TTimerOptions): void;
  cancelTimer(name: string): void;
  clear(): void;
  getTime(name: string): number;
  on(fn: TFn): () => void;
  reset(): void;
}

export interface ITimer {
  /**
   * @deprecated
   * Use useListenTime hook
   */
  time: IData['time'];
  expToTime(exp: number): number;
  on: IData['on'];
  setTimer: IData['setTimer'];
  cancelTimer: IData['cancelTimer'];
  getTime: IData['getTime'];
  clear: IData['clear'];
  /**
   * Full resets the state
   */
  reset: IData['reset'];
}

export type TListenTime = IData['time'];

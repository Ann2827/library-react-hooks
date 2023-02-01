export interface DataI {
  _active: boolean;
  _queue: number;
  _event(value: boolean): void;
  _reset(): void;
  activate(): void;
  determinate(): void;
  stop(): void;
  getActive(): boolean;
  on(fn: (value: boolean) => void): void;
}

export interface LoaderI {
  /**
   * Loader activity status
   */
  active: boolean;

  /**
   * Activate one (or one more) loader.
   */
  loaderOn: DataI['activate'];

  /**
   * Cancel one loader process.
   */
  loaderOff: DataI['determinate'];

  /**
   * Stop all loader processes.
   */
  loaderStop: DataI['stop'];

  /**
   * This function listens for the events of activate/determinate.
   */
  on: DataI['on'];

  /**
   * Resets the state
   */
  _reset: DataI['_reset'];
}

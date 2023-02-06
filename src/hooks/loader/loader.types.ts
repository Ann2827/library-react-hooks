export type TLoaderEvent = boolean;
/** @private **/
export type TFn = (e: TLoaderEvent) => void;

/**
 * @private
 * @ignore
 */
export interface DataI {
  /** @protected **/
  _listeners: Array<TFn>;
  /** @protected **/
  _active: boolean;
  /** @protected **/
  _queue: number;
  /** @protected **/
  _event: TFn;
  activate(): void;
  determinate(): void;
  stop(): void;
  getActive(): boolean;
  on(fn: TFn): () => void;
  reset(): void;
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
  _reset: DataI['reset'];
}

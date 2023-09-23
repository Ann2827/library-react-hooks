import { IData } from '../create';

export type TLoaderState = {
  active: boolean;
  quantity: number;
};

export type TLoaderEvent = {
  type: 'updated';
};
/**
 * @private
 * @ignore
 */
export interface ILoaderData extends IData<TLoaderState, TLoaderEvent> {
  activate(): void;
  determinate(): void;
  stop(): void;
  getActive(): boolean;
}

export interface ILoader {
  /**
   * Loader activity status
   */
  active: TLoaderState['active'];

  /**
   * Activate one (or one more) loader.
   */
  loaderOn: ILoaderData['activate'];

  /**
   * Cancel one loader process.
   */
  loaderOff: ILoaderData['determinate'];

  /**
   * Stop all loader processes.
   */
  loaderStop: ILoaderData['stop'];

  /**
   * This function listens for the events of activate/determinate.
   * @deprecated use useEffectOnLoader hook
   */
  on(fn: (e: boolean) => void): () => void;

  /**
   * Resets the state
   * @deprecated use reset method
   */
  _reset: ILoaderData['reset'];
  reset: ILoaderData['reset'];
}

/**
 * @deprecated use ILoader interface
 */
export type LoaderI = ILoader;

import { hookCreator } from '../create';

import { TLoaderEvent, TLoaderState, ILoaderData } from './loader.types';

const dataOptions = {
  hookName: 'loader',
  logger: false,
};
export const logsLoaderEnable = (): void => {
  dataOptions.logger = true;
};

export const [data, useEffectOnLoader] = hookCreator<TLoaderState, TLoaderEvent, ILoaderData>(
  (d) => ({
    ...d,
    activate() {
      this._updateState({ type: 'updated' }, { active: true, quantity: this._state.quantity + 1 });
    },
    stop() {
      this._updateState({ type: 'updated' }, { active: false, quantity: 0 });
    },
    determinate() {
      if (this._state.quantity > 1) {
        this._updateState({ type: 'updated' }, { active: true, quantity: this._state.quantity - 1 });
        return;
      }

      this.stop();
    },
    getActive() {
      return this._state.active;
    },
  }),
  { active: false, quantity: 0 },
  dataOptions,
);

import { IData, IDataOptions, TDataEvent, TDataState, TUseEffectOn } from './create.types';
import { createData } from './data';
import { makeCreateOn } from './create.hook';

export const hookCreator = <S extends TDataState = {}, E extends TDataEvent = {}, D extends IData<S, E> = IData<S, E>>(
  enrich: (d: IData<S, E>) => D,
  initialState: S,
  options?: Partial<IDataOptions>,
): [D, TUseEffectOn<S, E>] => {
  const currentData: D = enrich(createData<S, E>(initialState, options));
  return [currentData, makeCreateOn<S, E, D>(currentData)];
};

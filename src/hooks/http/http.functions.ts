import data from './data';
import { DataI } from './http.types';

const getPairs = (obj: Record<string, unknown>, keys = []) =>
  Object.entries(obj).reduce((pairs, [key, value]) => {
    if (typeof value === 'object') {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pairs.push(...getPairs(value, [...keys, key]));
    } else {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      pairs.push([[...keys, key], value]);
    }
    return pairs;
  }, []);

export const convertQuery = (object: unknown): string => {
  if (typeof object === 'string') return object;
  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    getPairs(object)
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      .map(([[key0, ...keysRest], value]) => `${key0}${keysRest.map((a) => `[${a}]`).join('')}=${value}`)
      .join('&')
  );
};

export const httpInit = (
  props: Partial<
    Pick<
      DataI,
      | 'loader'
      | 'toast'
      | 'tokens'
      | 'requests'
      | 'onError'
      | 'responseFormat'
      | 'blockRepeatWhenPending'
      | 'toastWhenBackendUnavailable'
    >
  >,
) => {
  return data.setInit(props);
};

// @ts-ignore
export const successFn = (props?: any): boolean => {
  return true;
};

// export const fnHttp = (): Pick<HttpI, '_reset'> => {
//   return {
//     request: (props) => request(props)
//   };
// };

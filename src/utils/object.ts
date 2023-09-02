export const arrToStr = (arr?: string[] | string, splitter = ', '): string => {
  if (!arr) return '';
  if (typeof arr === 'string') return arr;
  return arr.join(splitter);
};

export const unflattenItem = (keys: string[], value: unknown): Record<string, unknown> => {
  const [firstKey] = keys;
  if (!firstKey) return {};
  if (keys.length === 1) return { [firstKey]: value };

  return { [firstKey]: unflattenItem(keys.slice(1), value) };
};
export const unflatten = <T>(obj: Record<string, unknown>, separator = '.'): T => {
  return Object.entries(obj).reduce<T>((prev, [key, value]) => {
    return { ...prev, ...unflattenItem(key.split(separator), value) };
  }, {} as T);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
type KeysStartingWith<Set, Needle extends string> = Set extends `${Needle}${infer _X}` ? Set : never;
type PickByNotStartingWith<T, NotStartWith extends string> = Omit<T, KeysStartingWith<keyof T, NotStartWith>>;
export type TOnlyPublic<T> = PickByNotStartingWith<T, '_'>;
export const onlyPublic = <T extends Record<string, unknown>>(obj: T): TOnlyPublic<T> => {
  const updateObj = Object.assign({}, obj);
  (Object.keys(updateObj) as Array<keyof typeof updateObj>).forEach((key) => {
    if (typeof key === 'string' && key[0] === '_') delete updateObj[key];
  });
  return updateObj;
};

export const cleanObjKeys = <T extends Object = Object, D = Partial<T>>(reference: T, dirty: D): D => {
  const result = {} as D;
  if (Array.isArray(reference)) return dirty;
  if (typeof reference === 'object' && dirty && typeof dirty === 'object') {
    (Object.keys(reference) as Array<keyof typeof reference>).forEach((key) => {
      if (!(key in dirty)) return;

      const referenceValue = reference[key];
      result[key as keyof D] = typeof referenceValue === 'object' ? cleanObjKeys(referenceValue as Object, dirty[key as keyof D]) : dirty[key as keyof D];
    });
  }
  return result;
};

// /* eslint-disable */
// export type Flatten<T extends object> = object extends T ? object : {
//   [K in keyof T]-?: (x: NonNullable<T[K]> extends infer V ? V extends object ?
//     V extends readonly any[] ? Pick<T, K> : Flatten<V> extends infer FV ? ({
//       [P in keyof FV as `${Extract<K, string | number>}.${Extract<P, string | number>}`]:
//       FV[P] }) : never : Pick<T, K> : never
//   ) => void } extends Record<keyof T, (y: infer O) => void> ?
//   O extends infer U ? { [K in keyof O]: O[K] } : never : never;
/* eslint-enable */

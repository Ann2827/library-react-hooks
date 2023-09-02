// global.d.ts
declare global {
  interface ObjectConstructor {
    keys<T>(obj: T): Array<keyof T>;
  }
}

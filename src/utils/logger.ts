export const loggerState = (hookName: string, oldState: unknown, newState: unknown) => {
  console.group(`Hook ${hookName}`);
  console.info('Old state: ', oldState);
  console.info('New state: ', newState);
  console.groupCollapsed('Trace');
  console.trace('Trace');
  console.groupEnd();
  console.groupEnd();
};

export const loggerMessage = (hookName: string, message: string) => {
  console.group(`Hook ${hookName}`);
  console.info(message);
  console.groupCollapsed('Trace');
  console.trace('Trace');
  console.groupEnd();
  console.groupEnd();
};

const defaultKeys = ['log', 'warn', 'error'];

// const arrToStr = (arr?: string[] | string, splitter = ', '): string => {
//   if (!arr) return '';
//   if (typeof arr === 'string') return arr;
//   return arr.join(splitter);
// };

const mockConsole = (mockArg?: unknown) => {
  const originalConsole = { ...console };
  // No argument
  if (!mockArg) {
    defaultKeys.forEach((key) => {
      global.console[key] = jest.fn();
    });
  }
  // Argument is a string
  else if (typeof mockArg === 'string' || mockArg instanceof String) {
    global.console[mockArg] = jest.fn();
  }
  // Argument is an array
  else if (Array.isArray(mockArg)) {
    mockArg.forEach((key) => {
      global.console[key] = jest.fn();
    });
  }
  // Argument is an object
  else {
    Object.keys(mockArg).forEach((key) => {
      global.console[key] = mockArg[key];
    });
  }
  // Return function to restore console
  return () => {
    global.console = originalConsole;
  };
};

export default mockConsole;

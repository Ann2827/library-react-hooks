import { renderHook } from '@testing-library/react-hooks';

import { toastSettings, useToast, RecursivePartial, ToastSettingsI } from '.';

const settings: RecursivePartial<ToastSettingsI> = {
  sticky: false,
  duration: 6000,
  duplicate: true,
  types: {
    error: {
      title: 'Test',
      console: false,
    },
  },
};

// https://www.albertgao.xyz/2019/11/05/how-to-test-react-redux-hooks-via-jest/
describe('toast.hook function:', () => {
  beforeEach(() => {
    const { result } = renderHook(() => useToast());
    result.current._reset();
  });

  test('toastSettings: should settings set', () => {
    toastSettings({ ...settings });
    const { result } = renderHook(() => useToast());
    result.current.alert({ text: 'Text', type: 'error' });
    expect(result.current.data).toEqual([
      {
        actions: undefined,
        icon: '',
        id: 1,
        tag: undefined,
        group: undefined,
        text: 'Text',
        title: 'Test',
        type: 'error',
        color: '',
        titleDefault: true,
      },
    ]);
  });
});

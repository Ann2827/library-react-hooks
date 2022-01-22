import { toastSettings, useToast } from './toast.hook';
import { RecursivePartial, ToastSettingsI } from './toast.types';

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

describe('toast.hook function:', () => {
  test('toastSettings: should settings set', () => {
    toastSettings({ ...settings });
    const { alert, data } = useToast();
    alert({ text: 'Text', type: 'error' });
    expect(data).toEqual([
      {
        actions: undefined,
        icon: '',
        id: 1,
        tag: undefined,
        text: 'Text',
        title: 'Test',
        type: 'error',
      },
    ]);
  });
});

import { RecursivePartial, ToastI, ToastSettingsI } from './toast.types';
import toastAlert from './toast.alert';
import { data } from './data';

export const toastSettings = (props: RecursivePartial<ToastSettingsI>): void => {
  data.updateSettings(props);
};

export const fnToast = (): Pick<ToastI, 'alert' | 'clear'> => {
  return {
    alert: toastAlert,
    clear: (id) => data.determinate(id),
  };
};

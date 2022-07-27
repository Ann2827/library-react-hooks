import { RecursivePartial, ToastI, ToastSettingsI } from './toast.types';
import toastAlert from './toast.alert';
import { data, initialSettings } from './data';

export const toastSettings = (props: RecursivePartial<ToastSettingsI>): void => {
  data.settings = {
    sticky: props.sticky ?? initialSettings.sticky,
    duration: props.duration ?? initialSettings.duration,
    duplicate: props.duplicate ?? initialSettings.duplicate,
    limit: props.limit ?? initialSettings.limit,
    types: {
      error: { ...initialSettings.types.error, ...props.types?.error },
      warning: { ...initialSettings.types.warning, ...props.types?.warning },
      info: { ...initialSettings.types.info, ...props.types?.info },
      success: { ...initialSettings.types.success, ...props.types?.success },
    },
  };
};

export const fnToast = (): Pick<ToastI, 'alert' | 'clear'> => {
  return {
    alert: toastAlert,
    clear: (id) => data.determinate(id),
  };
};

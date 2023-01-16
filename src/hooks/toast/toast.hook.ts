import type { ToastI } from './toast.types';
import { useMemo } from 'react';
import { data } from './data';
import toastAlert from './toast.alert';

// TODO: add onClose
// TODO: add onError for sentry

const useToast = (): ToastI =>
  useMemo(
    () => ({
      data: data.getData(),
      on: (fn) => data.on(fn),
      clear: (idOrGroup) => data.determinate(idOrGroup),
      alert: toastAlert,
      setTypes: (props) => data.updateSettings({ types: props }),
      setTranslationFn: (fn) => data.setTranslationFn(fn),
      _reset: () => data._reset(),
    }),
    [],
  );

export default useToast;

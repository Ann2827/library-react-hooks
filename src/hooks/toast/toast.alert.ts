import { ToastPropsT } from './toast.types';
import { data } from './data';

const toastAlert = ({ text, type = 'error', duration, sticky, title, actions, tag }: ToastPropsT): void => {
  data.activate({ text, type, duration, sticky, title, actions, tag });

  if (type === 'error' && data.console('error'))
    console.error('%c Error ', 'color: white; background-color: #FF1744; border-radius: 5px', text);
  if (type === 'warning' && data.console('warning'))
    console.warn('%c Warning ', 'color: white; background-color: #F57C00; border-radius: 5px', text);
  if (type === 'info' && data.console('info'))
    console.info('%c Info ', 'color: white; background-color: #00B0FF; border-radius: 5px', text);
  if (type === 'success' && data.console('success'))
    console.info('%c Success ', 'color: white; background-color: #00C853; border-radius: 5px', text);
};

export default toastAlert;

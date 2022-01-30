import type { DataI, RecursivePartial, ToastDataObject, ToastI, ToastPropsT, ToastSettingsI } from './toast.types';
import { useMemo } from 'react';

const initialSettings: ToastSettingsI = {
  sticky: false,
  duration: 3000,
  duplicate: true,
  types: {
    error: {
      title: '',
      icon: '',
      console: true,
      color: '',
    },
    warning: {
      title: '',
      icon: '',
      console: true,
      color: '',
    },
    info: {
      title: '',
      icon: '',
      console: false,
      color: '',
    },
    success: {
      title: '',
      icon: '',
      console: false,
      color: '',
    },
  },
};

const data: DataI = {
  lastID: 0,
  data: [],
  timeouts: [],
  settings: { ...initialSettings },
  activate({ text, type, duration, sticky, title, actions, tag }) {
    if (!this.settings.duplicate && tag && this.data.find((item) => item.tag === tag)) {
      return;
    }

    this.lastID += 1;
    const id = this.lastID;
    const updated: ToastDataObject = {
      text,
      type,
      id,
      title: title ?? this.settings.types[type].title,
      actions: actions?.map((item) => ({
        text: item.text,
        action: () => {
          item.action();
          this.determinate(id);
        },
      })),
      tag,
      icon: this.settings.types[type].icon,
      color: this.settings.types[type].color,
    };
    this.data.push(updated);

    const time = duration ?? this.settings.duration;
    if (!(sticky ?? this.settings.sticky) && time) {
      const timeout = setTimeout(() => {
        this.determinate(id);
        this.timeouts = this.timeouts.filter((item) => item.id !== id);
      }, time);
      this.timeouts.push({ id, clear: timeout });
    }

    this.event(this.data);
  },
  determinate(id) {
    let updated: ToastDataObject[] = [];
    let timeouts: DataI['timeouts'] = [];
    if (id) {
      updated = this.data.filter((item) => item.id !== id);
      const timeout = this.timeouts.find((item) => item.id === id);
      if (timeout) clearTimeout(timeout.clear);
      timeouts = this.timeouts.filter((item) => item.id !== id);
    }
    this.data = updated;
    this.timeouts = timeouts;

    this.event(updated);
  },
  getData() {
    return this.data;
  },
  on(fn) {
    this.event = fn;
  },
  // @ts-ignore
  event(data) {},
  console(type) {
    return this.settings.types[type].console;
  },
  _reset() {
    this.lastID = 0;
    this.data = [];
    this.timeouts = [];
    this.settings = { ...initialSettings };
    // @ts-ignore
    this.event = (data) => {};
  },
};

export const toastSettings = (props: RecursivePartial<ToastSettingsI>): void => {
  data.settings = {
    sticky: props.sticky ?? initialSettings.sticky,
    duration: props.duration ?? initialSettings.duration,
    duplicate: props.duplicate ?? initialSettings.duplicate,
    types: {
      error: { ...initialSettings.types.error, ...props.types?.error },
      warning: { ...initialSettings.types.warning, ...props.types?.warning },
      info: { ...initialSettings.types.info, ...props.types?.info },
      success: { ...initialSettings.types.success, ...props.types?.success },
    },
  };
};

// TODO: add onClose
// TODO: add onError for sentry

export const useToast = (): ToastI =>
  useMemo(
    () => ({
      data: data.getData(),
      on: (fn) => data.on(fn),
      clear: (id) => data.determinate(id),
      alert: ({ text, type = 'error', duration, sticky, title, actions, tag }: ToastPropsT) => {
        data.activate({ text, type, duration, sticky, title, actions, tag });

        if (type === 'error' && data.console('error'))
          console.error('%c Error ', 'color: white; background-color: #FF1744; border-radius: 5px', text);
        if (type === 'warning' && data.console('warning'))
          console.warn('%c Warning ', 'color: white; background-color: #F57C00; border-radius: 5px', text);
        if (type === 'info' && data.console('info'))
          console.info('%c Info ', 'color: white; background-color: #00B0FF; border-radius: 5px', text);
        if (type === 'success' && data.console('success'))
          console.info('%c Success ', 'color: white; background-color: #00C853; border-radius: 5px', text);
      },
      _reset: () => data._reset(),
    }),
    [],
  );

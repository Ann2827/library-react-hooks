import { DataI, ToastDataObject, ToastSettingsI } from './toast.types';

export const initialSettings: ToastSettingsI = {
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

export const data: DataI = {
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

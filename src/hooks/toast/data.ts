import { DataI, ToastDataObject, ToastSettingsI, TToastTranslationFn } from './toast.types';

const initialTranslationFn: TToastTranslationFn = (key, _options) => key;

export const initialSettings: ToastSettingsI = {
  sticky: false,
  duration: 3000,
  duplicate: true,
  limit: undefined,
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
  translationFn: initialTranslationFn,
  updateAlerts() {
    if (this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        const titleData = this.data[i].titleData;
        if (typeof titleData === 'object') {
          this.data[i].title = this.translationFn(titleData.key, titleData.options);
        }
        const textData = this.data[i].textData;
        if (typeof textData === 'object') {
          this.data[i].text = this.translationFn(textData.key, textData.options);
        }
        const actions = this.data[i].actions;
        if (actions && actions.length) {
          for (let j = 0; j < actions.length; j++) {
            const actionData = actions[j].actionData;
            if (typeof actionData === 'object') {
              this.data[i].actions![j].text = this.translationFn(actionData.key, actionData.options);
            }
          }
        }
      }
      this.event(this.data);
    }
  },
  setTranslationFn(fn) {
    this.translationFn = fn;
    this.updateAlerts();
  },
  updateSettings(props) {
    this.settings = {
      sticky: props.sticky ?? this.settings.sticky,
      duration: props.duration ?? this.settings.duration,
      duplicate: props.duplicate ?? this.settings.duplicate,
      limit: props.limit ?? this.settings.limit,
      types: {
        error: { ...this.settings.types.error, ...props.types?.error },
        warning: { ...this.settings.types.warning, ...props.types?.warning },
        info: { ...this.settings.types.info, ...props.types?.info },
        success: { ...this.settings.types.success, ...props.types?.success },
      },
    };
    // TODO: использовать
    // this.updateAlerts();
    if (this.data.length > 0) {
      for (let i = 0; i < this.data.length; i++) {
        const type = this.data[i].type;
        this.data[i].icon = this.settings.types[type].icon;
        this.data[i].title = this.settings.types[type].title;
        this.data[i].color = this.settings.types[type].color;
      }
      this.event(this.data);
    }
  },
  activate({ text, type, duration, sticky, title, actions, tag, titleData, textData }) {
    if (!this.settings.duplicate && tag && this.data.find((item) => item.tag === tag)) {
      return;
    }

    this.lastID += 1;
    const id = this.lastID;
    const alertTitle = titleData
      ? this.translationFn(titleData.key, titleData.options)
      : title ?? this.settings.types[type].title;
    const alertText = textData ? this.translationFn(textData.key, textData.options) : text;
    const updated: ToastDataObject = {
      text: alertText,
      type,
      id,
      title: alertTitle,
      actions: actions?.map((item) => {
        const alertAction = item.actionData
          ? this.translationFn(item.actionData.key, item.actionData.options)
          : item.text;
        return {
          text: alertAction,
          action: () => {
            item.action();
            this.determinate(id);
          },
        };
      }),
      tag,
      icon: this.settings.types[type].icon,
      color: this.settings.types[type].color,
      titleDefault: !title,
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

    if (this.settings.limit) {
      this.event(this.data.slice(-this.settings.limit));
    } else this.event(this.data);
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

    if (this.settings.limit) {
      this.event(updated.slice(-this.settings.limit));
    } else this.event(updated);
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
    this.translationFn = initialTranslationFn;
  },
};

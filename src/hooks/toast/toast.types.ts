import { ReactNode } from 'react';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * Возможные типы сообщений
 */
export type ToastTypes = 'error' | 'warning' | 'info' | 'success';

export type ToastDataObject = {
  id: number;
  icon: string | ReactNode;
  text: string;

  /**
   * default = error
   */
  type: ToastTypes;

  /**
   * Если задан постоянный заголовок для типа в settings, то он будет
   * перезаписан текущим для данного сообщения
   */
  title?: string;

  /**
   * Можно использовать например для кнопок
   */
  actions?: {
    text: string;
    action(...props: any): void;
  }[];

  /**
   * Используется для duplicate = false. Так же можно использовать для
   * дополнительных пометок
   */
  tag?: string;
};

type SettingsData = {
  /**
   * Постоянный заголовок для данного типа
   */
  title: string;

  /**
   * Постоянная иконка для данного типа
   */
  icon: string | ReactNode;

  /**
   * Следует ли дополнительно выводить сообщение в консоль для этого типа
   * default: error = true, warning = true
   */
  console: boolean;

  /**
   * Цвет темы, класс..
   */
  color: string;
};

/**
 * Постоянные настройки для всех сообщений
 */
export interface ToastSettingsI {
  /**
   * Не скрывать сообщение автоматически при sticky=true (default = false)
   */
  sticky: boolean;

  /**
   * Длительность показа сообщения
   */
  duration: number;

  /**
   * Появилось сообщение, но такое уже висит. Если следует показать оба, то
   * true, если дублировать не следует, то false и сообщения должны иметь tag
   * (default = true)
   */
  duplicate: boolean;

  /**
   * Настройки по типам
   */
  types: {
    error: SettingsData;
    warning: SettingsData;
    info: SettingsData;
    success: SettingsData;
  };
}

/**
 * Параметры для создания сообщения:
 * - text - текст сообщения
 * - type - error, warning, info, success (default = error)
 * - duration - длительность показа сообщения в ms (default = 3000)
 */
export type ToastPropsT = Omit<Omit<ToastDataObject, 'id'>, 'icon'> & { duration?: number; sticky?: boolean };

export interface DataI {
  lastID: number;
  data: ToastDataObject[];
  timeouts: {
    id: number;
    clear: NodeJS.Timeout;
  }[];
  settings: ToastSettingsI;
  activate(props: ToastPropsT): void;
  determinate(id?: number): void;
  getData(): DataI['data'];
  on(fn: (data: ToastDataObject[]) => void): void;
  event(data: ToastDataObject[]): void;
  console(type: ToastTypes): boolean;
}

export interface ToastI {
  /**
   * Возвращает массив активных сообщений.
   */
  data: DataI['data'];

  /**
   * Слушает все события добавления/удаления.
   */
  on: DataI['on'];

  /**
   * Функция очистки всех висящих сообщений (при отсутствии параметра id)
   * или удаления одного сообщения (при наличии id).
   */
  clear: DataI['determinate'];

  /**
   * Функция диспатчит новое сообщение.
   */
  alert({ text, type, duration }: ToastPropsT): void;
}

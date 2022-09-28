import { ReactNode } from 'react';

export type RecursivePartial<T> = {
  [P in keyof T]?: RecursivePartial<T[P]>;
};

/**
 * Possible message types
 */
export type ToastTypes = 'error' | 'warning' | 'info' | 'success';

export type ToastDataObject = {
  id: number;
  icon: string | ReactNode;
  text?: string;
  color: string;

  /**
   * default = error
   */
  type: ToastTypes;

  /**
   * If a permanent header is set in settings, it will be overwritten with
   * the current one for this message.
   */
  title?: string;

  /**
   * Buttons
   */
  actions?: {
    text: string;
    action(...args: any): void;
  }[];

  /**
   * Used for duplicate = false. It can also be used for additional notes
   */
  tag?: string;

  /**
   * The default title was used
   */
  titleDefault?: boolean;
};

type SettingsData = {
  /**
   * Title for this type
   */
  title: string;

  /**
   * Permanent icon for this type
   */
  icon: string | ReactNode;

  /**
   * Allows you to additionally output a message to the console.
   * default: error = true, warning = true
   */
  console: boolean;

  /**
   * Theme color or class
   */
  color: string;
};

/**
 * Permanent settings for all messages
 */
export interface ToastSettingsI {
  /**
   * Do not hide the message automatically when sticky=true (default = false)
   */
  sticky: boolean;

  /**
   * Duration of the message display (default = 3000)
   */
  duration: number;

  /**
   * Allows you to duplicate a message while the same is already hanging.
   * When is false, you need to set tag for alert. If the tag is not specified, the message will be duplicated.
   * (default = true)
   */
  duplicate: boolean;

  /**
   * Max visible notifications.
   */
  limit?: number;

  /**
   * Settings by types
   */
  types: {
    error: SettingsData;
    warning: SettingsData;
    info: SettingsData;
    success: SettingsData;
  };
}

/**
 * Parameters for message creating:
 * - text - message text
 * - type - error, warning, info, success (default = error)
 * - duration? - the duration of the message display in ms (default = 3000)
 * - sticky? - leave a message hanging (default = false)
 * - title? - redefine the header
 * - actions? - buttons for this message
 */
export type ToastPropsT = Omit<Omit<Omit<ToastDataObject, 'id'>, 'icon'>, 'color'> & {
  duration?: number;
  sticky?: boolean;
};

export interface DataI {
  lastID: number;
  data: ToastDataObject[];
  timeouts: {
    id: number;
    clear: NodeJS.Timeout;
  }[];
  settings: ToastSettingsI;
  updateSettings(props: RecursivePartial<ToastSettingsI>): void;
  activate(props: ToastPropsT): void;
  determinate(id?: number): void;
  getData(): DataI['data'];
  on(fn: (data: ToastDataObject[]) => void): void;
  event(data: ToastDataObject[]): void;
  console(type: ToastTypes): boolean;
  _reset(): void;
}

export interface ToastI {
  /**
   * Returns an array of active messages.
   */
  data: DataI['data'];

  /**
   * Listens for all add/remove events.
   */
  on: DataI['on'];

  /**
   * The function clears all hanging messages (if id undefined)
   * or delete one message (if id is defined).
   */
  clear: DataI['determinate'];

  /**
   * The function dispatches a new message.
   */
  alert({ text, type, duration }: ToastPropsT): void;

  /**
   * Dynamic updating settings types
   */
  setTypes(props: RecursivePartial<ToastSettingsI['types']>): void;

  /**
   * Resets the state
   */
  _reset: DataI['_reset'];
}

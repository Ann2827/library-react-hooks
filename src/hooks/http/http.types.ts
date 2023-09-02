export type HttpRequest<T = unknown> = {
  url: string;
  method?: 'GET' | 'POST' | 'DELETE' | 'PUT';
  body?: null | Record<string, unknown>;
  headers?: Record<string, unknown>;
  query?: unknown;
  token?: string;
  answer?: boolean;
  toast?: boolean;
  successMsg?: string;
  loader?: boolean;
  toastWhenCode?: boolean;
  format?: boolean;
  toastRules?: (httpData: any) => boolean;
  return?: () => T | HttpAnswer;
};

// eslint-disable-next-line @typescript-eslint/no-namespace
export declare namespace HttpHook {
  type Requests = {
    [K in string]: <P = any>(props?: P) => HttpRequest;
  };
  type FunctionKeys = keyof Requests;
}

export type HttpAnswer = boolean | number;

export type EventT = {
  action: 'token';
  type: 'change';
  status: boolean;
};

export type DataIStates = 'pending' | 'success' | 'error';

export interface DataI {
  _states: {
    [K in string]: DataIStates;
  };
  loader: boolean;
  toast: boolean;
  blockRepeatWhenPending: boolean;
  toastWhenBackendUnavailable: boolean;
  tokens: {
    [K in string]: string | null;
  };
  requests: HttpHook.Requests | null;
  errors: {
    [K in number]: string;
  };
  _event(e: EventT): void;
  _reset(): void;
  onError(response: Response): void;
  responseFormat(d: any): any;
  setOnError(fn: (response: Response) => void): void;
  setInit(
    props: Partial<
      Pick<
        this,
        | 'loader'
        | 'toast'
        | 'tokens'
        | 'requests'
        | 'onError'
        | 'errors'
        | 'responseFormat'
        | 'blockRepeatWhenPending'
        | 'toastWhenBackendUnavailable'
      >
    >,
  ): void;
  getLoader(): boolean;
  getToast(): boolean;
  getToken(name: string): string | null | undefined;
  setToken(name: string, value: string | null): void;
  getTokens(): this['tokens'];
  getError(status: number): string | undefined;
  getRequest(name: HttpHook.FunctionKeys, props?: any): HttpRequest | undefined;
  checkReady(requestName: string): boolean;
  setState(url: string, state: DataIStates): void;
  getState(url: string): DataIStates | undefined;
  on(fn: (e: EventT) => void): void;
}

export interface HttpI {
  /**
   * Get errors
   */
  error: {
    [K in string]: {
      text: string;
      code: number;
    } | null;
  };

  /**
   * Clear errors
   */
  clearError(): void;

  /**
   * Http request
   */
  request<T = unknown>({
    url,
    method,
    body,
    headers,
    query,
    token,
    answer,
    toast,
    successMsg,
    loader,
    format,
  }: HttpRequest): Promise<HttpAnswer | T>;

  /**
   * Put new token
   */
  setToken: DataI['setToken'];

  /**
   * Redefining error text
   */
  setErrors(props: DataI['errors']): void;

  /**
   * Executes a query by name. To use it, you need to configure the requests config (httpInit)
   */
  requestByName<T extends keyof HttpHook.Requests>(name: T, props?: any): Promise<HttpAnswer | HttpHook.Requests[T]>;

  /**
   * Checks for the presence of a token for requestByName
   */
  ready(checkReady: HttpHook.FunctionKeys): boolean;

  /**
   * Resets the state
   */
  _reset: DataI['_reset'];
}

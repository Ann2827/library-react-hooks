import { DataI } from './http.types';

const data: DataI = {
  _states: {},
  loader: true,
  toast: true,
  blockRepeatWhenPending: true,
  toastWhenBackendUnavailable: true,
  tokens: {},
  requests: {},
  errors: {},
  _event(_d) {},
  _reset() {
    this.loader = true;
    this.toast = true;
    this.tokens = {};
    this.requests = {};
    this.errors = {};
    this._states = {};
    this.onError = (_response) => {};
    this.responseFormat = (d) => {
      return d;
    };
  },
  onError(_response) {},
  responseFormat(d) {
    return d;
  },
  setOnError(fn) {
    this.onError = fn;
  },
  setInit(props) {
    if ('loader' in props && typeof props.loader === 'boolean') this.loader = props.loader;
    if ('toast' in props && typeof props.toast === 'boolean') this.toast = props.toast;
    if ('tokens' in props && typeof props.tokens === 'object') this.tokens = props.tokens;
    if ('requests' in props && typeof props.requests === 'object') this.requests = props.requests;
    if ('onError' in props && typeof props.onError === 'function') this.onError = props.onError;
    if ('errors' in props && typeof props.errors === 'object') this.errors = props.errors;
    if ('responseFormat' in props && typeof props.responseFormat === 'function')
      this.responseFormat = props.responseFormat;
    if ('blockRepeatWhenPending' in props && typeof props.blockRepeatWhenPending === 'boolean')
      this.blockRepeatWhenPending = props.blockRepeatWhenPending;
    if ('toastWhenBackendUnavailable' in props && typeof props.toastWhenBackendUnavailable === 'boolean')
      this.toastWhenBackendUnavailable = props.toastWhenBackendUnavailable;
  },
  getLoader() {
    return this.loader;
  },
  getToast() {
    return this.toast;
  },
  getToken(name) {
    return Object.keys(this.tokens).find((key) => key === name);
  },
  setToken(name, value) {
    if (name in this.tokens) {
      this.tokens[name] = value;
      this._event({ action: 'token', type: 'change', status: !!value });
    }
  },
  getError(status) {
    return this.errors[status];
  },
  getRequest(name, props) {
    if (this.requests && name in this.requests) return this.requests[name](props);
    return;
  },
  getTokens() {
    return this.tokens;
  },
  checkReady(requestName) {
    if (!this.requests || !(requestName in this.requests)) return true;
    const tokenName = this.requests[requestName]({}).token;
    if (!tokenName) return true;
    return Boolean(this.tokens[tokenName]);
  },
  setState(url, state) {
    this._states[url] = state;
  },
  getState(url) {
    return this._states?.[url];
  },
  on(fn) {
    this._event = fn;
  },
};

export default data;

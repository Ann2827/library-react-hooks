function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

var initialSettings = {
  sticky: false,
  duration: 3000,
  duplicate: true,
  types: {
    error: {
      title: '',
      icon: '',
      console: true,
      color: ''
    },
    warning: {
      title: '',
      icon: '',
      console: true,
      color: ''
    },
    info: {
      title: '',
      icon: '',
      console: false,
      color: ''
    },
    success: {
      title: '',
      icon: '',
      console: false,
      color: ''
    }
  }
};
var data = {
  lastID: 0,
  data: [],
  timeouts: [],
  settings: _extends({}, initialSettings),
  activate: function activate(_ref) {
    var _this = this;

    var text = _ref.text,
        type = _ref.type,
        duration = _ref.duration,
        sticky = _ref.sticky,
        title = _ref.title,
        actions = _ref.actions,
        tag = _ref.tag;

    if (!this.settings.duplicate && tag && this.data.find(function (item) {
      return item.tag === tag;
    })) {
      return;
    }

    this.lastID += 1;
    var id = this.lastID;
    this.data.push({
      text: text,
      type: type,
      id: id,
      title: title != null ? title : this.settings.types[type].title,
      actions: actions,
      tag: tag,
      icon: this.settings.types[type].icon
    });
    var time = this.settings.duration || duration;

    if (!this.settings.sticky && !sticky && time) {
      var timeout = setTimeout(function () {
        _this.determinate(id);

        _this.timeouts = _this.timeouts.filter(function (item) {
          return item.id !== id;
        });
      }, time);
      this.timeouts.push({
        id: id,
        clear: timeout
      });
    }

    this.event(this.data);
  },
  determinate: function determinate(id) {
    var updated = [];
    var timeouts = [];

    if (id) {
      updated = this.data.filter(function (item) {
        return item.id !== id;
      });
      var timeout = this.timeouts.find(function (item) {
        return item.id === id;
      });
      if (timeout) clearTimeout(timeout.clear);
      timeouts = this.timeouts.filter(function (item) {
        return item.id !== id;
      });
    }

    this.data = updated;
    this.timeouts = timeouts;
    this.event(updated);
  },
  getData: function getData() {
    return this.data;
  },
  on: function on(fn) {
    this.event = fn;
  },
  event: function event(data) {},
  console: function console(type) {
    return this.settings.types[type].console;
  }
};
var toastSettings = function toastSettings(props) {
  var _props$sticky, _props$duration, _props$duplicate, _props$types, _props$types2, _props$types3, _props$types4;

  data.settings = {
    sticky: (_props$sticky = props.sticky) != null ? _props$sticky : initialSettings.sticky,
    duration: (_props$duration = props.duration) != null ? _props$duration : initialSettings.duration,
    duplicate: (_props$duplicate = props.duplicate) != null ? _props$duplicate : initialSettings.duplicate,
    types: {
      error: _extends({}, initialSettings.types.error, (_props$types = props.types) === null || _props$types === void 0 ? void 0 : _props$types.error),
      warning: _extends({}, initialSettings.types.warning, (_props$types2 = props.types) === null || _props$types2 === void 0 ? void 0 : _props$types2.warning),
      info: _extends({}, initialSettings.types.info, (_props$types3 = props.types) === null || _props$types3 === void 0 ? void 0 : _props$types3.info),
      success: _extends({}, initialSettings.types.success, (_props$types4 = props.types) === null || _props$types4 === void 0 ? void 0 : _props$types4.success)
    }
  };
};
var useToast = function useToast() {
  return {
    data: data.getData(),
    on: function on(fn) {
      return data.on(fn);
    },
    clear: function clear(id) {
      return data.determinate(id);
    },
    alert: function alert(_ref2) {
      var text = _ref2.text,
          _ref2$type = _ref2.type,
          type = _ref2$type === void 0 ? 'error' : _ref2$type,
          duration = _ref2.duration,
          sticky = _ref2.sticky,
          title = _ref2.title,
          actions = _ref2.actions,
          tag = _ref2.tag;
      data.activate({
        text: text,
        type: type,
        duration: duration,
        sticky: sticky,
        title: title,
        actions: actions,
        tag: tag
      });
      if (type === 'error' && data.console('error')) console.error('%c Error ', 'color: white; background-color: #FF1744; border-radius: 5px', text);
      if (type === 'warning' && data.console('warning')) console.warn('%c Warning ', 'color: white; background-color: #F57C00; border-radius: 5px', text);
      if (type === 'info' && data.console('info')) console.info('%c Info ', 'color: white; background-color: #00B0FF; border-radius: 5px', text);
      if (type === 'success' && data.console('success')) console.info('%c Success ', 'color: white; background-color: #00C853; border-radius: 5px', text);
    }
  };
};

export { toastSettings, useToast };
//# sourceMappingURL=index.modern.js.map

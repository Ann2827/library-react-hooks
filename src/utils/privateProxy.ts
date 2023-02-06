const privateProxy = <T extends object>(): ProxyHandler<T> => ({
  get(target, prop) {
    if (typeof prop !== 'string' || prop?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      const value = target[prop];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  },
  set(target, prop, val) {
    console.log('privateProxy Proxy set', target, prop, val);
    // перехватываем запись свойства
    if (typeof prop !== 'string' || prop?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      target[prop] = val;
      return true;
    }
  },
  deleteProperty(target, prop) {
    // перехватываем удаление свойства
    if (typeof prop !== 'string' || prop?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      delete target[prop];
      return true;
    }
  },
  ownKeys(target) {
    // перехватываем попытку итерации
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

export default privateProxy;

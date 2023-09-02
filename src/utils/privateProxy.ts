const privateProxy = <T extends Object>(): ProxyHandler<T> => ({
  get(target, property) {
    if (typeof property !== 'string' || property?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      const value = target[property as keyof Object];
      return typeof value === 'function' ? value.bind(target) : value;
    }
  },
  set(target, property, value) {
    console.log('privateProxy Proxy set', target, property, value);
    // перехватываем запись свойства
    if (typeof property !== 'string' || property?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      target[property as keyof Object] = value;
      return true;
    }
  },
  deleteProperty(target, property) {
    // перехватываем удаление свойства
    if (typeof property !== 'string' || property?.startsWith('_')) {
      throw new Error('Отказано в доступе');
    } else {
      delete target[property as keyof Object];
      return true;
    }
  },
  ownKeys(target) {
    // перехватываем попытку итерации
    return Object.keys(target).filter((key) => !key.startsWith('_'));
  },
});

export default privateProxy;

const HuexStorage = require('./huex-storage');
const recursiveWalker = require('./recursive-walker');

function _isHuexOwnProp(prop) {
  return ['on', '_storage', '_emitter', '_emitChange'].includes(prop);
}

const proxySettings = {
  get(target, prop) {
    if (_isHuexOwnProp(prop)) {
      return target[prop];
    }
    target = target._storage;
    if (target[prop] === undefined) {
      target[prop] = huex();
    }
    return target[prop];
  },

  set(target, prop, value) {
    const storage = target._storage;
    value = recursiveWalker.walkThroughValue(value, val => huex(val));

    storage[prop] = value;
    target._emitChange(prop, value);

    if (value instanceof HuexStorage) {
      value.on('change', (e) => {
        target._emitChange(prop, storage[prop], { nested: e });
      });
    }

    return true;
  }
}

function huex(obj = {}) {
  const storage = new HuexStorage(obj);
  const proxiedStorage = new Proxy(storage, proxySettings);
  return proxiedStorage;
}

module.exports = huex;
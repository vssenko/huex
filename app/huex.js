const HuexStorage = require('./huex-storage');
const recursiveWalker = require('./recursive-walker');

const proxySettings = {
  get(target, prop) {
    if (['on', '_storage', '_emitter'].includes(prop)) {
      return target[prop];
    }
    target = target._storage;
    if (target[prop] === undefined) {
      target[prop] = huex();
    }
    return target[prop];
  },

  set(target, prop, value) {
    const emitter = target._emitter;
    target = target._storage;
    if (value) {
      if (Array.isArray(value)) {
        value = recursiveWalker.walkThroughArray(value, val => huex(val));
      } else if (typeof value === 'object') {
        value = recursiveWalker.walkThroughObject(value, val => huex(val));
      }
    }

    target[prop] = value;
    emitter.emit('change:' + prop, { value });
    emitter.emit('change', { key: prop, value })
    return true;
  }
}

function huex(obj = {}) {
  const storage = new HuexStorage(obj);
  const proxiedStorage = new Proxy(storage, proxySettings);
  return proxiedStorage;
}

module.exports = huex;
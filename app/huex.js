const EventEmmiter = require('events').EventEmitter;
const recursiveWalker = require('./recursive-walker');

const proxySettings = {
  get(target, prop) {
    if (target[prop] === undefined) {
      target[prop] = huex();
    }
    return target[prop];
  },

  set(target, prop, value) {
    if (value) {
      if (Array.isArray(value)) {
        value = recursiveWalker.walkThroughArray(value, val => huex(val));
      } else if (typeof value === 'object') {
        value = recursiveWalker.walkThroughObject(value, val => huex(val));
      }
    }

    target[prop] = value;
    target.emit('change:' + prop, { value });
    target.emit('change', { key: prop, value })
    return true;
  }
}

function huex(obj = {}) {
  Object.setPrototypeOf(obj, new EventEmmiter());
  const storage = new Proxy(obj, proxySettings);
  return storage;
}

module.exports = huex;
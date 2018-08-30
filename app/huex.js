const EventEmmiter = require('events').EventEmitter;

const proxySettings = {
  get(target, prop) {
    if (target[prop] === undefined) {
      target[prop] = huex();
    }
    return target[prop];
  },

  set(target, prop, value) {
    target[prop] = value;
    target.emit('change:' + prop, { value });
    target.emit('change', { key: prop, value })
    return true;
  }
}

function huex() {
  obj = new EventEmmiter();
  const storage = new Proxy(obj, proxySettings);
  return storage;
}

module.exports = huex;
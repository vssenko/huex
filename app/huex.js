let EventEmmiter;

if (require) {
  EventEmmiter = require('events').EventEmitter;
} else {
  //TODO: write solution for FE
  EventEmmiter = class { }
}

const proxySettings = {
  get(target, prop) {
    if (target[prop] === undefined) {
      target[prop] = huex();
    }
    return target[prop];
  },

  set(target, prop, value) {
    if (value instanceof Object) {
      value = huex(value);
    }

    target[prop] = value;
    target.emit('change:' + prop, { value });
    return true;
  }
}

function huex() {
  obj = new EventEmmiter();
  const storage = new Proxy(obj, proxySettings);
  return storage;
}

module.exports = huex;
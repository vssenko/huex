const EventEmitter = require('events').EventEmitter;

class HuexStorage {
  constructor(data) {
    this._emitter = new EventEmitter();
    this._storage = data || {};
  }

  on(event, cb) {
    return this._emitter.on(event, cb);
  }

  _emitChange(key, value, { nested } = {}) {
    const e = { key, value };
    if (nested) {
      e.nested = nested;
    }

    this._emitter.emit('change:' + key, e);
    this._emitter.emit('change', e);
  }
}

module.exports = HuexStorage;
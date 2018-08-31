const EventEmitter = require('events').EventEmitter;

class HuexStorage {
  constructor(data) {
    this._emitter = new EventEmitter();
    this._storage = data || {};
  }

  on(event, cb) {
    return this._emitter.on(event, cb);
  }
}

module.exports = HuexStorage;
const assert = require('assert');

const Huex = require('./huex');

describe('Huex', () => {
  let sut;

  beforeEach(() => {
    sut = Huex();
  });

  it('Should instantiate object', () => {
    assert.equal(typeof (sut), 'object');
  });

  it('should save values', () => {
    sut.a = 5;
    assert.equal(sut.a, 5);
  });

  it('should save long path values', () => {
    sut.a.b.c = 5;
    assert.equal(sut.a.b.c, 5);
  });

  it('should fire event on value change', (done) => {
    sut.on('change:a', (e) => {
      assert.equal(e.value, 5);
      done();
    });

    sut.a = 5;
  });

  it('should fire events on nested objects', (done) => {
    sut.a.b.on('change:c', (e) => {
      assert.equal(e.value, 5);
      done();
    });

    sut.a.b.c = 5;
  });
});
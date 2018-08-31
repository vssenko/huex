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

  it('should fire change:name event on value change', (done) => {
    sut.on('change:a', (e) => {
      assert.equal(e.value, 5);
      done();
    });

    sut.a = 5;
  });

  it('should fire change event on value change', (done) => {
    sut.on('change', (e) => {
      if (e.key === 'a') {
        assert.equal(e.value, 5);
        done();
      }
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

  it('should be created based on existing object', (done) => {
    const sut = Huex({ a: 5 });

    sut.on('change:a', (e) => {
      assert.equal(e.value, 10);
      done();
    });

    assert.equal(sut.a, 5);
    sut.a = 10;

  });

  it('should make an object Huex on set', (done) => {
    sut.subSut = {
      a: 5
    };

    sut.subSut.on('change:a', () => done());

    assert.equal(sut.subSut.a, 5);
    sut.subSut.a = 10;
  });

  it('should listen on array changes', (done) => {
    sut.someArray = [1, 2, 3];
    sut.someArray.on('change', (e) => {
      if (e.key === '3' && e.value === 4) {
        done();
      }
    });

    sut.someArray.push(4);
  });

  it('should fire parent event on child object change', (done) => {
    sut.subSut = {
      a: 5
    };

    sut.on('change:subSut', (e) => {
      assert.equal(e.key, 'subSut');
      assert.deepEqual(e.value._storage, { a: 10 });
      assert.deepEqual(e.nested, { key: 'a', value: 10 });
      done();
    });

    sut.subSut.a = 10;
  });

  it('should fire parent event on child array change', (done) => {
    sut.subSut = [1, 2, 3]

    sut.on('change:subSut', (e) => {
      assert.equal(e.key, 'subSut');
      assert.deepEqual(e.value._storage, [1, 2, 3, 4]);
      assert.deepEqual(e.nested, { key: '3', value: 4 });
      done();
    });

    sut.subSut.push(4);
  });
});
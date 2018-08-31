function walkThroughObject(obj, applyfunc) {
  Object.keys(obj).filter(k => obj[k]).forEach((key) => {
    const value = obj[key];
    obj[key] = walkThroughValue(value, applyfunc);
  });

  return applyfunc(obj);
}

function walkThroughArray(array, applyfunc) {
  array.forEach((value, ind) => {
    array[ind] = walkThroughValue(value, applyfunc);
  });

  return applyfunc(array);
}

function walkThroughValue(value, applyFunc) {
  if (!value) {
    return value;
  }
  if (Array.isArray(value)) {
    value = walkThroughArray(value, applyFunc);
  } else if (typeof value === 'object') {
    value = walkThroughObject(value, applyFunc);
  }

  return value;
}

module.exports = {
  walkThroughValue
}
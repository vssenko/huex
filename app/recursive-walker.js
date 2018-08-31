function walkThroughObject(obj, applyfunc) {
  Object.keys(obj).filter(k => obj[k]).forEach((key) => {
    const value = obj[key];
    if (Array.isArray(value)) {
      obj[key] = walkThroughArray(value, applyfunc);
    } else if (typeof value === 'object') {
      obj[key] = walkThroughObject(value, applyfunc);
    }
  });

  return applyfunc(obj);
}

function walkThroughArray(array, applyfunc) {
  array.forEach((value, ind) => {
    if (Array.isArray(value)) {
      array[ind] = walkThroughArray(value, applyfunc);
    } else if (typeof value === 'object') {
      array[ind] = walkThroughObject(value, applyfunc);
    }
  });

  return array;
}
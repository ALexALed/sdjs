function logWrapper(func) {
  return (...args) => {
    console.log(`Called ${func.name} with args ${[...arguments]}`);
    return func(...args);
  };
}

function add(a, b) {
  return a + b;
}

const addL = logWrapper(add);

console.log(addL(1, 2));

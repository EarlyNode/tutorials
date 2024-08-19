function memoize(fn) {
  const cache = new Map();

  function memoizedFunction(...args) {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key);
    }

    const result = fn.apply(this, args);
    cache.set(key, result);

    return result;
  }

  Object.defineProperty(memoizedFunction, 'name', {
    value: `memoized_${fn.name}`,
    configurable: true
  });

  return memoizedFunction;
}

function fibonacci(n) {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

function measurePerformance(func, arg) {
  const startTime = process.hrtime.bigint();
  const result = func(arg);
  const endTime = process.hrtime.bigint();
  // Convert nanoseconds to milliseconds.
  const duration = (endTime - startTime) / BigInt(1000000);
  console.log(`${func.name}(${arg}) = ${result}, Time: ${duration}ms`);
}

const n = 42;

console.log("Starting performance measurement:");
measurePerformance(fibonacci, n);
measurePerformance(memoizedFibonacci, n);
// Second call to show caching effect.
measurePerformance(memoizedFibonacci, n);

type AnyFunction = (...args: any[]) => any;

interface MemoizedFunction<T extends AnyFunction> extends CallableFunction {
  (...args: Parameters<T>): ReturnType<T>;
  clear: () => void;
}

function memoize<T extends AnyFunction>(fn: T): MemoizedFunction<T> {
  const cache = new Map<string, ReturnType<T>>();

  const memoizedFunction = function(...args: Parameters<T>): ReturnType<T> {
    const key = JSON.stringify(args);

    if (cache.has(key)) {
      return cache.get(key)!;
    }

    const result = fn(...args);
    cache.set(key, result);

    return result;
  } as MemoizedFunction<T>;

  memoizedFunction.clear = function clear() {
    cache.clear();
  };

  Object.defineProperty(memoizedFunction, 'name', {
    value: `memoized_${fn.name}`,
    configurable: true
  });

  return memoizedFunction;
}

function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return memoizedFibonacci(n - 1) + memoizedFibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);

function measurePerformance(func: MemoizedFunction<typeof fibonacci>, arg: number) {
  const startTime = process.hrtime.bigint();
  const result = func(arg);
  const endTime = process.hrtime.bigint();
  // Convert nanoseconds to milliseconds.
  const duration = (endTime - startTime) / BigInt(1000000);
  console.log(`${func.name}(${arg}) = ${result}, Time: ${duration}ms`);
}

const numbers = [10, 20, 30, 40, 42, 43, 500];

numbers.forEach(n => {
  measurePerformance(memoizedFibonacci, n);
});

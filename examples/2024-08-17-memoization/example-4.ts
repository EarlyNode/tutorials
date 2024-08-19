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

// Example of using the memoized function with TypeScript.
function fibonacci(n: number): number {
  if (n <= 1) {
    return n;
  }

  return fibonacci(n - 1) + fibonacci(n - 2);
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

const n = 42;

// Measure memoized Fibonacci.
measurePerformance(memoizedFibonacci, n);

// Measure memoized Fibonacci second call.
measurePerformance(memoizedFibonacci, n);

// Clear cache and measure again.
memoizedFibonacci.clear();
measurePerformance(memoizedFibonacci, n);

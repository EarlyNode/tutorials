'use client';

import { useState } from 'react';

import type { getDictionary } from '@/features/internationalization/get-dictionaries';

export function CounterComponent({
  dictionary,
}: {
  dictionary: Awaited<ReturnType<typeof getDictionary>>['counter'];
}) {
  const [count, setCount] = useState(0);
  return (
    <p>
      This component is rendered on client:
      <button onClick={() => setCount(n => n - 1)}>
        {dictionary.decrement}
      </button>
      {count}
      <button onClick={() => setCount(n => n + 1)}>
        {dictionary.increment}
      </button>
    </p>
  );
}

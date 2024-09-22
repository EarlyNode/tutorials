'use client';
import { useRef } from 'react';
import { Provider } from 'react-redux';

import { AppStore, makeStore } from './store';

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>();

  if (!storeRef.current) {
    // Creates the store instance the first time this renders.
    const store = makeStore();
    storeRef.current = store;
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}

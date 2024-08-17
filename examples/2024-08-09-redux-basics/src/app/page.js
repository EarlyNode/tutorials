'use client';

import { increment, selectCount } from './example';
import { useAppDispatch, useAppSelector } from './hooks';
import UserProfileContainer from './user-profile-container';

export default function Home() {
  const count = useAppSelector(selectCount);
  const dispatch = useAppDispatch();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="text-4xl font-bold">Redux Basics</h1>

      <div className="flex items-center justify-center space-x-4">
        <p className="text-2xl">Count: {count}</p>

        <button
          className="inline-flex h-9 items-center justify-center whitespace-nowrap rounded-md bg-white px-4 py-2 text-sm font-medium text-black shadow transition-colors hover:bg-white/90"
          onClick={() => {
            dispatch(increment());
          }}
        >
          Increment
        </button>
      </div>

      <UserProfileContainer />
    </main>
  );
}

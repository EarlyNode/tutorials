import { useEffect, useRef } from 'react';

import { increment, incrementBy, init, selectCount } from './example-reducer';
import { useAppDispatch, useAppSelector } from './hooks';

async function fetchUser(id) {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/users/${id}`,
  );
  return await response.json();
}

export function MyComponent() {
  const dispatch = useAppDispatch();
  const currentCount = useAppSelector(selectCount);
  const hasFetched = useRef(false);

  useEffect(() => {
    dispatch(init());
    dispatch(increment());
  }, [dispatch]);

  useEffect(() => {
    const fetchAndIncrement = async () => {
      try {
        const user = await fetchUser(currentCount);
        dispatch(incrementBy(user.name.length));
        hasFetched.current = true;
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    if (currentCount === 1 && !hasFetched.current) {
      fetchAndIncrement();
    }
  }, [currentCount, dispatch]);

  return <p>Current Count: {currentCount}</p>;
}

export const selectCurrentUserId = state => state[slice].currentUserId;

export const selectUsers = state => state[slice].users;

export const selectCurrentUser = state =>
  state[slice].users[state[slice].currentUserId];

export const selectCurrentUsersEmail = state =>
  state[slice].users[state[slice].currentUserId]?.email ?? '';

export const selectCurrentUsersFullName = state =>
  `${state[slice].users[state[slice].currentUserId]?.firstName ?? ''} ${state[slice].users[state[slice].currentUserId]?.lastName ?? ''}`;

export const selectIsLoggedIn = state => Boolean(state[slice].currentUserId);

import axios from 'axios';

import { UserProfile } from './user-profiles-types';

export const getCurrentUserRequest = (
  token: string,
): Promise<UserProfile | null> =>
  token
    ? axios
        .get<UserProfile>(`https://jsonplaceholder.typicode.com/users/1`)
        .then(({ data }) => data)
    : new Promise(resolve => {
        setTimeout(() => {
          resolve(null);
        }, 1000);
      });

export const getUsersRequest = (token: string) =>
  axios
    .get<UserProfile[]>('https://jsonplaceholder.typicode.com/users')
    .then(({ data }) => data);

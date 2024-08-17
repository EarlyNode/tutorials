import { converge, pipe, prop, propOr } from 'ramda';

export const loginSuccess = payload => ({ type: 'LOGIN_SUCCESS', payload });
export const fetchedUsers = payload => ({ type: 'FETCHED_USERS', payload });

export const slice = 'userProfile';
const initialState = { currentUserId: null, users: {} };

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case loginSuccess().type: {
      return {
        ...state,
        currentUserId: payload.id,
        users: { ...state.users, [payload.id]: payload },
      };
    }
    case fetchedUsers().type: {
      const newUsers = { ...state.users };

      payload.forEach(user => {
        newUsers[user.id] = user;
      });

      return { ...state, users: newUsers };
    }
    default: {
      return state;
    }
  }
};

const selectUserProfileSlice = prop(slice);

const selectCurrentUserId = pipe(selectUserProfileSlice, prop('currentUserId'));

const selectUsers = pipe(selectUserProfileSlice, prop('users'));

export const selectCurrentUser = converge(prop, [
  selectCurrentUserId,
  selectUsers,
]);

export const getCurrentUsersEmail = pipe(
  selectCurrentUser,
  propOr('', 'email'),
);

export const selectIsLoggedIn = pipe(selectCurrentUserId, Boolean);

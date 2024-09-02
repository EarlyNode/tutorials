import { converge, pipe, prop, propOr } from 'ramda';

export const slice = 'userProfiles';

/**
 * Actions
 */

export const loginClicked = payload => ({
  type: `${slice}/loginClicked`,
  payload,
});
export const loginSucceeded = payload => ({
  type: `${slice}/loginSucceeded`,
  payload,
});
export const fetchedUsers = payload => ({
  type: `${slice}/fetchedUsers`,
  payload,
});

/**
 * Reducer
 */

export const initialState = {
  currentUsersId: null,
  isLoading: false,
  users: {},
};

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case loginClicked().type: {
      return { ...state, isLoading: true };
    }
    case loginSucceeded().type: {
      return { ...state, currentUsersId: payload.id };
    }
    case fetchedUsers().type: {
      const users = payload.reduce((normalizedUsers, user) => {
        normalizedUsers[user.id] = user;
        return normalizedUsers;
      }, state.users);

      return { ...state, users, isLoading: false };
    }
    default: {
      return state;
    }
  }
};

/**
 * Selectors
 */

export const selectUserProfilesSlice = prop(slice);

const selectCurrentUsersId = pipe(
  selectUserProfilesSlice,
  prop('currentUsersId'),
);

const selectUsers = pipe(selectUserProfilesSlice, prop('users'));

export const selectCurrentUser = converge(prop, [
  selectCurrentUsersId,
  selectUsers,
]);

export const selectCurrentUsersEmail = pipe(
  selectCurrentUser,
  propOr('', 'email'),
);

export const selectIsLoggedIn = pipe(selectCurrentUsersId, Boolean);

export const selectIsLoading = pipe(selectUserProfilesSlice, prop('isLoading'));

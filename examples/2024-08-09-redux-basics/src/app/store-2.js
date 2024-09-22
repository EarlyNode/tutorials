import { combineReducers, legacy_createStore as createStore } from 'redux';

import {
  incrementBy,
  reducer as exampleReducer,
  slice as exampleSlice,
} from './example-reducer';
import {
  fetchedUsers,
  loginSuccess,
  reducer as userProfileReducer,
  slice as userProfileSlice,
} from './user-profile';

const rootReducer = combineReducers({
  [exampleSlice]: exampleReducer,
  [userProfileSlice]: userProfileReducer,
});

export const makeStore = () => {
  return createStore(rootReducer, rootReducer());
};

const store = makeStore();

store.dispatch(incrementBy(10));
store.dispatch(
  loginSuccess({
    id: 'user123',
    email: 'johndoe@example.com',
    firstName: 'John',
    lastName: 'Doe',
  }),
);
store.dispatch(
  fetchedUsers([
    {
      id: 'user123',
      email: 'johndoe@example.com',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      id: 'user456',
      email: 'janesmith@example.com',
      firstName: 'Jane',
      lastName: 'Smith',
    },
  ]),
);

console.log('state', store.getState());
// state {
//   "example": {
//     "count": 10
//   },
//   "userProfile": {
//     "currentUserId": "user123",
//     "users": {
//       "user123": {
//         "id": "user123",
//         "email": "johndoe@example.com",
//         "firstName": "John",
//         "lastName": "Doe",
//       },
//       "user456": {
//         "id": "user456",
//         "email": "janesmith@example.com",
//         "firstName": "Jane",
//         "lastName": "Smith",
//       }
//     }
//   }
// }

const selectCurrentUser = state =>
  state.userProfile.users[state.userProfile.currentUserId]?.email;

const currentUserEmail = selectCurrentUser(store.getState());
console.log('currentUserEmail', currentUserEmail); // johndoe@example.com

const selectUserFullNameById = (state, userId) => {
  const user = state.userProfile.users[userId];
  return user ? `${user.firstName} ${user.lastName}` : 'User not found';
};

const user456FullName = selectUserFullNameById(store.getState(), 'user456');
console.log('user456FullName', user456FullName); // Jane Smith

export const take = actionType => ({
  '@@redux-saga/IO': true,
  type: 'TAKE',
  payload: { actionType },
});

export const put = action => ({
  '@@redux-saga/IO': true,
  type: 'PUT',
  payload: { action },
});

export const select = (selector, ...arguments_) => ({
  '@@redux-saga/IO': true,
  type: 'SELECT',
  payload: {
    selector,
    args: arguments_,
  },
});

export const call = (functionOrContextAndFunction, ...arguments_) =>
  Array.isArray(functionOrContextAndFunction)
    ? {
        '@@redux-saga/IO': true,
        type: 'CALL',
        payload: {
          fn: functionOrContextAndFunction[1],
          args: arguments_,
          context: functionOrContextAndFunction[0],
        },
      }
    : {
        '@@redux-saga/IO': true,
        type: 'CALL',
        payload: {
          fn: functionOrContextAndFunction,
          args: arguments_,
          context: null,
        },
      };

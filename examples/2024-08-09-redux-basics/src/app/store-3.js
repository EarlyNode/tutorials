function applyMiddleware(...middlewares) {
  return function enhancer(createStore, reducer, initialState) {
    const store = createStore(reducer, initialState);

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action, ...arguments_) =>
        enhancedDispatch(action, ...arguments_),
    };

    const chain = middlewares.map(middleware => middleware(middlewareAPI));

    const enhancedDispatch = chain.reduceRight(
      (currentDispatch, currentMiddleware) =>
        currentMiddleware(currentDispatch),
      store.dispatch,
    );

    return { ...store, dispatch: enhancedDispatch };
  };
}

export function createStore(reducer, initialState, enhancer) {
  if (enhancer) {
    return enhancer(createStore, reducer, initialState);
  }

  let state = initialState;

  const dispatch = action => {
    state = reducer(state, action);
  };

  const getState = () => state;

  return { dispatch, getState };
}

const logger = store => next => action => {
  console.log('dispatching', action);
  let result = next(action);
  console.log('next state', store.getState());
  return result;
};

const thunk = store => next => action => {
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }

  return next(action);
};

const rootReducer = (state = { count: 0 }, { payload, type } = {}) => {
  switch (type) {
    case 'INCREMENT': {
      return { ...state, count: state.count + 1 };
    }
    case 'DECREMENT': {
      return { ...state, count: state.count - 1 };
    }
    default: {
      return state;
    }
  }
};

const store = createStore(
  rootReducer,
  rootReducer(),
  applyMiddleware(thunk, logger),
);

store.dispatch({ type: 'INCREMENT' });
store.dispatch({ type: 'DECREMENT' });

const incrementThunk = (dispatch, getState) => {
  console.log('Current state before async:', getState());

  setTimeout(() => {
    dispatch({ type: 'INCREMENT' });
    console.log('State after async:', getState());
  }, 5000);
};

store.dispatch(incrementThunk);

// function applyMiddleware(...middlewares) {
//   return function enhancer(createStore, reducer, initialState) {
//     const store = createStore(reducer, initialState);

//     const middlewareAPI = {
//       getState: store.getState,
//       dispatch: (action, ...arguments_) => enhancedDispatch(action, ...arguments_),
//     };

//     // const chain = middlewares.map(middleware => middleware(middlewareAPI));

//     // const enhancedDispatch = chain.reduceRight((currentDispatch, currentMiddleware) => currentMiddleware(currentDispatch), store.dispatch);

//     const enhancedDispatch = (action) => {
//       if (typeof action === 'function') {
//         return action(middlewareAPI.dispatch, middlewareAPI.getState);
//       }

//       return (actionForLogger => {
//         console.log('dispatching', actionForLogger);
//         let result = store.dispatch(actionForLogger);
//         console.log('next state', store.getState());
//         return result;
//       })(action)
//     }

//     return { ...store, dispatch: enhancedDispatch };
//   };
// }

const leon = {
  name: 'Leon',
  sayHi: function (alias) {
    console.log(`Hi, I'm ${alias}`);
  },
};

// ---

leon.sayHi(alias); // Hi, I'm undefined

const alias = 'Benni BTC';

leon.sayHi(alias); // Hi, I'm Benni BTC

const cache = new Map();

// Use numbers as key for cache.
map.set('[3,1]', 4);
// Use functions as key for cache.
map.set('[function increment(), function double()]', 42);

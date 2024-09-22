export const increment = () => ({ type: 'INCREMENT' });
export const incrementBy = payload => ({ type: 'INCREMENT_BY', payload });
export const reset = () => ({ type: 'RESET' });

export const slice = 'example';
const initialState = { count: 0 };

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case increment().type: {
      return { ...state, count: state.count + 1 };
    }
    case incrementBy().type: {
      return { ...state, count: state.count + payload };
    }
    case reset().type: {
      return initialState;
    }
    default: {
      return state;
    }
  }
};

export const selectCount = state => state[slice].count;

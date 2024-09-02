import { pipe, prop } from 'ramda';

export const slice = 'example';

export const increment = () => ({ type: `${slice}/increment` });
export const incrementBy = payload => ({
  type: `${slice}/incrementBy`,
  payload,
});

const initialState = {
  count: 0,
};

export const reducer = (state = initialState, { type, payload } = {}) => {
  switch (type) {
    case increment().type: {
      return { ...state, count: state.count + 1 };
    }
    case incrementBy().type: {
      return { ...state, count: state.count + payload };
    }
    default: {
      return state;
    }
  }
};

export const selectExampleState = prop(slice);

export const selectCount = pipe(selectExampleState, prop('count'));

export function createSagaMiddleware() {
  let sagas = [];

  const middleware = store => next => action => {
    const result = next(action);

    sagas.forEach(saga => {
      const sagaIterator = saga();

      let lastValue;
      let effectHandled = false;

      const handleEffect = async effect => {
        if (!effect || !effect['@@redux-saga/IO']) {
          effectHandled = true;
          return;
        }

        switch (effect.type) {
          case 'TAKE': {
            if (effect.payload.actionType === action.type) {
              return action;
            } else {
              effectHandled = true;
              return;
            }
          }
          case 'PUT': {
            store.dispatch(effect.payload.action);
            break;
          }
          case 'SELECT': {
            return effect.payload.selector(store.getState());
          }
          case 'CALL': {
            try {
              const { fn, args, context } = effect.payload;
              const functionResult = fn.apply(context, args);
              if (functionResult instanceof Promise) {
                return await functionResult;
              }
              return functionResult;
            } catch (error) {
              effectHandled = true;
              return sagaIterator.throw(error);
            }
          }
          default: {
            effectHandled = true;
            return;
          }
        }
      };

      const processSaga = async () => {
        try {
          while (!effectHandled) {
            const { value, done } = sagaIterator.next(lastValue);

            if (done) {
              break;
            }

            lastValue = await handleEffect(value);
          }
        } catch (error) {
          sagaIterator.throw(error);
        }
      };

      processSaga();
    });

    return result;
  };

  middleware.run = saga => {
    sagas.push(saga);
  };

  return middleware;
}

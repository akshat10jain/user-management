import {
    createStore, combineReducers, compose, applyMiddleware,
} from 'redux';
import ReduxThunk from 'redux-thunk';
import UserReducer from '../reducers/userReducer'

/**
 * Logs all actions and states after they are dispatched.
 */
const logger = store => next => (action) => {
    console.group(action.type);
    console.info('dispatching', action);
    const result = next(action);
    console.log('next state', store.getState());
    console.groupEnd();
    return result;
};

const createStoreWithMiddleware = compose(applyMiddleware(ReduxThunk, logger))(
    createStore,
);

const rootReducer = combineReducers({
    user: UserReducer
});

function configureStore(initialState = {}) {
    return createStoreWithMiddleware(rootReducer, initialState);
}

const store = configureStore({});

export { configureStore, store };

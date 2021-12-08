import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './reducers/appReducer';

// Connect redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  appModule: appReducer,
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
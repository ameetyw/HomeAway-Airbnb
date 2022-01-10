import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import { appReducer } from './reducers/appReducer';
import { pageReducer } from './reducers/pageReducer';

// Connect redux devtools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const rootReducer = combineReducers({
  appModule: appReducer,
  pageModule: pageReducer
});

export const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));
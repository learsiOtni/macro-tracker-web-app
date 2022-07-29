import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { authReducer, favReducer, foodsReducer, macrosReducer } from './store/reducers';

const rootReducer = combineReducers({
  auth: authReducer,
  fav: favReducer,
  foods: foodsReducer,
  macros: macrosReducer, 
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


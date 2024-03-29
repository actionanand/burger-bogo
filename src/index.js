import React from 'react';
import ReactDOM from 'react-dom/client';

import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';  
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

// import { configureStore } from '@reduxjs/toolkit';
// import { HashRouter } from 'react-router-dom';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';
import { watchAuth } from './store/sagas';

// const store = createStore(reducer);

const rootReducer = combineReducers({
  burgerBuilder: burgerBuilderReducer,
  orders: orderReducer,
  auth: authReducer
});

const composeEnhancers = process.env.NODE_ENV === 'development'
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk, sagaMiddleware)
));

sagaMiddleware.run(watchAuth);

const app = (
  <Provider store={store}>
    <BrowserRouter basename='burger-bogo'>
      <App />
    </BrowserRouter>
  </Provider>
);

// routes like burger-bogo/#/orders
// const app = (
//   <HashRouter>
//     <App />
//   </HashRouter>
// );

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {app}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

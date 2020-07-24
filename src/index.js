import 'date-fns';
import React from 'react'
import ReactDOM from 'react-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import App from './App'
import rootReducer from './reducers';
import authentication from './b2c';
import './config/authentication';

import './index.css';

const composeEnhancers =
  typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
    }) : compose;

const enhancer = composeEnhancers(
  applyMiddleware(thunk)
)

const store = createStore(rootReducer, enhancer)

authentication.run(() => {
  ReactDOM.render(
    <Provider store={store}>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Router>
          <App />
        </Router>
      </MuiPickersUtilsProvider>
    </Provider>,
    document.getElementById('root')
  );
})
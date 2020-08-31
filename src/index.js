import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import './config/authentication';
import './assets/fonts/fonts.css';
import './index.css';

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers';
import authentication from './b2c';
import Webfont from 'webfontloader';

if (process.env.NODE_ENV === 'production') {
  window.console.log = () => {}
}

function initializeApp(App) {
  Webfont.load({
    custom: {
      families: ['SegoeUI', 'Gilroy']
    }
  })

  const composeEnhancers =
    typeof window === 'object' &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      }) : compose;

  const enhancer = composeEnhancers(
    applyMiddleware(thunk)
  )

  const store = createStore(rootReducer, enhancer);

  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}

authentication.run(() => {
  import('./App')
    .then(module => initializeApp(module.default))
})
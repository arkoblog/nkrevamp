import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import WebFont from 'webfontloader';

import Root from './components/root';
import reducers from './reducers';

import './index.scss';

const store = createStore(reducers, {}, compose(
  applyMiddleware(thunk),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
));

WebFont.load({
  google: {
    families: ['Open Sans:300', 'Source Sans Pro:600'],
  },
});

ReactDOM.render(
  <Provider store={store}>
    <Root />
  </Provider>,
  document.getElementById('root'),
);

import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

module.hot?.accept('./app', function () {
  /* eslint-disable global-require */
  const { NextApp } = require('./app');
  ReactDOM.render(<NextApp />, document.getElementById('root'));
});

export default render;

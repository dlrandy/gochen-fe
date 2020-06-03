import React from 'react';
import ReactDOM from 'react-dom';

import { App } from './app';

const render = () => {
  ReactDOM.render(<App />, document.getElementById('root'));
};

// eslint-disable-next-line no-unused-expressions
module.hot?.accept();
// ['./app'], function next() {
//   /* eslint-disable global-require */
//   const { NextApp } = require('./app');
//   ReactDOM.render(<NextApp />, document.getElementById('root'));
// });
render();
export default render;

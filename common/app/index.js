import 'babel-polyfill';
// css to clean style of page
import 'normalize.css';

import './css/index.css';
import App from './js/base/app.js';

// IIFE to bootstrap the app
(() => {
  window.addEventListener('DOMContentLoaded', () => {
    new App();
  });
})();

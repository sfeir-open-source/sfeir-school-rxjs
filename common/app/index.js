import 'babel-polyfill';

import 'normalize.css';
import './css/index.css';
import App from './js/app.js';

(() => {
  window.addEventListener('DOMContentLoaded', () => {
    new App();
  });
})();

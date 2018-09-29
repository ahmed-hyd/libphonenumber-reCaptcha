import '../scss/index.scss';

//framework imports
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

let element = document.getElementById('grommet-content');

ReactDOM.render(
  <App />,
  element
);
document.body.classList.remove('loading');

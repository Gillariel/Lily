/**
 * React renderer.
 */
import * as React from 'react';
import * as ReactDOM from 'react-dom';

// Import the styles here to process them with webpack
import '@public/style.css';
import App from './components/app';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <div className='app'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </div>,
  document.getElementById('app')
);

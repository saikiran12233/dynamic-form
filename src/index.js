import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'; // Import the App component
import './index.css'; // Import any global styles if necessary

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure it matches the div id in index.html
);

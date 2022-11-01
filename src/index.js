import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppProvider } from './contexts/App';
import './index.css';
import App from './App';
import { Amplify } from 'aws-amplify';
import config from './aws-exports';

Amplify.configure(config);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <AppProvider>
        <App />
      </AppProvider>
  </React.StrictMode>
);

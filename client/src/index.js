import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './components/contexts/UserContext';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> 
      <App />
    </UserProvider>
  </React.StrictMode>
);

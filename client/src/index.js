import React from 'react';
import ReactDOM from 'react-dom/client';
import UserProvider from './components/contexts/UserContext';
import ClusterProvider from './components/contexts/ClusterContext';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider> 
      <ClusterProvider> 
        <App />
      </ClusterProvider>
    </UserProvider>
  </React.StrictMode>
);

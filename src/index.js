import React from 'react';
import ReactDOM from 'react-dom/client';

import { InventarioApp } from './InventarioApp';
import './Styles/Styles.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <InventarioApp />
  </React.StrictMode>
);
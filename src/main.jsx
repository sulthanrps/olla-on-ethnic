import React from 'react'; // Mengimpor React secara eksplisit (praktik yang baik)
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; // 1. Impor BrowserRouter

import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// Render aplikasi Anda
root.render(
  <StrictMode>
    <BrowserRouter> {/* 2. Bungkus App dengan BrowserRouter */}
      <App />
    </BrowserRouter>
  </StrictMode>
);

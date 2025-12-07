import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserProvider } from './context/BrowserContext';
import { WalletProvider } from './context/WalletContext';
import './index.css';
import App from './App.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserProvider>
      <WalletProvider>
        <App />
      </WalletProvider>
    </BrowserProvider>
  </StrictMode>,
);

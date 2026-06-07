import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from "./context/LanguageContext.tsx";
import { FirebaseProvider } from "./context/FirebaseContext.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <FirebaseProvider>
        <App />
      </FirebaseProvider>
    </LanguageProvider>
  </StrictMode>,
);



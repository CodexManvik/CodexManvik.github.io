import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import App from './App.tsx';

// Old HashRouter links (/#/certifications) still land on the right page.
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);

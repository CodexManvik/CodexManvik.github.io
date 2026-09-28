import { createRoot, hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import './index.css';
import App from './App.tsx';

// Old HashRouter links (/#/certifications) still land on the right page.
if (location.hash.startsWith('#/')) history.replaceState(null, '', location.hash.slice(1));

const app = (
  <BrowserRouter>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BrowserRouter>
);
const root = document.getElementById('root')!;
// Prerendered pages hydrate so the painted HTML is kept; dev server and 404.html have no markup to reuse.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);

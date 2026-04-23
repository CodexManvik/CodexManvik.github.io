import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { CustomCursor } from './components/CustomCursor';
import { Navigation } from './components/Navigation';
import { HomePage } from './pages/HomePage';
import { CertificationsPage } from './pages/CertificationsPage';

function App() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Touch device cursor
  useEffect(() => {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      const style = document.createElement('style');
      style.textContent = '* { cursor: auto !important; }';
      document.head.appendChild(style);
    }
  }, []);

  return (
    <div className="relative min-h-[100dvh] bg-[rgb(var(--bg))] text-[rgb(var(--fg))]">
      <CustomCursor />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/certifications" element={<CertificationsPage />} />
      </Routes>
    </div>
  );
}

export default App;

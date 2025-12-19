import { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [isFlipping, setIsFlipping] = useState(false);

  useEffect(() => {
    // Get saved theme from localStorage or default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
  }, []);

  const toggleTheme = () => {
    // Start flip animation
    setIsFlipping(true);
    
    // Change theme at the midpoint when page is perpendicular (50% of animation)
    setTimeout(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      document.documentElement.setAttribute('data-theme', newTheme);
    }, 400); // 50% of 800ms

    // End flip animation
    setTimeout(() => {
      setIsFlipping(false);
    }, 800); // Full animation duration
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isFlipping }}>
      {children}
    </ThemeContext.Provider>
  );
};

// src/components/Header/Header.jsx
import { useState, useEffect } from 'react';
import { HiMenu, HiX } from 'react-icons/hi'; // Add icons: npm install react-icons
import ThemeToggle from './ThemeToggle';
import styles from './Header.module.css';

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      setScrolled(isScrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const handleNavClick = (sectionId) => {
    scrollToSection(sectionId);
    setIsMenuOpen(false); // Close menu after clicking
  };

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <div className={styles.logo} onClick={() => handleNavClick('hero')}>
          <span className={styles.logoText}>Manvik</span>
        </div>

        {/* Hamburger Toggle */}
        <button className={styles.menuToggle} onClick={toggleMenu} aria-label="Toggle Menu">
          {isMenuOpen ? <HiX /> : <HiMenu />}
        </button>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navActive : ''}`}>
          <button onClick={() => handleNavClick('experience')} className={styles.navLink}>Experience</button>
          <button onClick={() => handleNavClick('education')} className={styles.navLink}>Education</button>
          <button onClick={() => handleNavClick('projects')} className={styles.navLink}>Projects</button>
          <button onClick={() => handleNavClick('skills')} className={styles.navLink}>Skills</button>
          <button onClick={() => handleNavClick('contact')} className={styles.navLink}>Contact</button>
          <div className={styles.mobileThemeToggle}>
             <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;

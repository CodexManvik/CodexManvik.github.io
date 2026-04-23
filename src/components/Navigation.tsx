import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinkClass = "relative text-sm font-medium text-muted hover:text-[rgb(var(--fg))] transition-colors group";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[rgba(var(--bg),0.85)] backdrop-blur-xl border-b border-[rgba(var(--border),0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-4 flex items-center justify-between">
        <Link to="/" className="font-display font-bold text-lg tracking-tight hover:text-[rgb(var(--accent))] transition-colors"
          data-hover="true">
          MT<span style={{ color: 'rgb(var(--accent))' }}>.</span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {isHome ? (
            <>
              <button onClick={() => scrollTo('journey')} className={navLinkClass} data-hover="true">
                Journey
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </button>
              <button onClick={() => scrollTo('projects')} className={navLinkClass} data-hover="true">
                Projects
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </button>
              <button onClick={() => scrollTo('experience')} className={navLinkClass} data-hover="true">
                Experience
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </button>
              <button onClick={() => scrollTo('skills')} className={navLinkClass} data-hover="true">
                Skills
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </button>
              <Link to="/certifications" className={navLinkClass} data-hover="true">
                Certifications
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
              </Link>
            </>
          ) : (
            <Link to="/" className={navLinkClass} data-hover="true">
              Portfolio
              <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-[rgb(var(--accent))] transition-all duration-300 group-hover:w-full" />
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full border border-[rgba(var(--border),0.1)] flex items-center justify-center text-muted hover:text-[rgb(var(--accent))] hover:border-[rgba(var(--accent),0.3)] transition-all duration-300"
            data-hover="true"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
          </button>
        </div>
      </div>
    </nav>
  );
}

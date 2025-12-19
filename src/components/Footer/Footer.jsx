import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import personalData from '../../data/personal.json';
import styles from './Footer.module.css';

const Footer = () => {
  const { socialLinks } = personalData;
  const currentYear = new Date().getFullYear();

  const iconMap = {
    FaGithub: FaGithub,
    FaLinkedin: FaLinkedin,
    FaTwitter: FaTwitter,
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.content}>
          {/* Quick Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Quick Links</h3>
            <nav className={styles.links}>
              <button onClick={() => scrollToSection('hero')} className={styles.link}>
                Home
              </button>
              <button onClick={() => scrollToSection('projects')} className={styles.link}>
                Projects
              </button>
              <button onClick={() => scrollToSection('skills')} className={styles.link}>
                Skills
              </button>
              <button onClick={() => scrollToSection('contact')} className={styles.link}>
                Contact
              </button>
            </nav>
          </div>

          {/* Social Links */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Connect</h3>
            <div className={styles.socialLinks}>
              {socialLinks.map((link) => {
                const Icon = iconMap[link.icon];
                return (
                  <a
                    key={link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialLink}
                    aria-label={link.platform}
                  >
                    {Icon && <Icon />}
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className={styles.copyright}>
          <p>
            © {currentYear} Manvik. Made with <FaHeart className={styles.heart} /> and React
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import personalData from '../../data/personal.json';
import styles from './Hero.module.css';

const Hero = () => {
  const { name, title, bio, socialLinks, resumePath } = personalData;

  // Typing effects with delays
  const nameTyping = useTypingEffect(name, 80, 300);
  const titleTyping = useTypingEffect(title, 60, 300 + name.length * 80);
  const bioTyping = useTypingEffect(
    bio,
    30,
    300 + name.length * 80 + title.length * 60 + 200
  );

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

  const handleResumeClick = (e) => {
    e.preventDefault();
    // Open in new tab for viewing
    window.open(resumePath, '_blank');
    // Trigger download
    const link = document.createElement('a');
    link.href = resumePath;
    link.download = 'Manvik_Talwar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.name}>
          {nameTyping.displayedText}
          {!nameTyping.isComplete && <span className={styles.cursor}>|</span>}
        </h1>

        <p className={styles.title}>
          {titleTyping.displayedText}
          {nameTyping.isComplete && !titleTyping.isComplete && (
            <span className={styles.cursor}>|</span>
          )}
        </p>

        <p className={styles.bio}>
          {bioTyping.displayedText}
          {titleTyping.isComplete && !bioTyping.isComplete && (
            <span className={styles.cursor}>|</span>
          )}
        </p>

        <motion.div
          className={styles.buttons}
          initial={{ opacity: 0, y: 20 }}
          animate={bioTyping.isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => scrollToSection('projects')}
            className={`${styles.button} ${styles.buttonPrimary}`}
          >
            View Projects
          </button>
          <button
            onClick={handleResumeClick}
            className={`${styles.button} ${styles.buttonSecondary}`}
          >
            Download Resume
          </button>
        </motion.div>

        <motion.div
          className={styles.socialLinks}
          initial={{ opacity: 0, y: 20 }}
          animate={bioTyping.isComplete ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;

import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import ContactForm from './ContactForm';
import personalData from '../../data/personal.json';
import styles from './Contact.module.css';

const Contact = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section id="contact" className={styles.contact}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.title}>Get In Touch</h2>
          <p className={styles.subtitle}>
            Have a question or want to work together? Feel free to reach out!
          </p>

          <div className={styles.contentWrapper}>
            <div className={styles.contactInfoSection}>
              <h3 className={styles.contactInfoTitle}>Contact Information</h3>
              <p className={styles.contactInfoDescription}>
                I'm always open to discussing new projects, opportunities, or collaborations. Drop me an email or use the contact form, and I'll get back to you as soon as possible.
              </p>
              
              <motion.div
                className={styles.contactInfoCard}
                initial={{ opacity: 0, x: -20 }}
                animate={isVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.contactInfoIcon}>
                  <FaEnvelope />
                </div>
                <div className={styles.contactInfoContent}>
                  <span className={styles.contactInfoLabel}>Email</span>
                  <a
                    href={`mailto:${personalData.email}`}
                    className={styles.contactInfoValue}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {personalData.email}
                  </a>
                </div>
              </motion.div>
            </div>

            <div className={styles.formSection}>
              <ContactForm />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

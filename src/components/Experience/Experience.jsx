import { motion } from 'framer-motion';
import { FaBriefcase, FaUsers, FaBook, FaCheckCircle } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import experienceData from '../../data/experience.json';
import styles from './Experience.module.css';

const Experience = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const { internships } = experienceData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Experience
          </motion.h2>

          <div className={styles.content}>
            {internships && internships.length > 0 && (
              <motion.div className={styles.internships} variants={itemVariants}>
                {internships.map((internship, index) => (
                  <div key={index} className={styles.internshipCard}>
                    <div className={styles.internshipHeader}>
                      <h3 className={styles.internshipRole}>{internship.role}</h3>
                      <span className={styles.internshipDuration}>{internship.duration}</span>
                    </div>
                    <p className={styles.internshipCompany}>{internship.company}</p>
                    <p className={styles.internshipDescription}>{internship.description}</p>
                    
                    {/* Stats Badges */}
                    {internship.stats && internship.stats.length > 0 && (
                      <div className={styles.stats}>
                        {internship.stats.map((stat, idx) => (
                          <div key={idx} className={styles.statBadge}>
                            <span className={styles.statValue}>{stat.value}</span>
                            <span className={styles.statLabel}>{stat.label}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {internship.achievements && (
                      <ul className={styles.internshipAchievements}>
                        {internship.achievements.map((achievement, idx) => (
                          <li key={idx}>
                            <FaCheckCircle className={styles.achievementIcon} />
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

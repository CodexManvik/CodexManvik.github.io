import { motion } from 'framer-motion';
import { FaGraduationCap, FaTrophy } from 'react-icons/fa';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import educationData from '../../data/education.json';
import styles from './Education.module.css';

const Education = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const { degree, awards } = educationData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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
    <section id="education" className={styles.education}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2 className={styles.title} variants={itemVariants}>
            Education & Recognition
          </motion.h2>

          <div className={styles.content}>
            {/* Education */}
            <motion.div className={styles.card} variants={itemVariants}>
              <div className={styles.iconWrapper}>
                <FaGraduationCap className={styles.icon} />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.degreeTitle}>{degree.title}</h3>
                <p className={styles.specialization}>{degree.specialization}</p>
                <p className={styles.university}>{degree.university}</p>
                <p className={styles.duration}>{degree.duration}</p>
              </div>
            </motion.div>

            {/* Awards */}
            {awards && awards.length > 0 && (
              <motion.div className={styles.card} variants={itemVariants}>
                <div className={styles.iconWrapper}>
                  <FaTrophy className={styles.icon} />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.awardTitle}>Awards & Honors</h3>
                  {awards.map((award, index) => (
                    <div key={index} className={styles.awardItem}>
                      <p className={styles.awardName}>{award.name}</p>
                      <p className={styles.awardOrganization}>{award.organization}</p>
                      {award.year && <p className={styles.awardYear}>{award.year}</p>}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

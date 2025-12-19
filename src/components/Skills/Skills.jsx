import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../../hooks/useIntersectionObserver';
import SkillCategory from './SkillCategory';
import skillsData from '../../data/skills.json';
import styles from './Skills.module.css';

const Skills = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const { categories } = skillsData;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <motion.div
          ref={ref}
          initial="hidden"
          animate={isVisible ? 'visible' : 'hidden'}
          variants={containerVariants}
        >
          <motion.h2
            className={styles.title}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Skills & Technologies
          </motion.h2>

          <motion.p
            className={styles.subtitle}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
          >
            Technologies and tools I work with
          </motion.p>

          <div className={styles.categoriesGrid}>
            {categories.map((category, index) => (
              <SkillCategory key={index} category={category} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

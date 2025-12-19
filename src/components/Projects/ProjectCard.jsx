import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';
import styles from './Projects.module.css';

const ProjectCard = ({ project }) => {
  const { title, description, technologies, githubUrl, liveUrl } = project;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  };

  const handleGithubClick = (e) => {
    e.stopPropagation();
    window.open(githubUrl, '_blank', 'noopener,noreferrer');
  };

  const handleDemoClick = (e) => {
    e.stopPropagation();
    window.open(liveUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      className={styles.card}
      variants={cardVariants}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.cardContent}>
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <div className={styles.cardIcon}>
            <FaGithub />
          </div>
        </div>

        <p className={styles.cardDescription}>{description}</p>

        <div className={styles.technologies}>
          {technologies.map((tech, index) => (
            <span key={index} className={styles.techTag}>
              {tech}
            </span>
          ))}
        </div>

        <div className={styles.cardFooter}>
          {liveUrl && (
            <button 
              className={styles.demoButton}
              onClick={handleDemoClick}
              aria-label="View live demo"
            >
              View Demo <FaExternalLinkAlt />
            </button>
          )}
          <button 
            className={styles.githubButton}
            onClick={handleGithubClick}
            aria-label="View GitHub repository"
          >
            View Project <FaGithub />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;

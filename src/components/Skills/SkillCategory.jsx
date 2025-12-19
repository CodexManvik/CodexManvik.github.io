import { motion } from 'framer-motion';
import {
  FaPython,
  FaJsSquare,
  FaReact,
  FaDocker,
  FaGitAlt,
  FaLinux,
  FaDatabase,
  FaBrain,
  FaCloud,
  FaNetworkWired,
  FaProjectDiagram,
  FaTools,
} from 'react-icons/fa';
import {
  SiTensorflow,
  SiPytorch,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiJupyter,
  SiFlask,
  SiFastapi,
  SiPostgresql,
  SiMysql,
  SiNextdotjs,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiPlotly,
  SiGithub,
  SiOpenai,
  SiOpencv,

  SiGithubactions,             

} from 'react-icons/si';
import styles from './Skills.module.css';

const SkillCategory = ({ category }) => {
  const { name, skills } = category;

  // Icon mapping for common technologies
  const iconMap = {
    // AI & ML
    PyTorch: SiPytorch,
    TensorFlow: SiTensorflow,
    Transformers: FaBrain,
    'Hugging Face': FaBrain,
    'Azure OpenAI': SiOpenai,
    'Scikit-learn': SiScikitlearn,
    OpenAI: SiOpenai,
    OpenCV: SiOpencv,
    CNNs: FaNetworkWired,
    'RAG Pipelines': FaProjectDiagram,
    MLOps: FaTools,
    'Computer Vision': SiOpencv,
    'NLP': FaBrain,
    'Natural Language Processing': FaBrain,

    // Cloud & DevOps
    'Microsoft Azure': FaCloud,
    Docker: FaDocker,
    Git: FaGitAlt,
    GitHub: SiGithub,
    Linux: FaLinux,
    'CI/CD': SiGithubactions,
    'CI/CD (GitHub Actions)': SiGithubactions,
    'Azure App Service': FaCloud,
    
    // Backend
    Python: FaPython,
    Flask: SiFlask,
    FastAPI: SiFastapi,
    PostgreSQL: SiPostgresql,
    MySQL: SiMysql,
    
    // Frontend
    React: FaReact,
    'Next.js': SiNextdotjs,
    JavaScript: FaJsSquare,
    'Tailwind CSS': SiTailwindcss,
    HTML5: SiHtml5,
    CSS3: SiCss3,
    
    // Data Science
    Pandas: SiPandas,
    NumPy: SiNumpy,
    Plotly: SiPlotly,
    Jupyter: SiJupyter,
    
    // Databases
    ChromaDB: FaDatabase,
    'Azure Cognitive Search': FaCloud,
  };

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div className={styles.category} variants={categoryVariants}>
      <h3 className={styles.categoryName}>{name}</h3>
      <div className={styles.skillsGrid}>
        {skills.map((skill, index) => {
          const Icon = iconMap[skill];
          return (
            <div key={index} className={styles.skillItem}>
              {Icon && <Icon className={styles.skillIcon} />}
              <span className={styles.skillName}>{skill}</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default SkillCategory;

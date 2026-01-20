import { Project } from './types';

export const projects: Project[] = [
  {
    id: 'ai-mock-interviewer',
    title: 'Interview Mirror',
    company: 'Academic Project',
    description: 'AI-powered interview coach with real-time body language & stress analysis.',
    fullDetail: "A comprehensive coaching platform that simulates realistic interviews. It tracks 543 body landmarks (Face/Hand/Pose) in real-time using MediaPipe to detect posture issues and stress indicators. Powered by Google Gemini for conversational context and FastAPI for low-latency processing.",
    technologies: ['MediaPipe', 'Google Gemini', 'FastAPI', 'OpenCV', 'React'],
    repoUrl: "https://github.com/CodexManvik/Interview-Mirror",
    demoUrl: "https://youtu.be/y0VeoCSUbGE",
    metrics: [
      { label: "Landmarks", value: "543" },
      { label: "Latency", value: "< 100ms" }
    ],
    gridSpan: { cols: 2, rows: 1 },
  },
  {
    id: 'floatchat',
    title: 'FloatChat (ARGO)',
    company: 'Personal Project',
    description: 'Local RAG system using Qwen and ChromaDB for ARGO ocean data analysis.',
    fullDetail: "An advanced dashboard for analyzing ARGO Float data. Replaces complex SQL queries with a Natural Language interface. Built with a fully local RAG pipeline using Qwen LLM and ChromaDB to parse unstructured ocean data and generate visualizations on the fly.",
    technologies: ['Streamlit', 'Python', 'PostgreSQL', 'Qwen LLM', 'ChromaDB'],
    repoUrl: "https://github.com/CodexManvik/FloatChat-AI",
    demoUrl: "https://youtu.be/16qcfG89UdM",
    metrics: [
      { label: "Records", value: "100k+" },
      { label: "Query Time", value: "< 2s" }
    ],
    gridSpan: { cols: 1, rows: 1 },
  },
  {
    id: 'deep-learning-watermarking',
    title: 'Deep Learning Watermarking',
    company: 'Research Project',
    description: 'Invisible copyright protection using CNNs with PSNR > 40dB.',
    fullDetail: "A novel framework combining Discrete Wavelet Transforms (DWT) with Convolutional Neural Networks (CNN). The model embeds invisible binary watermarks into the frequency domain of images, achieving state-of-the-art robustness against JPEG compression, Gaussian noise, and rotation attacks.",
    technologies: ['PyTorch', 'DWT', 'CNN', 'OpenCV'],
    repoUrl: "https://github.com/CodexManvik/Deep-Learning-Based-Watermarking",
    demoUrl: "https://youtu.be/your-demo-video-id",
    metrics: [
      { label: "PSNR", value: "> 40dB" },
      { label: "Robustness", value: "96%" }
    ],
    gridSpan: { cols: 1, rows: 1 },
  },
  {
    id: 'enterprise-ai-assistant',
    title: 'Enterprise AI Assistant',
    company: 'Path Infotech',
    description: 'Production RAG chatbot on Azure with citation tracking.',
    fullDetail: "Developed 'Sofia', an internal HR & Policy chatbot. Engineered a citation-aware RAG pipeline using Azure Cognitive Search that links every LLM response back to the specific source PDF. Deployed on secure on-premise infrastructure with Azure OpenAI integration.",
    technologies: ['Azure OpenAI', 'Cognitive Search', 'Docker', 'Python'],
    demoUrl: "https://youtu.be/your-demo-video-id",
    metrics: [
      { label: "Uptime", value: "99.9%" },
      { label: "Citations", value: "100%" }
    ],
    gridSpan: { cols: 2, rows: 1 },
  }
];

import { IProject } from '@/types';

export const GENERAL_INFO = {
    email: 'uchihabyte.git@gmail.com',

    emailSubject: "Let's collaborate on a project",
    emailBody: 'Hi Ans, I am reaching out to you because...',

    oldPortfolio: '#',
    upworkProfile: '#',
};

export const SOCIAL_LINKS = [
    { name: 'github', url: 'https://github.com/Uchiha-byte' },
    { name: 'linkedin', url: 'https://www.linkedin.com/in/ans-ahmed-khan-2096352b3' },
    { name: 'whatsapp', url: 'https://wa.me/917569745154' },
];

export const MY_STACK = {
    frontend: [
        {
            name: 'HTML',
            icon: '/logo/html.png',
        },
        {
            name: 'CSS',
            icon: '/logo/css.png',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
        {
            name: 'TypeScript',
            icon: '/logo/ts.png',
        },
        {
            name: 'React',
            icon: '/logo/react.png',
        },
        {
            name: 'Next.js',
            icon: '/logo/next.png',
        },
        {
            name: 'Tailwind CSS',
            icon: '/logo/tailwind.png',
        },
        {
            name: 'Streamlit',
            icon: '/logo/streamlit.png',
        },
    ],
    backend: [
        {
            name: 'Python',
            icon: '/logo/python.png',
        },
        {
            name: 'FastAPI',
            icon: '/logo/fastapi.png',
        },
        {
            name: 'Node.js',
            icon: '/logo/node.png',
        },
        {
            name: 'Flask',
            icon: '/logo/flask.png',
        },
        {
            name: 'MongoDB',
            icon: '/logo/mongodb.png',
        },
        {
            name: 'MYSQL',
            icon: '/logo/mysql.png',
        },
        {
            name: 'PostgreSQL',
            icon: '/logo/postgresql.png',
        },
        {
            name: 'JavaScript',
            icon: '/logo/js.png',
        },
    ],
    ai_ml: [
        {
            name: 'Kaggle',
            icon: '/logo/kaggle.png',
        },
        {
            name: 'OpenAI',
            icon: '/logo/openai.png',
        },
        {
            name: 'Google AI',
            icon: '/logo/google-ai.png',
        },
        {
            name: 'Anthropic',
            icon: '/logo/anthropic.png',
        },
        {
            name: 'Scikit-learn',
            icon: '/logo/scikit-learn.png',
        },
        {
            name: 'Pandas',
            icon: '/logo/pandas.png',
        },
        {
            name: 'NumPy',
            icon: '/logo/numpy.png',
        },
        {
            name: 'TensorFlow',
            icon: '/logo/tensorflow.png',
        },
    ],
    tools: [
        {
            name: 'Github',
            icon: '/logo/github.png',
        },
        {
            name: 'Git',
            icon: '/logo/git.png',
        },
        {
            name: 'Docker',
            icon: '/logo/docker.svg',
        },
        {
            name: 'Framer',
            icon: '/logo/framer.png',
        },
        {
            name: 'Adobe',
            icon: '/logo/adobe.png',
        },
        {
            name: 'Canva',
            icon: '/logo/canva.png',
        },
    ],
};

export const PROJECTS: IProject[] = [
    {
        title: 'HireSense v2.0',
        slug: 'hiresense-v2',
        liveUrl: 'https://github.com/Uchiha-byte/HireSense_v2.0',
        year: 2025,
        description: `
      AI-Powered Verification & Interview Engine for Authentic Hiring Decisions. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🧬 Unified Candidate Story: Cross-validates digital profiles (CV, LinkedIn, GitHub, LeetCode) to uncover authentic candidate truth.</li>
        <li>🎙️ Empathetic AI Interviews: Automated Zoom reference calls, tone & sentiment analysis, and bias-free candidate evaluations.</li>
        <li>🎯 Certainty Score: AI-generated holistic credibility score combining verified data, code stats, and conversation metrics.</li>
        <li>⚙️ Event-Driven Architecture: Built with FastAPI, Next.js 15, PostgreSQL (Supabase), Groq/Llama, ElevenLabs, and Zoom API.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Engineered full-stack verification pipelines with real-time Supabase subscriptions & fail-safe polling.</li>
        <li>Integrated OpenAI GPT-4 Vision, Groq fast inference, and local Whisper v3 audio transcription pipelines.</li>
        <li>Designed automated reference video/audio call recording, speech synthesis, and ATS sync (Ashby API).</li>
      </ul>
      `,
        role: `
      Full Stack & AI Lead Developer <br/>
      <ul>
        <li>Architected the end-to-end verification engine and event-driven data aggregation pipeline.</li>
        <li>Integrated AI LLM inference models, speech synthesis, and real-time database state syncing.</li>
      </ul>
      `,
        techStack: [
            'Next.js 15',
            'FastAPI',
            'TypeScript',
            'Python',
            'PostgreSQL',
            'Supabase',
            'Groq / LLaMA',
            'OpenAI GPT-4',
            'ElevenLabs',
            'Zoom API',
        ],
        thumbnail: '/projects/thumbnail/hiresense.png',
        longThumbnail: '/projects/long/hiresense.png',
        images: [
            '/projects/images/hiresense-1.png',
        ],
    },
    {
        title: 'BlitzAI',
        slug: 'blitz-ai',
        liveUrl: 'https://github.com/Uchiha-byte/GooglexKaggle_Capstone_Project',
        year: 2024,
        description: `
      Multi-Agent AI Competition Assistant. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🤖 Specialized Agents: Model Improvement, Feature Engineering, Debugging, Strategy, and Insights agents.</li>
        <li>🧠 Memory System: Maintains rolling conversation context and summarized memory snapshots.</li>
        <li>🛠️ Custom Tools: Function calling for ML workflows (e.g., suggest_model_improvements, debug_code_issue).</li>
        <li>📊 Observability: Comprehensive logging of agent routing, execution time, and error traces.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Architected a multi-agent system using Google Gemini API for reasoning and tool routing.</li>
        <li>Implemented a central Coordinator Agent to intelligently route queries to specialized experts.</li>
        <li>Built a production-style orchestration with stateful/stateless agent mix and error-resistant execution.</li>
      </ul>
      `,
        role: `
      Lead Developer <br/>
      <ul>
        <li>Designed the multi-agent architecture and coordinator logic.</li>
        <li>Integrated Google Gemini API and custom ML tools.</li>
      </ul>
      `,
        techStack: [
            'Python',
            'Google Gemini API',
            'Multi-Agent Systems',
            'Pandas',
            'Scikit-learn',
        ],
        thumbnail: '/projects/thumbnail/blitzai.png',
        longThumbnail: '/projects/long/blitzai.png',
        images: [
            '/projects/images/blitzai-1.png',
        ],
    },
    {
        title: 'TruthScan',
        slug: 'truthscan',
        liveUrl: 'https://github.com/Uchiha-byte/TruthScan',
        year: 2024,
        description: `
      Defending Digital Truth Through Intelligent Content Verification. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🎯 Multi-Modal Detection: Text Analysis (GPT fingerprinting), Image Forensics (GAN artifacts), Audio & Video Verification.</li>
        <li>🧠 Intelligence Matrix: Geospatial threat mapping and real-time threat feeds.</li>
        <li>📊 Real-time Analytics: Live detection statistics, performance metrics, and comprehensive reporting.</li>
        <li>🖥️ Cyberpunk UI: Futuristic interface with real-time data streaming.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Developed a Flask backend with Python 3.7+ and a Tailwind CSS frontend.</li>
        <li>Integrated multiple detection models including BERT for text and CNNs for image/video analysis.</li>
        <li>Implemented real-time threat intelligence monitoring and geospatial analysis.</li>
      </ul>
      `,
        role: `
      Full Stack Developer <br/>
      <ul>
        <li>Built the entire platform from backend (Flask) to frontend (HTML/Tailwind).</li>
        <li>Integrated AI detection models and threat intelligence feeds.</li>
      </ul>
      `,
        techStack: [
            'Flask',
            'Python',
            'Tailwind CSS',
            'JavaScript',
            'AI/ML',
        ],
        thumbnail: '/projects/thumbnail/truthscan.png',
        longThumbnail: '/projects/long/truthscan.png',
        images: [
            '/projects/images/truthscan-1.png',
        ],
    },
    {
        title: 'MedNexus',
        slug: 'mednexus',
        liveUrl: 'https://github.com/Uchiha_byte/MedNexus',
        year: 2024,
        description: `
      Advanced Disease Diagnosis with ML and AI. <br/> <br/>
      
      Key Features:<br/>
      <ul>
        <li>🤖 AI-Powered Diagnosis: Google's Generative AI (Gemini) for personalized health insights.</li>
        <li>🩺 Multi-Disease Prediction: Heart, Kidney, Diabetes, Liver, and Stroke prediction models.</li>
        <li>🎯 Automated Training: Unified pipeline for data preprocessing, feature engineering, and model versioning.</li>
        <li>💻 Modern UI: Dark-themed, responsive Streamlit interface with real-time predictions.</li>
      </ul><br/>
      
      Technical Highlights:
      <ul>
        <li>Built with Python, Streamlit, Scikit-learn, Pandas, and Google Gemini.</li>
        <li>Implemented an automated training pipeline with joblib serialization and versioning.</li>
        <li>Integrated Google's Generative AI for analyzing medical reports and providing recommendations.</li>
      </ul>
      `,
        role: `
      Machine Learning Engineer / Web Developer <br/>
      <ul>
        <li>Developed the end-to-end ML pipeline and Streamlit application.</li>
        <li>Integrated Google Gemini for generative AI capabilities.</li>
      </ul>
      `,
        techStack: [
            'Python',
            'Streamlit',
            'Google Gemini',
            'Scikit-learn',
            'Pandas',
        ],
        thumbnail: '/projects/thumbnail/mednexus.png',
        longThumbnail: '/projects/long/mednexus.png',
        images: [
            '/projects/images/mednexus-1.png',
        ],
    },
    {
        title: 'RAG System',
        slug: 'rag-system',
        liveUrl: 'https://github.com/Uchiha-byte/RAG',
        year: 2024,
        description: `
      Retrieval-Augmented Generation System. <br/> <br/>
      
      An advanced system for intelligent document querying and information extraction using state-of-the-art LLMs and vector databases.
      `,
        role: `
      AI Engineer <br/>
      <ul>
        <li>Implemented the retrieval pipeline using vector databases.</li>
        <li>Optimized generation logic for accurate responses.</li>
      </ul>
      `,
        techStack: [
            'Python',
            'LangChain',
            'Vector DB',
            'LLMs',
        ],
        thumbnail: '/projects/thumbnail/rag.png',
        longThumbnail: '/projects/long/rag.png',
        images: [
            '/projects/images/rag-1.png',
        ],
    },
];

export const MY_EXPERIENCE = [
    {
        title: 'Machine Learning Internship',
        company: 'SystemTron',
        duration: 'Jan 2025 - Mar 2025',
    },
    {
        title: 'AI Powered Smart Vehicle Services System',
        company: 'Project',
        duration: 'Nov 2024 - Feb 2025',
    },
    {
        title: 'MedNexus - Advanced Disease Diagnosis',
        company: 'Project',
        duration: 'Jan 2024 - July 2024',
    },
];
export const MY_CERTIFICATES = [
    {
        title: 'Technical Support Fundamentals',
        issuer: 'Google (Coursera)',
        date: '10 Jan 2024',
        credentialUrl: 'https://coursera.org/verify/9LJBY38YLKNS',
        description: 'Successfully completed Google’s Technical Support Fundamentals course, covering IT support basics, troubleshooting, networking, operating systems, system administration, and customer service principles.',
        image: '/certificates/cert-google-tech-support.png',
    },
    {
        title: 'Certificate of Organising – Web Development 2.0 with WordPress',
        issuer: 'NexGen Coders Club, Nawab Shah Alam Khan College of Engineering and Technology',
        date: '11 Jan 2025',
        credentialUrl: '#',
        description: 'Recognized for organizing and actively contributing to the Web Development 2.0 with WordPress workshop, gaining practical experience in AI-powered web development and event coordination.',
        image: '/certificates/cert-webdev-wordpress.png',
    },
    {
        title: 'Certificate of Recognition – GenAI X GitHub',
        issuer: 'NexGen Coders Club, Nawab Shah Alam Khan College of Engineering and Technology',
        date: '21 Apr 2025',
        credentialUrl: '#',
        description: 'Recognized for valuable contribution as an organiser in “GenAI X GitHub”, a hands-on learning event focused on Generative AI and GitHub collaboration.',
        image: '/certificates/cert-genai-github.png',
    },
    {
        title: 'Certificate of Recognition – PyLeap: From Basics To Brilliance',
        issuer: 'NexGen Coders Club, Nawab Shah Alam Khan College of Engineering and Technology',
        date: '20 Sept 2025',
        credentialUrl: '#',
        description: 'Awarded for exceptional contributions as a member of the organizing team for “PyLeap: From Basics To Brilliance”, demonstrating leadership, teamwork, and event execution skills.',
        image: '/certificates/cert-pyleap.png',
    },
    {
        title: 'MumbaiHacks 2025 Participation Certificate',
        issuer: 'Tech Entrepreneurs Association of Mumbai (TEAM) & Made in Mumbai',
        date: '28–29 Nov 2025',
        credentialUrl: '#',
        description: 'Awarded for actively participating in MumbaiHacks 2025, the largest Agentic AI hackathon, collaborating in a high-intensity innovation environment focused on AI-driven solutions.',
        image: '/certificates/cert-mumbaihacks.png',
    },
    {
        title: 'Certificate of Recognition – Hands-On AI and Machine Learning Workshop',
        issuer: 'NexGen Coders Club, Nawab Shah Alam Khan College of Engineering and Technology',
        date: '20 Dec 2025',
        credentialUrl: '#',
        description: 'Recognized for outstanding performance and valuable contributions as a Core Member in the Hands-On AI and Machine Learning Workshop, showcasing active involvement in AI/ML concepts and implementation.',
        image: '/certificates/cert-ai-ml-workshop.png',
    },
];
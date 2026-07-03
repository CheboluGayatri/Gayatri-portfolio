export interface Project {
  title: string;
  description: string;
  longDescription: string;
  tags: string[];
  liveUrl?: string;
  codeUrl: string;
  category: 'Featured' | 'Other';
  features: string[];
  screenshotUrl?: string;
}

export interface Internship {
  company: string;
  role: string;
  duration: string;
  highlights: string[];
  skillsLearned: string[];
}

export interface Education {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  highlights: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  date?: string;
  grade?: string;
  verificationUrl?: string;
  iconType: 'ai' | 'ml' | 'web' | 'skills' | 'genai';
  type: 'course' | 'internship';
  verificationId?: string;
  skills?: string[];
  signature?: string;
  signeeTitle?: string;
  tasks?: string[];
  qrCodeText?: string;
}

export interface SkillsGroup {
  category: string;
  skills: { name: string; level: number }[];
}

export const GAYATRI_DATA = {
  name: "Gayatri Chebolu",
  role: "Aspiring AI/ML Engineer",
  tagline: "Passionate about Artificial Intelligence and Machine Learning and committed to continuous learning, exploring emerging technologies, and building intelligent solutions through hands-on projects that solve real-world problems.",
  shortAbout: "Hi, I'm Gayatri. Passionate about Artificial Intelligence and Machine Learning and committed to continuous learning, exploring emerging technologies, and building intelligent solutions through hands-on projects that solve real-world problems.",
  fullAbout: "Hi, I'm Gayatri. Passionate about Artificial Intelligence and Machine Learning and committed to continuous learning, exploring emerging technologies, and building intelligent solutions through hands-on projects that solve real-world problems.",
  email: "gayathrichebolu6@gmail.com",
  phone: "+91-9154605089",
  location: "Andhra Pradesh, India",
  github: "https://github.com/CheboluGayatri",
  linkedin: "https://www.linkedin.com/in/gayatri-chebolu/",
  stats: [
    { label: "B.Tech GPA", value: "7.78/10" },
    { label: "AI/ML Projects", value: "8+" },
    { label: "Hours Training", value: "100s+" },
    { label: "Certifications", value: "6+" }
  ],
  educationList: [
    {
      institution: "Kakinada Institute of Engineering and Technology for Women",
      degree: "Bachelor of Technology (B.Tech) in Computer Science and Artificial Intelligence",
      duration: "2022 – 2026",
      score: "GPA: 7.78 / 10",
      highlights: ["Deep technical focus on Machine Learning models, Neural Networks, and NLP workflow execution.", "Designed, analyzed, and implemented multiple Streamlit-based model deployments."]
    },
    {
      institution: "Triveni Junior College",
      degree: "Intermediate Education (MPC)",
      duration: "2020 – 2022",
      score: "GPA: 9.07 / 10",
      highlights: ["Strong foundational base in Advanced Mathematics, Physics, and Physics modeling calculations."]
    },
    {
      institution: "Triveni Educational Academy",
      degree: "Secondary School Certificate (SSC)",
      duration: "2019 – 2020",
      score: "GPA: 10 / 10",
      highlights: ["Completed 10th class with a maximum distinction score of 10.0 CGPA."]
    }
  ] as Education[],
  internships: [
    {
      company: "3Skill",
      role: "AI/ML Intern",
      duration: "December 2025 – February 2026",
      highlights: [
        "Processed and analyzed massive structured datasets using Python, NumPy, and Pandas to perform predictive modeling and regression validation.",
        "Engineered Random Forest classification models and optimized hyperparameters.",
        "Evaluated models using Precision, Recall, and AUC-ROC metrics.",
        "Applied feature-selection techniques to improve prediction quality.",
        "Built maintainable modular ML workflows.",
        "Published Streamlit applications for real-time testing and evaluation."
      ],
      skillsLearned: ["Python", "NumPy", "Pandas", "Scikit-learn", "Random Forest", "Streamlit", "Feature Engineering"]
    },
    {
      company: "Infosys Springboard",
      role: "AI Intern",
      duration: "September 2025 – November 2025",
      highlights: [
        "Engineered LLM-powered productivity tools.",
        "Designed multi-stage Prompt Engineering pipelines.",
        "Integrated OCR workflows with Gemini-based context processing.",
        "Automated workflows using RPA and AI inference pipelines."
      ],
      skillsLearned: ["Generative AI", "LLMs", "Prompt Engineering", "OCR Integration", "Streamlit", "Ollama", "RPA"]
    },
    {
      company: "Continuous Professional Upskilling",
      role: "Self-Learning",
      duration: "June 2026 – Present",
      highlights: [
        "Continuously strengthening knowledge in Machine Learning and Artificial Intelligence.",
        "Exploring Neural Networks, CNNs, Transformers, and LLM concepts.",
        "Building projects using PyTorch, Scikit-learn, NumPy, Pandas, and Streamlit.",
        "Studying Agentic AI systems, prompt engineering techniques, and modern AI workflows."
      ],
      skillsLearned: ["Neural Networks", "PyTorch", "Scikit-learn", "NumPy", "Pandas", "Streamlit", "Agentic AI"]
    }
  ] as Internship[],
  projects: [
    {
      title: "AI Health Symptom Checker",
      description: "AI-powered clinical diagnostic helper featuring voice command interface, SQLite database loggers, and automated report generators.",
      longDescription: "A comprehensive medical symptom checking and assistant application engineered with Python and Flask. The platform offers instant symptom matching and AI-driven clinical insights.\n\nBuilt with Python, Flask, and an SQLite database, the system integrates Hugging Face Transformers for advanced Natural Language Processing and LLM-driven medical symptom checks. It features speech-to-text integration using the Web Speech API and SpeechRecognition to enable voice queries, and automates structured clinical PDF reports via ReportLab.\n\nKey Technologies & Libraries:\n• Web Framework: Flask, HTML5, CSS3, Bootstrap 5, JavaScript\n• Data Analysis & Machine Learning: Pandas, NumPy, Scikit-learn (Random Forest, classification and feature engineering), Matplotlib, Seaborn\n• Artificial Intelligence: Hugging Face Transformers, Natural Language Processing (NLP)\n• System Integration: SQLite for history, SpeechRecognition for verbal inputs, ReportLab for PDF medical report generation",
      tags: ["Python", "Flask", "Scikit-Learn", "Hugging Face", "SQLite", "ReportLab", "Web Speech API", "Bootstrap 5", "Pandas"],
      liveUrl: "https://ai-health-symptom-check.onrender.com/",
      codeUrl: "https://github.com/CheboluGayatri/AI_HEALTH_SYMPTOM_CHECK",
      category: "Featured",
      features: [
        "Developed a robust Flask server with secure SQLite database logging for health assessment history.",
        "Integrated Hugging Face NLP and Scikit-learn pipelines to match, categorize, and prioritize symptoms.",
        "Engineered real-time SpeechRecognition and Web Speech API features for hands-free diagnostic queries.",
        "Created an automated clinical report builder using ReportLab to generate and export downloadable PDF summaries.",
        "Configured responsive analytics dashboards using Matplotlib and Seaborn for tracking symptom metrics over time."
      ]
    },
    {
      title: "House Price Prediction System",
      description: "Interactive real estate valuation regression dashboard featuring multivariable house traits and dynamic forecasting.",
      longDescription: "A high-performance supervised machine learning regression application engineered using Python and Streamlit. This professional real estate valuation system leverages multi-variable structural housing datasets to deliver immediate price predictions.\n\nThe system cleans housing records, handles multi-collinearity, isolates outliers, and trains a robust Scikit-Learn Linear Regression model. It features a responsive sidebar controller that captures live user-specified design metrics to output instant housing valuations with high statistical confidence.\n\nInput Metrics Evaluated:\n• Total Area (sq ft) - Total living area scale\n• Bedrooms - Structural room occupancy count\n• Bathrooms - Washroom facility count\n• Number of Stories - Multi-floor elevation tier\n• Parking Spaces - Garage/carport allocation spaces\n• Main Road Access? - Proximity to logistical transit\n• Guest Room? - Secondary room amenity indicator\n\nStatistical Metrics Measured:\n• Model accuracy benchmarks with MAE and R-Square evaluations\n• Real-time predictions outputted dynamically with visual chart updates",
      tags: ["Python", "Pandas", "Scikit-Learn", "Streamlit", "Linear Regression", "Feature Engineering", "Data Analytics"],
      liveUrl: "https://houseprice-kcvnxs5sxgawny4wzehj52.streamlit.app/",
      codeUrl: "https://github.com/CheboluGayatri/HousePrice",
      category: "Featured",
      features: [
        "Configured an interactive sidebar for dynamic capture of structural house parameters.",
        "Built a robust multivariable linear regression prediction pipeline with feature scaling.",
        "Delivered reactive estimated price valuations using real-time local model execution.",
        "Engineered visual statistical metrics to trace model training coefficients and accuracy levels."
      ]
    },
    {
      title: "Wine Quality Prediction",
      description: "Supervised machine learning scoring system predicting red wine grade tiers using chemical compounds.",
      longDescription: "An advanced machine learning classification application developed during the 3Skill AI/ML internship. The system models physical and chemical measurements sourced from curated Kaggle open-source repositories to score and evaluate final Wine Quality ratings in real time.\n\nBuilt entirely with Python, NumPy, Pandas, Scikit-Learn, and Streamlit, this end-to-end data pipeline handles null values, performs hyperparameter tuning, and trains a highly precise Random Forest model. A customized dark glassmorphism user interface provides slider controllers to dynamically test chemical formulations and estimate wine grades.\n\nPhysicochemical Properties Modeled:\n• Fixed Acidity - Level of organic acids\n• Volatile Acidity - Volatile acid content representing spoilage indicators\n• Citric Acid - Freshness and flavor enhancement attributes\n• Residual Sugar - Post-fermentation sweetness scales\n• Chlorides & Sulphates - Chemical preservation benchmarks\n• Alcohol Content - Final volume concentration percentage",
      tags: ["Python", "Pandas", "Scikit-Learn", "Random Forest", "Streamlit", "Feature Engineering", "Kaggle Dataset", "Custom CSS", "Streamlit Cloud"],
      liveUrl: "https://wine-quality-pdk.streamlit.app/",
      codeUrl: "https://github.com/CheboluGayatri/Wine-Quality",
      category: "Featured",
      features: [
        "Sourced and cleaned professional chemical datasets from Kaggle using Pandas dropna().",
        "Utilized Scikit-learn to train Random Forest ensembles with precise hyperparameter tuning.",
        "Engineered an interactive Streamlit dashboard complete with custom glassmorphism styling.",
        "Evaluated model performance using classification metrics, Precision, Recall, and AUC-ROC curves."
      ]
    },
    {
      title: "Iris Flower Classification",
      description: "Vibrant pattern recognition classifier evaluating biological flower dimensions to determine biological species.",
      longDescription: "A classic pattern recognition model designed to categorize botanical Iris species based on precise morphological traits. This multi-class supervised learning classifier is built with Python and deployed as a Streamlit cloud web application.\n\nThe system utilizes Scikit-Learn multi-class classification algorithms to analyze sepal and petal parameters and instantly predict whether a specimen is Iris-Setosa, Iris-Versicolor, or Iris-Virginica. A beautiful sunset lavender field interactive layout guides students and botanists through real-time prediction workflows.\n\nMorphological Dimensions Tracked:\n• Sepal Length (cm) - Input length range of outer flower sepals\n• Sepal Width (cm) - Width characteristics of outer flower sepals\n• Petal Length (cm) - Length parameters of inner flower petals\n• Petal Width (cm) - Width attributes of inner flower petals\n\nClassification Output:\n• Dynamic species matching displaying highest confidence level (such as Iris-setosa)",
      tags: ["Python", "Scikit-Learn", "NumPy", "Streamlit", "Classification Models", "Pattern Recognition", "SVM"],
      liveUrl: "https://irisflower-3jsd8hxlshmbm6jzrcuefj.streamlit.app/",
      codeUrl: "https://github.com/CheboluGayatri/Iris_Flower",
      category: "Featured",
      features: [
        "Implemented high-accuracy multi-class Support Vector Machines (SVM) for pattern recognition.",
        "Created an intuitive input panel with interactive step increments for quick measurements.",
        "Styled the web application utilizing custom botanical sunset-theme visuals.",
        "Calculated dynamic probability distributions showing prediction likelihood coefficients."
      ]
    },
    {
      title: "CodeGenAi & Explainer",
      description: "LLM-driven smart editor generating tailored scripts and parsing logic step-by-step.",
      longDescription: "An interactive Generative AI helper designed to convert natural language queries into optimized code snippets while offering comprehensive step-by-step line-by-line logical explanations. Designed during the Infosys Springboard internship training timeline.",
      tags: ["GenAI", "LLMs", "Prompt Engineering", "Python", "Streamlit", "Ollama"],
      codeUrl: "https://github.com/CheboluGayatri/CodeGenAiand_Explainer",
      category: "Other",
      features: [
        "Natural language prompt synthesis turning user-requests into executable scripts with strict linting rules",
        "Interactive step-by-step code highlighter explaining complex algorithmic logic segments",
        "Adaptive prompt configurations for varying languages (Python, TS, SQL)"
      ]
    },
    {
      title: "AI Chatbot Web Application",
      description: "Responsive conversational interface engineered with HTML, CSS, JavaScript, and AI tools.",
      longDescription: "A fully custom web chat client configured for natural, conversational instruction handling, developed using advanced HTML5 structure, custom CSS3 styling, clean modern JavaScript, and AI-assisted development paradigms like ChatGPT.",
      tags: ["HTML", "CSS", "JavaScript", "ChatGPT", "AI tools", "Responsive UI"],
      codeUrl: "https://github.com/CheboluGayatri/-AI--Chatbot--Web--Application",
      category: "Other",
      features: [
        "Interactive message streams matching chat logs with elegant transitions",
        "Engineered responsive chat windows and interactive conversational states using HTML5 and CSS3 styling",
        "Applied pure JavaScript to handle message feed streams dynamically and efficiently",
        "Used AI-assisted methodologies like ChatGPT to model structured UI designs and pristine layout controls"
      ]
    },
    {
      title: "AI-Quiz Generator",
      description: "A lightweight educational assessment application generating and evaluating quizzes.",
      longDescription: "A lightweight educational assessment application that generates and evaluates quizzes from structured question repositories.",
      tags: ["Python", "Streamlit", "Questions.txt", "Assessment Logic", "Interactive UI"],
      codeUrl: "https://github.com/CheboluGayatri/ai-quiz-generator",
      category: "Other",
      features: [
        "Built interactive quiz workflows using Streamlit.",
        "Managed question banks using text-based repositories.",
        "Automated answer evaluation and score tracking.",
        "Displayed assessment results in an intuitive interface.",
        "Focused on improving student engagement and learning outcomes."
      ]
    },
    {
      title: "Movie-Verse",
      description: "A self-learning front-end project to discover and filter movie recommendations.",
      longDescription: "A self-learning front-end project developed with the assistance of AI tools to strengthen practical web development skills by creating a responsive movie recommendation platform.",
      tags: ["HTML", "CSS", "JavaScript", "AI-Assisted Learning"],
      codeUrl: "https://github.com/CheboluGayatri/Movie-versa",
      category: "Other",
      features: [
        "Designed dynamic movie cards using modern layouts.",
        "Implemented interactive search and filtering experiences.",
        "Built responsive interfaces adaptable across devices.",
        "Applied JavaScript to improve user interaction and content display.",
        "Enhanced understanding of front-end development through AI-assisted learning."
      ]
    },
    {
      title: "Travel-Tales",
      description: "A self-learning front-end project exploring responsive design and spiritual travel storytelling.",
      longDescription: "A self-learning front-end project created with AI assistance to explore responsive web design through a spiritual travel and storytelling experience.",
      tags: ["HTML", "CSS", "JavaScript", "Responsive Design", "AI-Assisted Learning"],
      codeUrl: "https://github.com/CheboluGayatri/Travel-Tales",
      category: "Other",
      features: [
        "Designed immersive travel destination layouts.",
        "Built responsive card-based interfaces.",
        "Developed interactive navigation using JavaScript.",
        "Enhanced user experience across mobile and desktop devices.",
        "Strengthened practical front-end skills through AI-guided implementation."
      ]
    }
  ] as Project[],
  certificationsList: [
    {
      name: "Foundations of Modern Machine Learning (FMML)",
      issuer: "IIIT Hyderabad (iHub-Data)",
      date: "19 August 2023 - 11 May 2024",
      grade: "Grade A",
      iconType: "ml",
      type: "course",
      verificationId: "IIITH-FMML-88",
      signature: "C K Raju \u270d",
      signeeTitle: "Head of Programs, iHub-Data, IIIT Hyderabad",
      skills: ["Supervised ML", "Neural Networks", "NLP Foundations", "Classification & Regression", "Pattern Classification"],
      qrCodeText: "IIIT Hyderabad FMML - Grade A - Gayatri Chebolu"
    },
    {
      name: "Edunet-Artificial Intelligence",
      issuer: "IBM SkillsBuild (Edunet Foundation)",
      date: "17 Dec 2025",
      iconType: "ai",
      type: "course",
      verificationId: "PLAN-8A48645196FA",
      signature: "IBM SkillsBuild Team \u270d",
      signeeTitle: "Education Lead, IBM & Edunet Partner",
      skills: ["Artificial Intelligence", "Cognitive Workloads", "Machine Learning Foundations", "AI Applications"],
      qrCodeText: "IBM SkillsBuild - PLAN-8A48645196FA - Gayatri Chebolu"
    },
    {
      name: "GenAI Job Simulation",
      issuer: "BCG X (Forage)",
      date: "August 13th, 2025",
      iconType: "genai",
      type: "internship",
      verificationId: "ooi7JDahHtGKnPhe3",
      signature: "Tom Brunskill \u270d",
      signeeTitle: "CEO & Co-Founder, Forage (BCG X)",
      tasks: ["Data extraction and initial analysis", "Developing an AI-powered financial chatbot"],
      skills: ["Generative AI Pipelines", "Chatbot Development", "Financial Analysis", "Large Language Models"],
      qrCodeText: "Forage BCG X - ooi7JDahHtGKnPhe3 - Gayatri Chebolu"
    },
    {
      name: "JobReady: Employability Skills",
      issuer: "Wadhwani Foundation (Eduskills Foundation)",
      date: "September 09, 2025",
      grade: "Basic Level (79 Hours)",
      iconType: "skills",
      type: "course",
      verificationId: "WF-BASIC-2025-09",
      signature: "Ajay Kela ✍",
      signeeTitle: "CEO, Wadhwani Foundation",
      skills: ["Employability Skills", "79 Hours Training", "Professional Communications", "Teamwork & Collaboration"],
      qrCodeText: "Wadhwani Foundation - JobReady Basic - Gayatri Chebolu"
    },
    {
      name: "Applied Artificial Intelligence: Practical Implementations",
      issuer: "Microsoft & SAP (TechSaksham Program)",
      date: "Year 2024-25",
      grade: "Achievement Certified",
      iconType: "ai",
      type: "course",
      verificationId: "TSPIN25_590292",
      signature: "Edunet Foundation ✍",
      signeeTitle: "CSR Team Lead, Microsoft & SAP Initiative",
      skills: ["Applied Artificial Intelligence", "Practical ML Implementations", "Cognitive Apps", "Cloud Integration"],
      qrCodeText: "TechSaksham Applied AI - TSPIN25_590292 - Gayatri Chebolu"
    },
    {
      name: "Career Management Essentials",
      issuer: "IBM SkillsBuild",
      date: "Year 2025",
      grade: "Certified Complete",
      iconType: "skills",
      type: "course",
      verificationId: "IBM-CME-2025",
      signature: "IBM Team ✍",
      signeeTitle: "IBM SkillsBuild Learning Facilitator",
      skills: ["Career Planning", "Professional Communication", "Employability Pathports"],
      qrCodeText: "IBM SkillsBuild - Career Management Essentials - Gayatri Chebolu"
    },
    {
      name: "Web Development with HTML, CSS, and JavaScript Internship",
      issuer: "ApexPlanet Software Pvt. Ltd.",
      date: "01 August, 2025 - 15 September, 2025",
      grade: "High Distinction",
      iconType: "web",
      type: "internship",
      verificationId: "APSPL2513808",
      signature: "Kundan Kumar \u270d",
      signeeTitle: "Founder & CEO, ApexPlanet Software Pvt. Ltd.",
      skills: ["HTML5", "CSS3 Animation", "JavaScript ES6+", "Responsive UI", "Web Engineering"],
      qrCodeText: "ApexPlanet Internship - APSPL2513808 - Gayatri Chebolu"
    },
    {
      name: "AIMI Internship (Ai & Machine Learning)",
      issuer: "3Skill India",
      date: "December 2025 - February 2026",
      grade: "Two-Month Complete",
      iconType: "ml",
      type: "internship",
      verificationId: "INTERN260042",
      signature: "S. Levin \u270d",
      signeeTitle: "CEO, 3Skill India Program Board",
      skills: ["Applied ML", "AIMI Interlink Applets", "Dataset Validation", "Predictive Classifiers"],
      qrCodeText: "3Skill India - INTERN260042 - Gayatri Chebolu"
    },
    {
      name: "Internship 6.0 (B2) CodeGenie: AI Explainer and Code Generator",
      issuer: "Infosys Springboard",
      date: "September 1, 2025 - November 5, 2025",
      grade: "A+ Grade Complete",
      iconType: "genai",
      type: "internship",
      verificationId: "INF-6.0-B2-CG",
      signature: "Satheesha B. Nanjappa \u270d",
      signeeTitle: "Senior VP & Head, Education, Training & Assessment, Infosys",
      skills: ["CodeGenie AI Generator", "Ollama Integrations", "Mandatory RPA Workflows", "Prompt Engineering"],
      qrCodeText: "Infosys Springboard - CodeGenie 6.0 - Gayatri Chebolu"
    }
  ] as Certification[],
  skillsData: [
    {
      category: "Programming & Web Development",
      skills: [
        { name: "Python Programming", level: 95 },
        { name: "Flask (Web Framework)", level: 91 },
        { name: "HTML5 & CSS3 Web Styling", level: 92 },
        { name: "Bootstrap 5 & ES6+ JavaScript", level: 88 }
      ]
    },
    {
      category: "Data Analysis & Machine Learning",
      skills: [
        { name: "Supervised Learning & Regression", level: 93 },
        { name: "Model Training & Evaluation", level: 91 },
        { name: "Feature Engineering", level: 90 },
        { name: "Scikit-Learn & Random Forest", level: 92 },
        { name: "NumPy & Pandas Analysis", level: 94 },
        { name: "Matplotlib & Seaborn", level: 89 }
      ]
    },
    {
      category: "AI & Natural Language Processing (NLP)",
      skills: [
        { name: "Prompt Engineering", level: 95 },
        { name: "Hugging Face Transformers", level: 88 },
        { name: "NLP & LLM Applications", level: 91 },
        { name: "Ollama Orchestration & RAG", level: 85 },
        { name: "OCR Integration Pipelines", level: 83 }
      ]
    },
    {
      category: "Tools & Deployment",
      skills: [
        { name: "Git & GitHub Version Control", level: 92 },
        { name: "Streamlit UI Development", level: 94 },
        { name: "ReportLab (PDF Automation)", level: 85 },
        { name: "Web Speech API & SpeechRecognition", level: 87 },
        { name: "VS Code & Robotic Process Automation (RPA)", level: 90 }
      ]
    }
  ] as SkillsGroup[]
};

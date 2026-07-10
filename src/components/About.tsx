<<<<<<< HEAD
import React, { useState, useEffect } from "react";
import { 
  Code2, Database, Table, Cpu, Network, LineChart, Monitor, GitBranch, FileCode2, Bot, GraduationCap, Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import { useAssetDetection, defaultProfile as defaultProfilePic } from "../utils/assetDetector";
import { useImageLoader } from "../hooks/useImageLoader";

interface StatusItem {
  label: string;
  value: string;
}

interface AboutProps {
  fullAbout: string;
  stats: StatusItem[];
  location: string;
  email: string;
  phone: string;
  onNavigate: (id: string) => void;
}

export default function About({ fullAbout, stats, location, email, phone, onNavigate }: AboutProps) {
  const assets = useAssetDetection();
  
  const rawProfileSrc = assets.profileUrl || defaultProfilePic;

  const [profileImage, setProfileImage] = useState(rawProfileSrc);

  useEffect(() => {
    setProfileImage(rawProfileSrc);
  }, [rawProfileSrc]);

  // Handle broken images gracefully: fall back to pre-packaged local profile image
  const handleImageError = () => {
    console.warn("About section profile image failed to load, falling back to local default.");
    if (profileImage !== defaultProfilePic) {
      setProfileImage(defaultProfilePic);
    }
  };

  const { isLoaded: isImageLoaded } = useImageLoader([profileImage]);

  const technologies = [
    { name: "Python", icon: <Code2 className="w-3.5 h-3.5 text-emerald-400" /> },
    { name: "NumPy", icon: <Database className="w-3.5 h-3.5 text-cyan-400" /> },
    { name: "Pandas", icon: <Table className="w-3.5 h-3.5 text-teal-400" /> },
    { name: "Scikit-learn", icon: <Cpu className="w-3.5 h-3.5 text-orange-400" /> },
    { name: "TensorFlow", icon: <Network className="w-3.5 h-3.5 text-yellow-500" /> },
    { name: "Matplotlib", icon: <LineChart className="w-3.5 h-3.5 text-indigo-400" /> },
    { name: "Streamlit", icon: <Monitor className="w-3.5 h-3.5 text-red-500" /> },
    { name: "Git", icon: <GitBranch className="w-3.5 h-3.5 text-amber-500" /> },
    { name: "Jupyter Notebook", icon: <FileCode2 className="w-3.5 h-3.5 text-blue-400" /> },
    { name: "Ollama", icon: <Bot className="w-3.5 h-3.5 text-pink-400" /> },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.2
      }
    }
  };

  const badgeVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, ease: "easeOut" } 
    }
  };

  return (
    <section id="about" className="relative bg-[#030712] py-28 px-6 sm:px-12 md:px-24 overflow-hidden border-t border-white/5">
      {/* Sci-Fi Radial Glow highlights */}
      <div className="absolute top-[34%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-indigo-650/4 blur-[130px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* LEFT COLUMN: Premium High-Fidelity Studio Portrait Terminal */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative"
          >
            <div 
              className="relative w-full max-w-[340px] aspect-[4/5] rounded-3xl bg-[#070e1e]/60 p-3 border border-blue-500/15 shadow-[0_0_50px_rgba(59,130,246,0.1)] group overflow-hidden"
            >
              {/* Corner tech accent brackets */}
              <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-blue-500/40 rounded-tl-md group-hover:border-blue-500/80 transition-colors" />
              <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-blue-500/40 rounded-tr-md group-hover:border-blue-500/80 transition-colors" />
              <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-blue-500/40 rounded-bl-md group-hover:border-blue-500/80 transition-colors" />
              <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-blue-500/40 rounded-br-md group-hover:border-blue-500/80 transition-colors" />

              {/* Glowing inner shadow border */}
              <div className="absolute inset-3 border border-white/5 rounded-2xl pointer-events-none z-30" />

              {/* Picture Screen Frame */}
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950 select-none z-10 shadow-2xl flex items-center justify-center">
                {!isImageLoaded && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/90 z-20">
                    <div className="w-8 h-8 rounded-full border-2 border-blue-500/10 border-t-blue-500/70 animate-spin mb-2" />
                    <span className="text-[9px] font-mono text-blue-500/65 tracking-widest uppercase animate-pulse">Preloading...</span>
                  </div>
                )}
                
                <motion.img
                  initial={{ opacity: 0 }}
                  animate={{ opacity: isImageLoaded ? 1 : 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  src={profileImage || undefined}
                  alt="Gayatri Chebolu Portrait"
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform brightness-100 contrast-100"
                />
                
                {/* Tech glass reflection sheen (very subtle and clean, no heavy dimming overlays) */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-white/[0.05] pointer-events-none z-20" />
=======
import { motion } from "motion/react";
import {
  Code2,
  Database,
 Table2,
  Brain,
  Cpu,
  ChartNoAxesCombined,
  MonitorSmartphone,
  GitBranch,
  NotebookPen,
  Bot,
} from "lucide-react";
import profileImage from "../assets/images/profile.png";

const techStack = [
  { name: "PYTHON", icon: Code2, color: "text-cyan-400" },
  { name: "NUMPY", icon: Database, color: "text-cyan-400" },
  { name: "PANDAS", icon: Table2, color: "text-cyan-400" },
  { name: "SCIKIT-LEARN", icon: Brain, color: "text-orange-400" },
  { name: "TENSORFLOW", icon: Cpu, color: "text-yellow-400" },
  { name: "MATPLOTLIB", icon: ChartNoAxesCombined, color: "text-indigo-400" },
  { name: "STREAMLIT", icon: MonitorSmartphone, color: "text-red-400" },
  { name: "GIT", icon: GitBranch, color: "text-orange-400" },
  { name: "JUPYTER NOTEBOOK", icon: NotebookPen, color: "text-blue-400" },
  { name: "OLLAMA", icon: Bot, color: "text-pink-400" },
];

export default function About() {
  return (
    <section
      id="about"
      className="relative py-24 bg-[#020817] border-t border-white/5 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-24 left-10 w-72 h-72 bg-blue-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid lg:grid-cols-2 gap-14 items-center"
        >
          {/* Left side image */}
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex justify-center lg:justify-start"
          >
            <div className="relative group">
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-blue-500/20 via-indigo-500/10 to-transparent blur-2xl opacity-80" />

              <div className="relative rounded-[2rem] border border-blue-500/20 p-3">
                <div className="overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                  <img
                    src={profileImage}
                    alt="Gayatri profile"
                    className="w-[320px] sm:w-[380px] lg:w-[420px] h-auto object-cover"
                  />
                </div>
>>>>>>> 6a3934a (Initial updated portfolio project)
              </div>
            </div>
          </motion.div>

<<<<<<< HEAD
          {/* RIGHT COLUMN: Redesigned typography detail matching mockup */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Title block */}
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[70px] sm:text-[85px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-500 tracking-tighter uppercase mb-4"
            >
              HELLO!
            </motion.h1>

            {/* Main Statement bio details block */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="font-sans text-[15px] sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mb-8"
            >
              {fullAbout || "Hi, I'm Gayatri Chebolu, an aspiring AI/ML Engineer and Computer Science graduate from Andhra Pradesh, India. Passionate about Artificial Intelligence, Machine Learning, and Generative AI, I enjoy building intelligent solutions, exploring emerging technologies, and continuously expanding my skills through hands-on learning and real-world projects."}
            </motion.p>

            {/* Technologies subtitle with requested format */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="w-full text-left"
            >
              <h3 className="text-xs font-mono font-bold text-blue-200 uppercase tracking-widest mb-6 leading-none block">
                // TECHNOLOGIES I WORK WITH
              </h3>
              
              {/* Badges styling as shown in the mockup: Dark navy capsules, white labels */}
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="flex flex-wrap gap-2.5 max-w-2xl"
              >
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
                    variants={badgeVariants}
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 450, damping: 15 }}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#0a1845] border border-[#112d7a] text-white text-[12.5px] font-mono leading-none font-bold tracking-tight cursor-default uppercase hover:bg-[#0d1f5c] hover:border-[#1e48c4] transition-all duration-300"
                  >
                    <div className="text-sm shrink-0">
                      {tech.icon}
                    </div>
                    <span>{tech.name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}
=======
          {/* Right side content */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-5">
              <span>01 // ABOUT ME</span>
            </div>

            <h2 className="font-display text-5xl sm:text-7xl font-black tracking-tight leading-none text-white">
              HELLO<span className="text-blue-500">!</span>
            </h2>

            <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-5 mb-7" />

            <div className="space-y-5 text-slate-300 text-sm sm:text-base leading-8 max-w-3xl">
              <p>
                Hi, I'm{" "}
                <span className="text-white font-semibold">Gayatri</span>. Passionate
                about Artificial Intelligence and Machine Learning and committed
                to continuous learning, exploring emerging technologies, and
                building intelligent solutions through hands-on projects that
                solve real-world problems.
              </p>
            </div>

            <div className="mt-10">
              <h3 className="text-blue-300 text-sm sm:text-base font-mono tracking-[0.2em] uppercase font-bold mb-6">
                // TECHNOLOGIES I WORK WITH
              </h3>

              <div className="flex flex-wrap gap-4">
                {techStack.map((tech) => {
                  const Icon = tech.icon;
                  return (
                    <div
                      key={tech.name}
                      className="flex items-center gap-3 px-5 py-3 rounded-2xl bg-[#10204a] border border-blue-500/30 text-white font-bold text-sm sm:text-base shadow-md hover:border-blue-400/50 transition-all"
                    >
                      <Icon className={`w-5 h-5 ${tech.color}`} />
                      <span className="font-mono tracking-wide">{tech.name}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
>>>>>>> 6a3934a (Initial updated portfolio project)

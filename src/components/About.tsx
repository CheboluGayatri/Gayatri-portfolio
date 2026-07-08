import React, { useState, useEffect } from "react";
import { 
  Code2, Database, Table, Cpu, Network, LineChart, Monitor, GitBranch, FileCode2, Bot, GraduationCap, Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import { useAssetDetection } from "../utils/assetDetector";
import { useImageLoader } from "../hooks/useImageLoader";
import defaultProfilePic from "../assets/images/profile.jpg";

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
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  src={profileImage || undefined}
                  alt="Gayatri Chebolu Portrait"
                  onError={handleImageError}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform brightness-[0.9] contrast-[1.05]"
                />
                
                {/* Tech scanline / glass reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-white/[0.03] pointer-events-none z-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-20" />
              </div>
            </div>
          </motion.div>

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

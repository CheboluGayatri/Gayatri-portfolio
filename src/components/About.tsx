import React from "react";
import { 
  Code2, Database, Table, Cpu, Network, LineChart, Monitor, GitBranch, FileCode2, Bot, Upload, GraduationCap, Briefcase
} from "lucide-react";
import { motion } from "motion/react";
import { useAssetDetection } from "../utils/assetDetector";
import { saveLocalMedia } from "../utils/db";
import defaultProfilePic from "../assets/images/default_profile_image_1781969359775.jpg";

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

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await saveLocalMedia("custom_profile", file);
      window.location.reload();
    } catch (err) {
      console.error("Failed to store custom profile picture:", err);
    }
  };

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

  return (
    <section id="about" className="relative bg-[#030712] py-28 px-6 sm:px-12 md:px-24 overflow-hidden border-t border-white/5">
      {/* Sci-Fi Radial Glow highlights */}
      <div className="absolute top-[34%] left-[-10%] w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-15%] w-[40rem] h-[40rem] rounded-full bg-indigo-650/4 blur-[130px] -z-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center">
          
          {/* LEFT COLUMN: Premium High-Fidelity Studio Portrait Terminal */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
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
              <div className="relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950 select-none z-10 shadow-2xl">
                <img
                  src={assets.profileUrl || defaultProfilePic}
                  alt="Gayatri Chebolu Portrait"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform brightness-[0.9] contrast-[1.05]"
                />
                
                {/* Tech scanline / glass reflection sheen */}
                <div className="absolute inset-0 bg-gradient-to-tr from-slate-950/40 via-transparent to-white/[0.03] pointer-events-none z-20" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none z-20" />

                {/* Professional Photo upload & modification overlay */}
                <label className="absolute inset-0 bg-[#040812]/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center gap-3.5 duration-300 transition-opacity cursor-pointer z-35">
                  <div className="w-11 h-11 rounded-xl bg-blue-500/10 border border-blue-500/25 flex items-center justify-center text-blue-450 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                    <Upload className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="text-center px-4">
                    <span className="text-[10px] font-mono font-black tracking-widest text-white uppercase bg-blue-600/90 hover:bg-blue-500/95 px-4 py-2 rounded-xl shadow-lg border border-blue-400/30 transition-all duration-300 inline-block">
                      REPLACE PORTFOLIO PHOTO
                    </span>
                    <p className="text-[8.5px] font-mono text-slate-400 uppercase tracking-widest mt-2">
                       Supports PNG, JPG, JPEG // Max 5MB
                    </p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfileUpload}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Redesigned typography detail matching mockup */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Title block */}
            <motion.h1 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="font-sans text-[70px] sm:text-[85px] leading-none font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-100 to-blue-500 tracking-tighter uppercase mb-4"
            >
              HELLO!
            </motion.h1>

            {/* Main Statement bio details block */}
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="font-sans text-[15px] sm:text-base text-slate-300 font-medium leading-relaxed max-w-2xl mb-8"
            >
              {fullAbout || "Hi, I'm Gayatri Chebolu, an aspiring AI/ML Engineer and Computer Science graduate from Andhra Pradesh, India. Passionate about Artificial Intelligence, Machine Learning, and Generative AI, I enjoy building intelligent solutions, exploring emerging technologies, and continuously expanding my skills through hands-on learning and real-world projects."}
            </motion.p>

            {/* Technologies subtitle with requested format */}
            <div className="w-full text-left">
              <h3 className="text-xs font-mono font-bold text-blue-200 uppercase tracking-widest mb-6 leading-none block">
                // TECHNOLOGIES I WORK WITH
              </h3>
              
              {/* Badges styling as shown in the mockup: Dark navy capsules, white labels */}
              <div className="flex flex-wrap gap-2.5 max-w-2xl">
                {technologies.map((tech) => (
                  <motion.div
                    key={tech.name}
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
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

import React, { useState, useRef } from "react";
import { ExternalLink, Github, BookOpen, X, ChevronLeft, ChevronRight, Sparkles, Terminal, Shield, ListCollapse, Folder, GitBranch } from "lucide-react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "motion/react";
import { Project } from "../data";
import { useAssetDetection } from "../utils/assetDetector";

// Import all static project screenshots so Vite bundles them properly
import housePriceScreenshot from "../assets/images/house_price_dashboard_1781588924241.jpg";
import wineQualityScreenshot from "../assets/images/wine_quality_dashboard_1781588938539.jpg";
import irisClassifierScreenshot from "../assets/images/iris_classifier_dashboard_1781588952509.jpg";
import codegenaiScreenshot from "../assets/images/codegenai_explainer_1781587930430.jpg";
import aiChatbotScreenshot from "../assets/images/ai_chatbot_1781587946547.jpg";
import thinkChampQuizScreenshot from "../assets/images/think_champ_quiz_1781587864651.jpg";
import thinkChampGenScreenshot from "../assets/images/think_champ_generator_1781587881537.jpg";
import movieVerseScreenshot from "../assets/images/movie_verse_1781587898014.jpg";
import travelTalesScreenshot from "../assets/images/travel_tales_1781587914134.jpg";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

function TiltCard({ children, className = "", onClick }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const springConfig = { damping: 22, stiffness: 220, mass: 0.6 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [6, -6]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-6, 6]), springConfig);
  
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], [0, 100]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], [0, 100]), springConfig);
  const glareOpacity = useSpring(useMotionValue(0), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
    glareOpacity.set(0.12);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: rotateX,
        rotateY: rotateY,
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
      whileHover={{ 
        y: -8,
        scale: 1.018,
        boxShadow: "0px 18px 36px rgba(59, 130, 246, 0.1)"
      }}
      className={`relative rounded-2xl bg-black/40 border border-white/5 cursor-pointer overflow-hidden transition-colors duration-350 ${className}`}
    >
      {/* Glare spotlight layer */}
      <motion.div
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle 140px at ${gx}% ${gy}%, rgba(255, 255, 255, 0.08), transparent)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-30 mix-blend-overlay"
      />
      
      {/* Outer subtle glow highlight layer */}
      <motion.div 
        style={{
          background: useTransform(
            [glareX, glareY],
            ([gx, gy]) => `radial-gradient(circle 240px at ${gx}% ${gy}%, rgba(59, 130, 246, 0.15), transparent)`
          ),
          opacity: glareOpacity,
        }}
        className="absolute inset-0 pointer-events-none z-20"
      />

      {children}
    </motion.div>
  );
}

interface ProjectsProps {
  projects: Project[];
}

export default function Projects({ projects }: ProjectsProps) {
  const assets = useAssetDetection();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Featured projects are those with liveUrl demos
  const featuredProjects = projects.filter(
    (project) => project.liveUrl !== undefined
  );

  // Other projects are those without liveUrl demos, excluding CodeGenAi & Explainer
  const otherProjects = projects.filter(
    (project) => project.liveUrl === undefined && project.title !== "CodeGenAi & Explainer"
  );

  const STATIC_PROJECT_SCREENSHOTS: Record<string, string[]> = {
    "House Price Prediction System": [housePriceScreenshot],
    "Wine Quality Prediction": [wineQualityScreenshot],
    "Iris Flower Classification": [irisClassifierScreenshot],
    "CodeGenAi & Explainer": [codegenaiScreenshot],
    "AI Chatbot Web Application": [aiChatbotScreenshot],
    "AI Quiz Generator": [thinkChampQuizScreenshot, thinkChampGenScreenshot],
    "Movie-versa": [movieVerseScreenshot],
    "Travel-Tales": [travelTalesScreenshot]
  };

  // Fetch screenshots using assets helper
  const getScreenshots = (productTitle: string): string[] => {
    // Prioritize static imports first as they are verified and bundled by Vite
    if (STATIC_PROJECT_SCREENSHOTS[productTitle] && STATIC_PROJECT_SCREENSHOTS[productTitle].length > 0) {
      return STATIC_PROJECT_SCREENSHOTS[productTitle];
    }
    return assets.projectScreenshots[productTitle] || [];
  };

  const handleOpenDetailedModal = (proj: Project) => {
    setSelectedProject(proj);
    setCarouselIndex(0);
  };

  const nextSlide = (total: number) => {
    setCarouselIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = (total: number) => {
    setCarouselIndex((prev) => (prev - 1 + total) % total);
  };

  // Render highly customized blue mockups for active live apps
  const renderProjectMockUI = (title: string) => {
    const screens = getScreenshots(title);
    if (screens.length > 0) {
      return (
        <div className="w-full h-full relative overflow-hidden group/img bg-[#020617] flex items-center justify-center border-b border-blue-950/20">
          <img
            src={screens[0] || undefined}
            alt={`${title} Preview`}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover group-hover/img:scale-105 duration-700"
          />
          <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-black/80 border border-blue-500/30 text-[8px] font-mono font-semibold tracking-wide text-blue-400 uppercase">
            LIVE_PHOTO_DETECTOR
          </div>
        </div>
      );
    }

    if (title.includes("House Price")) {
      return (
        <div className="w-full h-full bg-[#020617] p-4 font-mono text-[10px] text-slate-300 relative overflow-hidden flex flex-col justify-between border-b border-blue-950/20">
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-blue-500/20 mb-2">
            <span className="text-blue-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              House Price Evaluator
            </span>
            <span className="text-slate-500 text-[8px] uppercase font-black">Core ML</span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-[8px] flex-1">
            <div className="bg-slate-900/40 p-2 rounded space-y-1 flex flex-col justify-center border border-blue-950/10">
              <div className="text-[7px] text-blue-400 uppercase font-black tracking-wider">Features Grid</div>
              <div className="flex justify-between border-b border-white/5 pb-0.5">
                <span>Total Area:</span> <span className="text-slate-200 font-bold">1,850 sqf</span>
              </div>
              <div className="flex justify-between">
                <span>Rooms:</span> <span className="text-slate-200 font-bold">3 BHK</span>
              </div>
            </div>

            <div className="bg-slate-900/40 p-2 rounded flex flex-col items-center justify-center text-center border border-blue-950/10">
              <div className="text-[7px] text-slate-400 uppercase font-bold">Forecast Output</div>
              <div className="text-blue-400 font-bold text-center text-xs pb-0.5 font-sans">
                ₹5,064,344
              </div>
              <div className="px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-300 font-mono text-[6px] tracking-wide mt-1">
                CONFIDENCE: 94%
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (title.includes("Wine Quality")) {
      return (
        <div className="w-full h-full bg-[#020617] p-4 font-mono text-[10px] text-slate-300 relative overflow-hidden flex flex-col justify-between border-b border-blue-950/20">
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-blue-500/20 mb-2">
            <span className="text-blue-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Wine Quality Scorer
            </span>
            <span className="text-slate-500 text-[8px] uppercase font-black">XGBoost</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 flex-1 justify-center">
            <div className="bg-slate-900/40 p-2 rounded flex flex-col justify-center gap-1.5 border border-blue-950/10">
              <div className="flex justify-between text-[7px] text-slate-400">
                <span>Volatile Acidity:</span> <span className="text-blue-400 font-bold">7.00/10</span>
              </div>
              <div className="h-1 w-full bg-white/5 rounded-full relative">
                <div className="absolute left-[70%] top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-500" />
              </div>
            </div>

            <div className="p-1.5 rounded flex items-center justify-between text-[8px] text-slate-300">
              <span className="text-slate-500 uppercase font-bold text-[7px]">CLASSIFICATION</span>
              <span className="px-2 py-0.5 rounded bg-blue-500/10 text-blue-300 border border-blue-500/20 font-bold text-[8px]">
                Quality Tier: Average
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (title.includes("Iris Flower")) {
      return (
        <div className="w-full h-full bg-[#020617] p-4 font-mono text-[10px] text-slate-300 relative overflow-hidden flex flex-col justify-between border-b border-blue-950/20">
          <div className="flex justify-between items-center bg-slate-900/60 p-2 rounded border border-blue-500/20 mb-2">
            <span className="text-blue-400 font-bold flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              Iris SVM Spec
            </span>
            <span className="text-slate-500 text-[8px] uppercase font-black">Pattern</span>
          </div>

          <div className="grid grid-cols-2 gap-2 flex-1">
            <div className="bg-slate-900/40 p-2 rounded text-[7px] space-y-1 border border-blue-950/10 flex flex-col justify-center">
              <div className="flex justify-between border-b border-white/5 py-0.5">
                <span>Sepal Wt:</span> <span className="text-blue-400 font-semibold">3.2 cm</span>
              </div>
              <div className="flex justify-between">
                <span>Petal Lg:</span> <span className="text-blue-400 font-semibold">4.8 cm</span>
              </div>
            </div>

            <div className="bg-slate-900/40 p-2 rounded flex flex-col items-center justify-center text-center border border-blue-950/10">
              <div className="text-[7px] text-slate-400 uppercase font-black leading-none">Iris-Setosa</div>
              <span className="text-[6px] text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded mt-1 font-mono font-bold uppercase tracking-widest text-[#66bb6a]">
                PROB: 99.8%
              </span>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="w-full h-full bg-[#020617] p-4 font-mono text-[9px] text-slate-400 relative overflow-hidden flex flex-col justify-between border-b border-blue-950/25">
        <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded border border-blue-950/20 mb-2">
          <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
          <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
          <span className="text-[8px] text-blue-400/70 ml-2">gayatri@intelligence:~</span>
        </div>
        <div className="space-y-1.5 my-auto text-left pl-1">
          <p className="text-blue-400 font-extrabold"><span className="text-slate-500">$</span> python execute.py</p>
          <p className="text-slate-500 text-[8px]">&gt; Model nodes compiled successfully.</p>
        </div>
      </div>
    );
  };

  return (
    <section id="projects" className="relative py-28 bg-[#030712] overflow-hidden border-t border-white/5">
      {/* Decorative Glow Elements */}
      <div className="absolute top-[30%] right-[10%] w-[35rem] h-[35rem] rounded-full bg-blue-650/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[30%] left-[10%] w-[35rem] h-[35rem] rounded-full bg-blue-650/5 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        
        {/* ================= SECTION 1: FEATURED CODEBASE ================= */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>04 // LIVE DEMOS</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-none">
            Featured <span className="text-blue-500">Web Apps</span>
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4" />
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mt-5 leading-relaxed font-normal">
            High-performance machine learning deployments, interactive regression models, and target predictions running in real time.
          </p>
        </div>

        {/* Featured Projects Elegant Large Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-28">
          {featuredProjects.map((project, idx) => {
            const hasPics = getScreenshots(project.title).length > 0;
            return (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                className="h-full"
              >
                <TiltCard className="group flex flex-col h-full hover:border-blue-500/40">
                  {/* Visual simulator frame header */}
                  <div className="px-4 py-2 bg-stone-950 border-b border-white/5 flex items-center justify-between text-[10px] font-mono text-slate-500">
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>STREAMLIT_SYS_DOCK</span>
                    </div>
                    <span className="text-blue-400 text-[8px] tracking-wider uppercase font-extrabold">Live app</span>
                  </div>

                  {/* Media Screen Viewport Area */}
                  <div className="h-44 w-full relative">
                    {renderProjectMockUI(project.title)}

                    {/* Overlay Interaction trigger */}
                    <div className="absolute inset-0 bg-black/75 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => handleOpenDetailedModal(project)}
                        className="px-4.5 py-2 rounded-full bg-white text-slate-950 text-xs font-black shadow-lg flex items-center gap-1.5 hover:scale-105 duration-200 cursor-pointer pointer-events-auto"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-blue-500" />
                        <span>{hasPics ? "Open Gallery & Overview" : "Analyze Specs"}</span>
                      </button>
                    </div>
                  </div>

                  {/* Card textual content segment */}
                  <div className="p-6 flex-1 flex flex-col justify-between text-left">
                    <div className="space-y-3">
                      <h3 
                        onClick={() => handleOpenDetailedModal(project)}
                        className="font-display font-bold text-lg text-white group-hover:text-blue-400 cursor-pointer transition-colors duration-200"
                      >
                        {project.title}
                      </h3>
                      <p className="text-slate-400 text-xs leading-relaxed line-clamp-3 font-normal">
                        {project.description}
                      </p>
                    </div>

                    <div className="mt-6 pt-5 border-t border-white/5">
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {project.tags.slice(0, 6).map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/5 border border-blue-500/10 text-blue-400"
                          >
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 6 && (
                          <span className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-white/5 text-slate-400">
                            +{project.tags.length - 6} more
                          </span>
                        )}
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-2.5">
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="flex-1 px-3 py-2 rounded-lg text-center bg-white text-black font-black text-[11px] hover:bg-blue-600 hover:text-white duration-250 flex items-center justify-center gap-1 cursor-pointer"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                            <span>Launch Live Demo</span>
                          </a>
                        )}
                        <a
                          href={project.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="px-3.5 py-2 rounded-lg bg-stone-900 border border-white/10 hover:bg-black hover:border-blue-500/50 text-slate-355 hover:text-white text-[11px] font-black duration-250 flex items-center justify-center gap-1 cursor-pointer"
                          title="View Codebase"
                        >
                          <Github className="w-3.5 h-3.5" />
                          {!project.liveUrl && <span>View Source Code</span>}
                        </a>
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            );
          })}
        </div>
        {/* ================= SECTION 2: SYSTEM LOGS & OTHER REPOS ================= */}
        <div className="border border-white/5 bg-slate-900/15 backdrop-blur-md rounded-2xl p-6 sm:p-9 shadow-xl relative">

          {/* Subsection B: Other Projects & Repositories */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/5 mb-8 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/15 flex items-center justify-center text-blue-400">
                  <Folder className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-lg sm:text-xl text-white tracking-tight leading-tight">
                    Other Repositories
                  </h3>
                  <p className="text-[11px] text-slate-400 font-mono mt-1 uppercase tracking-wider">
                    Utility applications, custom frontends, and dynamic web architectures
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 bg-blue-500/5 border border-blue-500/10 px-3 py-1.5 rounded-lg text-[9.5px] font-mono font-bold text-blue-400 self-start sm:self-auto uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>DEVELOPMENT ARCHIVE</span>
              </div>
            </div>

            {/* Logs Viewport List Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              {otherProjects.map((repo, i) => {
                const getRepoCategory = (proj: Project) => {
                  const titleLower = proj.title.toLowerCase();
                  if (titleLower.includes("codegenai")) return "INFOSYS SPRINGBOARD INTERNSHIP / AI";
                  if (titleLower.includes("quiz")) return "AUTOMATED ASSESSMENT SYSTEM";
                  if (titleLower.includes("chatbot")) return "ARTIFICIAL INTELLIGENCE / RESEARCH";
                  return "SOFTWARE ENGINEERING REPOSITORY";
                };

                return (
                  <motion.div
                    key={repo.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                  >
                    <TiltCard
                      onClick={() => handleOpenDetailedModal(repo)}
                      className="group flex flex-col h-full p-6 bg-[#070c19] border border-white/5 hover:border-blue-500/30 hover:bg-[#0c142c] justify-between"
                    >
                      <div>
                        {/* Header bar of the repo card */}
                        <div className="flex items-center justify-between mb-5">
                          <div className="flex items-center gap-2">
                            <Folder className="w-4 h-4 text-blue-450 group-hover:text-blue-400 transition-colors" />
                            <span className="text-[9px] font-mono text-slate-450 group-hover:text-slate-400 tracking-wider uppercase">
                              {getRepoCategory(repo)}
                            </span>
                          </div>
                          <div className="px-2.5 py-0.5 rounded bg-black/40 border border-blue-500/10 text-[8px] font-mono font-bold text-blue-400/80 capitalize flex items-center gap-1">
                            <GitBranch className="w-3 h-3 text-blue-400" />
                            <span>{repo.codeUrl.includes("github.com") ? "github" : "source"}</span>
                          </div>
                        </div>

                        <h3 className="font-display font-black text-base text-white group-hover:text-blue-400 transition-colors">
                          {repo.title}
                        </h3>
                        
                        <p className="text-slate-400 text-xs leading-relaxed mt-2 line-clamp-2">
                          {repo.description}
                        </p>

                        {/* Key Features Block */}
                        {repo.features && repo.features.length > 0 && (
                          <div className="mt-4 space-y-1.5">
                            <span className="text-[9px] font-mono text-slate-550 tracking-wider block uppercase font-bold">// KEY ARCHITECTURE &amp; OUTCOMES</span>
                            <ul className="space-y-1">
                              {repo.features.slice(0, 2).map((feat, fIdx) => (
                                 <li key={fIdx} className="flex gap-2 text-xs text-slate-400 items-start">
                                   <span className="w-1 h-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                                   <span className="line-clamp-1 text-slate-400 group-hover:text-slate-200 transition-colors">{feat}</span>
                                 </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>

                      <div className="mt-5 pt-3.5 border-t border-white/5 flex flex-wrap items-center justify-between gap-3">
                        {/* Language and tag highlights */}
                        <div className="flex flex-wrap gap-1 max-w-[75%]">
                          {repo.tags.slice(0, 4).map((item) => (
                            <span key={item} className="px-2.5 py-0.5 rounded text-[8px] font-mono bg-blue-500/5 border border-blue-500/15 text-blue-400 uppercase font-black tracking-wider">
                              {item}
                            </span>
                          ))}
                        </div>

                        {/* Github direct pipeline log code link */}
                        <a
                          href={repo.codeUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="p-1.5 px-3 rounded-lg bg-slate-900/80 border border-white/5 text-[9.5px] font-mono font-bold text-slate-400 hover:text-white hover:bg-slate-950 hover:border-blue-500/40 flex items-center gap-1.5 cursor-pointer transition-all uppercase tracking-wider"
                        >
                          <span>CODE</span>
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </TiltCard>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Selected Project Detailed Specifications Dialog/Modal */}
        <AnimatePresence>
          {selectedProject && (() => {
            const screens = getScreenshots(selectedProject.title);
            const hasMultipleImages = screens.length > 0;

            return (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
              >
                <motion.div
                  initial={{ scale: 0.95, y: 15 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0.95, y: 15 }}
                  className="relative w-full max-w-2xl rounded-2xl bg-black border border-blue-500/20 max-h-[90vh] overflow-y-auto hide-scrollbar text-left flex flex-col shadow-2xl"
                >
                  {/* Close floating button */}
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-5 right-5 p-2 rounded-xl bg-stone-900/80 hover:bg-blue-600 hover:text-white text-slate-400 transition duration-200 z-50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>

                  {/* Top Header Visual Block */}
                  <div className="relative h-64 sm:h-72 w-full bg-[#020617] border-b border-white/5 overflow-hidden flex items-center justify-center">
                    {hasMultipleImages ? (
                      <div className="w-full h-full relative">
                        <img
                          src={screens[carouselIndex] || undefined}
                          alt={`${selectedProject.title} Slide ${carouselIndex + 1}`}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover"
                        />

                        {/* Navigation controls if multiple slides exist */}
                        {screens.length > 1 && (
                          <>
                            <button
                              onClick={() => prevSlide(screens.length)}
                              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 border border-white/10 hover:bg-black text-white transition cursor-pointer"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => nextSlide(screens.length)}
                              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/75 border border-white/10 hover:bg-black text-white transition cursor-pointer"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>

                            {/* Carousel pagination dots indicators */}
                            <div className="absolute bottom-4 inset-x-0 flex justify-center gap-1.5">
                              {screens.map((_, i) => (
                                <button
                                  key={i}
                                  onClick={() => setCarouselIndex(i)}
                                  className={`w-1.5 h-1.5 rounded-full transition-all ${
                                    carouselIndex === i ? "bg-blue-500 scale-125 px-2" : "bg-white/40"
                                  }`}
                                />
                              ))}
                            </div>
                          </>
                        )}
                        <div className="absolute top-4 left-4 px-2.5 py-1 rounded bg-black/80 border border-white/10 text-[9px] font-mono text-blue-400">
                          RAW IMAGE PREVIEW {carouselIndex + 1} OF {screens.length}
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-950/20 to-black z-0" />
                        <div className="absolute top-[20%] right-[10%] w-36 h-36 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                        <div className="relative z-10 p-6 flex flex-col justify-end h-full w-full">
                          <span className="font-mono text-[9px] text-blue-400 font-bold uppercase tracking-widest block mb-1">
                            DETAILED SYSTEM ANALYSIS // NO_IMG_FOUND
                          </span>
                          <h2 className="font-display font-black text-white text-lg sm:text-2xl tracking-wide max-w-[85%] leading-snug">
                            {selectedProject.title}
                          </h2>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Details parameters fields logs */}
                  <div className="p-6 space-y-6">
                    {hasMultipleImages && (
                      <div>
                        <h2 className="font-display font-black text-white text-xl tracking-tight leading-snug">
                          {selectedProject.title}
                        </h2>
                      </div>
                    )}

                    <div>
                      <h4 className="font-mono text-[10px] text-slate-500 tracking-wider font-semibold uppercase mb-2">
                        System &amp; Pipeline Objective
                      </h4>
                      <p className="text-slate-300 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                        {selectedProject.longDescription}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] text-slate-500 tracking-wider font-semibold uppercase mb-2.5">
                        Key Structural Specs
                      </h4>
                      <ul className="space-y-2">
                        {selectedProject.features.map((feat, i) => (
                          <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed text-left items-start">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0 mt-1.5" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-mono text-[10px] text-slate-500 tracking-wider font-semibold uppercase mb-2">
                        Applied Pipeline Dependencies
                      </h4>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProject.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded text-[9px] font-mono bg-blue-500/5 border border-blue-500/10 text-blue-400 uppercase tracking-widest font-black"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Actions inside modal footer */}
                    <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row gap-3">
                      {selectedProject.liveUrl && (
                        <a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="flex-1 py-3 px-5 rounded-lg text-center bg-blue-600 hover:bg-blue-500 text-xs font-bold text-white flex items-center justify-center gap-2 duration-300 shadow-xl cursor-pointer"
                        >
                          <ChevronRight className="w-4 h-4" />
                          <span>Launch Live Dashboard</span>
                        </a>
                      )}
                      <a
                        href={selectedProject.codeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-3 px-5 rounded-lg text-center bg-stone-900 border border-white/10 hover:bg-black text-xs font-bold text-white flex items-center justify-center gap-2 duration-300 cursor-pointer"
                      >
                        <Github className="w-4 h-4 text-blue-400" />
                        <span>Explore Source Code</span>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            );
          })()}
        </AnimatePresence>
      </div>
    </section>
  );
}

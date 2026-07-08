/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "motion/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import About from "./components/About";
import GraduateStatus from "./components/GraduateStatus";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Certifications from "./components/Certifications";
import GithubProfile from "./components/GithubProfile";
import Contact from "./components/Contact";
import { GAYATRI_DATA } from "./data";
import { Terminal, Heart } from "lucide-react";
import { useImageLoader } from "./hooks/useImageLoader";
import { FALLBACK_ASSETS } from "./utils/assetDetector";

export default function App() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { isLoaded } = useImageLoader([FALLBACK_ASSETS.profileUrl]);

  const handleNavigateToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;
      try {
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      } catch (e) {
        window.scrollTo(0, offsetPosition);
      }
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-white">
      {/* Thin Animated Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3.5px] bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-600 origin-left z-[100] pointer-events-none no-print"
        style={{ scaleX }}
      />

      {/* Premium Glass Header Navigation */}
      <Header
        githubUrl={GAYATRI_DATA.github}
        linkedinUrl={GAYATRI_DATA.linkedin}
      />

      <main className="flex-1">
        {/* Full-Screen Cinematic Hero & Media Showcase */}
        <Hero
          name={GAYATRI_DATA.name}
          role={GAYATRI_DATA.role}
          tagline={GAYATRI_DATA.tagline}
          email={GAYATRI_DATA.email}
          onNavigate={handleNavigateToSection}
        />

        {/* Profile and System manifest summary */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <About
            fullAbout={GAYATRI_DATA.fullAbout}
            stats={GAYATRI_DATA.stats}
            location={GAYATRI_DATA.location}
            email={GAYATRI_DATA.email}
            phone={GAYATRI_DATA.phone}
            onNavigate={handleNavigateToSection}
          />
        </motion.div>

        {/* Graduate pipeline status card (experience check & skills track) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <GraduateStatus onNavigate={handleNavigateToSection} />
        </motion.div>

        {/* Micro-meters skills specs catalog */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Skills />
        </motion.div>

        {/* Timeline representation (Internships + Education) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Experience
            internships={GAYATRI_DATA.internships}
            educations={GAYATRI_DATA.educationList}
          />
        </motion.div>

        {/* Interactive project cards and modal views */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Projects
            projects={GAYATRI_DATA.projects}
          />
        </motion.div>

        {/* Certified honors & verification badges */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Certifications
            certs={GAYATRI_DATA.certificationsList}
          />
        </motion.div>

        {/* Developer contribution activity registry dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <GithubProfile
            username="CheboluGayatri"
          />
        </motion.div>

        {/* Connect & Direct message input pipelines */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <Contact
            email={GAYATRI_DATA.email}
            phone={GAYATRI_DATA.phone}
            location={GAYATRI_DATA.location}
            linkedinUrl={GAYATRI_DATA.linkedin}
            githubUrl={GAYATRI_DATA.github}
          />
        </motion.div>
      </main>

      {/* Handcrafted Footer */}
      <footer className="py-12 bg-slate-950 border-t border-white/5 relative overflow-hidden text-center z-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 pb-6">
          <div className="flex items-center gap-2 font-display text-sm font-bold tracking-wider text-white">
            <div className="relative flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-violet-600 shadow shadow-blue-500/30">
              <Terminal className="w-3.5 h-3.5 text-white" />
            </div>
            <span>GAYATRI <span className="text-blue-400">CHEBOLU</span></span>
          </div>

          <div className="text-xs text-slate-400 leading-relaxed flex items-center gap-2 justify-center sm:justify-end font-mono italic bg-white/[0.02] hover:bg-white/[0.04] transition-colors duration-300 px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
            <span className="text-blue-400 font-bold not-italic">“</span>
            <span className="text-slate-200 tracking-wide font-medium">Learn passionately, grow continuously, and build the future</span>
            <span className="text-blue-400 font-bold not-italic">”</span>
            <Heart className="w-3.5 h-3.5 text-pink-500 fill-pink-500/20 animate-pulse ml-1" />
          </div>
        </div>

        {/* Bottom Status Bar */}
        <div className="border-t border-white/5 pt-6 max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center px-6 gap-4">
          <div className="flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-[10px] text-slate-500 whitespace-nowrap">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              AVAILABLE FOR OPPORTUNITIES
            </div>
            <div className="text-[10px] text-slate-500 font-mono">LOCATION: INDIA</div>
            <div className="text-[10px] text-slate-500 font-mono">EMAIL: gayathrichebolu6@gmail.com</div>
          </div>
          <div className="flex items-center gap-4 text-[10px] sm:text-xs font-mono text-slate-500 italic">
            "Aspiring AI/ML Engineer | Continuous Learner"
          </div>
        </div>
      </footer>

      {/* Cinematic Preloader Overlay */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 bg-slate-950 z-[1000] flex flex-col items-center justify-center font-sans select-none"
          >
            {/* Glowing cinematic background accents */}
            <div className="absolute top-1/4 left-1/4 w-[30rem] h-[30rem] rounded-full bg-blue-500/10 blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[30rem] h-[30rem] rounded-full bg-violet-500/10 blur-[120px] pointer-events-none animate-pulse" />

            {/* Centered container */}
            <div className="relative z-10 flex flex-col items-center text-center">
              {/* Spinning circular tech tracker */}
              <div className="relative w-24 h-24 mb-8">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-t-2 border-r-2 border-l-2 border-transparent border-t-blue-500 border-r-indigo-500"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="absolute inset-2 rounded-full border-b-2 border-l-2 border-transparent border-b-violet-500 border-l-purple-500 opacity-60"
                />
                <div className="absolute inset-4 rounded-full bg-slate-950 border border-white/5 flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-blue-400 animate-pulse" />
                </div>
              </div>

              {/* Glowing tech logo text */}
              <h1 className="font-display text-xl font-bold tracking-widest text-white uppercase mb-2">
                GAYATRI <span className="text-blue-500">CHEBOLU</span>
              </h1>
              <p className="text-[10px] font-mono text-slate-400 tracking-[0.25em] uppercase mb-8">
                PORTFOLIO PRELOAD ENGINE
              </p>

              {/* Smooth animated progress line */}
              <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden relative border border-white/[0.02]">
                <motion.div
                  initial={{ left: "-100%" }}
                  animate={{ left: "100%" }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="absolute top-0 bottom-0 w-1/2 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                />
              </div>

              {/* Micro logs status tracker lines */}
              <div className="mt-6 flex flex-col items-center gap-1.5 text-[9px] font-mono text-slate-500 tracking-wider">
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-blue-500 animate-ping" />
                  <span>PRELOADING HD VIDEO STREAM</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1 h-1 rounded-full bg-indigo-500 animate-ping" />
                  <span>OPTIMIZING STUDIO PORTRAIT</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
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

export default function App() {
  const handleNavigateToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-blue-500/30 selection:text-white">
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
        <About
          fullAbout={GAYATRI_DATA.fullAbout}
          stats={GAYATRI_DATA.stats}
          location={GAYATRI_DATA.location}
          email={GAYATRI_DATA.email}
          phone={GAYATRI_DATA.phone}
          onNavigate={handleNavigateToSection}
        />

        {/* Graduate pipeline status card (experience check & skills track) */}
        <GraduateStatus onNavigate={handleNavigateToSection} />

        {/* Micro-meters skills specs catalog */}
        <Skills />

        {/* Timeline representation (Internships + Education) */}
        <Experience
          internships={GAYATRI_DATA.internships}
          educations={GAYATRI_DATA.educationList}
        />

        {/* Interactive project cards and modal views */}
        <Projects
          projects={GAYATRI_DATA.projects}
        />

        {/* Certified honors & verification badges */}
        <Certifications
          certs={GAYATRI_DATA.certificationsList}
        />

        {/* Developer contribution activity registry dashboard */}
        <GithubProfile
          username="CheboluGayatri"
        />

        {/* Connect & Direct message input pipelines */}
        <Contact
          email={GAYATRI_DATA.email}
          phone={GAYATRI_DATA.phone}
          location={GAYATRI_DATA.location}
          linkedinUrl={GAYATRI_DATA.linkedin}
          githubUrl={GAYATRI_DATA.github}
        />
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
    </div>
  );
}

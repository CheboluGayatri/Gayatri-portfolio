import React from "react";
import { Briefcase, GraduationCap, Calendar, Compass, ChevronRight } from "lucide-react";
import { motion } from "motion/react";
import { Internship, Education } from "../data";

interface ExperienceProps {
  internships: Internship[];
  educations: Education[];
}

export default function Experience({ internships, educations }: ExperienceProps) {
  return (
    <section id="experience" className="relative py-28 bg-slate-950 border-t border-white/5 overflow-hidden">
      {/* Decorative Cyber Grid & Radial Lights */}
      <div className="absolute top-[20%] right-[-5%] w-[40rem] h-[40rem] rounded-full bg-blue-650/5 blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-indigo-650/5 blur-[130px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header with Premium Scroll-Triggered Reveal */}
        <div className="flex flex-col items-center mb-20 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Compass className="w-3.5 h-3.5 text-blue-500" />
            <span>03 // TRACK TIMELINE</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-none"
          >
            Journey &amp; <span className="text-blue-500">Experience</span>
          </motion.h2>
          
          <motion.div 
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4 origin-center" 
          />
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="text-slate-400 text-xs sm:text-sm max-w-lg mt-5 leading-relaxed"
          >
            Academic pathways, deep machine learning internships, and industrial-analytics credentials plotted across a futuristic timeline.
          </motion.p>
        </div>

        {/* Side-by-Side Split Structured Timeline columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Column 1: Internship & Professional Experience */}
          <div className="space-y-8 flex flex-col items-start">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <Briefcase className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-wide">
                Internships Experience
              </h3>
            </motion.div>

            <div className="relative border-l-2 border-blue-500/20 pl-7 ml-4.5 space-y-10 w-full text-left">
              {internships.map((job, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -25, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-blue-500 group-hover:bg-blue-400 group-hover:scale-125 duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                  <div className="space-y-3.5 p-6 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/40 hover:bg-black/60 duration-300 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                        {job.role}
                      </h4>
                      <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono">
                        <Calendar className="w-3.5 h-3.5 text-blue-450" />
                        <span>{job.duration}</span>
                      </div>
                    </div>

                    <div className="font-bold text-xs sm:text-sm text-slate-300 tracking-wide">
                      {job.company}
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/5">
                      {job.highlights.map((bullet, bulletIdx) => (
                        <p key={bulletIdx} className="text-xs text-slate-350 leading-relaxed flex gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>

                    {/* Micro skill tags */}
                    <div className="flex flex-wrap gap-1.5 pt-4">
                      {job.skillsLearned.map((skill) => (
                        <span
                          key={skill}
                          className="px-2.5 py-0.5 rounded text-[9px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/10 uppercase tracking-widest font-black"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Column 2: Educational Trajectory */}
          <div className="space-y-8 flex flex-col items-start w-full">
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex items-center gap-3 mb-2"
            >
              <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.1)]">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="font-display text-xl sm:text-2xl font-black text-white tracking-wide">
                Education &amp; Credentials
              </h3>
            </motion.div>

            <div className="relative border-l-2 border-blue-500/20 pl-7 ml-4.5 space-y-10 w-full text-left">
              {educations.map((school, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 25, y: 15 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
                  className="relative group"
                >
                  {/* Glowing Node Marker */}
                  <div className="absolute -left-[37px] top-1.5 w-4.5 h-4.5 rounded-full bg-slate-950 border-2 border-blue-500 group-hover:bg-blue-400 group-hover:scale-125 duration-300 shadow-[0_0_10px_rgba(59,130,246,0.5)]" />

                  <div className="space-y-3.5 p-6 rounded-xl bg-black/40 border border-white/5 hover:border-blue-500/40 hover:bg-black/60 duration-300 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <h4 className="font-display font-bold text-base sm:text-lg text-white group-hover:text-blue-400 transition-colors duration-300">
                          {school.degree}
                        </h4>
                        <div className="text-slate-300 text-xs sm:text-[13px] mt-1">
                          {school.institution}
                        </div>
                      </div>
                      <div className="flex flex-col sm:items-end shrink-0 gap-1.5 mt-1 sm:mt-0">
                        <div className="flex items-center gap-1.5 text-xs text-blue-400 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-blue-450" />
                          <span>{school.duration}</span>
                        </div>
                        <div className="px-3 py-1.5 rounded bg-blue-500/10 text-blue-400 border border-blue-500/20 font-black text-[10px] sm:self-end mt-1 font-mono tracking-widest leading-none">
                          {school.score}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-3 border-t border-white/5">
                      {school.highlights.map((bullet, bulletIdx) => (
                        <p key={bulletIdx} className="text-xs text-slate-350 leading-relaxed flex gap-2">
                          <ChevronRight className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
                          <span>{bullet}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { Briefcase, Cpu, GraduationCap, ChevronRight, Binary, Mail, ExternalLink, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

interface GraduateStatusProps {
  onNavigate: (id: string) => void;
}

export default function GraduateStatus({ onNavigate }: GraduateStatusProps) {
  return (
    <section className="relative bg-[#030712] py-20 px-6 sm:px-12 md:px-24 overflow-hidden border-t border-white/5">
      {/* Sci-Fi Ambient radial backgrounds */}
      <div className="absolute top-[20%] left-[5%] w-[40rem] h-[20rem] rounded-full bg-blue-600/[0.02] blur-[150px] pointer-events-none -z-10" />
      <div className="absolute bottom-[10%] right-[10%] w-[35rem] h-[15rem] rounded-full bg-violet-600/[0.02] blur-[120px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto relative z-10 w-full text-left">
        
        {/* Top Header Section */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-mono text-[10px] font-black uppercase tracking-widest mb-4">
            <GraduationCap className="w-3.5 h-3.5 shrink-0" />
            <span>01 // PROFESSIONAL METRICS</span>
          </div>
          <h2 className="font-sans text-3xl sm:text-4xl md:text-5xl font-black text-white leading-none uppercase tracking-tight">
            Engineering Profile &amp; Career Snapshot
          </h2>
        </div>

        {/* Double Column Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT PANEL: Academic & Profile Record Ledger (AUTHENTICATED CARD) */}
          <motion.div
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 bg-[#070f20]/90 border border-blue-500/15 rounded-2xl p-6 md:p-8 relative overflow-hidden group hover:border-blue-500/25 transition-all duration-300 shadow-2xl"
          >
            {/* Soft grid background layer inside the ledger card */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.005)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/5 blur-3xl rounded-full pointer-events-none group-hover:bg-blue-500/10 transition-all duration-300" />

            {/* Header banner */}
            <div className="flex items-center gap-2 pb-5 border-b border-white/5 mb-6 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <h3 className="font-mono text-xs font-black text-slate-400 uppercase tracking-widest">
                AUTHENTICATED CARD // ACADEMIC RECORD
              </h3>
            </div>

            {/* Structured Table Registry list */}
            <div className="space-y-4 font-mono">
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">PROFILE_ROLE</span>
                <span className="md:col-span-2 font-sans text-xs sm:text-[13px] font-bold text-slate-200">
                  Recent Computer Science &amp; AI Graduate
                </span>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">DEGREE</span>
                <span className="md:col-span-2 font-sans text-xs sm:text-[13px] font-bold text-slate-200">
                  B.Tech - Computer Science and Artificial Intelligence
                </span>
              </div>

              {/* Row 3 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">ACADEMIC_RECORD</span>
                <span className="md:col-span-2 font-mono text-xs sm:text-[13px] font-bold text-slate-200">
                  <span className="text-blue-400 font-extrabold mr-1">CGPA:</span> 7.78 / 10
                </span>
              </div>

              {/* Row 4 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">LOCATION</span>
                <span className="md:col-span-2 font-sans text-xs sm:text-[13px] font-bold text-slate-200">
                  Andhra Pradesh, India
                </span>
              </div>

              {/* Row 5 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">CONTACT</span>
                <span className="md:col-span-2 font-mono text-xs sm:text-[13px] font-bold text-slate-200 truncate">
                  gayathrichebolu6@gmail.com
                </span>
              </div>

              {/* Row 6 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">EMPLOYMENT_STATUS</span>
                <span className="md:col-span-2 font-sans text-xs sm:text-[13px] font-black text-emerald-400 uppercase tracking-wide">
                  Open to Opportunities
                </span>
              </div>

              {/* Row 7 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 border-b border-white/5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">PORTFOLIO_STATUS</span>
                <span className="md:col-span-2 font-sans text-xs sm:text-[13px] font-bold text-slate-200">
                  Actively Building AI/ML Solutions
                </span>
              </div>

              {/* Row 8 */}
              <div className="grid grid-cols-1 md:grid-cols-3 py-2.5 items-baseline gap-1 md:gap-4">
                <span className="text-[10px] font-black text-slate-500 tracking-wider">VERIFICATION KEY STATUS</span>
                <span className="md:col-span-2 font-mono text-xs sm:text-[13px] font-bold text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>SECURED_CREDENTIAL</span>
                </span>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL: Elegant Mini-Segment Routers */}
          <motion.div
            initial={{ opacity: 0, x: 15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-5 flex flex-col gap-4 text-left"
          >
            <p className="text-[10px] font-mono text-slate-500 font-extrabold uppercase tracking-widest">
              // PROFILE_NAVIGATION_CHANNELS
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3.5">
              {/* Router 1: Experience Timeline */}
              <button
                onClick={() => onNavigate("experience")}
                id="btn-switch-timeline"
                className="w-full p-4 rounded-xl border border-blue-500/10 bg-[#070f20]/50 hover:bg-[#0c1630]/80 hover:border-blue-500/35 text-left transition-all duration-300 relative group/btn cursor-pointer overflow-hidden shadow-lg active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/[0.03] blur-lg rounded-full pointer-events-none group-hover/btn:bg-blue-500/10 transition-all duration-300" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover/btn:bg-blue-500/20 group-hover/btn:scale-105 duration-300 shrink-0">
                    <Briefcase className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                        [ROUTE_01]
                      </span>
                      <span className="text-[9px] font-mono font-bold text-blue-400/80 group-hover/btn:text-blue-400 flex items-center gap-0.5 uppercase tracking-wider">
                        LAUNCH PORTAL
                        <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 duration-300" />
                      </span>
                    </div>
                    <h3 className="font-sans text-sm font-black text-white leading-tight uppercase tracking-tight mt-1 group-hover/btn:text-blue-200 transition-colors">
                      Experience Timeline
                    </h3>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/[0.03]">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
                    // Employment Records &amp; Milestones
                  </p>
                </div>
              </button>

              {/* Router 2: Skills Matrix */}
              <button
                onClick={() => onNavigate("skills")}
                id="btn-switch-skills"
                className="w-full p-4 rounded-xl border border-blue-500/10 bg-[#070f20]/50 hover:bg-[#0c1630]/80 hover:border-blue-500/35 text-left transition-all duration-300 relative group/btn cursor-pointer overflow-hidden shadow-lg active:scale-[0.98]"
              >
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-500/[0.03] blur-lg rounded-full pointer-events-none group-hover/btn:bg-blue-500/10 transition-all duration-300" />
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center group-hover/btn:bg-blue-500/20 group-hover/btn:scale-105 duration-300 shrink-0">
                    <Cpu className="w-4 h-4 animate-pulse" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                       <span className="text-[8px] font-mono font-black text-slate-500 uppercase tracking-widest leading-none">
                        [ROUTE_02]
                      </span>
                      <span className="text-[9px] font-mono font-bold text-blue-400/80 group-hover/btn:text-blue-400 flex items-center gap-0.5 uppercase tracking-wider">
                        EXPLORE INDEX
                        <ChevronRight className="w-3 h-3 group-hover/btn:translate-x-0.5 duration-300" />
                      </span>
                    </div>
                    <h3 className="font-sans text-sm font-black text-white leading-tight uppercase tracking-tight mt-1 group-hover/btn:text-blue-200 transition-colors">
                      Skills Matrix
                    </h3>
                  </div>
                </div>
                <div className="mt-2.5 pt-2 border-t border-white/[0.03]">
                  <p className="text-[9px] text-slate-400 font-mono uppercase tracking-wider">
                    // Core Engineering stack Matrix
                  </p>
                </div>
              </button>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}

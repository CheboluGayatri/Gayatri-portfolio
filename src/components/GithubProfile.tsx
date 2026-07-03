import React from "react";
import { Github, Linkedin, ArrowUpRight, Sparkles } from "lucide-react";
import { motion } from "motion/react";

interface GithubProps {
  username: string; // preserve prop for compatibility
}

export default function GithubProfile({ username }: GithubProps) {
  const connections = [
    {
      name: "GitHub",
      description: "Explore my open-source AI models, ML pipelines, and Streamlit repositories.",
      url: "https://github.com/CheboluGayatri",
      icon: <Github className="w-8 h-8 text-blue-400 group-hover:text-blue-300 animate-pulse duration-3000" />,
      username: "@CheboluGayatri"
    },
    {
      name: "LinkedIn",
      description: "Connect with me for collaborations, internship vacancies, and professional discussions.",
      url: "https://www.linkedin.com/in/gayatri-chebolu/",
      icon: <Linkedin className="w-8 h-8 text-blue-500 group-hover:text-blue-450" />,
      username: "gayatri-chebolu"
    }
  ];

  return (
    <section id="github" className="relative py-28 bg-[#030712] border-t border-white/5 overflow-hidden">
      {/* Decorative Blur Backdrops */}
      <div className="absolute top-[30%] left-[10%] w-[25rem] h-[25rem] rounded-full bg-blue-600/5 blur-[120px] -z-10 animate-pulse duration-[8s]" />
      <div className="absolute bottom-[20%] right-[10%] w-[20rem] h-[20rem] rounded-full bg-blue-500/5 blur-[100px] -z-10 animate-pulse duration-[6s]" />

      <div className="max-w-4xl mx-auto px-6 text-center">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/20 border border-blue-500/10 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Registry</span>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight"
          >
            Professional <span className="text-blue-400">Connect</span>
          </motion.h2>
          
          <div className="w-12 h-1 bg-blue-500/80 rounded-full mt-4" />
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 text-xs sm:text-sm max-w-md mt-4 font-normal"
          >
            Explore my professional profiles and connect with me.
          </motion.p>
        </div>

        {/* Connections Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {connections.map((item, idx) => (
            <motion.a
              key={item.name}
              href={item.url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group relative p-6 rounded-2xl bg-[#090d16]/40 backdrop-blur-md border border-white/10 hover:border-blue-500/40 transition-all duration-300 flex flex-col items-center text-center cursor-pointer hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] overflow-hidden"
            >
              {/* Ambient visual background highlights */}
              <div className="absolute inset-0 bg-gradient-to-b from-blue-600/0 via-blue-600/0 to-blue-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Premium Circular Icon Container */}
              <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:border-blue-500/30 group-hover:bg-blue-950/25 duration-300 relative">
                {item.icon}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full border-2 border-[#030712] scale-0 group-hover:scale-100 duration-300" />
              </div>

              <div className="flex items-center gap-1.5 justify-center">
                <span className="font-display font-black text-lg text-white group-hover:text-blue-400 duration-200">
                  {item.name}
                </span>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 duration-200" />
              </div>

              <p className="text-slate-400 text-xs leading-relaxed mt-2.5 px-2">
                {item.description}
              </p>
              
              <div className="mt-5 text-[10px] font-mono text-blue-400/60 bg-blue-500/5 px-3 py-1 rounded-md border border-blue-500/10 uppercase tracking-widest font-black">
                {item.username}
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}

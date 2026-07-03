import React from "react";
import { 
  Cpu, Code2, Database, Sparkles, Terminal 
} from "lucide-react";
import { motion } from "motion/react";

export default function Skills() {
  const skillCategories = [
    {
      title: "Programming",
      icon: <Code2 className="w-5 h-5 text-blue-400" />,
      skills: ["Python"]
    },
    {
      title: "Data Analysis",
      icon: <Database className="w-5 h-5 text-blue-400" />,
      skills: ["NumPy", "Pandas", "Matplotlib", "Seaborn"]
    },
    {
      title: "Machine Learning",
      icon: <Cpu className="w-5 h-5 text-blue-400" />,
      skills: [
        "Supervised Learning",
        "Model Training",
        "Evaluation",
        "Validation",
        "Feature Engineering"
      ]
    },
    {
      title: "AI & NLP",
      icon: <Sparkles className="w-5 h-5 text-blue-400" />,
      skills: ["Prompt Engineering", "NLP", "LLM Applications", "OCR Integration"]
    },
    {
      title: "Tools & Technologies",
      icon: <Terminal className="w-5 h-5 text-blue-400" />,
      skills: ["Git", "Streamlit", "Ollama", "RPA", "Scikit-learn"]
    }
  ];

  return (
    <section id="skills" className="relative py-28 bg-[#030712] border-t border-white/5 overflow-hidden">
      {/* Visual background lights */}
      <div className="absolute top-[30%] left-[-5%] w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[150px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[30%] right-[-5%] w-[35rem] h-[35rem] rounded-full bg-blue-500/5 blur-[150px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>02 // CAPABILITIES</span>
          </div>
          <h2 className="font-display text-3xl sm:text-5xl font-black text-white tracking-tight leading-none uppercase">
            Skills
          </h2>
          <div className="w-16 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4" />
          <p className="text-slate-400 text-xs sm:text-sm max-w-lg mt-5 leading-relaxed">
            A concise overview of my technical competencies and tools used to build AI/ML solutions.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-3xl bg-black/40 border border-white/5 hover:border-blue-500/30 hover:shadow-[0_0_25px_rgba(59,130,246,0.12)] duration-305 flex flex-col justify-start overflow-hidden hover:scale-[1.02] transition-all"
            >
              {/* Card Header with Icon */}
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/5 mb-5">
                <div className="w-10 h-10 rounded-xl bg-blue-600/10 border border-blue-500/20 flex items-center justify-center group-hover:scale-110 duration-300">
                  {category.icon}
                </div>
                <h3 className="font-display font-bold text-sm sm:text-base text-white">
                  {category.title}
                </h3>
              </div>

              {/* Badges/Pills rendering without progress percentages */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3.5 py-1.5 rounded-xl bg-blue-500/5 border border-blue-500/15 text-slate-300 text-xs font-semibold tracking-wide hover:bg-blue-600 hover:text-white transition-all duration-300 hover:border-blue-400 select-none cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

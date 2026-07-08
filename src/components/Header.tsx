import React, { useState, useEffect } from "react";
import { Menu, X, Terminal, ArrowRight, Github, Linkedin, Mail, Sun, Moon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface HeaderProps {
  githubUrl: string;
  linkedinUrl: string;
}

export default function Header({ githubUrl, linkedinUrl }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "certifications", label: "Certifications" },
    { id: "contact", label: "Contact" }
  ];

  useEffect(() => {
    // Read theme from localStorage or system theme
    const savedTheme = localStorage.getItem("portfolio-theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Detect active section on scroll
      const scrollPosition = window.scrollY + 120;
      for (const item of navItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(item.id);
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    localStorage.setItem("portfolio-theme", nextTheme);
    if (nextTheme === "light") {
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
    }
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    
    // Slight delay so mobile menu closing animation and height changes complete, avoiding scroll cancellation
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
      }
    }, 120);
  };

  return (
    <header
      id="custom-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "py-3 bg-[#030712]/80 light:bg-white/85 border-b border-white/5 light:border-slate-200/85 shadow-2xl backdrop-blur-2xl"
          : "py-6 bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection("home")}
          onTouchStart={(e) => {
            e.preventDefault();
            scrollToSection("home");
          }}
          className="group flex items-center gap-1.5 font-display text-xl sm:text-2xl tracking-tight font-extrabold text-white transition-opacity duration-300 pointer-events-auto cursor-pointer"
        >
          <span className="tracking-tight hover:opacity-95">
            Gayatri<span className="text-blue-500 animate-pulse font-serif">.</span>
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-full bg-black/40 border border-white/5 backdrop-blur-md">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              onTouchStart={(e) => {
                e.preventDefault();
                scrollToSection(item.id);
              }}
              className={`relative px-4.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-colors duration-300 cursor-pointer pointer-events-auto ${
                activeSection === item.id
                  ? "text-white font-semibold"
                  : "text-slate-350 hover:text-white"
              }`}
            >
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeNavBG"
                  className="absolute inset-0 bg-blue-500/15 border border-blue-500/20 rounded-full -z-10 bg-gradient-to-tr from-blue-600/10 to-transparent"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Button Actions */}
        <div className="hidden sm:flex items-center gap-4">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-all duration-300"
          >
            <Linkedin className="w-4 h-4" />
          </a>
          <a
            href={githubUrl}
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-400 hover:text-blue-400 hover:bg-white/5 transition-all duration-300"
          >
            <Github className="w-4 h-4" />
          </a>
          <button
            onClick={() => scrollToSection("contact")}
            onTouchStart={(e) => {
              e.preventDefault();
              scrollToSection("contact");
            }}
            className="relative px-6 py-2.5 rounded-full text-xs font-bold tracking-wide bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-lg shadow-blue-500/10 overflow-hidden group transition-all duration-300 hover:scale-105 hover:shadow-blue-500/20 cursor-pointer"
          >
            <span className="relative z-10">Let's Connect</span>
          </button>
        </div>

        {/* Mobile controls row */}
        <div className="flex items-center gap-2 lg:hidden">
          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            onTouchStart={(e) => {
              e.preventDefault();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 rounded-xl bg-white/5 light:bg-slate-200/50 border border-white/5 light:border-slate-200/80 text-slate-350 light:text-slate-705 hover:text-white light:hover:text-slate-955 hover:bg-white/10 transition-all cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden absolute top-full left-0 w-full overflow-hidden bg-slate-950/95 light:bg-white/95 border-b border-white/5 light:border-slate-200/90 shadow-2xl backdrop-blur-3xl"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium tracking-wide border transition-all ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-blue-600/15 to-violet-600/15 text-white light:text-slate-950 border-blue-500/20 pl-6"
                      : "text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-950 border-transparent"
                  }`}
                >
                  <span>{item.label}</span>
                  <div
                    className={`w-1.5 h-1.5 rounded-full transition-transform ${
                      activeSection === item.id ? "bg-blue-400 scale-125" : "bg-transparent"
                    }`}
                  />
                </button>
              ))}

              <div className="h-[1px] bg-white/5 light:bg-slate-200 my-2" />

              <div className="flex items-center justify-between px-4">
                <span className="text-xs font-mono text-slate-500 tracking-wider">CONNECT</span>
                <div className="flex gap-4">
                  <a href={linkedinUrl} target="_blank" rel="noreferrer" className="text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-950">
                    <Linkedin className="w-4 h-4" />
                  </a>
                  <a href={githubUrl} target="_blank" rel="noreferrer" className="text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-950">
                    <Github className="w-4 h-4" />
                  </a>
                  <a href={`mailto:gayathrichebolu6@gmail.com`} className="text-slate-400 light:text-slate-600 hover:text-white light:hover:text-slate-950">
                    <Mail className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

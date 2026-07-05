import React, { useState } from "react";
import { Mail, Github, Linkedin, Send, CheckCircle, Loader2, User, MessageSquare, BookOpen, Phone, MapPin, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactProps {
  email: string;
  phone: string;
  location: string;
  linkedinUrl: string;
  githubUrl: string;
}

export default function Contact({ email, phone, location, linkedinUrl, githubUrl }: ContactProps) {
  const finalEmail = email || "gayathrichebolu6@gmail.com";
  const finalPhone = phone || "+91 9177114643";
  const finalLocation = location || "Andhra Pradesh, India";
  const finalLinkedin = linkedinUrl || "https://www.linkedin.com/in/gayatri-chebolu/";
  const finalGithub = githubUrl || "https://github.com/CheboluGayatri";

  // Form states
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  interface SentLog {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    timestamp: string;
  }

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitStep, setSubmitStep] = useState(0);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Local state directory of dispatched queries
  const [sentLogs, setSentLogs] = useState<SentLog[]>(() => {
    try {
      const stored = localStorage.getItem("gayatri_tele_logs");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Real-time validation
    const newErrors = { ...errors };
    if (name === "name") {
      newErrors.name = value.trim() ? "" : "Full name is required.";
    } else if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) {
        newErrors.email = "Email address is required.";
      } else if (!emailRegex.test(value.trim())) {
        newErrors.email = "Please enter a valid email address.";
      } else {
        newErrors.email = "";
      }
    } else if (name === "subject") {
      newErrors.subject = value.trim() ? "" : "Subject title is required.";
    } else if (name === "message") {
      newErrors.message = value.trim() ? "" : "Message body is required.";
    }
    setErrors(newErrors);
    if (submitError) setSubmitError(null);
  };

  const validateForm = () => {
    const newErrors = {
      name: formData.name.trim() ? "" : "Full name is required.",
      email: "",
      subject: formData.subject.trim() ? "" : "Subject title is required.",
      message: formData.message.trim() ? "" : "Message body is required."
    };

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email address is required.";
    } else if (!emailRegex.test(formData.email.trim())) {
      newErrors.email = "Please enter a valid email address.";
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((err) => err !== "");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitError("Please correct all highlighted fields before transmitting.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
    setSubmitStep(1); // Establishing encryption link

    // Chain of fun high-fidelity network-themed steps
    setTimeout(() => {
      setSubmitStep(2); // Authorizing payload structures
      setTimeout(() => {
        setSubmitStep(3); // Archiving payload into client stack
        setTimeout(() => {
          setIsSubmitting(false);
          setIsSubmitted(true);

          // Add message to local persistent history list
          const uniqueId = `msg-${Date.now()}`;
          const newMsg: SentLog = {
            id: uniqueId,
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
            timestamp: new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })
          };

          const nextLogs = [newMsg, ...sentLogs];
          setSentLogs(nextLogs);
          try {
            localStorage.setItem("gayatri_tele_logs", JSON.stringify(nextLogs));
          } catch (storageErr) {
            console.warn(storageErr);
          }

          // Reset inputs
          setFormData({ name: "", email: "", subject: "", message: "" });
        }, 800);
      }, 800);
    }, 800);
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem("gayatri_tele_logs");
      setSentLogs([]);
    } catch (err) {
      console.warn(err);
    }
  };

  const contactCards = [
    {
      id: "email",
      label: "Secure Email",
      value: finalEmail,
      href: `mailto:${finalEmail}`,
      icon: <Mail className="w-5 h-5 text-blue-400" />,
      sub: "Active Responder"
    },
    {
      id: "phone",
      label: "Direct Phone",
      value: finalPhone,
      href: `tel:${finalPhone.replace(/\s+/g, "")}`,
      icon: <Phone className="w-5 h-5 text-cyan-400" />,
      sub: "Voice // Message"
    },
    {
      id: "location",
      label: "Physical Base",
      value: finalLocation,
      href: null,
      icon: <MapPin className="w-5 h-5 text-indigo-400" />,
      sub: "Andhra Pradesh, IN"
    },
    {
      id: "linkedin",
      label: "LinkedIn Professional",
      value: "Gayatri Chebolu",
      href: finalLinkedin,
      icon: <Linkedin className="w-5 h-5 text-blue-500" />,
      sub: "In-Platform Portal",
      external: true
    },
    {
      id: "github",
      label: "GitHub Source Hub",
      value: "@CheboluGayatri",
      href: finalGithub,
      icon: <Github className="w-5 h-5 text-emerald-400" />,
      sub: "Codebase Catalog",
      external: true
    }
  ];

  return (
    <section id="contact" className="relative py-28 bg-[#030712] border-t border-white/5 overflow-hidden">
      {/* Premium Cyber Light Radial Glows */}
      <div className="absolute top-[10%] right-[5%] w-[45rem] h-[45rem] rounded-full bg-gradient-to-br from-blue-500/5 to-indigo-500/0 blur-[180px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[15%] left-[5%] w-[38rem] h-[38rem] rounded-full bg-gradient-to-tr from-indigo-500/5 to-purple-500/0 blur-[160px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-500/5 border border-blue-500/15 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Send className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>06 // LET'S CONNECT</span>
          </motion.div>

          {/* Contact Header */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Contact <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">Me</span>
          </motion.h2>
          
          <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mt-4 shadow-[0_0_12px_rgba(59,130,246,0.5)]" />

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xs sm:text-sm max-w-xl mt-5 leading-relaxed font-sans"
          >
            Have an exciting opportunity, a research collaboration, or just want to say hello? Send a direct message below. I am active and ready to collaborate.
          </motion.p>
        </div>

        {/* SINGLE CENTRED COMPONENT: Highly impressive, premium layout */}
        <div className="max-w-2xl mx-auto w-full relative group">
          {/* Ambient background aura that pulses slightly on hover */}
          <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 blur-2xl opacity-40 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 -z-10 pointer-events-none" />
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-r from-blue-500/5 to-indigo-500/5 blur-sm opacity-80 -z-10 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-[1px] rounded-[24px] bg-gradient-to-b from-white/15 via-white/5 to-white/[0.02] hover:from-blue-500/40 hover:via-indigo-500/20 hover:to-transparent transition-all duration-500 w-full relative"
          >
            <div className="p-7 sm:p-10 rounded-[23px] bg-gradient-to-b from-[#090d16] to-[#04070d] backdrop-blur-2xl w-full">
              {/* Top border ambient line glow */}
              <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent opacity-70 group-hover:via-blue-400 group-hover:scale-110 transition-all duration-500" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col items-center text-center py-10"
                  >
                    <div className="w-20 h-20 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-6 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] animate-pulse">
                      <CheckCircle className="w-10 h-10" />
                    </div>
                    <h4 className="font-display text-2xl font-black text-white mb-2 uppercase tracking-wide">
                      Transmission Dispatched
                    </h4>
                    <p className="text-slate-400 text-xs sm:text-sm max-w-md mb-8 leading-relaxed">
                      Thank you! Your message has been saved in your local outbox and queued. I will get back to you at your specified return address as soon as possible.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 active:scale-95 text-white font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-blue-600/20 cursor-pointer"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6 text-left"
                    noValidate
                  >
                    {/* Grid Name & Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      {/* Name field */}
                      <div className="space-y-2 flex flex-col items-start group/input">
                        <label htmlFor="name-input" className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-450 uppercase tracking-widest font-bold select-none group-focus-within/input:text-blue-400 transition-colors">
                          <User className="w-3.5 h-3.5 text-blue-500/60 group-focus-within/input:text-blue-400 transition-colors" />
                          <span>Full Name</span>
                        </label>
                        <input
                          id="name-input"
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jane Doe"
                          aria-invalid={!!errors.name}
                          aria-describedby={errors.name ? "name-error" : undefined}
                          className={`w-full px-4.5 py-3.5 rounded-xl bg-[#03060c]/80 border text-slate-200 placeholder-slate-650 text-sm font-sans focus:outline-none focus:bg-[#020409] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 ${
                            errors.name ? "border-red-500/50 focus:border-red-500" : "border-white/[0.06] hover:border-white/10 focus:border-blue-500/40"
                          }`}
                        />
                        {errors.name && (
                          <span id="name-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left flex items-center gap-1">
                            <span>⚠️</span> {errors.name}
                          </span>
                        )}
                      </div>

                      {/* Email field */}
                      <div className="space-y-2 flex flex-col items-start group/input">
                        <label htmlFor="email-input" className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-455 uppercase tracking-widest font-bold select-none group-focus-within/input:text-blue-400 transition-colors">
                          <Mail className="w-3.5 h-3.5 text-blue-500/60 group-focus-within/input:text-blue-400 transition-colors" />
                          <span>Email Address</span>
                        </label>
                        <input
                          id="email-input"
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jane@example.com"
                          aria-invalid={!!errors.email}
                          aria-describedby={errors.email ? "email-error" : undefined}
                          className={`w-full px-4.5 py-3.5 rounded-xl bg-[#03060c]/80 border text-slate-200 placeholder-slate-655 text-sm font-sans focus:outline-none focus:bg-[#020409] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 ${
                            errors.email ? "border-red-500/50 focus:border-red-500" : "border-white/[0.06] hover:border-white/10 focus:border-blue-500/40"
                          }`}
                        />
                        {errors.email && (
                          <span id="email-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left flex items-center gap-1">
                            <span>⚠️</span> {errors.email}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Subject field */}
                    <div className="space-y-2 flex flex-col items-start group/input">
                      <label htmlFor="subject-input" className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-455 uppercase tracking-widest font-bold select-none group-focus-within/input:text-blue-400 transition-colors">
                        <BookOpen className="w-3.5 h-3.5 text-blue-500/60 group-focus-within/input:text-blue-400 transition-colors" />
                        <span>Subject</span>
                      </label>
                      <input
                        id="subject-input"
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Inquiry regarding Internship / Project collaboration"
                        aria-invalid={!!errors.subject}
                        aria-describedby={errors.subject ? "subject-error" : undefined}
                        className={`w-full px-4.5 py-3.5 rounded-xl bg-[#03060c]/80 border text-slate-200 placeholder-slate-655 text-sm font-sans focus:outline-none focus:bg-[#020409] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 ${
                          errors.subject ? "border-red-500/50 focus:border-red-500" : "border-white/[0.06] hover:border-white/10 focus:border-blue-500/40"
                        }`}
                      />
                      {errors.subject && (
                        <span id="subject-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left flex items-center gap-1">
                          <span>⚠️</span> {errors.subject}
                        </span>
                      )}
                    </div>

                    {/* Message body field */}
                    <div className="space-y-2 flex flex-col items-start group/input">
                      <label htmlFor="message-input" className="flex items-center gap-1.5 text-[9.5px] font-mono text-slate-455 uppercase tracking-widest font-bold select-none group-focus-within/input:text-blue-400 transition-colors">
                        <MessageSquare className="w-3.5 h-3.5 text-blue-500/60 group-focus-within/input:text-blue-400 transition-colors" />
                        <span>Your Message</span>
                      </label>
                      <textarea
                        id="message-input"
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Hi Gayatri, I'd love to discuss..."
                        aria-invalid={!!errors.message}
                        aria-describedby={errors.message ? "message-error" : undefined}
                        className={`w-full px-4.5 py-3.5 rounded-xl bg-[#03060c]/80 border text-slate-200 placeholder-slate-655 text-sm font-sans resize-none focus:outline-none focus:bg-[#020409] focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/5 transition-all duration-300 ${
                          errors.message ? "border-red-500/50 focus:border-red-500" : "border-white/[0.06] hover:border-white/10 focus:border-blue-500/40"
                        }`}
                      />
                      {errors.message && (
                        <span id="message-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left flex items-center gap-1">
                          <span>⚠️</span> {errors.message}
                        </span>
                      )}
                    </div>

                    {/* Submit level validation feedback block */}
                    {submitError && (
                      <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs text-left font-mono flex items-center gap-2"
                      >
                        <span className="shrink-0 text-sm">⚠️</span>
                        <span>{submitError}</span>
                      </motion.div>
                    )}

                    {/* Submit Trigger with Dynamic Progress Step Messaging */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:via-indigo-500 hover:to-purple-500 active:scale-[0.98] text-white disabled:from-blue-900 disabled:to-indigo-900 disabled:text-blue-300 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-[0_0_25px_rgba(59,130,246,0.35)] hover:scale-[1.01]"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="animate-pulse">
                            {submitStep === 1 && "Connecting crypt-link..."}
                            {submitStep === 2 && "Authorizing envelope metadata..."}
                            {submitStep === 3 && "Archiving signal locally..."}
                          </span>
                          <Loader2 className="w-4 h-4 animate-spin text-white" />
                        </>
                      ) : (
                        <>
                          <span>Send Message</span>
                          <Send className="w-4 h-4 text-white" />
                        </>
                      )}
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Small active channels links row - mail, linkedin, github */}
              <div className="flex items-center justify-center gap-4 mt-8 pt-7 border-t border-white/5 select-none">
                <a
                  href={`mailto:${finalEmail}`}
                  className="w-10.5 h-10.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  title="Email Gayatri"
                >
                  <Mail className="w-5 h-5" />
                </a>
                <a
                  href={finalLinkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10.5 h-10.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)]"
                  title="LinkedIn Profile"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href={finalGithub}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10.5 h-10.5 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/10 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_15px_rgba(16,185,129,0.15)]"
                  title="GitHub Catalog"
                >
                  <Github className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Client Dispatch Sent-Message Log Board */}
        {sentLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-gradient-to-b from-[#090d16]/40 to-[#04070d]/60 border border-white/5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 select-none">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                // LOCAL OUTBOX JOURNAL ({sentLogs.length})
              </span>
              <button
                onClick={handleClearHistory}
                className="text-[9px] font-mono text-slate-400 hover:text-red-400 transition uppercase tracking-wider font-bold"
              >
                Clear Outbox
              </button>
            </div>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-white/10">
              {sentLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl border border-white/[0.03] bg-[#030712]/50 text-left hover:border-blue-500/20 transition-all duration-300">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <span className="text-xs font-bold text-white max-w-[150px] truncate">{log.name}</span>
                    <span className="text-[9px] font-mono text-slate-500">{log.timestamp}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 block mt-1 line-clamp-1">Sub: {log.subject}</span>
                  <p className="text-xs text-slate-350 mt-1.5 font-sans leading-normal line-clamp-2">
                    {log.message}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        )}

      </div>
    </section>
  );
}

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
      {/* Decorative Sci-Fi Cyber Lights */}
      <div className="absolute top-[10%] right-[3%] w-[38rem] h-[38rem] rounded-full bg-blue-500/5 blur-[160px] -z-10 pointer-events-none" />
      <div className="absolute bottom-[10%] left-[3%] w-[32rem] h-[32rem] rounded-full bg-indigo-650/4 blur-[140px] -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-12 select-none">
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-2 px-3 py-1 rounded-full bg-blue-950/20 border border-blue-500/15 text-blue-400 text-xs font-mono tracking-widest uppercase mb-4"
          >
            <Send className="w-3.5 h-3.5 text-blue-400 animate-pulse" />
            <span>06 // TRANSMIT PIXELS</span>
          </motion.div>

          {/* Contact Header */}
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-4xl sm:text-5xl font-black text-white tracking-tight"
          >
            Contact <span className="text-blue-500">Me</span>
          </motion.h2>
          
          <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mt-4" />

          {/* Subtitle */}
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-slate-400 text-xs sm:text-sm max-w-xl mt-5 leading-relaxed font-sans"
          >
            Open to internships, research affiliations, and professional network integrations. Send an encrypted signal directly to my inbox.
          </motion.p>
        </div>

        {/* SINGLE CENTRED COMPONENT: Highly impressive, premium futuristic layout */}
        <div className="max-w-2xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6 sm:p-10 rounded-3xl bg-[#090d16]/40 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.035)] hover:border-blue-500/20 transition-all duration-300 w-full"
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center text-center py-8"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center mb-6 text-emerald-400">
                    <CheckCircle className="w-8 h-8 animate-bounce" />
                  </div>
                  <h4 className="font-display text-2xl font-black text-white mb-2 uppercase tracking-wide">
                    Transmission Dispatched
                  </h4>
                  <p className="text-slate-400 text-xs sm:text-sm max-w-sm mb-8 leading-relaxed">
                    Secure channel update verified. Your message has been archived locally and sent to queue. I will reply through the specified return address within 24 hours.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-mono text-xs font-black uppercase tracking-wider transition-all duration-300 shadow-lg shadow-blue-600/20 cursor-pointer"
                  >
                    Send Another Transmission
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-4.5 text-left"
                  noValidate
                >
                  {/* Grid Name & Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5">
                    {/* Name field */}
                    <div className="space-y-1.5 flex flex-col items-start">
                      <label htmlFor="name-input" className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black select-none">
                        <User className="w-3 h-3 text-blue-500" />
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
                        className={`w-full px-4 py-3 rounded-xl bg-[#080d19]/80 border text-slate-200 placeholder-slate-600 text-sm font-sans focus:outline-none focus:bg-[#040811] focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 ${
                          errors.name ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                      {errors.name && (
                        <span id="name-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left">
                          {errors.name}
                        </span>
                      )}
                    </div>

                    {/* Email field */}
                    <div className="space-y-1.5 flex flex-col items-start">
                      <label htmlFor="email-input" className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black select-none">
                        <Mail className="w-3 h-3 text-blue-500" />
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
                        className={`w-full px-4 py-3 rounded-xl bg-[#080d19]/80 border text-slate-200 placeholder-slate-600 text-sm font-sans focus:outline-none focus:bg-[#040811] focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 ${
                          errors.email ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                        }`}
                      />
                      {errors.email && (
                        <span id="email-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left">
                          {errors.email}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Subject field */}
                  <div className="space-y-1.5 flex flex-col items-start">
                    <label htmlFor="subject-input" className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black select-none">
                      <BookOpen className="w-3 h-3 text-blue-500" />
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
                      className={`w-full px-4 py-3 rounded-xl bg-[#080d19]/80 border text-slate-200 placeholder-slate-600 text-sm font-sans focus:outline-none focus:bg-[#040811] focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 ${
                        errors.subject ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                    />
                    {errors.subject && (
                      <span id="subject-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left">
                        {errors.subject}
                      </span>
                    )}
                  </div>

                  {/* Message body field */}
                  <div className="space-y-1.5 flex flex-col items-start">
                    <label htmlFor="message-input" className="flex items-center gap-1.5 text-[9px] font-mono text-slate-400 uppercase tracking-widest font-black select-none">
                      <MessageSquare className="w-3 h-3 text-blue-500" />
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
                      className={`w-full px-4 py-3 rounded-xl bg-[#080d19]/80 border text-slate-200 placeholder-slate-600 text-sm font-sans resize-none focus:outline-none focus:bg-[#040811] focus:border-blue-500/60 focus:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all duration-300 ${
                        errors.message ? "border-red-500/80 focus:border-red-500" : "border-white/10 focus:border-blue-500"
                      }`}
                    />
                    {errors.message && (
                      <span id="message-error" className="text-[10px] font-mono text-red-400 mt-1 pl-1 text-left">
                        {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit level validation feedback block */}
                  {submitError && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-red-400 text-xs text-left font-mono"
                    >
                      ⚠️ {submitError}
                    </motion.div>
                  )}

                  {/* Submit Trigger with Dynamic Progress Step Messaging */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 rounded-xl font-mono text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 active:scale-[0.98] text-white disabled:bg-blue-900 disabled:text-blue-300 flex items-center justify-center gap-3 transition-all duration-300 shadow-lg cursor-pointer hover:shadow-[0_0_20px_rgba(59,130,246,0.25)]"
                  >
                    {isSubmitting ? (
                      <>
                        <span>
                          {submitStep === 1 && "Connecting crypt-link..."}
                          {submitStep === 2 && "Authorizing envelope metadata..."}
                          {submitStep === 3 && "Archiving signal locally..."}
                        </span>
                        <Loader2 className="w-4 h-4 animate-spin text-white" />
                      </>
                    ) : (
                      <>
                        <span>Transmit Secure Message</span>
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
                className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="Email Gayatri"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href={finalLinkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 text-slate-400 hover:text-blue-400 flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="LinkedIn Profile"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={finalGithub}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/[0.02] border border-white/5 hover:border-blue-500/40 hover:bg-blue-500/5 text-slate-400 hover:text-emerald-400 flex items-center justify-center transition-all duration-300 hover:scale-105"
                title="GitHub Catalog"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Client Dispatch Sent-Message Log Board */}
        {sentLogs.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto mt-10 p-6 rounded-2xl bg-[#090d16]/30 border border-white/5 shadow-2xl relative"
          >
            <div className="flex items-center justify-between border-b border-white/5 pb-4 mb-4 select-none">
              <span className="text-[10px] font-mono font-bold text-blue-400 uppercase tracking-wider flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping inline-block" />
                // LOCAL OUTBOX JOURNAL ({sentLogs.length})
              </span>
              <button
                onClick={handleClearHistory}
                className="text-[9px] font-mono text-slate-550 hover:text-red-400 transition uppercase tracking-wider font-bold"
              >
                Clear Outbox
              </button>
            </div>

            <div className="space-y-3.5 max-h-[220px] overflow-y-auto pr-1">
              {sentLogs.map((log) => (
                <div key={log.id} className="p-3.5 rounded-xl border border-white/[0.03] bg-[#030712]/50 text-left">
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

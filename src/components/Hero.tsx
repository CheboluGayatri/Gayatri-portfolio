import React, { useState, useRef, useEffect } from "react";
import { Download, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, Cpu, Code2, Database, X } from "lucide-react";
import { motion } from "motion/react";
import { useAssetDetection, FALLBACK_ASSETS } from "../utils/assetDetector";

interface HeroProps {
  name: string;
  role: string;
  tagline: string;
  email: string;
  onNavigate: (id: string) => void;
}

export default function Hero({ name, role, tagline, email, onNavigate }: HeroProps) {
  const assets = useAssetDetection();
  const [isPlaying, setIsPlaying] = useState(true);
  
  // 💡 VS CODE TIP: To make the video voice play out loud automatically by default in your local setup,
  // change the initial state below from `true` to `false`.
  // Note: Modern browsers (Chrome/Safari) block unmuted autoplay until the user clicks anywhere on the page first.
  const [isMuted, setIsMuted] = useState(true); 
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasInteractedRef = useRef(false);

  const [showVolumePrompt, setShowVolumePrompt] = useState(true);

  // Determine active video source (dynamic local or premium cloud tech b-roll fallback)
  const activeVideoUrl = assets.videoUrl || FALLBACK_ASSETS.videoUrl;
  const activeProfileUrl = assets.profileUrl || FALLBACK_ASSETS.profileUrl;

  // Sync video audio/playback state
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
      if (isPlaying) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
          playPromise.catch((err) => {
            console.log("Unmuted video autoplay restricted by browser policies. Falling back to muted playback.", err);
            // ONLY fallback to auto-muted loop if user hasn't active-interacted with the layout yet
            if (!hasInteractedRef.current) {
              setIsAutoplayBlocked(true);
              setIsMuted(true); // Sync state so unmute prompt shows
              if (videoRef.current) {
                videoRef.current.muted = true;
                videoRef.current.play().catch(e => console.log("Muted autoplay fallback failed too:", e));
              }
            } else {
              console.log("User has active engagement, bypassing programmatic muted fallback.");
            }
          });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying, isMuted, activeVideoUrl]);

  // Handle smart general interaction detection to auto-unmute and play background video
  useEffect(() => {
    const handleFirstGesture = () => {
      // Set interaction status permanently
      hasInteractedRef.current = true;
      
      // Upon the very first user interaction with the page, try to unmute/activate audio for Gayatri's voiced video
      setIsMuted(false);
      setIsAutoplayBlocked(false);

      if (videoRef.current) {
        videoRef.current.muted = false;
        videoRef.current.volume = 1.0;
        videoRef.current.play().catch((err) => {
          console.log("Auto-unmute play gesture errored:", err);
        });
      }

      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("click", handleFirstGesture);
      window.removeEventListener("touchstart", handleFirstGesture);
      window.removeEventListener("keydown", handleFirstGesture);
    };

    window.addEventListener("click", handleFirstGesture, { once: true });
    window.addEventListener("touchstart", handleFirstGesture, { once: true });
    window.addEventListener("keydown", handleFirstGesture, { once: true });

    return cleanup;
  }, []);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    hasInteractedRef.current = true;
    if (isMuted) {
      // Unmuting: reset video to start so they hear the greeting clearly
      if (videoRef.current) {
        videoRef.current.currentTime = 0;
      }
      setIsMuted(false);
      setIsAutoplayBlocked(false);
    } else {
      setIsMuted(true);
    }
  };

  const handleUnmuteAndRestart = () => {
    hasInteractedRef.current = true;
    setIsMuted(false);
    setIsPlaying(true);
    setIsAutoplayBlocked(false);

    if (videoRef.current) {
      videoRef.current.muted = false;
      videoRef.current.volume = 1.0;
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {
        console.log("Manual play trigger error for video:", err);
      });
    }
  };

  const handleDownloadResume = () => {
    if (assets.resumeUrl) {
      // Create a temporary link and trigger download for the discovered PDF path
      const link = document.createElement("a");
      link.href = assets.resumeUrl;
      link.target = "_blank";
      link.download = "Gayatri_Chebolu_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      // High-quality print-layout fallback representing Gayatri's profile details
      window.print();
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] xl:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950"
    >
      {/* 1. Cinematic Autoplay Fullscreen Background Video & Soundtrack */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        {/* Background Video element (HD clearly visible format) */}
        <video
          ref={videoRef}
          src={activeVideoUrl}
          preload="auto"
          muted={isMuted}
          playsInline
          loop
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-100"
        />

        {/* Subtle left gradient overlay only to ensure text legibility while keeping her video extremely clear and bright */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-gradient-to-r from-slate-950/85 via-slate-950/45 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#030712] via-[#030712]/40 to-transparent z-10 pointer-events-none" />

        {/* Cinematic Glowing Background blobs constantly active underneath the video */}
        <div className="absolute inset-0">
          <div className="absolute top-[15%] left-[5%] w-[35rem] h-[35rem] rounded-full bg-blue-600/5 blur-[130px]" />
          <div className="absolute bottom-[15%] right-[5%] w-[40rem] h-[40rem] rounded-full bg-blue-800/5 blur-[150px]" />
        </div>

        {/* Grid Overlay with a subtle blue glow feel */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.005)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.005)_1px,transparent_1px)] bg-[size:42px_42px] opacity-10 z-10 pointer-events-none" />
      </div>

      {/* 2. Floating Unmute Action Notification */}
      {isMuted && showVolumePrompt && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-35 w-[90%] max-w-lg pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-2xl bg-gradient-to-r from-blue-650/45 via-[#0047e1]/25 to-stone-950/60 border border-blue-500/40 backdrop-blur-md shadow-2xl hover:border-blue-400/60 transition-all duration-300"
          >
            <div className="flex items-center gap-3 cursor-pointer select-none" onClick={handleUnmuteAndRestart}>
              <div className="w-9 h-9 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-450 animate-pulse">
                <Volume2 className="w-5 h-5 animate-bounce" />
              </div>
              <div className="text-left">
                <p className="text-xs font-bold text-white tracking-wide">
                  🔊 Click to unmute Gayatri's background video sound!
                </p>
                <p className="text-[10px] text-slate-300 font-mono">
                  Autoplay is default muted for browser compatibility. Click to play with full clear HD vocal sound!
                </p>
              </div>
            </div>
            <button
              onClick={() => setShowVolumePrompt(false)}
              className="p-1 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-6 w-full relative z-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column: Headline, Bio & CTAs */}
        <div className="lg:col-span-8 flex flex-col items-start text-left mt-6">
          {/* Pulsing Tag / Badge with blue theme glow */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-2 text-blue-400 font-mono text-xs tracking-widest uppercase mb-4"
          >
            <Cpu className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
            <span>AI &amp; COMPUTER SCIENCE GRADUATE</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </motion.div>

          {/* Premium display typewriter header matching Sushmita Style */}
          <h1 className="font-display text-5xl sm:text-7.5xl font-black text-white leading-[1.05] tracking-tight mb-5">
            Hi, I'm Gayatri <br />
            <span className="text-blue-400 hover:scale-101 duration-350 bg-clip-text text-3xl sm:text-5xl font-extrabold tracking-normal">
              {role}
            </span>
          </h1>

          {/* Core Introduction / Tagline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-slate-300 text-sm sm:text-base max-w-xl leading-relaxed mb-8 font-sans"
          >
            {tagline}
          </motion.p>

          {/* Core Action Call To Actions using pristine round pills matching slide 1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 w-full"
          >
            <button
              onClick={() => onNavigate("projects")}
              className="px-8 py-3.5 bg-white text-black font-extrabold rounded-full text-xs sm:text-sm hover:bg-blue-600 hover:text-white hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto cursor-pointer shadow-lg"
            >
              <span>View My Work</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-3.5 border border-white hover:border-blue-500 hover:bg-blue-500/10 font-extrabold rounded-full text-xs sm:text-sm hover:scale-[1.05] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto cursor-pointer text-white shadow-sm"
            >
              <span>Contact Me</span>
            </button>
          </motion.div>
        </div>

        {/* Right Column: Speaker unmute controls / voice widget matching Slide 1 */}
        <div className="lg:col-span-4 w-full flex flex-col items-center lg:items-end justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center pointer-events-auto cursor-pointer"
            onClick={isMuted ? handleUnmuteAndRestart : toggleMute}
          >
            <div className="relative group flex items-center justify-center w-24 h-24 sm:w-28 sm:h-28 rounded-full border border-white/10 hover:border-blue-500 bg-black/40 hover:bg-black/80 shadow-2xl transition-all duration-500">
              {/* Pulsating backdrop circle lines */}
              <div className="absolute -inset-2.5 rounded-full border border-blue-500/20 opacity-0 group-hover:opacity-100 group-hover:animate-ping [animation-duration:2.5s] -z-10" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 opacity-10 group-hover:opacity-20 blur-sm -z-10" />

              {/* Sound waves graphic overlay when active */}
              {!isMuted && (
                <div className="absolute inset-0.5 rounded-full border border-emerald-500/30 animate-spin [animation-duration:15s]" />
              )}

              {/* Central Speaker Icon */}
              <div className="flex flex-col items-center gap-1 text-white">
                {isMuted ? (
                  <VolumeX className="w-8 h-8 text-blue-500 animate-pulse group-hover:scale-110 duration-300" />
                ) : (
                  <Volume2 className="w-8 h-8 text-emerald-400 animate-bounce group-hover:scale-110 duration-300" />
                )}
              </div>
            </div>

            {/* Label below the speaker */}
            <div className="text-center mt-4">
              <span className="text-[11px] font-mono font-black tracking-widest text-[#f5f5f5] uppercase select-none opacity-80 group-hover:opacity-100 transition-opacity">
                {isMuted ? "UNMUTE REEL" : "TAP TO MUTE"}
              </span>
              <p className="text-[9px] font-mono text-blue-400 mt-1 uppercase font-semibold">
                {isMuted ? "sound is muted" : "speech active"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Background Player controls for cinematic video custom interface */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 p-1.5 rounded-xl bg-slate-950/80 border border-white/5 shadow-2xl backdrop-blur-md">
        <button
          onClick={togglePlay}
          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition cursor-pointer"
          title={isPlaying ? "Pause visual and audio stream" : "Play visual and audio stream"}
        >
          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-white" />}
        </button>
        <button
          onClick={toggleMute}
          className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-white transition cursor-pointer flex items-center gap-1"
          title={isMuted ? "Unmute Gayatri background video sound" : "Mute Gayatri background video sound"}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5 text-slate-400" /> : <Volume2 className="w-3.5 h-3.5 text-blue-400 animate-pulse" />}
          <span className="text-[9px] font-mono font-bold hidden sm:inline text-slate-400">SPEECH/SOUND</span>
        </button>
      </div>

      {/* Floating Scroll Down button indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => onNavigate("about")}
          className="w-5 h-9 rounded-full border border-slate-700 p-1 flex justify-center cursor-pointer"
          aria-label="Scroll to About section"
        >
          <div className="w-1 h-2 rounded-full bg-blue-400 animate-scroll" />
        </button>
      </div>
    </section>
  );
}

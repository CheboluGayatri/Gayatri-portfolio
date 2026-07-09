import React, { useState, useRef, useEffect } from "react";
import { Download, Play, Pause, Volume2, VolumeX, Sparkles, ArrowRight, Cpu, Code2, Database, X, Settings, Upload, RotateCcw, AlertTriangle, Check, Link, Globe } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useAssetDetection, FALLBACK_ASSETS, getEmbedVideoUrl } from "../utils/assetDetector";
import { saveLocalMedia, clearLocalMedia } from "../utils/db";
import { useImageLoader } from "../hooks/useImageLoader";

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
  const [isVideoReady, setIsVideoReady] = useState(false);
  
  // 💡 VS CODE TIP: To make the video voice play out loud automatically by default in your local setup,
  // change the initial state below from `true` to `false`.
  // Note: Modern browsers (Chrome/Safari) block unmuted autoplay until the user clicks anywhere on the page first.
  const [isMuted, setIsMuted] = useState(true); 
  const [isAutoplayBlocked, setIsAutoplayBlocked] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hasInteractedRef = useRef(false);

  const [showVolumePrompt, setShowVolumePrompt] = useState(true);

  // Settings Panel States
  const [isSetupOpen, setIsSetupOpen] = useState(false);
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [videoUrlInput, setVideoUrlInput] = useState(() => localStorage.getItem("custom_video_url") || "");
  const [imageUrlInput, setImageUrlInput] = useState(() => localStorage.getItem("custom_profile_url") || "");
  const [uploadStatus, setUploadStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [uploadError, setUploadError] = useState("");
  const [infoMessage, setInfoMessage] = useState("");

  // Determine active video source (dynamic local or premium cloud tech b-roll fallback)
  const activeVideoRaw = assets.videoUrl || FALLBACK_ASSETS.videoUrl;
  const activeProfileRaw = assets.profileUrl || FALLBACK_ASSETS.profileUrl;

  const initialVideoUrl = typeof activeVideoRaw === "string" ? activeVideoRaw : (activeVideoRaw as any)?.default || (activeVideoRaw as any)?.src || "";
  const initialProfileUrl = typeof activeProfileRaw === "string" ? activeProfileRaw : (activeProfileRaw as any)?.default || (activeProfileRaw as any)?.src || "";

  const [resolvedVideoUrl, setResolvedVideoUrl] = useState(initialVideoUrl);
  const [resolvedProfileUrl, setResolvedProfileUrl] = useState(initialProfileUrl);

  useEffect(() => {
    setIsVideoReady(false);
    setResolvedVideoUrl(initialVideoUrl);
    setResolvedProfileUrl(initialProfileUrl);
  }, [initialVideoUrl, initialProfileUrl]);

  // Robust client-side validation: if custom image fails to load, fallback to local default profile pic
  useEffect(() => {
    if (!resolvedProfileUrl) return;
    const img = new Image();
    img.src = resolvedProfileUrl;
    img.onerror = () => {
      console.warn("Hero poster image failed to load, falling back to local default image.");
      const fallback = FALLBACK_ASSETS.localProfileUrl || "";
      if (resolvedProfileUrl !== fallback) {
        setResolvedProfileUrl(fallback);
      }
    };
  }, [resolvedProfileUrl]);

  const handleVideoError = () => {
    console.warn("Hero background video failed to load, falling back to local default video.");
    const fallback = FALLBACK_ASSETS.localVideoUrl || "";
    if (resolvedVideoUrl !== fallback) {
      setResolvedVideoUrl(fallback);
    }
  };

  // Synchronize dynamic video loading and playback when the source URL changes
  const lastVideoUrlRef = useRef<string>("");

  useEffect(() => {
    const video = videoRef.current;
    if (video && resolvedVideoUrl) {
      // Only call video.load() if the URL actually changed and it's not the initial mount
      if (lastVideoUrlRef.current && lastVideoUrlRef.current !== resolvedVideoUrl) {
        video.load();
        if (isPlaying) {
          video.play().catch((err) => {
            console.warn("Autoplay of reloaded video was blocked:", err);
          });
        }
      }
      lastVideoUrlRef.current = resolvedVideoUrl;
    }
  }, [resolvedVideoUrl, isPlaying]);
  
  // Resolve embed details if using YouTube/Vimeo
  const videoDetails = getEmbedVideoUrl(resolvedVideoUrl);

  // Sync video audio/playback state safely
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Directly set muted property
    video.muted = isMuted;

    let isSubscribed = true;

    const playVideo = async () => {
      try {
        if (isPlaying) {
          if (video.paused && isSubscribed) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              await playPromise;
            }
          }
        } else {
          if (!video.paused) {
            video.pause();
          }
        }
      } catch (err: any) {
        if (err.name !== "AbortError" && isSubscribed) {
          console.warn("Video autoplay block:", err.message || err);
          // Fallback to muted autoplay on block
          if (!hasInteractedRef.current) {
            setIsAutoplayBlocked(true);
            setIsMuted(true);
            video.muted = true;
            if (video.paused) {
              video.play().catch(() => {});
            }
          }
        }
      }
    };

    playVideo();

    return () => {
      isSubscribed = false;
    };
  }, [isPlaying, isMuted, resolvedVideoUrl]);

  // Handle first user gesture detection to mark interaction
  useEffect(() => {
    const handleFirstGesture = () => {
      hasInteractedRef.current = true;
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

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // Check file size (suggest under 25MB for browser safety)
    if (file.size > 25 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadError(`⚠️ Video file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please choose a compressed video under 25MB, or paste a direct video link in the URL tab!`);
      return;
    }

    setUploadStatus("loading");
    setUploadError("");
    setInfoMessage("");
    
    try {
      await saveLocalMedia("custom_video", file);
      localStorage.removeItem("custom_video_url"); // Clear URL override
      setUploadStatus("success");
      setInfoMessage("🎥 Gayatri's background video uploaded to IndexedDB successfully! Reloading browser...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setUploadStatus("error");
      setUploadError("Could not store video in IndexedDB: " + (err.message || err.toString()) + ". Try pasting a video link in the URL tab, which is 100% reliable on Vercel!");
    }
  };

  const handleProfileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 10 * 1024 * 1024) {
      setUploadStatus("error");
      setUploadError(`⚠️ Image file is too large (${(file.size / (1024 * 1024)).toFixed(1)}MB). Please select a photo under 10MB.`);
      return;
    }

    setUploadStatus("loading");
    setUploadError("");
    setInfoMessage("");
    
    try {
      await saveLocalMedia("custom_profile", file);
      localStorage.removeItem("custom_profile_url"); // Clear URL override
      setUploadStatus("success");
      setInfoMessage("📸 New profile picture saved to IndexedDB! Page will auto-reload to update...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setUploadStatus("error");
      setUploadError("Could not store image in IndexedDB: " + (err.message || err.toString()));
    }
  };

  const handleSaveUrls = () => {
    setUploadStatus("loading");
    setUploadError("");
    setInfoMessage("");

    try {
      if (videoUrlInput.trim()) {
        localStorage.setItem("custom_video_url", videoUrlInput.trim());
      } else {
        localStorage.removeItem("custom_video_url");
      }

      if (imageUrlInput.trim()) {
        localStorage.setItem("custom_profile_url", imageUrlInput.trim());
      } else {
        localStorage.removeItem("custom_profile_url");
      }

      setUploadStatus("success");
      setInfoMessage("✨ Custom media links saved successfully! Page will reload to update...");
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setUploadStatus("error");
      setUploadError("Failed to save links: " + (err.message || err.toString()));
    }
  };

  const handleResetVideo = async () => {
    try {
      await clearLocalMedia("custom_video");
      localStorage.removeItem("custom_video_url");
      setInfoMessage("Restoring Gayatri's default background video...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  const handleResetProfile = async () => {
    try {
      await clearLocalMedia("custom_profile");
      localStorage.removeItem("custom_profile_url");
      setInfoMessage("Restoring default Gayatri profile photo...");
      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] xl:min-h-screen flex items-center justify-center pt-28 pb-16 overflow-hidden bg-slate-950"
    >
      {/* 1. Cinematic Autoplay Fullscreen Background Video & Soundtrack */}
      <div 
        className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-slate-950"
      >
        {/* Static high-resolution poster image loaded instantly in background to prevent blank/black screens on any device */}
        {(resolvedProfileUrl || FALLBACK_ASSETS.profileUrl) && (
          <img
            src={resolvedProfileUrl || FALLBACK_ASSETS.profileUrl}
            alt="Gayatri Portrait Poster"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
            style={{
              objectFit: "cover",
              filter: "brightness(1.05) contrast(1.05)",
              width: "100%",
              height: "100%",
            }}
          />
        )}

        {/* Background Video element (HD clearly visible format with smooth fade-in) */}
        {resolvedVideoUrl && (
          <motion.video
            id="hero-video"
            ref={videoRef}
            src={resolvedVideoUrl}
            preload="auto"
            muted
            playsInline
            loop
            autoPlay
            onLoadedData={() => setIsVideoReady(true)}
            onLoadedMetadata={() => setIsVideoReady(true)}
            onCanPlay={() => setIsVideoReady(true)}
            onError={handleVideoError}
            initial={{ opacity: 0 }}
            animate={{ opacity: isVideoReady ? 1 : 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover z-10"
            style={{
              objectFit: "cover",
              filter: "brightness(1.05) contrast(1.05)",
              width: "100%",
              height: "100%",
            }}
          />
        )}

        {/* Crisp subtle overlay to keep text extremely readable without darkening the background video */}
        <div className="absolute inset-0 bg-slate-950/10 md:bg-slate-950/15 z-10 pointer-events-none" />

        {/* Elegant side gradients for text contrast while keeping Gayatri's video bright and fully visible */}
        <div className="absolute inset-y-0 left-0 w-full md:w-3/5 bg-gradient-to-r from-slate-950/70 via-slate-950/20 to-transparent z-15 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#030712] via-transparent to-transparent z-15 pointer-events-none" />

        {/* Cinematic Glowing Background blobs constantly active underneath the video */}
        <div className="absolute inset-0 z-5">
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
            <span>COMPUTER SCIENCE &amp; AI GRADUATE</span>
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          </motion.div>

          {/* Premium display typewriter header matching Sushmita Style */}
          <div className="mb-6">
            <span className="text-slate-400 font-display text-lg sm:text-2xl font-semibold tracking-wide block mb-1">
              Hi, I'm
            </span>
            <h1 className="font-display text-4xl sm:text-6xl font-black text-white leading-none tracking-tight mb-4">
              Gayatri
            </h1>
            <h2 className="text-blue-400 font-sans text-lg sm:text-2xl font-bold tracking-normal leading-relaxed max-w-2xl">
              {role.includes("with") ? (
                <>
                  {role.split("with")[0].trim()} with <br className="block" /> {role.split("with")[1].trim()}
                </>
              ) : role}
            </h2>
          </div>

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
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-full text-xs sm:text-sm hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto cursor-pointer shadow-md"
            >
              <span>View Projects</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onNavigate("contact")}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-full text-xs sm:text-sm hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto cursor-pointer shadow-md"
            >
              <span>Contact Me</span>
            </button>

            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-8 py-3.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-extrabold rounded-full text-xs sm:text-sm hover:scale-[1.05] hover:shadow-[0_0_25px_rgba(59,130,246,0.45)] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 pointer-events-auto cursor-pointer shadow-md"
            >
              <span>📄 Download Resume</span>
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
        
        {/* Custom Settings button to configure backgrounds and profile photos */}
        <button
          onClick={() => setIsSetupOpen(true)}
          className="p-1.5 rounded bg-white/5 hover:bg-white/10 hover:text-blue-400 text-slate-300 transition cursor-pointer flex items-center gap-1"
          title="Open Custom Background & Profile Photo Panel"
        >
          <Settings className="w-3.5 h-3.5 animate-spin-slow" />
          <span className="text-[9px] font-mono font-bold hidden sm:inline">BG SETTINGS</span>
        </button>
      </div>

      {/* Floating Scroll Down button indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 opacity-60 hover:opacity-100 transition-opacity duration-300 z-30 pointer-events-auto">
        <button
          onClick={() => onNavigate("about")}
          className="w-5 h-9 rounded-full border border-slate-700 p-1 flex justify-center cursor-pointer z-30 pointer-events-auto"
          aria-label="Scroll to About section"
        >
          <div className="w-1 h-2 rounded-full bg-blue-400 animate-scroll" />
        </button>
      </div>

      {/* Modern High-End Media Setup Modal for Background Video and Profile Images */}
      <AnimatePresence>
        {isSetupOpen && (
          <div className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-xl rounded-3xl border border-white/10 bg-slate-900/95 p-6 shadow-2xl text-left"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-6">
                <div>
                  <span className="text-[9px] font-mono tracking-widest text-blue-400 uppercase font-bold">
                    SYSTEM MEDIA SETTINGS
                  </span>
                  <h3 className="font-display font-bold text-lg text-white">
                    Customize Portfolio Media
                  </h3>
                </div>
                <button
                  onClick={() => {
                    setIsSetupOpen(false);
                    setUploadStatus("idle");
                    setUploadError("");
                    setInfoMessage("");
                  }}
                  className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Status and Action alerts */}
              {infoMessage && (
                <div className="p-3.5 bg-emerald-500/15 border border-emerald-500/35 rounded-xl text-emerald-400 text-xs font-mono mb-6 flex items-center gap-2">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{infoMessage}</span>
                </div>
              )}

              {uploadError && (
                <div className="p-3.5 bg-red-500/15 border border-red-500/35 rounded-xl text-red-400 text-xs font-mono mb-6 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-red-500 shrink-0" />
                  <span>{uploadError}</span>
                </div>
              )}

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {/* Section 1: Presentation Background Video */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center gap-2">
                      <Play className="w-3.5 h-3.5" /> 1. Home Background Video
                    </h4>
                    {(localStorage.getItem("custom_video_url") || assets.videoUrl !== FALLBACK_ASSETS.videoUrl) && (
                      <button
                        onClick={handleResetVideo}
                        className="text-[10px] font-mono text-red-400 hover:text-red-300 font-bold uppercase cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset Default
                      </button>
                    )}
                  </div>
                  
                  {/* Option A: Link pasting (Best for Vercel!) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-slate-300 block">
                      🔗 Paste Direct Web Link (Supports direct .mp4, YouTube, or Vimeo!)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="url"
                          placeholder="https://example.com/video.mp4 or YouTube URL"
                          value={videoUrlInput}
                          onChange={(e) => setVideoUrlInput(e.target.value)}
                          className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative my-3 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <span className="relative bg-slate-900 px-3 text-[9px] font-mono text-slate-500 uppercase">OR UPLOAD</span>
                  </div>

                  {/* Option B: Local upload */}
                  <div className="relative p-4 rounded-xl border border-dashed border-white/10 hover:border-blue-500/30 transition-all text-center group bg-black/20 flex flex-col items-center justify-center space-y-1 cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleVideoUpload}
                      disabled={uploadStatus === "loading"}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-blue-400 duration-200" />
                    <span className="text-[11px] text-slate-300">
                      {uploadStatus === "loading" ? "Uploading..." : "Select Local Video File (.mp4 / .mov)"}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      (Max 25MB for local browser memory)
                    </span>
                  </div>
                </div>

                {/* Section 2: Profile Picture */}
                <div className="space-y-3 p-4 rounded-2xl bg-white/5 border border-white/5">
                  <div className="flex justify-between items-center">
                    <h4 className="text-xs font-bold text-violet-400 uppercase tracking-wider flex items-center gap-2">
                      <Globe className="w-3.5 h-3.5" /> 2. Profile Photo
                    </h4>
                    {(localStorage.getItem("custom_profile_url") || assets.profileUrl !== FALLBACK_ASSETS.profileUrl) && (
                      <button
                        onClick={handleResetProfile}
                        className="text-[10px] font-mono text-red-400 hover:text-red-300 font-bold uppercase cursor-pointer flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Reset Default
                      </button>
                    )}
                  </div>

                  {/* Option A: Link pasting (Best for Vercel!) */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-mono text-slate-300 block">
                      🔗 Paste Direct Image URL (https://...)
                    </label>
                    <div className="flex gap-2">
                      <div className="relative flex-grow">
                        <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                        <input
                          type="url"
                          placeholder="https://example.com/photo.jpg"
                          value={imageUrlInput}
                          onChange={(e) => setImageUrlInput(e.target.value)}
                          className="w-full bg-slate-950/80 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs text-white focus:outline-none focus:border-violet-500 transition-colors"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="relative my-3 flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/5"></div></div>
                    <span className="relative bg-slate-900 px-3 text-[9px] font-mono text-slate-500 uppercase">OR UPLOAD</span>
                  </div>

                  {/* Option B: Local upload */}
                  <div className="relative p-4 rounded-xl border border-dashed border-white/10 hover:border-violet-500/30 transition-all text-center group bg-black/20 flex flex-col items-center justify-center space-y-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleProfileUpload}
                      disabled={uploadStatus === "loading"}
                      className="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                    />
                    <Upload className="w-5 h-5 text-slate-400 group-hover:text-violet-400 duration-200" />
                    <span className="text-[11px] text-slate-300">
                      {uploadStatus === "loading" ? "Uploading..." : "Select Local Image File (.png / .jpg)"}
                    </span>
                    <span className="text-[9px] text-slate-500 font-mono">
                      (Saved to browser IndexedDB)
                    </span>
                  </div>
                </div>

                {/* Info Guide */}
                <div className="p-4 rounded-xl border border-blue-500/10 bg-blue-500/5 text-xs text-slate-400 leading-relaxed space-y-1.5">
                  <p className="font-bold text-blue-300 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5 text-blue-400 shrink-0" /> Why use direct Web Links?
                  </p>
                  <p>
                    Since your portfolio is deployed on **Vercel**, local file uploads are stored in your private browser database. Other people visiting your URL will see the default portfolio images.
                  </p>
                  <p>
                    To ensure **everyone in the world** sees your personal video and photo immediately, upload them to a hosting site (like Cloudinary, Google Drive public links, YouTube/Vimeo, or Imgbb) and **paste the direct links** here!
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="border-t border-white/5 pt-4 mt-6 flex justify-end gap-3">
                <button
                  onClick={() => {
                    setIsSetupOpen(false);
                    setUploadStatus("idle");
                    setUploadError("");
                    setInfoMessage("");
                  }}
                  className="px-4 py-2 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveUrls}
                  className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition cursor-pointer flex items-center gap-1.5 shadow"
                >
                  <Check className="w-3.5 h-3.5" /> Save Links
                </button>
              </div>
            </motion.div>
          </div>
        )}

        {isResumeOpen && (
          <div 
            id="printable-resume-container"
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 15, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-4xl rounded-3xl border border-white/10 bg-slate-900 shadow-2xl text-left overflow-hidden my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-slate-900/80 sticky top-0 z-10 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-mono tracking-widest text-blue-400 uppercase font-bold">
                    PORTFOLIO ATS-OPTIMIZED RESUME
                  </span>
                </div>
                <div className="flex items-center gap-3 no-print">
                  {assets.resumeUrl && assets.resumeUrl !== "#print" ? (
                    <>
                      <a
                        href={assets.resumeUrl}
                        download="Gayatri_Chebolu_Resume.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-emerald-600/20"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download PDF</span>
                      </a>
                      <button
                        onClick={() => window.print()}
                        className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/20"
                      >
                        <span>Print Web Version</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => window.print()}
                      className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-mono font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-lg shadow-blue-600/20"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Print / Save PDF</span>
                    </button>
                  )}
                  <button
                    onClick={() => setIsResumeOpen(false)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Printable Area */}
              <div className="p-8 sm:p-12 bg-white text-slate-900 max-h-[75vh] overflow-y-auto custom-scrollbar" id="printable-resume">
                {/* Resume Header */}
                <div className="text-center pb-5 border-b border-slate-300">
                  <h2 className="text-3xl sm:text-4xl font-serif font-black tracking-tight text-slate-900 uppercase">
                    GAYATRI CHEBOLU
                  </h2>
                  <p className="text-sm font-sans font-bold text-slate-600 mt-1 uppercase tracking-wide">
                    Computer Science &amp; Artificial Intelligence Graduate
                  </p>
                  <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2 font-mono">
                    <span>📍 Andhra Pradesh, India</span>
                    <span>•</span>
                    <a href="mailto:gayathrichebolu6@gmail.com" className="hover:text-blue-600 underline">gayathrichebolu6@gmail.com</a>
                    <span>•</span>
                    <span>📞 +91 9154605089</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-slate-600 mt-2 font-mono">
                    <a href="https://www.linkedin.com/in/gayatri-chebolu/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline font-semibold">LinkedIn</a>
                    <span>|</span>
                    <a href="https://github.com/CheboluGayatri" target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline font-semibold">GitHub</a>
                    <span>|</span>
                    <a href={typeof window !== 'undefined' ? window.location.origin : '#'} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 underline font-semibold">Portfolio</a>
                  </div>
                </div>

                {/* Professional Summary */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
                    Professional Summary
                  </h3>
                  <p className="text-xs sm:text-[13px] text-slate-700 leading-relaxed text-justify font-sans">
                    Computer Science and Artificial Intelligence graduate with hands-on experience in machine learning, AI-powered application development, and Python programming through internships and academic projects. Proficient in Python, Scikit-learn, Streamlit, Flask, and Hugging Face Transformers. Seeking an entry-level opportunity to apply my technical skills, contribute to innovative software solutions, and grow as a technology professional in a collaborative environment.
                  </p>
                </div>

                {/* Technical Skills */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-2">
                    Technical Skills
                  </h3>
                  <div className="grid grid-cols-1 gap-y-1 text-xs sm:text-[13px] font-sans">
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Programming</span>
                      <span className="col-span-9 text-slate-700">: Python</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Machine Learning</span>
                      <span className="col-span-9 text-slate-700">: Classification, Regression, Feature Engineering, Model Evaluation, Natural Language Processing (NLP)</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Generative AI</span>
                      <span className="col-span-9 text-slate-700">: Prompt Engineering, Hugging Face Transformers, Ollama, T5</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Libraries</span>
                      <span className="col-span-9 text-slate-700">: Scikit-learn, Pandas, NumPy, Matplotlib</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Frameworks</span>
                      <span className="col-span-9 text-slate-700">: Streamlit, Flask</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Tools</span>
                      <span className="col-span-9 text-slate-700">: Git, GitHub, Jupyter Notebook, SQLite</span>
                    </div>
                    <div className="grid grid-cols-12 gap-2">
                      <span className="col-span-3 font-bold text-slate-800">Deployment</span>
                      <span className="col-span-9 text-slate-700">: Streamlit Community Cloud, Render</span>
                    </div>
                  </div>
                </div>

                {/* Professional Experience */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3">
                    Professional Experience
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">AI Intern — Infosys Springboard</span>
                        <span className="font-bold text-slate-700 text-xs">Sep 2025 – Nov 2025</span>
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs text-slate-600 italic">
                        <span>Internship 6.0 (B2): CodeGenie – AI Explainer and Code Generator</span>
                        <span>Remote</span>
                      </div>
                      <ul className="list-disc list-inside mt-1.5 text-xs text-slate-700 space-y-1 font-sans pl-2 text-justify">
                        <li>Developed an offline AI coding assistant using Python, Streamlit, and Ollama to generate, explain, debug, and review source code.</li>
                        <li>Integrated OCR with Tesseract and document parsing using pdfplumber and python-docx to analyze images and documents.</li>
                        <li>Designed prompt engineering workflows to improve response quality and reduce hallucinations in LLM-generated outputs.</li>
                        <li>Implemented backend logic, local LLM integration, and multi-turn chat functionality for an interactive AI application.</li>
                        <li className="list-none mt-1 font-mono text-[11px] text-blue-800">
                          🔗 GitHub: <a href="https://github.com/CheboluGayatri/CodeGenAiand_Explainer" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">github.com/CheboluGayatri/CodeGenAiand_Explainer</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">AI/ML Intern — 3SKILL</span>
                        <span className="font-bold text-slate-700 text-xs">Dec 2025 – Feb 2026</span>
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs text-slate-600 italic">
                        <span>AiMI – Artificial Intelligence &amp; Machine Intelligence</span>
                        <span>Remote</span>
                      </div>
                      <ul className="list-disc list-inside mt-1.5 text-xs text-slate-700 space-y-1 font-sans pl-2 text-justify">
                        <li>Developed a machine learning model using Random Forest to classify wine quality into Low, Average, and High categories.</li>
                        <li>Performed exploratory data analysis, feature engineering, preprocessing, model training, and evaluation, achieving 87% prediction accuracy.</li>
                        <li>Serialized the trained model using Pickle and deployed it as an interactive Streamlit web application.</li>
                        <li>Strengthened practical skills in machine learning, predictive analytics, and model deployment through end-to-end implementation.</li>
                        <li className="list-none mt-1 font-mono text-[11px] text-blue-800">
                          🔗 GitHub: <a href="https://github.com/CheboluGayatri/Wine-Quality" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">github.com/CheboluGayatri/Wine-Quality</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Projects */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3">
                    Projects
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">House Price Prediction System</span>
                        <span className="font-semibold text-slate-600 text-xs italic">Python — Streamlit — Scikit-learn</span>
                      </div>
                      <ul className="list-disc list-inside mt-1.5 text-xs text-slate-700 space-y-1 font-sans pl-2 text-justify">
                        <li>Developed a machine learning application using Linear Regression to estimate residential property prices based on user-provided features.</li>
                        <li>Performed data preprocessing, feature engineering, one-hot encoding, and evaluated model performance using R², RMSE, MAE, and MAPE.</li>
                        <li>Built and deployed an interactive Streamlit web application for real-time house price prediction.</li>
                        <li className="list-none mt-1 font-mono text-[11px] text-blue-800">
                          🔗 GitHub: <a href="https://github.com/CheboluGayatri/HousePrice" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">github.com/CheboluGayatri/HousePrice</a> — Live: <a href="https://houseprice-kcvnxs5sxgawny4wzehj52.streamlit.app/" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-indigo-600">Demo</a>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">AI Health Symptom Checker</span>
                        <span className="font-semibold text-slate-600 text-xs italic">Python — Flask — Machine Learning — SQLite</span>
                      </div>
                      <ul className="list-disc list-inside mt-1.5 text-xs text-slate-700 space-y-1 font-sans pl-2 text-justify">
                        <li>Developed a full-stack healthcare application that predicts probable diseases using a Random Forest Classifier based on user-selected symptoms.</li>
                        <li>Integrated a Hugging Face Transformer-powered medical chatbot, secure authentication, SQLite database, and browser-based voice input.</li>
                        <li>Implemented automated PDF medical report generation and deployed the application on Render using a responsive Bootstrap interface.</li>
                        <li className="list-none mt-1 font-mono text-[11px] text-blue-800">
                          🔗 GitHub: <a href="https://github.com/CheboluGayatri/AI_HEALTH_SYMPTOM_CHECK" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold">github.com/CheboluGayatri/AI_HEALTH_SYMPTOM_CHECK</a> — Live: <a href="https://ai-health-symptom-check.onrender.com/" target="_blank" rel="noopener noreferrer" className="hover:underline font-bold text-indigo-600">Demo</a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Education */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3">
                    Education
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">B.Tech in Computer Science &amp; Artificial Intelligence</span>
                        <span className="font-semibold text-slate-700 text-xs">2022 – 2026</span>
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs text-slate-600">
                        <span>Kakinada Institute of Engineering and Technology for Women</span>
                        <span className="font-bold">CGPA: 7.78 / 10</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">Intermediate (MPC)</span>
                        <span className="font-semibold text-slate-700 text-xs">2020 – 2022</span>
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs text-slate-600">
                        <span>Triveni Junior College</span>
                        <span className="font-bold">GPA: 9.07 / 10</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between items-baseline font-sans text-xs sm:text-sm">
                        <span className="font-bold text-slate-900">Secondary School (SSC)</span>
                        <span className="font-semibold text-slate-700 text-xs">2019 – 2020</span>
                      </div>
                      <div className="flex justify-between items-baseline font-sans text-[11px] sm:text-xs text-slate-600">
                        <span>Triveni Educational Academy</span>
                        <span className="font-bold">GPA: 10.0 / 10</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mt-6">
                  <h3 className="text-xs font-mono font-black uppercase tracking-wider text-slate-900 border-b-2 border-slate-900 pb-0.5 mb-3">
                    Certifications
                  </h3>
                  <ul className="space-y-2 text-xs text-slate-700 font-sans pl-2">
                    <li className="flex justify-between items-baseline">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 select-none">•</span>
                        <div>
                          <strong>Foundations of Modern Machine Learning (Grade A)</strong>
                          <span className="text-slate-500 text-[11px] block sm:inline sm:ml-2">— iHub-Data, IIIT Hyderabad</span>
                        </div>
                      </div>
                      <a href="https://drive.google.com/file/d/1iGUVEJz6pl39Ug2GzWrpSGSpacCbiZZw/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold font-mono text-[11px] shrink-0 ml-4 no-print">Credential</a>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 select-none">•</span>
                        <div>
                          <strong>Applied Artificial Intelligence: Practical Implementations</strong>
                          <span className="text-slate-500 text-[11px] block sm:inline sm:ml-2">— TechSaksham (Microsoft, SAP &amp; Edunet Foundation)</span>
                        </div>
                      </div>
                      <a href="https://drive.google.com/file/d/1Og7zcvfagldAnBlaWHlVJPrHdzB-8txz/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold font-mono text-[11px] shrink-0 ml-4 no-print">Credential</a>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 select-none">•</span>
                        <div>
                          <strong>Internship 6.0 (B2): CodeGenie – AI Explainer and Code Generator</strong>
                          <span className="text-slate-500 text-[11px] block sm:inline sm:ml-2">— Infosys Springboard</span>
                        </div>
                      </div>
                      <a href="https://drive.google.com/file/d/14D5ENHYsdm2YQqhXIWJN-8Y-tUDLaWo0/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold font-mono text-[11px] shrink-0 ml-4 no-print">Credential</a>
                    </li>
                    <li className="flex justify-between items-baseline">
                      <div className="flex items-start gap-1.5">
                        <span className="text-slate-400 select-none">•</span>
                        <div>
                          <strong>AI &amp; Machine Intelligence Internship</strong>
                          <span className="text-slate-500 text-[11px] block sm:inline sm:ml-2">— 3SKILL</span>
                        </div>
                      </div>
                      <a href="https://drive.google.com/file/d/1VhMQzBz3jkgvswTlx3eonPn3M-UotHcg/view?usp=sharing" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-bold font-mono text-[11px] shrink-0 ml-4 no-print">Credential</a>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 bg-slate-950 border-t border-white/5 flex flex-wrap justify-between items-center gap-3 text-xs text-slate-400 font-mono no-print">
                <div className="flex flex-col gap-0.5 text-[11px] text-slate-400">
                  <span>💡 Designed to print beautifully on standard A4 paper size.</span>
                  <span className="text-blue-450 font-bold">📂 To update with your custom PDF: simply replace "public/resume.pdf" in your downloaded ZIP folder!</span>
                </div>
                <button
                  onClick={() => setIsResumeOpen(false)}
                  className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white font-bold transition cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

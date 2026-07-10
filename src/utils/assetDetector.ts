<<<<<<< HEAD
import { useState, useEffect } from "react";
import { getLocalMedia } from "./db";

// Vite build-time assets glob discovery mapping - restricted to specific types to prevent FS watcher issues with Windows locks
export const localImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}', { eager: true, import: 'default' }) as Record<string, string>;
export const localVideos = import.meta.glob('../assets/videos/*.{mp4,mov,MP4,MOV}', { eager: true, import: 'default' }) as Record<string, string>;

// Dynamically resolve defaultProfile to support any file format the user replaced it with (profile.jpg or profile.png)
const profileKey = Object.keys(localImages).find(key => 
  key.toLowerCase().endsWith('/profile.jpg') || 
  key.toLowerCase().endsWith('/profile.jpeg') || 
  key.toLowerCase().endsWith('/profile.png') ||
  key.toLowerCase().endsWith('/profile.webp')
);
export const defaultProfile = profileKey ? localImages[profileKey] : "";

// Dynamically resolve defaultVideo to support home-video.mp4 or other extensions gracefully
const videoKey = Object.keys(localVideos).find(key =>
  key.toLowerCase().endsWith('/home-video.mp4') ||
  key.toLowerCase().endsWith('/home-video.mov')
);
export const defaultVideo = videoKey ? localVideos[videoKey] : "";

// Dynamically resolve static project screenshots using the globbed localImages to prevent any missing file build errors if files are moved/deleted
const findLocalImage = (keyword: string): string => {
  const key = Object.keys(localImages).find(k => k.toLowerCase().includes(keyword.toLowerCase()));
  return key ? localImages[key] : "";
};

export const housePriceScreenshot = findLocalImage("house_price_dashboard") || "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=800";
export const wineQualityScreenshot = findLocalImage("wine_quality_dashboard") || "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?q=80&w=800";
export const irisClassifierScreenshot = findLocalImage("iris_classifier_dashboard") || "https://images.unsplash.com/photo-1526047932273-341f2a7631f9?q=80&w=800";
export const codegenaiScreenshot = findLocalImage("codegenai_explainer") || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800";
export const aiChatbotScreenshot = findLocalImage("ai_chatbot") || "https://images.unsplash.com/photo-1531746790731-6c087fecd77a?q=80&w=800";
export const thinkChampQuizScreenshot = findLocalImage("think_champ_quiz") || "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800";
export const thinkChampGenScreenshot = findLocalImage("think_champ_generator") || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800";
export const movieVerseScreenshot = findLocalImage("movie_verse") || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=800";
export const travelTalesScreenshot = findLocalImage("travel_tales") || "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=800";
export const symptomCheckerScreenshot = findLocalImage("symptom_checker_mockup") || "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800";

// Project Slugs mapping
=======
import { useEffect, useState } from "react";

import profileImage from "../assets/images/profile.png";
import homeVideo from "../assets/videos/home-video.mp4";
import housePriceImage from "../assets/images/house_price_dashboard_1781588924241.jpg";
import irisImage from "../assets/images/iris_classifier_dashboard_1781588952509.jpg";
import symptomCheckerImage from "../assets/images/symptom_checker_mockup_1783096655183.jpg";
import wineImage from "../assets/images/wine_quality_dashboard_1781588938539.jpg";

export const defaultProfile = profileImage;
export const defaultVideo = homeVideo;

export const housePriceScreenshot = housePriceImage;
export const wineQualityScreenshot = wineImage;
export const irisClassifierScreenshot = irisImage;
export const symptomCheckerScreenshot = symptomCheckerImage;

// These projects don't currently have local screenshots in the ZIP.
// Keeping empty strings avoids broken imports and keeps layout/content unchanged.
export const codegenaiScreenshot = "";
export const aiChatbotScreenshot = "";
export const thinkChampQuizScreenshot = "";
export const thinkChampGenScreenshot = "";
export const movieVerseScreenshot = "";
export const travelTalesScreenshot = "";

>>>>>>> 6a3934a (Initial updated portfolio project)
export const PROJECT_SLUGS = {
  "AI Health Symptom Checker": "ai_health_symptom_checker",
  "House Price Prediction System": "house_price",
  "Wine Quality Prediction": "wine_quality",
  "Iris Flower Classification": "iris_flower",
  "CodeGenAi & Explainer": "codegenai_explainer",
  "AI Chatbot Web Application": "ai_chatbot",
  "AI Quiz Generator": "ai_quiz_generator",
  "Movie-versa": "movie_versa",
<<<<<<< HEAD
  "Travel-Tales": "travel_tales"
};

// Certificate Slugs mapping
=======
  "Travel-Tales": "travel_tales",
};

>>>>>>> 6a3934a (Initial updated portfolio project)
export const CERTIFICATE_SLUGS = {
  "Foundations of Modern Machine Learning (FMML)": "fmml",
  "Applied Artificial Intelligence: Practical Implementation": "applied_ai",
  "Web Development with HTML, CSS, and JavaScript Internship": "apexplanet",
  "Web Development Internship program": "coincent",
  "SAWit.AI Learnathon Program (Generative AI Completion)": "sawit_ai",
<<<<<<< HEAD
  "JobReady: Employability Skills": "jobready"
};

export interface DetectedAssets {
  profileUrl: string | null;
  videoUrl: string | null;
=======
  "JobReady: Employability Skills": "jobready",
};

export interface DetectedAssets {
  profileUrl: string;
  videoUrl: string;
>>>>>>> 6a3934a (Initial updated portfolio project)
  resumeUrl: string | null;
  projectScreenshots: Record<string, string[]>;
  certificateImages: Record<string, string | null>;
  isScanning: boolean;
}

<<<<<<< HEAD
export function getEmbedVideoUrl(url: any): { type: "direct" | "youtube" | "vimeo"; embedUrl: string } {
  let urlStr = "";
  if (url) {
    if (typeof url === "string") {
      urlStr = url;
    } else if (typeof url === "object") {
      urlStr = url.default || url.src || "";
    }
  }

  if (!urlStr) {
    return { type: "direct", embedUrl: "" };
  }
  
  // YouTube patterns
  const ytRegex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i;
  const ytMatch = urlStr.match(ytRegex);
  if (ytMatch) {
    const videoId = ytMatch[1];
    return {
      type: "youtube",
      embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1&enablejsapi=1`
    };
  }
  
  // Vimeo patterns (avoid matching direct mp4 files under vimeo's external CDN or urls ending in standard video formats)
  const isDirectFile = /\.(mp4|webm|mov|ogg|m4v)(?:\?|$)/i.test(urlStr) || urlStr.includes("/external/");
  if (!isDirectFile) {
    const vimeoRegex = /(?:vimeo\.com\/|player\.vimeo\.com\/video\/)([0-8a-zA-Z._-]+)/i;
    const vimeoMatch = urlStr.match(vimeoRegex);
    if (vimeoMatch) {
      const videoId = vimeoMatch[1];
      if (videoId && videoId.toLowerCase() !== "external") {
        return {
          type: "vimeo",
          embedUrl: `https://player.vimeo.com/video/${videoId}?autoplay=1&loop=1&muted=1&background=1&autoplay=true`
        };
      }
    }
  }
  
  return { type: "direct", embedUrl: urlStr };
}

export function getDirectDriveUrl(url: string | null | undefined, isVideo = false): string | null {
  if (!url || typeof url !== "string") return url || null;
  const trimmed = url.trim();
  
  // Extract file ID from standard Google Drive share links
  const driveRegex = /(?:drive\.google\.com\/(?:file\/d\/|open\?id=)|docs\.google\.com\/(?:file\/d\/|open\?id=))([a-zA-Z0-9_-]+)/i;
  const match = trimmed.match(driveRegex);
  if (match && match[1]) {
    const fileId = match[1];
    
    // For video streams, we MUST usedocs.google.com/uc?export=download as lh3 only hosts static image files.
    if (isVideo || fileId === "1aT36BBrCKUY1pEPm1d0sFljNucPviRTj") {
      return `https://docs.google.com/uc?export=download&id=${fileId}`;
    }
    
    // Using lh3.googleusercontent.com/d/ID is incredibly fast, bypassing CORS, anti-abuse warnings, and download warning prompts.
    // It works perfectly for high-resolution profile pictures!
    return `https://lh3.googleusercontent.com/d/${fileId}`;
  }
  return trimmed;
}

// Fallback high-quality design assets if local files are missing
export const FALLBACK_ASSETS = {
  profileUrl: defaultProfile || "https://lh3.googleusercontent.com/d/1OSLWS1FLOWb3WQRx27_pnlMxtNxz2Ocz",
  videoUrl: defaultVideo,
  localProfileUrl: defaultProfile,
  localVideoUrl: defaultVideo,
  resumeUrl: "#print", // Fallback trigger for print view
};

// Static screenshots map loaded synchronously
export const STATIC_PROJECT_SCREENSHOTS: Record<string, string[]> = {
  "House Price Prediction System": [housePriceScreenshot],
  "Wine Quality Prediction": [wineQualityScreenshot],
  "Iris Flower Classification": [irisClassifierScreenshot],
  "CodeGenAi & Explainer": [codegenaiScreenshot],
  "AI Chatbot Web Application": [aiChatbotScreenshot],
  "AI Quiz Generator": [thinkChampQuizScreenshot, thinkChampGenScreenshot],
  "Movie-versa": [movieVerseScreenshot],
  "Travel-Tales": [travelTalesScreenshot],
  "AI Health Symptom Checker": [symptomCheckerScreenshot]
};

// Dynamic assets are loaded and resolved at the top of the file to support flexible extensions.

export const getLocalProfileImage = () => {
  // Prioritize the local bundled profile image for instant 0ms local load
  return defaultProfile || "https://lh3.googleusercontent.com/d/1OSLWS1FLOWb3WQRx27_pnlMxtNxz2Ocz";
};

export const getLocalVideoUrl = () => {
  // Prioritize local bundled video for 100% reliable local/Vercel streaming (bypasses Google Drive range & CORS limits)
  return defaultVideo;
};

// Sanitize and validate URL inputs
function sanitizeUrl(url: any): string | null {
  if (!url) return null;
  if (typeof url !== "string") return null;
  const trimmed = url.trim();
  if (trimmed === "" || trimmed === "null" || trimmed === "undefined" || trimmed === "#" || trimmed === "null/") {
    return null;
  }
  return trimmed;
}

// Low latency file validity checker
async function fileExists(url: string, expectedMimePrefix?: string): Promise<boolean> {
  try {
    const sanitized = sanitizeUrl(url);
    if (!sanitized) {
      return false;
    }
    const response = await fetch(sanitized, { method: "HEAD" });
    if (!response.ok) return false;
    if (response.status !== 200) return false;
    
    const contentType = response.headers.get("content-type");
    if (!contentType) {
      // In a single-page app host like Vercel, if the content-type is missing on a HEAD request,
      // it's highly likely to be a fallback route for a non-existent file. Returning false is safest.
      return false;
    }
    
    const lowerContentType = contentType.toLowerCase();
    if (lowerContentType.includes("text/html") || lowerContentType.includes("application/xhtml+xml")) {
      return false;
    }
    
    if (expectedMimePrefix && !lowerContentType.includes(expectedMimePrefix.toLowerCase())) {
      return false;
    }
    
    return true;
  } catch (error) {
    return false;
  }
}

export function useAssetDetection() {
  const [assets, setAssets] = useState<DetectedAssets>({
    profileUrl: getDirectDriveUrl(sanitizeUrl(localStorage.getItem("custom_profile_url")) || getLocalProfileImage() || FALLBACK_ASSETS.profileUrl, false),
    videoUrl: getDirectDriveUrl(sanitizeUrl(localStorage.getItem("custom_video_url")) || getLocalVideoUrl() || FALLBACK_ASSETS.videoUrl, true),
    resumeUrl: null,
=======
export function getEmbedVideoUrl(url: string): {
  type: "direct";
  embedUrl: string;
} {
  return {
    type: "direct",
    embedUrl: url,
  };
}

export const FALLBACK_ASSETS = {
  profileUrl: defaultProfile,
  videoUrl: defaultVideo,
  localProfileUrl: defaultProfile,
  localVideoUrl: defaultVideo,
  resumeUrl: "/resume.pdf",
};

export const STATIC_PROJECT_SCREENSHOTS: Record<string, string[]> = {
  "House Price Prediction System": housePriceScreenshot ? [housePriceScreenshot] : [],
  "Wine Quality Prediction": wineQualityScreenshot ? [wineQualityScreenshot] : [],
  "Iris Flower Classification": irisClassifierScreenshot ? [irisClassifierScreenshot] : [],
  "CodeGenAi & Explainer": codegenaiScreenshot ? [codegenaiScreenshot] : [],
  "AI Chatbot Web Application": aiChatbotScreenshot ? [aiChatbotScreenshot] : [],
  "AI Quiz Generator":
    thinkChampQuizScreenshot || thinkChampGenScreenshot
      ? [thinkChampQuizScreenshot, thinkChampGenScreenshot].filter(Boolean)
      : [],
  "Movie-versa": movieVerseScreenshot ? [movieVerseScreenshot] : [],
  "Travel-Tales": travelTalesScreenshot ? [travelTalesScreenshot] : [],
  "AI Health Symptom Checker": symptomCheckerScreenshot ? [symptomCheckerScreenshot] : [],
};

export function useAssetDetection(): DetectedAssets {
  const [assets, setAssets] = useState<DetectedAssets>({
    profileUrl: defaultProfile,
    videoUrl: defaultVideo,
    resumeUrl: "/resume.pdf",
>>>>>>> 6a3934a (Initial updated portfolio project)
    projectScreenshots: STATIC_PROJECT_SCREENSHOTS,
    certificateImages: {},
    isScanning: false,
  });

  useEffect(() => {
<<<<<<< HEAD
    let active = true;

    // Clean up stale or broken Vimeo URLs from local storage to ensure the new working fallback loads
    const storedVid = localStorage.getItem("custom_video_url");
    if (storedVid && (storedVid.includes("371433846") || storedVid.includes("vimeo") || storedVid.includes("external"))) {
      localStorage.removeItem("custom_video_url");
      setAssets(prev => ({ ...prev, videoUrl: FALLBACK_ASSETS.videoUrl }));
    }

    async function scan() {
      // 1. Check IndexedDB first for user-uploaded custom pictures or videos (from UI settings)
      let customProfileBase64: string | null = null;
      let customVideoBase64: string | null = null;

      try {
        const [localProf, localVid] = await Promise.all([
          getLocalMedia("custom_profile").catch(() => null),
          getLocalMedia("custom_video").catch(() => null)
        ]);

        if (localProf && active) {
          customProfileBase64 = sanitizeUrl(localProf);
        }
        if (localVid && active) {
          customVideoBase64 = sanitizeUrl(localVid);
        }
      } catch (e) {
        console.error("IndexedDB profile/video retrieval issue:", e);
      }

      // 2. Probe Options in parallel to ensure 0-delay load speed
      let resolvedResume: string | null = null;
      let resolvedProfile: string | null = null;
      let resolvedVideo: string | null = null;
      
      try {
        const resumeOptions = ["/resume.pdf", "/assets/resume.pdf", "resume.pdf"];
        
        const resumeResults = await Promise.all(
          resumeOptions.map(opt => fileExists(opt, "application/pdf").catch(() => false))
        );
        
        const firstResumeIdx = resumeResults.indexOf(true);
        if (firstResumeIdx !== -1) {
          resolvedResume = resumeOptions[firstResumeIdx];
        }
      } catch (err) {
        console.warn("Could not check local assets paths:", err);
      }

      if (!active) return;

      const pastedProfileUrl = sanitizeUrl(localStorage.getItem("custom_profile_url"));
      const pastedVideoUrl = sanitizeUrl(localStorage.getItem("custom_video_url"));

      // 3. Update State with discovered custom IndexedDB media, static local assets, or local PDF.
      setAssets((prev) => {
        const nextProfileUrl = getDirectDriveUrl(pastedProfileUrl || customProfileBase64 || resolvedProfile || prev.profileUrl || FALLBACK_ASSETS.profileUrl, false);
        const nextVideoUrl = getDirectDriveUrl(pastedVideoUrl || customVideoBase64 || resolvedVideo || prev.videoUrl || FALLBACK_ASSETS.videoUrl, true);
        const nextResumeUrl = resolvedResume || prev.resumeUrl;

        if (
          prev.profileUrl === nextProfileUrl &&
          prev.videoUrl === nextVideoUrl &&
          prev.resumeUrl === nextResumeUrl &&
          prev.isScanning === false
        ) {
          return prev;
        }

        return {
          ...prev,
          profileUrl: nextProfileUrl,
          videoUrl: nextVideoUrl,
          resumeUrl: nextResumeUrl,
          isScanning: false,
        };
      });
    }

    scan();

    return () => {
      active = false;
    };
  }, []);

  return assets;
}
=======
    setAssets({
      profileUrl: defaultProfile,
      videoUrl: defaultVideo,
      resumeUrl: "/resume.pdf",
      projectScreenshots: STATIC_PROJECT_SCREENSHOTS,
      certificateImages: {},
      isScanning: false,
    });
  }, []);

  return assets;
}
>>>>>>> 6a3934a (Initial updated portfolio project)

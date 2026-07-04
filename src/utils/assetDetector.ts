import { useState, useEffect } from "react";
import { getLocalMedia } from "./db";
import defaultProfile from "../assets/images/default_profile_image_1781969359775.jpg";

// Import all static project screenshots so Vite bundles them properly
import housePriceScreenshot from "../assets/images/house_price_dashboard_1781588924241.jpg";
import wineQualityScreenshot from "../assets/images/wine_quality_dashboard_1781588938539.jpg";
import irisClassifierScreenshot from "../assets/images/iris_classifier_dashboard_1781588952509.jpg";
import codegenaiScreenshot from "../assets/images/codegenai_explainer_1781587930430.jpg";
import aiChatbotScreenshot from "../assets/images/ai_chatbot_1781587946547.jpg";
import thinkChampQuizScreenshot from "../assets/images/think_champ_quiz_1781587864651.jpg";
import thinkChampGenScreenshot from "../assets/images/think_champ_generator_1781587881537.jpg";
import movieVerseScreenshot from "../assets/images/movie_verse_1781587898014.jpg";
import travelTalesScreenshot from "../assets/images/travel_tales_1781587914134.jpg";
import symptomCheckerScreenshot from "../assets/images/symptom_checker_mockup_1783096655183.jpg";

// Project Slugs mapping
export const PROJECT_SLUGS = {
  "AI Health Symptom Checker": "ai_health_symptom_checker",
  "House Price Prediction System": "house_price",
  "Wine Quality Prediction": "wine_quality",
  "Iris Flower Classification": "iris_flower",
  "CodeGenAi & Explainer": "codegenai_explainer",
  "AI Chatbot Web Application": "ai_chatbot",
  "AI Quiz Generator": "ai_quiz_generator",
  "Movie-versa": "movie_versa",
  "Travel-Tales": "travel_tales"
};

// Certificate Slugs mapping
export const CERTIFICATE_SLUGS = {
  "Foundations of Modern Machine Learning (FMML)": "fmml",
  "Applied Artificial Intelligence: Practical Implementation": "applied_ai",
  "Web Development with HTML, CSS, and JavaScript Internship": "apexplanet",
  "Web Development Internship program": "coincent",
  "SAWit.AI Learnathon Program (Generative AI Completion)": "sawit_ai",
  "JobReady: Employability Skills": "jobready"
};

export interface DetectedAssets {
  profileUrl: string | null;
  videoUrl: string | null;
  resumeUrl: string | null;
  projectScreenshots: Record<string, string[]>;
  certificateImages: Record<string, string | null>;
  isScanning: boolean;
}

// Fallback high-quality design assets if local files are missing
// 💡 VS CODE TIP FOR YOUR PORTFOLIO:
// 1. To set your profile photo permanently, place your image inside the folder "/src/assets/images/" 
//    and rename it to contain "profile" (e.g. "profile.jpg"), OR replace the asset imported at the top.
// 2. To set your vocal video permanently, place your video (.mp4) inside "/src/assets/images/" 
//    and rename it to contain "video" (e.g. "vocal_video.mp4"). The code will automatically load it!
export const FALLBACK_ASSETS = {
  profileUrl: defaultProfile,
  videoUrl: "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c054273b9e4a3ecee03028fbcc7e7252&profile_id=165&oauth2_token_id=57447761", // Premium dark grid coding b-roll
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

// Vite build-time assets glob discovery mapping - restricted to specific types to prevent FS watcher issues with Windows locks
const localImages = import.meta.glob('../assets/images/*.{jpg,jpeg,png,webp,svg,JPG,JPEG,PNG,WEBP,SVG}', { eager: true, import: 'default' }) as Record<string, string>;
const localVideos = import.meta.glob('../assets/images/*.{mp4,mov,MP4,MOV}', { eager: true, import: 'default' }) as Record<string, string>;

export const getLocalProfileImage = () => {
  const keys = Object.keys(localImages);
  // Matches file names containing 'profile' (e.g. profile.jpg, profile_pic.jpg, profile.jpg.png)
  const foundKey = keys.find(key => {
    const lower = key.toLowerCase();
    const parts = lower.split('/');
    const filename = parts[parts.length - 1];
    return filename.includes('profile');
  });
  if (foundKey) {
    return localImages[foundKey];
  }
  return null;
};

export const getLocalVideoUrl = () => {
  const keys = Object.keys(localVideos);
  // Matches file names containing 'video' (e.g. video.mp4, video.mp4.mp4, profile_video.mp4)
  const foundKey = keys.find(key => {
    const lower = key.toLowerCase();
    const parts = lower.split('/');
    const filename = parts[parts.length - 1];
    return filename.includes('video');
  });
  if (foundKey) {
    return localVideos[foundKey];
  }
  return null;
};

// Low latency file validity checker
async function fileExists(url: string): Promise<boolean> {
  try {
    const response = await fetch(url, { method: "HEAD" });
    if (!response.ok) return false;
    const contentType = response.headers.get("content-type");
    if (contentType && contentType.toLowerCase().includes("text/html")) {
      return false;
    }
    return true;
  } catch (error) {
    return false;
  }
}

export function useAssetDetection() {
  const [assets, setAssets] = useState<DetectedAssets>({
    profileUrl: getLocalProfileImage() || defaultProfile,
    videoUrl: getLocalVideoUrl() || FALLBACK_ASSETS.videoUrl,
    resumeUrl: null,
    projectScreenshots: STATIC_PROJECT_SCREENSHOTS,
    certificateImages: {},
    isScanning: false,
  });

  useEffect(() => {
    let active = true;
    const createdUrls: string[] = [];

    async function scan() {
      // 1. Check IndexedDB first for user-uploaded custom pictures or videos (from UI settings)
      let customProfileBlobUrl: string | null = null;
      let customVideoBlobUrl: string | null = null;

      try {
        const [localProf, localVid] = await Promise.all([
          getLocalMedia("custom_profile").catch(() => null),
          getLocalMedia("custom_video").catch(() => null)
        ]);

        if (localProf && active) {
          customProfileBlobUrl = URL.createObjectURL(localProf);
          createdUrls.push(customProfileBlobUrl);
        }
        if (localVid && active) {
          customVideoBlobUrl = URL.createObjectURL(localVid);
          createdUrls.push(customVideoBlobUrl);
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
        const profileOptions = ["/profile.jpg", "/profile.png", "/my_image.jpeg", "/profile.jpeg"];
        const videoOptions = ["/video.mp4.mp4", "/video.mp4", "/video.mov"];
        
        const [resumeResults, profileResults, videoResults] = await Promise.all([
          Promise.all(resumeOptions.map(opt => fileExists(opt).catch(() => false))),
          Promise.all(profileOptions.map(opt => fileExists(opt).catch(() => false))),
          Promise.all(videoOptions.map(opt => fileExists(opt).catch(() => false)))
        ]);
        
        const firstResumeIdx = resumeResults.indexOf(true);
        if (firstResumeIdx !== -1) {
          resolvedResume = resumeOptions[firstResumeIdx];
        }
        
        const firstProfileIdx = profileResults.indexOf(true);
        if (firstProfileIdx !== -1) {
          resolvedProfile = profileOptions[firstProfileIdx];
        }
        
        const firstVideoIdx = videoResults.indexOf(true);
        if (firstVideoIdx !== -1) {
          resolvedVideo = videoOptions[firstVideoIdx];
        }
      } catch (err) {
        console.warn("Could not check local assets paths:", err);
      }

      if (!active) return;

      // 3. Update State with discovered custom IndexedDB media, static local assets, or local PDF.
      // Notice: we DO NOT run any slow sequential fetch probes for profile & video as they are matched synchronously.
      setAssets((prev) => {
        const nextProfileUrl = resolvedProfile || customProfileBlobUrl || prev.profileUrl;
        const nextVideoUrl = resolvedVideo || customVideoBlobUrl || prev.videoUrl;
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
      createdUrls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  return assets;
}

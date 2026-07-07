import { useState, useEffect } from "react";

// Global cache of successfully preloaded assets to prevent redundant loads across re-renders
const preloadedAssetsCache = new Set<string>();

/**
 * A highly polished custom hook that preloads arrays of image and video source URLs,
 * tracking loading states to prevent visual flickering or layout shifts.
 *
 * @param imageSources - An array of image source URLs to preload.
 * @param videoSources - An optional array of video source URLs to preload.
 * @returns An object containing loading status flags.
 */
export function useImageLoader(
  imageSources: (string | null | undefined)[],
  videoSources?: (string | null | undefined)[]
): {
  isLoaded: boolean;
  imagesLoaded: boolean;
  videosLoaded: boolean;
} {
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [videosLoaded, setVideosLoaded] = useState(videoSources && videoSources.length > 0 ? false : true);

  const validImages = imageSources.filter((src): src is string => typeof src === "string" && src.trim() !== "");
  const validVideos = videoSources?.filter((src): src is string => typeof src === "string" && src.trim() !== "") || [];

  const imagesKey = JSON.stringify(validImages);
  const videosKey = JSON.stringify(validVideos);

  useEffect(() => {
    if (validImages.length === 0) {
      setImagesLoaded(true);
      return;
    }

    let active = true;
    let loadedCount = 0;
    const total = validImages.length;

    const trackLoad = (src: string) => {
      preloadedAssetsCache.add(src);
      loadedCount++;
      if (loadedCount >= total && active) {
        setImagesLoaded(true);
      }
    };

    validImages.forEach((src) => {
      if (preloadedAssetsCache.has(src)) {
        trackLoad(src);
        return;
      }

      const img = new Image();
      img.src = src;

      const handleLoad = () => {
        if (!active) return;
        trackLoad(src);
      };

      const handleError = () => {
        if (!active) return;
        // Count as loaded to gracefully recover and avoid stalling the screen
        trackLoad(src);
      };

      if (img.complete) {
        handleLoad();
      } else {
        img.addEventListener("load", handleLoad);
        img.addEventListener("error", handleError);
      }
    });

    return () => {
      active = false;
    };
  }, [imagesKey]);

  useEffect(() => {
    if (validVideos.length === 0) {
      setVideosLoaded(true);
      return;
    }

    let active = true;
    let loadedCount = 0;
    const total = validVideos.length;

    const trackLoad = (src: string) => {
      preloadedAssetsCache.add(src);
      loadedCount++;
      if (loadedCount >= total && active) {
        setVideosLoaded(true);
      }
    };

    validVideos.forEach((src) => {
      if (preloadedAssetsCache.has(src)) {
        trackLoad(src);
        return;
      }

      const video = document.createElement("video");
      video.src = src;
      video.preload = "auto";
      video.muted = true;
      video.playsInline = true;

      const handleLoad = () => {
        if (!active) return;
        trackLoad(src);
      };

      const handleError = () => {
        if (!active) return;
        trackLoad(src);
      };

      // Since canplaythrough might be delayed by slow networks, we trigger success on either canplay or loadedmetadata
      video.addEventListener("canplay", handleLoad, { once: true });
      video.addEventListener("canplaythrough", handleLoad, { once: true });
      video.addEventListener("loadedmetadata", handleLoad, { once: true });
      video.addEventListener("error", handleError, { once: true });

      video.load();
    });

    return () => {
      active = false;
    };
  }, [videosKey]);

  const isLoaded = imagesLoaded && videosLoaded;

  return { isLoaded, imagesLoaded, videosLoaded };
}


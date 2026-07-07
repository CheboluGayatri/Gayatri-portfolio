import { useState, useEffect } from "react";

// Global cache of successfully preloaded images to prevent redundant loads
const preloadedImagesCache = new Set<string>();

/**
 * A highly polished custom hook that preloads an array of image source URLs,
 * tracking loading states for each to prevent visual flickering or layout shifts.
 *
 * @param sources - An array of image source URLs to preload.
 * @returns An object containing:
 *  - isLoaded: true only when all sources are fully loaded (or errored/completed)
 *  - loadedStates: a record mapping each URL to its load status boolean
 */
export function useImageLoader(sources: (string | null | undefined)[]): {
  isLoaded: boolean;
  loadedStates: Record<string, boolean>;
} {
  // Filter out invalid sources for clean tracking
  const validSources = sources.filter((src): src is string => typeof src === "string" && src.trim() !== "");
  const sourcesKey = JSON.stringify(validSources);

  const [loadedStates, setLoadedStates] = useState<Record<string, boolean>>(() => {
    const initial: Record<string, boolean> = {};
    validSources.forEach((src) => {
      initial[src] = preloadedImagesCache.has(src);
    });
    return initial;
  });

  useEffect(() => {
    if (validSources.length === 0) {
      return;
    }

    let active = true;

    // Synchronize initial cache states
    setLoadedStates(() => {
      const current: Record<string, boolean> = {};
      validSources.forEach((src) => {
        current[src] = preloadedImagesCache.has(src);
      });
      return current;
    });

    validSources.forEach((src) => {
      if (preloadedImagesCache.has(src)) {
        return;
      }

      const img = new Image();
      img.src = src;

      const handleLoad = () => {
        if (!active) return;
        preloadedImagesCache.add(src);
        setLoadedStates((prev) => ({
          ...prev,
          [src]: true,
        }));
      };

      const handleError = () => {
        if (!active) return;
        // Resolve as true to gracefully allow browser fallback/alt rendering
        preloadedImagesCache.add(src);
        setLoadedStates((prev) => ({
          ...prev,
          [src]: true,
        }));
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
  }, [sourcesKey]);

  // If there are no valid sources, consider it loaded. Otherwise, verify all are loaded.
  const isLoaded = validSources.length === 0 || validSources.every((src) => loadedStates[src] === true);

  return { isLoaded, loadedStates };
}

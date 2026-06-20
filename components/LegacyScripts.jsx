"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { LEGACY_SCRIPTS } from "@/lib/legacyAssets";
import { initLegacyUi } from "@/lib/initLegacyUi";

function waitForStylesheets() {
  const links = Array.from(
    document.querySelectorAll('link[rel="stylesheet"]')
  );

  const stylesheetPromises = links.map(
    (link) =>
      new Promise((resolve) => {
        if (link.sheet) {
          resolve();
          return;
        }
        link.addEventListener("load", resolve, { once: true });
        link.addEventListener("error", resolve, { once: true });
      })
  );

  const timeout = new Promise((resolve) => {
    window.setTimeout(resolve, 4000);
  });

  return Promise.race([Promise.all(stylesheetPromises), timeout]);
}

function loadScript(src) {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = false;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Failed to load ${src}`));
    document.body.appendChild(script);
  });
}

let scriptsLoadPromise = null;

function ensureLegacyScriptsLoaded() {
  if (!scriptsLoadPromise) {
    scriptsLoadPromise = (async () => {
      await waitForStylesheets();
      document.documentElement.classList.add("styles-ready");

      for (const src of LEGACY_SCRIPTS) {
        await loadScript(src);
      }
    })().catch((error) => {
      console.error("Legacy asset bootstrap failed:", error);
      document.documentElement.classList.add("styles-ready");
    });
  }

  return scriptsLoadPromise;
}

export default function LegacyScripts() {
  const pathname = usePathname();
  const initTimerRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapPage() {
      await ensureLegacyScriptsLoaded();
      if (cancelled) return;

      initTimerRef.current = window.setTimeout(() => {
        initLegacyUi();
      }, 50);
    }

    bootstrapPage();

    return () => {
      cancelled = true;
      if (initTimerRef.current) {
        window.clearTimeout(initTimerRef.current);
      }
    };
  }, [pathname]);

  return null;
}

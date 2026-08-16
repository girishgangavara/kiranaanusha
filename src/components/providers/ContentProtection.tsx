"use client";

import { useEffect } from "react";

/**
 * Casual-copying deterrents.
 *
 * HONEST SCOPE: this stops a guest who right-clicks a photo or presses F12.
 * It cannot stop anyone determined — DevTools opens from the browser menu,
 * `curl` and "Save Page As" never run this code, and disabling JavaScript
 * removes it entirely. Real protection is access control (see README), not
 * anything that runs in the visitor's own browser.
 *
 * Deliberately NOT blocked: keyboard navigation, focus outlines, and text
 * selection inside form fields — breaking those would lock out guests using
 * screen readers or keyboards for the sake of a barrier that does not hold.
 */
export function ContentProtection() {
  useEffect(() => {
    const blockContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const blockKeys = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      const ctrlish = e.ctrlKey || e.metaKey;

      // F12 — devtools
      if (key === "f12") {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+Shift+I / J / C — devtools, console, inspector
      if (ctrlish && e.shiftKey && ["i", "j", "c"].includes(key)) {
        e.preventDefault();
        return;
      }
      // Ctrl/Cmd+U (view source), +S (save page), +P (print to PDF)
      if (ctrlish && ["u", "s", "p"].includes(key)) {
        e.preventDefault();
      }
    };

    const blockDrag = (e: DragEvent) => {
      if ((e.target as HTMLElement)?.tagName === "IMG") e.preventDefault();
    };

    document.addEventListener("contextmenu", blockContextMenu);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("dragstart", blockDrag);

    return () => {
      document.removeEventListener("contextmenu", blockContextMenu);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("dragstart", blockDrag);
    };
  }, []);

  return null;
}

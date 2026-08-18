"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import { weddingConfig } from "@/config/wedding";
import { weddingContent, type Content, type Language } from "@/config/content";

interface InvitationState {
  /** False until the guest opens the envelope; the page is locked until then. */
  opened: boolean;
  open: () => void;
  language: Language;
  setLanguage: (next: Language) => void;
  t: Content;
  musicOn: boolean;
  toggleMusic: () => void;
  musicAvailable: boolean;
}

const InvitationContext = createContext<InvitationState | null>(null);

const LANG_KEY = "wedding:lang";
const MUTE_KEY = "wedding:muted";

/**
 * Language lives in a tiny external store rather than in an effect.
 *
 * `useSyncExternalStore` renders the server snapshot ("en") during hydration
 * and then reconciles to the stored choice, which is exactly the behaviour we
 * want: no hydration mismatch, and no setState-inside-an-effect.
 */
const languageStore = {
  listeners: new Set<() => void>(),
  cached: null as Language | null,

  read(): Language {
    if (this.cached) return this.cached;
    let value: Language = "en";
    try {
      const saved = window.localStorage.getItem(LANG_KEY);
      if (saved === "en" || saved === "kn") value = saved;
    } catch {
      /* private mode - keep the default */
    }
    this.cached = value;
    return value;
  },

  write(next: Language) {
    this.cached = next;
    try {
      window.localStorage.setItem(LANG_KEY, next);
    } catch {
      /* ignore */
    }
    this.listeners.forEach((listener) => listener());
  },

  subscribe(listener: () => void) {
    languageStore.listeners.add(listener);
    return () => {
      languageStore.listeners.delete(listener);
    };
  },
};

const getLanguageSnapshot = () => languageStore.read();
const getServerLanguageSnapshot = (): Language => "en";

/** Did the guest mute deliberately? Only then do we leave the music off. */
function isMuted(): boolean {
  try {
    return window.sessionStorage.getItem(MUTE_KEY) === "true";
  } catch {
    return false;
  }
}

export function InvitationProvider({ children }: { children: ReactNode }) {
  const [opened, setOpened] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const [musicAvailable, setMusicAvailable] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const language = useSyncExternalStore(
    languageStore.subscribe,
    getLanguageSnapshot,
    getServerLanguageSnapshot,
  );

  /* Keep <html lang> in step so screen readers switch voice correctly. */
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  /* Lock the page behind the sealed envelope. */
  useEffect(() => {
    document.body.dataset.sealed = opened ? "false" : "true";
  }, [opened]);

  const setLanguage = useCallback((next: Language) => {
    languageStore.write(next);
  }, []);

  /* Build the audio element once, only if music is enabled in config. */
  useEffect(() => {
    if (!weddingConfig.music.enabled) return;
    const audio = new Audio(weddingConfig.music.source);
    audio.loop = true;
    audio.volume = 0.45;
    audio.preload = "none";
    const onReady = () => setMusicAvailable(true);
    // If the file has not been added yet the control simply stays inert.
    audio.addEventListener("canplaythrough", onReady);
    audio.addEventListener("loadeddata", onReady);

    /* The browser can start and stop the audio on its own - a call comes in,
       the screen locks, another app takes the audio focus. Mirror whatever it
       actually did so the floating control never lies about the state. */
    const onPlay = () => {
      setMusicOn(true);
      setMusicAvailable(true);
    };
    const onPause = () => setMusicOn(false);
    /* `loop` should make this unreachable; restart anyway if a browser drops it. */
    const onEnded = () => {
      audio.currentTime = 0;
      void audio.play().catch(() => {});
    };
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onEnded);

    audioRef.current = audio;
    return () => {
      audio.removeEventListener("canplaythrough", onReady);
      audio.removeEventListener("loadeddata", onReady);
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onEnded);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  const playIfWanted = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.preload = "auto";
    void audio
      .play()
      .then(() => {
        setMusicOn(true);
        setMusicAvailable(true);
      })
      .catch(() => {
        /* Browser blocked it, or the file is absent - leave music off. */
        setMusicOn(false);
      });
  }, []);

  /* Opening the envelope is the user gesture that lets audio start. */
  const open = useCallback(() => {
    setOpened(true);
    if (!isMuted()) playIfWanted();
  }, [playIfWanted]);

  /**
   * Keep the music running for as long as the invitation is open.
   *
   * Mobile browsers pause the audio whenever the page loses the foreground -
   * the guest locks the phone, switches to WhatsApp, takes a call - and they
   * never resume it by themselves. Pick it back up on every sign of the guest
   * returning, unless they muted deliberately. A tap is the last resort: iOS
   * sometimes refuses a silent resume but always allows one on a gesture.
   */
  useEffect(() => {
    if (!weddingConfig.music.enabled || !opened) return;
    const resume = () => {
      const audio = audioRef.current;
      if (!audio || !audio.paused || document.hidden || isMuted()) return;
      void audio.play().catch(() => {
        /* Still blocked - the next gesture gets another chance. */
      });
    };
    document.addEventListener("visibilitychange", resume);
    window.addEventListener("focus", resume);
    window.addEventListener("pageshow", resume);
    window.addEventListener("pointerdown", resume);
    return () => {
      document.removeEventListener("visibilitychange", resume);
      window.removeEventListener("focus", resume);
      window.removeEventListener("pageshow", resume);
      window.removeEventListener("pointerdown", resume);
    };
  }, [opened]);

  const toggleMusic = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (musicOn) {
      audio.pause();
      setMusicOn(false);
      try {
        window.sessionStorage.setItem(MUTE_KEY, "true");
      } catch {
        /* ignore */
      }
    } else {
      try {
        window.sessionStorage.setItem(MUTE_KEY, "false");
      } catch {
        /* ignore */
      }
      playIfWanted();
    }
  }, [musicOn, playIfWanted]);

  const value = useMemo<InvitationState>(
    () => ({
      opened,
      open,
      language,
      setLanguage,
      t: weddingContent[language],
      musicOn,
      toggleMusic,
      musicAvailable: musicAvailable || musicOn,
    }),
    [opened, open, language, setLanguage, musicOn, toggleMusic, musicAvailable],
  );

  return <InvitationContext.Provider value={value}>{children}</InvitationContext.Provider>;
}

export function useInvitation(): InvitationState {
  const ctx = useContext(InvitationContext);
  if (!ctx) throw new Error("useInvitation must be used inside InvitationProvider");
  return ctx;
}

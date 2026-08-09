"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { sound } from "@/lib/sound";
import { Magnetic } from "./magicui/magnetic";

export function SoundToggle() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    if (typeof localStorage !== "undefined") {
      const saved = localStorage.getItem("zexa-sound-muted");
      if (saved === "true") {
        setMuted(true);
        sound.setMuted(true);
      }
    }
  }, []);

  const toggleSound = () => {
    const nextMuted = !muted;
    setMuted(nextMuted);
    sound.setMuted(nextMuted);
    if (!nextMuted) {
      sound.playClick();
    }
  };

  return (
    <Magnetic strength={0.25}>
      <button
        onClick={toggleSound}
        className="p-2.5 rounded-full bg-white/5 border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors flex items-center justify-center shadow-md"
        aria-label={muted ? "Unmute sound effects" : "Mute sound effects"}
        title={muted ? "Unmute Sound Micro-Feedback" : "Mute Sound Micro-Feedback"}
        data-cursor="SOUND"
      >
        {muted ? (
          <VolumeX className="w-4 h-4 text-neutral-400" />
        ) : (
          <Volume2 className="w-4 h-4 text-[#8FAF9A]" />
        )}
      </button>
    </Magnetic>
  );
}

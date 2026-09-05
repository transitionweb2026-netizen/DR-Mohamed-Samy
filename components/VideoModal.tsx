"use client";

import { useEffect } from "react";

export type OpenVideo = { title: string; videoUrl: string; loadingText: string };

// Shared "play this video" popup - used anywhere a video-shaped card is
// clicked (Videos page grid, Home's Latest Videos, About's doctor intro
// video). Plays the real uploaded file if one exists; otherwise shows the
// same "not uploaded yet" message every video slot already had, so a
// missing video never looks broken.
export default function VideoModal({ video, onClose }: { video: OpenVideo | null; onClose: () => void }) {
  useEffect(() => {
    document.body.style.overflow = video ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [video]);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 bg-on-background/80 backdrop-blur-sm transition-opacity duration-300 ${
        video ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      <div
        className={`glass-card w-full max-w-4xl rounded-3xl p-2 relative shadow-2xl transition-all duration-300 ${
          video ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        <button
          className="absolute -top-4 -end-4 w-10 h-10 bg-white rounded-full flex items-center justify-center text-primary shadow-lg hover:scale-110 transition-transform z-10"
          onClick={onClose}
          type="button"
        >
          <span className="material-symbols-outlined">close</span>
        </button>
        <div className="w-full aspect-video bg-black rounded-2xl flex items-center justify-center overflow-hidden">
          {video?.videoUrl ? (
            <video autoPlay className="w-full h-full" controls key={video.videoUrl} src={video.videoUrl} />
          ) : (
            <span className="text-white/50 font-body-md">{video?.loadingText}</span>
          )}
        </div>
      </div>
    </div>
  );
}

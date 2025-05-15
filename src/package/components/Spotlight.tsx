import { useNextChatStore } from "@/store/useNextChatStore";
import React, { useEffect, useState, useRef } from "react";
import { X } from "lucide-react";

export default function Spotlight({
  spotlight_url,
  setSpotlightUrl,
}: {
  spotlight_url: string;
  setSpotlightUrl: (url: string) => void;
}) {
  const { nextChat } = useNextChatStore();
  const [spotlightUrl, setSpotlightUrlState] = useState(spotlight_url);
  const { setCurrentlySpotlight } = useNextChatStore();
  const [clickCount, setClickCount] = useState(0);
  const clickTimer = useRef<NodeJS.Timeout | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    setSpotlightUrlState(spotlight_url);
  }, [spotlight_url]);

  const handleClose = () => {
    setCurrentlySpotlight(false);
    setSpotlightUrl("");
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    // Only close if clicking the backdrop, not the content
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  const handleImageDoubleClick = () => {
    setClickCount((prev) => {
      if (prev === 0) {
        // Start timer for double click
        if (clickTimer.current) clearTimeout(clickTimer.current);
        clickTimer.current = setTimeout(() => {
          setClickCount(0);
        }, 300);
        return 1;
      } else {
        // Double click detected
        if (clickTimer.current) clearTimeout(clickTimer.current);
        handleClose();
        return 0;
      }
    });
  };

  if (!nextChat?.currently_spotlight) {
    return null;
  }
  const isVideo = spotlightUrl.match(/\.(mp4|webm|ogg|MP4|WEBM|OGG)$/i);

  return (
    <div 
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-lg shadow-lg p-4">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          <X size={36} />
        </button>
        {isVideo ? (
          <video
            ref={videoRef}
            src={spotlightUrl}
            controls={true}
            autoPlay
            className="max-w-full max-h-full rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <img
            src={spotlightUrl}
            alt="Spotlight"
            className="max-w-full max-h-full rounded-lg"
            onClick={handleImageDoubleClick}
          />
        )}
      </div>
    </div>
  );
}

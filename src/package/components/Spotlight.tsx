import { useNextChatStore } from "@/store/useNextChatStore";
import React, { useEffect, useState } from "react";

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

  useEffect(() => {
    setSpotlightUrlState(spotlight_url);
  }, [spotlight_url]);

  const handleClose = () => {
    setCurrentlySpotlight(false);
    setSpotlightUrl("");
  };

  if (!nextChat?.currently_spotlight) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
        <img
          src={spotlightUrl}
          alt="Spotlight"
          className="max-w-full max-h-full rounded-lg"
        />
      </div>
    </div>
  );
}

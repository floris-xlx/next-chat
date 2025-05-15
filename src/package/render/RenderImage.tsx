import { useState } from "react";
import Link from "next/link";
import { identifyUrlType } from "@/package/utils/utils";
import { useNextChatStore } from "@/store/useNextChatStore";

export function renderImage(urls: string[] | undefined) {
  if (!Array.isArray(urls)) return null;

  const contentStyles = {
    maxWidth: "420px",
    maxHeight: "420px",
    objectFit: "contain",
    paddingTop: "10px",
    borderRadius: "6px",
  };

  return urls.map((url, index) => {
    const item = identifyUrlType(url);

    if (item.type === "image") {
      return (
        <ImageWithLightbox
          key={index}
          url={item.url}
          contentStyles={contentStyles}
        />
      );
    } else if (item.type === "video") {
      return (
        <VideoWithLightbox
          key={index}
          url={item.url}
          contentStyles={contentStyles}
        />
      );
    } else {
      return (
        <div key={index} className="flex">
          <Link
            target={"_blank"}
            href={url}
            className="text-blue-500 underline text-[14px]"
          >
            {url}
          </Link>
        </div>
      );
    }
  });
}

function ImageWithLightbox({
  url,
  contentStyles,
}: {
  url: string;
  contentStyles: any;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { nextChat, setSpotlightUrl, setCurrentlySpotlight } =
    useNextChatStore();

  const toggleFullscreen = () => {
    setCurrentlySpotlight(true);
    setSpotlightUrl(url);
  };

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center cursor-pointer"
        onClick={toggleFullscreen}
      >
        <img
          src={url}
          alt="fullscreen image"
          className="max-w-[90vw] max-h-[90vh] object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex">
      <img
        src={url}
        alt="image"
        className="rounded-md cursor-pointer"
        onClick={toggleFullscreen}
        style={{
          maxWidth: contentStyles.maxWidth,
          maxHeight: contentStyles.maxHeight,
          objectFit: contentStyles.objectFit as
            | "fill"
            | "contain"
            | "cover"
            | "none"
            | "scale-down",
          paddingTop: contentStyles.paddingTop,
          borderRadius: contentStyles.borderRadius,
        }}
      />
    </div>
  );
}

function VideoWithLightbox({
  url,
  contentStyles,
}: {
  url: string;
  contentStyles: any;
}) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (isFullscreen) {
    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
        onClick={toggleFullscreen}
      >
        <div onClick={(e) => e.stopPropagation()}>
          <video
            src={url}
            controls={false}
            autoPlay={false}
            className="max-w-[90vw] max-h-[90vh]"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex">
      <video
        src={url}
        controls={false}
        muted
        className="rounded-md cursor-pointer"
        onClick={toggleFullscreen}
        style={{
          maxWidth: contentStyles.maxWidth,
          maxHeight: contentStyles.maxHeight,
          objectFit: contentStyles.objectFit as
            | "fill"
            | "contain"
            | "cover"
            | "none"
            | "scale-down",
          paddingTop: contentStyles.paddingTop,
          borderRadius: contentStyles.borderRadius,
        }}
      />
    </div>
  );
}

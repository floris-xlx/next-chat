import React, { FC } from "react";
import Link from "next/link";
import { identifyUrlType } from "@/package/utils/utils";

export function RenderImage(urls: string[] | undefined) {
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
        <div className="flex" key={index}>
          <img
            key={index}
            src={url}
            alt="image"
            className="rounded-md cursor-pointer"
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
    } else if (item.type === "video") {
      return (
        <div className="flex" key={index}>
          <video
            src={url}
            controls={false}
            muted
            className="rounded-md cursor-pointer"
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

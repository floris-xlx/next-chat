import Link from "next/link";
import { identifyUrlType } from "@/package/utils/utils";

export function renderImage(
  urls: string[] | undefined
) {
  if (!Array.isArray(urls)) return null;

  const contentStyles = {
    maxWidth: "250px",
    maxHeight: "200px",
    objectFit: "contain",
    paddingTop: "10px",
    borderRadius: "6px",
  };

  const objectFitTypes = ["fill", "contain", "cover", "none", "scale-down"];

  return urls.map((url, index) => {
    const item = identifyUrlType(url);
    
    if (item.type === "image") {
      return (
        <div key={index} className="flex">
          <img
            src={item.url}
            alt="image"
            className="rounded-md"
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
        <div key={index} className="flex">
          <video
            src={item.url}
            controls
            muted
            className="rounded-md"
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

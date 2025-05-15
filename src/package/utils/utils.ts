export function countCharacters(text: string): number {
  if (!text) return 0;

  return text.length;
}

export function extractUrls(text: string): string[] {
  if (!text) return [];

  const urlPattern = /http:\/\/[^\s/$.?#].[^\s]*|https:\/\/[^\s/$.?#].[^\s]*/g;
  const urls = text.match(urlPattern);

  return urls ? urls : [];
}

export function isImageUrl(url: string): boolean {
  if (!url) return false;

  return url.match(/\.(jpeg|jpg|gif|png|PNG|JPEG|JPG|GIF|WEBM|WEBP|webm|webp)$/) != null;
}

export function isVideoUrl(url: string): boolean {
  if (!url) return false;

  return url.match(/\.(avi|mp4|mpeg4|wmv|AVI|MP4|MPEG4|WMV)$/) != null;
}

export function isPdfUrl(url: string): boolean {
  if (!url) return false;

  return url.match(/\.(pdf)$/) != null;
}

export function getHostname(url: string): string {
  if (!url) return "";

  const urlObj = new URL(url);

  return urlObj.hostname;
}

export function identifyUrlType(url: string): {
  url: string;
  type: string;
  safe: string;
} {
  if (!url) return { url: "", type: "unknown", safe: "unknown" };

  let type = "unknown";
  const safe = "unknown";

  if (isImageUrl(url)) type = "image";
  else if (isVideoUrl(url)) type = "video";
  else if (isPdfUrl(url)) type = "pdf";
  else {
    const hostname = getHostname(url);
    if (hostname.includes("tradingview.com")) {
      type = "tradingview";
    }
  }

  return { url, type, safe };
}

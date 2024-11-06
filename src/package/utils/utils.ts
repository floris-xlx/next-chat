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
    return url.match(/\.(jpeg|jpg|gif|png|webm|webp)$/) != null;
}

export function isVideoUrl(url: string): boolean {
    return url.match(/\.(avi|mp4|mpeg4|wmv)$/) != null;
}

export function isPdfUrl(url: string): boolean {
    return url.match(/\.(pdf)$/) != null;
}

export function identifyUrlType(url: string): { url: string, type: string, safe: string } {
    let type = 'unknown';
    const safe = 'unknown';

    if (isImageUrl(url)) type = 'image';
    else if (isVideoUrl(url)) type = 'video';
    else if (isPdfUrl(url)) type = 'pdf';

    return { url, type, safe };
}
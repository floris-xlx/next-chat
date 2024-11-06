import { extractUrls } from '@/package/utils/utils';


export function removeUrls(text: string): string {
    if (!text) return '';

    const urls = extractUrls(text);
    let cleanedText = text;

    urls.forEach(url => {
        cleanedText = cleanedText.replace(url, '');
    });

    return cleanedText.trim();
}

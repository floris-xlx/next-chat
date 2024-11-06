import { extractUrls } from '@/package/utils/utils';

export function renderImage(text: string) {
    const urls = extractUrls(text);
    if (urls.length === 0) return null;

    return urls.map((url, index) => {
        return (
            <div key={index} className='flex justify-center'>
                <img
                    src={url}
                    alt='image'
                    className='max-w-14 max-h-14 object-contain'
                />
            </div>
        );
    });
}
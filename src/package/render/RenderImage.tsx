
import Link from 'next/link';

import { transformTradingViewUrl } from '@/package/utils/tradingview-url';

export function renderImage(
    urls: {
        url: string,
        type: string,
        safe: string
    }[] | undefined) {

    if (!Array.isArray(urls)) return null;

    console.log('urls', urls);

    const contentStyles = {
        maxWidth: '250px',
        maxHeight: '200px',
        objectFit: 'contain',
        paddingTop: '10px',
        borderRadius: '6px',
    };

    const contentChartStyles = {
        maxWidth: '450px',
        maxHeight: '450px',
        objectFit: 'contain',
        paddingTop: '10px',
        borderRadius: '6px',
    };


    const objectFitTypes = ['fill', 'contain', 'cover', 'none', 'scale-down'];
    const tradingviewUrlImage = urls.map(item => transformTradingViewUrl(item.url));


    return urls.map((item, index) => {
        if (item && item.type === 'image') {
            return (
                <div key={index} className='flex'>
                    <img
                        src={item.url}
                        alt='image'
                        className='rounded-md'
                        style={{
                            maxWidth: contentStyles.maxWidth,
                            maxHeight: contentStyles.maxHeight,
                            objectFit: contentStyles.objectFit as 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
                            paddingTop: contentStyles.paddingTop,
                            borderRadius: contentStyles.borderRadius,
                        }}
                    />
                </div>
            );

        } else if (item && item.type === 'video') {
            return (
                <div key={index} className='flex'>
                    <video
                        src={item.url}
                        controls
                        muted
                        className='rounded-md'
                        style={{
                            maxWidth: contentStyles.maxWidth,
                            maxHeight: contentStyles.maxHeight,
                            objectFit: contentStyles.objectFit as 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
                            paddingTop: contentStyles.paddingTop,
                            borderRadius: contentStyles.borderRadius,
                        }}
                    />
                </div>
            );

        } else if (item && item.type === 'tradingview') {
            const urlImage = tradingviewUrlImage[index];
            return (
                <div key={index} className='flex rounded-md'>
                    <img
                        src={urlImage}
                        title={'tradingview-chart-image'}
                        className='rounded-md'
                        style={{
                            maxWidth: contentChartStyles.maxWidth,
                            maxHeight: contentChartStyles.maxHeight,
                            objectFit: contentChartStyles.objectFit as 'fill' | 'contain' | 'cover' | 'none' | 'scale-down',
                            paddingTop: contentChartStyles.paddingTop,
                            borderRadius: contentChartStyles.borderRadius,
                        }}
                    />
                </div>
            );






        } else if (item && item.type === 'unknown') {
            return (
                <div key={index} className='flex'>
                    <Link
                        target={'_blank'}
                        href={item.url}
                        className='text-blue-500 underline text-[14px]'
                    >
                        {item.url}
                    </Link>
                </div>
            );
        }



        return null;
    });
}
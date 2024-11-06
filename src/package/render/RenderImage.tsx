
export function renderImage(
    urls: {
        url: string,
        type: string,
        safe: string
    }[] | undefined) {

    if (!Array.isArray(urls)) return null;

    console.log('urls', urls);

    const contentStyles = {
        maxWidth: '120px',
        maxHeight: '120px',
        objectFit: 'contain',
        paddingTop: '10px',
        borderRadius: '6px',
    };
    const objectFitTypes = ['fill', 'contain', 'cover', 'none', 'scale-down'];

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
        }
        return null;
    });
}
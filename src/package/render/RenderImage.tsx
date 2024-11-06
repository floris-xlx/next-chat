
export function renderImage(urls: { url: string, type: string, safe: string }[] | undefined) {
    if (!Array.isArray(urls)) return null;

    console.log('urls', urls);


    return urls.map((item, index) => {
        if (item && item.type === 'image') {
            return (
                <div key={index} className='flex  '>
                    <img
                        src={item.url}
                        alt='image'
                        className='rounded-md'
                        style={{
                            maxWidth: '120px',
                            maxHeight: '120px',
                            objectFit: 'contain',
                            paddingTop: '10px',
                        }}
                    />
                </div>
            );
        }
        return null;
    });
}
import React, { useEffect } from 'react';
import { InformationIcon } from '@/components/icon' ;

const Error = ({
    content = 'Error message',
    setIsError,
    isError = false,
    height = 25,
    timerAmount = 4000
}) => {

    useEffect(() => {
        if (isError) {
            const timer = setTimeout(() => {
                setIsError(false);
            }, timerAmount);
            return () => clearTimeout(timer);
        }
    }, [isError, setIsError]);

    return (
        <div
            style={{
                height: isError ? height : 0,
                overflow: 'hidden',
                transition: 'height 0.2s ease',
            }}
        >
            <div
                className='flex flex-row gap-x-2 text-red-500 items-center max-w-[350px]  mt-[7px] '
            >
                <InformationIcon className='w-[18px] h-[18px] antialiased' />    
                <p className='text-sm select-none font-sm text-red-500'>
                    {content}
                </p>
            </div>
        </div>
    );
}

export default Error;
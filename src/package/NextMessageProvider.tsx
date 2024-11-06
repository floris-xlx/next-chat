'use client';


// ui
import React, { ReactNode, useEffect, useState, Fragment } from 'react'


import {
    MessageBox,
    MessageBoxProps,
    MessageBoxStylingProps
} from '@/package/NextMessage'

import { Input } from '@/components/ui/input'

import { useUserStore } from '@/store/useUserStore'

export default function NextMessageProvider(children: ReactNode) {


    const thread_id = 'demo'
    const domain = 'next-chat'

    const [scrollPos, setScrollPos] = useState(0);

    return (
        <div>

            {children}




        </div>
    );
}

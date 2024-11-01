'use client';


// ui
import React, { ReactNode, useEffect } from 'react'


import {
  MessageBox,
  MessageBoxProps,
  MessageBoxStylingProps
} from '@/package/NextMessage'

import { useUserStore } from '@/store/useUserStore'

export default function Home() {
  const {
    setProfilePicture,
    setUsername,
    setId,
    setEmail
  } = useUserStore()

  const profile_picture = 'https://xylex.ams3.cdn.digitaloceanspaces.com/profilePics/floris.png'
  const username = 'floris'
  const id = 'floris-demo-nextchat'
  const email = 'floris@xylex.ai'

  useEffect(() => {
    setProfilePicture(profile_picture)
    setUsername(username)
    setId(id)
    setEmail(email)
  }, [])


  const thread_id = 'demo'
  const domain = 'next-chat'


  return (
    <div className='p-4 flex flex-row justify-center w-full translate-y-[50%] '>
      <MessageBox
        thread_id={thread_id}
        domain={domain}

      />
    </div>
  );
}

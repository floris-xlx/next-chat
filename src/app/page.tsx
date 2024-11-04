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

export default function Home() {
  const {
    setProfilePicture,
    setUsername,
    setId,
    setEmail
  } = useUserStore()

  const [profilePicture, setProfilePictureState] = useState('https://xylex.ams3.cdn.digitaloceanspaces.com/profilePics/floris.png');
  const [username, setUsernameState] = useState('floris');
  const [userId, setUserIdState] = useState('floris-demo-nextchat');
  const [email, setEmailState] = useState('floris@xylex.ai');

  useEffect(() => {
    setProfilePicture(profilePicture)
    setUsername(username)
    setId(userId)
    setEmail(email)
  }, [profilePicture, username, userId, email])


  const thread_id = 'demo'
  const domain = 'next-chat'


  return (
    <Fragment>
      <div className='p-4 flex flex-row justify-center w-full translate-y-[10%] sm:translate-y-[50%] '>
        <MessageBox
          thread_id={thread_id}
          domain={domain}
          style={{
            width: '600px',
            height: '400px'
          }}
        />

      </div>


      <div className='max-w-[250px] px-8 gap-4 flex flex-col translate-y-[75%] sm:translate-y-2'>
        <Input
          id={'set-username-demo-input'}
          value={username}
          onChange={(e) => setUsernameState(e.target.value)}
          variant={'default'}
          label={'Username'}
          size={'sm'}
          placeholder={'Enter your username'}
          className='bg-background-foreground text-[16px]'
        />

        <Input
          id={'set-pfp-demo-input'}
          value={profilePicture}
          onChange={(e) => setProfilePictureState(e.target.value)}
          variant={'default'}
          label={'Profile Picture URL'}
          size={'sm'}
          placeholder={'Enter your pfp URL'}
          className='bg-background-foreground text-[16px]'
        />
        <Input
          id={'set-email-demo-input'}
          value={email}
          onChange={(e) => setEmailState(e.target.value)}
          variant={'default'}
          label={'Email'}
          size={'sm'}
          placeholder={'Enter your email'}
          className='bg-background-foreground text-[16px]'
        />

        <Input
          id={'set-userid-demo-input'}
          value={userId}
          onChange={(e) => setUserIdState(e.target.value)}
          variant={'default'}
          label={'User ID'}
          size={'sm'}
          placeholder={'Enter your user ID'}
          className='bg-background-foreground text-[16px]'
        />
      </div>
    </Fragment>
  );
}

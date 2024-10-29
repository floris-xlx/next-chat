'use client';


// ui
import React, { ReactNode, useEffect } from 'react'
import Footer from '@/app/components/Footer'

import { MessageBox } from '@/package/NextMessage'
import { useUserStore } from '@/store/useUserStore'

export default function Home() {
  const {
    user,
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

  console.log('user', user)


  // const RenderProvider = ({ children }: { children?: ReactNode }) => {
  //   return (
  //     <div >
  //       <main className="flex flex-col  row-start-2 items-center sm:items-start">
  //         {children}
  //       </main>
  //       <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
  //         <Footer />
  //       </footer>
  //     </div>
  //   );
  // };


  const thread_id = 'demo'
  const domain = 'demo'

  return (
    <div className='p-4'>
      <MessageBox
        thread_id={thread_id}
        domain={domain}
      />
    </div>
  );
}

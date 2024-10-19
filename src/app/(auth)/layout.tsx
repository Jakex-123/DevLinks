import Navbar from '@/components/Navbar'
import React from 'react'

const layout = ({children}:{
    children: React.ReactNode;
  }) => {
  return (
    <main>
        <Navbar isAuth={true}/>
        <div className='flex min-h-[calc(100vh-200px)] w-full items-center justify-center'>
            {children}
        </div>
    </main>
  )
}

export default layout
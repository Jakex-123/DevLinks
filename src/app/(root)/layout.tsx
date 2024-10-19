import Navbar from '@/components/Navbar'
import { LinksProvider } from '@/Context/LinksContext'
import { PreviewProvider } from '@/Context/PreviewContext'
import React from 'react'

const Layout = ({children}:{children:React.ReactNode}) => {
  return (
    <main className='bg-background'>
      <LinksProvider>
        <PreviewProvider>
          <header className="md:p-6">
            <Navbar isAuth={false}/>
          </header>
          {children}
      </PreviewProvider>
    </LinksProvider>
    </main>
  )
}

export default Layout
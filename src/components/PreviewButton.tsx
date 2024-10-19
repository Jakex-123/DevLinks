"use client"
import { PreviewContext } from '@/Context/PreviewContext'
import Image from 'next/image'
import React, { useContext } from 'react'

const PreviewButton = () => {
    const {togglePreview}=useContext(PreviewContext)

  return (
    <button onClick={togglePreview} className='shadow-md hover:bg-hover px-4 py-[11px] md:px-[27px] outline outline-1 outline-accent rounded-lg'>
        <Image className='md:hidden' src={'/images/icon-preview-header.svg'} height={20} width={20} alt='preview'/>
        <span className='hidden md:block text-accent font-semibold'>Preview</span>
      </button>
  )
}

export default PreviewButton
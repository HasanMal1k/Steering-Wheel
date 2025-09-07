import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import gsap from 'gsap'
import { useConfigurationStore } from '../utils/ConfigurationStore'

function Logo() {
    const { activeComponent } = useConfigurationStore()
    const logoRef = useRef(null)
    // console.log('logo', activeComponent)

    // Animations so that when component is active, the logo fades away
    useEffect(() => {
  if (!activeComponent) {
    gsap.to(logoRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out',
    })
  } else {
    gsap.to(logoRef.current, {
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power2.out',
    })
  }
}, [activeComponent])


  return (
    <div className='fixed top-6 left-6 md:top-10 md:left-20 z-10 flex items-center gap-2 md:gap-4' ref={logoRef}>
        <Link href="https://tripleseven-na.com/" target="_blank" rel="noopener noreferrer">
            <Image 
            src="/images/logo.png" 
            width={150} 
            height={140} 
            alt="777 Performance" 
            priority 
            className="w-20 h-auto sm:w-24 md:w-32 lg:w-[150px]"
            />
        </Link>
        
        <div className="w-px h-8 sm:h-12 md:h-16 bg-[#f6f6f6]"></div>
        
        <h1 className='text-[#f6f6f6] text-sm sm:text-lg md:text-2xl font-light font-sans tracking-wide'
            style={{fontFamily: 'var(--font-geist-sans)'}}>
            <span className="hidden sm:inline">Wheel Configurator</span>
            <span className="sm:hidden">Configurator</span>
        </h1>
        </div>
  )
}

export default Logo
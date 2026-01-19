import React, { useEffect, useRef } from 'react'
import CartButton from './CartButton'
import OptionsButton from './OptionsButton'
import { useConfigurationStore } from '@/app/utils/ConfigurationStore'
import gsap from 'gsap'

function TopOptions() {
  const { activeComponent } = useConfigurationStore()
  const buttonsRef = useRef()

  useEffect(() => {
  if (!activeComponent) {
    gsap.to(buttonsRef.current, {
      opacity: 1,
      filter: 'blur(0px)',
      duration: 1.2,
      ease: 'power2.out',
    })
  } else {
    gsap.to(buttonsRef.current, {
      opacity: 0,
      filter: 'blur(10px)',
      duration: 1.2,
      ease: 'power2.out',
    })
  }
}, [activeComponent])

  return (
    <div className='fixed top-6 right-2 md:top-10 md:right-20 z-10 flex items-center justify-center gap-3' ref={buttonsRef}>
        <CartButton/>
        {/* <OptionsButton /> */}
    </div>
  )
}

export default TopOptions
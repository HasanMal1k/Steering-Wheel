import React from 'react'
import CartButton from './CartButton'
import OptionsButton from './OptionsButton'

function TopOptions() {
  return (
    <div className='fixed top-6 right-6 md:top-10 md:right-20 z-10 flex items-center justify-center gap-3'>
        <CartButton/>
        <OptionsButton />
    </div>
  )
}

export default TopOptions
import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"


function CartButton() {
  return (
    <div className='fixed top-6 right-6 md:top-10 md:right-20 z-10'>
        <Popover >
            <PopoverTrigger className='flex items-center justify-center gap-2 border-1 border-gray-50 px-4 py-1 rounded-md' style={{fontFamily: 'var(--font-geist-sans)'}}>
                <p>Cart</p>
            </PopoverTrigger>
            <PopoverContent>
              Cart Empty ...
            </PopoverContent>
        </Popover>
    </div>
  )
}

export default CartButton
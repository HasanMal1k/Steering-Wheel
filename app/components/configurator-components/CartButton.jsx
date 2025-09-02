import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { ShoppingCart } from 'lucide-react'

function CartButton() {
  return (
        <Popover >
            <PopoverTrigger className='flex items-center justify-center gap-1 sm:gap-2 border-1 border-gray-50/70 px-3 sm:px-4 py-2 rounded-md hover:cursor-pointer' style={{fontFamily: 'var(--font-geist-sans)'}}>
                <span className="flex items-center justify-center gap-1 sm:gap-2">
                    <span><ShoppingCart strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5"/></span>
                    <span className='text-xs sm:text-sm uppercase hidden xs:inline sm:inline'>{' ' + 'Buy Now'}</span>
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-64 sm:w-80">
              Cart Empty ...
            </PopoverContent>
        </Popover>
  )
}

export default CartButton
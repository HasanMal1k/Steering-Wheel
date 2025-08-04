import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { ShoppingCart } from 'lucide-react'


function CartButton() {
  return (
    <div className='fixed top-6 right-6 md:top-10 md:right-20 z-10'>
        <Popover>
            <PopoverTrigger className='flex items-center justify-center gap-2' style={{fontFamily: 'var(--font-geist-sans)'}}>
                <ShoppingCart className='inline'/>
                <p>{' '}Cart</p>
            </PopoverTrigger>
            <PopoverContent>All Shop Contents Will go here.</PopoverContent>
        </Popover>
    </div>
  )
}

export default CartButton
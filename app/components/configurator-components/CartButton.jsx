import React from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { ShoppingCart } from 'lucide-react'
import { useConfigurationStore } from "@/app/utils/ConfigurationStore"

function CartButton() {
  const { enableCartComponent, cartCard } = useConfigurationStore()

  const handleClick = () => {
    // console.log('button clicked', cartCard)
    enableCartComponent()
  }

  return (
    <button 
      className="flex items-center justify-center gap-1 sm:gap-2 
                border border-white/30 
                bg-[#f76014] backdrop-blur-sm 
                px-2 sm:px-5 py-1 sm:py-2 rounded-md 
                hover:bg-[#f76014]/60
                text-white transition-all duration-300
                h-7 sm:h-10 hover:cursor-pointer whitespace-nowrap shadow-lg hover:shadow-orange-500/20"
      style={{ fontFamily: 'var(--font-michroma)' }}
      onClick={handleClick}
    >
      <ShoppingCart strokeWidth={2} className="w-3 h-3 sm:w-5 sm:h-5"/>
      <span className="text-[9px] sm:text-sm uppercase tracking-wider font-bold">
        Add To Cart
      </span>
    </button>
  )
}

export default CartButton
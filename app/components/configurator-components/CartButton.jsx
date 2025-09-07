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
                bg-white/10 backdrop-blur-sm 
                px-3 sm:px-4 py-2 rounded-md 
                hover:bg-green-600/80 
                text-white transition-colors
                h-9 sm:h-10 hover:cursor-pointer"
      style={{ fontFamily: 'var(--font-geist-sans)' }}
      onClick={handleClick}
    >
      <ShoppingCart strokeWidth={2} className="w-[18px] h-[18px] sm:w-5 sm:h-5"/>
      <span className="text-xs sm:text-sm uppercase hidden xs:inline sm:inline">
        {' ' + 'Buy Now'}
      </span>
    </button>
  )
}

export default CartButton
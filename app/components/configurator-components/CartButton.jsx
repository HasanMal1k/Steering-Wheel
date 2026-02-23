import React, { useEffect, useMemo, useRef, useState } from 'react'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover"
import { ShoppingCart } from 'lucide-react'
import { useConfigurationStore } from "@/app/utils/ConfigurationStore"
import { useCartStore } from "@/app/utils/CartStore"
import { useSteeringWheelStore, useKnobs, useProtocolBoardStore, useWiringHarnessStore, useHubAdapterStore } from "@/app/utils/InventoryStore"
import gsap from "gsap"

function CartButton() {
  const enableCartComponent = useConfigurationStore(state => state.enableCartComponent)

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

const CartButtonMemo = React.memo(CartButton)

function CartPriceBadge() {
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const cartItems = useCartStore(state => state.cartItems)

  const wheels = useSteeringWheelStore(state => state.steeringWheelData)
  const frontKnobs = useKnobs(state => state.frontKnobs)
  const sideRotary = useKnobs(state => state.sideRotary)
  const protocolBoards = useProtocolBoardStore(state => state.protocolBoardsData)
  const wiringHarnesses = useWiringHarnessStore(state => state.wiringHarnessData)
  const hubAdapters = useHubAdapterStore(state => state.hubAdaptersData)

  const getPrice = (key, item) => {
    if (item.price) return item.price
    if (!item.merchandiseId) return null

    if (key === 'steeringWheel') {
      const wheelPrice = wheels[item.merchandiseId]?.price
      console.log(`💰 Getting ${key}:`, { merchandiseId: item.merchandiseId, wheelPrice, allWheels: wheels })
      return wheelPrice
    }
    if (key === 'frontKnobs') {
      const k = Object.values(frontKnobs).find(x => x.id === item.merchandiseId)
      return k?.price
    }
    if (key === 'sideRotary') {
      const k = Object.values(sideRotary).find(x => x.id === item.merchandiseId)
      return k?.price
    }
    if (key === 'protocolBoard') {
      const b = Object.values(protocolBoards).find(x => x.id === item.merchandiseId)
      return b?.price
    }
    if (key === 'wiringHarnesses') {
      const w = Object.values(wiringHarnesses).find(x => x.value === item.merchandiseId)
      return w?.price
    }
    if (key === 'hubAdapter') {
      const h = Object.values(hubAdapters).find(x => x.id === item.merchandiseId)
      return h?.price
    }
    return null
  }

  const totalAmount = useMemo(() => {
    console.log("🛒 Cart Items:", cartItems);
    return Object.entries(cartItems).reduce((sum, [key, item]) => {
      const price = getPrice(key, item)
      console.log(`📊 ${key}:`, { item, price, merchandiseId: item.merchandiseId });
      if (item.merchandiseId && price) {
        const itemTotal = parseFloat(price.amount) * (item.quantity || 1)
        console.log(`✅ ${key} total: ${itemTotal} (amount: ${price.amount}, qty: ${item.quantity})`);
        return sum + itemTotal
      }
      return sum
    }, 0)
  }, [cartItems, wheels, frontKnobs, sideRotary, protocolBoards, wiringHarnesses, hubAdapters])

  const [displayAmount, setDisplayAmount] = useState(totalAmount)
  const latestAmountRef = useRef(totalAmount)
  const updateTimeoutRef = useRef(null)

  useEffect(() => {
    latestAmountRef.current = totalAmount
  }, [totalAmount])

  useEffect(() => {
    if (updateTimeoutRef.current) {
      clearTimeout(updateTimeoutRef.current)
      updateTimeoutRef.current = null
    }

    if (activeComponent) {
      return
    }

    updateTimeoutRef.current = setTimeout(() => {
      setDisplayAmount(latestAmountRef.current)
    }, 1200)

    return () => {
      if (updateTimeoutRef.current) {
        clearTimeout(updateTimeoutRef.current)
        updateTimeoutRef.current = null
      }
    }
  }, [activeComponent, totalAmount])

  const hasCartItems = Object.values(cartItems).some(item => item.merchandiseId)

  const PriceCounter = ({ value }) => {
    const digits = value.toFixed(2).split("")
    const digitHeight = 16
    const digitRefs = useRef([])

    useEffect(() => {
      digits.forEach((ch, index) => {
        if (ch === ".") return
        const digit = Number(ch)
        const el = digitRefs.current[index]
        if (!el || Number.isNaN(digit)) return

        gsap.to(el, {
          y: -digit * digitHeight,
          duration: 0.5,
          ease: "power3.out"
        })
      })
    }, [digits])

    return (
      <span className="inline-flex items-center text-[9px] sm:text-sm font-bold tracking-wider uppercase text-white">
        <span className="mr-0.5">$</span>
        {digits.map((ch, index) => {
          if (ch === ".") {
            return (
              <span key={`dot-${index}`} className="mx-0.5">.</span>
            )
          }
          return (
            <span
              key={`digit-${index}`}
              className="relative overflow-hidden"
              style={{ width: "1ch", height: digitHeight }}
            >
              <span
                ref={(el) => (digitRefs.current[index] = el)}
                className="absolute left-0 top-0 flex flex-col"
                style={{ lineHeight: `${digitHeight}px` }}
              >
                {Array.from({ length: 10 }, (_, i) => (
                  <span key={i} className="h-4 flex items-center justify-center">
                    {i}
                  </span>
                ))}
              </span>
            </span>
          )
        })}
      </span>
    )
  }

  return (
    <div
      className="flex items-center rounded-md border border-white/20 bg-white/10 px-2 sm:px-3 h-7 sm:h-10"
      style={{ fontFamily: 'var(--font-michroma)' }}
    >
      {hasCartItems ? <PriceCounter value={displayAmount} /> : (
        <span className="text-[9px] sm:text-sm font-bold tracking-wider uppercase text-white/70">$0.00</span>
      )}
    </div>
  )
}

const CartPriceBadgeMemo = React.memo(CartPriceBadge)

export { CartPriceBadgeMemo as CartPriceBadge }
export default CartButtonMemo
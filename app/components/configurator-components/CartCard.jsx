import { useConfigurationStore } from "@/app/utils/ConfigurationStore"
import { useCartStore } from "@/app/utils/CartStore"
import { useSteeringWheelStore, useKnobs, useProtocolBoardStore, useWiringHarnessStore, useHubAdapterStore } from "@/app/utils/InventoryStore"
import { Button } from "../ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { XIcon } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import gsap from "gsap"

export function CartCard() {
  const { cartCard, disableCardComponent, enableComponent, selectedWheelType, selectedMake, selectedModel, selectedJoystickColor, selectedRotaryColor } = useConfigurationStore()
  const cartItems = useCartStore(state => state.cartItems)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Subscribing to inventory stores for price lookup
  const wheels = useSteeringWheelStore(state => state.steeringWheelData)
  const frontKnobs = useKnobs(state => state.frontKnobs)
  const sideRotary = useKnobs(state => state.sideRotary)
  const protocolBoards = useProtocolBoardStore(state => state.protocolBoardsData)
  const wiringHarnesses = useWiringHarnessStore(state => state.wiringHarnessData)
  const hubAdapters = useHubAdapterStore(state => state.hubAdaptersData)

  const getPrice = (key, item) => {
    if (item.price) return item.price;
    if (!item.merchandiseId) return null;
    
    if (key === 'steeringWheel') return wheels[item.merchandiseId]?.price;
    if (key === 'frontKnobs') {
        const k = Object.values(frontKnobs).find(x => x.id === item.merchandiseId);
        return k?.price;
    }
    if (key === 'sideRotary') {
        const k = Object.values(sideRotary).find(x => x.id === item.merchandiseId);
        return k?.price;
    }
    if (key === 'protocolBoard') {
        const b = Object.values(protocolBoards).find(x => x.id === item.merchandiseId);
        return b?.price;
    }
    if (key === 'wiringHarnesses') {
        const w = Object.values(wiringHarnesses).find(x => x.value === item.merchandiseId);
        return w?.price;
    }
    if (key === 'hubAdapter') {
        const h = Object.values(hubAdapters).find(x => x.id === item.merchandiseId);
        return h?.price;
    }
    return null;
  }

  const cardRef = useRef()

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

    // Open window immediately to prevent browser blocking popup after async delay
    const checkoutWindow = window.open('', '_blank')
    if (checkoutWindow) {
      checkoutWindow.document.write('<html><head><title>Checkout</title></head><body style="background-color: #f9fafb; color: #111827; display: flex; justify-content: center; align-items: center; height: 100vh; font-family: system-ui, -apple-system, sans-serif;"><div style="text-align: center;"><h3 style="margin-bottom: 10px; font-weight: 500;">Preparing your checkout...</h3><p style="color: #6b7280; font-size: 0.875rem;">Please wait while we transfer your cart to Shopify.</p></div></body></html>')
      checkoutWindow.document.close()
    }

    console.log('🛒 Initiating checkout with cart items:', cartItems)
    
    // Build configuration object to pass to checkout
    const configuration = {
      wheelType: selectedWheelType,
      make: selectedMake,
      model: selectedModel,
      joystickColor: selectedJoystickColor,
      rotaryColor: selectedRotaryColor
    }

    console.log('🎨 Configuration:', configuration)
    
    // Log which items have merchandiseId
    Object.entries(cartItems).forEach(([key, item]) => {
      if (item.merchandiseId) {
        console.log(`✅ ${key}: ${item.merchandiseId}`)
      } else {
        console.log(`❌ ${key}: NO merchandiseId`)
      }
    })

    try {
      const response = await fetch('/api/shopify/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cartItems, configuration }),
      })

      const data = await response.json()

      if (!response.ok) {
        const errorMessage = data.details || data.error || 'Failed to create checkout'
        const suggestion = data.suggestion || ''
        console.error('❌ Checkout failed:', errorMessage)
        console.error('💡 Suggestion:', suggestion)
        throw new Error(suggestion ? `${errorMessage}\n\n${suggestion}` : errorMessage)
      }

      console.log('✅ Checkout URL received:', data.checkoutUrl)

      // Redirect the pre-opened window to the checkout URL
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.location.href = data.checkoutUrl
      } else {
        // Fallback if popup was blocked or window closed
        window.location.href = data.checkoutUrl
      }
      
      // Close the cart modal
      setIsLoading(false)
      disableCardComponent()

    } catch (err) {
      console.error('❌ Checkout error:', err)
      setError(err.message)
      setIsLoading(false)
      // Close the window if error occurred
      if (checkoutWindow && !checkoutWindow.closed) {
        checkoutWindow.close()
      }
    }
  }

  useEffect(() => {
  if (!cardRef.current) return;

  if (cartCard) {
    cardRef.current.classList.remove("hidden");
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, filter: "blur(10px)" },
      {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.5,
        ease: "power2.inOut",
      }
    );
  } else {
    gsap.to(cardRef.current, {
      opacity: 0,
      filter: "blur(10px)",
      duration: 0.5,
      ease: "power2.inOut",
      onComplete: () => cardRef.current.classList.add("hidden"),
    });
  }
}, [cartCard]);

  return (
    <>
        <div className="h-full max-w-full z-[10000] backdrop-blur-md fixed inset-0 flex items-center justify-center hidden p-4" ref={cardRef}>
          <Card className="w-full max-w-sm max-h-full flex flex-col">
            <CardHeader className="flex-shrink-0">
              <CardTitle>Your Configuration Items</CardTitle>
              {/* <CardDescription>
                Enter your email below to login to your account
              </CardDescription> */}
              <CardAction>
                <Button onClick={disableCardComponent}><XIcon /></Button>
              </CardAction>
            </CardHeader>
            <CardContent className="overflow-y-auto min-h-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/40">
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-100 mb-3">Selected Items:</div>
                {Object.entries(cartItems).map(([key, item]) => {
                  if (!item.merchandiseId) return null
                  const price = getPrice(key, item);
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div className="flex-1">
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      {price && (
                        <div className="font-semibold text-gray-900">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: price.currencyCode }).format(price.amount)}
                        </div>
                      )}
                    </div>
                  )
                })}
                
                {/* Grand Total Section */}
                {Object.values(cartItems).some(item => item.merchandiseId) && (
                   <div className="mt-6 pt-4 border-t-2 border-gray-900">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xl font-bold text-white uppercase tracking-wide">Total:</span>
                        <span className="text-3xl font-extrabold text-white">
                          {(() => {
                            const total = Object.entries(cartItems).reduce((sum, [key, item]) => {
                              const price = getPrice(key, item);
                              if (item.merchandiseId && price) {
                                return sum + (parseFloat(price.amount) * (item.quantity || 1));
                              }
                              return sum;
                            }, 0);
                            const currency = 'USD';
                            return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(total);
                          })()}
                        </span>
                      </div>
                   </div>
                )}

                {Object.values(cartItems).filter(item => item.merchandiseId).length === 0 && (
                  <p className="text-gray-500 text-center py-4">No items configured yet</p>
                )}
                
                {/* Show missing configuration items */}
                {Object.entries(cartItems).some(([key, item]) => !item.merchandiseId) && (
                  <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-xs font-semibold text-yellow-800 mb-2">Not Yet Configured:</p>
                    <div className="space-y-1">
                      {Object.entries(cartItems).map(([key, item]) => {
                        if (item.merchandiseId) return null
                        const displayName = key.replace(/([A-Z])/g, ' $1').trim()
                        const hint = key === 'frontKnobs' ? '(Select joystick color)' :
                                    key === 'sideRotary' ? '(Select rotary color)' :
                                    key === 'protocolBoard' || key === 'wiringHarnesses' || key === 'hubAdapter' ? '(Select vehicle make & model)' : ''
                        return (
                          <p key={key} className="text-xs text-yellow-700 capitalize">
                            • {displayName} {hint}
                          </p>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
              {error && (
                <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm font-semibold text-red-800 mb-1">Checkout Error</p>
                  <p className="text-xs text-red-600 whitespace-pre-line">{error}</p>
                </div>
              )}
            </CardContent>
            <CardFooter className="flex-col gap-2 flex-shrink-0">
              <Button 
                type="submit" 
                className="w-full" 
                onClick={handleCheckout}
                disabled={isLoading || Object.values(cartItems).filter(item => item.merchandiseId).length === 0}
              >
                {isLoading ? 'Creating Checkout...' : 'Add to Cart'}
              </Button>
            </CardFooter>
          </Card>
        </div>
      {/* )} */}
    </>
  )
}

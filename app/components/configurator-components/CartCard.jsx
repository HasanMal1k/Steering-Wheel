import { useConfigurationStore } from "@/app/utils/ConfigurationStore"
import { useCartStore } from "@/app/utils/CartStore"
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

  const cardRef = useRef()

  const handleCheckout = async () => {
    setIsLoading(true)
    setError(null)

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

      // Open checkout in new tab
      window.open(data.checkoutUrl, '_blank')
      
      // Close the cart modal
      setIsLoading(false)
      disableCardComponent()

    } catch (err) {
      console.error('❌ Checkout error:', err)
      setError(err.message)
      setIsLoading(false)
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
        <div className="h-full max-w-full z-[10000] backdrop-blur-md fixed inset-0 flex items-center justify-center hidden" ref={cardRef}>
          <Card className="w-full max-w-sm">
            <CardHeader>
              <CardTitle>Your Configuration Items</CardTitle>
              {/* <CardDescription>
                Enter your email below to login to your account
              </CardDescription> */}
              <CardAction>
                <Button onClick={disableCardComponent}><XIcon /></Button>
              </CardAction>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700 mb-3">Selected Items:</div>
                {Object.entries(cartItems).map(([key, item]) => {
                  if (!item.merchandiseId) return null
                  return (
                    <div key={key} className="flex justify-between items-center py-2 border-b border-gray-200">
                      <div className="flex-1">
                        <p className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                    </div>
                  )
                })}
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
            <CardFooter className="flex-col gap-2">
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

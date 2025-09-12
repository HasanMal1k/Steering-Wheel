import { useConfigurationStore } from "@/app/utils/ConfigurationStore"
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
import { useRef, useEffect } from "react"
import gsap from "gsap"

export function CartCard() {
  const { cartCard, disableCardComponent, enableComponent } = useConfigurationStore()

  const cardRef = useRef()

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
                <p>... All Configuration Items</p>
            </CardContent>
            <CardFooter className="flex-col gap-2">
              <Button type="submit" className="w-full">
                Confirm Configuration
              </Button>
            </CardFooter>
          </Card>
        </div>
      {/* )} */}
    </>
  )
}

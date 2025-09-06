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

export function CartCard() {
  const { cartCard, disableCardComponent, enableComponent } = useConfigurationStore()
  return (
    <>
      {cartCard && (
        <div className="h-full max-w-full z-[10000] backdrop-blur-md fixed inset-0 flex items-center justify-center">
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
      )}
    </>
  )
}

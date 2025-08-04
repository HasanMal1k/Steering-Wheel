import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/app/components/ui/hover-card"

import { Info } from "lucide-react"

function ToolTip() {
  return (
    <div className="fixed bottom-6 left-10 md:bottom-10 md:right-10 z-10 flex items-center gap-2 md:gap-4">
        <HoverCard>
            <HoverCardTrigger className='text-white'><Info/></HoverCardTrigger>
            <HoverCardContent>
                Click on the parts to configure your wheel or select from the dropdown.
            </HoverCardContent>
        </HoverCard>
    </div>
  )
}

export default ToolTip
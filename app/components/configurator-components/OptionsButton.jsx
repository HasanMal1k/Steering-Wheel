import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Settings } from "lucide-react";

function OptionsButton() {


  return (
    <DropdownMenu className=''>
      <DropdownMenuTrigger className='flex items-center justify-center gap-1 sm:gap-2 border-1 border-gray-50/70 px-3 sm:px-4 py-2 rounded-md hover:cursor-pointer' style={{fontFamily: 'var(--font-geist-sans)'}}>
        <span className="flex items-center justify-center gap-1 sm:gap-2">
            <span><Settings strokeWidth={1.5} className="w-4 h-4 sm:w-5 sm:h-5"/></span>
            <span className="text-xs sm:text-sm uppercase hidden xs:inline sm:inline">{' ' + 'Options'}</span>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48 sm:w-56">
        <DropdownMenuItem className={'hover:cursor-pointer'}>
          Download Image
        </DropdownMenuItem>
        <DropdownMenuItem className={'hover:cursor-pointer'}>
          How To Use
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default OptionsButton;
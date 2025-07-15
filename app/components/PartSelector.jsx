import React, {useState } from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import { useConfigurationStore } from '../ConfigurationStore'

function PartSelector() {

  const [selectValue, setSelectValue] = useState(null)
  console.log(selectValue)

  const handleValueChange = (value) => {
    setSelectValue(value)
    setActiveComponent(value)
  }


  // Faking components to pass 

  const joyStickComponent = {    
    current: {
      userData: {
        type: 'joysticks'
      }
    }
  }

  const rotaryComponent = {    
    current: {
      userData: {
        type: 'rotary'
      }
    }
  }

  const paddlesComponent = {    
    current: {
      userData: {
        type: 'paddles'
      }
    }
  }


  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)

  return (
    <div className='fixed top-6 right-6 md:top-10 md:right-20 z-10 flex items-center gap-2 md:gap-4'>
        <Select value={selectValue} onValueChange={handleValueChange}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Part" className='text-white'/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                <SelectItem value={null}>Default</SelectItem>
                <SelectItem value={joyStickComponent}>Joystick</SelectItem>
                <SelectItem value={rotaryComponent}>Rotary</SelectItem>
                <SelectItem value={paddlesComponent}>Paddles</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
  )
}

export default PartSelector
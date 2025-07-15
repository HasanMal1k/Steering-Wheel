import React, { useState, useEffect } from 'react'
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
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  
  // Get string value from activeComponent
  const getSelectValue = () => {
    if (!activeComponent) return 'default'
    if (typeof activeComponent === 'string') return activeComponent
    return activeComponent.current?.userData?.type || 'default'
  }
  
  const [selectValue, setSelectValue] = useState(getSelectValue())

  // Update local state when activeComponent changes
  useEffect(() => {
    const newValue = getSelectValue()
    setSelectValue(newValue)
  }, [activeComponent])

  const handleValueChange = (value) => {
    setSelectValue(value)
    
    if (value === 'default') {
      setActiveComponent(null)
    } else {
      // Just pass the string value
      setActiveComponent(value)
    }
  }

  return (
    <div className='fixed top-6 right-6 md:top-10 md:right-20 z-10 flex items-center gap-2 md:gap-4'>
      <Select value={selectValue} onValueChange={handleValueChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select Part" className='text-white'/>
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="default">Default View</SelectItem>
            <SelectItem value="joysticks">Joysticks</SelectItem>
            <SelectItem value="rotary">Rotary Controls</SelectItem>
            <SelectItem value="paddles">Paddle Shifters</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  )
}

export default PartSelector
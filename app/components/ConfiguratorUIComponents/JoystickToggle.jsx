import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/app/components/ui/toggle-group' // Use your custom component
import { joystickColor } from '@/app/ConfigurationStore'

function JoystickToggle() {
    
  return ( 
    <ToggleGroup type='single' size='lg'>
        {joystickColor.map((color) => (
            <ToggleGroupItem 
                key={color} 
                value={color}
                className="w-8 h-8 rounded-full border-2 border-gray-300"
                style={{ backgroundColor: color }}
            >
            </ToggleGroupItem>  
        ))}
    </ToggleGroup>
  )
}

export default JoystickToggle
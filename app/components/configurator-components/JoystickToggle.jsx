import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '../ui/toggle-group' 
import { joystickColor } from '@/app/utils/ConfigurationStore'

function JoystickToggle() {
    const colors = Object.values(joystickColor)
    const elementPerRow = 6
    const totalElements = colors.length
    const numberOfRows = Math.ceil(totalElements / elementPerRow)

    // Fix the array creation logic
    const array = []
    for(let i = 0; i < numberOfRows; i++){
        const row = colors.slice(i * elementPerRow, (i + 1) * elementPerRow)
        array.push(row)
    }

    // console.log(array)

    return (
        <div className='flex items-center flex-col gap-3'>
            {array.map((row, rowIndex) => (
                <ToggleGroup key={rowIndex} type='single' size='lg'>
                    {row.map((color) => (
                        <ToggleGroupItem
                            key={color}
                            value={color}
                            className="w-10 h-10 border-1 border-gray-400 p-4"
                            style={{ backgroundColor: color }}
                        />
                    ))}
                </ToggleGroup>
            ))}
        </div>
    )
}

export default JoystickToggle
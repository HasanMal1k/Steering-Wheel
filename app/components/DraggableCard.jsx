import React, { useRef, useEffect } from 'react'
import { Card } from './ui/card'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import gsap from 'gsap'
import { useConfigurationStore, joystickColor, rotaryColor } from '../ConfigurationStore'
import { X } from 'lucide-react'

gsap.registerPlugin(Draggable, InertiaPlugin)

function DraggableCard() {
  const cardRef = useRef()
  
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const selectedJoystickColor = useConfigurationStore(state => state.selectedJoystickColor)
  const setSelectedJoystickColor = useConfigurationStore(state => state.setSelectedJoystickColor)
  const selectedRotaryColor = useConfigurationStore(state => state.selectedRotaryColor)
  const setSelectedRotaryColor = useConfigurationStore(state => state.setSelectedRotaryColor)

  useEffect(() => {
    if (cardRef.current) {
      Draggable.create(cardRef.current, {
        type: 'x,y',
        bounds: 'body',
        edgeResistance: 0.6,
        inertia: true,
      })
    }
  }, [])

  // Use the same color mapping from your Rotary component
  const rotaryColorMap = {
    'gray': '#6b7280',
    'blue': '#3b82f6',
    'red': '#ef4444',
    'white': '#f9fafb',
    'purple': '#8b5cf6',
    'stone': '#78716c',
    'amber': '#f59e0b',
    'forest green': '#16a34a',
    'silver': '#e5e7eb',
    'golden': '#eab308',
    'slate': '#64748b'
  }

  const ColorCircle = ({ color, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`
        w-8 h-8 rounded-full border-2 transition-all duration-200 
        hover:scale-110 hover:shadow-lg
        ${isSelected ? 'border-white shadow-white/50 scale-110' : 'border-gray-600 hover:border-white/60'}
      `}
      style={{ backgroundColor: color }}
    />
  )

  const renderJoystickColors = () => (
    <div className='space-y-3'>
      {/* <h3 className='text-white text-sm font-medium'>Joystick Colors</h3> */}
      <div className='flex flex-wrap gap-2 align-middle'>
        {Object.entries(joystickColor).map(([name, colorValue]) => (
          <ColorCircle
            key={name}
            color={colorValue}
            isSelected={selectedJoystickColor === colorValue}
            onClick={() => setSelectedJoystickColor(colorValue)}
          />
        ))}
      </div>
    </div>
  )

  const renderRotaryColors = () => (
    <div className='space-y-3'>
      {/* <h3 className='text-white text-sm font-medium'>Rotary Colors</h3> */}
      <div className='flex flex-wrap gap-2 align-middle'>
        {Object.entries(rotaryColor).map(([name, colorValue]) => (
          <ColorCircle
            key={name}
            color={colorValue}
            isSelected={selectedRotaryColor === colorValue}
            onClick={() => setSelectedRotaryColor(colorValue)}
          />
        ))}
      </div>
    </div>
  )

  const renderComponentOptions = () => {
    switch (activeComponent) {
      case 'joysticks':
        return renderJoystickColors()
      case 'rotary':
        return renderRotaryColors()
      case 'paddles':
        return (
          <div className='space-y-3'>
            {/* Match the same structure as color options to maintain consistent height */}
            <div className='flex flex-wrap gap-2 justify-between'>
              <div className='text-center py-2 w-full'>
                <p className='text-gray-400 text-xs'>Configuration coming soon</p>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  if (!activeComponent) return null

  return (
    <Card 
      className='fixed right-6 top-1/2 -translate-y-1/2 w-80 z-1000 bg-black border-gray-700 backdrop-blur-sm cursor-move' 
      ref={cardRef}
    >
      <div className='p-4 pt-0 space-y-4'>
        {/* Header */}
        <div className='flex items-start justify-between'>
          <h2 className='text-white text-lg capitalize font-semibold flex-1 pb-3' >
            {activeComponent} Options
          </h2>
          <button
            onClick={() => setActiveComponent(null)}
            className='text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0'
          >
            <X size={16} />
          </button>
        </div>

        {/* Component Options */}
        {renderComponentOptions()}
      </div>
    </Card>
  )
}

export default DraggableCard
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
  const draggableInstance = useRef()

  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const selectedJoystickColor = useConfigurationStore(state => state.selectedJoystickColor)
  const setSelectedJoystickColor = useConfigurationStore(state => state.setSelectedJoystickColor)
  const selectedRotaryColor = useConfigurationStore(state => state.selectedRotaryColor)
  const setSelectedRotaryColor = useConfigurationStore(state => state.setSelectedRotaryColor)

  useEffect(() => {
    if (cardRef.current) {
      // Destroy existing instance
      if (draggableInstance.current && draggableInstance.current[0]) {
        draggableInstance.current[0].kill()
      }

      // Create new draggable instance with proper touch handling
      draggableInstance.current = Draggable.create(cardRef.current, {
        type: 'x,y',
        bounds: 'body',
        edgeResistance: 0.6,
        inertia: true,
        // KEY FIX: Allow click events on child elements
        allowEventDefault: true,
        // KEY FIX: Specify which elements should NOT trigger dragging
        trigger: cardRef.current,
        // KEY FIX: Don't prevent default on these elements
        onPress: function(e) {
          // Don't start dragging if clicking on buttons or interactive elements
          if (e.target.tagName === 'BUTTON' || 
              e.target.closest('button') || 
              e.target.classList.contains('color-circle') ||
              e.target.closest('.color-circle')) {
            return false; // Cancel the drag
          }
        }
      })
    }

    // Cleanup on unmount
    return () => {
      if (draggableInstance.current && draggableInstance.current[0]) {
        draggableInstance.current[0].kill()
      }
    }
  }, [])

  // Using same logic as before for visibility
  useEffect(() => {
    if (!activeComponent) {
      gsap.to(cardRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 1.2,
        ease: 'power2.out',
      })
    } else {
      cardRef.current.classList.remove('hidden')
      gsap.to(cardRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power2.out',
      })
    }
  }, [activeComponent])

  const ColorCircle = ({ color, isSelected, onClick }) => (
    <button
      onClick={(e) => {
        e.stopPropagation() // Prevent event bubbling
        onClick()
      }}
      onTouchEnd={(e) => {
        e.stopPropagation() // KEY FIX: Handle touch events specifically
        e.preventDefault()
        onClick()
      }}
      className={`
        color-circle w-8 h-8 rounded-full border-2 transition-all duration-200 
        hover:scale-110 hover:shadow-lg touch-manipulation
        ${isSelected ? 'border-white shadow-white/50 scale-110' : 'border-gray-600 hover:border-white/60'}
      `}
      style={{ 
        backgroundColor: color,
        // KEY FIX: Ensure proper touch behavior
        touchAction: 'manipulation',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    />
  )

  const renderJoystickColors = () => (
    <div className='space-y-3'>
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

  return (
    <Card 
      className={`fixed right-6 top-1/2 -translate-y-1/2 w-80 z-1000 bg-black border-gray-700 backdrop-blur-sm cursor-move hidden`} 
      ref={cardRef}
      style={{
        // KEY FIX: Ensure proper touch behavior on the card
        touchAction: 'none' // Allow dragging on the card itself
      }}
    >
      <div className='p-4 pt-0 space-y-4'>
        {/* Header - make this draggable area */}
        <div 
          className='flex items-start justify-between cursor-move'
          style={{ touchAction: 'none' }} // This area should be draggable
        >
          <h2 className='text-white text-lg capitalize font-semibold flex-1 pb-3 cursor-move'>
            {activeComponent} Options
          </h2>
          <button
            onClick={(e) => {
              e.stopPropagation()
              setActiveComponent(null)
            }}
            onTouchEnd={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setActiveComponent(null)
            }}
            className='text-gray-400 hover:text-white transition-colors p-1 flex-shrink-0'
            style={{ touchAction: 'manipulation' }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Component Options - these should NOT be draggable */}
        <div 
          className="component-options"
          style={{ touchAction: 'manipulation' }} // Allow normal touch interactions
        >
          {renderComponentOptions()}
        </div>
      </div>
    </Card>
  )
}

export default DraggableCard
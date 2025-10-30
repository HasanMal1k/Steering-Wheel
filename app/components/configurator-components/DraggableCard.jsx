import React, { useRef, useEffect } from 'react'
import { Card } from '../ui/card'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import gsap from 'gsap'
import { useConfigurationStore, hubLogos } from '../../utils/ConfigurationStore'
import { X } from 'lucide-react'
import { useKnobs } from '../../utils/InventoryStore'

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
  const selectedHubLogo = useConfigurationStore(state => state.selectedHubLogo)
  const setSelectedHubLogo = useConfigurationStore(state => state.setSelectedHubLogo)

  // Get inventory data with colors included
  const frontKnobs = useKnobs(state => state.frontKnobs)
  const sideRotary = useKnobs(state => state.sideRotary)

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
              e.target.closest('.color-circle') ||
              e.target.classList.contains('logo-button') ||
              e.target.closest('.logo-button')) {
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

  const ColorCircle = ({ color, isSelected, onClick, inStock = true }) => (
    <button
      onClick={(e) => {
        e.stopPropagation()
        if (inStock) onClick()
      }}
      onTouchEnd={(e) => {
        e.stopPropagation()
        e.preventDefault()
        if (inStock) onClick()
      }}
      disabled={!inStock}
      className={`
        color-circle w-8 h-8 rounded-full border-2 transition-all duration-200 
        relative
        ${inStock ? 'hover:scale-110 hover:shadow-lg' : 'opacity-40 cursor-not-allowed'}
        ${isSelected ? 'border-white shadow-white/50 scale-110' : 'border-gray-600 hover:border-white/60'}
      `}
      style={{ 
        backgroundColor: color,
        touchAction: 'manipulation',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      {!inStock && (
        <>
          <div className="absolute inset-0 bg-black/50 rounded-full" />
          <div className="absolute inset-0 flex items-center justify-center">
            <X size={16} className="text-white drop-shadow-lg" strokeWidth={3} />
          </div>
        </>
      )}
    </button>
  )

  const LogoButton = ({ brand, imagePath, isSelected, onClick, inStock = true }) => (
  <button
    onClick={(e) => {
      e.stopPropagation()
      if (inStock) onClick()
    }}
    onTouchEnd={(e) => {
      e.stopPropagation()
      e.preventDefault()
      if (inStock) onClick()
    }}
    disabled={!inStock}
    className={`
      logo-button relative p-2 transition-all duration-200
      ${inStock ? 'hover:scale-105 hover:shadow-lg' : 'opacity-40 cursor-not-allowed'}
      touch-manipulation w-12 h-12 flex items-center justify-center
      ring-2 ${isSelected ? 'ring-white' : 'ring-transparent'}
    `}
    style={{
      touchAction: 'manipulation',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none'
    }}
  >
    <img
      src={imagePath}
      alt={brand}
      className={`
        w-8 h-8 object-contain transition-all duration-200
        ${!inStock ? 'grayscale' : isSelected ? 'filter-none' : 'filter grayscale hover:filter-none'}
      `}
      onError={(e) => {
        e.target.style.display = 'none'
        e.target.nextSibling.style.display = 'block'
      }}
    />
    <div className="hidden text-white text-xs capitalize mt-1 font-medium">
      {brand}
    </div>
    {!inStock && (
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded">
        <X size={16} className="text-white drop-shadow-lg" strokeWidth={3} />
      </div>
    )}
  </button>
)

const NoLogoButton = ({ isSelected, onClick }) => (
  <button
    onClick={(e) => {
      e.stopPropagation()
      onClick()
    }}
    onTouchEnd={(e) => {
      e.stopPropagation()
      e.preventDefault()
      onClick()
    }}
    className={`
      logo-button relative p-2 transition-all duration-200
      hover:scale-105 hover:shadow-lg
      touch-manipulation w-12 h-12 flex items-center justify-center
      ring-2 ${isSelected ? 'ring-white' : 'ring-transparent'}
    `}
    style={{
      touchAction: 'manipulation',
      WebkitTouchCallout: 'none',
      WebkitUserSelect: 'none',
      userSelect: 'none'
    }}
  >
    <X size={16} className="text-gray-400" />
  </button>
)


  const renderJoystickColors = () => {
    const availableCount = Object.values(frontKnobs).filter(item => item.inventory > 0).length

    return (
      <div className='space-y-3'>
        <div className='flex flex-wrap gap-2 align-middle'>
          {Object.entries(frontKnobs).map(([name, item]) => {
            const inStock = item.inventory > 0
            
            return (
              <ColorCircle
                key={name}
                color={item.color}
                isSelected={selectedJoystickColor === item.color}
                onClick={() => setSelectedJoystickColor(item.color)}
                inStock={inStock}
              />
            )
          })}
        </div>
        <p className="text-xs text-gray-400 text-center">
          {availableCount} / {Object.keys(frontKnobs).length} colors available
        </p>
      </div>
    )
  }

  const renderRotaryColors = () => {
    const availableCount = Object.values(sideRotary).filter(item => item.inventory > 0).length

    return (
      <div className='space-y-3'>
        <div className='flex flex-wrap gap-2 align-middle'>
          {Object.entries(sideRotary).map(([name, item]) => {
            const inStock = item.inventory > 0
            
            return (
              <ColorCircle
                key={name}
                color={item.color}
                isSelected={selectedRotaryColor === item.color}
                onClick={() => setSelectedRotaryColor(item.color)}
                inStock={inStock}
              />
            )
          })}
        </div>
        <p className="text-xs text-gray-400 text-center">
          {availableCount} / {Object.keys(sideRotary).length} colors available
        </p>
      </div>
    )
  }

  const renderHubLogos = () => (
  <div className="space-y-3">
    <div className="flex flex-wrap justify-center gap-3 max-h-48 overflow-y-hidden py-2">
      <NoLogoButton
        isSelected={selectedHubLogo === null}
        onClick={() => setSelectedHubLogo(null)}
      />
      {Object.entries(hubLogos).map(([brand, imagePath]) => {
        // Add inventory check here when you have hub logo inventory
        const inStock = true // Replace with actual inventory check when available
        
        return (
          <LogoButton
            key={brand}
            brand={brand}
            imagePath={imagePath}
            isSelected={selectedHubLogo === brand}
            onClick={() => setSelectedHubLogo(brand)}
            inStock={inStock}
          />
        )
      })}
    </div>

  </div>
)


  const renderComponentOptions = () => {
    switch (activeComponent) {
      case 'joysticks':
        return renderJoystickColors()
      case 'rotary':
        return renderRotaryColors()
      case 'hub':
        return renderHubLogos()
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
      className={`fixed right-6 top-1/2 -translate-y-1/2 min-w-80 max-w-md z-1000 bg-black/50 border-gray-700 backdrop-blur-sm cursor-move hidden`} 
      ref={cardRef}
      style={{
        // KEY FIX: Ensure proper touch behavior on the card
        touchAction: 'none' // Allow dragging on the card itself
      }}
    >
      <div className='p-4 pt-0 space-y-4'>
        {/* Header - make this draggable area */}
        <div 
          className='flex items-start justify-between cursor-grab'
          style={{ touchAction: 'none' }} // This area should be draggable
        >
          <div className='flex-1 pb-3'>
            <h2 className='text-white text-lg capitalize font-semibold'>
              {activeComponent} Options
            </h2>
            <p className='text-gray-500 text-xs'>Drag to move this card</p>
          </div>
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
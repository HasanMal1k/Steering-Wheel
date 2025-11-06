import React, { useRef, useEffect, useState } from 'react'
import { Card } from '../ui/card'
import Draggable from 'gsap/Draggable'
import InertiaPlugin from 'gsap/InertiaPlugin'
import gsap from 'gsap'
import { useConfigurationStore } from '../../utils/ConfigurationStore'
import { X, Check, ChevronDown } from 'lucide-react'
import { useKnobs, useProtocolBoardStore, useWiringHarnessStore, useHubAdapterStore, make } from '../../utils/InventoryStore'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

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
  
  // Get make/model selection from ConfigurationStore
  const selectedMake = useConfigurationStore(state => state.selectedMake)
  const setSelectedMake = useConfigurationStore(state => state.setSelectedMake)
  const selectedModel = useConfigurationStore(state => state.selectedModel)
  const setSelectedModel = useConfigurationStore(state => state.setSelectedModel)

  // Get inventory data with colors included
  const frontKnobs = useKnobs(state => state.frontKnobs)
  const sideRotary = useKnobs(state => state.sideRotary)
  
  // Get inventory for make/model parts
  const protocolBoardsData = useProtocolBoardStore(state => state.protocolBoardsData)
  const wiringHarnessData = useWiringHarnessStore(state => state.wiringHarnessData)
  const hubAdaptersData = useHubAdapterStore(state => state.hubAdaptersData)

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
              e.target.closest('[role="menuitem"]') ||
              e.target.closest('[data-radix-dropdown-menu-content]')) {
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

  // Helper function to check if all parts are in stock for a make/model
  const checkPartsAvailability = (modelData) => {
    if (!modelData) return { available: false, missing: ['All parts'] }
    
    const missing = []
    
    // Check protocol board
    if (modelData.protocolBoard && modelData.protocolBoard.inventory <= 0) {
      missing.push('Protocol Board')
    }
    
    // Check wiring harness
    if (modelData.wiringHarness && modelData.wiringHarness.inventory <= 0) {
      missing.push('Wiring Harness')
    }
    
    // Check hub adapter
    if (modelData.hubAdapter && modelData.hubAdapter.inventory <= 0) {
      missing.push('Hub Adapter')
    }
    
    return {
      available: missing.length === 0,
      missing
    }
  }

  // Check if a make has any available models
  const isMakeAvailable = (makeName) => {
    const makeData = make[makeName]
    if (!makeData?.models) return false
    
    return Object.values(makeData.models).some(modelData => {
      const { available } = checkPartsAvailability(modelData)
      return available
    })
  }

  const renderMakeModelSelection = () => {
    const makes = Object.keys(make)
    const models = selectedMake && make[selectedMake]?.models ? Object.keys(make[selectedMake].models) : []
    const currentAvailability = selectedMake && selectedModel 
      ? checkPartsAvailability(make[selectedMake].models[selectedModel])
      : null
    
    return (
      <div className='space-y-4'>
        {/* Make Dropdown */}
        <div className='space-y-2'>
          <label className='text-xs text-gray-400 uppercase tracking-wide font-medium'>Vehicle Make</label>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className='w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-4 py-2.5 flex items-center justify-between hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all'>
                <span className={selectedMake ? 'text-white' : 'text-gray-300'}>
                  {selectedMake || 'Choose a make...'}
                </span>
                <ChevronDown size={16} className='text-gray-300' />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent 
              className='w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto bg-black/90 backdrop-blur-md border-white/20 z-[9999]'
              align="start"
              sideOffset={5}
            >
              {makes.map(makeName => {
                const available = isMakeAvailable(makeName)
                return (
                  <DropdownMenuItem
                    key={makeName}
                    onClick={() => {
                      setSelectedMake(makeName)
                      setSelectedModel('')
                    }}
                    className='text-white hover:bg-white/10 cursor-pointer flex items-center justify-between px-3 py-2'
                    disabled={!available}
                  >
                    <span className={!available ? 'opacity-50' : ''}>{makeName}</span>
                    {!available && <X size={14} className='text-red-400' />}
                    {selectedMake === makeName && <Check size={14} className='text-green-400' />}
                  </DropdownMenuItem>
                )
              })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Model Dropdown */}
        {selectedMake && (
          <div className='space-y-2'>
            <label className='text-xs text-gray-400 uppercase tracking-wide font-medium'>Vehicle Model</label>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className='w-full bg-white/10 backdrop-blur-sm border border-white/30 text-white rounded-md px-4 py-2.5 flex items-center justify-between hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all'>
                  <span className={selectedModel ? 'text-white' : 'text-gray-300'}>
                    {selectedModel || 'Choose a model...'}
                  </span>
                  <ChevronDown size={16} className='text-gray-300' />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                className='w-[var(--radix-dropdown-menu-trigger-width)] max-h-[300px] overflow-y-auto bg-black/90 backdrop-blur-md border-white/20 z-[9999]'
                align="start"
                sideOffset={5}
              >
                {models.map(modelName => {
                  const modelData = make[selectedMake].models[modelName]
                  const availability = checkPartsAvailability(modelData)
                  return (
                    <DropdownMenuItem
                      key={modelName}
                      onClick={() => {
                        setSelectedModel(
                          modelName,
                          modelData.protocolBoard?.id,
                          modelData.wiringHarness?.value,
                          modelData.hubAdapter?.id
                        )
                      }}
                      className='text-white hover:bg-white/10 cursor-pointer flex items-center justify-between px-3 py-2'
                      disabled={!availability.available}
                    >
                      <span className={!availability.available ? 'opacity-50' : ''}>{modelName}</span>
                      {!availability.available && <X size={14} className='text-red-400' />}
                      {availability.available && selectedModel === modelName && <Check size={14} className='text-green-400' />}
                    </DropdownMenuItem>
                  )
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}

        {/* Availability Status */}
        {currentAvailability && (
          <div className='mt-4 p-4 rounded-lg border border-gray-700 bg-gray-800/30'>
            {currentAvailability.available ? (
              <div className='flex items-center gap-3 text-green-400'>
                <div className='flex items-center justify-center w-6 h-6 bg-green-400/20 rounded-full'>
                  <Check size={14} strokeWidth={3} />
                </div>
                <span className='text-sm font-medium'>All parts in stock</span>
              </div>
            ) : (
              <div className='space-y-3'>
                <div className='flex items-center gap-3 text-red-400'>
                  <div className='flex items-center justify-center w-6 h-6 bg-red-400/20 rounded-full'>
                    <X size={14} strokeWidth={3} />
                  </div>
                  <span className='text-sm font-medium'>Out of stock</span>
                </div>
                <div className='ml-9 space-y-1'>
                  <p className='text-xs text-gray-500 mb-2'>Missing components:</p>
                  {currentAvailability.missing.map(part => (
                    <div key={part} className='flex items-center gap-2 text-xs text-gray-400'>
                      <div className='w-1 h-1 bg-gray-600 rounded-full'></div>
                      <span>{part}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    )
  }

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
                onClick={() => setSelectedJoystickColor(item.color, item.id)}
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
                onClick={() => setSelectedRotaryColor(item.color, item.id)}
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

  const renderComponentOptions = () => {
    switch (activeComponent) {
      case 'joysticks':
        return renderJoystickColors()
      case 'rotary':
        return renderRotaryColors()
      case 'hub':
        return renderMakeModelSelection()
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
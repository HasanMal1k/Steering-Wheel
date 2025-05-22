import React, { useState, useEffect } from 'react'
import { useConfigurationStore, joystickColor, rotaryColor, joystickDecal } from '../ConfigurationStore'

function ConfigureUI() {
  const { 
    activeComponent, 
    setActiveComponent,
    selectedJoystickColor,
    selectedRotaryColor, 
    selectedJoystickDecal,
    setSelectedJoystickColor,
    setSelectedRotaryColor,
    setSelectedJoystickDecal,
    resetConfiguration 
  } = useConfigurationStore()

  const [isVisible, setIsVisible] = useState(false)
  const [currentPart, setCurrentPart] = useState('')

  useEffect(() => {
    if (activeComponent) {
      setIsVisible(true)
      // Determine which part is selected based on the ref
      if (activeComponent.current) {
        const meshName = activeComponent.current.geometry?.userData?.name || 'Unknown'
        if (activeComponent.current.geometry === undefined) {
          // Check if it's one of our known components
          setCurrentPart('Joysticks')
        } else {
          setCurrentPart('Component')
        }
      }
    } else {
      setIsVisible(false)
    }
  }, [activeComponent])

  const closeConfigurator = () => {
    setActiveComponent(null)
    setIsVisible(false)
  }

  const getPartName = () => {
    if (!activeComponent?.current) return 'Unknown Part'
    
    // Check userData for component type
    const componentType = activeComponent.current.userData?.type
    
    switch (componentType) {
      case 'joysticks':
        return 'Joysticks'
      case 'rotary':
        return 'Rotary Controls'
      case 'paddles':
        return 'Paddle Shifters'
      default:
        return 'Steering Component'
    }
  }

  const ColorOption = ({ color, isSelected, onClick, colorValue }) => (
    <button
      onClick={onClick}
      className={`
        w-12 h-12 rounded-lg border-2 transition-all duration-200 
        hover:scale-110 hover:shadow-lg relative
        ${isSelected ? 'border-white shadow-white/50' : 'border-white/30 hover:border-white/60'}
      `}
      style={{ backgroundColor: colorValue }}
    >
      {isSelected && (
        <div className="absolute inset-0 rounded-lg bg-white/20 flex items-center justify-center">
          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  )

  const DecalOption = ({ decal, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-4 py-2 rounded-lg border transition-all duration-200 
        hover:scale-105 capitalize text-sm font-medium
        ${isSelected 
          ? 'border-white bg-white/20 text-white shadow-white/50' 
          : 'border-white/30 text-white/80 hover:border-white/60 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {decal}
    </button>
  )

  if (!isVisible) return null

  return (
    <>
      {/* Main Configuration Panel */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 w-80 z-50">
        <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-2xl border border-white/20 shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="p-6 border-b border-white/20">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Configure Part</h2>
                <p className="text-white/70 text-sm mt-1">{getPartName()}</p>
              </div>
              <button
                onClick={closeConfigurator}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors text-white/70 hover:text-white"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>

          {/* Configuration Options */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            
            {/* Joystick Colors */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Joystick Color</h3>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(joystickColor).map(([name, colorValue]) => (
                  <ColorOption
                    key={name}
                    color={name}
                    colorValue={colorValue}
                    isSelected={selectedJoystickColor === colorValue}
                    onClick={() => setSelectedJoystickColor(colorValue)}
                  />
                ))}
              </div>
              <p className="text-white/60 text-xs mt-2 capitalize">
                Selected: {Object.keys(joystickColor).find(key => joystickColor[key] === selectedJoystickColor)}
              </p>
            </div>

            {/* Rotary Colors */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Rotary Color</h3>
              <div className="grid grid-cols-3 gap-2">
                {rotaryColor.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedRotaryColor(color)}
                    className={`
                      px-3 py-2 rounded-lg border transition-all duration-200 
                      hover:scale-105 capitalize text-sm font-medium
                      ${selectedRotaryColor === color
                        ? 'border-white bg-white/20 text-white shadow-white/50' 
                        : 'border-white/30 text-white/80 hover:border-white/60 hover:text-white hover:bg-white/10'
                      }
                    `}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Joystick Decals */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Joystick Decal</h3>
              <div className="grid grid-cols-2 gap-2">
                {joystickDecal.map((decal, index) => (
                  <DecalOption
                    key={index}
                    decal={decal}
                    isSelected={selectedJoystickDecal === decal}
                    onClick={() => setSelectedJoystickDecal(decal)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-white/20 space-y-3">
            <button
              onClick={resetConfiguration}
              className="w-full py-3 px-4 bg-white/10 hover:bg-white/20 border border-white/30 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
            >
              Reset to Default
            </button>
            <button
              onClick={closeConfigurator}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg"
            >
              Apply Changes
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ConfigureUI
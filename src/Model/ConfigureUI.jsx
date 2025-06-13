import React, { useState, useEffect } from 'react'
import { useConfigurationStore, joystickColor, rotaryColor } from '../ConfigurationStore'

function ConfigureUI() {
  const { 
    activeComponent, 
    setActiveComponent,
    selectedJoystickColor,
    selectedRotaryColor, 
    setSelectedJoystickColor,
    setSelectedRotaryColor,
    resetConfiguration 
  } = useConfigurationStore()

  const [isVisible, setIsVisible] = useState(false)
  const [componentType, setComponentType] = useState('')

  useEffect(() => {
    if (activeComponent?.current) {
      setIsVisible(true)
      const type = activeComponent.current.userData?.type || 'unknown'
      setComponentType(type)
    } else {
      setIsVisible(false)
      setComponentType('')
    }
  }, [activeComponent])

  const closeConfigurator = () => {
    setActiveComponent(null)
    setIsVisible(false)
  }

  const getPartName = () => {
    switch (componentType) {
      case 'joysticks':
        return 'Joysticks'
      case 'rotary':
        return 'Rotary Controls'
      case 'paddles':
        return 'Paddle Shifters'
      case 'buttons':
        return 'Control Buttons'
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

  const ColorTextOption = ({ color, isSelected, onClick }) => (
    <button
      onClick={onClick}
      className={`
        px-3 py-2 rounded-lg border transition-all duration-200 
        hover:scale-105 capitalize text-sm font-medium
        ${isSelected
          ? 'border-white bg-white/20 text-white shadow-white/50' 
          : 'border-white/30 text-white/80 hover:border-white/60 hover:text-white hover:bg-white/10'
        }
      `}
    >
      {color}
    </button>
  )

  // Render different configuration options based on component type
  const renderConfigurationOptions = () => {
    switch (componentType) {
      case 'joysticks':
        return (
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
        )

      case 'rotary':
        return (
          <div>
            <h3 className="text-lg font-semibold text-white mb-3">Rotary Color</h3>
            <div className="grid grid-cols-3 gap-2">
              {rotaryColor.map((color, index) => (
                <ColorTextOption
                  key={index}
                  color={color}
                  isSelected={selectedRotaryColor === color}
                  onClick={() => setSelectedRotaryColor(color)}
                />
              ))}
            </div>
            <p className="text-white/60 text-xs mt-2 capitalize">
              Selected: {selectedRotaryColor}
            </p>
          </div>
        )

      case 'paddles':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Paddle Shifters</h3>
            <p className="text-white/70 text-sm">
              Configuration options coming soon!
            </p>
            <p className="text-white/50 text-xs mt-2">
              Future options: Material, Finish, Size
            </p>
          </div>
        )

      case 'buttons':
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Control Buttons</h3>
            <p className="text-white/70 text-sm">
              Configuration options coming soon!
            </p>
            <p className="text-white/50 text-xs mt-2">
              Future options: LED Colors, Labels, Functions
            </p>
          </div>
        )

      default:
        return (
          <div className="text-center py-8">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <svg className="w-8 h-8 text-white/70" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">Component Selected</h3>
            <p className="text-white/70 text-sm">
              Configuration options not available for this component yet.
            </p>
          </div>
        )
    }
  }

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

          {/* Configuration Options - Component Specific */}
          <div className="p-6 space-y-6 max-h-96 overflow-y-auto">
            {renderConfigurationOptions()}
          </div>

          {/* Footer Actions - Only show reset if component has configurable options */}
          {(componentType === 'joysticks' || componentType === 'rotary') && (
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
          )}

          {/* Simple close button for components without configuration */}
          {componentType !== 'joysticks' && componentType !== 'rotary' && (
            <div className="p-6 border-t border-white/20">
              <button
                onClick={closeConfigurator}
                className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default ConfigureUI 
import React from 'react'

function ConfigureUI({ part }) {
  return (
    <div className="absolute h-64 w-56 top-1/3 right-10 rounded-lg p-4 backdrop-blur-md bg-white/20 border border-white/30 shadow-lg">
      <div className="text-white font-medium">
        {part ? `Configure ${part}` : 'Select a part'}
      </div>
      <div className="mt-2 text-white/80 text-sm">
        Click on wheel components to customize them
      </div>
    </div>
  )
}

export default ConfigureUI
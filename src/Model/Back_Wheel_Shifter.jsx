import React from 'react'

function Back_Wheel_Shifter({ geometry, material, position }) {
  return (
    <mesh
        name="back_wheel_shifter"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default Back_Wheel_Shifter
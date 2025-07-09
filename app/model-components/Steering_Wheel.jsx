import React from 'react'

function Steering_Wheel({ geometry, material, position }) {
  return (
    <mesh
        name="steering_wheel"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default Steering_Wheel
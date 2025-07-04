import React from 'react'

function Blue_Buttons({ geometry, material, position }) {
  return (
    <mesh
        name="blue_buttons"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
    )
}

export default Blue_Buttons
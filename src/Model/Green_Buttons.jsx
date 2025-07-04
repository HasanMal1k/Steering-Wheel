import React from 'react'

function Green_Buttons({geometry, material, position}) {
  return (
    <mesh
        name="green_buttons"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default Green_Buttons
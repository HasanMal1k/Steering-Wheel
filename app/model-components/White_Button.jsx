import React from 'react'

function White_Button({geometry, material, position}) {
  return (
    <mesh
        name="white_button" 
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default White_Button
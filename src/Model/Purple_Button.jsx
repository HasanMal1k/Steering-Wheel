import React from 'react'

function Purple_Button({geometry, material, position}) {
  return (
    <mesh
        name="purple_button"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default Purple_Button
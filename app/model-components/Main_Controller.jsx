import React from 'react'

function Main_Controller({ geometry, material, position }) {
  return (
    <mesh
        name="main_controller"
        castShadow
        receiveShadow
        geometry={geometry}
        material={material}
        position={position}
      />
  )
}

export default Main_Controller
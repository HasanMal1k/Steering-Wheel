
function Blue_Buttons({
    geometry_1, material_1, position_1,
    geometry_2, material_2, position_2,
    geometry_3, material_3, position_3,
    geometry_4, material_4, position_4,
    geometry_5, material_5, position_5}) {
  return (
    <>
    
    <mesh
        name="blue_buttons_1"
        castShadow
        receiveShadow
        geometry={geometry_1}
        material={material_1}
        position={position_1}
      />

      <mesh
        name="blue_buttons_2"
        castShadow
        receiveShadow
        geometry={geometry_2}
        material={material_2}
        position={position_2}
      />
      <mesh
        name="blue_buttons_3"
        castShadow
        receiveShadow
        geometry={geometry_3}
        material={material_3}
        position={position_3}
      />

      <mesh
        name="blue_buttons_4"
        castShadow
        receiveShadow
        geometry={geometry_4}
        material={material_4}
        position={position_4}
      />

      <mesh
        name="blue_buttons_5"
        castShadow
        receiveShadow
        geometry={geometry_5}
        material={material_5}
        position={position_5}
      />
    </>
    )
}

export default Blue_Buttons
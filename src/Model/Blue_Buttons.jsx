import React, { useEffect, useMemo, useState } from "react"
import { useConfigurationStore } from "../ConfigurationStore"


function Blue_Buttons({
    geometry_1, material_1, position_1,
    geometry_2, material_2, position_2,
    geometry_3, material_3, position_3,
    geometry_4, material_4, position_4,
    geometry_5, material_5, position_5}) {
    
    const activeComponent = useConfigurationStore(state => state.activeComponent)

    const clonedMaterial_1 = useMemo(() => material_1.clone(), [])
    const clonedMaterial_2 = useMemo(() => material_2.clone(), [])
    const clonedMaterial_3 = useMemo(() => material_3.clone(), [])
    const clonedMaterial_4 = useMemo(() => material_4.clone(), [])
    const clonedMaterial_5 = useMemo(() => material_5.clone(), [])
    
    useEffect(()=>{

        if(activeComponent){

            clonedMaterial_1.transparent = true
            clonedMaterial_1.opacity = 0.3

            clonedMaterial_2.transparent = true
            clonedMaterial_2.opacity = 0.3

            clonedMaterial_3.transparent = true
            clonedMaterial_3.opacity = 0.3

            clonedMaterial_4.transparent = true
            clonedMaterial_4.opacity = 0.3

            clonedMaterial_5.transparent = true
            clonedMaterial_5.opacity = 0.3
        }
        else{
            clonedMaterial_1.transparent = false
            clonedMaterial_1.opacity = 1

            clonedMaterial_2.transparent = false
            clonedMaterial_2.opacity = 1

            clonedMaterial_3.transparent = false
            clonedMaterial_3.opacity = 1

            clonedMaterial_4.transparent = false
            clonedMaterial_4.opacity = 1

            clonedMaterial_5.transparent = false
            clonedMaterial_5.opacity = 1
        }

    }, [activeComponent])



  return (
    <>
    
    <mesh
        name="blue_buttons_1"
        castShadow
        receiveShadow
        geometry={geometry_1}
        material={clonedMaterial_1}
        position={position_1}
        
      />

      <mesh
        name="blue_buttons_2"
        castShadow
        receiveShadow
        geometry={geometry_2}
        material={clonedMaterial_2}
        position={position_2}
      />
      <mesh
        name="blue_buttons_3"
        castShadow
        receiveShadow
        geometry={geometry_3}
        material={clonedMaterial_3}
        position={position_3}
      />

      <mesh
        name="blue_buttons_4"
        castShadow
        receiveShadow
        geometry={geometry_4}
        material={clonedMaterial_4}
        position={position_4}
      />

      <mesh
        name="blue_buttons_5"
        castShadow
        receiveShadow
        geometry={geometry_5}
        material={clonedMaterial_5}
        position={position_5}
      />
    </>
    )
}

export default Blue_Buttons
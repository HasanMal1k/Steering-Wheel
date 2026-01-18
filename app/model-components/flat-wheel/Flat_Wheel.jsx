import React, { useRef } from 'react'
import * as THREE from 'three'
import { Flat_Center_Plate } from './Flat_Center_Plate'
import { Flat_Alcantara_Rim } from './Flat_Alcantara_Rim'
import { Flat_Leather_Rim } from './Flat_Leather_Rim'
import { useConfigurationStore } from '../../utils/ConfigurationStore'

export function FlatWheel(props) {
  const selectedRimMaterial = useConfigurationStore(state => state.selectedRimMaterial)

  return (
    <group {...props}>
      <Flat_Center_Plate />
      {selectedRimMaterial === 'alcantara' && <Flat_Alcantara_Rim />}
      {selectedRimMaterial === 'leather' && <Flat_Leather_Rim />}
    </group>
  )
}

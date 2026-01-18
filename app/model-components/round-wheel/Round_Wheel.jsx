import React, { useRef } from 'react'
import * as THREE from 'three'
import { Round_Center_Plate } from './Round_Center_Plate'
import { Round_Alcantara_Rim } from './Round_Alcantara_Rim'
import { Round_Leather_Rim } from './Round_Leather_Rim'
import { useConfigurationStore } from '../../utils/ConfigurationStore'

export function RoundWheel(props) {
  const selectedRimMaterial = useConfigurationStore(state => state.selectedRimMaterial)

  return (
    <group {...props}>
      <Round_Center_Plate />
      {selectedRimMaterial === 'alcantara' && <Round_Alcantara_Rim />}
      {selectedRimMaterial === 'leather' && <Round_Leather_Rim />}
    </group>
  )
}

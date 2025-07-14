import React from 'react'
import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'

function useResponsiveScale() {
    const { viewport } = useThree()
    const scales = {
        'small': 0.5,
        'medium': 0.8,
        'large': 1
    }

    const breakpoints = {
        'small': 5,
        'medium': 8,
        'large': 10
    }




  const scale = useMemo(() =>{
    if (viewport.width <= breakpoints.small) return scales.small
    if (viewport.width <= breakpoints.medium ) return scales.medium
    if (viewport.width > breakpoints.medium ) return scales.large
  }, [viewport.width])

  return scale

}

export default useResponsiveScale
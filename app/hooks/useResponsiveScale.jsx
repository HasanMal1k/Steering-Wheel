import React from 'react'
import { useMemo } from 'react'
import { useThree } from '@react-three/fiber'

function useResponsiveScale() {
    const { size } = useThree() // Use size instead of viewport
    const scales = {
        'small': 0.5,
        'medium': 0.8,
        'large': 1
    }

    // Use window dimensions instead of viewport for breakpoints
    const breakpoints = {
        'small': 800,   // pixels
        'medium': 1200, // pixels
        'large': 1600   // pixels
    }

    const scale = useMemo(() => {
        const width = size.width
        if (width <= breakpoints.small) return scales.small
        if (width <= breakpoints.medium) return scales.medium
        if (width > breakpoints.medium) return scales.large
    }, [size.width]) // Use size.width instead of viewport.width

    return scale
}

export default useResponsiveScale
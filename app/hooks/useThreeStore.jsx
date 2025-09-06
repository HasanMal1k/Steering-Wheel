import React from 'react'
import { useScreenshotStore } from '../utils/ScreenshotStore'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function useThreeStore() {
    const { gl, scene, camera } = useThree() 
    const setThree = useScreenshotStore( state => state.setThree)

    useEffect(() => {
        setThree( gl, scene, camera )
    }, [ gl, scene, camera ])

    return (
        <></>
    )
}

export default useThreeStore
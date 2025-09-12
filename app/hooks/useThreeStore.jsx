import React from 'react'
import { useScreenshotStore } from '../utils/ScreenshotStore'
import { useThree } from '@react-three/fiber'
import { useEffect } from 'react'

function useThreeStore() {
    const { gl, scene, camera, controls } = useThree() 
    const setThree = useScreenshotStore( state => state.setThree)

    useEffect(() => {
        setThree( gl, scene, camera, controls )
    }, [ gl, scene, camera, controls ])

    return (
        <></>
    )
}

export default useThreeStore
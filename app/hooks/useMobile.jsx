import React, { useEffect, useState } from 'react'

function useMobile(breakpoint = 1000) {
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        const handleResize = () =>{
            setIsMobile(window.innerWidth < breakpoint)
        }

        window.addEventListener('resize', handleResize)

        handleResize()

        return () => window.removeEventListener('resize', handleResize)

}, [])

    return isMobile

}

export default useMobile
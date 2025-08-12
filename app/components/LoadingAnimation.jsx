import React, { useRef, useEffect } from 'react'
import { Progress } from './ui/progress'
import { useAnimationStore } from '../utils/AnimationStore'
import Link from 'next/link'
import Image from 'next/image'

function LoadingAnimation({ progressValue }) {
    const loadingComplete = useAnimationStore( state => state.loadingComplete )
    const handleLoadingComplete = useAnimationStore( state => state.handleLoadingComplete )

    useEffect(() => {
        if(progressValue == 100){
            handleLoadingComplete(true)
        }
    }, [progressValue])

    return (
        <div className='bg-black z-[1000] h-screen w-full absolute top-0 left-0 flex items-center justify-center overflow-hidden px-4'>

            {/* Our Logo */}
            <div className='flex items-center justify-center flex-col gap-10'>
                <div className='flex items-center justify-center gap-5'>
                    <Link href="https://tripleseven-na.com/" target="_blank" rel="noopener noreferrer">
                    <Image 
                    src="/images/logo.png" 
                    width={150} 
                    height={140} 
                    alt="777 Performance" 
                    priority 
                    className="w-20 h-auto sm:w-24 md:w-32 lg:w-[150px]"
                    />
                    </Link>
                
                    <div className="w-px h-8 sm:h-12 md:h-16 bg-[#f6f6f6]"></div>
                
                    <h1 className='text-[#f6f6f6] text-sm sm:text-lg md:text-2xl font-light font-sans tracking-wide'
                        style={{fontFamily: 'var(--font-geist-sans)'}}>
                        <span className="hidden sm:inline">Wheel Configurator</span>
                        <span className="sm:hidden">Configurator</span>
                    </h1>
                </div>
                <div className='flex items-center justify-center flex-col w-full gap-2'>
                    <Progress value={progressValue} className={'max-w-64'}/>
                    {/* <h1 className='pt-1 font-light text-lg tracking-wide' style={{fontFamily: 'var(--font-geist-sans)'}}>{`${Math.round(progressValue)}`}</h1> */}
                </div>
            </div>

            {/* Loading bar */}
            

        </div>
    )
}

export default LoadingAnimation
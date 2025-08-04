import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'
import { useAnimationStore } from '../utils/AnimationStore'

gsap.registerPlugin(SplitText)

function LoadingAnimation() {
    const textRef1 = useRef(null)
    const textRef2 = useRef(null)
    const loadingComplete = useAnimationStore( state => state.loadingComplete )
    const handleLoadingComplete = useAnimationStore( state => state.handleLoadingComplete )

    useEffect(() => {
        const split1 = new SplitText(textRef1.current, {
            type: 'words, chars'
        });
        
        const split2 = new SplitText(textRef2.current, {
            type: 'words, chars'
        })
        
        const totalAnimation = gsap.timeline({
            delay: 3
        })
        
        totalAnimation
            .to(split1.chars, {
                y: -100,
                autoAlpha: 0,
                stagger: {
                    amount: 0.5,
                    from: 'start',
                },
                duration: 1,
                ease: "power2.out"
            })
            .to({}, { duration: 0.3 })
            .set(textRef2.current,   { display: 'block' })
            .fromTo(split2.chars, 
                {
                    y: 100,
                    autoAlpha: 0
                }, 
                {
                    y: 0,
                    autoAlpha: 1,
                    stagger: {
                        amount: 0.3,
                        from: 'end',
                    },
                    duration: 0.8,
                    ease: "power2.out"
                }
            )
            .to({}, {duration: 1.5})
            .call(() => handleLoadingComplete(true))
                
    }, [])

    console.log('loading', loadingComplete)

    return (
        <div className='bg-black z-[1000] h-screen w-full absolute top-0 left-0 flex items-center justify-center overflow-hidden px-4'>
        <div className='text-[#f6f6f6] text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-center font-bold relative overflow-hidden whitespace-nowrap uppercase cursor-pointer max-w-full'>
            <div className='overflow-clip'>
                <p ref={textRef1} style={{fontFamily: 'var(--font-geist-sans)'}} className='font-medium'>
                    Triple Seven
                </p>
                <p ref={textRef2} style={{fontFamily: 'var(--font-geist-sans)'}} className='font-medium hidden'>
                    Wheel Configurator
                </p>
            </div>
        </div>
    </div>
    )
}

export default LoadingAnimation
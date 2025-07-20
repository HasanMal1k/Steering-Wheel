import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import SplitText from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

function LoadingAnimation() {

    // useEffect(() => {
    //     if (textRef.current) {
    //         const split = new SplitText(textRef.current, {
    //             type: 'words, chars'
    //         })

    //         gsap.from(split.chars, {
    //             y: 100,
    //             autoAlpha: 0,
    //             stagger: {
    //                 amount: 0.5,
    //                 from: 'start',
    //             },
    //             duration: 1,
    //             ease: "power2.out"
    //         })

    //         // Add event listeners inside useEffect
    //         const handleMouseEnter = () => {
    //             gsap.to(textRef.current, {
    //                 y: 10,
    //                 clipPath: "inset(0% 0% 30% 0%)",
    //                 duration: 0.3,
    //                 ease: "power2.out"
    //             })
    //         }

    //         const handleMouseLeave = () => {
    //             gsap.to(textRef.current, {
    //                 y: 0,
    //                 clipPath: "inset(0% 0% 0% 0%)",
    //                 duration: 0.3,
    //                 ease: "power2.out"
    //             })
    //         }

    //         textRef.current.addEventListener('mouseenter', handleMouseEnter)
    //         textRef.current.addEventListener('mouseleave', handleMouseLeave)

    //         return () => {
    //             split.revert()
    //             // Clean up event listeners
    //             if (textRef.current) {
    //                 textRef.current.removeEventListener('mouseenter', handleMouseEnter)
    //                 textRef.current.removeEventListener('mouseleave', handleMouseLeave)
    //             }
    //         }
    //     }
    // }, [])

    const textRef1 = useRef(null)
    const textRef2 = useRef(null)

    useEffect(() => {
        const split1 = new SplitText(textRef1.current, {
            type: 'words, chars'
        });
        
        const split2 = new SplitText(textRef2.current, {
            type: 'words, chars'
        })

        

        const handleMouseEnter = () => {
        gsap.to(split1.chars, {
            y: -100,
            autoAlpha: 0,
            stagger: {
                amount: 0.5,
                from: 'start',
            },
            duration: 1,
            ease: "power2.out"
        }).then(() => {
            gsap.set(textRef2.current, { display: 'block' })

            gsap.fromTo(split2.chars,
                
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
        })
    }

        textRef1.current.addEventListener('mouseenter', handleMouseEnter)

    }, [])


    return (
        <div className='bg-black z-[100] h-screen w-full absolute flex items-center justify-center overflow-hidden'>
            
                <div  className='text-white text-5xl text-center font-bold relative overflow-hidden whitespace-nowrap uppercase cursor-pointer'>
                    <div className='overflow-clip'>
                        <p ref={textRef1}>Triple Seven</p>
                        <p ref={textRef2} className='hidden'>Wheel Configurator</p>
                    </div>
                </div>
            
        </div>
    )
}

export default LoadingAnimation
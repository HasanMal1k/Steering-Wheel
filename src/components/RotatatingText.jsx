// Component for adding the rotating text when hovered over buttons, paddles etc
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import './CircularText.css'



function RotatingText() {
  const textRef = useRef(null)
  const containerRef = useRef(null)
  
  // Define the text to repeat three times (with space after each phrase)
  const phrase = "EDIT THIS   "
  const repeatedText = phrase.repeat(3)
  
  // Split text into individual characters
  const chars = repeatedText.split('')
  const totalChars = chars.length
  
  // Calculate inner angle in radians for JS calculations
  const innerAngle = (360 / totalChars) * (Math.PI / 180)
  
  // Calculate radius based on character width
  // Assumed character width of 1ch
  const characterWidth = 1
  const calculatedRadius = characterWidth / Math.sin(innerAngle)
  
  useEffect(() => {
    if (containerRef.current) {
      
      gsap.fromTo(containerRef.current, 
        {opacity: 0},
        {opacity: 1, duration: 1, ease: 'power2.out'}
      )

      // Create rotation animation with GSAP
      gsap.to(containerRef.current, {
        rotation: '+=360',
        duration: 14,
        repeat: -1,
        ease: "linear",
      })
    }
  })

  useEffect(() => {
    
    document.addEventListener('mousemove', (e) => {
      
      if(containerRef.current){

      // const rect = containerRef.current.getBoundingClientRect()
      // const halfWidth = rect.width / 2
      // const halfHeight = rect.height / 2

      gsap.to(containerRef.current, {
        left: e.clientX ,
        top: e.clientY ,
        duration: 0.2,
        ease: 'linear'
      })
    }
    })

  }, [])




  return (
    <>
      <div center ref={textRef} className='text-white pointer-events-none absolute top-0 left-0'>
        <div 
          className="text-ring"
          ref={containerRef}
          style={{ 
            '--total': totalChars,
            '--radius': calculatedRadius * 10, // Multiply by scaling factor for better visibility
            '--character-width': characterWidth,
          
          }}
        >
          {chars.map((char, index) => {
            // Visually distinguish each "EDIT THIS" phrase
            const phraseIndex = Math.floor(index / phrase.length)
            const colors = ['#ffffff', '#ffffff', '#ffffff']
            const color = colors[phraseIndex % colors.length]
            
            return (
              <span 
                key={index} 
                className="character" 
                style={{ 
                  '--index': index,
                  color: color
                }}
              >
                {char}
              </span>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default RotatingText
// Component for adding the rotating text when hovered over buttons, paddles etc
import React, { useRef, useEffect } from 'react'
import gsap from 'gsap'
import './CircularText.css'
import { useTextStore } from '../TextStore'

function RotatingText() {
  const textRef = useRef(null)
  const containerRef = useRef(null)
  const textVisiblity = useTextStore(state => state.text)
  const rotationTween = useRef(null)

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

  // Initialize rotation animation and position following
  useEffect(() => {
    if (containerRef.current) {
      // Start continuous rotation
      rotationTween.current = gsap.to(containerRef.current, {
        rotation: '+=360',
        duration: 14,
        repeat: -1,
        ease: "linear",
      })

      // Set up mouse following
      const handleMouseMove = (e) => {
        if (containerRef.current) {
          gsap.to(containerRef.current, {
            left: e.clientX,
            top: e.clientY,
            duration: 0.2,
            ease: 'power2.out'
          })
        }
      }

      document.addEventListener('mousemove', handleMouseMove)

      return () => {
        document.removeEventListener('mousemove', handleMouseMove)
        if (rotationTween.current) {
          rotationTween.current.kill()
        }
      }
    }
  }, [])

  // Handle visibility changes with smooth animations
  useEffect(() => {
    if (!containerRef.current) return

    if (textVisiblity) {
      // Fade in smoothly without scale
      gsap.fromTo(containerRef.current, 
        { 
          opacity: 0,
          filter: 'blur(10px)'
        },
        { 
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          ease: 'power3.out'
        }
      )
    } else {
      // Fade out smoothly without scale
      gsap.to(containerRef.current, {
        opacity: 0,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power2.in'
      })
    }
  }, [textVisiblity])

  return (
    <>
      <div center ref={textRef} className="text-white pointer-events-none absolute top-0 left-0 transition-all duration-100">
        <div 
          className="text-ring"
          ref={containerRef}
          style={{ 
            '--total': totalChars,
            '--radius': calculatedRadius * 10, // Multiply by scaling factor for better visibility
            '--character-width': characterWidth,
            opacity: 0, // Start invisible, GSAP will handle visibility
            transform: 'translate(-50%, -50%)'
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
                className="character transition-all duration-300" 
                style={{ 
                  '--index': index,
                  color: color,
                  textShadow: '0 0 10px rgba(255, 255, 255, 0.5)'
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
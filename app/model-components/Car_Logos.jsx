import React from 'react'
import { useGLTF } from '@react-three/drei'
import { useConfigurationStore } from '../utils/ConfigurationStore'
import { useTextStore } from '../utils/TextStore'
import { Toyota } from './logos/Toyota'
import { Volkswagen } from './logos/Volkswagen'
import { Nissan } from './logos/Nissan'
import { Acura } from './logos/Acura'
import { Audi } from './logos/Audi'
import { BMW } from './logos/BMW'
import { Corvette } from './logos/Corvette'
import { Ford } from './logos/Ford'
import { Honda } from './logos/Honda'
import { Hyundai } from './logos/Hyundai'
import { Lamborghini } from './logos/Lamborghini'
import { Lexus } from './logos/Lexus'
import { Mazda } from './logos/Mazda'
import { Mercedes } from './logos/Mercedes'
import { Mini } from './logos/Mini'
import { Mustang } from './logos/Mustang'
import { Porsche } from './logos/Porsche'
import { Subaru } from './logos/Subaru'
import { Mitsubishi } from './logos/Mitsubishi'

function Car_Logos() {

    // Preload all logos to ensure they are available before the scene is fully loaded
    useGLTF([
        '/car-logos/Toyota.glb',
        '/car-logos/Volkswagen.glb',
        '/car-logos/Nissan.glb',
        '/car-logos/Acura.glb',
        '/car-logos/Audi.glb',
        '/car-logos/BMW.glb',
        '/car-logos/Corvette.glb',
        '/car-logos/Ford.glb',
        '/car-logos/Honda.glb',
        '/car-logos/Hyundai.glb',
        '/car-logos/Lamborghini.glb',
        '/car-logos/Lexus.glb',
        '/car-logos/Mazda.glb',
        '/car-logos/Mercedes.glb',
        '/car-logos/Mini.glb',
        '/car-logos/Mustang.glb',
        '/car-logos/Porsche.glb',
        '/car-logos/Subaru.glb',
        '/car-logos/Mitsubishi.glb'
    ])

    const selectedHubLogo = useConfigurationStore(state => state.selectedHubLogo)
    const selectedWheelType = useConfigurationStore(state => state.selectedWheelType)
    const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
    const enableText = useTextStore(state => state.enableText)
    const disableText = useTextStore(state => state.disableText)

    const handleLogoClick = (e) => {
        e.stopPropagation()
        setActiveComponent('hub')
    }

    const handlePointerOver = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'pointer'
        // Store original color if not already stored
        if (!e.object.userData.originalColor) {
             e.object.userData.originalColor = e.object.material.color.clone()
        }
        e.object.material.color.set('#ffffff') 
        enableText()
    }

    const handlePointerOut = (e) => {
        e.stopPropagation()
        document.body.style.cursor = 'auto'
        if (e.object.userData.originalColor) {
             e.object.material.color.copy(e.object.userData.originalColor)
        }
        disableText()
    }

    if (selectedWheelType === 'hub') {
        switch (selectedHubLogo) {
            case null:
                return null
            
            case 'acura':
                return (
                    // TODO: Configure Hub Only positioning
                    <Acura 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={50} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />  
                )
            
            case 'audi':
                return (
                    // TODO: Configure Hub Only positioning
                    <Audi 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={100} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )

            case 'bmw':
                return (
                    // TODO: Configure Hub Only positioning
                    <BMW 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )

            case 'corvette':
                return (
                    // TODO: Configure Hub Only positioning
                    <Corvette 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'ford':
                return (
                    // TODO: Configure Hub Only positioning
                    <Ford 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={90} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />                           
                )    
            case 'honda':
                return (
                    // TODO: Configure Hub Only positioning
                    <Honda 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'hyundai':
                return (
                    // TODO: Configure Hub Only positioning
                    <Hyundai 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI, Math.PI, Math.PI ]} 
                        scale={1} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'lamborghini':
                return (
                    // TODO: Configure Hub Only positioning
                    <Lamborghini 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'lexus':
                return (
                    // TODO: Configure Hub Only positioning
                    <Lexus 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'mazda':
                return (
                    // TODO: Configure Hub Only positioning
                    <Mazda 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'mercedes':
                return (
                    // TODO: Configure Hub Only positioning
                    <Mercedes 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'mini':
                return (
                    // TODO: Configure Hub Only positioning
                    <Mini 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={90} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            
            case 'nissan':
                return (
                    // TODO: Configure Hub Only positioning
                    <Nissan 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'mustang':
                return (
                    // TODO: Configure Hub Only positioning
                    <Mustang 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )
                  
            case 'mitsubishi':
                return (
                    // TODO: Configure Hub Only positioning
                    <Mitsubishi 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI, Math.PI * 2.169, Math.PI ]} 
                            scale={4} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )
            case 'porsche':
                return (
                    // TODO: Configure Hub Only positioning
                    <Porsche 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'subaru':
                return (
                    // TODO: Configure Hub Only positioning
                    <Subaru 
                        castShadow
                        receiveShadow
                        position={[0, -7.8, 0]} 
                        rotation={[ Math.PI , Math.PI, Math.PI ]} 
                        scale={1} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'toyota':
                return (
                    // TODO: Configure Hub Only positioning
                    <Toyota 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI, Math.PI, Math.PI ]} 
                        scale={1} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            case 'volkswagen':
                return (
                    // TODO: Configure Hub Only positioning
                    <Volkswagen 
                        castShadow
                        receiveShadow
                        position={[0, 1.2, 0]} 
                        rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                        scale={60} 
                        onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                )    
            default:
                return null
        }
    }

    switch (selectedHubLogo){
        case null:
            return null
        
        case 'acura':
            return (
                <>
                  <Acura 
                    castShadow
                    receiveShadow
                    position={[0, 8.3, 0]} 
                    rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                    scale={50} 
                    onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />  
                </>
            )
        
        case 'audi':
            return (
                <>
                <Audi 
                castShadow
                receiveShadow
                position={[0, 8, 0]} 
                rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                scale={100} 
                onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                />
                </>
            )

        case 'bmw': 
            return (
                <>
                    <BMW 
                    castShadow
                    receiveShadow
                    position={[0, 8, 0]} 
                    rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                    scale={60} 
                    onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                </>
            )

        case 'corvette':
            return (
                <>
                    <Corvette 
                    castShadow
                    receiveShadow
                    position={[0, 8, -4]} 
                    rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                    scale={60} 
                    onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                    />
                </>
            )    
        case 'ford':
            return (
                <>
                         <Ford 
                            castShadow
                            receiveShadow
                            position={[0, 8, 0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={90} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />                           
                    
                </>
            )    
        case 'honda':
            return (
                <>
                     <Honda 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'hyundai':
            return (
                <>
                   <Hyundai 
                           castShadow
                           receiveShadow
                           position={[0, 8, 0]} 
                           rotation={[ Math.PI, Math.PI, Math.PI ]} 
                           scale={1} 
                           onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                           />
                </>
            )    
        case 'lamborghini':
            return (
                <>
                    <Lamborghini 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'lexus':
            return (
                <>
                     <Lexus 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'mazda':
            return (
                <>
                    <Mazda 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'mercedes':
            return (
                <>
                   <Mercedes 
                           castShadow
                           receiveShadow
                           position={[0, 7.6, -0]} 
                           rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                           scale={60} 
                           onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                           />
                </>
            )    
        case 'mini':
            return (
                <>
                    <Mini 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={90} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        
        case 'mitsubishi':
            return (
                <>
                    <Mitsubishi 
                            castShadow
                            receiveShadow
                            position={[0, 9, -0]} 
                            rotation={[ Math.PI, Math.PI * 2.169, Math.PI ]} 
                            scale={4} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )

        case 'nissan':
            return (
                <>
                    <Nissan 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'mustang':
            return (
                <>
                    <Mustang 
                            castShadow
                            receiveShadow
                            position={[0, 7.4, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'porsche':
            return (
                <>
                    <Porsche 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'subaru':
            return (
                <>
                    <Subaru 
                            castShadow
                            receiveShadow
                            position={[0, -1, 0]} 
                            rotation={[ Math.PI , Math.PI, Math.PI ]} 
                            scale={1} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'toyota':
            return (
                <>
                    <Toyota 
                            castShadow
                            receiveShadow
                            position={[0, 8.3, 0]} 
                            rotation={[ Math.PI, Math.PI, Math.PI ]} 
                            scale={1} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        case 'volkswagen':
            return (
                <>
                     <Volkswagen 
                            castShadow
                            receiveShadow
                            position={[0, 8.3, 0]} 
                            rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                            scale={60} 
                            onClick={handleLogoClick}
                        onPointerOver={handlePointerOver}
                        onPointerOut={handlePointerOut}
                            />
                </>
            )    
        default:
            return null
    }


}

export default Car_Logos
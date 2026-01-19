import React from 'react'
import { useConfigurationStore } from '../utils/ConfigurationStore'
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

    const selectedHubLogo = useConfigurationStore(state => state.selectedHubLogo)
    const selectedWheelType = useConfigurationStore(state => state.selectedWheelType)

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
                    scale={50} />  
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
                scale={100} />
                </>
            )

        case 'bmw': Porsche
            return (
                <>
                    <BMW 
                    castShadow
                    receiveShadow
                    position={[0, 8, 0]} 
                    rotation={[ Math.PI * 0.5, Math.PI, Math.PI ]} 
                    scale={60} />
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
                    scale={60} />
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
                            scale={90} />                           
                    
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
                            scale={60} />
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
                           scale={1} />
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
                            scale={60} />
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
                            scale={60} />
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
                            scale={60} />
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
                           scale={60} />
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
                            scale={90} />
                </>
            )    
        
        case 'mitsubishi':
            return (
                <>
                    <Mitsubishi 
                            castShadow
                            receiveShadow
                            position={[0, 7.6, -0]} 
                            rotation={[ Math.PI, Math.PI * 2.169, Math.PI ]} 
                            scale={4} />
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
                            scale={60} />
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
                            scale={60} />
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
                            scale={60} />
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
                            scale={1} />
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
                            scale={1} />
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
                            scale={60} />
                </>
            )    
        default:
            return null
    }


}

export default Car_Logos
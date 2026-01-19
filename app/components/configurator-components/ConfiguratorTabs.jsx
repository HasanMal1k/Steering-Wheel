import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
import { useConfigurationStore } from '../../utils/ConfigurationStore';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';

function ConfiguratorTabs() {
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)
  const tabsRef = useRef(null)

  useEffect(() => {
    if (!activeComponent) {
      gsap.to(tabsRef.current, {
        autoAlpha: 1, // handles opacity + visibility
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power3.out',
      })
    } else {
      gsap.to(tabsRef.current, {
        autoAlpha: 0,
        y: 20,
        scale: 0.95,
        filter: 'blur(10px)',
        duration: 0.5,
        ease: 'power3.in',
      })
    }
  }, [activeComponent])

  const handleTabChange = (value) => {
    if (value === 'default') {
      setActiveComponent(null)
    } else {
      setActiveComponent(value)
    }
  }

  // Map activeComponent to tab value, default to 'default' if null
  const currentValue = activeComponent || 'default';

  return (
    <div 
        ref={tabsRef}
        className='absolute bottom-[5%] md:bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-[95%] md:w-auto flex justify-center'
    >
      <Tabs 
        value={currentValue} 
        onValueChange={handleTabChange}
        className="w-full md:w-auto"
      >
          <TabsList 
            className='h-12 md:h-14 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl overflow-x-auto w-full md:w-auto flex flex-nowrap scrollbar-hide justify-start md:justify-center'
            style={{ fontFamily: 'var(--font-michroma)' }}
          >
            <TabsTrigger value="wheelType" className='h-full text-sm md:text-base px-3 md:px-6 flex-shrink-0 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Steering Wheel</TabsTrigger>
            <TabsTrigger value="hub" className='h-full text-sm md:text-base px-3 md:px-6 flex-shrink-0 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Make</TabsTrigger>
            {/* <TabsTrigger value="rotary" className='h-full text-sm md:text-base px-3 md:px-6 flex-shrink-0 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Rotary</TabsTrigger>
            <TabsTrigger value="joysticks" className='h-full text-sm md:text-base px-3 md:px-6 flex-shrink-0 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Joystick</TabsTrigger> */}
          </TabsList>
      </Tabs>
    </div>
  )
}

export default ConfiguratorTabs
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';
import { useConfigurationStore } from '../../utils/ConfigurationStore';

function ConfiguratorTabs() {
  const activeComponent = useConfigurationStore(state => state.activeComponent)
  const setActiveComponent = useConfigurationStore(state => state.setActiveComponent)

  const handleTabChange = (value) => {
    if (value === 'default') {
      setActiveComponent(null)
    } else {
      setActiveComponent(value)
    }
  }

  // Map activeComponent to tab value, default to 'default' if null
  // If activeComponent is something else (like 'paddles'), it won't match any tab
  // which effectively unselects the tabs, which is probably correct behavior
  // unless we want to group 'paddles' under 'wheelType' or something.
  const currentValue = activeComponent || 'default';

  return (
    <Tabs 
      value={currentValue} 
      onValueChange={handleTabChange}
      className='absolute bottom-[10%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-50'
    >
        <TabsList className='h-14 bg-black/60 backdrop-blur-xl border border-white/10 p-1.5 rounded-xl'>
          <TabsTrigger value="default" className='h-full text-base px-6 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Default</TabsTrigger>
          <TabsTrigger value="wheelType" className='h-full text-base px-6 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Steering Wheel</TabsTrigger>
          <TabsTrigger value="hub" className='h-full text-base px-6 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Make</TabsTrigger>
          <TabsTrigger value="rotary" className='h-full text-base px-6 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Rotary</TabsTrigger>
          <TabsTrigger value="joysticks" className='h-full text-base px-6 data-[state=active]:bg-white/20 data-[state=active]:text-white'>Joystick</TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ConfiguratorTabs
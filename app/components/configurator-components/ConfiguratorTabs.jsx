import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from '@/components/animate-ui/components/radix/tabs';

function ConfiguratorTabs() {
  return (
    <Tabs defaultValue="account" typ className='absolute bottom-15 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        <TabsList className={'h-12'}>
          <TabsTrigger value="account1" className='h-10 text-md'>Default</TabsTrigger>
          <TabsTrigger value="password2" className='h-10 text-md'>Steering Wheel</TabsTrigger>
          <TabsTrigger value="account3" className='h-10 text-md'>Make</TabsTrigger>
          <TabsTrigger value="password4" className='h-10 text-md'>Rotary</TabsTrigger>
          <TabsTrigger value="password5" className='h-10 text-md'>Joystick</TabsTrigger>
        </TabsList>
    </Tabs>
  )
}

export default ConfiguratorTabs
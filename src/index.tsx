import { createDrawerNavigator } from '@react-navigation/drawer'
import { createStackNavigator } from '@react-navigation/stack'
import React from 'react'
import Sidebar from './components/sidebar'
import AboutScreen from './screens/about-screen'
import FeaturedScreen from './screens/featured-programs'
import MainScreen from './screens/main-screen'
import Profile from './screens/profile'
import ProgramsScreen from './screens/programs-screen'
const Drawer = createDrawerNavigator()
const Stack = createStackNavigator()

function ProgramsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Find Program "
        component={ProgramsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Featured"
        component={FeaturedScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
const App = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Main"
      drawerContent={props => <Sidebar {...props} />}
      screenOptions={{
        headerShown: false,
        drawerType: 'back',
        overlayColor: '#00000000',
      }}
    >
      <Drawer.Screen name="Main" component={MainScreen} />
      <Drawer.Screen name="About" component={AboutScreen} />
      <Drawer.Screen name="Programs" component={ProgramsNav} />
      <Drawer.Screen name="Profile" component={Profile} />
    </Drawer.Navigator>
  )
}

export default App

import { NavigationContainer } from '@react-navigation/native'
import { NativeBaseProvider } from 'native-base'
import * as React from 'react'
import theme from '../theme'

type Props = {
  children: React.ReactNode
}
const config = {
  dependencies: {
    'linear-gradient': require('expo-linear-gradient').LinearGradient,
  },
}

export default function AppContainer(props: Props) {
  return (
    <NavigationContainer>
      <NativeBaseProvider theme={theme} config={config}>
        {props.children}
      </NativeBaseProvider>
    </NavigationContainer>
  )
}

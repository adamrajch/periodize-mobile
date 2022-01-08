import { Text, useColorModeValue } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import NavBar from '../components/navbar'

export default function MainScreen() {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.900')}
      w="full"
    >
      <Masthead title="Periodize!" image={require('../assets/masthead.png')}>
        <NavBar />
      </Masthead>
      <Text>Hello </Text>
    </AnimatedColorBox>
  )
}

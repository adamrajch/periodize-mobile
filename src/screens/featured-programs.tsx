import { ScrollView, useColorModeValue } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'

const FeaturedScreen = ({ navigation }: any) => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="Featured!!!"
        image={require('../assets/about-masthead.png')}
      >
        <Navbar />
      </Masthead>
      <ScrollView
        borderTopLeftRadius="10px"
        borderTopRightRadius="10px"
        // bg={useColorModeValue('warmGray.200', 'primary.700')}
        bg={useColorModeValue('warmGray.50', 'primary.700')}
        mt="-20px"
        pt="30px"
        p={2}
      ></ScrollView>
    </AnimatedColorBox>
  )
}

export default FeaturedScreen

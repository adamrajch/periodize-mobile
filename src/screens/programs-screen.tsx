import { Ionicons } from '@expo/vector-icons'
import {
  Box,
  HStack,
  Icon,
  ScrollView,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import AnimatedColorBox from '../components/animated-color-box'
import Masthead from '../components/masthead'
import Navbar from '../components/navbar'
const pages = [
  {
    title: 'Featured',
    href: 'Featured',
    text: "The community's finest",
    color: '#0B7285',
  },
  {
    title: 'Powerlifting',
    href: '/programs/category/powerlifting',
    text: 'Squat Bench Deadlift Specific programs.  Heavier loads, lesser volume, with an emphasis on the main movements',
    color: '#E03131',
  },
  {
    title: 'Bodybuilding',
    href: '/programs/category/bodybuilding',
    text: 'Aesthetics first. Lots of volume and exercise variation. Effective at adding muscle mass ',
    color: '#2F9E44',
  },
  {
    title: 'Weightlifting',
    href: '/programs/category/weightlifting',
    text: 'Clean and Jerk and Snatch. Highly technical, expect many squats, overhead pressing movements, and singles of the main lifts',
    color: '#1971C2',
  },
  {
    title: 'Sport',
    href: '/programs/category/sport',
    text: 'Specific programs for various athletes. Power, speed, endurance, coordination, and sport specific drills',
    color: '#C2255C',
  },
  {
    title: 'Mobility',
    href: '/programs/category/mobility',
    text: ' Emphasis on strength and ability to move through a given range of motion. Mobility has huge benefit and carryover to performance in various activities',
    color: '#4b3097',
  },
]
const ProgramsScreen = ({ navigation }: any) => {
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <Masthead
        title="Programs"
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
      >
        <HStack
          space={2}
          style={{ flexWrap: 'wrap' }}
          alignItems="center"
          justifyContent="center"
        >
          {pages.map(page => (
            <Pressable
              onPress={() => {
                navigation.navigate(page.href)
              }}
            >
              <Box
                height="130px"
                w="115px"
                bgColor={page.color}
                borderRadius="md"
                pt="4"
                px="2"
                mt="4"
                shadow="9"
                // style={{shadowColor:}}
              >
                <VStack flex={1} space={4}>
                  <Icon as={Ionicons} name="home" color="white" />
                  <Text color="white" fontSize="md" fontWeight="medium">
                    {page.title}
                  </Text>
                </VStack>
              </Box>
            </Pressable>
          ))}
        </HStack>
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default ProgramsScreen

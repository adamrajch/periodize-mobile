import { Ionicons } from '@expo/vector-icons'
import { Box, Icon, Text, VStack } from 'native-base'
import React from 'react'
import { Pressable } from 'react-native'
import PageContainer from '../components/page-container'
const pages = [
  {
    title: 'Featured',
    href: 'featured',
    text: "The community's finest",
    color: '#0B7285',
  },
  {
    title: 'Powerlifting',
    href: 'powerlifting',
    text: 'Squat Bench Deadlift Specific programs.  Heavier loads, lesser volume, with an emphasis on the main movements',
    color: '#E03131',
  },
  {
    title: 'Bodybuilding',
    href: 'bodybuilding',
    text: 'Aesthetics first. Lots of volume and exercise variation. Effective at adding muscle mass ',
    color: '#2F9E44',
  },
  {
    title: 'Weightlifting',
    href: 'weightlifting',
    text: 'Clean and Jerk and Snatch. Highly technical, expect many squats, overhead pressing movements, and singles of the main lifts',
    color: '#1971C2',
  },
  {
    title: 'Sport',
    href: 'sport',
    text: 'Specific programs for various athletes. Power, speed, endurance, coordination, and sport specific drills',
    color: '#C2255C',
  },
  {
    title: 'Mobility',
    href: 'mobility',
    text: ' Emphasis on strength and ability to move through a given range of motion. Mobility has huge benefit and carryover to performance in various activities',
    color: '#4b3097',
  },
]
const ProgramsScreen = ({ navigation }: any) => {
  return (
    <PageContainer>
      <VStack space={4} alignItems="center" justifyContent="center">
        {pages.map(page => (
          <Pressable
            style={{ width: '100%' }}
            onPress={() => {
              navigation.navigate('Category', {
                title: page.title,
                fetchUrl: page.href,
              })
            }}
            key={page.href}
          >
            <Box
              height="130px"
              w="full"
              bgColor={page.color}
              borderRadius="md"
              p="4"
              shadow="9"
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
      </VStack>
    </PageContainer>
  )
}

export default ProgramsScreen

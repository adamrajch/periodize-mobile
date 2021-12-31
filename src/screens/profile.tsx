import { Center, ScrollView, Spinner, useColorModeValue } from 'native-base'
import React from 'react'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import ProfileForm from '../components/profile-form'
import { useAuth } from '../context/auth'

const Profile = () => {
  const { user, loading } = useAuth()

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
      w="full"
    >
      <ScrollView
        borderTopLeftRadius="20px"
        borderTopRightRadius="20px"
        bg={useColorModeValue('warmGray.50', 'primary.900')}
        mt="-20px"
        pt="30px"
        p={4}
      >
        <Navbar />
        {loading ? (
          <Center>
            <Spinner accessibilityLabel="Loading profile" />
          </Center>
        ) : (
          <ProfileForm user={user} />
        )}
      </ScrollView>
    </AnimatedColorBox>
  )
}

export default Profile

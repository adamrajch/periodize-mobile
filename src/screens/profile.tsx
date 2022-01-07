import { Center, ScrollView, Spinner, useColorModeValue } from 'native-base'
import React from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AnimatedColorBox from '../components/animated-color-box'
import Navbar from '../components/navbar'
import ProfileForm from '../components/profile-form'
import { useAuth } from '../context/auth'

const Profile = () => {
  const { user, loading } = useAuth()

  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'primary.800')}
      w="full"
    >
      <KeyboardAwareScrollView
        contentContainerStyle={{ flex: 1 }}
        style={{ width: '100%' }}
        keyboardShouldPersistTaps="handled"
      >
        <ScrollView
          borderTopLeftRadius="20px"
          borderTopRightRadius="20px"
          bg={useColorModeValue('warmGray.50', 'primary.800')}
          mt="-20px"
          pt="30px"
          p={4}
        >
          <Navbar />
          {/* <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            textAlign="center"
          >
            Profile
          </Heading> */}
          {loading ? (
            <Center>
              <Spinner accessibilityLabel="Loading profile" />
            </Center>
          ) : (
            <ProfileForm user={user} />
          )}
        </ScrollView>
      </KeyboardAwareScrollView>
    </AnimatedColorBox>
  )
}

export default Profile

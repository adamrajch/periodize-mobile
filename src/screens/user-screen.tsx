import {
  Avatar,
  Box,
  Heading,
  Image,
  ScrollView,
  useColorModeValue,
} from 'native-base'
import React, { ReactElement, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import AnimatedColorBox from '../components/animated-color-box'
import NavBar from '../components/navbar'

export default function UserScreen({ navigation, route }: any): ReactElement {
  const [loading, setLoading] = useState(true)
  const { author } = route.params
  console.log('user profile:', author)
  return (
    <AnimatedColorBox
      flex={1}
      bg={useColorModeValue('warmGray.50', 'warmGray.900')}
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
          bg={useColorModeValue('warmGray.50', 'primary.900')}
          mt="-20px"
          pt="30px"
          p={4}
        >
          <NavBar />
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: 'warmGray.50',
            }}
            textAlign="center"
          >
            Profile
          </Heading>
          {/* {loading ? (
            <Center>
              <Spinner accessibilityLabel="Loading profile" />
            </Center>
          ) : (
            <></>
          )} */}

          <Box alignItems="center">
            {author.photoUrl ? (
              <Image
                source={{ uri: author.photoUrl }}
                borderRadius="full"
                resizeMode="cover"
                w={120}
                h={120}
                alt="author"
              />
            ) : (
              <Avatar
                w={120}
                h={120}
                source={{
                  uri: 'https://i.pinimg.com/474x/5e/37/b5/5e37b5c69eeb267f01d0746ba1b79d6d.jpg',
                }}
              />
            )}
          </Box>
          <Heading>{author.name}</Heading>
        </ScrollView>
      </KeyboardAwareScrollView>
    </AnimatedColorBox>
  )
}

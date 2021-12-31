import { Formik } from 'formik'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Heading,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base'
import React from 'react'

export default function ProfileForm({ user }: any): JSX.Element {
  const initialValues = {
    email: user.email,
    password: '',
    confirmPassword: '',
  }

  return (
    <VStack flex={1} space={4}>
      <Box alignItems="center">
        {user.photoUrl ? (
          <Image
            source={user.photoUrl}
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
      <Formik
        initialValues={initialValues}
        onSubmit={async values => {
          // createUserWithEmail(values.email, values.password)
        }}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
        // validationSchema={SignUpSchema}
      >
        {({ handleSubmit, handleChange, errors, handleBlur, values }) => (
          <Box safeArea p="2" py="8" w="95%" maxW="300">
            <Heading
              size="lg"
              fontWeight="600"
              color="coolGray.800"
              _dark={{
                color: 'warmGray.50',
              }}
            >
              Periodize
            </Heading>

            <VStack space={3} mt="5">
              <FormControl isRequired>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  size="lg"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                />
                {errors.email && <Text color="red.700">{errors.email}</Text>}
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Password</FormControl.Label>
                <Input
                  size="lg"
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  autoCapitalize="none"
                />
              </FormControl>
              <FormControl isRequired>
                <FormControl.Label>Confirm Password</FormControl.Label>
                <Input
                  size="lg"
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                />
                {errors.confirmPassword && (
                  <Text color="red.700">{errors.confirmPassword}</Text>
                )}
              </FormControl>
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => handleSubmit()}
              >
                Create Account
              </Button>
            </VStack>
          </Box>
        )}
      </Formik>
    </VStack>
  )
}

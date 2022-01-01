import { doc, setDoc } from 'firebase/firestore'
import { Formik } from 'formik'
import {
  Avatar,
  Box,
  Button,
  FormControl,
  Image,
  Input,
  Text,
  VStack,
} from 'native-base'
import React from 'react'
import * as Yup from 'yup'
import { db } from '../../firebase'
const ProfileSchema = Yup.object().shape({
  email: Yup.string()
    .min(4, 'Too Short!')
    .max(40, 'Too Long!')
    .required('Required'),
  name: Yup.string()
    .min(2, 'Value must be between 6-20 charachters!')
    .max(20, 'Too Long!'),
})

export default function ProfileForm({ user }: any): JSX.Element {
  const initialValues = {
    name: user.name ? user.name : '',
    email: user.email,
  }

  return (
    <VStack flex={1} space={4} alignItems="center">
      <Formik
        initialValues={initialValues}
        onSubmit={async (values, actions) => {
          console.log(values)
          try {
            await setDoc(
              doc(db, 'users', user.uid),
              {
                ...user,
                name: values.name,
              },
              { merge: true }
            )
          } catch (error) {
            console.log('from comment : ', error)
            actions.setSubmitting(false)
          }
        }}
        enableReinitialize={false}
        validateOnChange={false}
        validateOnBlur={false}
        validationSchema={ProfileSchema}
      >
        {({
          handleSubmit,
          handleChange,
          errors,
          handleBlur,
          values,
          setFieldValue,
          isSubmitting,
        }) => (
          <Box safeArea p="2" py="8" w="95%" maxW="340">
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
            <VStack space={3} mt="5">
              <FormControl>
                <FormControl.Label>Username</FormControl.Label>
                <Input
                  size="lg"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  autoCapitalize="none"
                />
                {errors.name && <Text color="red.700">{errors.name}</Text>}
              </FormControl>
              <FormControl>
                <FormControl.Label>Email</FormControl.Label>
                <Input
                  size="lg"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  autoCapitalize="none"
                  isDisabled
                />
              </FormControl>
              {/* <FormControl>
                <FormControl.Label>Bio</FormControl.Label>
                <TextArea
                  value={bio}
                  onChange={e => handleBio(e)}
                  placeholder="short bio"
                  w={{
                    md: '25%',
                  }}
                />
              </FormControl> */}
              <Button
                mt="2"
                colorScheme="indigo"
                onPress={() => handleSubmit()}
                disabled={isSubmitting}
              >
                Save Update
              </Button>
            </VStack>
          </Box>
        )}
      </Formik>
    </VStack>
  )
}

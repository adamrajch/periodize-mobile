import { Feather, Ionicons } from '@expo/vector-icons'
import { DrawerNavigationProp } from '@react-navigation/drawer'
import { useNavigation } from '@react-navigation/native'
import { Heading, HStack, IconButton, useColorModeValue } from 'native-base'
import React, { useCallback } from 'react'
const StackNavBar = () => {
  const navigation = useNavigation<DrawerNavigationProp<{}>>()

  const handlePressMenuButton = useCallback(() => {
    navigation.openDrawer()
  }, [navigation])

  const handleBackButton = useCallback(() => {
    navigation.goBack()
  }, [navigation])
  return (
    <HStack
      w="full"
      h="60px"
      alignItems="center"
      //   alignContent="center"

      pt={6}
      justifyContent="space-between"
      mb={4}
    >
      <IconButton
        onPress={handleBackButton}
        borderRadius={100}
        _icon={{
          as: Ionicons,
          name: 'arrow-back',
          size: 6,
          color: useColorModeValue('black', 'white'),
        }}
      />
      <Heading>Periodize</Heading>
      <IconButton
        onPress={handlePressMenuButton}
        borderRadius={100}
        _icon={{
          as: Feather,
          name: 'menu',
          size: 6,
          color: useColorModeValue('black', 'white'),
        }}
      />
    </HStack>
  )
}

export default StackNavBar

import { Box, Heading, Text } from 'native-base'
import React, { ReactElement } from 'react'
import { Pressable } from 'react-native'

export default function ProgramBox({ p, id, navigate }: any): ReactElement {
  return (
    <Pressable onPress={() => navigate(id, p)}>
      <Box w="full" shadow={4} bg="primary.600" p={4} borderRadius="md">
        <Heading>{p.title}</Heading>
        <Text>Author: {p.author.name} </Text>
      </Box>
    </Pressable>
  )
}

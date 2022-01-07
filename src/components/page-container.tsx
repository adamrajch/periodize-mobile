import { Box, ScrollView, useColorModeValue } from 'native-base'
import React, { ReactElement } from 'react'

interface Props {
  children: React.ReactNode
}

export default function PageContainer({ children }: Props): ReactElement {
  return (
    <Box
      flex={1}
      bg={useColorModeValue(
        {
          linearGradient: {
            colors: ['gray.100', 'gray.200'],
            start: [0, 0],
            end: [0, 1],
          },
        },
        {
          linearGradient: {
            colors: ['gray.700', 'gray.800'],
            start: [0, 0],
            end: [0, 1],
          },
        }
      )}
      w="full"
      pt={6}
      pb={110}
    >
      <ScrollView
        _contentContainerStyle={{
          flexGrow: 1,
          px: 2,
          py: 12,
        }}
      >
        {children}
      </ScrollView>
    </Box>
  )
}

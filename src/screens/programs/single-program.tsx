import { Entypo, Feather, FontAwesome } from '@expo/vector-icons'
import {
  Badge,
  Box,
  Button,
  Fab,
  Heading,
  HStack,
  Menu,
  Modal,
  Pressable,
  ScrollView,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import StackNavBar from '../../components/stack-navbar'
const SingleProgram = ({ navigation, route }: any) => {
  const [index, setIndex] = useState(0)
  const [blockIndex, setBlockIndex] = useState(0)
  const [weekIndex, setWeekIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)

  const { id, program } = route.params
  const p = program
  const [loading, setLoading] = useState<boolean>(false)
  // console.log(program)
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
      // p={2}
    >
      <ScrollView
        _contentContainerStyle={{
          minW: '72',
          flex: 1,
          px: 2,
        }}
      >
        <StackNavBar />
        <Fab
          placement="bottom-right"
          colorScheme="gray"
          size="lg"
          icon={<Feather name="search" size={24} color="black" />}
          onPress={() => setShowModal(true)}
          shadow={9}
        />
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} size="xl">
          <Modal.Content maxWidth="600px">
            <Modal.CloseButton />
            <Modal.Header>Jump To Week</Modal.Header>
            <Modal.Body>
              <VStack space={2}>
                {p.template.blocks.map((block: any, bi: number) => (
                  <VStack space={2} key={bi}>
                    <Text>Block {bi + 1}</Text>
                    <HStack space={2}>
                      {block.weeks.map((week: any, wi: number) => (
                        <Button
                          key={wi}
                          onPress={() => {
                            setBlockIndex(bi),
                              setWeekIndex(wi),
                              setShowModal(false)
                          }}
                          size="sm"
                        >
                          {`Week ${wi + 1}`}
                        </Button>
                      ))}
                    </HStack>
                  </VStack>
                ))}
              </VStack>
            </Modal.Body>
          </Modal.Content>
        </Modal>
        <VStack space={0} my={2}>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="lg">{p.template.title}</Heading>
          </HStack>
          <HStack alignItems="center">
            <Text>Author: </Text>
            <Pressable
              onPress={() => navigation.navigate('User', { author: p.author })}
            >
              <Text bold italic fontSize="md">
                {p.author.name}
              </Text>
            </Pressable>
          </HStack>
          <HStack></HStack>

          <HStack space={2}>
            {p.experience.map((e: string, i: number) => (
              <Badge colorScheme="cyan" variant="subtle" key={e}>
                <Text>{e}</Text>
              </Badge>
            ))}
          </HStack>
          <HStack space={2}>
            {p.periodization.map((x: string, i: number) => (
              <Text key={x}>
                {x}
                {i < p.periodization.length - 1 && ','}
              </Text>
            ))}
          </HStack>
          <Text>
            {p.numberOfWeeks} {p.numberOfWeeks === 1 ? 'Week' : 'Weeks'}
          </Text>
        </VStack>

        <HStack justifyContent="flex-end" space={4} mb={2} alignItems="center">
          <Button colorScheme="red" rounded="sm" size="sm">
            Subscribe
          </Button>
          {p.featured && (
            <Box
              bg={{
                linearGradient: {
                  colors: ['lightBlue.300', 'violet.800'],
                  start: [0, 0],
                  end: [1, 0],
                },
              }}
              p={1}
              rounded="md"
            >
              <FontAwesome name="trophy" size={24} color="white" />
            </Box>
          )}

          <Pressable>
            <FontAwesome name="heart" size={21} color="white" />
          </Pressable>
          <Menu
            w="190"
            trigger={triggerProps => {
              return (
                <Pressable accessibilityLabel="options menu" {...triggerProps}>
                  <Entypo name="dots-three-vertical" size={18} color="white" />
                </Pressable>
              )
            }}
          >
            <Menu.Item>Subscribe</Menu.Item>
            <Menu.Item>Favorite</Menu.Item>
          </Menu>
        </HStack>

        <Box mt={4}>
          <VStack space={4}>
            {p.template.blocks[blockIndex].weeks[weekIndex].days.map(
              (day: any, di: number) => (
                <Box
                  key={di}
                  p={2}
                  shadow={9}
                  bg={useColorModeValue('gray.300', 'gray.700')}
                  borderRadius="md"
                >
                  <HStack
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Text fontSize="sm">
                      B{blockIndex + 1} W{weekIndex + 1}
                    </Text>
                    <Heading size="md" mb={2}>
                      {day.name}
                    </Heading>
                    {day.summary.length > 0 ? (
                      <FontAwesome name="file-text-o" size={18} color="white" />
                    ) : (
                      <Text>{`   `}</Text>
                    )}
                  </HStack>

                  <VStack space={2}>
                    {day.lifts.map((lift: any, li: number) => (
                      <HStack space={4} key={li}>
                        <Text w="3/5" fontSize="md">
                          {li + 1}.{' '}
                          <Text bold isTruncated fontSize="md">
                            {lift.name}
                          </Text>
                        </Text>
                        <VStack>
                          {lift.records.map((rec: any, ri: number) => (
                            // <HStack key={ri} justifyContent="space-evenly">
                            //   <Text>{rec.name}</Text>
                            //   <Text>{rec.sets}</Text>
                            //   <Text>{rec.reps}</Text>
                            //   <Text>{rec.rpe}</Text>
                            //   <Text>{rec.percent}</Text>
                            //   <Text>{rec.load}</Text>

                            // </HStack>
                            <Text key={ri} fontSize="md">
                              {`${rec.sets} x ${rec.reps} ${
                                rec.rpe ? `@${rec.rpe}` : ''
                              } ${rec.percent ? `${rec.percent}%` : ''}${
                                rec.load ? `@${rec.load}` : ''
                              } `}{' '}
                              {lift.note.length > 0 && ri === 0 && (
                                <FontAwesome
                                  name="sticky-note-o"
                                  size={18}
                                  color="white"
                                />
                              )}
                            </Text>
                          ))}
                        </VStack>
                      </HStack>
                    ))}
                  </VStack>
                </Box>
              )
            )}
          </VStack>
        </Box>
      </ScrollView>
    </Box>
  )
}

export default SingleProgram

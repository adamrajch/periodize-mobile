import { Entypo, FontAwesome } from '@expo/vector-icons'
import {
  arrayRemove,
  arrayUnion,
  deleteDoc,
  doc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {
  Badge,
  Box,
  Button,
  Heading,
  HStack,
  Menu,
  Modal,
  Pressable,
  Spinner,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import React, { useState } from 'react'
import { db } from '../../../firebase'
import PageContainer from '../../components/page-container'
import StackNavBar from '../../components/stack-navbar'
import { useAuth } from '../../context/auth'
const SingleProgram = ({ navigation, route }: any) => {
  const [index, setIndex] = useState(0)
  const [blockIndex, setBlockIndex] = useState(0)
  const [weekIndex, setWeekIndex] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuth()
  const { id, program } = route.params
  const p = program
  const [loading, setLoading] = useState<boolean>(false)
  const [subLoading, setSubLoading] = useState<boolean>(false)
  // console.log(JSON.stringify(program.workouts, null, 2))

  async function subscribe() {
    setSubLoading(true)
    try {
      await setDoc(doc(db, `subscribed`, `${user.uid}-${program.id}`), {
        currentDay: [0, 0, 0],
        currentIndex: 0,
        paused: false,
        completed: false,
        author: program.author,
        user: user,
        userId: user.uid,
        programId: program.id,
        title: program.title,
        lastCompletedDay: null,
        template: program.template.blocks,
        workouts: program.workouts,
      })
    } catch (err) {
      console.log(err)
    }

    try {
      await updateDoc(doc(db, 'users', user.uid), {
        subscribedPrograms: arrayUnion({
          currentDay: [0, 0, 0],
          paused: false,
          completed: false,
          author: program.author,
          user: user,
          userId: user.uid,
          programId: program.id,
          programTitle: program.title,
          lastCompletedDay: null,
        }),
      })
      navigation.navigate('Journal')
    } catch (err) {
      console.log(err)
    }

    setSubLoading(false)
  }
  async function unsub() {
    setSubLoading(true)
    try {
      await deleteDoc(doc(db, 'subscribed', `${user.uid}-${program.id}`))
    } catch (err) {
      console.log(err)
    }

    try {
      const pro = user.subscribedPrograms.filter(
        (p: any) => p.programId === program.id
      )
      console.log(pro)
      await updateDoc(doc(db, 'users', user.uid), {
        subscribedPrograms: arrayRemove(pro[0]),
      })
    } catch (err) {
      console.log(err)
    }
    setSubLoading(false)
  }

  return (
    <PageContainer>
      <StackNavBar />
      {/* <Fab
        placement="bottom-right"
        colorScheme="gray"
        size="lg"
        icon={<Feather name="search" size={24} color="black" />}
        onPress={() => setShowModal(true)}
        shadow={9}
      /> */}
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
        {user && (
          <>
            {user.subscribedPrograms.filter(
              (e: any) => e.programId === program.id
            ).length === 0 && (
              <Button rounded="sm" size="sm" onPress={() => subscribe()}>
                {subLoading ? <Spinner color="white" /> : 'Subscribe'}
              </Button>
            )}

            {user.subscribedPrograms.some(
              (e: any) => e.programId === program.id
            ) && (
              <Button rounded="sm" size="sm" onPress={() => unsub()}>
                {subLoading ? <Spinner color="white" /> : 'UnSub'}
              </Button>
            )}
          </>
        )}

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
          {user && (
            <>
              {user.subscribedPrograms.filter(
                (e: any) => e.programId === program.id
              ).length === 0 ? (
                <Menu.Item onPress={() => subscribe()}>Subscribe</Menu.Item>
              ) : (
                <Menu.Item onPress={() => unsub()}>Unsub</Menu.Item>
              )}
            </>
          )}

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
    </PageContainer>
  )
}

export default SingleProgram

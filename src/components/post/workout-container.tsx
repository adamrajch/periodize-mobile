import { Entypo, Ionicons } from '@expo/vector-icons'
import { doc, onSnapshot } from 'firebase/firestore'
import {
  Box,
  Heading,
  HStack,
  Input,
  KeyboardAvoidingView,
  Modal,
  ScrollView,
  Text,
  useColorModeValue,
  VStack,
} from 'native-base'
import React, { ReactElement, useEffect, useState } from 'react'
import { Platform } from 'react-native'
import { db } from '../../../firebase'

export default function WorkoutContainer({ id }: any): ReactElement {
  const [modalOpen, setModalOpen] = useState(false)
  const [program, setProgram] = useState<any>(null)
  const [currIndex, setCurrIndex] = useState<any>(null)

  useEffect(() => {
    const unsub = onSnapshot(doc(db, 'subscribed', id), doc => {
      setProgram(doc.data())
    })
    return unsub
  }, [])
  useEffect(() => {
    if (program) {
      setCurrIndex(program.currentIndex)
    }
  }, [program])
  function handleRight() {
    if (currIndex < program.workouts.length - 1) {
      setCurrIndex((prev: any) => prev + 1)
    }
  }
  function handleLeft() {
    if (currIndex > 0) {
      setCurrIndex((prev: any) => prev - 1)
    }
  }

  return (
    <KeyboardAvoidingView
      h={{
        lg: 'auto',
      }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <VStack>
        {program && (
          <>
            <Heading>{program.title}</Heading>
            {program.workouts[currIndex] && (
              <>
                <Modal
                  isOpen={modalOpen}
                  onClose={() => setModalOpen(false)}
                  size="xl"
                >
                  <Modal.Content maxH="212">
                    <Modal.CloseButton />
                    <Modal.Header>Return Policy</Modal.Header>
                    <Modal.Body>
                      <ScrollView>
                        {/* <FullTemplate blocks={blocks} */}
                      </ScrollView>
                    </Modal.Body>
                  </Modal.Content>
                </Modal>
                <HStack
                  alignItems="center"
                  justifyContent="space-between"
                  my={4}
                >
                  <Text>
                    {`B${program.workouts[currIndex].blockIndex + 1}W${
                      program.workouts[currIndex].weekIndex + 1
                    }D${program.workouts[currIndex].dayIndex + 1}`}
                  </Text>
                  <Entypo
                    name="chevron-left"
                    size={24}
                    color={useColorModeValue('black', 'white')}
                    onPress={handleLeft}
                  />
                  <Heading>{program.workouts[currIndex].dayName}</Heading>
                  <Entypo
                    name="chevron-right"
                    size={24}
                    color={useColorModeValue('black', 'white')}
                    onPress={handleRight}
                  />
                  <Ionicons
                    name="open-outline"
                    size={24}
                    color={useColorModeValue('black', 'white')}
                    onPress={() => setModalOpen(true)}
                  />
                </HStack>
                <ScrollView
                  _contentContainerStyle={{
                    flexGrow: 1,
                    px: 2,
                  }}
                >
                  <VStack space={4}>
                    {program.workouts[currIndex].lifts.map(
                      (lift, li: number) => (
                        <Box
                          key={li}
                          p={4}
                          rounded="md"
                          borderColor="cyan.600"
                          borderStyle="solid"
                          borderWidth="1px"
                        >
                          <VStack justifyContent="space-between" space={2}>
                            <HStack justifyContent="space-between">
                              <Heading size="sm">{lift.name}</Heading>
                              <Text>Replace / Reset</Text>
                            </HStack>

                            <VStack>
                              {lift.records.map((r: any, ri: number) => (
                                <HStack
                                  key={ri}
                                  justifyContent="space-around"
                                  alignItems="center"
                                  space={4}
                                >
                                  <Input
                                    variant="underlined"
                                    placeholder={`${r.sets}`}
                                    size="md"
                                  />
                                  <Input
                                    variant="underlined"
                                    placeholder={`${r.reps}`}
                                    size="md"
                                  />
                                  <Input
                                    size="md"
                                    variant="underlined"
                                    placeholder={r.rpe ? r.rpe : ''}
                                  />
                                  {/* <Entypo name="check" size={12} color="cyan" /> */}
                                </HStack>
                              ))}
                            </VStack>
                          </VStack>
                        </Box>
                      )
                    )}
                  </VStack>
                </ScrollView>
              </>
            )}
          </>
        )}
      </VStack>
    </KeyboardAvoidingView>
  )
}

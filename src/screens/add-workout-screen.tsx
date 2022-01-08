import { Box, Button, CheckIcon, Heading, Select } from 'native-base'
import React, { useEffect, useState } from 'react'
import PageContainer from '../components/page-container'
import { useAuth } from '../context/auth'

export default function AddWorkoutPage() {
  const { user, loading } = useAuth()
  const [programs, setPrograms] = useState<any>([])
  const [program, setProgram] = useState<any>(null)
  const [select, setSelect] = useState<any>('')
  useEffect(() => {
    if (user.subscribedPrograms) {
      setPrograms(user.subscribedPrograms)
    }
  }, [user])

  useEffect(() => {
    if (select.length) {
      setProgram(programs.find((p: any) => p.programId === select))
    }
  }, [select])

  useEffect(() => {
    console.log('selected program: ', program)
  }, [program])
  return (
    <PageContainer>
      <Heading textAlign="center">Add Workout</Heading>
      {programs.length > 0 && (
        <Select
          selectedValue={select}
          minWidth="200"
          accessibilityLabel="Choose Program"
          placeholder="Choose Program"
          _selectedItem={{
            bg: 'teal.600',
            my: 8,
            endIcon: <CheckIcon size="5" />,
          }}
          mt={1}
          onValueChange={itemValue => setSelect(itemValue)}
        >
          {programs.length > 0 &&
            programs.map((p: any) => (
              <Select.Item
                key={p.programId}
                label={p.programTitle}
                value={p.programId}
              />
            ))}
        </Select>
      )}

      <Button
        size="md"
        onPress={() => {
          setSelect(''), setProgram(null)
        }}
      >
        Add Custom Workout
      </Button>

      {program && (
        <Box>
          <Heading>My program</Heading>
          <Heading>{program.programTitle}</Heading>
        </Box>
      )}
    </PageContainer>
  )
}

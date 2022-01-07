import {
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { Heading, VStack } from 'native-base'
import React, { useEffect, useState } from 'react'
import { db } from '../../../firebase'
import PageContainer from '../../components/page-container'
import ProgramBox from '../../components/programs/program-box'

const CategoryScreen = ({ navigation, route }: any) => {
  const { title, fetchUrl } = route.params
  const [programs, setPrograms] = useState<any>([])
  const [empty, setEmpty] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [last, setLast] = useState<any>(0)
  useEffect(() => {
    getIinitialPrograms()
  }, [])
  async function getIinitialPrograms() {
    let q
    if (fetchUrl === 'featured') {
      q = query(
        collection(db, 'programs'),
        where('featured', '==', true),
        orderBy('heartCount', 'desc'),
        limit(10)
      )
    } else {
      q = query(
        collection(db, 'programs'),
        where('category', 'array-contains', fetchUrl),
        // orderBy('featured', 'desc'),
        orderBy('heartCount', 'desc'),
        limit(10)
      )
    }

    const querySnapshot = await getDocs(q)
    const lastVisible = querySnapshot.docs[querySnapshot.docs.length - 1]

    setPrograms(
      querySnapshot.docs.map(d => {
        const docObj = {
          id: d.id,
          ...d.data(),
        }
        return docObj
      })
    )
    setLast(lastVisible)
    if (querySnapshot.empty) {
      setEmpty(true)
    }
  }
  function getProgramsQuery() {
    let q

    q = query(
      collection(db, 'programs'),
      where('category', 'array-contains', fetchUrl),
      orderBy('featured', 'desc'),
      orderBy('heartCount', 'desc'),
      startAfter(last),
      limit(10)
    )

    return q
  }

  const getPrograms = async () => {
    const documentSnapshots = await getDocs(getProgramsQuery())
    const lastVisible =
      documentSnapshots.docs[documentSnapshots.docs.length - 1]
    if (!empty) {
      documentSnapshots.docs.forEach(d => {
        console.log('doc data', d.data())
        console.log('in loop')
        const docObj = {
          id: d.id,
          ...d.data(),
        }
        setPrograms((prev: any) => [...prev, docObj])
      })
    }
    setLast(lastVisible)
    if (documentSnapshots.empty) {
      setEmpty(true)
    }
  }

  function navToID(id: string, p: any) {
    navigation.navigate('Individual Program', { id: id, program: p })
  }

  return (
    <PageContainer>
      <Heading mb={4}>{title}</Heading>
      <VStack space={2}>
        {programs.length > 0 &&
          programs.map((p: any) => (
            <ProgramBox key={p.id} id={p.id} p={p} navigate={navToID} />
          ))}
      </VStack>
    </PageContainer>
  )
}

export default CategoryScreen

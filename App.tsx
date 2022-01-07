import React, { useEffect, useState } from 'react'
import { LogBox, Text, View } from 'react-native'
import { applyMiddleware, createStore } from 'redux'
import thunk from 'redux-thunk'
import { auth } from './firebase'
import rootReducer from './redux/reducers'
import AuthNavigation from './src/auth-nav'
import AppContainer from './src/components/app-container'
import { AuthProvider } from './src/context/auth'
import TabNav from './src/tabnav'
const store = createStore(rootReducer, applyMiddleware(thunk))
LogBox.ignoreLogs([
  'AsyncStorage has been extracted from react-native core and will be removed in a future release',
])
export default function App() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log('initial user', user)
    auth.onAuthStateChanged((user: any) => {
      if (!user) {
        setUser(null)
        setLoading(false)
      } else {
        setUser(user)

        setLoading(false)
      }
    })
    return
  }, [])

  if (loading) {
    return (
      <AppContainer>
        <View>
          <Text>Loading</Text>
        </View>
      </AppContainer>
    )
  }

  return (
    <AuthProvider>
      <AppContainer>{user ? <TabNav /> : <AuthNavigation />}</AppContainer>
    </AuthProvider>
  )
}

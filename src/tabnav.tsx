import { Feather, Foundation, Ionicons } from '@expo/vector-icons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { Text, useColorModeValue, View } from 'native-base'
import React from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MainScreen from './screens/main-screen'
import Profile from './screens/profile'
import ProgramsScreen from './screens/programs-screen'
import CategoryScreen from './screens/programs/category-screen'
import SingleProgram from './screens/programs/single-program'
import UserScreen from './screens/user-screen'

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const CustomTabBarButton = ({ children, onPress }: any) => (
  <TouchableOpacity
    onPress={onPress}
    style={{
      top: -20,
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: useColorModeValue('#7F5DF0', '#53a5f1'),
      ...styles.shadow,
    }}
  >
    <View
      style={{
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: useColorModeValue('#466ecc', '#648dec'),
      }}
    >
      {children}
    </View>
  </TouchableOpacity>
)
function ProgramsNav() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Programs"
        component={ProgramsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Category"
        component={CategoryScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Individual Program"
        component={SingleProgram}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="User"
        component={UserScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  )
}
const TabNav = () => {
  const focusedTextColor = useColorModeValue('#3769f1cc', '#75dbfd')
  const textColor = useColorModeValue('#726a6a', '#f7fdff')

  const focusedIconColor = useColorModeValue('#3769f1cc', '#75dbfd')
  const iconColor = useColorModeValue('black', '#f7fdff')
  return (
    <Tab.Navigator
      initialRouteName="Main"
      screenOptions={{
        tabBarStyle: {
          position: 'absolute',
          bottom: 12,
          left: 12,
          right: 12,
          backgroundColor: useColorModeValue('white', '#0d3870'),
          borderRadius: 15,
          height: 90,
          shadowColor: useColorModeValue('#7F5DF0', '#53a5f1'),
          borderTopColor: '#216fb8',
          ...styles.shadow,
        },
        tabBarActiveTintColor: '#2658a5',
      }}
    >
      <Tab.Screen
        name="Main"
        component={MainScreen}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Ionicons
                name="home-sharp"
                color={focused ? focusedIconColor : iconColor}
                size={25}
              />
              <Text
                style={{
                  color: focused ? focusedTextColor : textColor,
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Programs"
        component={ProgramsNav}
        options={{
          tabBarShowLabel: false,
          headerShown: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Foundation
                name="clipboard-notes"
                color={focused ? focusedIconColor : iconColor}
                size={25}
              />
              <Text
                style={{
                  color: focused ? focusedTextColor : textColor,
                  fontSize: 12,
                }}
              >
                Home
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Post"
        component={ProgramsNav}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: () => <Ionicons name="add" size={32} color="#fff" />,
          tabBarButton: props => <CustomTabBarButton {...props} />,
        }}
      />

      <Tab.Screen
        name="Workouts"
        component={ProgramsNav}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Foundation
                name="clipboard-notes"
                color={focused ? focusedIconColor : iconColor}
                size={25}
              />
              <Text
                style={{
                  color: focused ? focusedTextColor : textColor,
                  fontSize: 12,
                }}
              >
                Journal
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          headerShown: false,
          tabBarShowLabel: false,
          tabBarIcon: ({ color, size, focused }) => (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Feather
                name="user"
                size={25}
                color={focused ? focusedIconColor : iconColor}
              />
              <Text
                style={{
                  color: focused ? focusedTextColor : textColor,
                  fontSize: 12,
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default TabNav
const styles = StyleSheet.create({
  shadow: {
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
    shadowOffset: {
      width: 0,
      height: 6,
    },
  },
  blurContainer: {
    position: 'absolute',
  },
})

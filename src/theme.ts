import { extendTheme } from 'native-base'

// const config = {
//   useSystemColorMode: false,
//   initialColorMode: 'dark',
//   dependencies: {
//     'linear-gradient': require('expo-linear-gradient').LinearGradient,
//   },
// }

const colors = {
  primary: {
    50: '#EEF2F6',
    100: '#CFD9E7',
    200: '#B1C1D8',
    300: '#92A9C9',
    400: '#7491B9',
    500: '#5578AA',
    600: '#446088',
    700: '#334866',
    800: '#223044',
    900: '#111822',
  },
}

export default extendTheme({
  colors,
  components: {
    Button: {
      baseStyle: ({ colorMode }) => {
        return {
          backgroundColor: colorMode === 'dark' ? 'cyan.600' : 'primary.900',
          // rounded: 'md',
          shadow: 9,
        }
      },
      defaultProps: ({ colorMode }: any) => {
        return {
          // colorScheme: colorMode === 'dark' ? 'primary.900' : 'primary.900',
        }
      },
    },
    Heading: {
      // Can pass also function, giving you access theming tools
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'white' : 'black',
          fontWeight: 'normal',
        }
      },
    },
    Text: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'gray.300' : 'black',
          fontWeight: 'normal',
        }
      },
    },

    Icon: {
      baseStyle: ({ colorMode }) => {
        return {
          color: colorMode === 'dark' ? 'white' : 'black',
        }
      },
    },
  },
})

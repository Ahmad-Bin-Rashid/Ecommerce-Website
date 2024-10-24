import { extendTheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config = {
  initialColorMode: 'system',
  useSystemColorMode: true,
}

const styles = {
  global: (props) => ({
    body: {
      bg: mode('blackAlpha.50', 'whiteAlpha.200')(props),
    },
  }),
}

const theme = extendTheme({
   config,
   styles
   })

export default theme
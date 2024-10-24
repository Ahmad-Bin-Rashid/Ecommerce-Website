import { IconButton, Icon, Button as ChakraLink, useColorMode, HStack, Flex, Box, Spacer, Heading, useColorModeValue } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";
import { Link as ReactRouterLink } from "react-router-dom";



const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const bg = useColorModeValue('white', 'whiteAlpha.200')
  const bgBorder = useColorModeValue('gray.100', 'whiteAlpha.100')
  const btnOutline = "0px 0px 0px 3px rgba(56, 161, 105, 0.7)"

  return (
    <>
    <Flex
      minWidth='max-content'
      alignItems='center'
      width={'full'}
      zIndex={10}
      gap='2'
      px={5}
      py={4}
      bgColor={bg}
      marginBottom={5}
      boxShadow={'md'}
      borderBottom={'1px'}
      borderBottomColor={bgBorder}
      
    >
      <Box >
        <Heading as={ReactRouterLink} to={'/'} size='lg' px={2}>Pickaroo</Heading>
      </Box>
      <Spacer />
      <HStack gap={3}>
        <ChakraLink _focus={{ boxShadow: btnOutline }} display={{ base: 'none', md: 'inherit' }} as={ReactRouterLink} to={'/register'} >Sign Up</ChakraLink>
        <ChakraLink _focus={{ boxShadow: btnOutline }} display={{ base: 'none', md: 'inherit' }} as={ReactRouterLink} to={'/login'} >Sign In</ChakraLink>
        
        <IconButton 
          onClick={toggleColorMode} 
          ml={2} 
          isRound={true}
          _focus={{ boxShadow: btnOutline }} 
          >
          <Icon as={colorMode === 'light' ? FiMoon : FiSun} />
        </IconButton>
      </HStack>
    </Flex>
    </>
  )
}

export default Header
import useLogout from "../hooks/useLogout";
import useAuth from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text } from '@chakra-ui/react';



const Home = () => {
  const logout = useLogout();
  const navigate = useNavigate()

  const signOut = async () => {
    await logout();
  }

  const { state } = useAuth();

  const changeValue = () => {
    navigate('/login')
  }

  return (
    <Box minH={'100vh'} >
      <Heading>Home</Heading>

      <Text>email: {state?.user}</Text>
      <Text>token: {state?.accessToken}</Text>

        <br/>
      <Button onClick={changeValue}>Login</Button>

      <Box className="flexGrow">
        <Button onClick={signOut}>Sign Out</Button>
      </Box>
    </Box>

  )
}

export default Home
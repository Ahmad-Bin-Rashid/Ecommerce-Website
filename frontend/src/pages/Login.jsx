import { useRef, useState, useEffect } from 'react';
import useAuth from '../hooks/useAuth';
import { useNavigate, useLocation } from 'react-router-dom';
import useInput from '../hooks/useInput';
import authService from '../services/authService';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    useColorModeValue,
    useToast
} from '@chakra-ui/react'


const Login = () => {

    const bgBtnHover = useColorModeValue('green.500', 'green.800')
    const bgBtn = useColorModeValue('green.400', 'green.700')
    const btnOutline = "0px 0px 0px 3px rgba(56, 161, 105, 0.7)"
    const focusColor = 'green.500'

    const { state, dispatch } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";

    const emailRef = useRef();
    const toastRef = useRef();

    const toast = useToast();

    const [email, resetUser, userAttribs] = useInput('user', '')
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [email, password])

    const handleError = () => {
        if (errMsg != '') {
            toastRef.current = toast({
                title: 'Error!',
                description: errMsg,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        try {

            if (!email || !password) {
                setErrMsg("Missing Email or Password...")
                handleError()
            } else {
                console.log(state)
                const { user, accessToken } = await authService.login(email, password);

                console.log(accessToken)

                dispatch({ type: 'LOGIN', payload: { user, accessToken } });

                console.log(state)

                resetUser();
                setPassword('');
                navigate(from, { replace: true });
            }
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Email or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            handleError()
        }
    }

    return (

        <Flex
            align={'center'}
            justify={'center'}
        >
            <Stack spacing={8} mx={'auto'} w={'lg'} py={10} px={'6'}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>SIGN IN</Heading>
                </Stack>
                <Box
                    w={'100%'}
                    rounded={'2xl'}
                    bg={useColorModeValue('white', 'whiteAlpha.200')}
                    boxShadow={'lg'}
                    border={'1px'}
                    as='form'
                    onSubmit={handleSubmit}
                    borderColor={useColorModeValue('gray.300', 'gray.700')}
                    p={10}>

                    <Stack spacing={5} py={3} >

                        <FormControl className='input'>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input
                                type="email"
                                borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                                id="email"
                                ref={emailRef}
                                autoComplete="off"
                                {...userAttribs}
                                value={email}
                                focusBorderColor={focusColor}
                                required
                            />
                        </FormControl>

                        <FormControl className="input">
                            <FormLabel htmlFor='password'>Password</FormLabel>
                            <Input
                                type="password"
                                borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                                id="password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                focusBorderColor={focusColor}
                                required
                            />
                        </FormControl>

                        <Stack spacing={10}>
                            <Checkbox colorScheme={'green'} _focus={{ boxShadow: btnOutline }} outlineColor={btnOutline}>Remember me</Checkbox>
                            <Button
                                bg={bgBtn}
                                color={'white'}
                                _hover={{ bg: bgBtnHover }}
                                _focus={{ boxShadow: btnOutline }}
                                type="submit"
                            >
                                Sign in
                            </Button>
                        </Stack>


                    </Stack>
                </Box>
            </Stack>
        </Flex >

    )
}

export default Login

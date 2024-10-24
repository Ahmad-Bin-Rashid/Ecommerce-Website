import { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Checkbox, Flex, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue, useToast } from "@chakra-ui/react";
import authService from "../services/authService";


const USERNAME_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;


const Register = () => {

    const bgBtnHover = useColorModeValue('green.500', 'green.800')
    const bgBtn = useColorModeValue('green.400', 'green.700')
    const btnOutline = "0px 0px 0px 3px rgba(56, 161, 105, 0.7)"
    const focusColor = 'green.500'

    const toastRef = useRef();

    const toast = useToast();


    const usernameRef = useRef();
    const navigate = useNavigate();

    const [username, setUsername] = useState('');

    const [email, setEmail] = useState('');

    const [password, setPassword] = useState('');

    const [matchPassword, setMatchPassword] = useState('');

    const [errMsg, setErrMsg] = useState('');

    useEffect(() => {
        usernameRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [username, email, password, matchPassword])


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

        const v1 = USERNAME_REGEX.test(username);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2 || !email) {
            setErrMsg("Invalid Entry");
            handleError();
            return;
        }
        try {
            await authService.register(username, email, password);

            setUsername('');
            setPassword('');
            setMatchPassword('');
            navigate('/login');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            handleError();
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
                            <FormLabel htmlFor='username'>Username</FormLabel>
                            <Input
                                type="username"
                                borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                                id="username"
                                ref={usernameRef}
                                autoComplete="off"
                                onChange={(e) => setUsername(e.target.value)}
                                value={username}
                                required
                                focusBorderColor={focusColor}

                            />
                        </FormControl>

                        <FormControl className='input'>
                            <FormLabel htmlFor='email'>Email address</FormLabel>
                            <Input
                                type="email"
                                borderColor={useColorModeValue('blackAlpha.400', 'whiteAlpha.400')}
                                id="email"
                                autoComplete="off"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
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
                                Sign Up
                            </Button>
                        </Stack>


                    </Stack>
                </Box>
            </Stack>
        </Flex >
    )
}

export default Register

import { Box, Button, Heading } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom"

const Missing = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Box align={'center'}  minH={'100vh'}>
            <Heading m={3} p={3} size={'2xl'}>Oops!</Heading>
            <Heading m={2} size={'md'}>Page Not Found</Heading>  
            <Button onClick={goBack} m={2}>Go Back</Button>
        </Box>
    )
}

export default Missing

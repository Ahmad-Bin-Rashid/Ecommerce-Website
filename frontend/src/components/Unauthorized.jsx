import { Box, Button, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"

const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <Box align={'center'} minH={'100vh'}>
            <Heading m={3}>Unauthorized</Heading>
            <Text m={3}>You do not have access to the requested page.</Text>
            <Button onClick={goBack} m={2}>Go Back</Button>
        </Box>
    )
}

export default Unauthorized

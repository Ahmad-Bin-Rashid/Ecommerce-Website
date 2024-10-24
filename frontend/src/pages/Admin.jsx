import { useNavigate, Link } from "react-router-dom";
import useLogout from "../hooks/useLogout";
import { Box, Button, Heading } from "@chakra-ui/react";

const Admin = () => {
    const navigate = useNavigate();
    const logout = useLogout();

    const signOut = async () => {
        await logout();
        navigate('/');
    }

    return (
        <Box>
            <Heading>Admins Page</Heading>
            <br />
            <Button className="flexGrow">
                <Link to="/">Home</Link>
            </Button>
            <br />
            <Box className="flexGrow">
                <Button onClick={signOut}>Sign Out</Button>
            </Box>
        </Box>
    )
}

export default Admin

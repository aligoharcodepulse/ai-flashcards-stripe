import { AppBar, Container, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import { SignIn } from "@clerk/nextjs";


export default function SignUpPage() {
    return (
        <Container maxWidth="100vw">
            <Box
                display="flex"
                flexDirection="column"
                alignItems="center"
                justifyContent="center"
                mt={10}
            >
                <SignIn />
            </Box>
        </Container>
    );
}

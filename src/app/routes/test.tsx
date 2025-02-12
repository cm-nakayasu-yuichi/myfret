import { Container } from "@mui/material";

export const TestRoute = () => {

    return (
        <Container sx={{ my: 4 }} >
            {import.meta.env.VITE_API_BASE_URL}
        </Container>
    );
};

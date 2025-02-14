import { Container } from "@mui/material";
import { ReactNode } from "react";

interface PageContainerProps {
    children: ReactNode;
}

export const PageContainer = ({ children }: PageContainerProps) => {
    return (
        <Container sx={{ my: 4 }}>
            {children}
        </Container>
    );
}
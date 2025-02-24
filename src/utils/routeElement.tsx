import { Box, useTheme } from "@mui/material";
import { Header } from "../components/layouts/header";

// ヘッダー付きレイアウト
interface LayoutWithHeaderProps {
    children: React.ReactNode;
}
const LayoutWithHeader = ({ children }: LayoutWithHeaderProps) => {
    const theme = useTheme();
    return (
        <Box 
            sx={{ 
                bgcolor: theme.palette.background.default, 
                minHeight: "100vh" 
            }}
        >
            <Header />
            {children}
        </Box>
    );
};

export const routeElement = (element: React.ReactNode, noHeader?: boolean) => {
    return noHeader ? element : <LayoutWithHeader>{element}</LayoutWithHeader>;
};

import { Box } from "@mui/material";
import { Header } from "../components/layouts/header";

// ヘッダー付きレイアウト
interface LayoutWithHeaderProps {
    children: React.ReactNode;
}
const LayoutWithHeader = ({ children }: LayoutWithHeaderProps) => {
    return (
        <Box sx={{ bgcolor: "#f5f5f5", minHeight: "100vh" }}>
            <Header />
            {children}
        </Box>
    );
};

export const routeElement = (element: React.ReactNode, noHeader?: boolean) => {
    return noHeader ? element : <LayoutWithHeader>{element}</LayoutWithHeader>;
};

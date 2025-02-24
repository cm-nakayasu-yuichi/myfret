import { AppRouter } from "./AppRouter";
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

export const ThemedApp = () => {
    const { mode } = useTheme();
    
    const theme = createTheme({
        palette: {
            mode,
        }
    });
    
    return(
        <ThemeProvider>
            <MUIThemeProvider theme={theme}>
                <CssBaseline />
                <AppRouter />
            </MUIThemeProvider>
        </ThemeProvider>
    );
};
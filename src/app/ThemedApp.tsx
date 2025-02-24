import { AppRouter } from "./AppRouter";
import { ThemeProvider as MUIThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ThemeProvider, useTheme } from "../contexts/theme/ThemeContext";
import { ReactNode } from "react";

const MUIThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const { mode } = useTheme();
    
    const theme = createTheme({
        palette: {
            mode,
        }
    });

    return(
        <MUIThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MUIThemeProvider>
    );
}

const ThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    return(
        <ThemeProvider>
            <MUIThemeProviderWrapper>
                {children}
            </MUIThemeProviderWrapper>
        </ThemeProvider>
    );
}

export const ThemedApp = () => {
    return(
        <ThemeProviderWrapper>
            <AppRouter />
        </ThemeProviderWrapper>
    );
};
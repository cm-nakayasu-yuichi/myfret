import { AppRouter } from "./AppRouter";
import { ThemeProvider as MUIThemeProvider, CssBaseline } from "@mui/material";
import { ThemeProvider, useThemeContext } from "../contexts/theme/ThemeContext";
import { ReactNode } from "react";
import { createAppTheme } from "../contexts/theme/theme";

const MUIThemeProviderWrapper = ({ children }: { children: ReactNode }) => {
    const { mode } = useThemeContext();
    const theme = createAppTheme(mode);

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
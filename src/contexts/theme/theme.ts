import { createTheme, Theme } from "@mui/material";
import { lightTheme } from "./light-theme";
import { darkTheme } from "./dark-theme";
import { THEME, THEME_STORAGE_KEY } from "./ThemeContext";
import { AppTheme } from "./AppTheme";

export const getAppTheme = (mode: THEME): AppTheme => {
    return mode == 'light' ? lightTheme : darkTheme;
}

export const getCurrentAppTheme = (): AppTheme => {
    const mode = (localStorage.getItem(THEME_STORAGE_KEY) as THEME) || 'light';
    return getAppTheme(mode);
}

export const createAppTheme = (mode: THEME): Theme => {
    const currentTheme = getAppTheme(mode);

    return createTheme({
        palette: {
            mode,
            primary: {
                main: currentTheme.header.background
            },
            background: currentTheme.background,
            text: currentTheme.text,
        },
        components: {
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: currentTheme.header.background,
                        color: currentTheme.header.text,
                    },
                },
            },
        },
    })
};
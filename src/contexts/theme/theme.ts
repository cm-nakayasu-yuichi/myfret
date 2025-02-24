import { createTheme, Theme } from "@mui/material";
import { lightTheme } from "./light-theme";
import { darkTheme } from "./dark-theme";
import { THEME } from "./ThemeContext";

declare module '@mui/material/styles' {
    interface Palette {
        headerIcon: string;
        chordDiagram: {
            main: string;
            position: string;
            number: string;
        };
        chordSheet: {
            chord: string;
            lyric: string;
        }
    }
    interface PaletteOptions {
        headerIcon: string;
        chordDiagram?: {
            main: string;
            position: string;
            number: string;
        };
        chordSheet?: {
            chord: string;
            lyric: string;
        }
    }
};

export const createAppTheme = (mode: THEME): Theme => {
    const currentTheme = mode == 'light' ? lightTheme : darkTheme;

    return createTheme({
        palette: {
            mode,
            primary: {
                main: currentTheme.header.background
            },
            background: currentTheme.background,
            text: currentTheme.text,
            headerIcon: currentTheme.header.icon,
            chordSheet: currentTheme.chordSheet,
            chordDiagram: currentTheme.chordDiagram
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
            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: currentTheme.text.primary,
                        ":hover": {
                            backgroundColor: `${currentTheme.text.secondary}4d`
                        }
                    },
                }
            }
        }
    })
};
import { createTheme, Theme } from "@mui/material";
import { lightTheme } from "./light-theme";
import { darkTheme } from "./dark-theme";
import { THEME } from "./ThemeContext";

declare module '@mui/material/styles' {
    interface Palette {
        accent: string;
        headerIcon: string;
        chordDiagram: {
            main: string;
            position: string;
            number: string;
        };
        chordSheet: {
            chord: string;
            lyric: string;
        };
        rankingNumber: {
            gold: {
                background: string;
                text: string;
            };
            silver: {
                background: string;
                text: string;
            };
            bronze: {
                background: string;
                text: string;
            };
            other: {
                background: string;
                text: string;
            };
        };
    }
    interface PaletteOptions {
        accent: string;
        headerIcon: string;
        chordDiagram?: {
            main: string;
            position: string;
            number: string;
        };
        chordSheet?: {
            chord: string;
            lyric: string;
        };
        rankingNumber: {
            gold: {
                background: string;
                text: string;
            };
            silver: {
                background: string;
                text: string;
            };
            bronze: {
                background: string;
                text: string;
            };
            other: {
                background: string;
                text: string;
            };
        };
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
            accent: currentTheme.text.accent,
            headerIcon: currentTheme.header.icon,
            chordSheet: currentTheme.chordSheet,
            chordDiagram: currentTheme.chordDiagram,
            rankingNumber: currentTheme.rankingNumber,
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
import { createContext, ReactNode, useContext, useState } from "react";

export type THEME = 'light' | 'dark'; 

type ThemeContextType = {
    mode: THEME;
    toggleTheme: (newTheme: THEME) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode }) => {
    const [mode, setMode] = useState<THEME>('light');

    const toggleTheme = (newTheme: THEME) => {
        setMode(newTheme);
    };

    return(
        <ThemeContext.Provider value={{mode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeはThemeProviderの中で使わなければなりません");
    }
    return context;
};
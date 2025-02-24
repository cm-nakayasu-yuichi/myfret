import { createContext, ReactNode, useContext, useState } from "react";

type ThemeContextType = {
    mode: 'light' | 'dark';
    toggleTheme: (newTheme: 'light' | 'dark') => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode }) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');

    const toggleTheme = (newTheme: 'light' | 'dark') => {
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
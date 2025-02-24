import { createContext, ReactNode, useContext, useState } from "react";

export type THEME = 'light' | 'dark'; 

export const THEME_STORAGE_KEY = 'app.theme';

type ThemeContextType = {
    mode: THEME;
    toggleTheme: (newTheme: THEME) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: {children: ReactNode }) => {
    const [mode, setMode] = useState<THEME>(() => {
        // ローカルストレージから初期値を取得
        const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        return (storedTheme as THEME) || 'light';
    });

    const toggleTheme = (newTheme: THEME) => {
        setMode(newTheme);
        // ローカルストレージに保存
        localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    };

    return(
        <ThemeContext.Provider value={{mode, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useThemeはThemeProviderの中で使わなければなりません");
    }
    return context;
};
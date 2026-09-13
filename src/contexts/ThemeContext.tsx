import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeContextType } from "../Types";

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const prevTheme = localStorage.getItem('theme') || 'light';

export function ThemeProvider ({children}: {children: React.ReactNode}){
    const [theme, setTheme] = useState<ThemeContextType['theme']>(prevTheme as 'light' | 'dark');

    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            <div data-theme={theme}>
                {children}
            </div>
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeProvider');
    }
    return context;
}
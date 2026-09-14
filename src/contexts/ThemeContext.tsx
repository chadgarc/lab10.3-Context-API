import { createContext, useContext, useEffect, useState } from "react";
import type { ThemeContextType } from "../Types";

/**
 * React context for managing the application's theme (light/dark mode).
 * Created with createContext and typed with ThemeContextType.
 * Defaults to undefined to enforce consumption within a ThemeProvider.
 */
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

/**
 * Retrieves the previously saved theme from localStorage, defaulting to 'light'.
 * Used for rehydrating the theme state on initial app load.
 */
const prevTheme = localStorage.getItem('theme') || 'light';

/**
 * ThemeProvider component that wraps the application (or subtree) with theme state.
 *
 * Uses React's useState to track the current theme and useEffect to persist
 * changes to localStorage. The `data-theme` attribute is set on the wrapper div,
 * which DaisyUI reads to apply theme-specific CSS variables.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - Child components that will have access to theme context.
 * @returns {JSX.Element} The ThemeContext.Provider wrapping the children.
 */
export function ThemeProvider ({children}: {children: React.ReactNode}){
    const [theme, setTheme] = useState<ThemeContextType['theme']>(prevTheme as 'light' | 'dark');

    /**
     * Toggles the theme between 'light' and 'dark'.
     * Uses functional updater to read the previous state value.
     */
    const toggleTheme = () => {
        setTheme((prevTheme) => prevTheme === 'light' ? 'dark' : 'light');
    }

    /**
     * useEffect hook that persists the current theme to localStorage
     * whenever the theme state changes. This ensures the user's theme
     * preference survives page reloads.
     */
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

/**
 * Custom hook to access the theme context.
 * Must be called inside a ThemeProvider component.
 * Throws a descriptive error if used outside a provider.
 *
 * @returns {ThemeContextType} An object containing the current `theme` string and `toggleTheme` function.
 */
export const useThemeContext = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useThemeContext must be used within ThemeProvider');
    }
    return context;
}
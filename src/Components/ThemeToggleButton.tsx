import { useThemeContext } from '../contexts/ThemeContext';

/**
 * ThemeToggleButton component renders a toggle switch for switching
 * between light and dark themes.
 *
 * Uses the `useThemeContext` hook to access the current theme state
 * and the `toggleTheme` function. The checkbox is bound to the theme
 * via `checked={theme === 'dark'}`, so checking it triggers `toggleTheme`.
 *
 * The checkbox is styled by DaisyUI's `theme-controller` class,
 * and displays two SVG icons (sun and moon) to represent the themes.
 *
 * @returns {JSX.Element} A label containing a checkbox and two SVG icons.
 */
export function ThemeToggleButton() {
    const { theme, toggleTheme } = useThemeContext();

    return (
        <>
        <label className="toggle text-base-content">
            <input
            type="checkbox"
            checked={theme === 'dark'}
            onChange={toggleTheme}
            className="theme-controller"
            />
            <svg aria-label="sun" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path></g></svg>
            <svg aria-label="moon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2" fill="none" stroke="currentColor"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path></g></svg>
        </label>
        </>
    );
}

import { FilterProvider } from './contexts/FilterContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TodoContextProvider } from './contexts/TodoContext';

/**
 * Aggregates all context providers into a single component.
 *
 * Nesting order matters: the outermost provider wraps the innermost one.
 * ThemeProvider is outermost because it applies the `data-theme` attribute
 * to the DOM, which affects all child components visually.
 * TodoContextProvider wraps FilterProvider because the app logic depends
 * on todos and filters, but both are independent contexts.
 *
 * This component replaces the need to manually wrap the app in multiple
 * providers in App.tsx, keeping the structure clean and readable.
 *
 * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The application's child components.
 * @returns {JSX.Element} All providers nested, wrapping the entire app subtree.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <TodoContextProvider>
        <FilterProvider>
          {children}
        </FilterProvider>
      </TodoContextProvider>
    </ThemeProvider>
  );
}

import { FilterProvider } from './contexts/FilterContext';
import { ThemeProvider } from './contexts/ThemeContext';
import { TodoContextProvider } from './contexts/TodoContext';

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
